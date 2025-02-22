from flask import Blueprint

bp = Blueprint('exercises', __name__)

from backend.exercises import routes