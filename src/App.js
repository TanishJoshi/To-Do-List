
// import './App.css';
// import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
// import { UserLogin } from './component/user-login';
// import { UserRegister } from './component/user-register';



// function App() {
//   return (
//     <div className="container-fluid">
//       <div className='bg-shade'>
//         <BrowserRouter>
//           <header className='text-center'>
//             <h1 className="text-white fw-bold ">To-Do-List</h1>
//             <p className='text-white'>Your Appointment Organizer</p>
//             <Link to="/login" className='btn btn-warning fw-bold btn-lg m-2'>Existing User SignIn</Link>
//             <Link to="/register" className='btn btn-light fw-bold btn-lg m-2'>New User Register</Link>
//           </header>
//           <section className='d-flex justify-content-center p-4 align-items-center' style={{ height: '100vh' }}>

//             <Routes>
//               <Route path='login' element={<UserLogin />} />
//               <Route path='register' element={<UserRegister />} />
//             </Routes>

//           </section>




//         </BrowserRouter>
//       </div>
//     </div>

//   );
// }

// export default App;




import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { useCookies } from 'react-cookie';
import { UserLogin } from './component/user-login';
import { UserRegister } from './component/user-register';
import { UserDashBoard } from './component/user-dashboard';
import { UserInvalid } from './component/user-invalid';

function App() {
  const [cookies] = useCookies('userid');

  return (
    <div className="container-fluid">
      <div className="bg-shade">
        <BrowserRouter>
          <header className="text-center p-2 text-white sticky-top">
            <div className="container d-flex flex-column align-items-center justify-content-center">
              <h1 style={{ fontFamily: 'cursive', fontSize: '2.5em', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                <span role="img" aria-label="clipboard">&#x1F4CB;</span> TO-DO-LIST
              </h1>
              <p className="lead p=0">Your Personal Appointments Organizer</p>
              {cookies['userid'] === undefined ? (
                <div className="button-container mt-2 mb-2">
                  <Link to="/login" className="btn btn-warning me-2 custom-btn fw-bold">
                    <span className="bi bi-box-arrow-in-right me-2"></span>Get Started
                  </Link>
                  <Link to="/register" className="btn btn-light ms-2 custom-btn fw-bold">
                    <span className="bi bi-person-plus-fill me-2"></span>Create Account
                  </Link>
                </div>
              ) : (
                <div className="user-info bg-info-subtle fw-bold text-dark bg-light p-2 mt-2 rounded">
                  <span className="text-dark fw-bold bi bi-person-fill me-2"></span>Hello, {cookies['userid']}!
                </div>
              )}
            </div>
          </header>




          <section className='d-flex p-4 justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
            <Routes>
              <Route path='login' element={<UserLogin />} />
              <Route path='register' element={<UserRegister />} />
              <Route path='dashboard' element={<UserDashBoard />} />
              <Route path='invalid' element={<UserInvalid />} />
            </Routes>
          </section>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
