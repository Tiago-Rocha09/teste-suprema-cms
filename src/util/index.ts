import { v4 as uuidv4 } from "uuid";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateRandomString = () => uuidv4();

export function formatComponentsToObject(components: any[]) {
  const formatted: any = {};

  components.forEach((component) => {
    const sessionId = component.id; // O ID da sessão atual
    const type = component.component.type;

    // Inicializa o objeto da sessão se ainda não existir
    if (!formatted[sessionId]) {
      formatted[sessionId] = { component: {} };
    }

    // Verifica se o tipo do componente já foi adicionado à sessão
    if (!formatted[sessionId].component[type]) {
      formatted[sessionId].component[type] = {};
    }

    // Adiciona o componente ao tipo correspondente
    formatted[sessionId].component[type][component.id] = {
      value: type === "image" ? {} : "<p>Valor genérico</p>", // Substitua por valores reais se necessário
    };

    // Se tiver filhos, itera e adiciona recursivamente
    if (component.component.children) {
      component.component.children.forEach((child: any) => {
        const childType = child.component.type;
        if (!formatted[sessionId].component[childType]) {
          formatted[sessionId].component[childType] = {};
        }

        formatted[sessionId].component[childType][child.id] = {
          value: childType === "image" ? {} : "<p>Valor do filho</p>",
        };
      });
    }
  });

  return formatted;
}

export function transformToArray(data: Record<string, any>): any[] {
  const result: any[] = [];

  for (const sessionUuid in data) {
    for (const childUuid in data[sessionUuid]) {
      const component = data[sessionUuid][childUuid];

      for (const type in component) {
        const componentData = component[type];

        if (type === "grid" || type === "banner") {
          // Verifica se já existe um grid/banner com a mesma sessionUuid
          const existing = result.find(
            (item) => item.type === type && item.sessionUuid === sessionUuid
          );

          const children = Object.keys(componentData).map((childType) => ({
            type: childType,
            value: componentData[childType].value,
            sessionUuid: childUuid,
          }));

          if (existing) {
            // Adiciona os novos filhos ao array `children` existente
            existing.children.push(...children);
          } else {
            // Cria um novo objeto com os filhos
            result.push({
              type,
              sessionUuid,
              children,
            });
          }
        } else {
          // Para componentes simples
          result.push({
            type,
            value: componentData.value,
            sessionUuid,
          });
        }
      }
    }
  }

  return result;
}

export function transformToNestedObject(data: any[]): Record<string, any> {
  const result: Record<string, any> = {};

  data.forEach((item) => {
    const sessionUuid = item.id;
    const { type, children, value } = item.component;

    // Inicializa a sessão se ela ainda não existe no resultado
    if (!result[sessionUuid]) {
      result[sessionUuid] = {};
    }

    // Processa os filhos se existirem
    if (children && children.length > 0) {
      children.forEach((child: any) => {
        const childUuid = child.component.id;
        const childType = child.component.type;
        const childValue = child.component.value;

        if (!result[sessionUuid][childUuid]) {
          result[sessionUuid][childUuid] = {};
        }

        result[sessionUuid][childUuid][type] = {
          [childType]: { value: childValue },
        };
      });
    } else {
      // Processa os componentes simples sem filhos
      const childUuid = item.component.id;
      if (!result[sessionUuid][childUuid]) {
        result[sessionUuid][childUuid] = {};
      }
      result[sessionUuid][childUuid][type] = { value };
    }
  });

  return result;
}
