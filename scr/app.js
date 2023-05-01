import express from "express"
import classProducts from "./productManager.js";
const productManager = new classProducts();

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`app listening from http://localhost:${port}`)
});

app.get("/products", async (req, res) => {
  const limit = req.query.limit;
  const products = await productManager.getProducts();

  if(limit){
    res.json(products.slice(0, limit));
  }else{
    res.json(products);
  }
});

app.get("/products/:pid", async (req, res) => {
  
  const solicitedID = req.params.pid;
  
  const productFound = await productManager.getProductById(parseInt(solicitedID));
  
  if(productFound){
    
    return res.json(productFound);
    
  }else{
    
    return res.json({
      
      err: "Product not found with the " + solicitedID,
      
    });
  }
});
