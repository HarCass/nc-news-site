import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Header from "./components/Header";
import Article from "./pages/Article";
import Topics from "./pages/Topics";
import Users from "./pages/Users";
import Contribute from "./pages/Contribute";
import User from "./pages/User";
import SignUp from "./pages/SignUp";
import UserComments from "./pages/UserComments";


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
