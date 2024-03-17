import exp from "constants";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />; // if user is not logged in then redirect to sign-in page
}
function ListingPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/employer-login" />; // if user is not logged in then redirect to sign-in page
}

export { PrivateRoute, ListingPrivateRoute };