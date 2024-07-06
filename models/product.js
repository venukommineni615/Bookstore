const Sequelize=require('sequelize');
const sequelize=require('../util/database')
const Product=sequelize.define('products',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true
  },
  title:{
    type:Sequelize.STRING,
    allowNull:false
  },
  imageUrl:{
    type:Sequelize.STRING(10000),
    allowNull:false
  },
  description:{
    type:Sequelize.STRING,
    allowNull:false
  },
  price:{
    type:Sequelize.DOUBLE,
    allowNull:false
  }
})

module.exports=Product;