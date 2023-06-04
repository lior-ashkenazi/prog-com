import { useEffect, useRef } from "react";

interface TextAreaProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const TextArea = ({ text, setText }: TextAreaProps) => {
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textRef.current) textRef.current.value = text;
  }, [text]);

  return (
    <textarea
      ref={textRef}
      placeholder="Type a message."
      className="h-28 py-2 px-3 w-full rounded-md border-0 outline-none resize-none"
      onBlur={() => setText(!textRef.current ? "" : textRef.current.value)}
    />
  );
};

export default TextArea;
