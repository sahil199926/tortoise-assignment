import { Route, Routes, BrowserRouter, Switch } from "react-router-dom";
import Hoc from "../component/Hoc";
import HomePage from "../component/HomePage";
import CategoryWise from "../component/CategoryWise";
import SearchImg from "../component/SearchImg";
const Navs = () => {
  return (
    <BrowserRouter>
      <Hoc>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/photos/:search" element={<SearchImg />} />
          <Route path="/category/:catId" element={<CategoryWise />}></Route>
        </Routes>
      </Hoc>

    </BrowserRouter>
  );
};

export default Navs;
