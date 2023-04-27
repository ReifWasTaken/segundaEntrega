const fs = require("fs");

class ProductManager {
    constructor(path){
        this.path = "products.json";
        this.products = [];
        this.id = 0;
    }

    async checkFile(){
        try{
           const fileData = await fs.promises.readFile(this.path, "utf-8");
        }
        catch{
            console.log("File dont exist");

            try{
                await fs.promises.writeFile(this.path, "[]");
                console.log("file created");
            }
            catch(err){
                console.log("Error creating file");
            }
        }
    }
    async addProduct(product){

        await fs.promises.readFile(this.path, "utf-8")
            //verifica si el codigo existe
           
            if(this.products.some((prod) => prod.code === product.code)){
                return "code allready exist"
            }
            
            if( !product.title ||
                !product.description ||
                !product.price ||
                !product.thumbnail ||
                !product.code ||
                !product.stock)
                {
                    return "some data is missing"
                } 
            try{

                product = {id: ++this.id, ...product};
                this.products.push(product);
                const productosSting = JSON.stringify(product)
                await fs.promises.writeFile(this.path, productosSting), null, 2;

                return "product added"
            }
        catch(err){
            throw err
            //console.log("addProduct failed");
        }    

        

    }
    
    async getProducts(){

        return await fs.promises.readFile(this.path, "utf-8");

    }

    getProductById(id){
        let prodFound = this.products.find((prod)=> prod.id === id);

        
        if(!prodFound){
            return "not found";
        }
        return prodFound;
    }
}

const item = 
{
    title: "potato",
    description: "poh tay toes",
    price: 200,
    thumbnail: "https://media.tenor.com/KDskB0xTY9IAAAAC/potatoes-lotr.gif",
    code: "a01",
    stock: 200,
}

const item2 = {
    title: "fish",
    description: "it's a fish",
    price: 200,
    thumbnail: "https://www.meme-arsenal.com/memes/e27cd6ec6c89cfdaec356d0e0672a666.jpg",
    code: "a02",
    stock: 200,
}




async function productInteraction(){
    
const productManager = new ProductManager();

    await productManager.checkFile();
    console.log(await productManager.addProduct(item));
    console.log(await productManager.getProducts());
    console.log(await productManager.addProduct(item2));
    console.log(await productManager.getProducts());

}

productInteraction();

/* 

console.log(productManager.getProducts());
console.log(productManager.getProductById(1)); */