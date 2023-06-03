import { addStyles, EditableMathField } from "react-mathquill";

addStyles();

interface MathAreaProps {
  math: string;
  setMath: React.Dispatch<React.SetStateAction<string>>;
}

const MathArea = ({ math, setMath }: MathAreaProps) => {
  return (
    <EditableMathField
      latex={math}
      onChange={(mathField) => setMath(mathField.latex())}
      config={{ autoCommands: "pi theta sqrt sum", autoOperatorNames: "sin cos lim" }}
      className="h-16 py-5 px-3 w-full rounded-md border-0 outline-none text-justify"
    />
  );
};

export default MathArea;
