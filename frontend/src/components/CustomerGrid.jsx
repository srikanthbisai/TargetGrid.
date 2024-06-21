import axios from 'axios';

const CustomerGrid = ({ customers, onPushToCrm }) => {
  const pushToCrm = async (customer) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/customers/push-to-crm",
        customer
      );
      console.log("Customer pushed to CRM:", response.data);
      // Optionally, you can add some UI feedback here, like a success message or notification
    } catch (error) {
      console.error("Error pushing customer to CRM:", error);
      // Optionally, you can add some UI feedback here, like an error message or notification
    }
  };

  return (
    <div className="overflow-x-auto min-h-screen app">
      <table className="min-w-full border-collapse border border-gray-300 bg-black text-white">
        <thead>
          <tr className="bg-gray-200 bg-gradient-to-r from-red-500 to-red-800">
            <th className="border border-gray-300 px-4 py-2 font-extrabold font-serif">
              First Name
            </th>
            <th className="border border-gray-300 px-4 py-2 font-extrabold font-serif">
              Last Name
            </th>
            <th className="border border-gray-300 px-4 py-2 font-extrabold font-serif">
              Email
            </th>
            <th className="border border-gray-300 px-4 py-2 font-extrabold font-serif">
              Phone Number
            </th>
            <th className="border border-gray-300 px-4 py-2 font-extrabold font-serif">
              Street
            </th>
            <th className="border border-gray-300 px-4 py-2 font-extrabold font-serif">
              City
            </th>
            <th className="border border-gray-300 px-4 py-2 font-extrabold font-serif">
              State
            </th>
            <th className="border border-gray-300 px-4 py-2 font-extrabold font-serif">
              Zip
            </th>
            <th className="border border-gray-300 px-4 py-2 font-extrabold font-serif">
              Organization
            </th>
            <th className="border border-gray-300 px-4 py-2 font-extrabold font-serif">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id} className="border border-gray-300">
              <td className="border border-gray-300 px-4 py-2">
                {customer.firstName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {customer.lastName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {customer.email}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {customer.phoneNumber}
              </td>
              <td className="border border-gray-300 px-4 py-2 ">
                {customer.address.street}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {customer.address.city}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {customer.address.state}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {customer.address.zip}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {customer.organization}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => pushToCrm(customer)}
                  className="bg-slate-800 text-white text-sm font-bold p-1 rounded"
                >
                  Push to CRM
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerGrid;
