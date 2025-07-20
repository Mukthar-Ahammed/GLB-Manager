import express from 'express'
import { viewController,streamGLBById } from '../middleware/gridfs.js';


const route=express.Router();

route.get('/View', viewController);          
route.get('/view/:id', streamGLBById);        

export default route;