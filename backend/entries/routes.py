from backend.entries import bp
from flask import jsonify, request

from Database import Exercises
from Database import Entries

# GET /entries/<entry_id>
#  returns { e_id, b_id, reprange_id, weight, sets, created_at }
# DELETE /entries/<entry_id>
# deletes entry
# POST /entries/<entry_id>
# data {weight, date, sets}

@bp.route('/<entry_id>',methods=['GET','POST','DELETE'])
def get_entry_data(entry_id):
	if request.method == 'GET': # get
		data = Exercises.GetDataPoint(entry_id)
		return jsonify(data), 200
	elif request.method == 'POST': #update
		data = request.json
		# weight
		# set
		# created_at
		# (entry_id, weight, sets, date)
		Entries.UpdateEntry(entry_id, data['weight'], data['sets'], data['date'])

		return jsonify({'status', 'ok'}), 200

	elif request.method == 'DELETE': #delete
		Entries.DeleteEntry(entry_id)
		return jsonify({'status', 'ok'}), 200

	return jsonify({'status', 'no'}), 400


#POST /entries/create
# provide {rep_range_id, sets, weight, date, b_id}
@bp.route('/create',methods=['POST'])
def create_entry():
	data = request.json
	# check session
	user_id = session.get('user_id')

	if not user_id:
		return({'status' : 'no permission'}), 403


	# bucket_id, weight, sets, date, rep_range_id

	response = Entries.CreateEntry(data['b_id'],data['weight'],data['sets'],data['date'],data['rep_range_id'])

	if response:
		return jsonify({'status' : 'ok'}), 200
	return jsonify({'status' : 'no'}), 400

