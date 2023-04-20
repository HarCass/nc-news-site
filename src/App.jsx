import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Articles from "./components/Articles";
import Header from "./components/Header";
import Article from "./components/Article";
import Topics from "./components/Topics";


function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<Home></Home>}></Route>
        <Route path="/articles" element={<Articles></Articles>}></Route>
        <Route path="/articles/:article_id" element={<Article></Article>} errorElement={<h2>404</h2>}></Route>
        <Route path="/topics" element={<Topics></Topics>}></Route>
        <Route path="/*" element={<h2>404: Page Not Found</h2>}></Route>
      </Routes>
    </div>
  )
}

export default App;
