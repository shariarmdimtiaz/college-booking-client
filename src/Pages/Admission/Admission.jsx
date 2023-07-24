import { useContext } from "react";
import { ThemeContext } from "../../Providers/ThemeProvider";
import useCollege from "../../Hooks/useCollege";
import { Helmet } from "react-helmet";
import AdmissionCard from "./AdmissionCard";

const Admission = () => {
    const { containerStyles } = useContext(ThemeContext);
    const [CollegeInfo, refetch, dataLoading] = useCollege();
    return (
        <div style={containerStyles}>
        <Helmet>
            <title>College Booking | Admission</title>
        </Helmet>
        <div data-aos="fade-left" className="container px-10 mx-auto">
            <h2 className="font-bold text-5xl text-center pt-[50px]">
                Admission
            </h2>
            <div className="grid grid-cols-1 gap-4 py-[50px]">
                {CollegeInfo.map((college) => (
                    <AdmissionCard key={college._id} college={college}></AdmissionCard>
                ))}
            </div>
        </div>
    </div>
    );
};

export default Admission;