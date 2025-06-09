import api from '../../../utils/axios';

export async function alteraStatus(id) {
  try {
    const response = await api.put(`empresas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar status da empresa:', error);
    throw error;
  }
}

export async function atualizarAnotacoes(id, comentario) {
  try {
    const response = await api.patch(`empresas/${id}`, {comentario: comentario});
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar comentários da empresa:', error);
    throw error;
  }
}
