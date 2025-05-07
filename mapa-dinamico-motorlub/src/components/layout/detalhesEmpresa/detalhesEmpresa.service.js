import axios from 'axios';

const API_BASE = 'http://localhost:8080/empresas';

export async function alteraStatus(id) {
  try {
    const response = await axios.put(`${API_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar status da empresa:', error);
    throw error;
  }
}
