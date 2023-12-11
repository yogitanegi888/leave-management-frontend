import axios from "axios";
import { BASE_URL } from "./constants";

export const fetchUsers = async (callback) => {
    try {
        let response = await axios.get(`${BASE_URL}/users`);
        callback(response.data.data);
    } catch (error) {
        alert('Fail to get users');
    }
}

export const fetchLeaves = async (callback) => {
    try {
        let response = await axios.get(`${BASE_URL}/leaves`);
        callback(response.data.data);
    } catch (error) {
        alert('Fail to get leaves');
    }
}

export const fetchDashboard = async (userId, callback) => {
    try {
        let response = await axios.get(`${BASE_URL}/get-user-details`, {params: {username: userId}});
        callback(response.data.data);
    } catch (error) {
        alert('Fail to get user dashboard');
    }
}