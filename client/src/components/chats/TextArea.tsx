import { RefObject } from "react";

interface TextAreaProps {
  textRef: RefObject<HTMLTextAreaElement>;
}

const TextArea = ({ textRef }: TextAreaProps) => {
  return (
    <textarea
      ref={textRef}
      placeholder="Type a message."
      className="h-28 py-2 px-3 w-full rounded-md border-0 outline-none resize-none"
    />
  );
};

export default TextArea;
