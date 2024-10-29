const routes = require('express').Router();
const studentController = require('../controllers/studentController.js')
const student = require('../controllers/studentController.js');

const validation = require("../middleware/validator.js");
const { isAuthenticated } = require('../middleware/authenticate');

routes.post('/',isAuthenticated, validation.studentCreateValidationRules(), validation.validate, studentController.createStudent)

routes.get('/', studentController.getAll())
routes.get('/:id', validation.studentFindByIdValidationRules(), validation.validate, studentController.getOne())
routes.get('/findByFirstName/:first_name', validation.studentFindFirstNameValidationRules(), validation.validate, studentController.findByFirstName())
routes.get('/findByLastName/:last_name', validation.studentFindLastNameValidationRules(), validation.validate, studentController.findByLastName())

routes.put('/:studentId',isAuthenticated, validation.studentUpdateValidationRules(), validation.validate, studentController.updateStudent)

routes.delete('/:studentId',isAuthenticated, validation.studentDeleteByIdValidationRules(), validation.validate, studentController.deleteStudent)


module.exports = routes;