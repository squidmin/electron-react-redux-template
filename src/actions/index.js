import { ADD_VIDEO, } from './types';


export const addVideo = video => {
  return {
    type: ADD_VIDEO,
    payload: { ...video }
  };
};
