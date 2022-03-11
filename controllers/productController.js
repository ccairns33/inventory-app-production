const Product = require('../models/product.js');

// /products/ 
// GET products
exports.listProducts = async(req,res)=>{
    let { limit = 10, page = 1, category, q} = req.query;
    const limitRecords = parseInt(limit);
    const skip = (page-1) * limit;
    let query = {};
    if (q){
        query = {$text : {$search: q}};
    }
    if(category) {
        query.category = category;
    }
    
    try {
        // The models of Mongoose are classes and the properties are not "own properties" of the parent object.
        // The cleanest method is to make sure the the handlebars-input is a proper plain javascript object. This can be done in Mongoose, by calling toJSON() or toObject
        const products = await Product.find(query).limit(limitRecords).skip(skip);
        res.render("../views/products",{page:page,limit: limitRecords, title: "All Products | La Halle De Gourmets", products: products.map(products => products.toJSON())});
    }catch (error){
        res.status(400).json({message:error});
        console.log(error);
    }
}
// /products/coffee 
// GET coffee products
exports.listCoffeeProducts = async(req,res)=>{
    let { limit = 10, page = 1} = req.query;
    const limitRecords = parseInt(limit);
    const skip = (page-1) * limit;
    
    try {
        // The models of Mongoose are classes and the properties are not "own properties" of the parent object.
        // The cleanest method is to make sure the the handlebars-input is a proper plain javascript object. This can be done in Mongoose, by calling toJSON() or toObject
        const products = await Product.find({category: "Coffee"}).limit(limitRecords).skip(skip);
        res.render("../views/products",{page:page,limit: limitRecords, title: "Coffee | La Halle De Gourmets", products: products.map(products => products.toJSON())});
    }catch (error){
        res.status(400).json({message:error});
        console.log(error);
    }
}
// /products/pastries 
// GET pastry products
exports.listPastryProducts = async(req,res)=>{
    let { limit = 10, page = 1} = req.query;
    const limitRecords = parseInt(limit);
    const skip = (page-1) * limit;
    
    try {
        // The models of Mongoose are classes and the properties are not "own properties" of the parent object.
        // The cleanest method is to make sure the the handlebars-input is a proper plain javascript object. This can be done in Mongoose, by calling toJSON() or toObject
        const products = await Product.find({category: "Pastry"}).limit(limitRecords).skip(skip);
        res.render("../views/products",{page:page,limit: limitRecords, title: "Pastries | La Halle De Gourmets", products: products.map(products => products.toJSON())});
    }catch (error){
        res.status(400).json({message:error});
        console.log(error);
    }
}
// /products/add
// GET add product page
exports.displayInsertSingleProduct = async(req,res)=>{
    res.render( "../views/addProductForm", {title: "Add Product | La Halle des Gourmets"})
}
// /products/add
// POST send new product through request
exports.insertSingleProduct = async(req,res)=>{
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
        thumbnail: req.body.thumbnail
    });
    try{
        await newProduct.save();
        res.json(newProduct);
    } catch (error) {
        res.status(400).json({message:error});
    }
}
// /products/:id
// get single product item
exports.displaySingleProduct = async(req,res)=>{
    let paramID = req.params.id;
    try {
        const product = await Product.findOne({_id: paramID}).lean();
        res.render("../views/singleProduct", { category: product.category, name: product.name, description: product.description, price: product.price, quantity: product.quantity,thumbnail: product.thumbnail, title: `${product.name} | La Halle des Gourmets`});
    } catch (error){
        res.render("../views/error", {message : "Product not found.", title: "404 Error"});
        res.status(400);
    }

}

// /products/:id
// PATCH single movie
exports.updateSingleProduct = async(req,res)=>{
    let paramID = req.params.id;
    let name = req.body.name;

    try{
        const updateProduct = await Product.updateOne({_id:paramID}, {name:name});
        res.json(updateProduct);
    }catch(error){
        res.status(400).json({message:error});
    }
}
// /products/:id
// DELETE single movie
exports.deleteSingleProduct = async(req,res)=>{
    let paramID = req.params.id;
    let name = req.body.name;

    try{
        const productData = await Product.deleteOne({_id:paramID});
        res.json(productData);
    }catch(error){
        res.status(400).json({message:error});
    }
}

