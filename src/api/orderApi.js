import { BASE_URL } from "../constants";
import requester from "../utils/requester";

import { database } from '../../firebase';
import { ref, push, serverTimestamp, set } from "firebase/database";

const baseUrl = `${BASE_URL}/orders`;

async function getAll() {
    return await requester.get(`${baseUrl}.json`);
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
      status: "pending",
      ...data
    };

    await set(orderRef, newOrder);
    console.log("The order is saved");
  } catch (error) {
    console.error("Error while saving order:", error);
  }
};


export default{
    getAll,
    getOne,
    create
}