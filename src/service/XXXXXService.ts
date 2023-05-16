import { BASE_URL } from "@/constants";
import { XXXXXType } from "@/types/xxxxx";

export const XXXXXService = {
  async getList() {
    const resData = await fetch(`${BASE_URL}/api/xxxxx`).then((res) => res.json());
    return resData.data as XXXXXType[];
  },

  async getOne(id: any) {
    // ...

    return {} as XXXXXType;
  },

  async deleteSelected(selected: XXXXXType[]) {
    // ...

    const newData = await this.getList();
    return newData;
  },

  async deleteById(id: any) {
    // ...

    const newData = await this.getList();
    return newData;
  },

  async updateById(id: any, data: any) {
    // ...

    const newData = await this.getList();
    return newData;
  },

  async createOne(data: any) {
    // ...

    const newData = await this.getList();
    return newData;
  },
};
