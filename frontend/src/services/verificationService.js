import API from "./api";

export const verifyExternalInternship = (data) =>
  API.post("/verify/external", data);