from flask import Blueprint

bp = Blueprint('posts', __name__)

from backend.posts import routes