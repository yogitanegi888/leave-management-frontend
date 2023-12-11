import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchDashboard } from "../api.service";
import moment from "moment";

export function UserDashboard() {
    let params = useParams();
    let [user, setUser] = useState(null);
    useEffect(() => {
        fetchDashboard(params.userId, setUser);
    }, []);

    let loading = (
        <div className="text-center">
            <h3>Loading User Dashboard</h3>
        </div>
    );

    let formatDate = (isoDate) => {
        return moment(isoDate).format('DD-MM-YYYY');
    }


    return (
        <div>{!user ? loading :
            <>
                <div className="container container-md my-3">
                    <h3>{user.username}'s Dashboard</h3>
                    <p><strong>Department: </strong>{user.department}</p>
                    <section>
                        <div className="d-flex">
                            <div className="w-50 mx-1">
                                <h6 className="text-center">Allocated Leaves</h6>
                                <table className="table border">
                                    <thead>
                                        <tr>
                                            <th>Leave Type</th>
                                            <th>Remaining Leaves</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Casual Leave</td>
                                            <td>{user.totalCasualLeave}</td>
                                        </tr>
                                        <tr>
                                            <td>Sick Leave</td>
                                            <td>{user.totalSickleave}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="w-50 mx-1">
                                <h6 className="text-center">Applied Leaves</h6>
                                <table className="table border">
                                    <thead>
                                        <tr>
                                            <th>Leave Type</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {user.apply_leaveInfo.map(leave => (<tr key={leave._id}>
                                            <td>{leave.leavetype}</td>
                                            <td>{formatDate(leave.startdate)}</td>
                                            <td>{formatDate(leave.enddate)}</td>
                                        </tr>))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                    <Link to={'/'} className="btn btn-secondary">Back</Link>
                </div>
            </>
        }
        </div>
    );
}