import { useEffect, useState, useRef } from "react";

import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";

addStyles();

interface MathAreaProps {
  readOnly: boolean;
  math: string;
  setMath?: React.Dispatch<React.SetStateAction<string>>;
}

const MathArea = ({ readOnly, math, setMath }: MathAreaProps) => {
  const mathRef = useRef<string>("");
  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    mathRef.current = math;

    if (math === "") {
      setKey((prevKey) => prevKey + 1);
    }
  }, [math]);

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
        className="h-28 py-10 px-3 w-full rounded-md border-0 outline-none text-justify overflow-x-auto"
        onChange={(mathField) => {
          mathRef.current = mathField.latex();
        }}
      />
    </div>
  );
};

export default MathArea;
