var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    category: {
        type: Array,
        ref: "Category",
        required:true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type:Number,
        required: true
    },
    thumbnail: {
        type:String,
        required: true
    }
});
// index all in schema
ProductSchema.index({ "$**" : 'text'});
//virtual for product's URL
ProductSchema.virtual('url').get( ()=> {
    return '/product/' + this._id;
});

//export model
module.exports = mongoose.model("Product", ProductSchema);