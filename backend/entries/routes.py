from backend.entries import bp

@bp.route('/test')
def test_users():
	return "hello world from entries"