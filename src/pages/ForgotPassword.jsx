import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";

const ForgotPassword = () => {
  const [message, setMessage] = useState("");

  const formik = useFormik({

    initialValues: { email: "" },
   
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }
      return errors;
    },
   
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/forgot-password", values);
        setMessage(res.data.message);
        resetForm();
      } catch (err) {
        setMessage(err.response.data.message || "Something went wrong");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">

        <h2 className="text-xl font-bold text-center text-gray-800 mb-6">          
          Change password | Forgot Password
        </h2>

        {message && (
          <div className="mb-4 text-sm text-center text-blue-700 bg-blue-100 p-2 rounded">
            {message}</div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">

          <div>

            <label className="block text-sm font-medium text-gray-700">Email</label>

            <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange}
              onBlur={formik.handleBlur} className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your registered email" />

            {formik.errors.email && formik.touched.email && (
              <div className="text-sm text-red-500 mt-1">{formik.errors.email}</div>
            )}

          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
            Send Reset Link
          </button>

        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;