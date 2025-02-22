from backend.users import bp
from flask import jsonify, request, session

from Database import Users

# GET /users/all_id
# returns json list of all users id

@bp.route('/all_id')
def get_all_ids():
	print(session.get("name"))
	if session.get("name"):
		return jsonify(Users.AllUsers('u_id')), 200
	return jsonify({}), 400

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

	if Users.Authenticate(data['email'],data['password']):
		session['name'] = data['email']
		return jsonify({'status':'ok'}), 200
	return jsonify({'status':'no'}), 400

# POST /users/logout
# remove session and log out user

@bp.route('/logout', methods=['POST'])
def user_log_out():
	session['name'] = None
	return 200


# POST /users/create
#	DATA { name, email, username, password }
# {'status' : 'ok'}, 200 on success
# {'status' : 'no'}, 400 on failure

@bp.route('/create', methods=['POST'])
def create_user():
	pass