import React from "react";
import styled from "@emotion/styled";
import "./reset.css";
import "./App.css";
import { Gallary } from "./components/Gallary";

const AppContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  padding: "0",
});

function App() {
  return (
    <AppContainer>
      <Gallary imageAmount={9} />
    </AppContainer>
  );
}

export default App;
