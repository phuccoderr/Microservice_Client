import { productsAxiosClient } from "@/api/axiosClient";
import { socket } from "@/api/socket";
import { ParamPagination } from "@/types/pagination.type";
import { CreateProduct } from "@/types/product.type";

export const productsApi = {
  get(params: ParamPagination) {
    const url = "";
    return productsAxiosClient.get(url, { params });
  },
  create(params: CreateProduct) {
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
};
