import { promises as fs } from 'fs';

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async addProduct(product) {
    const products = await this.getProductsFromFile();
    product.id = this.generateUniqueId(products);
    products.push(product);
    await this.saveProductsToFile(products);
    return product;
  }

  async getProducts(limit) {
    try {
      const content = await fs.readFile(this.path, 'utf-8');
      const products = JSON.parse(content) || [];
  
      if (limit !== undefined) {
        return products.slice(0, limit);
      }
  
      return products;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getProductById(productId) {
    const products = await this.getProductsFromFile();
    return products.find(product => product.id === productId);
  }

  // async updateProduct(productId, updatedFields) {
  //   let products = await this.getProductsFromFile();
  //   const index = products.findIndex(product => product.id === productId);

  //   if (index !== -1) {
  //     products[index] = { ...products[index], ...updatedFields };
  //     await this.saveProductsToFile(products);
  //     return products[index];
  //   } else {
  //     throw new Error('Product not found');
  //   }
  // }

  async getProductsFromFile() {
    try {
      const data = await fs.readFile(this.path, 'utf8');
      return JSON.parse(data) || [];
    } catch (error) {
      return [];
    }
  }

  async saveProductsToFile(products) {
    await fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf8');
  }

  generateUniqueId(products) {
    return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 1;
  }
}


const productManager = new ProductManager('products.json');

(async () => {
  await productManager.addProduct({
    title: 'Producto 1',
    code: '1234',
    description: 'remera roja',
    price: '150',
    id: "1",
    category: 'clothing',
    thumbnail: 'path/to/image1.jpg',
    stock: "100",
  });

  

  await productManager.addProduct({
    title: 'Producto 2',
    code: '12345',
    description: 'pantalon negro',
    price: '170',
    id: "2",
    category: 'clothing',
    thumbnail: 'path/to/image1.jpg',
    stock: "50"
  });



  
  const products = await productManager.getProducts();
  console.log('Todos los productos:', products);

  const productById = await productManager.getProductById(1);


  // await productManager.updateProduct(1, { price: 24.99, stock: 90 });
  // console.log('Producto actualizado:', await productManager.getProductById(1));

  const remainingProducts = await productManager.getProducts();
  console.log('Productos restantes:', remainingProducts);
})();

export default ProductManager;