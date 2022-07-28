import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import ConnectButton from "../components/ConnectButton";
import ViewerName, { SetViewerName } from "../components/ViewerName";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container} suppressHydrationWarning>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Ceramic Sample</h1>

        <div className={styles.description}>
          <ConnectButton></ConnectButton>
          <ViewerName></ViewerName>
          {/* <SetViewerName></SetViewerName>  */}
        </div>
      </main>
    </div>
  );
};

export default Home;
