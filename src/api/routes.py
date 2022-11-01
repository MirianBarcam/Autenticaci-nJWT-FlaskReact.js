"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
import cloudinary
import cloudinary.api
from cloudinary.uploader import upload

from flask_jwt_extended import create_access_token,jwt_required,get_jwt_identity,JWTManager

from datetime import timedelta


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    emailRequest = request.json.get('email')
    passwordRequest = request.json.get('password')
    
    userToRegister = User.query.filter_by(email=emailRequest).first()
    if userToRegister:
        return jsonify({'msg':'email pertenece a otro usuario'}),401
    else:
        new_user= User(email=emailRequest,password=passwordRequest)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'msg':'registrado correctamente', "success" : True}),200

    response_body = {
        "message": "login"
    }

    return jsonify(response_body), 200


@api.route('/login', methods=['POST'])
def login():
    emailRequest = request.json.get('email')
    passwordRequest = request.json.get('password')
    
    new_user = User.query.filter_by(email=emailRequest).first()
    
    if new_user:
        if passwordRequest !=  new_user.password:
            return jsonify({'msg':'usuario o clave invalido'}),401
        else:
            time = timedelta(minutes = 5000)
            print(time)
            access_token = create_access_token(identity=emailRequest,expires_delta=time)
            return jsonify({"access_token":access_token, "duration": time.total_seconds()})
    else:
        return jsonify({'msg':'email invalida'}),401

    response_body = {
        "message": "login"
    }