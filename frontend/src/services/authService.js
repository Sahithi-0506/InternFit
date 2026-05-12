import API from "./api";

/* STUDENT */

export const registerStudent = (data) =>
  API.post("/auth/student/register", data);

export const loginStudent = (data) =>
  API.post("/auth/student/login", data);

/* ALUMNI */

export const registerAlumni = (data) =>
  API.post("/auth/alumni/register", data);

export const loginAlumni = (data) =>
  API.post("/auth/alumni/login", data);