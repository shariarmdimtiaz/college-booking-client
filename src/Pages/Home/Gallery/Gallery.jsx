import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../../../Providers/ThemeProvider';
import useCollege from '../../../Hooks/useCollege';
import AOS from "aos";
import "aos/dist/aos.css";
import GalleryCard from './GalleryCard';


const Gallery = () => {
    const { containerStyles } = useContext(ThemeContext);
    const [CollegeInfo, refetch, dataLoading] = useCollege();
    const CollegeData = CollegeInfo.slice(0, 6);

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
        AOS.refresh();
    }, []);

    return (
        <div style={containerStyles}>
            <div data-aos="fade-right" className="container mx-auto">
                <div style={containerStyles}>
                    <h2 className="font-bold text-5xl text-black text-center pt-[120px]">
                        Gallery
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-[50px] mx-auto">
                        {CollegeData.map((college) => (
                            <GalleryCard key={college._id} college={college}></GalleryCard>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;