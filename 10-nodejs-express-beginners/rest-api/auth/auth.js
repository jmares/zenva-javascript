const passport = require('passport');
const localStrategy = require('passport-local');

// handling user registration
passport.use('signup', new localStrategy.Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true

}, (request, email, password, done) => {
    console.log(email, password);
    console.log(request.body);

    const { username } = request.body;
    if (username && username !== 'error') {
        return done(null, { name: 'Joe' });
    } else {
        return done(new Error('invalid user'));
    }
}));

// handling user login
passport.use('login', new localStrategy.Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    const { username } = request.body;
    if (email !== 'joe@test.com') {
        return done(new Error('user not found'));
    } 
    if (password !== 'test') {
        return done(new Error('invalid password'));
    }
}));

