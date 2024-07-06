const db=require('../util/database');
module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    const sql = 'INSERT INTO products (id, title, imageUrl, description, price) VALUES (?, ?, ?, ?, ?)';
    return db.execute(sql, [this.id, this.title, this.imageUrl, this.description, this.price])
  
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }
  static fetchProduct(id){
    return db.execute('SELECT * FROM products WHERE id = ?',[id]);
    
  }
  static removeProduct(id){
    return db.execute('DELETE FROM products WHERE id = ?',[id]);
   
   
  }
};
