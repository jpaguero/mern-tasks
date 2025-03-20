import { useState } from "react";
import axios from "axios";
import "./image-to-text.scss"; // Estilos para la página

const ImageToText = () => {
  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Manejar la selección de archivo
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setText(null); // Reiniciar el resultado
      setError(null);
    }
  };

  // Enviar la imagen a la API
  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.post("http://localhost:5174/ia/image-to-text", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setText(data.text.generated_text); // Guardar el texto generado
    } catch (err) {
      setError("Failed to process image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-to-text-container">
      <h2>Image to Text</h2>

      <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
      {image && <p>Selected: {image.name}</p>}

      <button onClick={handleUpload} disabled={loading} className="upload-btn">
        {loading ? "Processing..." : "Convert Image"}
      </button>

      {text && <div className="result"><strong>Extracted Text:</strong> {text}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ImageToText;
