import { useContext } from "react";
import useCollege from "../../Hooks/useCollege";
import { ThemeContext } from "../../Providers/ThemeProvider";
import CollegeCard from "./CollegeCard";
import { Helmet } from "react-helmet";

const College = () => {
    const { containerStyles } = useContext(ThemeContext);
    const [CollegeInfo, refetch, dataLoading] = useCollege();
    return (
        <div style={containerStyles}>
            <Helmet>
                <title>College Booking | College</title>
            </Helmet>
            <div data-aos="fade-left" className="container px-10 mx-auto">
                <h2 className="font-bold text-5xl text-center pt-[50px]">
                    All College
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-[50px]">
                    {CollegeInfo.map((college) => (
                        <CollegeCard key={college._id} college={college}></CollegeCard>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default College;