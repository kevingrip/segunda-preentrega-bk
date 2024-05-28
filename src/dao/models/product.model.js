import mongoose from 'mongoose';

mongoose.pluralize(null);

const collection = 'product'; 

const schema = new mongoose.Schema({

    title: { type: String, required: true },

    description: { type: String, required: false },

    price: { type: Number, required: true },

    thumbnail: { type: String, required: false },

    code: {type: String, required: true},

    stock: {type: Number, required: true},

    status: {type: Boolean, required: true},

    id: {type: Number, required: true}

},{ versionKey: false });

const productModel = mongoose.model(collection, schema); 

export default productModel;