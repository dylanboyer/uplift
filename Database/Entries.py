from Database.General import *


def UpdateEntry(entry_id, weight, sets, date):
	sql = '''
	UPDATE ENTRIES SET weight = %s, sets = %s, created_at = %s WHERE e_id = %s;
	'''
	with SessionManager() as session:
		session.execute(sql,(weight,sets,created_at,entry_id,))
	return True

def DeleteEntry(entry_id):
	sql = '''
	DELETE FROM ENTRIES WHERE e_id = %s;
	'''
	with SessionManager() as session:
		session.execute(sql,(entry_id,))

	return True

def CreateEntry(bucket_id, weight, sets, date, rep_range_id):
	sql = '''
	INSERT INTO ENTRIES (b_id weight, sets, created_at, reprange_id) VALUES %s, %s, %s, %s, %s RETURNING e_id;
	'''
	with SessionManager() as session:
		session.execute(sql,(bucket_id,weight,sets,date,rep_range_id,))

		resp = session.fetchone()
		if not resp:
			return False
		return True

'''
def UpdateExerciseInformation(exercise_id, name, goals):
	bucket_script = 'UPDATE ExerciseBuckets SET goal = %s WHERE RepRange_ID = %s AND e_id = %s;'
	sql = '''
	#UPDATE Exercises SET name = %s WHERE e_id = %s;
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
'''