import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useCallback } from "react";
import { signup } from "../../auth";
import "../../index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cnPasswordRef = useRef();
  const [msg, setMsg] = useState({
    msgType: "",
    message: "",
  });

  // focus on email when on mount
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      let errorMsg = "";

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailRef.current.value)) {
        setMsg({ msgType: "error", message: "Invalid email address" });
        emailRef.current.focus();
        return;
      }

      // Password validation
      if (passwordRef.current.value.length < 6) {
        errorMsg = "Password must be at least 6 characters long";
        passwordRef.current.focus();
      } else if (passwordRef.current.value !== cnPasswordRef.current.value) {
        errorMsg = "Passwords do not match.";
        cnPasswordRef.current.focus();
      }

      if (errorMsg) {
        setMsg({ msgType: "error", message: errorMsg });
      } else {
        try {
          const user = await signup({
            email: emailRef.current.value,
            password: passwordRef.current.value,
            cnPassword: cnPasswordRef.current.value,
          });
          toast.success("User created Successfully!")
          console.log("Register successful");
          setMsg({ msgType: "", message: "" });
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            navigate("/signin");
          }, 2000);
        } catch (error) {
          console.log("Error:", error);
          setMsg({ msgType: "error", message: "Registration failed" });
        }
      }
    },
    [navigate]
  );

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 pt-5 image-test">
        <div className="test">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 md:px-4 md:py-6">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
                <form className="space-y- md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      ref={emailRef}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white input-focus-red"
                      placeholder="name@gmail.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      ref={passwordRef}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-focus-red"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="cnPassword"
                      id="confirm-password"
                      ref={cnPasswordRef}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-focus-red"
                      required=""
                    />
                  </div>
                  {msg.msgType === "error" && (
                    <p className="red">{msg.message}</p>
                  )}
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-80"
                  >
                    Create an account
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to="/signin"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
