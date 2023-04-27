export type XXXXXType = {
  id?: string;
  code?: string;
  name: string;
  description: string;
  image?: string;
  price?: number;
  category?: string;
  quantity?: number;
  inventoryStatus?: InventoryStatus;
  rating?: number;
  orders?: ProductOrder[];
  [key: string]: string | string[] | number | boolean | undefined | ProductOrder[] | InventoryStatus;
};
