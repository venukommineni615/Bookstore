const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if(this.id){
        const existingIndex = products.findIndex(prod => prod.id === this.id)
        let updatedProducts=[...products];
        updatedProducts[existingIndex]=this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      }else{
        this.id=Math.random().toString()
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static fetchProduct(id,cb){
    getProductsFromFile((products) => {
        const product=products.find((p)=>{
          return p.id===id
        })
        cb(product)
    });
  }
  static removeProduct(id,cb){
    getProductsFromFile((products) => {
      let updatedProducts=products.filter((p)=>{
        return p.id!==id
      })
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if(err){
          console.log(err)
        }else{
          cb()
        }
      })
    });
  }
};
