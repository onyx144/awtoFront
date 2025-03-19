import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { request } from "@/request/request"; // Подключаем твой `request.ts`

const UploadImage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]); // Сохраняем выбранный файл
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Выберите файл для загрузки!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file); // 👈 Должно совпадать с именем в NestJS

    try {
      const response = await request("post", "/spares/image", formData);
      console.log("Файл загружен:", response.data);
      alert(`Файл загружен: ${response.data.filename}`);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      alert("Ошибка загрузки файла!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <input type="file" onChange={handleFileChange} />
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={loading}
        style={{ marginTop: "10px" }}
      >
        {loading ? <CircularProgress size={24} /> : "Загрузить"}
      </Button>
    </div>
  );
};

export default UploadImage;
