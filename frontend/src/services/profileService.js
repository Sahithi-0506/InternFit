import API from "./api";

export const uploadResumeService = (studentId, formData) =>
  API.post(`/profile/resume/${studentId}`, formData);