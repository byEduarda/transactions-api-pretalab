import axios from "axios";
import ProductModel from "../database/mongooseProduct"; 

export const getExternalProducts = async () => {
  try {
    const response = await axios.get("https://finshopping.vercel.app/api/products");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos da API externa:", error);
    return [];
  }
};

export const syncProducts = async () => {
  const externalProducts = await getExternalProducts();

  if (externalProducts && externalProducts.length > 0) {
    try {
      await ProductModel.deleteMany({});
      
      const productsToSave = externalProducts.map((p: any) => ({
        name: p.name,
        price: p.price,
      }));
      await ProductModel.insertMany(productsToSave);
      
      console.log(`✅ Sincronização concluída: ${productsToSave.length} produtos salvos.`);
    } catch (error) {
      console.error("Erro ao salvar produtos no MongoDB:", error);
    }
  }
};