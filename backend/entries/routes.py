from backend.entries import bp
from flask import jsonify

from Database import Exercises

@bp.route('/<entry_id>')
def get_entry_data(entry_id):
	data = Exercises.GetDataPoint(entry_id)

	return jsonify(data), 200