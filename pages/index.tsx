import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Form from "../components/Form/Form";
import Header from "../components/Header/Header";
import ResumePreview from "../components/ResumePreview/ResumePreview";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ResumeFromSpace - free resume creator</title>
        <meta name="description" content="Generated by create next app" />

        <link rel="icon" href="/logo.svg" />
      </Head>
      <main className="container flex flex-col mx-auto p-4 min-h-screen">
        <Header />
        <div className="flex flex-col md:flex-row gap-8 flex-1 mt-16">
          <Form />
          <ResumePreview />
        </div>
      </main>
    </div>
  );
};

export default Home;
