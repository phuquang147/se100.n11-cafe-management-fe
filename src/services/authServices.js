import baseService from './baseService';

export const login = ({ username, password }) => {
  return baseService.post('/auth/login', {
    username,
    password,
  });
};

export const resetPassword = ({ email }) => {
  return baseService.post('/auth/reset-password', {
    email,
  });
};

export const changePassword = ({ password, passwordToken, accountId }) => {
  return baseService.post('/auth/change-password', {
    password,
    passwordToken,
    accountId,
  });
};
