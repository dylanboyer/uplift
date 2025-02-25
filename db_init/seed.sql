INSERT INTO main_gym_schema.Users (USERNAME, PASSWORD, NAME, PFP_URL, EMAIL)
VALUES
('john_doe', 'password123', 'John Doe', 'https://pbs.twimg.com/media/FJys2k5XsAUbSW7?format=png&name=360x360','john.doe@example.com'),
('jane_smith', 'password123', 'Jane Smith', 'https://tinyurl.com/3nj8bect', 'jane.smith@example.com'),
('mike_johnson', 'password123', 'Mike Johnson', 'https://hypixel.net/attachments/huh-png.2191889/', 'mike.johnson@example.com'),
('susan_lee', 'password123', 'Susan Lee', 'https://tinyurl.com/ywaswyts', 'susan.lee@example.com'),
('alex_martinez', 'password123', 'Alex Martinez', 'http://bit.ly/3EPgLeq', 'alex.martinez@example.com'),
('lisa_williams', 'password123', 'Lisa Williams', 'https://tinyurl.com/9evs7hrd', 'lisa.williams@example.com'),
('david_brown', 'password123', 'David Brown', 'https://tinyurl.com/3nj8bect', 'david.brown@example.com'),
('emily_clark', 'password123', 'Emily Clark', 'https://pbs.twimg.com/media/FJys2k5XsAUbSW7?format=png&name=360x360', 'emily.clark@example.com'),
('matthew_rodgers', 'password123', 'Matthew Rodgers', 'https://hypixel.net/attachments/huh-png.2191889/', 'matthew.rodgers@example.com'),
('hannah_white', 'password123', 'Hannah White', 'https://tinyurl.com/ywaswyts', 'hannah.white@example.com'),
('daniel_harris', 'password123', 'Daniel Harris', 'https://dinopixel.com/preload/0324/pixel-art-1711439889.png', 'daniel.harris@example.com'),
('olivia_james', 'password123', 'Olivia James', 'https://tinyurl.com/9evs7hrd', 'olivia.james@example.com'),
('william_martin', 'password123', 'William Martin', 'https://tinyurl.com/3nj8bect', 'william.martin@example.com'),
('emma_thompson', 'password123', 'Emma Thompson', 'https://pbs.twimg.com/media/FJys2k5XsAUbSW7?format=png&name=360x360', 'emma.thompson@example.com'),
('ethan_smith', 'password123', 'Ethan Smith', 'https://hypixel.net/attachments/huh-png.2191889/', 'ethan.smith@example.com'),
('charlotte_davis', 'password123', 'Charlotte Davis', 'https://tinyurl.com/ywaswyts', 'charlotte.davis@example.com'),
('oliver_taylor', 'password123', 'Oliver Taylor', 'https://dinopixel.com/preload/0324/pixel-art-1711439889.png', 'oliver.taylor@example.com'),
('zoe_adams', 'password123', 'Zoe Adams', 'https://tinyurl.com/9evs7hrd', 'zoe.adams@example.com'),
('jack_wilson', 'password123', 'Jack Wilson', 'https://tinyurl.com/3nj8bect', 'jack.wilson@example.com'),
('isabella_moore', 'password123', 'Isabella Moore', 'https://pbs.twimg.com/media/FJys2k5XsAUbSW7?format=png&name=360x360', 'isabella.moore@example.com'),
('lucas_jones', 'password123', 'Lucas Jones', 'https://hypixel.net/attachments/huh-png.2191889/', 'lucas.jones@example.com'),
('mia_scott', 'password123', 'Mia Scott', 'http://bit.ly/3EPgLeq', 'mia.scott@example.com'),
('aiden_taylor', 'password123', 'Aiden Taylor', 'https://dinopixel.com/preload/0324/pixel-art-1711439889.png', 'aiden.taylor@example.com'),
('ella_anderson', 'password123', 'Ella Anderson', 'https://tinyurl.com/9evs7hrd', 'ella.anderson@example.com'),
('james_kim', 'password123', 'James Kim', 'https://tinyurl.com/3nj8bect', 'james.kim@example.com'),
('grace_hall', 'password123', 'Grace Hall', 'https://pbs.twimg.com/media/FJys2k5XsAUbSW7?format=png&name=360x360', 'grace.hall@example.com'),
('henry_garcia', 'password123', 'Henry Garcia', 'https://hypixel.net/attachments/huh-png.2191889/', 'henry.garcia@example.com'),
('lily_roberts', 'password123', 'Lily Roberts', 'https://tinyurl.com/ywaswyts', 'lily.roberts@example.com'),
('leo_morris', 'password123', 'Leo Morris', 'http://bit.ly/3EPgLeq', 'leo.morris@example.com'),
('evan_wright', 'password123', 'Evan Wright', 'https://tinyurl.com/9evs7hrd', 'evan.wright@example.com'),
('sophia_hall', 'password123', 'Sophia Hall', 'https://tinyurl.com/3nj8bect', 'sophia.hall@example.com'),
('mason_evans', 'password123', 'Mason Evans', 'https://pbs.twimg.com/media/FJys2k5XsAUbSW7?format=png&name=360x360', 'mason.evans@example.com'),
('victoria_green', 'password123', 'Victoria Green', 'https://hypixel.net/attachments/huh-png.2191889/', 'victoria.green@example.com'),
('liam_carter', 'password123', 'Liam Carter', 'https://tinyurl.com/ywaswyts', 'liam.carter@example.com'),
('sophia_williams', 'password123', 'Sophia Williams', 'https://dinopixel.com/preload/0324/pixel-art-1711439889.png', 'sophia.williams@example.com'),
('noah_king', 'password123', 'Noah King', 'http://bit.ly/3EPgLeq', 'noah.king@example.com'),
('ava_harris', 'password123', 'Ava Harris', 'https://tinyurl.com/3nj8bect', 'ava.harris@example.com'),
('logan_carter', 'password123', 'Logan Carter', 'https://pbs.twimg.com/media/FJys2k5XsAUbSW7?format=png&name=360x360', 'logan.carter@example.com'),
('scarlett_lee', 'password123', 'Scarlett Lee', 'https://hypixel.net/attachments/huh-png.2191889/', 'scarlett.lee@example.com');


INSERT INTO main_gym_schema.Follows (USER_OF_INTREST, FOLLOWING_USER)
VALUES
(1, 2),  -- User 1 is followed by User 2
(1, 3),  -- User 1 is followed by User 3
(1, 5),  -- User 1 is followed by User 5
(2, 1),  -- User 2 is followed by User 1
(2, 4),  -- User 2 is followed by User 4
(2, 6),  -- User 2 is followed by User 6
(3, 1),  -- User 3 is followed by User 1
(3, 4),  -- User 3 is followed by User 4
(3, 7),  -- User 3 is followed by User 7
(4, 5),  -- User 4 is followed by User 5
(4, 6),  -- User 4 is followed by User 6
(4, 8),  -- User 4 is followed by User 8
(5, 6),  -- User 5 is followed by User 6
(5, 9),  -- User 5 is followed by User 9
(6, 7),  -- User 6 is followed by User 7
(6, 10), -- User 6 is followed by User 10
(7, 8),  -- User 7 is followed by User 8
(7, 9),  -- User 7 is followed by User 9
(7, 11), -- User 7 is followed by User 11
(8, 6),  -- User 8 is followed by User 6
(8, 12), -- User 8 is followed by User 12
(9, 10), -- User 9 is followed by User 10
(9, 13), -- User 9 is followed by User 13
(10, 9), -- User 10 is followed by User 9
(10, 14), -- User 10 is followed by User 14
(11, 12), -- User 11 is followed by User 12
(11, 15), -- User 11 is followed by User 15
(12, 13), -- User 12 is followed by User 13
(12, 16), -- User 12 is followed by User 16
(13, 14), -- User 13 is followed by User 14
(13, 17), -- User 13 is followed by User 17
(14, 15), -- User 14 is followed by User 15
(14, 18), -- User 14 is followed by User 18
(15, 16), -- User 15 is followed by User 16
(15, 19), -- User 15 is followed by User 19
(16, 17), -- User 16 is followed by User 17
(16, 20), -- User 16 is followed by User 20
(17, 18), -- User 17 is followed by User 18
(17, 21), -- User 17 is followed by User 21
(18, 19), -- User 18 is followed by User 19
(18, 22), -- User 18 is followed by User 22
(19, 20), -- User 19 is followed by User 20
(19, 23), -- User 19 is followed by User 23
(20, 21), -- User 20 is followed by User 21
(20, 24), -- User 20 is followed by User 24
(21, 22), -- User 21 is followed by User 22
(21, 25), -- User 21 is followed by User 25
(22, 23), -- User 22 is followed by User 23
(22, 26), -- User 22 is followed by User 26
(23, 24), -- User 23 is followed by User 24
(23, 27), -- User 23 is followed by User 27
(24, 25), -- User 24 is followed by User 25
(24, 28), -- User 24 is followed by User 28
(25, 26), -- User 25 is followed by User 26
(25, 29), -- User 25 is followed by User 29
(26, 27), -- User 26 is followed by User 27
(26, 30), -- User 26 is followed by User 30
(27, 28), -- User 27 is followed by User 28
(27, 1),  -- User 27 is followed by User 1 (looping back)
(28, 29), -- User 28 is followed by User 29
(28, 2),  -- User 28 is followed by User 2
(29, 30), -- User 29 is followed by User 30
(29, 3),  -- User 29 is followed by User 3
(30, 1),  -- User 30 is followed by User 1 (looping back)
(30, 4);  -- User 30 is followed by User 4



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

INSERT INTO main_gym_schema.Entries (B_ID, WEIGHT, created_at, sets)
VALUES
(1, 205, '2025-02-05 10:00:00', 4),
(1, 215, '2025-02-10 10:30:00', 4),
(1, 225, '2025-02-15 10:45:00', 4),
(1, 235, '2025-02-20 11:00:00', 4),
(1, 245, '2025-02-25 11:15:00', 4),

(3, 260, '2025-02-05 09:00:00', 3),
(3, 270, '2025-02-10 09:30:00', 3),
(3, 280, '2025-02-15 10:00:00', 3),
(3, 290, '2025-02-20 10:30:00', 3),
(3, 300, '2025-02-25 11:00:00', 4),

(7, 40, '2025-02-06 08:00:00', 3),
(7, 45, '2025-02-11 08:10:00', 3),
(7, 50, '2025-02-16 08:20:00', 3),
(7, 55, '2025-02-21 08:30:00', 3),
(7, 60, '2025-02-26 08:40:00', 4),

(10, 105, '2025-03-01 07:30:00', 3),
(10, 110, '2025-03-06 07:45:00', 3),
(10, 115, '2025-03-11 08:00:00', 3),
(10, 120, '2025-03-16 08:15:00', 3),
(10, 125, '2025-03-21 08:30:00', 4),

(15, 95, '2025-03-05 06:30:00', 4),
(15, 100, '2025-03-10 06:40:00', 4),
(15, 105, '2025-03-15 06:50:00', 4),
(15, 110, '2025-03-20 07:00:00', 4),
(15, 115, '2025-03-25 07:15:00', 4),

(22, 145, '2025-03-08 09:00:00', 3),
(22, 150, '2025-03-13 09:10:00', 3),
(22, 155, '2025-03-18 09:20:00', 3),
(22, 160, '2025-03-23 09:30:00', 3),
(22, 165, '2025-03-28 09:40:00', 4),

(29, 115, '2025-03-12 10:00:00', 3),
(29, 120, '2025-03-17 10:15:00', 3),
(29, 125, '2025-03-22 10:30:00', 3),
(29, 130, '2025-03-27 10:45:00', 3),
(29, 135, '2025-04-01 11:00:00', 4),

(31, 55, '2025-03-18 07:30:00', 3),
(31, 60, '2025-03-23 07:45:00', 3),
(31, 65, '2025-03-28 08:00:00', 3),
(31, 70, '2025-04-02 08:15:00', 3),
(31, 75, '2025-04-07 08:30:00', 4),
(4, 85, '2025-02-01 07:30:00', 3),
(4, 90, '2025-02-06 07:45:00', 3),
(4, 95, '2025-02-11 08:00:00', 4),
(4, 100, '2025-02-16 08:15:00', 4),
(4, 105, '2025-02-21 08:30:00', 4),

(5, 185, '2025-02-02 06:30:00', 3),
(5, 195, '2025-02-07 06:45:00', 3),
(5, 205, '2025-02-12 07:00:00', 4),
(5, 215, '2025-02-17 07:15:00', 4),
(5, 225, '2025-02-22 07:30:00', 4),

(7, 45, '2025-02-03 09:00:00', 3),
(7, 50, '2025-02-08 09:15:00', 3),
(7, 55, '2025-02-13 09:30:00', 4),
(7, 60, '2025-02-18 09:45:00', 4),
(7, 65, '2025-02-23 10:00:00', 4),

(8, 135, '2025-02-04 10:30:00', 3),
(8, 145, '2025-02-09 10:45:00', 3),
(8, 155, '2025-02-14 11:00:00', 4),
(8, 165, '2025-02-19 11:15:00', 4),
(8, 175, '2025-02-24 11:30:00', 4),

(9, 185, '2025-02-05 07:30:00', 3),
(9, 195, '2025-02-10 07:45:00', 3),
(9, 205, '2025-02-15 08:00:00', 4),
(9, 215, '2025-02-20 08:15:00', 4),
(9, 225, '2025-02-25 08:30:00', 4),

(11, 55, '2025-02-06 06:30:00', 3),
(11, 60, '2025-02-11 06:45:00', 3),
(11, 65, '2025-02-16 07:00:00', 4),
(11, 70, '2025-02-21 07:15:00', 4),
(11, 75, '2025-02-26 07:30:00', 4),

(12, 95, '2025-02-07 08:30:00', 3),
(12, 100, '2025-02-12 08:45:00', 3),
(12, 105, '2025-02-17 09:00:00', 4),
(12, 110, '2025-02-22 09:15:00', 4),
(12, 115, '2025-02-27 09:30:00', 4),

(13, 175, '2025-02-08 07:30:00', 3),
(13, 185, '2025-02-13 07:45:00', 3),
(13, 195, '2025-02-18 08:00:00', 4),
(13, 205, '2025-02-23 08:15:00', 4),
(13, 215, '2025-02-28 08:30:00', 4),

(14, 50, '2025-02-09 06:30:00', 3),
(14, 55, '2025-02-14 06:45:00', 3),
(14, 60, '2025-02-19 07:00:00', 4),
(14, 65, '2025-02-24 07:15:00', 4)



