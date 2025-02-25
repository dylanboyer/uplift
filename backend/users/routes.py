from backend.users import bp
from flask import jsonify, request, session
import threading

from Database import Users
from Database import Exercises

# POST users/follow
# data { u_id : } <- id of user ur wanna follow
@bp.route('/follow/', methods=['POST'])
def follow_user():
	data = request.json

	user_id = session.get('user_id')
	if not user_id:
		return jsonify({'status' : 'no permission'}), 403

	Users.FollowUser(int(user_id), int(data['u_id']))

	return jsonify({'status' : 'ok'}), 200

# POST users/unfollow
# data { u_id : } <- id of user ur wanna follow
@bp.route('/unfollow/', methods=['POST'])
def unfollow_user():
	data = request.json

	

	user_id = session.get('user_id')
	if not user_id:
		return jsonify({'status' : 'no permission'}), 403

	Users.UnfollowUser(int(user_id), int(data['u_id']))

	return jsonify({'status' : 'ok'}), 200

@bp.route('/is_following/<user_id>', methods=['GET'])
def check_if_following(user_id):
	my_user_id = session.get('user_id')
	if not my_user_id:
		return jsonify({'status' : 'no permission'}), 403
	resp = Users.CheckIsFollowing(my_user_id,user_id)

	print('is following', resp)

	return jsonify({'isFollowing' : resp}), 200

# GET /users/all_id
# returns json list of all users id

@bp.route('/all_id')
def get_all_ids():
	return jsonify(Users.AllUsers('u_id')), 200

@bp.route('/session')
def give_session_data():
	if session.get("user_id"):
		return jsonify({'is_valid' : True , 'user_id' : session.get("user_id")}), 200
	return jsonify({'is_valid' : False}), 400

# GET /users/all
# returns json list of all users information

@bp.route('/all')
def get_all_user_data():
	return jsonify(Users.AllUsers('u_id','username', 'name')), 200


# GET /users/<user_id>/exercises
# returns list of { e_id }

@bp.route('/<user_id>/exercises')
def get_all_users_exercises(user_id):
	print(user_id)
	resp = Exercises.UsersExercises(user_id)
	print(resp)
	return jsonify(resp), 200

# get /users/<user_id>/exercises
# retusn list of json elemnts of {b_id}
@bp.route('/<user_id>/buckets')
def get_all_users_buckets(user_id):
	print(user_id)
	resp = Exercises.UsersBuckets(user_id)
	print(resp)
	return jsonify(resp), 200


# GET /users/<user_id>
# returns json information of user with given id

@bp.route('/<id>')
def get_user_by_id(id):
	return jsonify(Users.GetUser(id)), 200


# POST /users/login
# 	DATA {'username', 'password'}
# 200 on successful user login, 400 on unsuccess

@bp.route('/login', methods=['POST'])
def user_log_in():
	# username
	# password
	data = request.json
	print(data)

	user_id = Users.Authenticate(data['email'],data['password'])

	if user_id:
		session['user_id'] = user_id
		return jsonify({'status':'ok'}), 200
	return jsonify({'status':'no'}), 400

# POST /users/logout
# remove session and log out user

@bp.route('/logout', methods=['POST'])
def user_log_out():
	session['user_id'] = None
	return jsonify({'status':'ok'}), 200


@bp.route('/accomplishments/<user_id>')
def get_achivements(user_id):
	achives = Users.GetAchievements(user_id)
	print(achives)
	print()
	print()
	print()
	print()
	print()
	
	return jsonify(achives), 200

# POST /users/create
#	DATA { name, email, username, password }
# {'status' : 'ok', 'u_id' : <users_id>}, 200 on success
# {'status' : 'no'}, 400 on failure

@bp.route('/create', methods=['POST'])
def create_user():
	data = request.json

	# add all the defualt exersise in the background
	def background_task(user_id):
		# This function will run in the background.
		try:
			for lift in Exercises.Default_Exercises:
				status = Exercises.CreateAllExerciseRanges(user_id, [0], lift)
				print('status on create', status, 'adding', lift)
		except Exception as e:
			print(f"Error while adding exercises: {e}")

	try:
		new_id = Users.CreateUser(data)
		session['user_id'] = new_id

		threading.Thread(target=background_task, args=(new_id,)).start()

		return jsonify({'status' : 'ok', 'u_id' : new_id}), 200
	except Exception as e:
		print(e)
		return jsonify({'status' : 'no'}), 400