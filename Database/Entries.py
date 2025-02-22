from Database.General import *


def CreateEntry(user_id, exercise_name, rep_range_id, weight, date, set_count):
	sql = '''
	INSERT INTO Entries (Exercise_ID, WEIGHT, SETS, CREATED_AT)
	SELECT e_id, %s, %s, %s
	FROM Exercises
	WHERE name = %s AND reprange_id = %s AND u_id = %s
	RETURNING entry_id;
	'''
	with SessionManager() as session:
		session.execute(sql, (weight, set_count, date, exercise_name, rep_range_id, user_id))

		resp = session.fetchone()
		if not resp:
			return None
		else:
			return resp[0]
