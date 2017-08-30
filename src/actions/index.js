import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';

const Root_URL ='http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=blazing009'

export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
    return {
        type: FETCH_POSTS,
        payload: request
    };
}