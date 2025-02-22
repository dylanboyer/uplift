from flask import Flask
import config
import secrets

def create_app(config=None):
	print("ok")
	app = Flask(__name__)
	app.secret_key = secrets.token_urlsafe(16)

	# from app.general import bp as general_bp
	# app.register_blueprint(general_bp)

	from backend.users import bp as users_bp
	app.register_blueprint(users_bp, url_prefix='/users')

	from backend.posts import bp as posts_bp
	app.register_blueprint(posts_bp, url_prefix='/posts')

	from backend.exercises import bp as exercises_bp
	app.register_blueprint(exercises_bp, url_prefix='/exercises')

	from backend.entries import bp as entries_bp
	app.register_blueprint(entries_bp, url_prefix='/entries')

	return app
