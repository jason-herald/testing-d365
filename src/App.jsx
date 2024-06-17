// src/App.js

import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://d365integrationfunction.azurewebsites.net/api/HttpExample');

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.message}</h1>
      <ContactList contacts={data.data.value} />
    </div>
  );
};

const ContactList = ({ contacts }) => {
  return (
    <div>
      {contacts.map(contact => (
        <ContactCard key={contact.contactid} contact={contact} />
      ))}
    </div>
  );
};

const ContactCard = ({ contact }) => {
  return (
    <div>
      <h2>{contact.fullname}</h2>
      <p>Email: {contact.emailaddress1}</p>
      <p>Phone: {contact.mobilephone}</p>
      <p>Job Title: {contact.jobtitle}</p>
      <p>Address: {contact.address1_composite}</p>
    </div>
  );
};

export default App;
