import { addStyles, EditableMathField } from "react-mathquill";
import { MathComponent } from "mathjax-react";

addStyles();

interface MathAreaProps {
  readOnly: boolean;
  mathRef?: React.MutableRefObject<string>;
  renderedMath?: string;
}

const MathArea = ({ readOnly, mathRef, renderedMath }: MathAreaProps) => {
  return readOnly ? (
    <div className="overflow-x-auto">
      <MathComponent tex={renderedMath || ""} />
    </div>
  ) : (
    <EditableMathField
      latex={mathRef && mathRef.current}
      onChange={(mathField) => {
        if (mathRef) mathRef.current = mathField.latex();
      }}
      className="h-28 py-10 px-3 w-full rounded-md border-0 outline-none text-justify"
    />
  );
};

export default MathArea;
