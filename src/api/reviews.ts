import { api } from "./client";
import { Review } from "../types";

export const fetchReviews = () =>
	api.get<Review[]>(`/reviews`);