import { productsAxiosClient } from "@/api/axiosClient";
import { socket } from "@/api/socket";
import { ParamPagination } from "@/types/pagination.type";
import { CreateProduct, InfoProduct } from "@/types/product.type";
import { update } from "lodash";

export const productsApi = {
  get: (params: ParamPagination) => {
    const url = "";
    return productsAxiosClient.get(url, { params });
  },
  getOne: (id: string) => {
    const url = `${id}`;
    return productsAxiosClient.get(url);
  },
  create: (params: CreateProduct) => {
    const { product, main_image, extra_images } = params;

    const formData = new FormData();
    const blob = new Blob([JSON.stringify(product)], {
      type: "application/json",
    });
    formData.append("product", blob);
    if (main_image) {
      formData.append("main_image", main_image);
    }
    if (extra_images.length > 0) {
      extra_images.forEach((file) => {
        formData.append("extra_images", file);
      });
    }

    const url = "";
    return productsAxiosClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Socket-ID": socket.id,
      },
    });
  },
  update: (id: string, params: InfoProduct) => {
    const url = `${id}`;
    return productsAxiosClient.patch(url, params);
  },
  delete: (id: string) => {
    const url = `${id}`;
    return productsAxiosClient.delete(url);
  },
  addImage: (id: string, file: File, config: any) => {
    const formData = new FormData();
    formData.append("main_image", file);
    const url = `add_file/${id}`;
    return productsAxiosClient.patch(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  addExtraImages: (id: string, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("extra_images", file);
    });
    const url = `add_files/${id}`;
    return productsAxiosClient.patch(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
