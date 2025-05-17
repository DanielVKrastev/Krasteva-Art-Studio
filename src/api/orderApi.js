import { BASE_URL } from "../constants";
import requester from "../utils/requester";

import { auth, database } from '../../firebase';
import { ref, push, serverTimestamp, set, remove } from "firebase/database";

const baseUrl = `${BASE_URL}/orders`;

async function getAll() {
    const result = await requester.get(`${baseUrl}.json`);
    const data = Object.values(result || {});

    return data.sort((a, b) => b.createdAt - a.createdAt);
}

async function getLimit(limit) {
  const result = await requester.get(`${baseUrl}.json?orderBy="createdAt"&limitToFirst=${limit}`);
  const data = Object.values(result || {});

  return data.sort((a, b) => b.createdAt - a.createdAt);
}

async function getOne(id) {
    return await requester.get(`${baseUrl}/${id}.json`);
}

async function getProfitData() {
  const data = await getAll();
  
  if (!data) return {
    totalProfit: 0, totalOrders: 0,
    currentMonthProfit: 0, currentMonthOrders: 0,
    lastMonthProfit: 0, lastMonthOrders: 0,
  };

  const now = new Date();

  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  const endOfCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).getTime();

  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime();
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59).getTime();

  let totalProfit = 0;
  let totalOrders = 0;
  let currentMonthProfit = 0;
  let currentMonthOrders = 0;
  let lastMonthProfit = 0;
  let lastMonthOrders = 0;

  Object.values(data).forEach(order => {
    const created = order.createdAt;
    const price = Number(order.totalPrice) || 0;

    totalProfit += Number(price);
    totalOrders += 1;

    if (created >= startOfCurrentMonth && created <= endOfCurrentMonth) {
      currentMonthProfit += price;
      currentMonthOrders += 1;
    }

    if (created >= startOfLastMonth && created <= endOfLastMonth) {
      lastMonthProfit += price;
      lastMonthOrders += 1;
    }
  });

  return {
    totalProfit: totalProfit.toFixed(2),
    totalOrders,
    currentMonthProfit: currentMonthProfit.toFixed(2),
    currentMonthOrders,
    lastMonthProfit: lastMonthProfit.toFixed(2),
    lastMonthOrders
  };
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
    return newOrder; 
  } catch (error) {
    console.error("Error while saving order:", error);
    throw error;
  }
};

async function updateData(idOrder, data) {
  const user = auth.currentUser;
  const token = await user.getIdToken();
  return await requester.patch(`${baseUrl}/${idOrder}.json?auth=${token}`, data);
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
    getProfitData,
    create,
    updateData,
    deleteOrder
}