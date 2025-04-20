import { BASE_URL } from "../constants";
import requester from "../utils/requester";

import { database } from '../../firebase';
import { ref, push, serverTimestamp, set } from "firebase/database";

const baseUrl = `${BASE_URL}/contactMessages`;

async function getAll() {
    return await requester.get(`${baseUrl}.json`);
}

async function getOne(id) {
    return await requester.get(`${baseUrl}/${id}.json`);
}

const create = async (data) => {
    try {
      const messageRef = push(ref(database, 'contactMessages'));
      const messageId = messageRef.key;
  
      const messageData = {
        id: messageId,
        ...data,
        createdAt: serverTimestamp(),
      };
  
      await set(messageRef, messageData);
      console.log("The message is sent");
    } catch (error) {
      console.error("Error while saving message:", error);
    }
  };

export default{
    getAll,
    getOne,
    create
}