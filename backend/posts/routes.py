from backend.posts import bp

@bp.route('/test')
def test_users():
	return "hello world from posts"