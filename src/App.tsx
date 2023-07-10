import React from 'react';
import MainPage from "./containers/MainPage/MainPage";
import Layout from "./components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import EditMeal from "./containers/EditMeal/EditMeal";

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={(
              <MainPage/>
          )}/>
          <Route path="/new-meal" element={(
              <EditMeal/>
          )}/>
          <Route path="/edit-meal/:id" element={(
              <EditMeal/>
          )}/>
        </Routes>
      </Layout>
  );
}

export default App;
