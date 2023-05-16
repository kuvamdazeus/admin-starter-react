import { createFetcher } from "@dazeus/usefetcher";
import { BASE_URL } from "@/constants";

export const fetcher = createFetcher({
  baseUrl: BASE_URL,
  headers: () => ({
    Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
  }),
});
