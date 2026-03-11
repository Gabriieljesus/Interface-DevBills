import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home";

const AppRoutes = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<h2>Página não encontrada</h2>

        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;