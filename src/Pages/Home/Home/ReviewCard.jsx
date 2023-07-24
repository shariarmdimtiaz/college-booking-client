import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ReviewCard = ({ info }) => {
    return (
        <div>
            <div className="card w-full bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="block">
                        <div className="avatar">
                            <div className="w-24 rounded">
                                <img src={info.image} />
                            </div>
                        </div>
                        <h2 className="card-title">{info.name}</h2>
                    </div>                    
                    <div className="flex justify-between">
                        <p> <span className="font-bold">College Name:</span> {info.collegeName}</p>
                        <div className="flex justify-center items-center py-2">
                            <Rating
                                style={{ maxWidth: 150 }}
                                value={Math.round(info?.rating || 0)}
                                readOnly
                            />
                            <p className="text-lg ps-3">{info?.rating}</p>
                        </div>
                    </div>
                    <p><span className="font-bold">Review Comments: </span>{info.review}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;