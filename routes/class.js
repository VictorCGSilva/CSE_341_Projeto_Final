const routes = require('express').Router();
const classController = require('../controllers/classController.js')

const validation = require("../middleware/validator.js");
const { isAuthenticated } = require('../middleware/authenticate');

routes.post('/',isAuthenticated, validation.classCreateValidationRules(), validation.validate, classController.createClass);

routes.get('/', classController.getAll());
routes.get('/:id', classController.getOne());
routes.get('/subject/:subject', validation.classBySubjectValidationRules(), validation.validate, classController.getSubject());

routes.put('/:classId',isAuthenticated, validation.classUpdateValidationRules(), validation.validate, classController.updateClass);

routes.delete('/:classId',isAuthenticated, validation.classDeleteByIdValidationRules(), validation.validate, classController.deleteClass);


module.exports = routes;