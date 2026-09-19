import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/documents';

export const getDocuments = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const createDocument = async (documentData) => {
  const response = await axios.post(API_BASE_URL, documentData);
  return response.data;
};

export const updateDocumentStatus = async (id, status) => {
  const response = await axios.put(`${API_BASE_URL}/${id}/status?status=${status}`);
  return response.data;
};