import React, { useContext } from 'react';
import { ThemeContext } from '../../Providers/ThemeProvider';
import { useLoaderData } from 'react-router-dom';

const CollegeDetails = () => {
    const collegeDetails = useLoaderData();
    const { containerStyles } = useContext(ThemeContext);

    return (
        <div style={containerStyles}>
            <div className="container mx-auto px-10">
                <div className='mx-auto'>
                    <img className="w-full" src={collegeDetails.imageUrl} alt="" />

                </div>
                <div className="py-12 font-normal">
                    <p><span className="font-bold py-2">College Name: </span>{collegeDetails.collegeName}</p>
                    <p><span className="font-bold py-2">Admission Date: </span>{collegeDetails.admissionDate}</p>
                    <p><span className="font-bold py-2">College Details: </span>{collegeDetails.details}</p>

                    <div className="flex justify-between">
                        <p><span className="font-bold py-2">Event: </span> {collegeDetails.events}</p>
                        <p><span className="font-bold py-2">Event Date: </span> {collegeDetails.eventDate}</p>                        
                    </div>
                    <p><span className="font-bold py-2">Event Details: </span>{collegeDetails.eventDetails}</p>
                    <p><span className="font-bold py-2">Sports: </span>{collegeDetails.sports}</p>
                    <p><span className="font-bold py-2">Sports Details: </span>{collegeDetails.sportDetails}</p>
                    <p><span className="font-bold py-2">Research Topics: </span>{collegeDetails.research}</p>
                    <p><span className="font-bold py-2">Research Details: </span>{collegeDetails.researchDetails}</p>
                </div>
            </div>
        </div>
    );
};

export default CollegeDetails;