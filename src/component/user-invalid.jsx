import { Link } from "react-router-dom";


export function UserInvalid() {
    return (
        <div className="alert alert-danger text-center p-4" role="alert">
            <h3 className="text-danger mb-3">Invalid Credentials</h3>
            <p className="text-dark">It seems like the provided credentials are invalid. Please try again.</p>
            <Link to="/login" className="btn btn-warning mt-3">Try Again</Link>
        </div>
    )
}