
const { insertUsers} = require('../models/Users');
const { getTasks } = require('../models/Tasks');
const db = require('../db');
const express = require('express'); 
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    console.log('Registering user:', req.body);
    let { username, email, password } = req.body;
    try {
        if (password) {
            const salt = await bcrypt.genSalt(saltRounds);
            let hash = await bcrypt.hash(password, salt);
            password = hash;
        }
        const user = await insertUsers(username, email, password);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
}

const loginUser = async (req, res) => {
    const { email, password} = req.body;
    console.log('Logging in user:', req.body);
    try {
        let checkUser = await db('users').where({
            email: email

        }).first();
        if (!checkUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        const match = await bcrypt.compare(password, checkUser.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const tasks = await getTasks(checkUser.id);

        const token = jwt.sign({ id: checkUser.id}, process.env.JWT_SECRET, { 
            expiresIn: '1h'
        })
        res.status(200).json({ message: 'Login successful', 'data' : checkUser, 'token' : token });

    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Error logging in user', error });
        
    }


}

module.exports = {
    registerUser,
    loginUser
}