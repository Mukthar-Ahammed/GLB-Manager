import express from 'express'
import { uploadcontroller } from '../middleware/gridfs.js';
import { upload } from '../utils/storage.js';

const route=express.Router();

route.post('/Upload',upload.single('file'),uploadcontroller)




export default route;