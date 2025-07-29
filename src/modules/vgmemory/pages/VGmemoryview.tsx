import { Layout } from "antd";
import styles from "./vgmemoryview.module.css";
import MemoryCanvas from "@vgmemory/components/memorycanva/memorycanva";
import CodePanelMemory from "@vgmemory/components/memorycodepanel/codeEditorMemory";

//contains about layout
const VGmemoryview = () => {
  const { Header, Footer, Content } = Layout;
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <h1>VGMemory</h1>
      </Header>
      <Content className={styles.container}>
        <section>
          <header>
            <h1>Simulación manejo de memoria</h1>
          </header>
          <MemoryCanvas />
        </section>
        <section>
          <header>
            <h1>malloc.c</h1>
          </header>
          <CodePanelMemory />
        </section>
      </Content>
      <Footer></Footer>
    </Layout>
  );
};
export default VGmemoryview;
