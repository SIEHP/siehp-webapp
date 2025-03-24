import axios from "axios";
import { SIEHPConfig } from "@/shared/config/siehpConfig";

// Criar uma instância do axios com a URL base configurada
const api = axios.create({
  baseURL: SIEHPConfig.API_URL,
});

// Adicionar um interceptor para incluir o token de autenticação em todas as requisições
api.interceptors.request.use((config) => {
  // Verificar se há um token armazenado no localStorage
  const authData = localStorage.getItem('auth');
  
  if (authData) {
    try {
      const { state } = JSON.parse(authData);
      
      if (state?.auth?.token) {
        // Adicionar o token ao cabeçalho de autorização
        config.headers.Authorization = `Bearer ${state.auth.token}`;
      }
    } catch (error) {
      console.error("Erro ao processar token de autenticação:", error);
    }
  }
  
  return config;
});

export default api; 