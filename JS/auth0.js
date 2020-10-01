const { AUTH0_SECRET, AUTH0_CLIENT_ID, AUTH0_ISSUER_BASE_URL } = process.env;
const port = process.env.port || 3000;
let auth_config = undefined;

const secretGiven = () => AUTH0_SECRET != undefined;
const idGiven = () => AUTH0_CLIENT_ID != undefined;
const isValidUrl = () => {
    try {
      new URL(AUTH0_ISSUER_BASE_URL);
    } catch (_) {
      return false;  
    }
    if (string.startsWith("https://")) {
        return true
    } else {
        throw new Error("Auth0 issuer base url is not valid, must begin with 'https://'");
    }
}

if (secretGiven && idGiven && isValidUrl) {
    auth_config = {
        authRequired: false,
        auth0Logout: true,
        issuerBaseURL: AUTH0_ISSUER_BASE_URL,
        baseURL: 'http://localhost:'.concat(port),
        clientID: AUTH0_CLIENT_ID,
        secret: AUTH0_SECRET,
      };
}

module.exports = {
    auth_config
};
