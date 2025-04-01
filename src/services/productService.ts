import api from "@/api/axiosInstance";
import {FormValues} from "@/components/AdminComponents/ProductForm";

export const saveProduct = async (product: FormValues, idempotencyKey: string) => {
    console.log("IdempotencyKey:"+idempotencyKey);
    const response = await api.post(
        "/product/save-product", 
        product,
        {
            headers: {
                "X-Idempotency-Key" : idempotencyKey,
            }
        }
    );
    return response.data;
};

export const updateProduct = async (id: number, product: FormValues, idempotencyKey: string) => {
    console.log("IdempotencyKey:"+idempotencyKey);
    const response = await api.patch(
        `/product/update-product-details?id=${id}`, 
        product,
        {
            headers: {
                "X-Idempotency-Key" : idempotencyKey,
            }
        }
    );
    return response.data;
};

export const deleteProduct = async (id: number, idempotencyKey: string) => {
    console.log("IdempotencyKey:"+idempotencyKey);
    const response = await api.delete(
        `/product/delete-product-by-id?id=${id}`,
        {
            headers: {
                "X-Idempotency-Key" : idempotencyKey,
            }
        }
    );
    return response.data;
}