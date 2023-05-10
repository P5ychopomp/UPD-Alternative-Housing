var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var pool = require("../db_config").pool;

const session = require("express-session");
const bcrypt = require("bcrypt");
var crypto = require("crypto");

/* Configure password authentication strategy.*/
passport.use(
	new LocalStrategy(function verify(email, password, cb) {
		pool.query("SELECT * FROM accounts WHERE email = ?", [email],
			function (err, row) {
				if (err) {
					return cb(err);
				}
				if (!row) {
					return cb(null, false, { message: "Incorrect email or password." });
				}

				crypto.pbkdf2(password, row.salt, 310000, 32, "sha256",
          function (err, hashedPassword) {
						if (err) {
							return cb(err);
						}
						if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
							return cb(null, false, {message: "Incorrect email or password.",});
						}
						return cb(null, row);
					}
				);
			}
		);
	})
);

/* Configure session management.*/
passport.serializeUser(function (user, cb) {
	process.nextTick(function () {
		cb(null, { id: user.id, email: user.email });
	});
});

passport.deserializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, user);
	});
});

var router = express.Router();

/***** USER LOGIN/LOGOUT *****/
router.post("/login", function (req, res, next) {
	passport.authenticate("local", function (err, user, info) {
		console.log("Authenticating...");
		if (err) {
			return next(err);
		}
		console.log(user);

		// Error 401: Invalid Credentials
		if (!user) {
			return res.sendStatus(401);
		}

		// Success 400: User Logged In
		return res.sendStatus(200);
	})(req, res, next);
});

router.post("/logout", function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		return res.sendStatus(200);
	});
});

router.post("checkAuth", function (req, res, next) {
	if (req.isAuthenticated()) {
		return res.status(200).json({ message: "Authorized" });
	} else {
		return res.status(401).json({ message: "Unauthorized" });
	}
});

/***** USER REGISTRATION *****/
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
		res.send({
			message: "Your password is too weak. Please choose a stronger password.",
		});
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

module.exports = router;
