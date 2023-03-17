var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
var pool = require("../db_config");

var router = express.Router();

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

module.exports = router;
