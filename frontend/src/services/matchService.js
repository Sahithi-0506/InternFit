import API from "./api";

export const calculateMatch = (studentId, internshipId) =>
  API.get(`/match/${studentId}/${internshipId}`);