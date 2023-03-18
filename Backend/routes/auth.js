var express = require("express");
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
        pool.query(`SELECT * FROM accounts WHERE email = ?`, [email],
          (err, results) => {
            if (err) { throw err; }
            console.log(results);
    
            if (results.length > 0) {
              const user = results[0];
              bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) { console.log(err); }
                if (isMatch) { 
                  return done(null, user);
                } else {
                  //password is incorrect
                  return done(null, false, { message: "Password is incorrect" });
                }
              });
            } else {
              // No user
              return done(null, false, { message: "No user with that email address"});
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
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
router.use(passport.session());

/**** USER REGISTRATION ****/
router.get("/registration", (req, res) => {
	// serve results page;
	// TODO: use react
	res.sendFile("temp_registration.html", { root: __dirname });
});

router.post("/register", async (req, res) => {
	let { name, email, password, passwordconfirm } = req.body;

	let errors = [];

	console.log({
		name,
		email,
		password,
		passwordconfirm,
	});

	if (!name || !email || !password || !passwordconfirm) {
		errors.push({ message: "Please enter all fields" });
	}

	if (password.length < 6) {
		errors.push({ message: "Password must be a least 6 characters long" });
	}

	if (password !== passwordconfirm) {
		errors.push({ message: "Passwords do not match" });
	}

	if (errors.length > 0) {
		console.log(errors);
	} else {
		hashedPassword = await bcrypt.hash(password, 10);
		console.log(hashedPassword);
		// Validation passed
		pool.query(
			`SELECT * FROM accounts WHERE email = ?`, [email],
			(err, results) => {
				if (err) {
					console.log(err);
				}
				console.log(results);

				if (results.length > 0) {
					// TODO: Use React
					return res.json({message: "Email already registered"});
				} else {
					console.log("inserting to database...");
					console.log({ name, email, hashedPassword });
					pool.query(
						`INSERT INTO accounts (name, email, password) VALUES (?,?,?)`,
						// RETURNING id, password`,      <---Postgresql Keyword, not sure what its use is.
						[name, email, hashedPassword],
						(err, results) => {
							if (err) {
								throw err;
							}
							console.log(
								"success_msg",
								"You are now registered. Please log in"
							);
							res.redirect("/login");
						}
					);
				}
			}
		);
	}
});

/**** USER LOGIN ****/
router.get("/login", checkAuthenticated, (req,res)=>{ // results page
  res.sendFile('temp_login.html',{root: __dirname})
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

/***** USER LOGOUT*****/
router.post('/logout', (req, res)=>{
    req.session.destroy(err => {
        if(err){
            return res.redirect('/')
        }
        sessionStore.close()
        res.clearCookie(process.env.SESS_NAME)
        res.redirect('/login')
    })
})

// Middleware
function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
	  return res.redirect("/dashboard");
	}
	next();
  }
  
function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
	  return next();
	}
	res.redirect("/login");
}

module.exports = {router, checkNotAuthenticated};
