import { BASE_URL } from "../constants";
import requester from "../utils/requester";

import { auth, database } from '../../firebase';
import { ref, push, serverTimestamp, set, remove, get } from "firebase/database";

const baseUrl = `${BASE_URL}/contactMessages`;

async function getAll() {
  const result = await requester.get(`${baseUrl}.json`);
  const data = Object.values(result || {});
  
  return data.sort((a, b) => b.createdAt - a.createdAt);
}

async function getOne(id) {
  return await requester.get(`${baseUrl}/${id}.json`);
}

async function getMessagesCount() {
  const snapshot = await get(ref(database, 'contactMessages'));
  if (!snapshot.exists()) return 0;

  const data = snapshot.val();
  return Object.keys(data).length;
}

async function getNotAnswered() {
  const data = await requester.get(`${baseUrl}.json?orderBy="answered"&equalTo="no"`);
  return Object.keys(data).length;
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

async function updateData(idMessage, data) {
  const user = auth.currentUser;
  const token = await user.getIdToken();
  return await requester.patch(`${baseUrl}/${idMessage}.json?auth=${token}`, data);
}

async function deleteMessage(messageId) {
  const messageRef = ref(database, `contactMessages/${messageId}`);

  try {
    await remove(messageRef);
    console.log("The Message has delete success.");
  } catch (error) {
    console.error("Error Delete Message:", error);
  }
}

export default {
  getAll,
  getOne,
  getMessagesCount,
  getNotAnswered,
  create,
  updateData,
  deleteMessage
}