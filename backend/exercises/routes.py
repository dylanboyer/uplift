from backend.exercises import bp
from flask import jsonify, session
from flask_cors import cross_origin
from datetime import datetime

from Database import Exercises

import ChartBuilder

@bp.route('/<exercises_id>/points')
def get_points(exercises_id):
	user_id = session.get('user_id')
	if not user_id or ExerciseBelongsToUser(exercises_id) != user_id:
		return({'status' : 'no permission'}), 403


	data = Exercises.AllDataPoints(exercises_id, 'e_id')
	return jsonify(data), 200

@bp.route('/<exercises_id>/view')
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
