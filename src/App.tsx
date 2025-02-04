import React from "react";
import SeminarList from "./components/SeminarList/SeminarList";
import LayoutContainer from "./components/layout/LayoutContainer/LayoutContainer";
import Header from "./components/layout/Header/Header";
import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <>
      <Header />

      <main>
        <section className={styles.content}>
          <LayoutContainer>
            <SeminarList />
          </LayoutContainer>
        </section>
      </main>
    </>
  );
};

export default App;
