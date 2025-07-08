import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const Register = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) 
         {
            errors.email = "Email is required";
         } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) 
          {
           errors.email = "Invalid email address";
          }

      if (!values.password) 
        {
        errors.password = "Password is required";     
         } else if (values.password.length < 6)
         {
        errors.password = "Password must be at least 6 characters";
         }

      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post(`${apiUrl}/api/auth/register`, values);

        setMessage(res.data.message);

        resetForm();

        navigate("/forgot-password");

      } catch (err) {

        setMessage(err.response.data.message || "Something went wrong");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h2>       

        <form onSubmit={formik.handleSubmit} className="space-y-4">

          <div>

            <label className="block text-sm font-medium text-gray-700">Email</label>

            <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter your email" className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>

            {formik.errors.email && formik.touched.email && (
              <div className="text-sm text-red-500 mt-1">{formik.errors.email}</div>
            )}

          </div>

          <div>

            <label className="block text-sm font-medium text-gray-700">Password</label>

            <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Create a password"      className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>

            {formik.errors.password && formik.touched.password && (
              <div className="text-sm text-red-500 mt-1">{formik.errors.password}</div>
            )}

          </div>

           {message && (<div className="mb-4 text-sm text-center text-blue-700 bg-blue-100 p-2 rounded"> {message}</div> )}
           

          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition" > Register </button>

          <Link to="/login" className="text-blue-600 hover:underline ml-10">
            Already have account? Login here
          </Link>

        </form>
      </div>
    </div>
  );
};

export default Register;
