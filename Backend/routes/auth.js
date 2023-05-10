var express = require("express");
const app = express();

var passport = require("passport");
const session = require("express-session");
var LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
var pool = require("../db_config").pool;

function initializePassport(passport) {
  console.log("Initialized");

  // Use passport-local strategy (cookies and session)
  const authenticateUser = (email, password, done) => {
    console.log(email, password);
    pool.query(
      `SELECT * FROM accounts WHERE email = ?`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results);

        if (results.length > 0) {
          const user = results[0];
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              console.log(err);
            }
            if (isMatch) {
              return done(null, user);
            } else {
              //password is incorrect
              return done(null, false, { message: "Password is incorrect" });
            }
          });
        } else {
          // No user
          return done(null, false, {
            message: "No user with that email address",
          });
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );

  /* Configure session management.
   *
   * When a login session is established, information about the user will be
   * stored in the session supplied by the `serializeUser` function,
   * which is yielding the user ID and username.
   *
   * As the user interacts with the app, subsequent requests will be authenticated
   * by verifying the session.  The same user information that was serialized at
   * session establishment will be restored when the session is authenticated by
   * the `deserializeUser` function.
   *
   * Since every request to the app needs the user ID and username, in order to
   * fetch records and show the user element, that information is stored in the session.
   */
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    pool.query(`SELECT * FROM accounts WHERE id = ?`, [id], (err, results) => {
      if (err) {
        return done(err);
      }
      console.log(`ID is ${results[0].id}`);
      return done(null, results[0]);
    });
  });
}
initializePassport(passport);

var router = express.Router();

router.use(passport.initialize());
// Store our variables to be persisted across the whole session.
router.use(passport.session());

/**** USER REGISTRATION ****/
router.get("/registration", (req, res) => {
  //! Unsure how to handle with React
  res.sendFile("temp_registration.html", { root: __dirname });
});

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
    errors.push({ message: "Please enter all fields" });
    res.redirect("/registration");
  }

  if (password !== passwordconfirm) {
    errors.push({ message: "Passwords do not match" });
    res.redirect("/registration");
  }

  // Password must be atleast 6 characters with one digit and special character
  let strongPassword = new RegExp(
    "(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );

  if (!strongPassword.test(password)) {
    // Error 201: Weak Password
    res.send({ message: "Your password is too weak. Please choose a stronger password." });
  }

  if (errors.length > 0) {
    console.log(errors);
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
          res.sendStatus(409);
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
router.get("/checkAuth", checkAuthenticated, (req, res) => {
  // results page
  console.log(req.session);
  console.log(req.sessionID);
  if (req.session) {
    return res.status(200).json({ message: 'Authorized'});
  } else {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  ; // User is not authenticated
});

// Login page for backend testing
router.get("/login_page", checkAuthenticated, (req, res) => {
  // results page
  res.sendFile("temp_login.html", { root: __dirname });
});

router.post("/login", function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      console.log("Authenticating...")
      if (err) { return next(err) }
      console.log(user)
      // Error 401: Invalid Credentials
      if (!user) { return res.sendStatus(401) }

      // Success 400: User Logged In
      return res.sendStatus(200);
    })(req, res, next);
  });

/* router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
); */

/***** USER LOGOUT*****/
router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.sendStatus(200);
  });
});

// Middleware
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.sendStatus(200);
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  console.log("Check Not Authenticated: ", req.isAuthenticated);
  if (req.isAuthenticated()) {
    return next();
  }
  return res.sendStatus(401);
}

module.exports = router;
