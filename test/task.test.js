const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/db/models/task');
const {
    userOneId,
    userOne,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    setUpDatabase
} = require('./fixtures/db');

beforeEach(setUpDatabase);


test('Should creat task for user', async() => {
    const response = await request(app)
                    .post('/tasks')
                    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                    .send({ description: "from my test"})
                    .expect(201)

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
});

test('Should obtain all tasks for userOne', async () => {
    const response = await request(app)
                        .get('/tasks')
                        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                        .send()
                        .expect(200)

    expect(response.body.length).toBe(2);

});

test('Should not allow userTwo to delete a task from userOne', async () => {
            await request(app)
                .delete(`/tasks/${taskOne._id}`)
                .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
                .send()
                .expect(404)

        const task = await Task.findById(taskOne._id);
        expect(task).not.toBeNull();
});




