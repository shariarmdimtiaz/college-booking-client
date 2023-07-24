import { useContext } from "react";
import { ThemeContext } from "../../../Providers/ThemeProvider";

const GalleryCard = ({ college }) => {
    const { groupImg } = college;
    const { containerStyles } = useContext(ThemeContext);

    return (
        <div style={containerStyles}>
            <div className="carousel-item h-full border-2 border-red-500 rounded-xl">
                <img className="rounded-xl" src={groupImg} />
            </div>
        </div>
    );
};

export default GalleryCard;