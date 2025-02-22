from backend.users import bp
from flask import jsonify, request, session

from Database import Users

@bp.route('/all_id')
def get_all_ids():
	print(session.get("name"))
	if session.get("name"):
		return jsonify(Users.AllUsers('u_id')), 200
	return jsonify({}), 400

@bp.route('/all')
def get_all_user_data():
	return jsonify(Users.AllUsers()), 200

@bp.route('/<id>')
def get_user_by_id(id):
	return jsonify(Users.GetUser(id)), 200

@bp.route('/login', methods=['POST'])
def user_log_in():
	# username
	# password
	data = request.json

	if Users.Authenticate(data['username'],data['password']):
		session['name'] = data['username']
		return 200
	return 400

@bp.route('/logout', methods=['POST'])
def user_log_out():
	session['name'] = None
	return 200

@bp.route('/create', methods=['POST'])
def create_user():
	pass