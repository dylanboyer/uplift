from Database.General import *

'''
GET
 - get all
 - get one based on id
UPDATE
 - update based on id
CREATE

DELETE
'''

def Authenticate(user_name, user_password):
	sql = '''
	SELECT 1 FROM USERS WHERE username = %s AND password = %s;
	'''
	with SessionManager() as session:
		session.execute(sql,(user_name, user_password,))
		return bool(session.fetchone())


def AllUsers(*selection):
	args = len(selection)
	selection_text = '*'
	if selection:
		selection_text = ','.join(selection)

	sql = '''
	SELECT %s FROM PUBLICUSERS;
	'''%selection_text
	print(sql)
	with SessionManager() as session:
		session.execute(sql)

		if args == 1:
			return session_single_to_json(session)
		else:
			return session_to_json(session)

def GetUser(user_id):
	sql = '''
	SELECT * FROM PUBLICUSERS WHERE u_id = %s;
	'''
	with SessionManager() as session:
		session.execute(sql, (user_id,))

		return session_to_json(session)[0]

def CreateUser(user_json):
	args = []
	values = []

	for key, value in user_json.items():
		values.append("%({})s".format(key))
		args.append(key)

	value_string = ', '.join(values)

	sql = '''
	INSERT INTO USERS (%s) VALUES (%s) RETURNING U_ID;
	'''%(','.join(args),value_string)

	with SessionManager() as session:
		session.execute(sql,user_json)

		user_id = session.fetchone()
		return user_id[0]




