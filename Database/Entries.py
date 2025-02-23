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

def CreateEntry(exercise_id, weight, sets, date, rep_range_id):
    sql = '''
    INSERT INTO main_gym_schema.Entries (B_ID, WEIGHT, SETS, created_at, reprange_id) 
    VALUES (
        (SELECT B_ID 
         FROM main_gym_schema.ExerciseBuckets 
         WHERE E_ID = %s AND RepRange_ID = %s),
        %s, %s, %s, %s
    ) 
    RETURNING E_ID;
    '''
    
    with SessionManager() as session:
        session.execute(sql, (exercise_id, rep_range_id, weight, sets, date, rep_range_id))

        resp = session.fetchone()
        if not resp:
            return False
        return True
