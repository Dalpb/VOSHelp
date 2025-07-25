import {  Layout } from "antd";
import styles from "./vgmemoryview.module.css";
import MemoryCanvas from "@vgmemory/components/memorycanva/memorycanva";

//contains about layout
const VGmemoryview = () => {
  const { Header, Footer, Content } = Layout;
  return (
    <Layout className={styles.layout}>
      <Header>VGMemory</Header>
      <Content className={styles.container}>
          <section className={styles.canva_section}>
            <MemoryCanvas/>
          </section>
          <section className={styles.code_section}></section>
      </Content>
      <Footer></Footer>
    </Layout>
  );
};
export default VGmemoryview;
