import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router";

const Login = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Password is required";
      }

      return errors;
    },
    onSubmit: async (values, { resetForm }) =>
         {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/login", values);

        setMessage(res.data.message || "Login successful");

        resetForm();

      } catch (err)
       {
        setMessage(err.response?.data?.message || "Invalid credentials");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>       

        <form onSubmit={formik.handleSubmit} className="space-y-4">

          <div>

            <label className="block text-sm font-medium text-gray-700">Email</label>

            <input type="email" name="email" autoComplete="email" value={formik.values.email}
              onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {formik.errors.email && formik.touched.email && ( 
                <div className="text-sm text-red-500 mt-1">{formik.errors.email}</div>
            )}  </div>

          <div>

            <label className="block text-sm font-medium text-gray-700">Password</label>

            <input type="password"  name="password" autoComplete="current-password" value={formik.values.password}
              onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {formik.errors.password && formik.touched.password && (
              <div className="text-sm text-red-500 mt-1">{formik.errors.password}</div>
            )}
          </div>

           {message && (
          <div className="mb-4 text-sm text-center text-blue-700 bg-blue-100 p-2 rounded">
            {message}
          </div>
        )}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
            Login
          </button>

        </form>

        <p className="text-sm text-center mt-4">            
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </p>
        
      </div>
    </div>
  );
};

export default Login;
