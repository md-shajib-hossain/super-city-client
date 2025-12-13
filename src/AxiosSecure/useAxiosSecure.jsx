import React, { useEffect } from "react";
import useAuth from "../MyHooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  // const { user, logOut } = useAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
  //     config.headers.Authorization = `Bearer ${user?.accessToken}`;
  //   });
  // }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
