import { createInstance } from './axiosInstance';

const BASE_URL = process.env.REACT_APP_URL;
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

export const getExercises = () => {
    const instance = createInstance({
        method: 'get',
        baseURL: BASE_URL,
        url: '/quizzes/workouts',
        params: {
            api_token: API_TOKEN,
        },
    });
    return instance('/quizzes/workouts', {
        params: {
            api_token: API_TOKEN,
        },
    });
};
