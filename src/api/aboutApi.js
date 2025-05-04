import { BASE_URL } from "../constants";
import requester from "../utils/requester";

import { auth, database } from '../../firebase';
import { get, ref, remove, serverTimestamp, update } from "firebase/database";

const baseUrl = `${BASE_URL}/about`;

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

async function updateData(idAbout, data) {
    const user = auth.currentUser;
    const token = await user.getIdToken();
    return await requester.patch(`${baseUrl}/${idAbout}.json?auth=${token}`, data);
}

async function deletePainting(aboutId) {
    const paintingRef = ref(database, `about/${aboutId}`);

    try {
        await remove(paintingRef);
        console.log("The About has delete success.");
    } catch (error) {
        console.error("Error About painting:", error);
    }
}

export default {
    getAll,
    getOne,
    create,
    updateData,
    deletePainting
}