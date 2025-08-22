const Express = require("express");
const app = Express();
const users = require("./routes/user.js");
const posts = require("./routes/posts.js");
// const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
  secret: "mysupersecretcode", //This is used to sign the session ID cookie.
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());
//middleware which stores all the local variables - These variables are accessible in the ejs pages
app.use((req, res, next) => {
  res.locals.success = req.flash("success"); //accessed through key
  res.locals.error = req.flash("error");
  next();
});

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  if (name === "anonymous") {
    req.flash("error", "some error occurred!");
  } else {
    req.flash("success", `user registration successful`);
  }
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.render("page.ejs", { name: req.session.name });
});

// app.get("/reqcount", (req, res) => {
//   console.log(req.session);
//   if (req.session.count) {
//     req.session.count++;
//   } else {
//     req.session.count = 1;
//   }
//   res.send(`Request count: ${req.session.count}`);
// });

// Uncomment the following lines to use cookie-parser
// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookies", (req, res) => {
//   res.cookie("madeIn", "India", { signed: true });
//   res.send("Signed cookie sent!");
// });

// app.get("/verify", (req, res) => {
//   console.log(req.cookies); // unsigned cookies
//   console.log(req.signedCookies); // signed cookies
//   res.send("verified");
// });

// app.get("/getcookies", (req, res) => {
//   res.cookie("greet", "namaste");
//   res.cookie("madeIn", "India");
//   res.send("Sent you some cookies!");
// });

// app.get("/greet", (req, res) => {
//   let { name = "anonymous" } = req.cookies;
//   res.send(`Hello there ${name}!`);
// });

// app.get("/", (req, res) => {
//   console.log(req.cookies);
//   res.send("Hi, I am root!");
// });

// app.use("/users", users); // "/users" is common to all user routes
// app.use("/posts", posts); // "/posts" is common to all post routes

app.listen(3000, () => {
  console.log("server is listening at port 3000.");
});
