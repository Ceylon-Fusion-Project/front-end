import api from "@/api/axiosInstance";

export interface CertificationFormData {
  certificationID?: number;
  productID: number;
  certificationName: string;
  issuer: string;
  issuedDate: string;
  expiryDate: string;
  certActiveState: boolean;
  certURL: string;
}

export const getAllCertifications = async (page = 0, size = 10) => {
    return api.get("/certifications/get-all-certificates", {
      params: { page, size },
    });
  };
  
  export const saveCertification = async (data: any, idempotencyKey: string) => {
    return api.post("/certifications/save-certificate", data, {
      headers: { "X-Idempotency-Key": idempotencyKey },
    });
  };
  
  export const updateCertification = async (id: number, data: any, idempotencyKey: string) => {
    return api.patch("/certifications/update-certificate-details", data, {
      headers: { "X-Idempotency-Key": idempotencyKey },
      params: { certificationID: id },
    });
  };
  
  export const deleteCertification = async (id: number, idempotencyKey: string) => {
    return api.delete("/certifications/delete-certificate-by-id", {
      headers: { "X-Idempotency-Key": idempotencyKey },
      params: { certificationID: id },
    });
  };