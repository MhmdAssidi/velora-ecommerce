const express = require('express');
const router = express.Router();
const pool = require('../shared/pool');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup',async (req,res)=>{
    const { first_name, last_name, email, phone_number, password } = req.body;

  if (!first_name || !last_name || !email || !phone_number || !password) {
    return res.status(400).json({
      message: 'All fields are required'
    });
  }
   try{
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (first_name, last_name, email, phone_number, password) VALUES (?, ?, ?, ?, ?)';    const values = [first_name, last_name, email, phone_number, hashedPassword];
    pool.query(
      sql,
      [first_name, last_name, email, phone_number, hashedPassword],
      (err, result) => {
        if (err) {
          console.log('Signup error:', err);

          return res.status(500).json({
            message: 'Error inserting user',
            error: err.message
          });

        }
        const generatedToken = jwt.sign(
          {
            id: result.insertId,
            email: email
          },
          'mySecretKey',
          { expiresIn: '1d' }
        );
        res.status(201).json({
          message: 'User registered successfully',
          token: generatedToken,
        });
        }
       );
    }catch (error) {
      res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
   
});

router.post('/signin',async (req,res)=>{
    const { email, phone_number, password } = req.body;

    const sql= 'SELECT * FROM users WHERE email = ? OR phone_number = ?';
    pool.query(sql,[email, phone_number],async (err, results)=>{
        if(err){
            console.log('Signin error:', err);
            return res.status(500).json({
                message: 'Error fetching user',
                error: err.message
            });
          
        }
        if (results.length === 0) {
      return res.status(401).json({
        message: 'Invalid email/phone or password'
        });
       }
       const user = results[0];

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: 'Invalid email/phone or password'
      });
    }
    const generatedToken = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      'mySecretKey',
      { expiresIn: '1d' }
    );
        return res.status(200).json({
      message: 'User signed in successfully',
      token: generatedToken,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
      }
    });
          }
        );

});

module.exports = router;