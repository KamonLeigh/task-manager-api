const request = require('supertest');
const app = require('../src/app');
const User = require('../src/db/models/user');
const { 
    userOneId,
    userOne,
    userTwo,
    userTwoId,
    setUpDatabase
 } = require('./fixtures/db');



beforeEach(setUpDatabase);



test('Should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Andrew',
        email: 'andre@example.com',
        password: 'mypass777!'
    }).expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Andrew',
            email: 'andre@example.com'
        },
        token: user.tokens[0].token
    });

    // Asssertions about the password
    expect(user.password).not.toBe('mypass777!');
});

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(response.body.user._id);

    expect(response.body).toMatchObject({
        token: user.tokens[1].token
    })
});

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'redis12'
    }).expect(400)
});

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
});

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
});

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

        const user = await User.findById(userOneId);
        expect(user).toBeNull();

});

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
});

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'test/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId);
   expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
    const response = await request(app)
                    .patch('/users/me')
                    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                    .send({ name: 'Mike'})
                    .expect(200)


        const user = await User.findById(userOneId);
        expect(user.name).toBe('Mike');
}); 

test('Should not update invalid user field', async () => {
        await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({ location: 'london'})
            .expect(400)
});

test('Should not allow user to sign in with email already on the db', async () => {
        await request(app)
            .post('/users')
            .send({
                name: 'Andrew',
                email: userOne.email,
                password: 'mypass777!'
            }).expect(400)
});

test('Should not update user if unauthenticated',  async () => {
             await request(app)
                    .patch('/users/me')
                    .send({ name: 'Mike'})
                    .expect(401)


});

