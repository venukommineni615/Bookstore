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
  
  Product.findByPk(productId)
    .then((product)=>{
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing:editMode,
        product:product
      });
    })
    .catch(err => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create(
    {
      title:title,
      imageUrl:imageUrl,
      description:description,
      price:price

    }
  )
  .then(()=>{
    res.redirect('/')
  })
  .catch(err=>{console.log(err)})
};

exports.getProducts = (req, res, next) => {

  Product.findAll().then((products) => {
    console.log(products)
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
  
  Product.findByPk(id).then((product) => {
    product.description=description
    product.price=price
    product.imageUrl=imageUrl
    product.title=title
    return product.save()
  })
  .then(()=>{
    res.redirect('/admin/products')
  })
  .catch((err)=>console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
  const id=req.params.productId
  
  Product.findByPk(Number(id))
  .then((product)=>{
    return product.destroy()
  })
  .then(()=>{
    res.redirect('/admin/products')
  })
  .catch((err)=>console.log(err))

}