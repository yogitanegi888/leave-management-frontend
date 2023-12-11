import logo from './logo.svg';
import './App.css';
import { Link, Outlet } from "react-router-dom";
import { useFormik } from 'formik';

function App() {
  return (
    <>
      <header>
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Leave Management Application</a>
          </div>
        </nav>
      </header>
      <Outlet/>
    </>
  );
}

export default App;