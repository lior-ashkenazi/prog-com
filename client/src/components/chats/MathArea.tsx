import { useEffect, useState, useRef } from "react";
import { debounce } from "lodash";

import { addStyles, EditableMathField, StaticMathField, MathField } from "react-mathquill";

addStyles();

interface MathAreaProps {
  readOnly: boolean;
  math: string;
  setMath?: React.Dispatch<React.SetStateAction<string>>;
  handleUserTyping?: (isTyping: boolean) => void;
}

const MathArea = ({ readOnly, math, setMath, handleUserTyping }: MathAreaProps) => {
  const mathRef = useRef<string>("");
  const [key, setKey] = useState<number>(0);

  const debouncedUserTyping = useRef(
    debounce(() => handleUserTyping && handleUserTyping(false), 500)
  ).current;

  useEffect(() => {
    mathRef.current = math;

    if (math === "") {
      setKey((prevKey) => prevKey + 1);
    }
  }, [math]);

  const handleChange = (mathField: MathField) => {
    mathRef.current = mathField.latex();
    mathRef.current === "" && setMath && setMath(mathRef.current);

    if (handleUserTyping) {
      handleUserTyping(true);
      debouncedUserTyping();
    }
  };

  return readOnly ? (
    <div className="overflow-x-auto">
      <StaticMathField>{math}</StaticMathField>
    </div>
  ) : (
    <div
      onBlur={() => {
        setMath && setMath(mathRef.current);
      }}
    >
      <EditableMathField
        key={key}
        latex={mathRef.current}
        config={{ autoCommands: "pi theta sqrt sum" }}
        className="h-32 py-10 px-3 w-full rounded-md border-0 outline-none text-justify overflow-x-auto"
        onChange={handleChange}
      />
    </div>
  );
};

export default MathArea;
