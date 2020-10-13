const router = require('express').Router();
const User = require('../db').import('../models/user');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 12)
  })
  .then(user => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      user: user,
      message: 'user created successfully',
      sessionToken: token
    });
  })
  .catch(err => res.status(500).json({error: err}));
});

// user sends something of the form {email: "jflatz@email.com", password: "dogdogdogdogdog"}
router.post('/signin', (req, res) => {
  User.findOne({ where: { email: req.body.email }})
  .then(user => {
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, matches) => {
        if (matches) {
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

          res.status(200).json({
            user: user,
            message: "user successfully authenticated",
            sessionToken: token
          })

        } else {
          res.status(500).json({ error: "password mismatch" })
        }
      })

    } else {
      res.status(500).json({ error: "user not found" })
    }
  })
  .catch(err => res.status(500).json({ error: "database error" }));
});




module.exports = router;