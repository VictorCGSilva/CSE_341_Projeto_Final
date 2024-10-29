const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const classController = require('../controllers/classController');
const httpMocks = require('node-mocks-http');

describe('classController Integration Tests', () => {
    let mongoServer;
    let connection;
    let db;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();

        connection = await MongoClient.connect(mongoUri);
        db = connection.db();

        jest.spyOn(require('../data/database'), 'getDb').mockReturnValue(db);
    });

    afterAll(async () => {
        await connection.close();
        await mongoServer.stop();
    });

    describe('getAll', () => {
        let req;
        let res;

        beforeEach(async () => {
            req = httpMocks.createRequest();
            res = httpMocks.createResponse({
                eventEmitter: require('events').EventEmitter
            });

            await db.collection('class').deleteMany({});
        });

        it('should return all classes with 200 status when classes exist', async () => {
            const testClasses = [
                {
                    course_code: 'MATH101',
                    subject: 'Mathematics',
                    class_description: 'Calculus I',
                    max_class_size: 30
                },
                {
                    course_code: 'PHY201',
                    subject: 'Physics',
                    class_description: 'Mechanics',
                    max_class_size: 25
                }
            ];
            await db.collection('class').insertMany(testClasses);

            const getAllHandler = classController.getAll();
            await getAllHandler(req, res);

            await new Promise(resolve => res.once('end', resolve));

            expect(res.statusCode).toBe(200);
            const responseData = JSON.parse(res._getData());
            expect(responseData).toHaveLength(2);
            expect(responseData[0].course_code).toBe('MATH101');
            expect(responseData[1].course_code).toBe('PHY201');
        });

        it('should return 404 status when no classes exist', async () => {
            const getAllHandler = classController.getAll();
            await getAllHandler(req, res);

            await new Promise(resolve => res.once('end', resolve));

            expect(res.statusCode).toBe(404);
            const responseData = JSON.parse(res._getData());
            expect(responseData).toEqual({
                message: 'No classes found in the database'
            });
        });
    });
});