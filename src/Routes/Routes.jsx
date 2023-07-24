import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ErrorPage from "../Pages/Shared/ErrorPage";
import PrivateRoute from "../Routes/PrivateRoute";
import College from "../Pages/College/College";
import Admission from "../Pages/Admission/Admission";
import MyCollege from "../Pages/MyCollege/MyCollege";
import AdmissionForm from "../Pages/Admission/AdmissionForm";
import Review from "../Pages/Feedback/Feedback";
import Feedback from "../Pages/Feedback/Feedback";
import CollegeDetails from "../Pages/College/CollegeDetails";

const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "college",
        element: <College></College>,
      },
      {
        path: "details/:id",
        element: (
          <PrivateRoute>
            <CollegeDetails ></CollegeDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`${api.apiUrl}/collegeDetails/${params.id}`),
      },
      {
        path: "admission",
        element: <Admission></Admission>,
      },
      {
        path: "applyCollege/:id",
        element: (
          <PrivateRoute>
            <AdmissionForm ></AdmissionForm>
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`${api.apiUrl}/subjects/${params.id}`),
      },
      {
        path: "mycollege",
        element: (
          <PrivateRoute>
            <MyCollege></MyCollege>
          </PrivateRoute>
        ),
      },
      {
        path: "feedback/:id",
        element: (
          <PrivateRoute>
            <Feedback></Feedback>
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`${api.apiUrl}/myEnrolledCollege/${params.id}`),
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

export default router;
