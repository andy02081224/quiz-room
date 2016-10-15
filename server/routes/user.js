const bcrypt = require('bcrypt');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const uuid = require('node-uuid');
const UserModel = require('../models/user.js');
const API_ERR_MSG = require('../utils/generalAPIErrorMessage.js')

const API_USER_REGISTER = '/user/register';
const API_USER_LOGIN = '/user/login';
const API_USER_LOGOUT = '/user/logout';
const API_USER_STATUS = '/user/status';

const bcryptConfig = {
	saltRounds: 10
};

const jwtConfig = {
	secret: uuid.v4(),
	options: {
		expiresIn: '5d'
	}
};

module.exports = function(socket) {
	router.post(API_USER_REGISTER, (req, res, next) => {
		let { saltRounds } = bcryptConfig;
		let { username, password, email, name } = req.body

		if (!username || !password || !email) {
			return next({
				message: API_ERR_MSG.MISSING_FIELD,
				error: {
					path: req.url 
				}
			});
		}

		bcrypt.genSalt(saltRounds, (err, salt) => {
			bcrypt.hash(password, salt, (err, hash) => {
				let doc = {
					username: username,
					password: hash,
					email: email,
					name: name
				};
				
				let newUser = new UserModel(doc);

				newUser.save((err, data) => {
					if (err) return next({ statusCode: 500 });
					res.json(data);
				});
			});
		});
	});

	router.post(API_USER_LOGIN, (req, res, next) => {
		let { 
			username: submittedUsername, 
			password: submittedpPassword 
		} = req.body;
		

		UserModel.findOne({ username: submittedUsername }, (err, foundUser) => {
			if (err) {
				return next({ 
					statusCode: 500, 
					message: API_ERR_MSG.INTERNAL_ERROR,
					error: {
						path: req.url
					}
				});
			}

			if (!foundUser) {
				return next({
					statusCode: 404,
					message: API_ERR_MSG.USER_NOT_FOUND,
					error: {
						path: req.url
					}
				});
			}

			bcrypt.compare(submittedpPassword, foundUser.password, (err, isValidUser) => {
				if (isValidUser) {
					let userData = {
						id: foundUser.id,
						username: foundUser.username,
						image: foundUser.image
					};

					userData.token = jwt.sign(userData, jwtConfig.secret, jwtConfig.options);

					res.json(userData);
				} 
				else {
					return next({
						statusCode: 401,
						message: 'Unauthorized',
						error: {
							path: req.url
						}
					});
				}
			});
		});

	});

	router.get(API_USER_LOGOUT, (req, res) => {
		jwt.verify(req.cookies.token, jwtConfig.secret, (err, decoded) => {
			if (err) {
				return next({
					statusCode: 401,
					message: 'Unauthorized'
				});
			}

			res.clearCookie('token');
			res.json({
				id: decoded.id,
				username: decoded.username
			});
		});	
	});

	router.get(API_USER_STATUS, (req, res, next) => {
		let token = req.get('Authorization').split(' ')[1];
		console.log('token:', token);
		if (!token) {
			return next({
				statusCode: 401,
				message: 'Unauthorized',
				error: {
					path: req.url
				}
			});
		}

		jwt.verify(token, jwtConfig.secret, (err, decoded) => {
			if (err) {
				return next({
					statusCode: 401,
					message: 'Unauthorized',
					error: {
						path: req.url
					}
				});
			}

			res.json({
				id: decoded.id,
				username: decoded.username
			});
		});
	});

	return router;
};