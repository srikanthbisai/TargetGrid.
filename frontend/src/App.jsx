import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerForm from './components/CustomerForm';
import CustomerGrid from './components/CustomerGrid';
import './App.css';

const App = () => {
    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);


    const handleCustomerAdded = (newCustomer) => {
        setCustomers([...customers, newCustomer]);
    };
    

    const handlePushToCrm = async (customer) => {
        try {
            await axios.post('http://localhost:5000/api/customers/push-to-crm', customer);
            alert('Customer pushed to CRM successfully!');
        } catch (error) {
            console.error('Error pushing customer to CRM:', error);
        }
    };

    return (
        <div className='app'>
            <CustomerForm onCustomerAdded={handleCustomerAdded} />
            <CustomerGrid customers={customers} onPushToCrm={handlePushToCrm} />
        </div>
    );
};

export default App;