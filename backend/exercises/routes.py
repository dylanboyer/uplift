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
	data_entries = Exercises.GetData(exercises_id)


	data_label = "%s, %s Rep Range"%(data['name'],data['label'])
	print(data_entries)

	labels = []
	values = []

	for entry in data_entries:
		labels.append(entry['created_at'].isoformat())
		values.append(entry['weight'])

	print({
			"goal" : data['goal'],
			"label": data_label,
	  		"labels": labels,
	  		"values": values	
		})

	return jsonify(
		{
			"goal" : data['goal'],
			"label": data_label,
	  		"labels": labels,
	  		"values": values	
		}
	), 200