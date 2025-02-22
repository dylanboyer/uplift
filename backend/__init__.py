from flask import Flask
import config
import secrets
from flask_session import Session
from flask_cors import CORS

def create_app(config=None):
	app = Flask(__name__)
	app.secret_key = secrets.token_urlsafe(16)

	app.config["SESSION_PERMANENT"] = False
	app.config["SESSION_TYPE"] = "filesystem"
	app.config['SESSION_PERMANENT'] = False
	app.config['SESSION_COOKIE_HTTPONLY'] = True  # Prevent JavaScript access
	app.config['SESSION_COOKIE_SAMESITE'] = "None"  # Needed for cross-origin
	app.config['SESSION_COOKIE_SECURE'] = True  # Must be True in production (HTTPS)
	Session(app)

	CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

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
