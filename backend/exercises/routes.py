from backend.exercises import bp
from flask import jsonify
from flask_cors import cross_origin
from datetime import datetime

from Database import Exercises



@bp.route('/test')
def test_users():
	return "hello"

@bp.route('/<exercises_id>')
def graph_data(exercises_id):
	print(exercises_id)
	data = Exercises.GetExercise(exercises_id)
	print(data)
	data['name']

	data_entries = Exercises.GetData(exercises_id)
	print(data_entries)

	labels = []
	values = []

	for entry in data_entries:
		labels.append(entry['created_at'])
		values.append(entry['weight'])

	return jsonify(
		{
			"label": data['name'],
	  		"labels": labels,
	  		"values": values	
		}
	), 200