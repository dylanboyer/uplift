from backend.users import bp
from flask import jsonify, request, session

from Database import Users
from Database import Exercises

# GET /users/all_id
# returns json list of all users id

@bp.route('/all_id')
def get_all_ids():
	return jsonify(Users.AllUsers('u_id')), 200

@bp.route('/session')
def give_session_data():
	if session.get("user_id"):
		return jsonify({'is_valid' : True}), 200
	return jsonify({'is_valid' : False}), 400

# GET /users/all
# returns json list of all users information

@bp.route('/all')
def get_all_user_data():
	return jsonify(Users.AllUsers()), 200


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
	return 200


# POST /users/create
#	DATA { name, email, username, password }
# {'status' : 'ok', 'u_id' : <users_id>}, 200 on success
# {'status' : 'no'}, 400 on failure

@bp.route('/create', methods=['POST'])
def create_user():
	data = request.json
	try:
		new_id = Users.CreateUser(data)
		session['user_id'] = new_id

		# add all the basic lifts

		for lift in Exercises.Default_Exercises:
			status = Exercises.CreateAllExerciseRanges(new_id, [0], lift)
			print('status on create', status, 'adding',lift)



		return jsonify({'status' : 'ok', 'u_id' : new_id}), 200
	except Exception as e:
		print(e)
		return jsonify({'status' : 'no'}), 400