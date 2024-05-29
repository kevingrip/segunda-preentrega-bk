import cartModel from "../dao/models/cart.model.js";
import mongoose from "mongoose";
import productModel from "./models/product.model.js";

class CartCollectionManager {
    constructor() {
    }

    getAllCart = async (limit) => {
        try {
            return await cartModel.find().populate({path:'list.idProduct',model: productModel})
        } catch (err) {
            return err.message;
        };
    };

    addEmptyCart = async () => {
        try {
            const newCart = await cartModel.create({ cartId: new mongoose.Types.ObjectId(), list: [] });
            console.log("Carrito agregado:", newCart.cartId);
            return newCart;
        } catch (err) {
            return err.message;
        };
    };

    addProductCart = async (id, productId) => {
        try {
            const cartProduct = await cartModel.findOne({ cartId: id });
            if (!cartProduct) {
                return 'Carrito no encontrado'
            }
    
            const prod = await productModel.findById(productId);
            if (!prod) {
                return 'Producto no encontrado'
            }
    
            const prodList = cartProduct.list;
            const prodFilter = prodList.filter(item => item.idProduct === productId);
    
            if (prodFilter.length > 0) {
                prodList.forEach(item => {
                    if (item.idProduct === productId) {
                        item.quantity += 1;
                    }
                });
            } else {
                prodList.push({ idProduct: productId, quantity: 1 });
            }
    
            await cartModel.findOneAndUpdate({ cartId: id }, cartProduct);
            return cartProduct;
        } catch (err) {
            return err.message;
        }
    };
    
    

    getCartById = async (id) => {
        try {
            console.log(await cartModel.findOne({ cartId: id }));
            return await cartModel.findOne({ cartId: id }).populate({path:'list.idProduct',model: productModel});
        } catch (err) {
            return err.message;
        };
    };

    update = async (id, updProd) => {
        try {
        } catch (err) {
            return err.message;
        };
    };

    deleteCartById = async (idDelete) => {
        try {
            await cartModel.deleteOne({cartId:idDelete});
            return (`Carrido eliminado id: `,idDelete)
        } catch (err) {
            return err.message;
        };
    };

    deleteAllCart = async (cart) => {
        try {
            await cartModel.findOneAndUpdate(
                { cartId: cart },
                { list: [] } 
              );
        } catch (err) {
            return err.message;
        };
    };

    deleteProdByCart = async (cart,product) =>{
        try{
            await cartModel.updateOne(
                { cartId: cart },
                { $pull: { list: { idProduct: product } } }
              );
        } catch (err) {
            return err.message;
        }
    }



}    

export default CartCollectionManager;