var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CategorySchema = new Schema ({
    name: {
        type:String,
        required: true,
        maxlength: 50,
        minlength: 1
    }
});
CategorySchema.virtual('url').get( () => {
    return '/category/' + this._id;
});

//export model
module.exports = mongoose.model('Category', CategorySchema);
