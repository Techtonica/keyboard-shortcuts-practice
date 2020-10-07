const { AUTH0_SECRET, AUTH0_CLIENT_ID, AUTH0_ISSUER_BASE_URL } = process.env;
const port = process.env.port || 3000;
let authConfig = undefined;

const isValidUrl = () => {
    try {
      new URL(AUTH0_ISSUER_BASE_URL);
    } catch (_) {
      return false;  
    }
}

if (AUTH0_SECRET != undefined && AUTH0_CLIENT_ID != undefined && isValidUrl) {
    authConfig = {
        authRequired: false,
        auth0Logout: true,
        issuerBaseURL: AUTH0_ISSUER_BASE_URL,
        baseURL: 'http://localhost:'.concat(port),
        clientID: AUTH0_CLIENT_ID,
        secret: AUTH0_SECRET,
      };
}

module.exports = {
    authConfig
};
