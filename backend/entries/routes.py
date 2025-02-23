from backend.entries import bp
from flask import jsonify, request

from Database import Exercises
from Database import Entries


@bp.route('/<entry_id>',methods=['GET','POST','DELETE'])
def get_entry_data(entry_id):
	if request.method == 'GET': # get
		data = Exercises.GetDataPoint(entry_id)
		return jsonify(data), 200
	elif request.method == 'POST': #update
		data = request.json
		# goal
		# name

	elif request.method == 'DELETE': #delete
		pass

	return jsonify({'status', 'no'}), 400


#POST /entries/create
# provide {rep_range_id, sets, weight, date, exercise_name}
@bp.route('/create',methods=['POST'])
def create_entry():
	data = request.json
	# check session
	user_id = session.get('user_id')

	if not user_id:
		return({'status' : 'no permission'}), 403


	# i need to check that the user has a exercise with this rep_range and name

	response = Entries.CreateEntry(
		user_id,
		data['exercise_name'], 
		data['rep_range_id'], 
		data['weight'], 
		data['date'],
		data['sets']
		)

	if response:
		return jsonify({'status' : 'ok'}), 200
	return jsonify({'status' : 'no'}), 400

