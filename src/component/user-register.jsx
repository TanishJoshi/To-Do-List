import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";


export function UserRegister() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            UserId: '',
            UserName: '',
            Password: '',
            Mobile: '',
            Email: ''
        },
        onSubmit: (user) => {
            axios.post('http://127.0.0.1:7000/register-user', user);
            alert('Register Successfully..');
            navigate('/login');
        }
    });

    return (
        <div className="container p-3 ">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <form onSubmit={formik.handleSubmit} className="custom-form p-4 rounded shadow" style={{
                        backgroundImage: "linear-gradient(to bottom, #3498db, #e74c3c)",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <h2 className="text-center mb-4 font-weight-bold text-dark">Register User</h2>

                        <div className="form-group mb-3  ">
                            <input
                                placeholder="UserID"
                                type="text"
                                className={`form-control custom-input ${formik.touched.UserId && formik.errors.UserId ? 'is-invalid' : ''}`}
                                name="UserId"
                                onChange={formik.handleChange}
                                value={formik.values.UserId}
                            />
                            {formik.touched.UserId && formik.errors.UserId && (
                                <div className="invalid-feedback">{formik.errors.UserId}</div>
                            )}
                        </div>

                        <div className="form-group mb-3">
                            <input
                                placeholder="UserName"
                                type="text"
                                className={`form-control custom-input ${formik.touched.UserName && formik.errors.UserName ? 'is-invalid' : ''}`}
                                name="UserName"
                                onChange={formik.handleChange}
                                value={formik.values.UserName}
                            />
                            {formik.touched.UserName && formik.errors.UserName && (
                                <div className="invalid-feedback">{formik.errors.UserName}</div>
                            )}
                        </div>

                        <div className="form-group mb-3">
                            <input
                                placeholder="Password"
                                type="password"
                                className={`form-control custom-input ${formik.touched.Password && formik.errors.Password ? 'is-invalid' : ''}`}
                                name="Password"
                                onChange={formik.handleChange}
                                value={formik.values.Password}
                            />
                            {formik.touched.Password && formik.errors.Password && (
                                <div className="invalid-feedback">{formik.errors.Password}</div>
                            )}
                        </div>

                        <div className="form-group mb-3">
                            <input
                                placeholder="Mobile"
                                type="text"
                                className={`text-dark form-control custom-input ${formik.touched.Mobile && formik.errors.Mobile ? 'is-invalid' : ''}`}
                                name="Mobile"
                                onChange={formik.handleChange}
                                value={formik.values.Mobile}
                            />
                            {formik.touched.Mobile && formik.errors.Mobile && (
                                <div className="invalid-feedback">{formik.errors.Mobile}</div>
                            )}
                        </div>

                        <div className="form-group mb-3">
                            <input
                                placeholder="Email"
                                type="email"
                                className={`form-control custom-input ${formik.touched.Email && formik.errors.Email ? 'is-invalid' : ''}`}
                                name="Email"
                                onChange={formik.handleChange}
                                value={formik.values.Email}
                            />
                            {formik.touched.Email && formik.errors.Email && (
                                <div className="invalid-feedback">{formik.errors.Email}</div>
                            )}
                        </div>

                        <button type="submit" className="btn btn-custom btn-block mt-1">
                            Submit
                        </button>
                    </form >

                </div>
            </div>
        </div>

    );
}
