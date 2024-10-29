const routes = require('express').Router();
const gradeController = require('../controllers/gradeController.js')


const validation = require("../middleware/validator.js");
const { isAuthenticated } = require('../middleware/authenticate');

routes.post('/', isAuthenticated, validation.gradeCreateValidationRules(), validation.validate,  gradeController.createGrade)

routes.get('/',isAuthenticated, gradeController.getAll());
routes.get('/student/:studentId',isAuthenticated, validation.gradeFindByStudentIdValidationRules(), validation.validate, gradeController.getStudentId());
routes.get('/:grade',isAuthenticated, validation.gradeFindByIdValidationRules(), validation.validate, gradeController.getGradeId());

routes.put('/:id', isAuthenticated, validation.gradeUpdateValidationRules(), validation.validate, gradeController.updateGrade)

routes.delete('/:id', isAuthenticated, validation.gradeDeleteByIdValidationRules(), validation.validate, gradeController.deleteGrade)


module.exports = routes;