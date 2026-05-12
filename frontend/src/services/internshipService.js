import API from "./api";

export const getAllInternships = () =>
  API.get("/internships/all");