import { BASE_URL } from "../constants";
import requester from "../utils/requester";

import { database } from '../../firebase';
import { get, ref, remove, serverTimestamp, update } from "firebase/database";

const baseUrl = `${BASE_URL}/paintings`;

async function getAll() {
    const result = await requester.get(`${baseUrl}.json`);
    return Object.values(result);
}

async function getLimit(limit) {
    const result = await requester.get(`${baseUrl}.json?orderBy="createdAt"&limitToLast=${limit}`);
    return Object.values(result);
}

async function getAllForSales() {
    const result = await requester.get(`${baseUrl}.json?orderBy="sold"&equalTo="no"`);
    return Object.values(result);
}

async function getOne(id) {
    return await requester.get(`${baseUrl}/${id}.json`);
}

async function getPaintingsCount() {
    const snapshot = await get(ref(database, 'paintings'));
    if (!snapshot.exists()) return 0;
  
    const data = snapshot.val();
    return Object.keys(data).length;
  }

async function getPaintingsByCategory(category) {

    const paintings = await getAllForSales();

    const categorySort = paintings.filter(c => c.category === category);

    return categorySort;
}

async function getPaintingsBySize(size) {

    const paintings = await getAllForSales();

    const sizeSort = paintings.filter(s => s.size == size);

    return sizeSort;
}

async function getCombinedPaintings(equalToCategory, equalToSizes) {
    try {
        let paintingsByCategory = [];
        let paintingsBySize = [];

        // First query for filter category
        if (equalToCategory) {
            paintingsByCategory = await getPaintingsByCategory(equalToCategory);
        }

        // Second query for filter size
        if (equalToSizes) {
            paintingsBySize = await getPaintingsBySize(equalToSizes);
        }

        // Filtering painting
        const filteredPaintings = paintingsByCategory.filter(painting => {
            return paintingsBySize.some(sizePainting => sizePainting.id === painting.id);
        });

        return filteredPaintings;
    } catch (error) {
        console.error('Error fetching paintings:', error);
    }
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

const markAsSold = async (cartItems) => {
    const updates = {};

    cartItems.forEach(item => {
        const itemRef = `paintings/${item.id}`;
        updates[`${itemRef}/sold`] = "yes";
    });

    try {
        await update(ref(database), updates);
        console.log("All paintings are marked as sold.");
    } catch (error) {
        console.error("Update sold error", error);
    }
};


async function updateData(idPainting, data) {
    return await requester.patch(`${baseUrl}/${idPainting}.json`, data);
}

async function deletePainting(paintingId) {
    const paintingRef = ref(database, `paintings/${paintingId}`);
  
    try {
      await remove(paintingRef);
      console.log("The painting has delete success.");
    } catch (error) {
      console.error("Error Delete painting:", error);
    }
  }

export default {
    getAll,
    getAllForSales,
    getLimit,
    getOne,
    getPaintingsCount,
    getPaintingsByCategory,
    getPaintingsBySize,
    getCombinedPaintings,
    create,
    updateData,
    markAsSold,
    deletePainting
}