const express = require('express');
const router = express.Router();
const pool = require('../shared/pool');
const bcrypt = require('bcryptjs');

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

        res.status(201).json({
          message: 'User registered successfully',
        });
        }
       );
    }catch (error) {
      res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
   
})
module.exports = router;