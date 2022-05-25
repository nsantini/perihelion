import { Img } from "@chakra-ui/react";
import useBlob from "../../hooks/blob";
export default function Media(props) {
  const { blob, isLoading, isError } = useBlob(props.src);
  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading {props.src}</div>;
  const mime = props.alt.substring(0, props.alt.indexOf(":"));
  switch (mime) {
    case "video":
      return (
        <video
          controls
          src={`data:video/mp4;base64,${Buffer.from(blob.blob || "")}`}
        />
      );
    case "audio":
      return (
        <audio
          controls
          src={`data:audio/mpeg;base64,${Buffer.from(blob.blob || "")}`}
        />
      );
    case "image":
    default:
      return (
        <Img
          {...props}
          src={`data:image/png;base64,${Buffer.from(blob.blob || "")}`}
        />
      );
  }
}
