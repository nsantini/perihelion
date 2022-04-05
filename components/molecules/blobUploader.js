import React, { useRef } from "react";

export default function BlobUploader({ blobUloaded }) {
  const fileInputRef = useRef();

  async function onSubmit(event) {
    event.preventDefault();

    const files = fileInputRef.current.files;
    const body = new FormData();

    for (let index = 0; index <= files.length; index++) {
      const element = files[index];
      body.append("file", element);
    }

    const response = await fetch("/api/blob/upload", {
      method: "POST",
      body,
    });
    const data = await response.json();
    blobUloaded(data);
  }

  return (
    <form onSubmit={onSubmit}>
      <input ref={fileInputRef} type="file" multiple />
      <button type="submit">Upload</button>
    </form>
  );
}
