import { Link } from "react-router-dom";

const AdmissionCard = ({ college }) => {
    return (
        <div>
            <div className="card w-full border border-red-700 rounded-xl shadow-xl">
                <div className="card-body">
                    
                    <p className="card-title">{college.collegeName}</p>
                    <p className="">Admission Date: <span className="font-bold">{college.admissionDate}</span></p>
                    <div className="card-actions justify-end">
                        <Link to={`/applyCollege/${college._id}`}>
                            <button className="btn btn-primary">Apply</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdmissionCard;