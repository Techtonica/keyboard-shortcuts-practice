const { auth } = require("express-openid-connect");
const Auth0 = require("./auth0");

const findCurrentUserFrom = (loadUserIdFunc) => {
  return (req, res, next) => {
    res.locals.currentUserId = loadUserIdFunc(req);
    next();
  };
};

const configureAuth = (app) => {
  if (Auth0.authConfig) {
    console.debug("Using Auth0 auth");
    // auth router attaches /login, /logout, and /callback routes to the baseURL
    app.use(auth(Auth0.authConfig));
    app.use(findCurrentUserFrom(Auth0.userIdLoader));
  } else {
    console.debug("Using dev auth");
    const AuthDev = require("./auth-dev");
    AuthDev.setup(app);
    app.use(findCurrentUserFrom(AuthDev.userIdLoader));
  }
};

module.exports = configureAuth;
