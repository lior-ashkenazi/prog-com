import { useEffect, useRef } from "react";
import { debounce } from "lodash";

interface TextAreaProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  handleUserTyping: (isUserTyping: boolean) => void;
}

const TextArea = ({ text, setText, handleUserTyping }: TextAreaProps) => {
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textRef.current) textRef.current.value = text;
  }, [text]);

  const debouncedHandleUserTyping = useRef(
    debounce((isUserTyping: boolean) => handleUserTyping(isUserTyping), 500)
  ).current;

  const handleBlur = () => {
    debouncedHandleUserTyping(false);
    setText(!textRef.current ? "" : textRef.current.value);
  };

  const handleChange = () => {
    debouncedHandleUserTyping(true);
    if (textRef.current && textRef.current.value === "") {
      setText("");
    }
  };

  return (
    <textarea
      ref={textRef}
      placeholder="Type a message."
      className="h-28 py-2 px-3 w-full rounded-md border-0 outline-none resize-none"
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
};

export default TextArea;
