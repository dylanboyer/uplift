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


# checks to make sure the given username and password match up to a user in db
# BOOLEAN -> on success

def Authenticate(user_email, user_password):
	sql = '''
	SELECT 1 FROM USERS WHERE email = %s AND password = %s;
	'''
	with SessionManager() as session:
		session.execute(sql,(user_email, user_password,))
		return bool(session.fetchone())


# returns a json list of all users and their information based on a selection input
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

# gets all information about user with id
def GetUser(user_id):
	sql = '''
	SELECT * FROM PUBLICUSERS WHERE u_id = %s;
	'''
	with SessionManager() as session:
		session.execute(sql, (user_id,))

		return session_to_json(session)[0]

# create a user with all the information given
# provide a dict of user data
# returns user id
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




