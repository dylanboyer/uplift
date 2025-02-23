DROP SCHEMA IF EXISTS main_gym_schema CASCADE;

-- Recreate the schema
CREATE SCHEMA main_gym_schema;

-- CREATE TABLE main_gym_schema.GenderOptions(
-- 	G_ID SERIAL PRIMARY KEY,
-- 	NAME VARCHAR(20)
-- );

CREATE TABLE main_gym_schema.RepRange(
	R_ID SERIAL PRIMARY KEY,
	LABEL VARCHAR(20)
);

CREATE TABLE main_gym_schema.Users(
	U_ID SERIAL PRIMARY KEY, 
	USERNAME VARCHAR(20),
	PASSWORD VARCHAR(50),
	EMAIL VARCHAR(50) UNIQUE,
	NAME VARCHAR(20), 
	PFP_URL VARCHAR(200) DEFAULT 'https://placehold.co/250x250',
	FOLLOWER_COUNT INT DEFAULT 0,

	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

CREATE VIEW main_gym_schema.PublicUsers AS
SELECT 
    U_ID, 
    USERNAME, 
    EMAIL,
    NAME, 
    PFP_URL, 
    FOLLOWER_COUNT, 
    created_at, 
    updated_at
FROM main_gym_schema.Users;

CREATE TABLE main_gym_schema.Follows(
	USER_OF_INTREST INT,
	FOLLOWING_USER INT, 

	FOREIGN KEY (USER_OF_INTREST) REFERENCES main_gym_schema.Users(U_ID),
	FOREIGN KEY (FOLLOWING_USER) REFERENCES main_gym_schema.Users(U_ID)

);

CREATE TABLE main_gym_schema.Exercises(
	E_ID SERIAL PRIMARY KEY,
	NAME VARCHAR(100),
	U_ID INT,

	
	FOREIGN KEY (U_ID) REFERENCES main_gym_schema.Users(U_ID) ON DELETE CASCADE,

	CONSTRAINT unique_exercise_name_per_user UNIQUE (U_ID, NAME)
);

CREATE TABLE main_gym_schema.ExerciseBuckets(
	B_ID SERIAL PRIMARY KEY,
	E_ID INT,
	RepRange_ID INT,
	GOAL INT DEFAULT 0,
	ENTRY_COUNT INT DEFAULT 0,

	FOREIGN KEY (RepRange_ID) REFERENCES main_gym_schema.RepRange(R_ID),
	FOREIGN KEY (E_ID) REFERENCES main_gym_schema.Exercises(E_ID) ON DELETE CASCADE

);

CREATE TABLE main_gym_schema.Entries(
	E_ID SERIAL PRIMARY KEY,
	B_ID INT,
	WEIGHT INT,
	SETS INT,
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	FOREIGN KEY (B_ID) REFERENCES main_gym_schema.ExerciseBuckets(B_ID) ON DELETE CASCADE

);

CREATE TABLE main_gym_schema.Posts(
	P_ID SERIAL PRIMARY KEY,
	TEXT VARCHAR(200),
	Exercise_ID INT,

	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	FOREIGN KEY (Exercise_ID) REFERENCES main_gym_schema.Exercises(E_ID)
);

CREATE OR REPLACE FUNCTION update_follower_count()
RETURNS TRIGGER AS $$
BEGIN
    -- If a new row is inserted (a user is followed), increment the follower count
    IF TG_OP = 'INSERT' THEN
        UPDATE main_gym_schema.Users
        SET FOLLOWER_COUNT = FOLLOWER_COUNT + 1
        WHERE U_ID = NEW.USER_OF_INTREST;
    
    -- If a row is deleted (a user is unfollowed), decrement the follower count
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE main_gym_schema.Users
        SET FOLLOWER_COUNT = FOLLOWER_COUNT - 1
        WHERE U_ID = OLD.USER_OF_INTREST;
    END IF;

    RETURN NULL; -- Triggers that perform updates typically return NULL
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER follows_update_trigger
AFTER INSERT OR DELETE
ON main_gym_schema.Follows
FOR EACH ROW
EXECUTE FUNCTION update_follower_count();


-- Function to update ENTRY_COUNT
CREATE OR REPLACE FUNCTION update_entry_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE main_gym_schema.ExerciseBuckets
    SET ENTRY_COUNT = ENTRY_COUNT + 1
    WHERE B_ID = NEW.B_ID;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE main_gym_schema.ExerciseBuckets
    SET ENTRY_COUNT = ENTRY_COUNT - 1
    WHERE B_ID = OLD.B_ID;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for INSERT
CREATE TRIGGER entry_insert_trigger
AFTER INSERT ON main_gym_schema.Entries
FOR EACH ROW EXECUTE FUNCTION update_entry_count();

-- Trigger for DELETE
CREATE TRIGGER entry_delete_trigger
AFTER DELETE ON main_gym_schema.Entries
FOR EACH ROW EXECUTE FUNCTION update_entry_count();


 

-- INSERT INTO main_gym_schema.GenderOptions (NAME) VALUES ('Male');
-- INSERT INTO main_gym_schema.GenderOptions (NAME) VALUES ('Female');
-- INSERT INTO main_gym_schema.GenderOptions (NAME) VALUES ('Other');

INSERT INTO main_gym_schema.RepRange (LABEL) VALUES ('1 to 5');
INSERT INTO main_gym_schema.RepRange (LABEL) VALUES ('6 to 10');
INSERT INTO main_gym_schema.RepRange (LABEL) VALUES ('11+');
	
