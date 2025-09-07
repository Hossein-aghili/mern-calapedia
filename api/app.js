import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./Routes/auth.route.js";
import addressRouter from "./Routes/address.route.js";
import cartRouter from "./Routes/cart.route.js";
import categoryRouter from "./Routes/category.route.js";
import commentRouter from "./Routes/comment.route.js";
import discountRouter from "./Routes/discount.route.js";
import orderRouter from "./Routes/order.route.js";
import productRouter from "./Routes/product.route.js";
import productVariantRouter from "./Routes/productVariant.route.js";
import sliderRouter from "./Routes/slider.route.js";
import userRouter from "./Routes/user.route.js";
import variantRouter from "./Routes/variant.route.js";
import { isLogin } from './Middlewares/isLogin.js';
import brandRouter from "./Routes/brand.route.js";
const __filename =fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(express.static("Public"))
app.use('/api/auth',authRouter)
app.use('/api/address',isLogin,addressRouter)
app.use('/api/cart',cartRouter)
app.use('/api/categories',categoryRouter)
app.use('/api/comment',commentRouter)
app.use('/api/discount',discountRouter)
app.use('/api/order',orderRouter)
app.use('/api/product',productRouter)
app.use('/api/productVariant',productVariantRouter)
app.use('/api/slider',sliderRouter)
app.use('/api/user',userRouter)
app.use('/api/variant',variantRouter)
app.use('/api/brand',brandRouter)

export default app