import productModel from "./models/product.model.js";

class ProductCollectionManager {
    constructor() {
    }

    getAllProductsDB = async (pageNum, limit, sort) => {
        try {
            const options = {
                page: pageNum || 1,
                limit: limit || 10,
                sort: { price: sort },
                lean: true // Convierte los documentos en objetos JavaScript simples
            };
            const products = await productModel.paginate({}, options)
            console.log(products)
            return products
        } catch (err) {
            return err.message;
        };
    };

    // getAllProductsDB = async () => {
    //     try {
    //         const products = await productModel.find().lean()
    //         return products
    //     } catch (err) {
    //         return err.message;
    //     };
    // };


    addProductDB = async (title,description,price,thumbnail,code,stock) => {
        try {

            const product = {
                title,description,price,thumbnail,code,stock
            }
    
            if (title && description && price && thumbnail && code && stock){
    
                product.status = true;

                const codes = await productModel.find({}, 'code');

                const productCodes = codes.map(prod =>prod.code);
    
                if (!productCodes.includes(code)){
                    if (codes.length === 0){
                        product.id=1;
                    }else{
                        let mayorProdId=1;
                        codes.forEach(product=>{
                            
                            if (product.id>mayorProdId){
                                mayorProdId=product.id;
                            }                        
                        })
                        product.id=mayorProdId+1;                    
                    }
                    
                    await productModel.create(product);
                    console.log("Producto agregado",code)
                }
                else{
                    console.log("El codigo ya esta agregado",code)
                }
            }     

            
        } catch (err) {
            return err.message;
        };
    };

    getProductByIdDB = async (id) => {
        try {
            return await productModel.findById(id);
        } catch (err) {
            return ('Producto no encontrado: ', err.message);
        };
    };

    updateProductDB = async (upd) => {
        try {                        
            const updatedProduct = await productModel.findByIdAndUpdate(upd.idMdb, upd, { new: true }).lean();

            if (!updatedProduct) {
                return console.log("Producto no encontrado");
            } else{
                return updatedProduct
            }
            
        } catch (err) {
            return err.message;
        };
    };

    deleteProductDB = async (idDelete) => {
        try {
            console.log("Producto eliminado id:",idDelete)
            return await productModel.findByIdAndDelete(idDelete)
        } catch (err) {
            return err.message;
        };
    };
}

export default ProductCollectionManager;