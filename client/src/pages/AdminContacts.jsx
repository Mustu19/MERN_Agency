import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from '../store/auth'
import { toast } from "react-toastify";

export const AdminContacts = () => {

  const [contacts, setContacts] = useState([]);

  const { authorizationToken } = useAuth()

  const getAllContactsData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken
        },
      })
      const data = await response.json()
      console.log(`contacts ${data}`);
      if (response.ok) {
        setContacts(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

   // defining the funciton deleteContactById

   const deleteContactById = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        getAllContactsData();
        toast.success("deleted successfully");
      } else {
        toast.error("Not Deleted ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllContactsData()
  }, [])

  return (
    <>
      <section className="admin-contacts-section">
        <div className="container">
          <h1>Admin Contacts Data </h1>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((curContact, index) => {
                return (
                  <tr key={index}>
                    <td>{curContact.username}</td>
                    <td>{curContact.email}</td>
                    <td>{curContact.message}</td>
                    <td>
                      <button className="btn" onClick={() => deleteContactById(curContact._id)}> Delete </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
