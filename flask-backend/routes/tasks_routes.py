from flask import request, jsonify, Blueprint
from models import db, Task
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.exceptions import NotFound
from sqlalchemy.exc import SQLAlchemyError

### Entry point for all routes here: '/tasks' ###

tasks_bp = Blueprint('tasks', __name__)

# jwt protected Get Tasks
@tasks_bp.route('', methods=['GET'])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity() # has its own error handling
    try: 
        tasks = Task.query.filter_by(user_id=user_id).all()
    except SQLAlchemyError as e:
        return jsonify({"error": "Database Error", "message":str(e)}), 500

    return jsonify([{"id": task.id, "title":task.title, "description": task.description, "completed": task.completed} for task in tasks])


# jwt protected Create Task
@tasks_bp.route('', methods=['POST'])
@jwt_required()
def create_task():
    user_id = get_jwt_identity()
    try:
        # Get the title and description from the request
        data = request.get_json()
        task_title = data.get('title')
        task_description = data.get('description',"")

        # Check if the title is provided
        if not data or not task_title or task_title == "":
            return jsonify({"error": "title is missing or empty request"}), 400

        # Create a new task and add it to the database
        new_task = Task(description=task_description, title=task_title, user_id=user_id)
        db.session.add(new_task)
        db.session.commit()
        return jsonify({"id": new_task.id, "title":new_task.title, "description": new_task.description, "completed": new_task.completed})
        
    # DB error handling
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": "Database Error", "message":str(e)}), 500

    except Exception as e:
        return jsonify({"error": "An error occurred", "message":str(e)}), 500


# jwt protected Update Task
@tasks_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_task(id):
    user_id = get_jwt_identity()
    try:
        task = Task.query.filter_by(id=id, user_id=user_id).first_or_404()
        data = request.get_json()
        task.title = data.get('title', task.title)
        task.description = data.get('description', task.description)
        task.completed = data.get('completed', task.completed)
        db.session.commit()
        return jsonify({"id": task.id, "title":task.title, "description": task.description, "completed": task.completed})

    except NotFound:
        return jsonify({"error": "Task not found"}), 404
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": "Database Error", "message":str(e)}), 500
    except Exception as e:
        return jsonify({"error": "An error occurred", "message":str(e)}), 500


# jwt protected Delete Task
@tasks_bp.route('<int:id>', methods=['DELETE'])
@jwt_required()
def delete_task(id):
    try:
        user_id = get_jwt_identity()
        task = Task.query.filter_by(id=id, user_id=user_id).first_or_404()
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Task deleted successfully"})
        
    except NotFound:
        return jsonify({"error": "Task not found"}), 404
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": "Database Error", "message":str(e)}), 500
    except Exception as e:
        return jsonify({"error": "An error occurred", "message":str(e)}), 500


