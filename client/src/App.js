import React from 'react'
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Details from './pages/Details';
import Layout from './components/layout/layout';
import ByGenre from './pages/ByGenre';
import Register from './pages/Register';
import Login from './pages/Login';
import styles from "./styles/App.module.css";
import Profile from './pages/Profile';

const LayoutHome = () => {
  return (
    <Layout>
      <Home/>
    </Layout>
  )
}

// const LayoutRegister = () => {
//   return (
//     <Layout>
//       <Register/>
//     </Layout>
//   )
// }

function App() {
  return (
    <div className={styles.App}>
      <Route exact path="/" component={LayoutHome}/>
      <Route exact path="/results/:animeName" component={Search}/>
      <Route exact path="/details/:animeId" component={Details}/>
      <Route exact path="/animes/:nameGenre" component={ByGenre}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/profile" component={Profile}/>
    </div>
  );
}

export default App;
