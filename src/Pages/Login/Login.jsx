import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import img from "../../assets/login.png";
import googleIcon from "../../assets/google.png";
import githubIcon from "../../assets/github.png";
import { useForm } from "react-hook-form";
import { AiFillGoogleCircle, AiFillGithub } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TabTitle } from "../../utils/GeneralFunctions";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { ThemeContext } from "../../Providers/ThemeProvider";
import { sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
  const { containerStyles } = useContext(ThemeContext);
  const emailRef = useRef();
  const { user, signIn, signInWithGoogle, signInWithGithub, passwordReset } =
    useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  TabTitle(" | Login");
  const api = {
    apiUrl: import.meta.env.VITE_APILINK,
  };
  const jwtUrl = `${api.apiUrl}/jwt`;

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;

        const loggedUser = {
          email: user.email,
        };
        fetch(jwtUrl, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loggedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("language-access-token", data.token);
            navigate(from, { replace: true });
          });
        Swal.fire({
          title: "User login successful.",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      })
      .catch((error) => console.log(error));
    reset();
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);

        const loggedUser = {
          email: user.email,
        };
        fetch(jwtUrl, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loggedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("language-access-token", data.token);
            navigate(from, { replace: true });
          });
        // Save data
        const checkUserUrl = `${api.apiUrl}/isUser/${user.email}`;
        fetch(checkUserUrl, {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem(
              "toyland-access-token"
            )}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (!data.error) {
              if (data.result === false) {
                // save user to database
                const name = user.displayName;
                const email = user.email;
                const role = "student";
                const img = user.photoURL;
                const userInfo = {
                  name,
                  email,
                  role,
                  img,
                };

                fetch(`${api.apiUrl}/addUser`, {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(userInfo),
                })
                  .then((res) => res.json())
                  .then((data) => {});
              }
            }
          });
      })
      .catch((error) => {
        //setError("Invalid email and password.");
        toast.error("Invalid email and password. Please, try again");
        //console.log(error);
      });
  };

  // const handleGithubSignIn = () => {
  //   //setError("");
  //   signInWithGithub()
  //     .then((result) => {
  //       const user = result.user;
  //       const loggedUser = {
  //         email: user.email,
  //       };
  //       //console.log(loggedUser);
  //       fetch(jwtUrl, {
  //         method: "POST",
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //         body: JSON.stringify(loggedUser),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           localStorage.setItem("language-access-token", data.token);
  //           navigate(from, { replace: true });
  //         });
  //       //console.log(loggedUser);

  //       // Save data
  //       const checkUserUrl = `${api.apiUrl}/isUser/${user.email}`;
  //       fetch(checkUserUrl, {
  //         method: "GET",
  //         headers: {
  //           authorization: `Bearer ${localStorage.getItem(
  //             "toyland-access-token"
  //           )}`,
  //         },
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           if (!data.error) {
  //             if (data.result === false) {
  //               // save user to database
  //               const name = user.displayName;
  //               const email = user.email;
  //               const role = "student";
  //               const img = user.photoURL;
  //               const userInfo = {
  //                 name,
  //                 email,
  //                 role,
  //                 img,
  //               };

  //               fetch(`${api.apiUrl}/addUser`, {
  //                 method: "POST",
  //                 headers: {
  //                   "content-type": "application/json",
  //                 },
  //                 body: JSON.stringify(userInfo),
  //               })
  //                 .then((res) => res.json())
  //                 .then((data) => {});
  //             }
  //           }
  //         });
  //     })
  //     .catch((error) => {
  //       //setError("Invalid email and password.");
  //       toast.error("Invalid email and password. Please, try again");
  //       //console.log(error);
  //     });
  // };

  const handleResetPassword = event =>{
    const email = emailRef.current.value;
    if(!email){
      toast.error("Please provide your email.");
      return;
    }

    passwordReset(email)
    .then(()=>{
      toast.info("Please check your email.");
    })
    .catch(error=>{
      toast.error(error);
    })
  }

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);


  return (
    <div style={containerStyles}>
      <Helmet>
        <title>College Booking | Login</title>
      </Helmet>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  ref={emailRef}
                  placeholder="Email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="Password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password must be less than 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one Uppercase one lower case, one number
                    and one special character.
                  </p>
                )}
              </div>
              <div className="text-right pt-3">
                <p><small>Forget password? <button onClick={handleResetPassword} className="link no-underline hover:underline hover:text-blue-700">Reset Password</button></small></p>
              </div>

              <div className="form-control mt-6">
                <input
                  className="btn btn-primary border border-indigo-700  bg-indigo-500 text-white hover:text-white hover:bg-[#5B51DE]"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <div className="flex mx-auto mt-3">
              <button
                onClick={handleGoogleSignIn}
                className="btn btn-square mx-2 btn-outline bg-white hover:bg-[#5B51DE]"
              >
                {/* <AiFillGoogleCircle /> */}
                <img src={googleIcon} alt="" />
              </button>
              {/* <button
                onClick={handleGithubSignIn}
                className="btn btn-square mx-2  btn-outline bg-white hover:bg-[#5B51DE]"
              >
                <AiFillGithub />
              </button> */}
            </div>
            <p className="my-4 text-center">
              New to Language Tutor?
              <Link className="text-[#5B51DE] font-bold mx-2" to="/signup">
                Sign Up
              </Link>
            </p>
          </div>
          <div className="text-center lg:text-left">
            <div className="py-6">
              <img className="w-full" src={img} alt="" />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
