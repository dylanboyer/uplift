DROP SCHEMA IF EXISTS main_gym_schema CASCADE;

-- Recreate the schema
CREATE SCHEMA main_gym_schema;

CREATE TABLE main_gym_schema.GenderOptions(
	G_ID SERIAL PRIMARY KEY,
	NAME VARCHAR(20)
);

CREATE TABLE main_gym_schema.RepRange(
	R_ID SERIAL PRIMARY KEY,
	LABEL VARCHAR(20)
);

CREATE TABLE main_gym_schema.Users(
	U_ID SERIAL PRIMARY KEY, 
	USERNAME VARCHAR(20),
	PASSWORD VARCHAR(50),
	NAME VARCHAR(20), 
	AGE INT,
	HEIGHT_FOOT INT,
	HEIGHT_INCH INT,
	Gender_ID INT,
	PFP_URL VARCHAR(200),
	FOLLOWER_COUNT INT,

	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	FOREIGN KEY (Gender_ID) REFERENCES main_gym_schema.GenderOptions(G_ID)
); 

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
	RepRange_ID INT,
	GOAL INT,

	FOREIGN KEY (RepRange_ID) REFERENCES main_gym_schema.RepRange(R_ID),
	FOREIGN KEY (U_ID) REFERENCES main_gym_schema.Users(U_ID)
);

CREATE TABLE main_gym_schema.Entries(
	ENTRY_ID SERIAL PRIMARY KEY,
	RANGE_ID INT,
	WEIGHT INT,
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	FOREIGN KEY (RANGE_ID) REFERENCES main_gym_schema.RepRange(R_ID)

);

CREATE TABLE main_gym_schema.Posts(
	P_ID SERIAL PRIMARY KEY,
	TEXT VARCHAR(200),
	Exercise_ID INT,

	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	FOREIGN KEY (Exercise_ID) REFERENCES main_gym_schema.Exercises(E_ID)
);

 

INSERT INTO main_gym_schema.GenderOptions (NAME) VALUES ('Male');
INSERT INTO main_gym_schema.GenderOptions (NAME) VALUES ('Female');
INSERT INTO main_gym_schema.GenderOptions (NAME) VALUES ('Other');

INSERT INTO main_gym_schema.RepRange (LABEL) VALUES ('1 to 5');
INSERT INTO main_gym_schema.RepRange (LABEL) VALUES ('6 to 10');
INSERT INTO main_gym_schema.RepRange (LABEL) VALUES ('11+');
	
