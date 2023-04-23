const fs = require("fs");

class ProductManager {
    constructor(path){
        this.path = "products.json";
        this.products = [];
        const productsString = fs.readFileSync(this.path, "utf-8");
        const products = JSON.parse(productsString);
        this.products = products;
        this.id = 0;
    }
    addProduct(product){
        let verifyCode = this.products.find((prod) => prod.code === product.code);

        if(verifyCode){
            
            return "code allready exist"
        }

        if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code ||!product.stock){
            return "some data is missing"
         }

    
    product.id = this.id;
    this.products.push(product);
    const productsString = JSON.stringify(this.products, null, 2);
    fs.writeFileSync("products.json", productsString);
    this.id++;
    return "product added"

    }
    
    async getProducts(){
        try{
            let prodFound = await fs.promises.readFile(this.path, "utf-8");
            console.log(prodFound);

            return JSON.parse(prodFound);
        }
        catch(err){
            console.log("hubo un error")
        }
        
    }

    async getProductById(id){

        let prodFound = await fs.promises.readFile(this.path, "utf-8");

        const existProducts = JSON.parse(prodFound);

        console.log(existProducts.find(idProduct=> idProduct.id === id))

        return existProducts.find(idProduct=> idProduct.id === id);
    }

    async updateProduct(id, updateVaule) {
        try{
            const products = await this.getProducts();
            const index = products.findIndex((product)=> product.id === id);

            if(index === -1){
                throw new error ("ID no encontrado");
            }

            const auxProduct = { ...products[index], ...updateVaule};
            products.splice(index, 1, auxProduct);

            fs.writeFileSync(this.path, JSON.stringify(products, null, 2))
        }

        catch(err){
            throw err;
        }
    }

    async deleteProduct(id) {
        try{
            const products = await this.getProducts();
            const index = products.findIndex((product)=> product.id === id);

            if(index === -1){
                throw new error ("ID no encontrado");
            }

            products.splice(index, 1, );

            fs.writeFileSync(this.path, JSON.stringify(products, null, 2))
        }

        catch(err){
            throw err;
        }
    }
}




const productsToBeAdded1 = 
    {title: "potato",
    description: "poh tay toes",
    price: 200,
    thumbnail: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aae9467f-54f0-41b2-8ea4-413412b09006/d8yrl46-adf4c917-ceb9-48ef-bee7-d9a0fe84ed2a.png/v1/fill/w_1600,h_1200/potatoes_by_sarahmillercreations_d8yrl46-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTIwMCIsInBhdGgiOiJcL2ZcL2FhZTk0NjdmLTU0ZjAtNDFiMi04ZWE0LTQxMzQxMmIwOTAwNlwvZDh5cmw0Ni1hZGY0YzkxNy1jZWI5LTQ4ZWYtYmVlNy1kOWEwZmU4NGVkMmEucG5nIiwid2lkdGgiOiI8PTE2MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.DaEk2Xd94OqbQ4Eg10dLIYMPRsxGG1ZR7MGxsSuiN_E",
    code: "a01",
    stock: 200}

const productsToBeAdded2 = 
   { title: "fish",
    description: "it's a fish",
    price: 200,
    thumbnail: "https://www.meme-arsenal.com/memes/e27cd6ec6c89cfdaec356d0e0672a666.jpg",
    code: "a02",
    stock: 200}



const productManager = new ProductManager();

/*console.log(productManager.addProduct(productsToBeAdded1));
console.log(productManager.addProduct(productsToBeAdded2));

console.log(productManager.getProductById(0));*/
//console.log(productManager.getProducts());
console.log(productManager.updateProduct(1, {price: 400}));
console.log(productManager.deleteProduct(1));
