import { mallocCode, morecoreCode, xfreeCode } from "@assets/code/code_memory";
import { PanelCode } from "@components/codepanel";
const CodePanelMemory = () => {
    const mallocLines = mallocCode.split('\n');
    return(
        <PanelCode language="c" linesCode={mallocLines} nameCode="malloc.c" />
 
    )
};

export default CodePanelMemory;
