import { useState } from "react";
const useChangeImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const maxSize = 2 * 1024 * 1024;
  const handleChangeImage = (e: any) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxSize) {
        alert("File size is too large");
        setSelectedImage(null);
        return;
      }
      const render = new FileReader();
      render.onload = () => {
        setSelectedImage(render.result);
      };
      render.readAsDataURL(file);
    } else {
      alert("File is not an image");
      setSelectedImage(null);
    }
  };
  return {
    selectedImage,
    handleChangeImage,
    setSelectedImage,
  };
};

export default useChangeImage;
