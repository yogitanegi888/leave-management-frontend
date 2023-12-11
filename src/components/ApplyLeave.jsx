import axios from "axios";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { DateRange, DateRangePicker } from "react-date-range";
import { Link, useNavigate } from "react-router-dom";
import { applyLeave, fetchLeaves, fetchUsers } from '../api.service';
import { BASE_URL } from "../constants";

export function ApplyLeave() {
    const [state, setState] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }]);
    let [users, setUsers] = useState([]);
    let [leaves, setLeaves] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        fetchUsers(setUsers);
        // fetchLeaves(setLeaves);
    }, [])


    let formik = useFormik({
        initialValues: {
            username: '',
            leavetype: ''
        },
        onSubmit: async (values) => {
            Object.assign(values, {
                startdate: moment(state[0].startDate).format('YYYY-MM-DD'),
                enddate: moment(state[0].endDate).format('YYYY-MM-DD')
            });
            try {
                let response = await axios.post(`${BASE_URL}/apply-leaves`, values);
                alert(response.data.message);
                if (response.data.status) {
                    navigate('/');
                } 
            } catch (error) {
                alert('Fail to apply leave');
            }
        }
    })
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }

    function handleSelect(ranges) {
        console.log(ranges)
    }
    return (
        <div className="container container-md d-flex justify-content-center my-3">
            <form style={{ display: 'block', maxWidth: '650px', width: '650px' }} onSubmit={formik.handleSubmit}>
                <h3>Apply Leave</h3>
                <select className="form-select form-select-lg mb-3" value={formik.values.username} id="username" name="username" onChange={formik.handleChange} aria-label="Large select example">
                    <option defaultValue>Select User</option>
                    {users.map((user) => (<option key={user._id} value={user.username}>{user.username}</option>))}
                </select>
                {/* <select className="form-select form-select-lg mb-3" value={formik.values.type} id="type" name="type" onChange={formik.handleChange} aria-label="Large select example">
                    <option defaultValue>Select Leave Type</option>
                    {leaves.map((leave) => (<option key={leave.type} value={leave.type}>{leave.title}</option>))}
                </select> */}
                <select className="form-select form-select-lg mb-3" value={formik.values.leavetype} id="leavetype" name="leavetype" onChange={formik.handleChange} aria-label="Large select example">
                    <option defaultValue>Select Leave Type</option>
                    <option value="sickleave">Sick Leave</option>
                    <option value="casualleave">Casual Leave</option>
                </select>
                <div>
                    <DateRange
                        editableDateInputs={true}
                        onChange={item => setState([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                    />
                </div>
                <button className="btn btn-primary mx-2" type="submit">Submit</button>
                <Link to={'/home'} className="btn btn-secondary mx-2">Back</Link>
            </form>
        </div>
    );
}