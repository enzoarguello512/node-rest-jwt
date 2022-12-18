import auth from './auth';
import logout from './logout';
import refreshToken from './refreshToken';

const authPaths = {
  '/auth': {
    ...auth,
  },
  '/auth/refresh-token': {
    ...refreshToken,
  },
  '/auth/logout': {
    ...logout,
  },
};

export default authPaths;
