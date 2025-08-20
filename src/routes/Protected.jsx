import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ isLoggedIn, element }) {
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return element;
}

export default Protected;
