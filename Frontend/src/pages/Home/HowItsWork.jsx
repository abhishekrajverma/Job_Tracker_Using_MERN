import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import  "../../assets/css/Main.css";

const HowItWorks = () => {
    return (
        <>
            <div className="howitworks uppercase content-center">
                <div className="container">
                    <h3 className="text-5xl">How jobHunter Works</h3>
                    <div className="banner">
                        <div className="card">
                            <FaUserPlus />
                            <p>Create Account</p>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                Consequuntur, culpa.
                            </p>
                        </div>
                        <div className="card">
                            <MdFindInPage />
                            <p>Find a Job/Post a Job</p>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                Consequuntur, culpa.
                            </p>
                        </div>
                        <div className="card">
                            <IoMdSend />
                            <p>Apply For Job/Recruit Suitable Candidates</p>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                Consequuntur, culpa.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HowItWorks;