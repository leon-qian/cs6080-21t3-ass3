const URL = 'http://localhost:5005';

export default URL;

let token = '';

function getToken () {
  return token;
}
function setToken (newToken) {
  token = newToken;
}

function clearToken () {
  token = '';
}

export {
  getToken,
  setToken,
  clearToken,
};
