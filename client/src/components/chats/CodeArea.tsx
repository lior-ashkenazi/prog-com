import { useEffect, useRef } from "react";
import { debounce } from "lodash";

import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { cpp, java, c, csharp, scala, kotlin } from "@codemirror/legacy-modes/mode/clike";
import { python } from "@codemirror/legacy-modes/mode/python";
import { javascript, typescript } from "@codemirror/legacy-modes/mode/javascript";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import { swift } from "@codemirror/legacy-modes/mode/swift";
import { go } from "@codemirror/legacy-modes/mode/go";
import { rust } from "@codemirror/legacy-modes/mode/rust";

import { languagesLowercaseToUppercaseMap } from "../../types/messageTypes";

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

export type LanguageKeys = keyof typeof languagesStreamParserMap;

interface CodeAreaProps {
  readOnly: boolean;
  code: string;
  setCode?: React.Dispatch<React.SetStateAction<string>>;
  selectedLanguage: LanguageKeys;
  setSelectedLanguage?: React.Dispatch<React.SetStateAction<LanguageKeys>>;
  handleUserTyping?: (isUserTyping: boolean) => void;
}

const CodeArea = ({
  readOnly,
  code,
  setCode,
  selectedLanguage,
  setSelectedLanguage,
  handleUserTyping,
}: CodeAreaProps) => {
  const codeRef = useRef<string>("ref");

  useEffect(() => {
    codeRef.current = code;
  }, [code]);

  const debouncedHandleUserTyping = useRef(
    debounce((isUserTyping: boolean) => handleUserTyping && handleUserTyping(isUserTyping), 500)
  ).current;

  const handleChange = (value: string) => {
    debouncedHandleUserTyping(true);
    codeRef.current = value;
    codeRef.current === "" && setCode && setCode(codeRef.current);
  };

  return (
    <div className="flex relative">
      <div
        className="w-full"
        onBlur={() => {
          debouncedHandleUserTyping(false);
          setCode && setCode(codeRef.current);
        }}
      >
        {readOnly && (
          <span className="font-semibold">
            {languagesLowercaseToUppercaseMap[selectedLanguage]}
          </span>
        )}
        <CodeMirror
          value={code}
          height={readOnly ? "auto" : "120px"}
          theme="dark"
          readOnly={readOnly}
          extensions={[StreamLanguage.define(languagesStreamParserMap[selectedLanguage])]}
          onChange={handleChange}
          className="w-full rounded-md border-0 outline-none overflow-x-auto"
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
            {Object.entries(languagesLowercaseToUppercaseMap).map(([key, value]) => (
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
