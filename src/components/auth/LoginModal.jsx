import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginModal = ({ isOpen, onClose, onSwitchToSignUp, onLoginSuccess }) => {
  if (!isOpen) return null;

  const handleSubmit = (values, { setSubmitting, setFieldError }) => {
    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem('weatherAppUsers')) || [];
      const user = storedUsers.find(
        (u) => u.email === values.email && u.password === values.password
      );

      if (user) {
        onLoginSuccess({ username: user.username, email: user.email });
        toast.success("Successfully logged in!");
        onClose();
      } else {
        setFieldError('password', 'Invalid email or password');
        toast.error("Invalid email or password.");
      }

      setSubmitting(false);
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-center text-black mb-6">Log in</h2>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  E-Mail
                </label>
                <Field
                  type="email"
                  id="login-email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="login-password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 mt-4 bg-[#ffb36c] text-black font-semibold rounded-lg hover:bg-orange-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Logging in...' : 'Log in'}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="font-semibold text-orange-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;