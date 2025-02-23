from Database import Exercises

BORDER_COLOR = '#fe019a'
BACKGROUND_COLOR = '#f32c87'
GOAL_LINE_COLOR = '#A7D15C'


def construct_basic_chart(bucket_id):
	data = Exercises.GetExerciseBucket(bucket_id)[0]
	data_entries = Exercises.AllDataPoints(bucket_id)


	print(data)
	print(data_entries)
	
	data['data_label'] = f"{data['name']}, {data['label']} Rep Range"

	labels = []
	values = []

	for entry in data_entries:
		labels.append(entry['created_at'].isoformat())  # Convert datetime to ISO format
		values.append(entry['weight'])

	if len(data_entries) == 0:
		return empty_chart(data)

	# Correct dataset format
	datapoints = [
		{ # real data
			'label': 'Progress',
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
			'borderDash': [5, 5],
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
				'text': data['data_label'],
				'color': 'white'
			},
			'legend': {
				'labels': {
					'color': 'white',
				}
			}
		},
		'scales': {
			'x': {
				'type': 'time',
				'time': {
					'unit': 'day'
				},
				'min': labels[0],  # Prevent IndexError
				'ticks': {
					'autoSkip': True
				}
			},
			'y': {
				'beginAtZero': True,
				'min': 0,
				'max': int(max(*values,data['goal']) * 1.25) if values else 0  # Prevents errors on empty lists
			}
		}
	}

	return data_point_formatting, options_formatting


def empty_chart(exercise_data):
    empty_dataset = {
        "labels": [],
        "datasets": [{
            "label": 'Progress',
            "data": [],
            "borderColor": "#ccc",  # Light gray for empty chart line
            "backgroundColor": BORDER_COLOR,  # Light gray for background
            "borderWidth": 2,
            "fill": True
        }]
    }

    options = {
        "responsive": True,
        "plugins": {
            "title": {
                "display": True,
                "text": exercise_data['data_label'],
                "color": "white"
            },
            "legend": {
                "labels": {
                    "color": "white",
                }
            }
        },
        "scales": {
            "x": {
                "type": "time",
                "time": {
                    "unit": "day",
                    "tooltipFormat": "ll"
                },
                "min": "2025-01-01T00:00:00Z",  # Placeholder min date
                "max": "2025-12-31T23:59:59Z",  # Placeholder max date
                "ticks": {
                    "autoSkip": True
                }
            },
            "y": {
                "min": 0,
                "max": int(exercise_data['goal'] * 1.25),
                "ticks": {
                    "display": False  # Hide y-axis ticks for a cleaner placeholder
                }
            }
        }
    }

    return empty_dataset, options

