from Database import Exercises

def construct_basic_chart(exercise_id):
	data = Exercises.GetExercise(exercise_id)
	data_entries = Exercises.AllDataPoints(exercise_id)

	BORDER_COLOR = '#fe019a'
	BACKGROUND_COLOR = '#f32c87'
	GOAL_LINE_COLOR = '#39FF14'

	data_label = f"{data['name']}, {data['label']} Rep Range"

	labels = []
	values = []

	for entry in data_entries:
		labels.append(entry['created_at'].isoformat())  # Convert datetime to ISO format
		values.append(entry['weight'])

	# Correct dataset format
	datapoints = [
		{ # real data
			'label': data_label,
			'data': values,  # Data should be an array
			'borderColor': BORDER_COLOR,
			'backgroundColor': BACKGROUND_COLOR,
			'fill': True
		},
		{ # constant line
			'label': 'Goal Line',
			'data': [
				{'x' : labels[0] , 'y' : data['goal']},
				{'x' : labels[-1] , 'y' : data['goal']}
			],  # Data should be an array
			'borderColor': GOAL_LINE_COLOR,
			'backgroundColor': GOAL_LINE_COLOR,
			'fill': True,
			'type' : 'line'
		}

	]

	data_point_formatting = {
		'labels': labels,
		'datasets': datapoints
	}

	# Ensure there's a valid goal value
	goal_value = data.get('goal', 0)

	options_formatting = {
		'responsive': True,
		'plugins': {
			'title': {
				'display': True,
				'text': data_label,
				'color': 'white'
			}
		},
		'scales': {
			'x': {
				'type': 'time',
				'time': {
					'unit': 'day',
					'tooltipFormat': 'll'
				},
				'min': labels[0],  # Prevent IndexError
				'ticks': {
					'autoSkip': True
				}
			},
			'y': {
				'beginAtZero': True,
				'min': 0,
				'max': int(max(values) * 1.25) if values else 0  # Prevents errors on empty lists
			}
		}
	}

	return data_point_formatting, options_formatting
