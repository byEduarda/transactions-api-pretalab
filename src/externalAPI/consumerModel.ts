import { getExternalProducts } from "./finshopping";

(async () => {
  console.log("🔹 Obtendo produtos do FinShopping...");
  const produtos = await getExternalProducts();
  console.log(produtos);

})();