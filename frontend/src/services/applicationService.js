import API from "./api";

export const applyInternship = (formData) =>
  API.post("/applications/apply", formData);