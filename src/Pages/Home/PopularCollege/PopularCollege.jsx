import { useContext } from "react";
import { ThemeContext } from "../../../Providers/ThemeProvider";
import useCollege from "../../../Hooks/useCollege";
import Card from "./Card";


const PopularCollege = () => {
    const { containerStyles } = useContext(ThemeContext);
    const [CollegeInfo, refetch, dataLoading] = useCollege();
    const CollegeData = CollegeInfo.slice(0, 3);

    return (
        <div style={containerStyles}>
            <div data-aos="fade-left" className="container mx-auto">
                <h2 className="font-bold text-5xl text-center pt-[120px]">
                    College
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-[50px]">
                        {CollegeData.map((college) => (
                            <Card key={college._id} college={college}></Card>
                        ))}
                    </div>
            </div>
        </div>
    );
};

export default PopularCollege;