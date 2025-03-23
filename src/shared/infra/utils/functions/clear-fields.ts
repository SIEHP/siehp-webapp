/**
 * Função para limpar os dados do formulário de adicionar imagem do localStorage
 * e retornar um objeto com os valores iniciais para os estados
 */
export const clearProfessorImageFields = () => {
  // Remove os dados do localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('professorAddImageData');
    localStorage.removeItem('professorAddImageBase64');
  }

  // Retorna um objeto com os valores iniciais para os estados
  return {
    direitosImagem: '',
    tecidoOrgao: '',
    estadoPeca: '',
    dataCadastro: '',
    tituloImagem: '',
    descricaoImagem: '',
    tags: [] as string[],
    selectedImage: null,
    imagePreviewUrl: null
  };
};
