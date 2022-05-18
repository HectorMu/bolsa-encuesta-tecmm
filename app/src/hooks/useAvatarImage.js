import { useState, useEffect, useCallback } from "react";
const useAvatarImage = (dependencies, name) => {
  const [isLoading, setIsLoading] = useState(false);
  const [avatarImage, setAvatarImage] = useState("");

  const baseURL = "https://ui-avatars.com/api/?name=";

  const getImageHandler = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(`${baseURL}${name}`, {
      mode: "no-cors",
      method: "GET",
    });
    const blobImage = await response.blob();

    setAvatarImage(window.URL.createObjectURL(blobImage));

    setIsLoading(false);
  }, dependencies);

  useEffect(() => {
    getImageHandler();
  }, [getImageHandler]);

  return {
    isLoading,
    avatarImage,
  };
};

export default useAvatarImage;
