import { Demo } from "../../types/types";

export const ProductService = {
  getAll() {
    return fetch("/demo/data/products.json", { headers: { "Cache-Control": "no-cache" } })
      .then((res) => res.json())
      .then((d) => d.data as Demo.Product[]);
  },
};
