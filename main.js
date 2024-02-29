class ProductManager {
    static ultID = 0;

    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, img, code, stock) {
        if (!title || !description || !price || !code || !img || !stock) {
            console.log("Complete los campos, por favor");
            return;
        }

        if (this.products.some(item => item.code === code)) {
            console.log("El código es único, Maestroo!");
            return;
        }

        const newProduct = {
            id: ++ProductManager.ultID,
            title,
            description,
            price,
            img,
            code,
            stock,
        };

        this.products.push(newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(item => item.id === id);

        if (!product) {
            console.log("Producto no encontrado");
        } else {
            console.log("Producto encontrado", product);
        }
    }
}

const manager = new ProductManager();

console.log(manager.getProducts());

manager.addProduct("zapatillas", "producto prueba", 79000, "sin imagen", "AirMax1", 10);
manager.addProduct("zapatillas", "producto prueba", 79000, "sin imagen", "Airforce", 10);
manager.addProduct("zapatillas", "producto prueba", 79000, "sin imagen", "NewBalance", 10);
console.log(manager.getProducts());