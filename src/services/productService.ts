import api from "@/api/axiosInstance";
import { v4 as uuidv4 } from "uuid";
import {FormValues} from "@/components/AdminComponents/ProductForm";

export const saveProduct = async (product: FormValues) => {
    const response = await api.post(
        "/product/save-product", 
        product,
        {
            headers: {
                "X-Idempotency-Key" : uuidv4(),
            }
        }
    );
    return response.data;
};

export const updateProduct = async (id: number, product: FormValues) => {
    const response = await api.put(`/product/update-product-details?id=${id}`, product);
    return response.data;
};