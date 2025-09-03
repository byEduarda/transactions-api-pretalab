import { Schema, model, Document } from 'mongoose';

export interface Product extends Document {
  id?: string; 
  name: string;
  price: number;
}

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const ProductModel = model<Product>('Product', productSchema);

export default ProductModel;