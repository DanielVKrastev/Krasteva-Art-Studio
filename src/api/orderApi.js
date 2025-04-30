import { BASE_URL } from "../constants";
import requester from "../utils/requester";

import { database } from '../../firebase';
import { ref, push, serverTimestamp, set, remove } from "firebase/database";

const baseUrl = `${BASE_URL}/orders`;

async function getAll() {
    const result = await requester.get(`${baseUrl}.json`);
    return Object.values(result);
}

async function getLimit(limit) {
  const result = await requester.get(`${baseUrl}.json?orderBy="createdAt"&limitToFirst=${limit}`);
  return Object.values(result);
}

async function getOne(id) {
    return await requester.get(`${baseUrl}/${id}.json`);
}

const create = async (data, paintingIds) => {
  try {
    const orderRef = push(ref(database, 'orders'));
    const orderId = orderRef.key;

    const newOrder = {
      id: orderId,
      paintingIds,
      createdAt: serverTimestamp(),
      status: "изчакване",
      ...data
    };

    await set(orderRef, newOrder);
    console.log("The order is saved");
  } catch (error) {
    console.error("Error while saving order:", error);
  }
};

async function updateData(idOrder, data) {
    return await requester.patch(`${baseUrl}/${idOrder}.json`, data);
}

async function deleteOrder(orderId) {
    const sizeRef = ref(database, `orders/${orderId}`);
  
    try {
      await remove(sizeRef);
      console.log("The order has delete success.");
    } catch (error) {
      console.error("Error Delete order:", error);
    }
  }


export default{
    getAll,
    getOne,
    getLimit,
    create,
    updateData,
    deleteOrder
}