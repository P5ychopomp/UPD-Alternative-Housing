var express = require("express");
const app = express();

var passport = require("passport");
const session = require("express-session");
const bcrypt = require("bcrypt");
var pool = require("../db_config").pool;

var router = express.Router();

/**** USER REGISTRATION ****/
/* router.get("/registration", (req, res) => {
  //Backend Testing
  res.sendFile("temp_registration.html", { root: __dirname });
}); */

router.post("/register", async (req, res) => {
  let { first_name, last_name, email, password, passwordconfirm } = req.body;

  let errors = [];

  console.log({
    first_name,
    last_name,
    email,
    password,
    passwordconfirm,
  });

  // Second layer of form validation; may be ommited
  // Redirect the POST request to registration page when form is invalid
  // TODO: Implement better handling of invalid form
  if (!first_name || !last_name || !email || !password || !passwordconfirm) {
    errors.push("Please enter all required fields.");
  }

  if (password !== passwordconfirm) {
    errors.push("Password and confirm password do not match.");
  }

  // Password must be atleast 6 characters with one digit and special character
  let strongPassword = new RegExp(
    "(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );

  if (!strongPassword.test(password)) {
    // Error: Weak Password
    errors.push(
      "Your password is too weak. Please choose a stronger password."
    );
  }

  if (errors.length > 0) {
    console.log(errors);
    res.status(400).send(errors);
  } else {
    hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // Validation passed
    pool.query(
      `SELECT * FROM accounts WHERE email = ?`,
      [email],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(results);

        if (results.length > 0) {
          // Error 202 : Account already used
          errors.push("Account already exists.")
          res.status(400).send(errors);
        } else {
          console.log("Inserting to database...");
          console.log({ first_name, last_name, email, hashedPassword });
          pool.query(
            `INSERT INTO accounts (first_name, last_name, email, password, created) VALUES (?,?,?,?, NOW())`,
            // RETURNING id, password`,      <---Postgresql Keyword
            [first_name, last_name, email, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log("You are now registered. Please log in");
              // Success 200: Email Registered
              res.sendStatus(200);
            }
          );
        }
      }
    );
  }
});

/**** USER LOGIN ****/
router.get("/api/check-authentication", (req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated() });
});

// Login page for backend testing
/* router.get("/login_page", (req, res) => {
  // results page
  res.sendFile("temp_login.html", { root: __dirname });
}); */

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    console.log("Authenticating...");
    if (err) {
      return next(err);
    }

    // Error 401: Invalid Credentials
    if (!user) {
      return res.sendStatus(401);
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      // Success 400: User Logged In
      console.log(req.session);
      return res.json({ data: user.id });
    });
  })(req, res, next);
});

/***** USER LOGOUT*****/
router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.sendStatus(200);
  });
});

module.exports = router;
