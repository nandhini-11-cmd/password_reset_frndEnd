import { useParams } from "react-router";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const ResetPassword = () => {

  const { token } = useParams();
  const [message, setMessage] = useState("");

  const formik = useFormik({

    initialValues: { password: "" },
    
    validate: (values) => {
      const errors = {};
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
      return errors;
    },
   
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post(`${apiUrl}/api/auth/reset-password/${token}`, values);
        setMessage(res.data.message);

        resetForm();

      } catch (err) 
      {
        setMessage(err.response.data.message || "Something went wrong");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Reset Password</h2>

        {message && (
          <div className="mb-4 text-sm text-center text-blue-700 bg-blue-100 p-2 rounded">
            {message} </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">

          <div>

            <label className="block text-sm font-medium text-gray-700">New Password</label>

            <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange}
              onBlur={formik.handleBlur} className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a new password" />

            {formik.errors.password && formik.touched.password && (
              <div className="text-sm text-red-500 mt-1">{formik.errors.password}</div>
            )}

          </div>

          <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition">
            Reset Password
          </button>

          <Link to="/login" className="text-blue-600 hover:underline block text-center mt-4">
            Login with new password
          </Link>

        </form>
      </div>
    </div>
  );
};

export default ResetPassword;