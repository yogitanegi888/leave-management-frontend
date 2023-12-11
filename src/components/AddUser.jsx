import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import axios from "axios";

export function AddUser() {
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: {
            username: '',
            department: ''
        },
        onSubmit: async (values) => {
            try {
                let response = await axios.post(`${BASE_URL}/user-registration`, values);
                alert(response.data.message)
                if (response.data.status) {
                    navigate('/');
                }
            } catch (error) {
                alert('Something Went Wrong!');
            }
        }
    })

    return (
        <div className="container container-md d-flex justify-content-center my-3">
            <form style={{ display: 'block', maxWidth: '650px', width: '650px' }} onSubmit={formik.handleSubmit}>
                <h3>Add User</h3>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" name="username" value={formik.values.username} onChange={formik.handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Department</label>
                    <input type="text" className="form-control" id="department" name="department" value={formik.values.department} onChange={formik.handleChange} />
                </div>
                <button className="btn btn-primary mx-2" type="submit">Submit</button>
                <Link to={'/home'} className="btn btn-secondary mx-2">Back</Link>
            </form>
        </div>
    );
}