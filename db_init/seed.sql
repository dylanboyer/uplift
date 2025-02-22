INSERT INTO main_gym_schema.Users (USERNAME, PASSWORD, NAME, PFP_URL, FOLLOWER_COUNT, EMAIL)
VALUES
('john_doe', 'password123', 'John Doe', 'https://placehold.co/250x250', 150, 'john.doe@example.com'),
('jane_smith', 'password123', 'Jane Smith', 'https://placehold.co/250x250', 200, 'jane.smith@example.com'),
('mike_johnson', 'password123', 'Mike Johnson', 'https://placehold.co/250x250', 350, 'mike.johnson@example.com'),
('susan_lee', 'password123', 'Susan Lee', 'https://placehold.co/250x250', 450, 'susan.lee@example.com'),
('alex_martinez', 'password123', 'Alex Martinez', 'https://placehold.co/250x250', 80, 'alex.martinez@example.com'),
('lisa_williams', 'password123', 'Lisa Williams', 'https://placehold.co/250x250', 320, 'lisa.williams@example.com'),
('david_brown', 'password123', 'David Brown', 'https://placehold.co/250x250', 110, 'david.brown@example.com'),
('emily_clark', 'password123', 'Emily Clark', 'https://placehold.co/250x250', 500, 'emily.clark@example.com'),
('matthew_rodgers', 'password123', 'Matthew Rodgers', 'https://placehold.co/250x250', 90, 'matthew.rodgers@example.com'),
('hannah_white', 'password123', 'Hannah White', 'https://placehold.co/250x250', 620, 'hannah.white@example.com'),
('daniel_harris', 'password123', 'Daniel Harris', 'https://placehold.co/250x250', 430, 'daniel.harris@example.com'),
('olivia_james', 'password123', 'Olivia James', 'https://placehold.co/250x250', 70, 'olivia.james@example.com'),
('william_martin', 'password123', 'William Martin', 'https://placehold.co/250x250', 150, 'william.martin@example.com'),
('emma_thompson', 'password123', 'Emma Thompson', 'https://placehold.co/250x250', 200, 'emma.thompson@example.com'),
('ethan_smith', 'password123', 'Ethan Smith', 'https://placehold.co/250x250', 160, 'ethan.smith@example.com'),
('charlotte_davis', 'password123', 'Charlotte Davis', 'https://placehold.co/250x250', 400, 'charlotte.davis@example.com'),
('oliver_taylor', 'password123', 'Oliver Taylor', 'https://placehold.co/250x250', 230, 'oliver.taylor@example.com'),
('zoe_adams', 'password123', 'Zoe Adams', 'https://placehold.co/250x250', 330, 'zoe.adams@example.com'),
('jack_wilson', 'password123', 'Jack Wilson', 'https://placehold.co/250x250', 300, 'jack.wilson@example.com'),
('isabella_moore', 'password123', 'Isabella Moore', 'https://placehold.co/250x250', 250, 'isabella.moore@example.com'),
('lucas_jones', 'password123', 'Lucas Jones', 'https://placehold.co/250x250', 190, 'lucas.jones@example.com'),
('mia_scott', 'password123', 'Mia Scott', 'https://placehold.co/250x250', 150, 'mia.scott@example.com'),
('aiden_taylor', 'password123', 'Aiden Taylor', 'https://placehold.co/250x250', 380, 'aiden.taylor@example.com'),
('ella_anderson', 'password123', 'Ella Anderson', 'https://placehold.co/250x250', 410, 'ella.anderson@example.com'),
('james_kim', 'password123', 'James Kim', 'https://placehold.co/250x250', 470, 'james.kim@example.com'),
('grace_hall', 'password123', 'Grace Hall', 'https://placehold.co/250x250', 120, 'grace.hall@example.com'),
('henry_garcia', 'password123', 'Henry Garcia', 'https://placehold.co/250x250', 240, 'henry.garcia@example.com'),
('lily_roberts', 'password123', 'Lily Roberts', 'https://placehold.co/250x250', 520, 'lily.roberts@example.com'),
('leo_morris', 'password123', 'Leo Morris', 'https://placehold.co/250x250', 270, 'leo.morris@example.com'),
('evan_wright', 'password123', 'Evan Wright', 'https://placehold.co/250x250', 180, 'evan.wright@example.com'),
('sophia_hall', 'password123', 'Sophia Hall', 'https://placehold.co/250x250', 250, 'sophia.hall@example.com'),
('mason_evans', 'password123', 'Mason Evans', 'https://placehold.co/250x250', 340, 'mason.evans@example.com'),
('victoria_green', 'password123', 'Victoria Green', 'https://placehold.co/250x250', 210, 'victoria.green@example.com'),
('liam_carter', 'password123', 'Liam Carter', 'https://placehold.co/250x250', 290, 'liam.carter@example.com'),
('sophia_williams', 'password123', 'Sophia Williams', 'https://placehold.co/250x250', 330, 'sophia.williams@example.com'),
('noah_king', 'password123', 'Noah King', 'https://placehold.co/250x250', 420, 'noah.king@example.com'),
('ava_harris', 'password123', 'Ava Harris', 'https://placehold.co/250x250', 240, 'ava.harris@example.com'),
('logan_carter', 'password123', 'Logan Carter', 'https://placehold.co/250x250', 100, 'logan.carter@example.com'),
('scarlett_lee', 'password123', 'Scarlett Lee', 'https://placehold.co/250x250', 500, 'scarlett.lee@example.com');


INSERT INTO main_gym_schema.Follows (USER_OF_INTREST, FOLLOWING_USER)
VALUES
(1, 2),  -- User 1 is followed by User 2
(1, 3),  -- User 1 is followed by User 3
(2, 1),  -- User 2 is followed by User 1
(2, 4),  -- User 2 is followed by User 4
(3, 1),  -- User 3 is followed by User 1
(4, 5),  -- User 4 is followed by User 5
(6, 7),  -- User 6 is followed by User 7
(7, 8),  -- User 7 is followed by User 8
(8, 6),  -- User 8 is followed by User 6
(9, 10), -- User 9 is followed by User 10
(10, 9), -- User 10 is followed by User 9
(11, 12), -- User 11 is followed by User 12
(12, 13), -- User 12 is followed by User 13
(13, 14), -- User 13 is followed by User 14
(14, 15), -- User 14 is followed by User 15
(15, 16), -- User 15 is followed by User 16
(16, 17), -- User 16 is followed by User 17
(17, 18), -- User 17 is followed by User 18
(18, 19), -- User 18 is followed by User 19
(19, 20), -- User 19 is followed by User 20
(20, 19), -- User 20 is followed by User 19
(21, 22), -- User 21 is followed by User 22
(22, 23), -- User 22 is followed by User 23
(23, 24), -- User 23 is followed by User 24
(24, 25), -- User 24 is followed by User 25
(25, 26), -- User 25 is followed by User 26
(26, 27), -- User 26 is followed by User 27
(27, 28), -- User 27 is followed by User 28
(28, 29), -- User 28 is followed by User 29
(29, 30), -- User 29 is followed by User 30
(30, 31), -- User 30 is followed by User 31
(31, 32), -- User 31 is followed by User 32
(32, 33), -- User 32 is followed by User 33
(33, 34), -- User 33 is followed by User 34
(34, 35), -- User 34 is followed by User 35
(35, 36), -- User 35 is followed by User 36
(36, 37), -- User 36 is followed by User 37
(37, 38), -- User 37 is followed by User 38
(38, 39); -- User 38 is followed by User 39


-- Insert sample exercises for the first 5 users
INSERT INTO main_gym_schema.Exercises (NAME, U_ID, RepRange_ID, GOAL)
VALUES
('Squat', 1, 1, 150),  -- User 1 doing Squats with rep range '1 to 5' and goal of 150 lbs
('Deadlift', 1, 2, 225),  -- User 1 doing Deadlifts with rep range '6 to 10' and goal of 225 lbs

('Dumbbell Bench Press', 2, 3, 100),  -- User 2 doing Dumbbell Bench Press with rep range '11+' and goal of 100 lbs
('Barbell Bench Press', 2, 2, 185),  -- User 2 doing Barbell Bench Press with rep range '6 to 10' and goal of 185 lbs
('Pull-ups', 2, 1, 20),  -- User 2 doing Pull-ups with rep range '1 to 5' and goal of 20 reps

('Overhead Press', 3, 2, 135),  -- User 3 doing Overhead Press with rep range '6 to 10' and goal of 135 lbs
('Bent Over Rows', 3, 3, 175),  -- User 3 doing Bent Over Rows with rep range '11+' and goal of 175 lbs

('Leg Press', 4, 1, 300),  -- User 4 doing Leg Press with rep range '1 to 5' and goal of 300 lbs
('Lunges', 4, 2, 120),  -- User 4 doing Lunges with rep range '6 to 10' and goal of 120 lbs

('Bicep Curls', 5, 3, 45),  -- User 5 doing Bicep Curls with rep range '11+' and goal of 45 lbs
('Tricep Dips', 5, 1, 30),  -- User 5 doing Tricep Dips with rep range '1 to 5' and goal of 30 reps
('Cable Rows', 5, 2, 140);  -- User 5 doing Cable Rows with rep range '6 to 10' and goal of 140 lbs

-- Inserting additional entries for Exercise 1 (Squat)
INSERT INTO main_gym_schema.Entries (Exercise_ID, WEIGHT, created_at) 
VALUES
(1, 155, '2025-01-01 10:00:00'),
(1, 160, '2025-01-15 10:00:00'),
(1, 165, '2025-02-01 10:00:00'),
(1, 170, '2025-02-15 10:00:00'),
(1, 175, '2025-03-01 10:00:00'),
(1, 180, '2025-03-15 10:00:00'),
(1, 185, '2025-04-01 10:00:00'),
(1, 190, '2025-04-15 10:00:00'),
(1, 195, '2025-05-01 10:00:00'),
(1, 200, '2025-05-15 10:00:00'),
(1, 205, '2025-06-01 10:00:00'),
(1, 210, '2025-06-15 10:00:00'),
(1, 215, '2025-07-01 10:00:00'),
(1, 220, '2025-07-15 10:00:00'),
(1, 225, '2025-08-01 10:00:00'),
(1, 230, '2025-08-15 10:00:00'),
(1, 235, '2025-09-01 10:00:00'),
(1, 240, '2025-09-15 10:00:00'),
(1, 245, '2025-10-01 10:00:00'),
(1, 250, '2025-10-15 10:00:00'),
(1, 250, '2025-11-01 10:00:00'); 

-- Inserting additional entries for Exercise 3 (Dumbbell Bench Press)
INSERT INTO main_gym_schema.Entries (Exercise_ID, WEIGHT, created_at) 
VALUES
(3, 85, '2025-01-01 10:00:00'),
(3, 90, '2025-01-15 10:00:00'),
(3, 95, '2025-02-01 10:00:00'),
(3, 100, '2025-02-15 10:00:00'),
(3, 105, '2025-03-01 10:00:00'),
(3, 110, '2025-03-15 10:00:00'),
(3, 115, '2025-04-01 10:00:00'),
(3, 120, '2025-04-15 10:00:00'),
(3, 125, '2025-05-01 10:00:00'),
(3, 130, '2025-05-15 10:00:00'),
(3, 135, '2025-06-01 10:00:00'),
(3, 140, '2025-06-15 10:00:00'),
(3, 145, '2025-07-01 10:00:00'),
(3, 150, '2025-07-15 10:00:00'),
(3, 155, '2025-08-01 10:00:00'),
(3, 160, '2025-08-15 10:00:00'),
(3, 165, '2025-09-01 10:00:00'),
(3, 170, '2025-09-15 10:00:00'),
(3, 175, '2025-10-01 10:00:00'),
(3, 180, '2025-10-15 10:00:00'),
(3, 185, '2025-11-01 10:00:00'); 

-- Inserting additional entries for Exercise 4 (Barbell Bench Press)
INSERT INTO main_gym_schema.Entries (Exercise_ID, WEIGHT, created_at) 
VALUES
(4, 150, '2025-01-01 10:00:00'),
(4, 155, '2025-01-15 10:00:00'),
(4, 160, '2025-02-01 10:00:00'),
(4, 165, '2025-02-15 10:00:00'),
(4, 170, '2025-03-01 10:00:00'),
(4, 175, '2025-03-15 10:00:00'),
(4, 180, '2025-04-01 10:00:00'),
(4, 185, '2025-04-15 10:00:00'),
(4, 190, '2025-05-01 10:00:00'),
(4, 195, '2025-05-15 10:00:00'),
(4, 200, '2025-06-01 10:00:00'),
(4, 205, '2025-06-15 10:00:00'),
(4, 210, '2025-07-01 10:00:00'),
(4, 215, '2025-07-15 10:00:00'),
(4, 220, '2025-08-01 10:00:00'),
(4, 225, '2025-08-15 10:00:00'),
(4, 230, '2025-09-01 10:00:00'),
(4, 235, '2025-09-15 10:00:00'),
(4, 240, '2025-10-01 10:00:00'),
(4, 245, '2025-10-15 10:00:00'),
(4, 250, '2025-11-01 10:00:00');

-- Continue adding similar entries for the other exercises (e.g., Deadlift, Pull-ups, Overhead Press, Bent Over Rows, Leg Press, Lunges, Bicep Curls, Tricep Dips, Cable Rows) with reasonable progression based on user goals.

INSERT INTO main_gym_schema.Entries (Exercise_ID, WEIGHT, created_at)
VALUES
(5, 22, '2025-01-15 10:00:00'),  -- Slight increase
(5, 25, '2025-01-20 10:00:00'),  -- Increase to 25 reps
(5, 30, '2025-01-25 10:00:00');  -- Increased reps

