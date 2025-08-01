import { mainCode, mallocCode, morecoreCode, xfreeCode } from "@assets/code/code_memory";
import { PanelCode } from "@components/codepanel";
import { Tabs } from "antd";
const CodePanelMemory = () => {
  const mallocLines = mallocCode.split("\n");
  const morecoreLines = morecoreCode.split("\n");
  const xfreeCodeLines = xfreeCode.split("\n");
  const mainCodeLines = mainCode.split('\n');
  const handleChange = () => {};

  return (
    <>
      <Tabs
        type="card"
        onChange={handleChange}
        items={[
          {
            label:"main.c",
            key:"main",
            children: <PanelCode language="c" linesCode={mainCodeLines} nameCode="main.c"  />,
          },
          {
            label: "malloc.c",
            key: "malloc",
            children: <PanelCode language="c" linesCode={mallocLines} nameCode="malloc.c"  />,
          },
          {
            label: "morecode.c",
            key: "morecode",
            children: <PanelCode language="c" linesCode={morecoreLines} nameCode="morecode.c"  />,
          },
          {
            label: "xfree.c",
            key: "xfree",
            children: <PanelCode language="c" linesCode={xfreeCodeLines} nameCode="xfree.c"  />,
          }
        ]}
      />
    </>
  );
};

export default CodePanelMemory;
