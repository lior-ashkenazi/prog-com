import { useEffect, useState, useRef } from "react";
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

import { BsArrowsFullscreen } from "react-icons/bs";

import Modal from "react-modal";

import { languagesLowercaseToUppercaseMap } from "../../../types/messageTypes";

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

  const debouncedUserTyping = useRef(
    debounce(() => handleUserTyping && handleUserTyping(false), 500)
  ).current;

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleChange = (value: string) => {
    codeRef.current = value;
    codeRef.current === "" && setCode && setCode(codeRef.current);

    if (handleUserTyping) {
      handleUserTyping(true);
      debouncedUserTyping();
    }
  };

  return (
    <div className="flex relative mb-1">
      <div
        className="w-full"
        onBlur={() => {
          debouncedUserTyping();
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
          height={readOnly ? "auto" : "8rem"}
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
      {!readOnly && (
        <button
          type="button"
          className="absolute right-4 bottom-4"
          onClick={() => setShowModal(true)}
        >
          <BsArrowsFullscreen style={{ color: "#6b7280" }} />
        </button>
      )}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={{
          content: {
            width: "36rem",
            height: "36rem",
            margin: "0 auto",
            padding: 0,
            borderWidth: "0px",
            borderTopColor: "rgb(79 70 229)",
            borderRadius: "0.375rem",
          },
          overlay: {
            backgroundColor: "rgb(0, 0, 0, 0.6)",
          },
        }}
      >
        <div
          className="w-full"
          onBlur={() => {
            debouncedUserTyping();
            setCode && setCode(codeRef.current);
          }}
        >
          <CodeMirror
            value={code}
            height="36rem"
            width="36rem"
            theme="dark"
            readOnly={readOnly}
            extensions={[StreamLanguage.define(languagesStreamParserMap[selectedLanguage])]}
            onChange={handleChange}
            className="rounded-md border-0 outline-none overflow-auto"
          />
        </div>
      </Modal>
    </div>
  );
};

export default CodeArea;
