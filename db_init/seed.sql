INSERT INTO main_gym_schema.Users (USERNAME, PASSWORD, NAME, PFP_URL, EMAIL)
VALUES
('john_doe', 'password123', 'John Doe', 'https://placehold.co/250x250','john.doe@example.com'),
('jane_smith', 'password123', 'Jane Smith', 'https://placehold.co/250x250', 'jane.smith@example.com'),
('mike_johnson', 'password123', 'Mike Johnson', 'https://placehold.co/250x250', 'mike.johnson@example.com'),
('susan_lee', 'password123', 'Susan Lee', 'https://placehold.co/250x250', 'susan.lee@example.com'),
('alex_martinez', 'password123', 'Alex Martinez', 'https://placehold.co/250x250', 'alex.martinez@example.com'),
('lisa_williams', 'password123', 'Lisa Williams', 'https://placehold.co/250x250', 'lisa.williams@example.com'),
('david_brown', 'password123', 'David Brown', 'https://placehold.co/250x250', 'david.brown@example.com'),
('emily_clark', 'password123', 'Emily Clark', 'https://placehold.co/250x250', 'emily.clark@example.com'),
('matthew_rodgers', 'password123', 'Matthew Rodgers', 'https://placehold.co/250x250', 'matthew.rodgers@example.com'),
('hannah_white', 'password123', 'Hannah White', 'https://placehold.co/250x250', 'hannah.white@example.com'),
('daniel_harris', 'password123', 'Daniel Harris', 'https://placehold.co/250x250', 'daniel.harris@example.com'),
('olivia_james', 'password123', 'Olivia James', 'https://placehold.co/250x250', 'olivia.james@example.com'),
('william_martin', 'password123', 'William Martin', 'https://placehold.co/250x250', 'william.martin@example.com'),
('emma_thompson', 'password123', 'Emma Thompson', 'https://placehold.co/250x250', 'emma.thompson@example.com'),
('ethan_smith', 'password123', 'Ethan Smith', 'https://placehold.co/250x250', 'ethan.smith@example.com'),
('charlotte_davis', 'password123', 'Charlotte Davis', 'https://placehold.co/250x250', 'charlotte.davis@example.com'),
('oliver_taylor', 'password123', 'Oliver Taylor', 'https://placehold.co/250x250', 'oliver.taylor@example.com'),
('zoe_adams', 'password123', 'Zoe Adams', 'https://placehold.co/250x250', 'zoe.adams@example.com'),
('jack_wilson', 'password123', 'Jack Wilson', 'https://placehold.co/250x250', 'jack.wilson@example.com'),
('isabella_moore', 'password123', 'Isabella Moore', 'https://placehold.co/250x250', 'isabella.moore@example.com'),
('lucas_jones', 'password123', 'Lucas Jones', 'https://placehold.co/250x250', 'lucas.jones@example.com'),
('mia_scott', 'password123', 'Mia Scott', 'https://placehold.co/250x250', 'mia.scott@example.com'),
('aiden_taylor', 'password123', 'Aiden Taylor', 'https://placehold.co/250x250', 'aiden.taylor@example.com'),
('ella_anderson', 'password123', 'Ella Anderson', 'https://placehold.co/250x250', 'ella.anderson@example.com'),
('james_kim', 'password123', 'James Kim', 'https://placehold.co/250x250', 'james.kim@example.com'),
('grace_hall', 'password123', 'Grace Hall', 'https://placehold.co/250x250', 'grace.hall@example.com'),
('henry_garcia', 'password123', 'Henry Garcia', 'https://placehold.co/250x250', 'henry.garcia@example.com'),
('lily_roberts', 'password123', 'Lily Roberts', 'https://placehold.co/250x250', 'lily.roberts@example.com'),
('leo_morris', 'password123', 'Leo Morris', 'https://placehold.co/250x250', 'leo.morris@example.com'),
('evan_wright', 'password123', 'Evan Wright', 'https://placehold.co/250x250', 'evan.wright@example.com'),
('sophia_hall', 'password123', 'Sophia Hall', 'https://placehold.co/250x250', 'sophia.hall@example.com'),
('mason_evans', 'password123', 'Mason Evans', 'https://placehold.co/250x250', 'mason.evans@example.com'),
('victoria_green', 'password123', 'Victoria Green', 'https://placehold.co/250x250', 'victoria.green@example.com'),
('liam_carter', 'password123', 'Liam Carter', 'https://placehold.co/250x250', 'liam.carter@example.com'),
('sophia_williams', 'password123', 'Sophia Williams', 'https://placehold.co/250x250', 'sophia.williams@example.com'),
('noah_king', 'password123', 'Noah King', 'https://placehold.co/250x250', 'noah.king@example.com'),
('ava_harris', 'password123', 'Ava Harris', 'https://placehold.co/250x250', 'ava.harris@example.com'),
('logan_carter', 'password123', 'Logan Carter', 'https://placehold.co/250x250', 'logan.carter@example.com'),
('scarlett_lee', 'password123', 'Scarlett Lee', 'https://placehold.co/250x250', 'scarlett.lee@example.com');


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


INSERT INTO main_gym_schema.Exercises (NAME, U_ID) VALUES
('Bench Press', 1), ('Squat', 1), ('Deadlift', 1), ('Overhead Press', 2), ('Barbell Row', 2),
('Pull-up', 3), ('Dumbbell Curl', 3), ('Triceps Dips', 4), ('Leg Press', 4), ('Lunges', 5),
('Calf Raises', 5), ('Plank', 6), ('Russian Twists', 6), ('Lat Pulldown', 7), ('Chest Fly', 7),
('Face Pulls', 8), ('Front Squat', 8), ('Romanian Deadlift', 9), ('Seated Shoulder Press', 9),
('Hammer Curl', 10), ('Incline Bench Press', 10), ('Trap Bar Deadlift', 1), ('Goblet Squat', 2),
('Reverse Lunges', 3), ('Seated Calf Raises', 4), ('Hanging Leg Raises', 5), ('Cable Row', 6),
('Close-Grip Bench Press', 7), ('Arnold Press', 8), ('Sumo Deadlift', 9), ('Preacher Curl', 10);

INSERT INTO main_gym_schema.ExerciseBuckets (E_ID, RepRange_ID, GOAL) VALUES
(1, 1, 120), (1, 2, 124), (1, 3, 80),
(2, 1, 200), (2, 2, 210), (2, 3, 160),
(3, 1, 250), (3, 2, 260), (3, 3, 200),
(4, 1, 100), (4, 2, 110), (4, 3, 75),
(5, 1, 140), (5, 2, 145), (5, 3, 100),
(6, 1, 15), (6, 2, 20), (6, 3, 25),
(7, 1, 35), (7, 2, 40), (7, 3, 50),
(8, 1, 20), (8, 2, 25), (8, 3, 30),
(9, 1, 250), (9, 2, 275), (9, 3, 225),
(10, 1, 100), (10, 2, 110), (10, 3, 90),
(11, 1, 120), (11, 2, 130), (11, 3, 110),
(12, 1, 60), (12, 2, 70), (12, 3, 90),
(13, 1, 30), (13, 2, 40), (13, 3, 50),
(14, 1, 130), (14, 2, 140), (14, 3, 115),
(15, 1, 90), (15, 2, 100), (15, 3, 80),
(16, 1, 50), (16, 2, 55), (16, 3, 60),
(17, 1, 180), (17, 2, 190), (17, 3, 160),
(18, 1, 220), (18, 2, 230), (18, 3, 180),
(19, 1, 90), (19, 2, 95), (19, 3, 85),
(20, 1, 40), (20, 2, 45), (20, 3, 50),
(21, 1, 160), (21, 2, 170), (21, 3, 140),
(22, 1, 140), (22, 2, 150), (22, 3, 120),
(23, 1, 80), (23, 2, 90), (23, 3, 75),
(24, 1, 100), (24, 2, 110), (24, 3, 85),
(25, 1, 60), (25, 2, 65), (25, 3, 55),
(26, 1, 90), (26, 2, 100), (26, 3, 80),
(27, 1, 50), (27, 2, 55), (27, 3, 45),
(28, 1, 130), (28, 2, 140), (28, 3, 110),
(29, 1, 110), (29, 2, 120), (29, 3, 95),
(30, 1, 240), (30, 2, 250), (30, 3, 200),
(31, 1, 50), (31, 2, 55), (31, 3, 45);

INSERT INTO main_gym_schema.Entries (B_ID, WEIGHT, created_at)
VALUES
(1, 22, '2025-01-15 10:00:00'),
(1, 25, '2025-01-20 10:00:00'),
(1, 30, '2025-01-25 10:00:00'),
(1, 35, '2025-01-30 10:00:00'),
(1, 37, '2025-02-05 10:00:00'),
(5, 135, '2025-02-01 09:30:00'),
(5, 140, '2025-02-05 09:45:00'),
(5, 145, '2025-02-10 09:45:00'),
(5, 150, '2025-02-15 09:45:00'),
(9, 255, '2025-02-10 11:00:00'),
(9, 275, '2025-02-15 11:10:00'),
(9, 290, '2025-02-20 11:20:00'),
(9, 300, '2025-02-25 11:30:00'),
(9, 310, '2025-03-01 11:40:00'),
(12, 65, '2025-02-17 07:30:00'),
(12, 70, '2025-02-22 07:45:00'),
(12, 75, '2025-02-27 08:00:00'),
(12, 80, '2025-03-03 08:15:00'),
(17, 185, '2025-02-25 06:30:00'),
(17, 195, '2025-03-01 06:40:00'),
(17, 205, '2025-03-07 06:50:00'),
(17, 215, '2025-03-14 07:00:00'),
(17, 225, '2025-03-20 07:15:00'),
(21, 165, '2025-03-03 08:00:00'),
(21, 170, '2025-03-07 08:10:00'),
(21, 175, '2025-03-12 08:20:00'),
(21, 180, '2025-03-18 08:30:00'),
(21, 185, '2025-03-22 08:40:00'),
(28, 135, '2025-03-10 09:00:00'),
(28, 140, '2025-03-14 09:10:00'),
(28, 145, '2025-03-18 09:20:00'),
(28, 150, '2025-03-22 09:30:00'),
(28, 155, '2025-03-26 09:40:00'),
(34, 85, '2025-03-18 10:00:00'),
(34, 90, '2025-03-22 10:15:00'),
(34, 95, '2025-03-26 10:30:00'),
(34, 100, '2025-03-30 10:45:00'),
(34, 105, '2025-04-03 11:00:00'),
(39, 95, '2025-03-25 07:30:00'),
(39, 100, '2025-03-28 07:45:00'),
(39, 105, '2025-04-01 08:00:00'),
(39, 110, '2025-04-05 08:15:00'),
(39, 115, '2025-04-09 08:30:00'),
(40, 125, '2025-03-30 06:00:00'),
(40, 130, '2025-04-02 06:15:00'),
(40, 135, '2025-04-06 06:30:00'),
(40, 140, '2025-04-10 06:45:00'),
(40, 145, '2025-04-14 07:00:00');


