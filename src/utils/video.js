import { httpGet } from './http';

// Private API
export const getAllProcesses = async () => {
  let url = "https://codingdaily.dev/video/process/";
  const data = await httpGet(url);
  return data;
}

export const getAllProcessTypes = async () => {
  let url = "https://codingdaily.dev/video/ptype/";
  const data = await httpGet(url);
  return data;
}