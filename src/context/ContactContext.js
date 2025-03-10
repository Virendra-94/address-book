import React, { createContext, useContext, useState } from "react";

// Create context
const ContactContext = createContext(undefined);

// Create provider component
export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  const addContact = (contact) => {
    const newContact = {
      ...contact,
      id: Date.now().toString(),
    };
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const deleteContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  return (
    <ContactContext.Provider
      value={{ contacts, setContacts, addContact, deleteContact }}
    >
      {children}
    </ContactContext.Provider>
  );
};

// Create custom hook
export const useContacts = () => {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error("useContacts must be used within a ContactProvider");
  }
  return context;
};
