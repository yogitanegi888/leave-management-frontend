import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

export function Home() {
    let [users, setUsers] = useState([]);
    let [userId, setUserId] = useState('');
    let navigate = useNavigate();
    useEffect(() => {
        fetchUsers();
    }, [])
    const fetchUsers = async () => {
        try {
            let response = await axios.get(`${BASE_URL}/users`);
            setUsers(response.data.data);
        } catch (error) {
            alert('Fail to get users');
        }
    }
    const viewDashboard = () => {
        if (userId) {
            navigate(`dashboard/${userId}`)
        }
    }
    return (
        <div className="container container-md">
            <div className='m-3'>
                <div>
                    <h5>Select User</h5>
                    <select className="form-select form-select-lg mb-3" value={userId} id="userId" name="userId" onChange={(evt) => setUserId(evt.target.value)} aria-label="Large select example">
                        <option defaultValue>Select User</option>
                        {users.map((user) => (<option key={user._id} value={user.username}>{user.username}</option>))}
                    </select>
                    <div className="d-flex justify-content-between">
                        <div className="box left">
                            <button onClick={viewDashboard} className='btn btn-primary m-1'>View User Dashboard</button>
                        </div>
                        <div className="box right">
                            <Link to={`/apply-leave`} className='btn btn-secondary m-1'>Apply Leave</Link>
                            <Link to={'/add-user'} className="btn btn-danger">Add User</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}