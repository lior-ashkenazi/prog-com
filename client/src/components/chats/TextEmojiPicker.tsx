import { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";

interface TextEmojiPickerProps {
  openEmoji: boolean;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const TextEmojiPicker = ({ openEmoji, text, setText }: TextEmojiPickerProps) => {
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
        onEmojiClick={(emojiData) => setText(text + emojiData.emoji)}
      />
    </div>
  );
};

export default TextEmojiPicker;
