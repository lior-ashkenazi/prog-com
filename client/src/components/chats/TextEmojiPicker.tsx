import { useEffect, useState, RefObject } from "react";
import EmojiPicker from "emoji-picker-react";

interface TextEmojiPickerProps {
  textRef: RefObject<HTMLTextAreaElement>;
  openEmoji: boolean;
}

const TextEmojiPicker = ({ textRef, openEmoji }: TextEmojiPickerProps) => {
  const [displayClass, setDisplayClass] = useState<"scale-y-1" | "scale-y-0">("scale-y-0");

  useEffect(() => {
    openEmoji ? setDisplayClass("scale-y-1") : setDisplayClass("scale-y-0");
  }, [openEmoji]);

  return (
    <div
      className={`absolute -top-72 left-0 transition-transform origin-bottom-left ${displayClass}`}
    >
      <EmojiPicker
        width="20rem"
        height="18rem"
        previewConfig={{ showPreview: false }}
        onEmojiClick={(emojiData) => {
          if (textRef.current) textRef.current.value += emojiData.emoji;
        }}
      />
    </div>
  );
};

export default TextEmojiPicker;
