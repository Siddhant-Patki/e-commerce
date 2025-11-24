import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../../auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signin() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  // const emailRef = useRef();
  // const passwordRef = useRef();
  const [msg, setMsg] = useState({
    msgType: "",
    message: "",
  });

  // Focus on email when component mounts
  // useEffect(() => {
  //   emailRef.current.focus();
  // }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Memoize validation logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call signin function from auth module
      const user = await signin(userData);
      console.log("Signed in user:", user);
      // navigate('/dashboard');
      // setAuthenticated(true);
      // toast.success("Signed in Successfully!")
    } catch (error) {
      // toast.danger("Invalid credentials!")
      console.error("Signin error:", error);
      setMsg({ msgType: "error", message: "Invalid email or password" });
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 pt-10 image-sigin">
        <div className="test">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0 md:px-4 md:py-6">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Log In your Account
                </h1>
                <form className="space-y- md:space-y-6" action="#">
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
                      value={userData.email}
                      onChange={handleInput}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                      value={userData.password}
                      onChange={handleInput}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-80"
                  >
                    Sign In
                  </button>
                  {msg.msgType === "error" && (
                    <p className="text-red-500">{msg.message}</p>
                  )}
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    New User?{" "}
                    <Link
                      to="/signup"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
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

export default Signin;
