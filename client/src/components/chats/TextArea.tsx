interface TextAreaProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const TextArea = ({ text, setText }: TextAreaProps) => {
  return (
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Type a message."
      className="h-28 py-2 px-3 w-full rounded-md border-0 outline-none resize-none"
    />
  );
};

export default TextArea;
