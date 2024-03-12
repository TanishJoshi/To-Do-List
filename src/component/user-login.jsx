import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function UserLogin() {
    const [users, setUsers] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies('userid');
    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://127.0.0.1:7000/users')
            .then(response => {
                setUsers(response.data);
            });
    }, []);

    const formik = useFormik({
        initialValues: {
            UserId: '',
            Password: ''
        },
        onSubmit: (formdata) => {
            var userdetails = users.find(user => user.UserId === formdata.UserId);
            if (userdetails && userdetails.Password === formdata.Password) {
                setCookie('userid', formdata.UserId);
                navigate('/dashboard');
                window.location.reload();
            } else {
                navigate('/invalid');
            }
        }
    });

    return (
        <div className="container p-3">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={formik.handleSubmit} className="custom-form p-4 rounded shadow" style={{
                        backgroundImage: "linear-gradient(to bottom, #3498db, #e74c3c)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px",
                        borderRadius: "10px"
                    }}>
                        <h2 className="text-center mb-3 text-light unique-heading">User Login</h2>
                        <div className="form-group mb-3">
                            <input
                                type="text"
                                className="form-control border-bottom-2 text-dark"
                                id="UserId"
                                name="UserId"
                                onChange={formik.handleChange}
                                value={formik.values.UserId}
                                placeholder="User ID"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="password"
                                className="form-control border-bottom-2 text-dark"
                                id="Password"
                                name="Password"
                                onChange={formik.handleChange}
                                value={formik.values.Password}
                                placeholder="Password"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block text-dark fw-bold btn-gradient">
                            Log In
                        </button>
                        <div className="text-center mt-2">
                            <small className="text-light">
                                Don't have an account? <a href="/register" className="link-light">Register here</a>
                            </small>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
