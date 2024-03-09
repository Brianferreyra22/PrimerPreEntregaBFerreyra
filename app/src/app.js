const fs = require("fs");
const http = require("http");
const express = require("express");

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

        if (product) {
            console.log("Producto encontrado", product);
        } else {
            console.log("Producto no encontrado");
        }
    }

    async saveProductsToFile(filePath) {
        try {
            await fs.promises.writeFile(filePath, JSON.stringify(this.products, null, 2));
            console.log("Productos guardados en el archivo:", filePath);
        } catch (error) {
            console.error("Error al guardar productos:", error);
        }
    }

    async loadProductsFromFile(filePath) {
        try {
            const data = await fs.promises.readFile(filePath, "utf-8");
            const loadedProducts = JSON.parse(data);
            this.products = loadedProducts;
            console.log("Productos cargados desde el archivo:", filePath);
        } catch (error) {
            console.error("Error al cargar productos desde el archivo:", error);
        }
    }
}

const manager = new ProductManager();


manager.saveProductsToFile("./productos.json");

manager.loadProductsFromFile("./productos.json");

console.log(manager.getProducts());

const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.send("Bienvenido a Dnordicos!");
});

app.get("/products", (req, res) => {
    res.json(manager.getProducts());
});


server.listen(port, () => {
    console.log(`escuchando en el server at http://localhost:${port}/`);
});
