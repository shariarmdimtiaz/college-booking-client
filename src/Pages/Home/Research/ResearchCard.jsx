import { useContext } from "react";
import { ThemeContext } from "../../../Providers/ThemeProvider";

const ResearchCard = ({index, research}) => {
    const { containerStyles } = useContext(ThemeContext);
    return (
        <div>
            <div className="card w-full border border-red-700 rounded-xl shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{index + 1}. {research.cite}</h2>                    
                </div>
            </div>
        </div>
    );
};

export default ResearchCard;