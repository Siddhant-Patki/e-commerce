//form functions
//sign up

export const signup = async (user) => {
  try {
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Data received successfully:", data);
      return data;
    } else {
      console.error("Error during signup:", response.status);
    }
  } catch (error) {
    console.error("Error during signup:", error.message);
  }
};

//signin function
// export async function signin(userData) {
//   try {
//     const response = await fetch("http://localhost:5000/signin", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to sign in");
//     }

//     const data = await response.json();
//     alert("Signed in Successfully");
//     window.localStorage.setItem("token", data.data);
//     // window.location.href = "./";

//     return data; // Return the response data
//   } catch (error) {
//     throw error;
//   }
// }
export async function signin(userData) {
  try {
    const response = await fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    console.log(data, "UserRegister");
    if (data.status === "ok") {
      // alert("Signed in Successfully");
      window.localStorage.setItem("token", data.data);
      if (data.isAdmin) {
        console.log("Redirecting to /admin");
        window.location.href = "/admin";
      } else {
        console.log("Redirecting to /");
        window.location.href = "/";
      }
    } else {
      alert("Sign in failed: " + data.message);
    }
  } catch (error) {
    console.error("Error during sign in:", error);
    alert("An error occurred during sign in.");
  }
}

