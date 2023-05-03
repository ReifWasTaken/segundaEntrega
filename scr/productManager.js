import fs from "fs"

 class ProductManager {
    constructor(path){
        this.path = "./scr/products.json";
    }

    async getProducts(){
        try{
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, "utf-8")
                return JSON.parse(data);
            }

            await fs.promises.writeFile(this.path, JSON.stringify([]), null, 2);
            return [];
        }
        catch(err){
            throw new err ("get product failed");
        }

    }

    async addProduct(product){
        try{ 
            let data = await this.getProducts();

        //verifica si el codigo existe
        const serchCode = data.some((prod) => prod.code === product.code)
           
            if(serchCode){
                console.log("Code allredy exist");
            }
            
            if( !product.title ||
                !product.description ||
                !product.price ||
                !product.thumbnail ||
                !product.code ||
                !product.stock)
                {
                    console.log("some data is missing");
                } 
          

                let id = data.length > 0 ? data[data.length -1].id +1 : 1;
                product = {id, ...product};
                data.push(product);
                const productosSting = JSON.stringify(data , null, 2)
                await fs.promises.writeFile(this.path, productosSting);


                return product, "product added"
            }
        catch(err){
            throw new err ("addProduct failed");
        }    
    }
    

    async getProductById(id){
        try{
            let data = await this.getProducts();

            let prodFound = data.find((prod)=> prod.id === id);

                if(!prodFound){
                    throw new error ("ID not found");
                }

            return prodFound;     
        }catch(err){
            throw new err ("getProductById failed");
        }

    }

    async deleteProduct(id) {
        try{
            let auxProducts = await this.getProducts();
            const index = auxProducts.findIndex((product)=> product.id === id);

            if(index === -1){
                console.log("ID not found")
            }else{
            auxProducts.splice(index, 1);

            const productosSting = JSON.stringify(auxProducts, null, 2)
            await fs.promises.writeFile(this.path, productosSting); 

            return "product Deleted"
            }
        }

        catch(err){
            throw new err ("deleteProduct Failed");
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

            const productosSting = JSON.stringify(auxProducts, null, 2)
            await fs.promises.writeFile(this.path, productosSting); 

            return "Updated Product"
            }
        }

        catch(err){
            throw new err ("updateProduct failed");
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
const productManager = new ProductManager();

/* async function productInteraction(){
    
    console.log(await productManager.addProduct(item));
    console.log(await productManager.addProduct(item2));
    console.log(await productManager.addProduct(item3));

    console.log(await productManager.getProducts());

    // console.log(await productManager.deleteProduct(2));  
    console.log(await productManager.getProducts());

    console.log(await productManager.getProductById(3));  
    
    console.log(await productManager.updateProduct(1, {price: 400}));
    
}
productInteraction();  */


export default ProductManager;
