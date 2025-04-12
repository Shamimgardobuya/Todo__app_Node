const db = require('../db');
const knex = require('knex');
// console.log(  db('users').select('*'));
const insertUsers = async (username, email, password) => {
    try {
        const result = await db('users').insert({
            username,
            email,
            password
        });
        return result;
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
}
const getUsers = async () => {
    try {
        users = await db('users').select('username', 'email', 'password');
        return users;
        
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
        
    }
}


module.exports = {
    insertUsers,
    getUsers
}