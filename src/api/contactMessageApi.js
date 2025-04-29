import { BASE_URL } from "../constants";
import requester from "../utils/requester";

import { database } from '../../firebase';
import { ref, push, serverTimestamp, set, remove } from "firebase/database";

const baseUrl = `${BASE_URL}/contactMessages`;

async function getAll() {
    const result = await requester.get(`${baseUrl}.json`);
    return Object.values(result);
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

  async function deleteMessage(messageId) {
    const inquiryRef = ref(database, `contactMessage/${messageId}`);
  
    try {
      await remove(inquiryRef);
      console.log("The inquiry has delete success.");
    } catch (error) {
      console.error("Error Delete inquiry:", error);
    }
  }

export default{
    getAll,
    getOne,
    create,
    deleteMessage
}