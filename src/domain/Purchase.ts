export interface PurchaseItem {
  productId: number;
  quantity: number;
  name: string;
  price: number;
}

export interface Purchase {
  date: Date;
  total: number;
  items: PurchaseItem[];
}
