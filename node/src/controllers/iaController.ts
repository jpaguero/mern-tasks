import axios from "axios";
import { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

const hf = new HfInference(process.env.HF_API_KEY || "");

// Configurar `multer` para manejar la subida de imágenes
const upload = multer({ dest: "uploads/" });

export const imageToText = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No image uploaded" });
      return;
    }

    // Leer la imagen desde el sistema de archivos
    const imageBuffer = fs.readFileSync(req.file.path);

    // Enviar la imagen a Hugging Face
    const textResult = await hf.imageToText({
      data: imageBuffer,
      model: "Salesforce/blip-image-captioning-base",
    });

    // Eliminar la imagen después de procesarla para no llenar el servidor de archivos temporales
    fs.unlinkSync(req.file.path);

    res.json({ text: textResult || "No text generated" });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Failed to process image" });
  }
};

// Middleware para manejar la subida de archivos con `multer`
export const uploadMiddleware = upload.single("image");
