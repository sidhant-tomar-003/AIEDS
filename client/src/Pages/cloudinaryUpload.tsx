import React, { useContext, useEffect } from "react";
// import contextValue from "../context/User/userContext.js";

interface CloudinaryUploadWidgetProps {
  handleUploadSuccess: (url: string) => void;
  showAlert: (message: string, type: string) => void;
}

const CloudinaryUploadWidget : React.FC<CloudinaryUploadWidgetProps>  = (props) => {
  const { handleUploadSuccess, showAlert } = props
  const cloudName = "defrwqxv6";
  const uploadPreset = "dfr2meo6";

  // const context = useContext(contextValue);
  // const { changeimage, setUserData } = context;

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     return;
  //   }
  //   const myWidget = window.cloudinary.createUploadWidget(
  //     {
  //       cloudName: cloudName,
  //       uploadPreset: uploadPreset
  //     },
  //     (error, result) => {
  //       if (!error && result && result.event === "success") {
  //         handlePfpUpdate(result.info.secure_url);
  //       }
  //     }
  //   );

  //   const handleClick = () => {
  //     myWidget.open();
  //   };

    // const handlePfpUpdate = async (url) => {
    //   try {
    //     const updatedUser = await changeimage(url);

    //     if (!updatedUser.success) {
    //       showAlert(updatedUser.error, "danger");
    //     }
    //     else {
    //       setUserData((prevUserData) => ({
    //         ...prevUserData,
    //         image: url
    //       }));
    //       showAlert("profile picture updated", "success");
    //     }
    //   } catch (error) {
    //     console.error('Error updating name:', error);
    //   }
    // };

  //   const uploadButton = document.getElementById("upload_widget");
  //   if (uploadButton) {
  //     uploadButton.addEventListener("click", handleClick);
  //   }

  //   // Cleanup function
  //   return () => {
  //     if (uploadButton) {
  //       uploadButton.removeEventListener("click", handleClick);
  //     }
  //   };
  // }, [handleUploadSuccess, changeimage, setUserData]);

  return (
    <button id="upload_widget"
      type="button"
      className="rounded-md bg-cyan-600/40 px-2.5 py-1.5 text-sm font-semibold text-secondary-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      Change
    </button>

  );
};

export default CloudinaryUploadWidget;