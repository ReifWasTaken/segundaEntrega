import express from "express"
import classProducts from "../productManager.js";
const productsRouter = express.Router();
const productManager = new classProducts();


productsRouter.get("/", async (req, res) => {
    const limit = req.query.limit;
try{
  const products = await productManager.getProducts();
  
  if(limit){
    return res.status(200).json({
    status: "success",
    msg: "Product List",
    data: (products.slice(0, limit))
    });
  }else{
    return res.status(200).json({
    status: "success",
    msg: "Product List",
    data: products,
    });
  }
}

catch(err){
  return  res.status(404).json({
    status: "error",
    msg: "Product List does not exist",
    data: {},
  });
}

});

productsRouter.post("/", async (req, res)=>{
  try{
  const allProducts = await productManager.getProducts();
  const newProduct =  req.body;
    
  const serchCode = allProducts.find((prod) => prod.code === newProduct.code)
    if(serchCode){
      return res.status(400).json({
        status: "error",
        msg: "cant add a product with the same id"
      });
    }

    if(
      !newProduct.title ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.thumbnail ||
      !newProduct.code ||
      !newProduct.stock ||
      !newProduct.category){

        return res.status(400).json({
        status: "error",
        msg: "some data is missing"
        });
    }

  await productManager.addProduct({...newProduct, status: true});
  
  return res.status(201).json({
    status: "succes",
    msg: "producct added succesfully",
    data: newProduct,
  });
}

catch(err){
  return res.status(400).json({
    status: "error",
    msg: "there was an error adding the product",
    data: err
  })
}
});

productsRouter.get("/:pid", async (req, res) => {
    const solicitedID = req.params.pid; 
try{
  const productFound = await productManager.getProductById(parseInt(solicitedID));

  if(productFound){     
    return res.status(200).json({
    status: "success",
    msg: "Product info",
    data: productFound,
    });  
  }

}

catch(err){   
  return  res.status(404).json({
    status: "error",
    msg: "Product does not exist",
    data: { err: "Product not found with the ID " + solicitedID },
  });
}

});


export {productsRouter};