const URL = 'http://localhost:5005';

const user = {
  token: '',
  email: '',
};

function hasUser () {
  return user.token !== '';
}

function getToken () {
  return user.token;
}

function getEmail () {
  return user.email;
}

function setUser (userToken, userEmail) {
  user.token = userToken;
  user.email = userEmail;
}

function clearUser () {
  user.token = '';
  user.email = '';
}

export default URL;
export {
  hasUser,
  getToken,
  getEmail,
  setUser,
  clearUser,
};
