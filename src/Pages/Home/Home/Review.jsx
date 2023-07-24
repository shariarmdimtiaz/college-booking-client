import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../../../Providers/ThemeProvider';
import useAdmission from '../../../Hooks/useAdmission';
import ReviewCard from './ReviewCard';
import AOS from "aos";

const Review = () => {
    const { containerStyles } = useContext(ThemeContext);
    const [AdmissionInfo, refetch, dataLoading] = useAdmission();

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
        AOS.refresh();
    }, []);

    return (
        <div style={containerStyles}>
            <div data-aos="fade-down" className="container px-10 mx-auto">
                <h2 className="font-bold text-5xl text-center pt-[50px]">
                    Review & Feedback
                </h2>
                <div className="grid grid-cols-1 gap-4 py-[50px]">
                    {AdmissionInfo.map((info) => (
                        <ReviewCard key={info._id} info={info}></ReviewCard>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Review;