import express from 'express'
import { uploadcontroller } from '../middleware/gridfs.js';
import { upload } from '../utils/storage.js';

const route=express.Router();

route.post('/upload', upload.single('file'), uploadcontroller)




export default route;
