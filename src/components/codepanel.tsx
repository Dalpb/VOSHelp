import hljs from "highlight.js";
import { useEffect, useRef } from "react";
import styles from "@components/codepanel.module.css"
interface LineCodeProps {
  code: string;
  isRunning: boolean;
}
interface PanelCodeProps {
  linesCode: Array<string>;
  isVisible:boolean;
  lineExecute:number;
  language: string;
  nameCode: string;
}
//mi panal para cualquier otro codigo de cualquier lenguaje, pensando para el LAB02
//ya está el front, y ahora qué hago...
export const PanelCode = ({
  nameCode,
  linesCode,
  language,
  isVisible,
  lineExecute
}: PanelCodeProps) => {

  //representa solo una linea de codigo de cualquier lenguaje
  const LineCode = ({ code, isRunning }: LineCodeProps) => {
    const codeRef = useRef<HTMLElement>(null);
    useEffect(() => {
      if (!codeRef.current) return;
      codeRef.current.textContent = code;
      codeRef.current.removeAttribute("data-highlighted");
      hljs.highlightElement(codeRef.current);
    }, [code]);
    return (
      <pre style={{margin:0}} className={`${styles.linecode} ${isRunning && styles.execute}`}>
        <code style={{padding:0,backgroundColor:"transparent"}} ref={codeRef} className={`language-${language}`}>
        </code>
      </pre>
    );
  };

  return (
    <div className={styles.codepanel}>
      {linesCode.map((code, index) => (
        <LineCode
          key={`${nameCode}-line-${index + 1}`}
          code={code}
          isRunning={isVisible && index+1 == lineExecute}
        />
      ))}
    </div>
  );
};
