import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import { ThemeContext } from "../../Providers/ThemeProvider";
import Swal from "sweetalert2";

const Feedback = () => {
    const myCollegeInfo = useLoaderData();
    const { user } = useContext(AuthContext);
    const { containerStyles } = useContext(ThemeContext);

    const apiUrl = import.meta.env.VITE_APILINK;

    const handleFeedback = (event) => {
        event.preventDefault();

        const form = event.target;
        const review = form.feedback.value;
        const rating = parseFloat(form.rating.value);

        const info = {
            review,
            rating,
        };

        fetch(`${apiUrl}/feedback/${myCollegeInfo._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(info),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    form.reset();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your feedback has been saved!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    return (
        <div style={containerStyles}>
            <div className="container px-10 mx-auto">
                <h1 className="text-3xl text-center font-semibold my-4">
                    Feedback
                </h1>

                <div className="text-center">
                    <p>College Name: {myCollegeInfo.collegeName}</p>
                    <p>Subject: {myCollegeInfo.subject}</p>
                </div>
                <div>
                    <form onSubmit={handleFeedback}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Feedback</span>
                            </label>
                            <input
                                type="text"
                                name="feedback"
                                placeholder="Write your feedback"
                                className="input input-bordered input-info"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Rating</span>
                            </label>
                            <input
                                type="number"
                                min="0.0"
                                step="0.1"
                                max="5.0"
                                name="rating"
                                placeholder="Write your feedback"
                                className="input input-bordered input-info"
                            />
                        </div>
                        <div className="form-control">
                            <input
                                className="btn btn-primary text-white text-lg bg-[#198AB7] btn-block border-0 hover:bg-[#136F95]"
                                type="submit"
                                value="Send Feedback"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Feedback;