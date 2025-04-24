import { ref, remove, serverTimestamp } from "firebase/database";
import { BASE_URL } from "../constants";
import requester from "../utils/requester";

const baseUrl = `${BASE_URL}/category`;

async function getAll() {
    const result = await requester.get(`${baseUrl}.json`);
    return Object.values(result);
}

async function getOne(id) {
    return await requester.get(`${baseUrl}/${id}.json`);
}

async function create(data, token) {
    const newData = {
        createdAt: serverTimestamp(),
        ...data
    }

    const response = await fetch(`${baseUrl}.json?auth=${token}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
    });

    const result = await response.json();
    const id = result.name;

    //add Id as row
    await updateData(id, { id: id });

    return result;
}

async function updateData(idCategory, data) {
    return await requester.patch(`${baseUrl}/${idCategory}.json`, data);
}

async function deleteCategory(categoryId) {
    const categoryRef = ref(database, `category/${categoryId}`);

    try {
        await remove(categoryRef);
        console.log("The painting has delete success.");
    } catch (error) {
        console.error("Error Delete painting:", error);
    }
}

export default {
    getAll,
    getOne,
    create,
    deleteCategory
}