import React from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/common/Header";
import { useSelector } from "react-redux";
import BackButton from "../components/common/BackButton";
import TopScroller from "../components/common/TopScroller";

const Private = ({ children }) => {
    const { token } = useSelector(state => state.authReducer)
    if (!token) {
        return <Navigate to="/login" />;
    }
    return <>
        <Header />
        <BackButton />
        <div style={{ height: "100vh" }}>
            <TopScroller />
            {children}
        </div>
    </>;
};

export default Private;