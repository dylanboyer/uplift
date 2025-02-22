from backend.exercises import bp
from flask import jsonify
from flask_cors import cross_origin
from datetime import datetime

from Database import Exercises

import ChartBuilder

@bp.route('/test')
def test_users():
	return "hello"

@bp.route('/<exercises_id>/points')
def get_points(exercises_id):
	data = Exercises.AllDataPoints(exercises_id, 'e_id')
	return jsonify(data), 200

@bp.route('/<exercises_id>/view')
def graph_data(exercises_id):
	print(exercises_id)

	chart_data, chart_options = ChartBuilder.construct_basic_chart(exercises_id)

	return jsonify(
		{
			"data": chart_data,
			"options": chart_options
		}
	), 200
