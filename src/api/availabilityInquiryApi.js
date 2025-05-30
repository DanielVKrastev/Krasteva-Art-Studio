import { BASE_URL } from "../constants";
import requester from "../utils/requester";

import { auth, database } from '../../firebase';
import { ref, push, serverTimestamp, set, remove, get } from "firebase/database";

const baseUrl = `${BASE_URL}/availabilityInquiry`;

async function getAll() {
  const result = await requester.get(`${baseUrl}.json?orderBy="createdAt"`);
  const data = Object.values(result || {});

  return data.sort((a, b) => b.createdAt - a.createdAt);
}

async function getOne(id) {
  return await requester.get(`${baseUrl}/${id}.json`);
}

async function getInquiryCount() {
  const snapshot = await get(ref(database, 'availabilityInquiry'));
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

async function updateData(idInquiry, data) {
  const user = auth.currentUser;
  const token = await user.getIdToken();
  return await requester.patch(`${baseUrl}/${idInquiry}.json?auth=${token}`, data);
}

async function deleteInquiry(inquiryId) {
  const inquiryRef = ref(database, `availabilityInquiry/${inquiryId}`);

  try {
    await remove(inquiryRef);
    console.log("The inquiry has delete success.");
  } catch (error) {
    console.error("Error Delete inquiry:", error);
  }
}

export default {
  getAll,
  getOne,
  getInquiryCount,
  getNotAnswered,
  create,
  updateData,
  deleteInquiry
}