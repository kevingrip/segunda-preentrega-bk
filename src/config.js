import * as url from 'url';

const config = {
    PORT: 8080,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/img`},
    mongoDB_Local: 'mongodb://127.0.0.1:27017/practica',
    mongoDB_Atlas: 'mongodb+srv://backendCoder:coder2024@proyectocoder.hnxdqo9.mongodb.net/ecommerce'
};

export default config;