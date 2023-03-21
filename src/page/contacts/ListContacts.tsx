// src/components/contacts/ListContacts.tsx

import React, { useEffect, useState } from 'react';
import { IContact } from '../../data/contacts/types';
import { apiFetchAllContacts, apiDeleteContact } from '../../data/contacts/api';
import styles from './contact.module.css';

interface ListContactsProps {
    onToggleVisibility: () => void;
    onEditContact: (contact: IContact) => void;
}

export default function ListContacts({ onToggleVisibility, onEditContact }: ListContactsProps) {
    const [contacts, setContacts] = useState<IContact[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingContacts, setDeletingContacts] = useState<string[]>([]);

    useEffect(() => {
        const fetchContacts = async () => {
            setIsLoading(true);
            const result = await apiFetchAllContacts();
            const sortedResult = result.sort((a, b) => a.name.localeCompare(b.name));
            setContacts(sortedResult);
            setIsLoading(false);
        };

        fetchContacts();
    }, []);

    const handleDelete = async (id: string) => {
        setDeletingContacts((prevDeletingContacts) => [...prevDeletingContacts, id]);
        try {
            await apiDeleteContact(id);
            setContacts(contacts.filter((contact) => contact.id !== id).sort((a, b) => a.name.localeCompare(b.name)));
        } catch (err) {
            console.error('Error deleting contact:', err);
        } finally {
            setDeletingContacts((prevDeletingContacts) => prevDeletingContacts.filter((contactId) => contactId !== id));
        }
    };

    return (
        <div className={styles.listContactDiv}>
            <h1>{!isLoading && 'List of Contacts'}</h1>
            <h5>
                {!isLoading && <button className={styles.addButton} onClick={onToggleVisibility}>
                    Add Contact
                </button>}
            </h5>
            {isLoading ? (
                <h1>Loading contacts...</h1>
            ) : (
                <ul className={styles.contactListBox}>
                    {contacts.map((contact) => (
                        <li key={contact.id}>
                            <p>
                                <b>Name:</b> {contact.name}{' '}
                            </p>
                            <p>
                                <b>Email:</b> {contact.email}
                            </p>
                            <p>
                                <b>Phone:</b> {contact.phone}
                            </p>
                            <p>
                                <b>Age:</b> {contact.age}
                            </p>
                            <p>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => handleDelete(contact.id)}
                                    disabled={deletingContacts.includes(contact.id)}
                                >
                                    {deletingContacts.includes(contact.id) ? 'Deleting...' : 'Delete'}
                                </button>
                                <button className={styles.editButton} onClick={() => onEditContact(contact)}>
                                    Edit
                                </button>
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
