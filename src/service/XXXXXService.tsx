import { XXXXXType } from "@/types/xxxxx";

export const XXXXXService = {
  async getAll() {
    const resData = await fetch("/demo/data/products.json").then((res) => res.json());
    return resData.data as XXXXXType[];
  },

  async getOne(id: any) {
    // ...

    return {} as XXXXXType;
  },

  async deleteSelected(selected: XXXXXType[]) {
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
