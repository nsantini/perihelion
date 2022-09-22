import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  Text,
  Link,
  useDisclosure,
  useColorModeValue,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Textarea from "../atoms/textarea";
import Content from "../atoms/content";
import BlobUploader from "../molecules/blobUploader";
import Profiles from "../molecules/profiles";
import ProfileSelection from "../molecules/profileSelection";

const SendIcon = () => (
  <svg viewBox="0 0 16 16" focusable="false" class="chakra-icon css-onkibi">
    <path
      fill="currentColor"
      d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"
    ></path>
  </svg>
);

export default function MessageForm({ root, recps, newMesssage, isPrivate }) {
  const [postError, setPostError] = useState("");
  const [textValue, setTextValue] = useState("");
  const [selectedRecps, setSelectedRecps] = useState(recps||[])
  const [preview, setPreview] = useState(false);
  const [name, setName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!textValue) setPostError("Let's not post empty messages 😅");
    setPostError("");
    const response = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        root,
        text: textValue,
        recps: selectedRecps.length > 0 ? selectedRecps : null,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setPostError(data.error);
    } else {
      setTextValue("");
      onClose();
      newMesssage(data);
    }
  };

  const blobUloaded = (data) => {
    const inputvalue = textValue + data.link;
    setTextValue(inputvalue);
  };

  const filterProfiles = (content) => {
    const re = /^(@\w+)| (@\w+)/g;
    const matches = content.match(re);
    if (matches) {
      setName(matches[0].trim().substring(1));
    }
  };

  const insertMention = (profile) => {
    setTextValue(
      textValue.replace(name, `[${profile.name}](${profile.feedId})`)
    );
    setName("");
  };

  return (
    <>
      {!isOpen && (
        <Center>
          <Link
            color={useColorModeValue("frost.700", "frost.500")}
            mt="2"
            onClick={onOpen}
          >
            Post message
          </Link>
        </Center>
      )}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior={"inside"}
        size={"3xl"}
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Post message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!preview && (
              <form onSubmit={onSubmit}>
                <Textarea
                  ref={initialRef}
                  placeholder="Write your message here"
                  name="text"
                  value={textValue}
                  onChange={(e) => {
                    setTextValue(e.target.value);
                    filterProfiles(e.target.value);
                  }}
                />
                {name && (
                  <Profiles
                    name={name}
                    onSelect={insertMention}
                    setName={setName}
                  />
                )}
                {isPrivate && (
                  <ProfileSelection
                    addRecps={(profile) =>
                      setSelectedRecps([profile.feedId, ...selectedRecps])
                    }
                    setName={setName}
                  />
                )}

                {postError && (
                  <Text color="tomato" mt="2">
                    {postError}
                  </Text>
                )}
              </form>
            )}
            {preview && <Content text={textValue} />}
          </ModalBody>
          <ModalFooter>
            <Center>
              <Stack direction="row">
                <Center>
                  <IconButton
                    aria-label="Post message"
                    isDisabled={!textValue}
                    bgColor={"frost.500"}
                    color={"snow.500"}
                    mt={2}
                    onClick={onSubmit}
                    icon={<SendIcon />}
                  />
                </Center>
                <Center>
                  <BlobUploader blobUloaded={blobUloaded} />
                </Center>
                <Center>
                  <IconButton
                    aria-label={preview ? "Edit" : "Preview"}
                    isDisabled={!textValue}
                    bgColor={"frost.500"}
                    color={"snow.500"}
                    mt={2}
                    onClick={() => setPreview(!preview)}
                    icon={preview ? <ViewOffIcon /> : <ViewIcon />}
                  />
                </Center>
              </Stack>
            </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
