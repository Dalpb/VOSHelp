import hljs from "highlight.js";
import { useEffect, useRef } from "react";

interface LineCodeProps {
  code: string;
  isRunning: boolean;
}
interface PanelCodeProps {
  linesCode: Array<string>;
  language: string;
  nameCode: string;
}
//mi panal para cualquier otro codigo de cualquier lenguaje, pensando para el LAB02
export const PanelCode = ({
  nameCode,
  linesCode,
  language,
}: PanelCodeProps) => {

  //representa solo una linea de codigo de cualquier lenguaje
  const LineCode = ({ code, isRunning }: LineCodeProps) => {
    const codeRef = useRef<HTMLElement>(null);
    useEffect(() => {
      if (!codeRef.current) return;
      hljs.highlightElement(codeRef.current);
    }, []);
    return (
      <pre>
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    );
  };

  return (
    <div>
      {linesCode.map((code, index) => (
        <LineCode
          key={`${nameCode}-line-${index + 1}`}
          code={code}
          isRunning={false}
        />
      ))}
    </div>
  );
};
