import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Articles from "./components/Articles";
import Header from "./components/Header";
import Article from "./components/Article";
import Topics from "./components/Topics";
import Users from "./components/Users";
import Contribute from "./components/Contribute";
import User from "./components/User";
import SignUp from "./components/SignUp";
import UserComments from "./components/UserComments";


function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/articles" element={<Articles></Articles>}></Route>
        <Route path="/articles/:article_id" element={<Article></Article>}></Route>
        <Route path="/topics" element={<Topics></Topics>}></Route>
        <Route path="/users" element={<Users></Users>}></Route>
        <Route path="/users/:username" element={<User></User>}></Route>
        <Route path="/users/:username/contribute" element={<Contribute></Contribute>}></Route>
        <Route path="/users/:username/comments" element={<UserComments></UserComments>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/*" element={<h2>404: Page Not Found</h2>}></Route>
      </Routes>
    </div>
  )
}

export default App;
