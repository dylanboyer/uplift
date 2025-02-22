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


def UsersExercises(user_id):
	sql = '''
	SELECT * FROM Exercises WHERE u_id = %s;
	'''
	with SessionManager() as session:
		session.execute(sql, (user_id,))

		return session_to_json(session)


def GetExercise(exercise_id):
	sql = '''
	SELECT e.name, e.goal, e.u_id, r.label FROM Exercises e INNER JOIN RepRange r ON r.r_id = e.RepRange_ID WHERE e_id = %s;
	'''
	with SessionManager() as session:
		session.execute(sql, (exercise_id,))

		return session_to_json(session)

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
	ranges_count = CountRepRanges()

	if len(goals) > ranges_count:
		goals = goals[:ranges_count]
	elif len(goals) < ranges_count:
		goals = goals + [0] * (ranges_count - len(goals))

	status = True
	for i in range(1,CountRepRanges()+1):
		print(i)
		resp = CreateExerciseWithRange(user_id, i, goals[i-1],name)
		print(resp)
		if not resp:
			status = False

	return status


def CreateExerciseWithRange(user_id, rep_range_id, goal, name):
	sql = '''
	INSERT INTO Exercises (U_ID, REPRANGE_ID, GOAL, NAME) VALUES (%s, %s, %s, %s) RETURNING E_ID;
	'''
	with SessionManager() as session:
		session.execute(sql, (user_id,rep_range_id,goal,name,))
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

def AllDataPoints(exercise_id, *selection):
	args = len(selection)
	print(args)
	selection_text = '*'
	if args > 0:
		selection_text = ','.join(selection)

	sql = '''
	SELECT {} FROM Entries WHERE Exercise_id = %s;
	'''.format(selection_text)

	print(sql)

	with SessionManager() as session:
		session.execute(sql,(exercise_id,))

		if args == 1:
			return session_single_to_json(session)
		else:
			return session_to_json(session)

def AddDataPoint(exercise_id, weight, date=None):
	sql = '''
	INSERT INTO ENTRIES (EXERCISE_ID, WEIGHT) VALUES (%s, %s) RETURNING E_ID;
	'''
	with SessionManager() as session:
		session.execute(sql, (exercise_id,weight,))
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
