import React, { useState } from 'react'; // Import React and useState
import '../Dashboard.css';
import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect } from 'react'; // Remove unnecessary import
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export function UserDashBoard() {
    const [cookies, , removeCookie] = useCookies(['userid']);
    const [appointments, setAppointments] = useState([
        { Appointment_Id: 0, Title: '', Description: '', Date: '' },
    ]);
    const [editTasks, setEditTasks] = useState([]); // Declare state for editTasks

    let navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:7000/appointments/${cookies['userid']}`)
            .then((response) => {
                setAppointments(response.data);
            });
    }, [cookies]);

    function handleSignout() {
        removeCookie('userid');
        navigate('/login');
    }

    function handleCloseClick(e) {
        axios.delete(`http://127.0.0.1:7000/delete-task/${e.target.name}`).then(() => {
            alert('Appointment Deleted');
            // Update state without reloading the page
            setAppointments((prevAppointments) =>
                prevAppointments.filter((appointment) => appointment.Appointment_Id !== e.target.name)
            );
        });
    }

    const formik = useFormik({
        initialValues: {
            Appointment_Id: 0,
            Title: '',
            Description: '',
            Date: '',
            UserId: cookies['userid'],
        },
        onSubmit: (task) => {
            axios.post('http://127.0.0.1:7000/add-task', task);
            alert('Task Added Successfully..');
            // Update state without reloading the page
            setAppointments((prevAppointments) => [...prevAppointments, task]);
        },
    });

    const handleEditClick = (id) => {
        axios.get(`http://127.0.0.1:7000/get-task/${id}`).then((response) => {
            setEditTasks(response.data);
        });
    };

    const editFormik = useFormik({
        initialValues: {
            Appointment_Id: editTasks[0]?.Appointment_Id || 0,
            Title: editTasks[0]?.Title || '',
            Description: editTasks[0]?.Description || '',
            Date: editTasks[0]?.Date || '',
            UserId: editTasks[0]?.UserId || '',
        },
        onSubmit: (task) => {
            axios
                .put(`http://127.0.0.1:7000/edit-task/${task.Appointment_Id}`, task)
                .then(() => {
                    alert('Task Edited Successfully..');
                    // Update state without reloading the page
                    setAppointments((prevAppointments) =>
                        prevAppointments.map((appointment) =>
                            appointment.Appointment_Id === task.Appointment_Id ? task : appointment
                        )
                    );
                    // Close the modal
                    document.getElementById('editTask').click(); // Simulate a click on the modal close button
                })
                .catch((error) => {
                    console.error('Error editing task:', error);
                });
        },
        enableReinitialize: true,
    });


    return (
        <div className="bg-light p-4" style={{ height: '100vh', width: '100%' }}>
            <div className="d-flex justify-content-between mb-3">
                <h2 class="text-3d">Your Appointments</h2>




                <button onClick={handleSignout} className="btn btn-warning">
                    <span className="bi bi-box-arrow-left me-1"></span> Signout
                </button>
            </div>

            <div className="mb-3">
                <button
                    data-bs-target="#addTask"
                    data-bs-toggle="modal"
                    className="btn btn-success btn-lg bi bi-plus-circle"
                    style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                >
                    &nbsp; Add Appointment
                </button>


                <div className="modal  fade" id="addTask" >
                    <div className="modal-dialog  modal-dialog-centered" >
                        <div className="modal-content custom-modal"  >
                            <div className="modal-header">
                                <h2 className="modal-title" >Add Appointment</h2>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className=" modal-body" >
                                <form className="custom-form" onSubmit={formik.handleSubmit} style={{
                                    backgroundImage: "linear-gradient(to bottom, #3498db, #e74c3c)",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <div className="mb-3">
                                        <label htmlFor="Appointment_Id" className="form-label">
                                            Appointment Id
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Appointment_Id"
                                            name="Appointment_Id"
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Title" className="form-label">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Title"
                                            name="Title"
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Description" className="form-label">
                                            Description
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="Description"
                                            name="Description"
                                            rows="4"
                                            onChange={formik.handleChange}
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Date" className="form-label">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="Date"
                                            name="Date"
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    <button type="submit" className="fw-bold text-dark btn btn-warning">
                                        Add Task
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                appointments.map((appointment) => (
                    <div key={appointment.Appointment_Id} className="alert alert-success alert-dismissible">
                        <button name={appointment.Appointment_Id} className="btn btn-close" data-bs-dismiss="alert" onClick={handleCloseClick}></button>
                        <h2>{appointment.Title}</h2>
                        <p>{appointment.Description}</p>
                        <p>{appointment.Date}</p>
                        <button onClick={() => handleEditClick(appointment.Appointment_Id)} data-bs-target="#editTask" data-bs-toggle="modal" className="btn btn-warning bi bi-pen-fill"> &nbsp;Edit</button>
                    </div>))
            }

            <div className="modal fade" id="editTask">
                <div className="modal-dialog bg-light">
                    <div className="modal-header">
                        <h2>Edit Task</h2>
                        <button className="btn btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body" style={{
                        backgroundImage: "linear-gradient(to bottom, #3498db, #e74c3c)",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <form onSubmit={editFormik.handleSubmit} >
                            <dl>
                                <dt>Title</dt>
                                <dd>
                                    <input
                                        type="text"
                                        name="Title"
                                        value={editFormik.values.Title}
                                        onChange={editFormik.handleChange}
                                    />
                                </dd>
                                <dt>Description</dt>
                                <dd>
                                    <textarea
                                        name="Description"
                                        cols="40"
                                        rows="4"
                                        value={editFormik.values.Description}
                                        onChange={editFormik.handleChange}
                                    ></textarea>
                                </dd>
                                <dt>Date</dt>
                                <dd>
                                    <input
                                        type="date"
                                        name="Date"
                                        value={editFormik.values.Date}
                                        onChange={editFormik.handleChange}
                                    />
                                </dd>
                            </dl>
                            <button type="submit" className="btn btn-success">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
