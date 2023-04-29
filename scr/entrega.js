const fs = require("fs");

class ProductManager {
    constructor(path){
        this.path = "products.json";
        this.products = [];
        this.id = 0;
    }

    //verifica si el archivo existe si no crea uno
    async checkFile(){
        try{

           this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        }
        catch{
            console.log("File dont exist");

            try{
                await fs.promises.writeFile(this.path, "[]", null, 2);
                console.log("file created");
            }
            catch(err){
                console.log("Error creating file");
            }
        }
    }
    async addProduct(product){

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
                const productosSting = JSON.stringify(this.products)
                await fs.promises.writeFile(this.path, productosSting, null, 2);


                return product, "product added"
            }
        catch(err){
            console.log("addProduct failed");
        }    
    }
    
    async getProducts(){

        return this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));

    }

    async getProductById(id){
        let prodFound = this.products.find((prod)=> prod.id === id);

        if(!prodFound){
            return "not found";
        }
        return prodFound;
    }

    async deleteProduct(id) {
        try{
            let auxProducts = await this.getProducts();
            const index = auxProducts.findIndex((product)=> product.id === id);

            if(index === -1){
                console.log("ID not found");
            }else{
            auxProducts.splice(index, 1);

            const productosSting = JSON.stringify(this.products)
            await fs.promises.writeFile(this.path, productosSting, null, 2); 

            return "product Deleted"
            }
        }

        catch(err){
            throw err
        }
    }

    async updateProduct(id, updatedValue) {
        try{
            let auxProducts = await this.getProducts();
            const index = auxProducts.findIndex((product)=> product.id === id);

            if(index === -1){
                console.log("ID not found");
            }else{

                const auxProduct = { ...auxProducts[index], ...updatedValue};
                auxProducts.splice(index, 1, auxProduct);

            const productosSting = JSON.stringify(this.products)
            await fs.promises.writeFile(this.path, productosSting, null, 2); 

            return "Updated Product"
            }
        }

        catch(err){
            throw err
        }
    }
    
}

const item = 
{
    title: "potato",
    description: "poh tay toes",
    price: 350,
    thumbnail: "https://media.tenor.com/KDskB0xTY9IAAAAC/potatoes-lotr.gif",
    code: "a01",
    stock: 2000,
}

const item2 = {
    title: "fish",
    description: "it's a fish",
    price: 4000,
    thumbnail: "https://www.meme-arsenal.com/memes/e27cd6ec6c89cfdaec356d0e0672a666.jpg",
    code: "a02",
    stock: 24,
}

const item3 = {
    title: "eowyn's stew",
    description: "It's food.. but not a good one",
    price: 30,
    thumbnail: "https://preview.redd.it/huj0pn5eftaz.gif?format=png8&s=b6f4bc572aa539489ab8642dc4a81f2398eabd24",
    code: "a00",
    stock: 1,
}


async function productInteraction(){
    
const productManager = new ProductManager();


    await productManager.checkFile();

    console.log(await productManager.addProduct(item));
    console.log(await productManager.addProduct(item2));
    console.log(await productManager.addProduct(item3));
    console.log(await productManager.getProducts());

    console.log(await productManager.deleteProduct(2));  
    console.log(await productManager.getProducts());


    
    console.log(await productManager.updateProduct(3, {price: 400}));
    console.log(await productManager.getProductById(3));
}

productInteraction();