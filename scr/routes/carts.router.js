import express from "express";
import ProductManager from "../productManager.js";
const cartsRouter = express.Router();
const productInteractions = new ProductManager();

export {cartsRouter};