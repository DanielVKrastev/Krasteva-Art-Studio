import { BASE_URL } from "../constants";
import requester from "../utils/requester";

import { database } from '../../firebase';
import { ref, push, serverTimestamp, set } from "firebase/database";

const baseUrl = `${BASE_URL}/availabilityInquiry`;

async function getAll() {
    return await requester.get(`${baseUrl}.json`);
}

async function getOne(id) {
    return await requester.get(`${baseUrl}/${id}.json`);
}

const create = async (data) => {
    try {
      const inquiryRef = push(ref(database, 'availabilityInquiry'));
      const inquiryId = inquiryRef.key;
  
      const messageData = {
        id: inquiryId,
        ...data,
        createdAt: serverTimestamp(),
      };
  
      await set(inquiryRef, messageData);
      console.log("The inquiry is sent");
    } catch (error) {
      console.error("Error while saving inquiry:", error);
    }
  };

export default{
    getAll,
    getOne,
    create
}