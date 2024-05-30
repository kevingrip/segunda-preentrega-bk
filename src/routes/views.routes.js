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
    const pageNum = req.query.page || 1;
    const limit = req.query.limit || 3;
    const category = req.query.query;
    const sort = req.query.sort;
    const productsData = await dbManager.getAllProductsDB(pageNum,limit,sort,category);


    res.render('realTimeProducts', {productsData: productsData});
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