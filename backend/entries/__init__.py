from flask import Blueprint

bp = Blueprint('entries', __name__)

from backend.entries import routes