import { React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoginForm } from "./components/auth/LoginForm";
import { RegisterForm } from "./components/auth/RegisterForm";
import { Logout } from "./components/auth/Logout";
import { NavBar } from "./components/UI/navbar/NavBar";
import { TodoList } from "./components/todos/TodoList";
import { NoMatch } from "./pages/NoMatch";
import { Home } from "./pages/Home";
import { UpdateUserForm } from "./components/auth/UpdateUserForm";
import { TodoById } from "./components/todos/TodoById";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="logout" element={<Logout />} />
          <Route exact path="todos" element={<TodoList />} />
          <Route exact path="todos/:id" element={<TodoById />} />
          <Route path="update/profile" element={<UpdateUserForm />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
