import { addStyles, EditableMathField } from "react-mathquill";
import { MathComponent } from "mathjax-react";

addStyles();

interface MathAreaProps {
  readOnly: boolean;
  math: string;
  setMath?: React.Dispatch<React.SetStateAction<string>>;
}

const MathArea = ({ readOnly, math, setMath }: MathAreaProps) => {
  return readOnly ? (
    <MathComponent tex={math} />
  ) : (
    <EditableMathField
      latex={math}
      onChange={(mathField) => {
        (setMath as React.Dispatch<React.SetStateAction<string>>)(mathField.latex());
      }}
      config={{ autoCommands: "pi theta sqrt sum", autoOperatorNames: "sin cos lim" }}
      className="h-16 py-5 px-3 w-full rounded-md border-0 outline-none text-justify"
    />
  );
};

export default MathArea;
