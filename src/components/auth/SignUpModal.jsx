import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Username is too short!')
    .max(50, 'Username is too long!')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignUpModal = ({ isOpen, onClose, onSwitchToLogin, onRegisterSuccess }) => {
  if (!isOpen) return null;

  const handleModalContentClick = (e) => e.stopPropagation();

  const handleSubmit = (values, { setSubmitting, setFieldError }) => {
    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem('weatherAppUsers')) || [];
      const isEmailTaken = storedUsers.some(user => user.email === values.email);

      if (isEmailTaken) {
        setFieldError('email', 'This email is already registered.');
        toast.error("This email is already registered.");
        setSubmitting(false);
        return;
      }

      const newUser = {
        username: values.username,
        email: values.email,
        password: values.password,
      };
      
      const updatedUsers = [...storedUsers, newUser];
      localStorage.setItem('weatherAppUsers', JSON.stringify(updatedUsers));
      onRegisterSuccess({ username: newUser.username, email: newUser.email });
      toast.success("Registration successful!");
      onClose();
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
        onClick={handleModalContentClick}
      >
        <h2 className="text-2xl font-bold text-center text-black mb-6">Sign Up</h2>

        <Formik
          initialValues={{ username: '', email: '', password: '' }}
          validationSchema={SignUpSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {[
                { label: 'Username', name: 'username', type: 'text', placeholder: 'Enter your username' },
                { label: 'E-Mail', name: 'email', type: 'email', placeholder: 'Enter your email' },
                { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password' },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name}>
                  <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                  </label>
                  <Field
                    type={type}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
                </div>
              ))}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 mt-4 bg-[#ffb36c] text-black font-semibold rounded-lg hover:bg-orange-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Registering...' : 'Sign Up'}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-sm text-gray-600 mt-6">Already have an account? <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-semibold text-orange-600 hover:underline">Log In</button>
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;