import createUser from './createUser';
import getUserById from './getUserById';
import listUsers from './listUsers';
import patchUser from './patchUser';
import removeUser from './removeUser';
import updatePermissionLevel from './updatePermissionLevel';

const usersPaths = {
  '/users': {
    ...listUsers,
    ...createUser,
  },
  '/users/{id}': {
    ...getUserById,
    ...removeUser,
    ...patchUser,
  },
  '/users/{id}/permissionLevel/{permissionLevel}': {
    ...updatePermissionLevel,
  },
};

export default usersPaths;
