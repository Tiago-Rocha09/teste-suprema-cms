import { AxiosError } from "axios";
import { api } from "./api";

export const pageService = {
  listPages: async (searchTerm?: string) => {
    const responsePages = await api
      .get("/pages", {
        params: {
          searchTerm,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((response: AxiosError) => {
        console.log(response);
        return response.response;
      });

    return responsePages;
  },
  findPage: async (pageId: number) => {
    const responsePage = await api
      .get(`/pages/${pageId}`)
      .then((response) => {
        return response.data;
      })
      .catch((response: AxiosError) => {
        console.log(response);
        return response.response;
      });

    return responsePage;
  },
  createPage: async (data: FormData) => {
    const responsePage = await api
      .post("/pages", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((response: AxiosError) => {
        console.log(response);
        return { error: true, response: response.response };
      });

    return responsePage;
  },
  updatePage: async (pageId: number, data: FormData) => {
    const responsePage = await api
      .put(`/pages/${pageId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((response: AxiosError) => {
        console.log(response);
        return { error: true, response: response.response };
      });

    return responsePage;
  },
  deletePage: async (pageId: number) => {
    const responsePage = await api
      .delete(`/pages/${pageId}`)
      .then((response) => {
        return response.data;
      })
      .catch((response: AxiosError) => {
        console.log(response);
        return response.response;
      });

    return responsePage;
  },
};
