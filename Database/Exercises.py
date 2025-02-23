from Database.General import *

Default_Exercises = [
    'Dumbbell Bench Press',
    'Barbell Bench Press',
    'Squat',
    'Deadlift',
    'Lat Pulldown',
    'Rows',
    'Chest Flys',
    'Bicep Curls',
    'Tricep Extensions',
    'Shoulder Press',
    'Lateral Raises',
    'Leg Extensions',
    'Leg Curls',
    'Calf Raises'
]

# given a user return all Exercises owned by user
def UsersExercises(user_id):
	sql = '''
	SELECT e_id FROM Exercises WHERE u_id = %s;
	'''
	with SessionManager() as session:
		session.execute(sql, (user_id,))

		return session_to_json(session)

# get summary over Exercise with the bucket in mind 
def GetExerciseBucket(exercise_id, rep_range_id):
	return "DO THIS LATER"
	sql = '''
	SELECT e.name, b.goal, e.u_id, r.label FROM Exercises e 
		INNER JOIN ExerciseBucket b ON b.e_id = e.e_id 
		INNER JOIN RepRange r ON r.r_id = b.r_id
		WHERE e_id = %s;
	'''
	with SessionManager() as session:
		session.execute(sql, (exercise_id,))

		return session_to_json(session)

# returns the owner of the exercise
def ExerciseBelongsToUser(exercise_id):
	sql = '''
	SELECT u_id FROM Exercises WHERE e_id = %s;
	'''
	with SessionManager() as session:
		session.execute(sql, (exercise_id,))

		return session_single_to_json(session)


def GetRepRanges():
	sql = '''
	SELECT label FROM RepRange;
	'''
	with SessionManager() as session:
		session.execute(sql)

		return session_single_to_json(session)

def CountRepRanges():
	sql = '''
	SELECT count(*) FROM RepRange;
	'''
	with SessionManager() as session:
		session.execute(sql)

		return session.fetchone()[0]

def CreateAllExerciseRanges(user_id, goals, name):
	# add Exercise to db
	sql = '''
	INSERT INTO Exercises (U_ID, NAME) VALUES (%s, %s) RETURNING E_ID;
	'''
	with SessionManager() as session:
		session.execute(sql, (user_id,name))
		resp = session.fetchone()
		print('exercise_id created',resp)
		exercise_id	= resp[0]

	ranges_count = CountRepRanges()

	if len(goals) > ranges_count:
		goals = goals[:ranges_count]
	elif len(goals) < ranges_count:
		goals = goals + [0] * (ranges_count - len(goals))

	status = True
	for i in range(1,CountRepRanges()+1):
		print(i)
		resp = CreateExerciseBucket(exercise_id, i, goals[i-1])
		print(resp)
		if not resp:
			status = False

	return status


def CreateExerciseBucket(exercise_id, rep_range_id, goal):
	sql = '''
	INSERT INTO ExerciseBuckets (E_ID, REPRANGE_ID, GOAL) VALUES (%s, %s, %s) RETURNING B_ID;
	'''
	with SessionManager() as session:
		session.execute(sql, (exercise_id,rep_range_id,goal,))
		resp = session.fetchone()
		print(resp)
		return resp[0]
'''
DATA POINTS

ADD 
REMOVE
UPDATE
GET ALL

'''

def GetDataPoint(entry_id):
	sql = '''
	SELECT * FROM Entries WHERE e_id = %s;
	'''
	with SessionManager() as session:
		session.execute(sql, (entry_id,))

		return session_to_json(session)[0]

def AllDataPoints(bucket_id, *selection):
	args = len(selection)
	print(args)
	selection_text = '*'
	if args > 0:
		selection_text = ','.join(selection)

	sql = '''
	SELECT {} FROM Entries WHERE B_id = %s;
	'''.format(selection_text)

	print(sql)

	with SessionManager() as session:
		session.execute(sql,(exercise_id,))

		if args == 1:
			return session_single_to_json(session)
		else:
			return session_to_json(session)

def AddDataPoint(bucket_id, weight, date=None):
	sql = '''
	INSERT INTO ENTRIES (B_ID, WEIGHT) VALUES (%s, %s) RETURNING E_ID;
	'''
	with SessionManager() as session:
		session.execute(sql, (bucket_id,weight,))
		return session_to_json(session)[0]

def RemoveDataPoint(entry_id):
	sql = '''
	DELETE FROM ENTRIES WHERE e_id = %d;
	'''
	with SessionManager() as session:
		session.execute(sql, (entry_id,))

		return True

	return False

def UpdateDataPoint(entry_id, fields):
	
	setting_fields = []
	for key, value in fields.items():
		setting_fields.append('{0} = %({0})s'.format(key))

	fields['entry_id'] = entry_id

	sql = '''
	UPDATE ENTRIES SET {} WHERE e_id = %(entry_id)s
	'''.format(', '.join(setting_fields))
	with SessionManager() as session:
		session.execute(sql, fields)

		return True

	return False

# def UpdateDataPoint()
