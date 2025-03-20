import express from "express";
import multer from "multer";
import { imageToText } from "../controllers/iaController";

const router = express.Router();

// Configuración de `multer` para guardar archivos en `uploads/`
const upload = multer({ dest: "uploads/" });

// Ruta para procesar imágenes
router.post("/image-to-text", upload.single("image"), imageToText);

export default router;
