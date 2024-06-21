
import { useState } from 'react';
import axios from 'axios';

const CustomerForm = ({ onCustomerAdded }) => {
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
    organization: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the field is nested (like address), handle it properly
    if (name.includes('.')) {
      const [outerKey, innerKey] = name.split('.');
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        [outerKey]: {
          ...prevCustomer[outerKey],
          [innerKey]: value,
        },
      }));

    } else {
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/customers', customer);
      onCustomerAdded(response.data);
      // Clear form after successful submission
      setCustomer({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: {
          street: '',
          city: '',
          state: '',
          zip: '',
        },
        organization: '',
      });
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-2 flex-wrap">
      <form className="p-8 rounded shadow-md w-full max-w-lg bg-orange-400" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-6 text-center font-bold text-gray-700">Create Customer</h2>
        
        <div className="name_container flex space-x-2">
          <label className="block mb-4 w-1/2">
            <span className="block text-gray-700 font-serif">First Name:</span>
            <input 
              name="firstName" 
              value={customer.firstName} 
              onChange={handleChange} 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500" 
            />
          </label>
          <label className="block mb-4 w-1/2">
            <span className="block text-gray-700 font-serif">Last Name:</span>
            <input 
              name="lastName" 
              value={customer.lastName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500" 
            />
          </label>
        </div>

        <div className="contactdetails flex space-x-2">
          <label className="block mb-4 w-1/2">
            <span className="block text-gray-700 font-serif">Email:</span>
            <input 
              name="email" 
              value={customer.email} 
              onChange={handleChange} 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500" 
            />
          </label>
          <label className="block mb-4 w-1/2">
            <span className="block text-gray-700 font-serif">Phone Number:</span>
            <input 
              name="phoneNumber" 
              value={customer.phoneNumber} 
              onChange={handleChange}  
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500" 
            />
          </label>
        </div>

        <div className="address flex space-x-2">
          <label className="block mb-4 w-1/2">
            <span className="block text-gray-700 font-serif">Street:</span>
            <input 
              name="address.street" 
              value={customer.address.street} 
              onChange={handleChange}  
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500" 
            />
          </label>

          <label className="block mb-4 w-1/2">
            <span className="block text-gray-700 font-serif">City:</span>
            <input 
              name="address.city" 
              value={customer.address.city} 
              onChange={handleChange}  
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500" 
            />
          </label>
        </div>

        <div className="state_zip flex space-x-2">
          <label className="block mb-4 w-1/2">
            <span className="block text-gray-700 font-serif">State:</span>
            <input 
              name="address.state" 
              value={customer.address.state} 
              onChange={handleChange}  
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500" 
            />
          </label>
          <label className="block mb-4 w-1/2">
            <span className="block text-gray-700 font-serif">ZIP:</span>
            <input 
              name="address.zip" 
              value={customer.address.zip} 
              onChange={handleChange}  
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500" 
            />
          </label>
        </div>
        <label className="block mb-4">
          <span className="block text-gray-700 font-serif">Organization:</span>
          <input 
            name="organization" 
            value={customer.organization} 
            onChange={handleChange}  
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500" 
          />
        </label>
        <button type="submit" className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">Submit</button>
      </form>
    </div>
  );
};

export default CustomerForm;
