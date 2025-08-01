import hljs from "highlight.js";
import { useEffect, useRef } from "react";
import styles from "@components/codepanel.module.css"
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
//ya está el front, y ahora qué hago...
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
      <pre style={{margin:0}} className={styles.linecode}>
        <code style={{padding:0,backgroundColor:"transparent"}} ref={codeRef} className={`language-${language}`}>
          {code}
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
          isRunning={false}
        />
      ))}
    </div>
  );
};
