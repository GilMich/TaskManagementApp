from flask import Flask, request, jsonify
from models import db, User, Task
from flask_jwt_extended import JWTManager
from flask_cors import CORS
# from flask_sqlalchemy import SQLAlchemy
from routes.auth_routes import auth_bp
from routes.tasks_routes import tasks_bp

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Initialize the DB
app.config.from_object('config.Config')
db.init_app(app)


# Initialize JWT
jwt = JWTManager(app)

# add Routes to the app
app.register_blueprint(auth_bp, url_prefix='')
app.register_blueprint(tasks_bp, url_prefix='/tasks')

@app.route('/test', methods=['GET'])
def test_route():
    return "Test route works!"
    
# Create database tables when the app starts, within the application context
with app.app_context():
    db.create_all()  # Create tables when the app starts
    

if __name__ == '__main__':
# Create the database tables when nesscesery
    with app.app_context():
        db.create_all()
    app.run(debug=True)
