from Database.General import *

def UsersExercises(user_id):
	sql = '''
	SELECT * FROM Exercises WHERE u_id = %s;
	'''
	with SessionManager() as session:
		session.execute(sql, (user_id,))

		return session_to_json(session)


def GetExercise(exercise_id):
	sql = '''
	SELECT * FROM Exercises WHERE e_id = %s;
	'''
	with SessionManager() as session:
		session.execute(sql, (exercise_id,))

		return session_to_json(session)[0]

def GetData(exercise_id):
	sql = '''
	SELECT * FROM Entries WHERE Exercise_id = %s;
	'''
	with SessionManager() as session:
		session.execute(sql, (exercise_id,))

		return session_to_json(session)