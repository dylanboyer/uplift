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

# given exercises id return 
# { name : name, goals[] ... # of goals it has and what thry are}
def GetExerciseInformation(exercise_id):
	sql ='''
	SELECT e.name, b.goal FROM ExerciseBuckets b INNER JOIN Exercises e ON b.e_id = e.e_id WHERE e.e_id = %s ORDER BY b.RepRange_ID;
	'''
	with SessionManager() as session:
		session.execute(sql, (exercise_id,))

		response = session_to_json(session)

	joined_response = {
		'name' : response[0]['name'],
		'goals' : []
	}

	for entry in response:
		joined_response['goals'].append(entry['goal'])

	print(joined_response)

	return joined_response
	

def UpdateExerciseInformation(exercise_id, name, goals):
	bucket_script = 'UPDATE ExerciseBuckets SET goal = %s WHERE RepRange_ID = %s AND e_id = %s;'
	sql = '''
	UPDATE Exercises SET name = %s WHERE e_id = %s;
	'''
	for range_id in range(1,len(goals) + 1):
		sql += bucket_script%(goals[range_id-1], range_id, exercise_id)

	try:
		with SessionManager() as session:
			session.execute(sql, (name,exercise_id,))

	except Exception as e:
		print(e)
		return False

	return True

def DeleteExercise(exercise_id):
	sql = '''
	DELETE FROM Exercises WHERE e_id = %s;
	'''
	try:
		with SessionManager() as session:
			session.execute(sql, (exercise_id,))

	except Exception as e:
		print(e)
		return False

	return True


# given a user return all Exercises owned by user
def UsersExercises(user_id):
	sql = '''
	SELECT e_id FROM Exercises WHERE u_id = %s;
	'''
	with SessionManager() as session:
		session.execute(sql, (user_id,))

		return session_single_to_json(session)

# given a user return all Buckets owned by user
def UsersBuckets(user_id):
	sql = '''
	SELECT b.b_id FROM ExerciseBuckets b INNER JOIN Exercises e ON e.e_id = b.e_id WHERE e.u_id = %s AND b.entry_count > 0;
	'''
	with SessionManager() as session:
		session.execute(sql, (user_id,))

		return session_single_to_json(session)

# get summary over Exercise with the bucket in mind 
# return { name, goal, u_id, label}
#		 lift name, goal, user, rep range
def GetExerciseBucket(bucket_id):
	#  
	sql = '''
	SELECT e.name, b.goal, e.u_id, r.label FROM Exercises e 
		INNER JOIN ExerciseBuckets b ON b.e_id = e.e_id 
		INNER JOIN RepRange r ON r.r_id = b.reprange_id
		WHERE b.b_id = %s;
	'''
	with SessionManager() as session:
		session.execute(sql, (bucket_id,))

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

	query = ""
	for i in range(1,CountRepRanges()+1):
		query += CreateExerciseBucket(exercise_id, i, goals[i-1])

	with SessionManager() as session:
		session.execute(query)


def CreateExerciseBucket(exercise_id, rep_range_id, goal):
	return 'INSERT INTO ExerciseBuckets (E_ID, REPRANGE_ID, GOAL) VALUES (%d, %d, %d);'%(exercise_id, rep_range_id, goal)
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
		session.execute(sql,(bucket_id,))

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
