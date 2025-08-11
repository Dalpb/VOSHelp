import {
  mainCode,
  mallocCode,
  morecoreCode,
  xfreeCode,
} from "@assets/code/code_memory";
import { PanelCode } from "@components/codepanel";
import { Tabs } from "antd";
import { useEffect, useState } from "react";
import useActionStore from "@vgmemory/store/useActionsStore";

interface Props {
  initSimulation: boolean;
}

const CodePanelMemory = ({ initSimulation }: Props) => {
  const { currentLineAction, actions } = useActionStore();
  const [activeTab, setActiveTab] = useState<string>("main");
  const [lineExecute,setLineExecute] = useState<number>(-1);
  const mallocLines = mallocCode.split("\n");
  const morecoreLines = morecoreCode.split("\n");
  const xfreeCodeLines = xfreeCode.split("\n");
  const mainCodeLines = mainCode.split("\n");

  const handleChange = (key: string) => setActiveTab(key);

  useEffect(() => {
    console.log(currentLineAction);
    if (!initSimulation || currentLineAction == -1) return;
    console.log(currentLineAction);
    const i = currentLineAction;
    const action = actions[i].action;
    const line = actions[i].line;
    if (action.type == "changeFile") {
      const name = action.content.name;
      const key = name.split(".")[0];
      handleChange(key);
    }
    setLineExecute(line);
  }, [currentLineAction, initSimulation]);

  return (
    <>
      <Tabs
        type="card"
        activeKey={activeTab}
        onChange={handleChange}
        items={[
          {
            label: "main.c",
            key: "main",
            children: (
              <PanelCode
                language="c"
                linesCode={mainCodeLines}
                nameCode="main.c"
                isVisible={activeTab == "main"}
                lineExecute={lineExecute}
              />
            ),
          },
          {
            label: "malloc.c",
            key: "malloc",
            children: (
              <PanelCode
                language="c"
                linesCode={mallocLines}
                nameCode="malloc.c"
                isVisible= {activeTab =="malloc"}
                lineExecute={lineExecute}
              />
            ),
          },
          {
            label: "morecode.c",
            key: "morecode",
            children: (
              <PanelCode
                language="c"
                linesCode={morecoreLines}
                nameCode="morecode.c"
                isVisible={activeTab == "morecode"}
                lineExecute={lineExecute}
              />
            ),
          },
          {
            label: "xfree.c",
            key: "xfree",
            children: (
              <PanelCode
                language="c"
                linesCode={xfreeCodeLines}
                nameCode="xfree.c"
                isVisible= {activeTab == "xfree"}
                lineExecute={lineExecute}
              />
            ),
          },
        ]}
      />
    </>
  );
};

export default CodePanelMemory;
