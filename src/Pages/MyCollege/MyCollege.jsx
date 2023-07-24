import { useContext } from "react";
import useMyCollege from "../../Hooks/useMyCollege";
import { ThemeContext } from "../../Providers/ThemeProvider";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const apiUrl = import.meta.env.VITE_APILINK;
const MyCollege = () => {
    const [MyCollegeInfo, refetch, dataLoading] = useMyCollege();
    const { containerStyles } = useContext(ThemeContext);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${apiUrl}/deleteMyCollege/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire("Deleted!", "Your college information has been deleted.", "success");
                        }
                    });
            }
        });
    };

    return (
        <div style={containerStyles}>
            <div className="w-full">
                <h3 className="text-3xl text-center font-semibold py-4">
                    My Enrolled College
                </h3>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th style={containerStyles}>#</th>
                                <th style={containerStyles}>Image</th>
                                <th style={containerStyles}>College Name</th>
                                <th style={containerStyles}>Subject</th>
                                <th style={containerStyles}>Email</th>
                                <th style={containerStyles}>Name</th>
                                <th style={containerStyles}>Phone</th>
                                <th style={containerStyles}>Address</th>
                                <th style={containerStyles}>Date of Borth</th>
                                <th style={containerStyles}>Feedback</th>
                                <th style={containerStyles}>Delete</th>
                            </tr>
                        </thead>
                        <tbody style={containerStyles}>
                            {MyCollegeInfo.map((collegeInfo, index) => (
                                <tr key={collegeInfo._id}>
                                    <th style={containerStyles}>{index + 1}</th>
                                    <td style={containerStyles}>
                                        <div className="avatar">
                                            <div className="w-24 rounded">
                                                <img src={collegeInfo.image} />
                                            </div>
                                        </div>
                                    </td>
                                    <td style={containerStyles}>{collegeInfo.collegeName}</td>
                                    <td style={containerStyles}>{collegeInfo.subject}</td>
                                    <td style={containerStyles}>{collegeInfo.email}</td>
                                    <td style={containerStyles}>{collegeInfo.name}</td>
                                    <td style={containerStyles}>{collegeInfo.phone}</td>
                                    <td style={containerStyles}>{collegeInfo.address}</td>
                                    <td style={containerStyles}>{collegeInfo.dob.substring(0, 10)}</td>
                                    <td style={containerStyles}>
                                        <Link to={`/feedback/${collegeInfo._id}`}>
                                            <button
                                                className="btn btn-ghost bg-blue-600  text-white"
                                            >

                                                <AiOutlineEdit></AiOutlineEdit>
                                            </button> 
                                        </Link>
                                    </td>
                                    <td style={containerStyles}>
                                        <button
                                            onClick={() => handleDelete(collegeInfo._id)}
                                            className="btn btn-ghost bg-red-600  text-white"
                                        >
                                            <FaTrashAlt></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyCollege;