import { BASE_URL } from "../constants";
import requester from "../utils/requester";
import { ref, remove } from "firebase/database";
import { database } from "../../firebase";

const baseUrl = `${BASE_URL}/size`;

async function getAll() {
    const result = await requester.get(`${baseUrl}.json`);
    const data = Object.values(result || {});

    return data.sort((a, b) => b.createdAt - a.createdAt);
}

async function getOne(id) {
    return await requester.get(`${baseUrl}/${id}.json`);
}

async function create(data, token) {
    const response = await fetch(`${baseUrl}.json?auth=${token}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    const id = result.name;

    //add Id as row
    await updateData(id, { id: id });

    return result;
}

async function updateData(idSize, data) {
    return await requester.patch(`${baseUrl}/${idSize}.json`, data);
}

async function deleteSize(sizeId) {
    const sizeRef = ref(database, `size/${sizeId}`);
  
    try {
      await remove(sizeRef);
      console.log("The size has delete success.");
    } catch (error) {
      console.error("Error Delete size:", error);
    }
  }

export default{
    getAll,
    getOne,
    create,
    updateData,
    deleteSize
}