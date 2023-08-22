import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "./pages/home.js";
import { Auth } from "./pages/auth.js";
import { Profile } from "./pages/profile.js";
import { NewBlog } from "./pages/newBlog.js";
import { ComponentNavbar } from "./components/navbar.js";
import { isAuthenticated } from "./helpers/isAuthenticated.js";
import { Blog } from "./pages/blog.js";
import { Edit } from "./pages/edit.js";

function App() {
  console.log(isAuthenticated());

  const ProtectedAuth = () => {
    return isAuthenticated() ? <Navigate to="/" /> : <Auth />;
  };
  const ProtectedNewBlog = () => {
    return isAuthenticated() ? <NewBlog /> : <Navigate to="/auth" />;
  };
  const ProtectedProfile = () => {
    return isAuthenticated() ? <Profile /> : <Navigate to="/auth" />;
  };

  return (
    <div className="App">
      <Router>
        <ComponentNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<ProtectedAuth />} />
          <Route path="/newBlog" element={<ProtectedNewBlog />} />
          <Route path="/profile" element={<ProtectedProfile />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
