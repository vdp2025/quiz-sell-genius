/**
 * Utilitário para gerenciar configurações remotas
 * Permite importar templates e configurações de fontes externas
 */

/**
 * Busca uma configuração de um URL remoto
 * @param url URL para buscar a configuração
 * @returns A configuração obtida ou null em caso de erro
 */
export const fetchRemoteConfig = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao buscar configuração: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar configuração remota:', error);
    throw error;
  }
};

/**
 * Valida se a configuração remota possui a estrutura esperada
 * @param config O objeto de configuração a ser validado
 * @returns Se a configuração é válida ou não
 */
export const validateRemoteConfig = (config: any) => {
  // Validação básica
  if (!config) return false;
  
  // Verifica campos essenciais
  const hasRequiredFields = 
    config.header !== undefined && 
    config.mainContent !== undefined &&
    config.secondaryStyles !== undefined;
    
  return hasRequiredFields;
};

/**
 * Normaliza uma configuração remota para o formato esperado pela aplicação
 * @param config Configuração a ser normalizada
 * @returns Configuração normalizada
 */
export const normalizeRemoteConfig = (config: any) => {
  // Cria uma configuração base com valores padrão
  const normalized = {
    styleType: config.styleType || 'default',
    header: {
      visible: config.header?.visible !== undefined ? config.header.visible : true,
      content: config.header?.content || {},
      style: config.header?.style || {}
    },
    mainContent: {
      visible: config.mainContent?.visible !== undefined ? config.mainContent.visible : true,
      content: config.mainContent?.content || {},
      style: config.mainContent?.style || {}
    },
    secondaryStyles: {
      visible: config.secondaryStyles?.visible !== undefined ? config.secondaryStyles.visible : true,
      content: config.secondaryStyles?.content || {},
      style: config.secondaryStyles?.style || {}
    },
    offer: config.offer || {
      hero: { visible: true, content: {}, style: {} },
      products: { visible: true, content: {}, style: {} },
      pricing: { visible: true, content: {}, style: {} },
      testimonials: { visible: true, content: {}, style: {} }
    },
    globalStyles: config.globalStyles || {},
    blocks: config.blocks || []
  };
  
  return normalized;
};

/**
 * Gera um objeto para exportação que pode ser compartilhado
 * @param config A configuração atual
 * @returns Uma versão compacta para exportação
 */
export const generateExportableConfig = (config: any) => {
  return {
    ...config,
    meta: {
      exportedAt: new Date().toISOString(),
      version: '1.0',
      appName: 'QuizSellGenius'
    }
  };
}; 