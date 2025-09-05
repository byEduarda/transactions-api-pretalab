export interface PurchaseItem {
  productId: string;
  quantity: number;
  name: string;
  price: number;
}

export interface Purchase {
  id: string;
  date: Date;
  total: number;
  items: PurchaseItem[];
}
