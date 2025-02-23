from Database.General import *


def FollowUser(current_user, user_to_follow_id):
	sql = '''
	INSERT INTO FOLLOWS (USER_OF_INTREST, FOLLOWING_USER) VALUES (%s, %s);
	'''
	with SessionManager() as session:
		session.execute(sql,(current_user,user_to_follow_id,))

def UnfollowUser(current_user, user_to_unfollow_id):
	sql = '''
	DELETE FROM FOLLOWS WHERE USER_OF_INTREST = %s AND FOLLOWING_USER = %s;
	'''
	with SessionManager() as session:
		session.execute(sql,(current_user,user_to_unfollow_id,))

# check if current user follows user of intersest

def CheckIsFollowing(current_user, user_of_interest):
	sql = '''
	SELECT 1 FROM FOLLOWS WHERE USER_OF_INTREST = %s AND FOLLOWING_USER = %s;
	'''
	with SessionManager() as session:
		session.execute(sql,(current_user,user_of_interest,))
		response = session.fetchone()
		return not not response


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
	SELECT u_id FROM USERS WHERE email = %s AND password = %s;
	'''
	with SessionManager() as session:
		session.execute(sql,(user_email, user_password,))
		response = session.fetchone()
		if not response:
			return None
		return response[0]


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

		return session_to_json(session)

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

# collecteds all the exerisies a given user has active with or without data
def GetAllUsersExercises(user_id, *selection):
	args = len(selection)
	selection_text = '*'
	if selection:
		selection_text = ','.join(selection)

	sql = '''
	SELECT {} FROM Exercises WHERE u_id = %s;
	'''.format(selection_text)
	print(sql)
	with SessionManager() as session:
		session.execute(sql, (user_id,))

		if args == 1:
			return session_single_to_json(session)
		else:
			return session_to_json(session)

# collecteds all the exerisies a given user has active only with data entries
def GetUsedUsersExercises(user_id, *selection):
	args = len(selection)
	selection_text = '*'
	if selection:
		selection_text = ','.join(selection)

	sql = '''
	SELECT {} FROM Exercises WHERE u_id = %s AND EXISTS (SELECT 1 FROM ExerciseBuckets WHERE ENTRY_COUNT > 0);
	'''.format(selection_text)
	print(sql)
	with SessionManager() as session:
		session.execute(sql, (user_id,))

		if args == 1:
			return session_single_to_json(session)
		else:
			return session_to_json(session)

