import API from "./api";

export const addReview = (data) =>
  API.post("/reviews/add", data);

export const getReviewsByInternship = (internshipId) =>
  API.get(`/reviews/internship/${internshipId}`);