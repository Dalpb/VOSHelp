import { Layout, Badge, Button, Flex } from "antd";
import styles from "./vgmemoryview.module.css";
import MemoryCanvas from "@vgmemory/components/memorycanva/memorycanva";
import CodePanelMemory from "@vgmemory/components/memorycodepanel/codeEditorMemory";
import { xruntest } from "@vgmemory/Algorithm/xmalloc";
import { useState } from "react";
import useActionStore from "@vgmemory/store/useActionsStore";
//contains about layout
const VGmemoryview = () => {
  const { Header, Footer, Content } = Layout;
  const { nextLineAction } = useActionStore();
  const [initSimulation, setInitSimulation] = useState<boolean>(false);

  const handleInitSimulation = () => {
    xruntest();
    setInitSimulation(true);
  };
  const handleNext = () => {
    nextLineAction();
  };

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <h1>VGMemory</h1>
        <div>
          <Button onClick={handleInitSimulation}>Iniciar</Button>
          <Button disabled={!initSimulation} onClick={handleNext}>
            Next
          </Button>
        </div>
      </Header>
      <Content className={styles.container}>
        <section>
          <header>
            <h1>Simulación manejo de memoria</h1>
          </header>
          <MemoryCanvas init={initSimulation} />
        </section>
        <section>
          <CodePanelMemory initSimulation={initSimulation} />
        </section>
      </Content>
      <Footer></Footer>
    </Layout>
  );
};
export default VGmemoryview;
