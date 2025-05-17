import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
});  
  
export const getPosts = async () => {
    try {
      const response = await api.get('/posts');
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      return {
        success: false,
        error: "Erro ao buscar os posts. Tente novamente mais tarde."
      };
    }
  };
  
 export const getPost = async (id:string) => {
      try {
        const response = await api.get(`/posts/${id}`);
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar post:", error);
        return {
          success: false,
          error: "Erro ao buscar o post. Tente novamente mais tarde."
        };
      }
    };
  
  export const addPost = async (newPost: any) => {
    try {
      const response = await api.post('/posts', newPost);
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar post:", error);
      return {
        success: false,
        error: "Erro ao adicionar o post. Tente novamente mais tarde."
      };
    }
  };
  
  export const deletePost = async (id:string) => {
    try {
      await api.delete(`/posts/${id}`);
      return { success: true };
    } catch (error) {
      console.error("Erro ao deletar post:", error);
      return {
        success: false,
        error: "Erro ao deletar o post. Tente novamente mais tarde."
      };
    }
  };
  
  export const updatePost = async (id:string, updatedPost: any) => {
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
      return {
        success: false,
        error: "Erro ao atualizar o post. Tente novamente mais tarde."
      };
    }
  };
  
  export default api;