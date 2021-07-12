import React from 'react'
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Details from './pages/Details';
import Layout from './components/layout/layout';
import ByGenre from './pages/ByGenre';

const LayoutHome = () => {
  return (
    <Layout>
      <Home/>
    </Layout>
  )
}

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LayoutHome}/>
      <Route exact path="/results/:animeName" component={Search}/>
      <Route exact path="/details/:animeId" component={Details}/>
      <Route exact path="/animes/:nameGenre" component={ByGenre}/>
    </div>
  );
}

export default App;
