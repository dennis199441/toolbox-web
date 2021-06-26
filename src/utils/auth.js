import axios from 'axios';
import { httpGet, httpPost, httpDelete } from './http';

// Private API
export const changeUsername = async (username) => {
  let url = 'https://codingdaily.dev/oauth/user/change_username';
  let form = new FormData();
  form.append('username', username);
  const data = await httpPost(url, form);
  return data;
}

export const changePassword = async (oldPassword, newPassword) => {
  let url = 'https://codingdaily.dev/oauth/user/change_password';
  let form = new FormData();
  form.append('oldPassword', oldPassword);
  form.append('newPassword', newPassword);
  const data = await httpPost(url, form);
  return data;
}

export const activateUser = async (username) => {
  let url = 'https://codingdaily.dev/oauth/user/activate/' + username;
  const data = await httpGet(url);
  return data === "activated user: " + username;
}

export const deactivateUser = async (username) => {
  let url = 'https://codingdaily.dev/oauth/user/deactivate/' + username;
  const data = await httpGet(url);
  return data === "deactivated user: " + username;
}

export const getCurrentUser = async () => {
  let url = 'https://codingdaily.dev/oauth/user/me';
  return await httpGet(url);
}

export const getUsers = async () => {
  let url = 'https://codingdaily.dev/oauth/user/';
  return await httpGet(url);
}

export const getUserDetails = async (username) => {
  let url = 'https://codingdaily.dev/oauth/user/' + username;
  return await httpGet(url);
}

export const getRoles = async () => {
  let url = 'https://codingdaily.dev/oauth/role/';
  return await httpGet(url);
}

export const getRoleByName = async (name) => {
  let url = 'https://codingdaily.dev/oauth/role/' + name;
  return await httpGet(url);
}

export const getUserRoles = async (username) => {
  let url = 'https://codingdaily.dev/oauth/userrole/' + username;
  return await httpGet(url);
}

export const createRole = async (name, description) => {
  let url = 'https://codingdaily.dev/oauth/role/';
  let form = new FormData();
  form.append('name', name);
  form.append('description', description);
  return await httpPost(url, form);
}

export const deleteRole = async (name) => {
  let url = 'https://codingdaily.dev/oauth/role/';
  let form = new FormData();
  form.append('name', name);
  return await httpDelete(url, form);
}

export const grantRole = async (userId, roleId) => {
  let url = 'https://codingdaily.dev/oauth/userrole/';
  let form = new FormData();
  form.append('user_id', userId);
  form.append('role_id', roleId);
  return await httpPost(url, form);
}

export const revokeRole = async (userId, roleId) => {
  let url = 'https://codingdaily.dev/oauth/userrole/';
  let form = new FormData();
  form.append('user_id', userId);
  form.append('role_id', roleId);
  return await httpDelete(url, form);
}

// Public API

export const signUp = async (username, email, password) => {
  let form = new FormData();
  form.append('username', username);
  form.append('email', email);
  form.append('password', password);

  await axios({
    method: 'post',
    url: 'https://codingdaily.dev/oauth/user/',
    data: form
  });
}

export const login = async (username, password) => {
  let form = new FormData();
  form.append('username', username);
  form.append('password', password);

  let response = await axios({
    method: 'post',
    url: 'https://codingdaily.dev/oauth/auth/login',
    data: form
  });

  let access_token = response.data.access_token;
  let refresh_token = response.data.refresh_token;
  if (access_token && refresh_token) {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
  }
}

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export const isLogin = () => {
  return (localStorage.getItem("access_token") && localStorage.getItem("refresh_token"));
}