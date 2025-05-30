import { ref, remove, serverTimestamp } from "firebase/database";
import { BASE_URL } from "../constants";
import requester from "../utils/requester";
import { auth, database } from "../../firebase";

const baseUrl = `${BASE_URL}/category`;

async function getAll() {
    const result = await requester.get(`${baseUrl}.json`);
    const data = Object.values(result || {});

    return data.sort((a, b) => b.createdAt - a.createdAt);
}

async function getOne(id) {
    return await requester.get(`${baseUrl}/${id}.json`);
}

async function create(data) {
    const user = auth.currentUser;
    const token = await user.getIdToken();
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
    const user = auth.currentUser;
    const token = await user.getIdToken();
    return await requester.patch(`${baseUrl}/${idCategory}.json?auth=${token}`, data);
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
    updateData,
    deleteCategory
}