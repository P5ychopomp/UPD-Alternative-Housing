const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("../db_config").pool;

const bcrypt = require("bcrypt");

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

  module.exports = initialize;