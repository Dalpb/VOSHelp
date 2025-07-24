import { Flex, Layout } from "antd";
import styles from "./vgmemoryview.module.css";

//contains about layout
const VGmemoryview = () => {
  const { Header, Footer, Content } = Layout;
  return (
    <Layout>
      <Header>VGMemory</Header>
      <Content>
        <Flex gap="middle">
          <section className={styles.canva_section}></section>
          <section className={styles.code_section}></section>
        </Flex>
      </Content>
      <Footer></Footer>
    </Layout>
  );
};
export default VGmemoryview;
