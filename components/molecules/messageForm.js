import { useState } from "react";
import {
  Center,
  Text,
  Link,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import Button from "../atoms/button";
import Textarea from "../atoms/textarea";
import BlobUploader from "./blobUploader";

export default function MessageForm({ root }) {
  const [postError, setPostError] = useState("");
  const [textValue, setTextValue] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      root,
      text: textValue,
    };
    setPostError("");
    const response = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const rData = await response.json();

    if (!response.ok) {
      setPostError(rData.error);
    } else {
      reset();
      root && onClose();
    }
  };

  let blobUloaded = (data) => {
    const inputvalue = textValue + ` [${data.blobName}](${data.blobId})`;
    setTextValue(inputvalue);
  };

  return (
    <>
      {(isOpen || !root) && (
        <>
          <form onSubmit={onSubmit}>
            <Textarea
              placeholder="Write your message here"
              name="text"
              value={textValue}
              onChange={(e) => {
                setTextValue(e.target.value);
              }}
            />

            {postError && (
              <Text color="tomato" mt="2">
                {postError}
              </Text>
            )}

            <Center>
              <Button>Post message</Button>
            </Center>
          </form>

          <BlobUploader blobUloaded={blobUloaded} />
        </>
      )}
      {!isOpen && root && (
        <Center>
          <Link
            color={useColorModeValue("frost.700", "frost.500")}
            mt="2"
            onClick={isOpen ? onClose : onOpen}
          >
            Reply to thread
          </Link>
        </Center>
      )}
    </>
  );
}
