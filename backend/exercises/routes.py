from backend.exercises import bp

@bp.route('/test')
def test_users():
	return "hello world from exercises"