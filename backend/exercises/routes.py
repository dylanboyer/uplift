from backend.exercises import bp
from flask import jsonify, session
from flask_cors import cross_origin
from datetime import datetime

from Database import Exercises
from Database import Users

import ChartBuilder


@bp.route('/<spec>/names',methods=['GET'])
def get_users_exersise(spec):
	options = ['has', 'use']
	if spec not in options:
		return jsonify({'status' : 'not valid'}), 400

	# check session
	user_id = session.get('user_id')
	if not user_id:
		return({'status' : 'no permission'}), 403

	if spec == options[0]:
		resp = Users.GetAllUsersExercises(user_id, 'name')
	else:
		resp = Users.GetUsedUsersExercises(user_id, 'name')

	return jsonify(resp), 200


@bp.route('/ranges',methods=['GET'])
def get_rep_ranges():
	return jsonify(Exercises.GetRepRanges()),200


# GET /<exercises_id>/points
# returns the json point data of a all dataentries on a given exercises

@bp.route('/<exercises_id>/points',methods=['GET'])
def get_points(exercises_id):
	user_id = session.get('user_id')
	if not user_id or ExerciseBelongsToUser(exercises_id) != user_id:
		return({'status' : 'no permission'}), 403


	data = Exercises.AllDataPoints(exercises_id, 'e_id')
	return jsonify(data), 200

# GET /<exercises_id>/view
# returns the json of all the info needed to render a charts.js component

@bp.route('/<exercises_id>/view',methods=['GET'])
def graph_data(exercises_id):
	user_id = session.get('user_id')

	print('session',user_id)
	print('found in db',Exercises.ExerciseBelongsToUser(exercises_id))
	if not user_id or Exercises.ExerciseBelongsToUser(exercises_id) != user_id:
		return({'status' : 'no permission'}), 403

	print(exercises_id)

	chart_data, chart_options = ChartBuilder.construct_basic_chart(exercises_id)

	return jsonify(
		{
			"data": chart_data,
			"options": chart_options
		}
	), 200

# POST /exercise/create
# give { name, goals [] }
# one goals for each rep range 0 if no goal wanted

@bp.route('/create',methods=['POST'])
def create_exercise():
	# check session
	user_id = session.get('user_id')
	if not user_id:
		return({'status' : 'no permission'}), 403

	rep_ranges = Exercises.GetRepRanges() # return the number of ranges from db
	ranges_count = len(rep_ranges)

	data = request.json

	goals = data['goals']
	exercise_name = data['name']

	#ensure the goals are present for every range 
	if len(goals) > ranges_count:
        return goals[:ranges_count]
    elif len(goals) < ranges_count:
        return goals + [0] * (ranges_count - len(goals))
    else:
        return goals
	

	# create one exercise for each rep range
	try:

		for rep_range_id in range(1,rep_ranges+1): # the ids start at 1
			print(user_id, rep_range_id, goals[i-1], exercise_name)

			e_id = CreateExerciseWithRange(user_id, rep_range_id, goals[i-1], exercise_name)

			print(e_id)
	except Exception as e:
		print(e)
		return jsonify('status' : 'no'), 400

	return jsonify('status' : 'no'), 200





