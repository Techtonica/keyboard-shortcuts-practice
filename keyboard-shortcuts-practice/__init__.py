from flask import Flask
from config import Config
from flask_login import LoginManager

app = Flask(__name__)
app.config.from_object(Config)
login_manager = LoginManager()

from app import routes, models
