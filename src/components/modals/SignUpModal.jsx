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
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm relative"
        onClick={handleModalContentClick}
      >
        <button 
          type="button" 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <h2 className="text-2xl text-center mb-6 font-family-montserrat-alternates font-medium text-[20px] text-black">Sign Up</h2>

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
                  <label htmlFor={name} className="block text-sm mb-2 font-family-montserrat font-medium text-[14px] text-black">
                    {label}
                  </label>
                  <Field
                    type={type}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 font-family-montserrat font-medium text-[12px] text-[#ababab]"
                  />
                  <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
                </div>
              ))}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 mt-4 bg-[#ffb36c] rounded-lg hover:bg-orange-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-family-montserrat font-normal text-[14px] text-black"
              >
                {isSubmitting ? 'Registering...' : 'Sign Up'}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-sm mt-6 font-family-montserrat font-medium text-[12px] text-black">Already have an account? <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-semibold text-orange-600 hover:underline">Log In</button>
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;