import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { cpp, java, c, csharp, scala, kotlin } from "@codemirror/legacy-modes/mode/clike";
import { python } from "@codemirror/legacy-modes/mode/python";
import { javascript, typescript } from "@codemirror/legacy-modes/mode/javascript";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import { swift } from "@codemirror/legacy-modes/mode/swift";
import { go } from "@codemirror/legacy-modes/mode/go";
import { rust } from "@codemirror/legacy-modes/mode/rust";

interface CodeAreaProps {
  readOnly: boolean;
  code: string;
  setCode?: React.Dispatch<React.SetStateAction<string>>;
  selectedLanguage: string;
  setSelectedLanguage?: React.Dispatch<React.SetStateAction<string>>;
}

const languagesMap = {
  "C++": cpp,
  Java: java,
  Python: python,
  C: c,
  "C#": csharp,
  JavaScript: javascript,
  Ruby: ruby,
  Swift: swift,
  Go: go,
  Scala: scala,
  Kotlin: kotlin,
  Rust: rust,
  TypeScript: typescript,
};

const CodeArea = ({
  readOnly,
  code,
  setCode,
  selectedLanguage,
  setSelectedLanguage,
}: CodeAreaProps) => {
  return (
    <div className="flex relative">
      <CodeMirror
        value={code}
        height="150px"
        theme="dark"
        readOnly={readOnly}
        extensions={[
          StreamLanguage.define(languagesMap[selectedLanguage as keyof typeof languagesMap]),
        ]}
        onChange={(value) => {
          (setCode as React.Dispatch<React.SetStateAction<string>>)(value);
        }}
        className="w-full rounded-md border-0 outline-none"
      />
      <div className="h-40 absolute right-0 -top-6">
        <select
          className="overflow-auto rounded-sm"
          onChange={(e) =>
            (setSelectedLanguage as React.Dispatch<React.SetStateAction<string>>)(e.target.value)
          }
          value={selectedLanguage}
        >
          {Object.keys(languagesMap).map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CodeArea;
