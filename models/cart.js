const fs = require("fs");

const rootDir = require("../util/path");
const path = require("path");
const filePath=path.join(rootDir,'data','cart.json');
module.exports= class Cart{
    
    static addItem(id,price){
        fs.readFile(filePath, 'utf8', function(err,data){
            let cart= {products:[],totalPrice:0}
            if(err){
              console.log(err)
            }else if(data.length===0){
                cart.products.push({id:id,quantity:1})
                cart.totalPrice +=parseInt(price)
            }
            else{
                cart=JSON.parse(data);
                const existingIndex=cart.products.findIndex(product=>product.id==id);
                if(existingIndex){
                    cart.products[existingIndex].quantity++
                   
                }else{
                    cart.products.push({id:id,quantity:1})
                }
                cart.totalPrice +=parseInt(price)
               
            }
            fs.writeFile(filePath,JSON.stringify(cart),function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Data Saved");
                }
            });
        });
    }
   
}