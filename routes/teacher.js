const routes = require('express').Router();
const teacherController = require('../controllers/teacherController.js')

const validation = require("../middleware/validator.js");
const { isAuthenticated } = require('../middleware/authenticate');

routes.post('/',isAuthenticated, validation.teacherCreateValidationRules(), validation.validate, teacherController.createTeacher)

routes.get('/',isAuthenticated, teacherController.getAll())
routes.get('/:id',isAuthenticated, validation.teacherFindByIdValidationRules(), validation.validate, teacherController.getOne())
routes.get('/name/:name',isAuthenticated, validation.teacherFindNameValidationRules(), validation.validate, teacherController.getByName())

routes.put('/:id',isAuthenticated, validation.teacherUpdateValidationRules(), validation.validate, teacherController.updateTeacher)


routes.delete('/:id',isAuthenticated, validation.teacherDeleteByIdValidationRules(), validation.validate, teacherController.deleteTeacher)



module.exports = routes;