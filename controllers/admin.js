const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
    // formsCSS: true,
    // productCSS: true,
    // activeAddProduct: true
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  const productId=req.params.productId;
  if(!editMode){
    res.redirect('/')
  }
  Product.fetchProduct(productId,(product)=>{

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing:editMode,
      product:product
    });
  })
};

exports.postAddProduct = (req, res, next) => {
  const id=null
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(id, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.postEditProduct = (req, res, next) => {
   const id=req.body.productId
   const title = req.body.title;
   const imageUrl = req.body.imageUrl;
   const price = req.body.price;
   const description = req.body.description;
   const product = new Product(id, title, imageUrl, description, price);
  product.save();
  res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
  const id=req.params.productId
  Product.removeProduct(id,()=>{
    res.redirect('/admin/products')
  });

}