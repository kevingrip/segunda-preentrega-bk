import { Router } from "express";
import ProductManager from "../dao/productManager.js";
import ProductCollectionManager from "../dao/ProductManagerMdb.js";
import productModel from "../dao/models/product.model.js";

const viewsRouter = Router();

const productJson = './src/product.json'
const manager = new ProductManager(productJson);
const dbManager = new ProductCollectionManager()

viewsRouter.get('/bienvenida', (req,res)=>{
    const user = {name: 'Prueba'};
    res.render('index', user)
})


viewsRouter.get('/realtimeproducts',async (req,res)=>{
    const products = await dbManager.getAllProductsDB()
    const productConIdStrings = products.map(item => {
        return {
            ...item,
            _id: item._id.toString()
        };
    });
    res.render('realTimeProducts', {productConIdStrings})
})

viewsRouter.post('/realtimeproducts',async (req,res)=>{
    const products = await dbManager.getAllProductsDB()
    const productConIdStrings = products.map(item => {
        return {
            ...item,
            _id: item._id.toString()
        };
    });
    res.render('realTimeProducts', {productConIdStrings})
})

viewsRouter.get('/home',async (req,res)=>{
    const products = await dbManager.getAllProductsDB()
    const productConIdStrings = products.map(item => {
        return {
            ...item,
            _id: item._id.toString()
        };
    });

    console.log(productConIdStrings);
    res.render('home', {productConIdStrings})
})

viewsRouter.get('/chat',(req,res)=>{
    res.render('chat',{})
});



export default viewsRouter;