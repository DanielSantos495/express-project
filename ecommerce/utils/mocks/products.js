const productMock = [
   {
      name: "Red shoes",
      price: 75,
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0e44599932dce6b8440e26fb91e10a69&auto=format&fit=crop&w=800&q=60",
      tags: ["expensive", "brown"]
   },
   {
      name: "Black bike",
      price: 300,
      image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=53d820e6622fadd53b8638d60f468ccd&auto=format&fit=crop&w=800&q=60",
      tags: ["white", "cheap"]
   }
];

function filteredProductsMock(tag) {
   return productMock.filter(product => product.tags.includes(tag));
}

class ProductServiceMock {
   async getProducts() {
      return Promise.resolve(productMock);
   }

   async createProduct() {
      return Promise.resolve('5ffb7f606707b5ab8d74d5fb');
   }
}

module.exports = {
   productMock,
   filteredProductsMock,
   ProductServiceMock
};