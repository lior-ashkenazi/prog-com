import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { cpp, java, c, csharp, scala, kotlin } from "@codemirror/legacy-modes/mode/clike";
import { python } from "@codemirror/legacy-modes/mode/python";
import { javascript, typescript } from "@codemirror/legacy-modes/mode/javascript";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import { swift } from "@codemirror/legacy-modes/mode/swift";
import { go } from "@codemirror/legacy-modes/mode/go";
import { rust } from "@codemirror/legacy-modes/mode/rust";

const languagesStreamParserMap = {
  cpp: cpp,
  java: java,
  python: python,
  c: c,
  csharp: csharp,
  javascript: javascript,
  ruby: ruby,
  swift: swift,
  go: go,
  scala: scala,
  kotlin: kotlin,
  rust: rust,
  typescript: typescript,
};

const languagesDropdownMap = {
  cpp: "C++",
  java: "Java",
  python: "Python",
  c: "C",
  csharp: "C#",
  javascript: "JavaScript",
  ruby: "Ruby",
  swift: "Swift",
  go: "Go",
  scala: "Scala",
  kotlin: "Kotlin",
  rust: "Rust",
  typescript: "TypeScript",
};

export type LanguageKeys = keyof typeof languagesStreamParserMap;

interface CodeAreaProps {
  readOnly: boolean;
  code: string;
  setCode?: React.Dispatch<React.SetStateAction<string>>;
  selectedLanguage: LanguageKeys;
  setSelectedLanguage?: React.Dispatch<React.SetStateAction<LanguageKeys>>;
}

const CodeArea = ({
  readOnly,
  code,
  setCode,
  selectedLanguage,
  setSelectedLanguage,
}: CodeAreaProps) => {
  console.log(selectedLanguage);

  return (
    <div className="flex relative">
      <div className="w-full">
        {readOnly && (
          <span className="font-semibold">{languagesDropdownMap[selectedLanguage]}</span>
        )}
        <CodeMirror
          value={code}
          height="150px"
          theme="dark"
          readOnly={readOnly}
          extensions={[StreamLanguage.define(languagesStreamParserMap[selectedLanguage])]}
          onChange={(value) => {
            (setCode as React.Dispatch<React.SetStateAction<string>>)(value);
          }}
          className="w-full rounded-md border-0 outline-none"
        />
      </div>
      {!readOnly && (
        <div className="h-40 absolute right-0 -top-6">
          <select
            className="overflow-auto rounded-sm"
            onChange={(e) =>
              (setSelectedLanguage as React.Dispatch<React.SetStateAction<string>>)(e.target.value)
            }
            value={selectedLanguage}
          >
            {Object.entries(languagesDropdownMap).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default CodeArea;
