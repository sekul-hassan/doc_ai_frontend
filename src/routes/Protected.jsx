import React from "react";
import { Navigate } from "react-router-dom";
import {useSelector} from "react-redux";

function Protected({ element }) {

    const {token} = useSelector((state) => state.auth);

    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return element;
}

export default Protected;
