from flask import request, jsonify, Blueprint
from models import User, db
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from werkzeug.exceptions import NotFound
from sqlalchemy.exc import SQLAlchemyError


bcrypt = Bcrypt()

auth_bp = Blueprint('auth', __name__)

# User Registration

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        # Get the username and password from the request
        data = request.get_json()
        new_username = data.get('username')
        new_password = data.get('password')

        # Check if the username and password are provided
        if not new_username or not new_password:
            return jsonify({"error": "username and password are required"}), 400

        # Check if the username already exists
        user = User.query.filter_by(username=new_username).first()
        if user:
            return jsonify({"error": "Username already exists"}), 400

        # Create a new user    
        hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        new_user = User(username=new_username, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"id": new_user.id, "username": new_user.username})

    # Handle exceptions
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": "Database Error", "message":str(e)}), 500

    except Exception as e:
        return jsonify({"error": "An error occurred", "message":str(e)}), 500


# User Login
@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        # Get the username and password from the request
        data = request.get_json()
        username_from_request = data.get('username')
        password_from_request = data.get('password')
        
        # get the user from the database
        user_in_db = User.query.filter_by(username=username_from_request).first_or_404()
        # Check if the password is correct, if not return an status code 401
        if bcrypt.check_password_hash(user_in_db.password, password_from_request):
            # Create an access token and return it
            access_token = create_access_token(identity=user_in_db.id)
            return jsonify({"access_token": access_token})
        else:
            return jsonify({"error": "Invalid credentials"}), 401

    # first_or_404() raises a NotFound exception if the user is not found in the DB 
    except NotFound:
        return jsonify({"error": "User not found"}), 404

    except Exception as e:
        return jsonify({"error": "An error occurred", "message":str(e)}), 500


