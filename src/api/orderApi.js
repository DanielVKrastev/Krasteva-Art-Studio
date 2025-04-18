import { BASE_URL } from "../constants";
import requester from "../utils/requester";

const baseUrl = `${BASE_URL}/orders`;

async function getAll() {
    return await requester.get(`${baseUrl}.json`);
}

async function getOne(id) {
    return await requester.get(`${baseUrl}/${id}.json`);
}

async function create(data) {
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