import { BASE_URL } from "../constants";
import requester from "../utils/requester";

const baseUrl = `${BASE_URL}/size`;

async function getAll() {
    const result = await requester.get(`${baseUrl}.json`);
    return Object.values(result);
}

async function getOne(id) {
    const result = await requester.get(`${baseUrl}/${id}.json`);
    return Object.values(result);
}

async function create(data, token) {
    /*
    const response = await fetch(`${baseUrl}.json?auth=${token}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    return result;
    */
    return await requester.post(`${baseUrl}.json?auth=${token}`, data);
}

export default{
    getAll,
    getOne,
    create
}