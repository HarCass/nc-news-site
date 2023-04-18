import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Articles from "./components/Articles";
import Header from "./components/Header";
import Article from "./components/Article";


function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/articles" element={<Articles></Articles>}></Route>
        <Route path="/articles/:article_id" element={<Article></Article>}></Route>
      </Routes>
    </div>
  )
}

export default App;
