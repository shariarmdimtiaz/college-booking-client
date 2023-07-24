import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ college }) => {
    return (
        <div>
            <div className="card w-96 border border-red-700 shadow-xl">
                <figure>
                    <img src={college.imageUrl} alt="Image" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">College Name: {college.collegeName}</h2>
                    <div>
                    <p className="flex justify-between">
                        Events:{" "}
                        <span className="font-bold">{college.events}</span>
                    </p>
                    <p>Event Date: {college.eventDate}</p>
                    </div>
                    <p>
                        Research history:{" "}
                        <span className="font-bold">{college.research }</span>
                    </p>
                    <p>
                        Sports:{" "}
                        <span className="font-bold">{college.sports}</span>
                    </p>
                    <p>
                        Admission Date:{" "}
                        <span className="font-bold">{college.admissionDate}</span>
                    </p>
                    <div className="card-actions justify-end">
                        <Link to={`/details/${college._id}`}>
                            <button className="btn btn-primary bg-red-700">Details</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;