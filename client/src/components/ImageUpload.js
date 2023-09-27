"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setImages((prevData) => [...prevData, file]);
      try {
        const response = await axios.post(
          "http://localhost:5000/images",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Image uploaded:", response.data);
        // Handle the response here, which may contain the URL of the uploaded image
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="image-upload-container">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag &amp; drop an image here, or click to select one</p>
      </div>
    </div>
  );
};

export default ImageUpload;
