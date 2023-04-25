import { ProductsType } from "@/types/products";

export const ProductService = {
  async getAll() {
    const resData = await fetch("/demo/data/products.json").then((res) => res.json());
    return resData.data as ProductsType[];
  },

  async deleteSelected(selected: ProductsType[]) {
    // ...

    const newData = await this.getAll();
    return newData;
  },

  async deleteById(id: any) {
    // ...

    const newData = await this.getAll();
    return newData;
  },

  async updateById(id: any, data: any) {
    // ...

    const newData = await this.getAll();
    return newData;
  },

  async createOne(data: any) {
    // ...

    const newData = await this.getAll();
    return newData;
  },
};
