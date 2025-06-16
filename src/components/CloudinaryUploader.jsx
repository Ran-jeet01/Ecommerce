import React, { useEffect, useRef } from "react";

const CloudinaryUploader = () => {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!window.cloudinary) {
      console.error("Cloudinary widget script not loaded!");
      return;
    }

    // Create and save the widget instance
    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: "dndrtcrhm",
        uploadPreset: "product", // your unsigned preset
      },
      (error, result) => {
        if (!error && result.event === "success") {
          console.log("Uploaded image URL:", result.info.secure_url);
        }
      }
    );
  }, []);

  const openWidget = () => {
    if (widgetRef.current) {
      widgetRef.current.open(); // <-- call open() on the saved widget instance
    } else {
      console.error("Upload widget not initialized yet.");
    }
  };

  return <button onClick={openWidget}>Upload Image</button>;
};

export default CloudinaryUploader;
