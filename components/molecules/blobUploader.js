import { IconButton, useColorModeValue } from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";

export default function BlobUploader({ blobUloaded }) {
  async function onSubmit(file) {
    const body = new FormData();

    body.append("file", file);

    const response = await fetch("/api/blob/upload", {
      method: "POST",
      body,
    });
    const data = await response.json();
    blobUloaded(data);
  }
  let hiddenInput = null;

  return (
    <>
      <input
        hidden
        type="file"
        ref={(el) => (hiddenInput = el)}
        onChange={(e) => onSubmit(e.target.files[0])}
      />
      <IconButton
        bgColor={useColorModeValue("frost.300", "frost.100")}
        mt={2}
        onClick={() => hiddenInput.click()}
        icon={<AttachmentIcon />}
      />
    </>
  );
}
