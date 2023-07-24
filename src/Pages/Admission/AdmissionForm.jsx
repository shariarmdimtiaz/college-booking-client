import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ThemeContext } from '../../Providers/ThemeProvider';
import useSubject from '../../Hooks/useSubject';
import { useForm } from 'react-hook-form';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from '../../Providers/AuthProviders';
import Swal from "sweetalert2";


const apiUrl = import.meta.env.VITE_APILINK;

const AdmissionForm = () => {
    const subjects = useLoaderData();
    const {user} = useContext(AuthContext);
    const subjectOption = subjects.map(subjectObj => subjectObj.subject);
    const defaultOption = subjectOption[0];
    const [selectedOption, setSelectedOption] = useState('');
    const { containerStyles } = useContext(ThemeContext);
    const collegeName = subjects[0]?.college;
    const [dobDate, setDobDate] = useState(new Date());
    //const [SubjectInfo, refetch, dataLoading] = useSubject();


    const handleDropdownChange = (selected) => {
        setSelectedOption(selected.value);
    };

    const handleApply = (event) => {
        event.preventDefault();

        const form = event.target;
        const collegeName = form.collegeName.value;
        const subject = selectedOption;
        const email = form.email.value;
        const name = form.name.value;
        const phone = form.phone.value;
        const address = form.address.value;
        const dob = dobDate;
        const image = form.photoUrl.value;
        const review = "";
        const rating = parseFloat("0"); 

        const admission = {
            collegeName,
            subject,
            email,
            name,
            phone,
            address,
            dob,
            image,
            review,
            rating,
        };


        fetch(`${apiUrl}/apply`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(admission),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    form.reset();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your data has been saved!',
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            });
    };

    return (
        <div style={containerStyles}>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col">
                    <div>
                        <h1 className="font-bold text-5xl text-center pt-[50px]">
                            Admission Form
                        </h1>
                    </div>
                    <div className="card flex-shrink-0 w-[150%] max-w-xl shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleApply}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">College Name *</span>
                                    </label>
                                    <input type="text" name="collegeName" defaultValue={collegeName} placeholder="College name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Subject *</span>
                                    </label>
                                    <Dropdown
                                        options={subjectOption}                                        
                                        onChange={handleDropdownChange}
                                        value={selectedOption}
                                        placeholder="Select an option"
                                        required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Candidate Email *</span>
                                    </label>
                                    <input type="text" name="email" placeholder="Email" defaultValue={user.email} className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Candidate Name *</span>
                                    </label>
                                    <input type="text" name="name" defaultValue={user.displayName} placeholder="Name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Phone Number</span>
                                    </label>
                                    <input type="text" name="phone" placeholder="Phone" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Address</span>
                                    </label>
                                    <input type="text" name="address" placeholder="Address" className="input input-bordered" />
                                </div>
                                <div className="flex justify-start items-center">
                                    <label className="label">
                                        <span className="label-text">Date of Birth: </span>
                                    </label>
                                    <DatePicker selected={dobDate} onChange={(date) => setDobDate(date)} />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="text" name="photoUrl" placeholder="URL" className="input input-bordered" />
                                </div>

                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdmissionForm;