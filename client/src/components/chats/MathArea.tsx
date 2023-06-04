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
    <div className="overflow-x-auto">
      <MathComponent tex={math} />
    </div>
  ) : (
    <EditableMathField
      latex={math}
      onChange={(mathField) => {
        (setMath as React.Dispatch<React.SetStateAction<string>>)(mathField.latex());
      }}
      config={{ autoCommands: "pi theta sqrt sum", autoOperatorNames: "sin cos lim" }}
      className="h-28 py-10 px-3 w-full rounded-md border-0 outline-none text-justify"
    />
  );
};

export default MathArea;
