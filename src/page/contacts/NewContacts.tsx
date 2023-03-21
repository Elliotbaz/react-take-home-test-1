import React, { useState, useEffect } from "react";
import { IContact } from "../../data/contacts/types";
import { apiAddContact, apiUpdateContact } from "../../data/contacts/api";
import styles from "./contact.module.css";
import { NewContactsProps } from "../../data/contacts/types";

export default function NewContacts({
    onToggleVisibility,
    contactToUpdate,
}: NewContactsProps) {
    const [name, setName] = useState(contactToUpdate?.name || "");
    const [email, setEmail] = useState(contactToUpdate?.email || "");
    const [phone, setPhone] = useState(contactToUpdate?.phone || "");
    const [age, setAge] = useState<number | undefined>(contactToUpdate?.age);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setName(contactToUpdate?.name || "");
        setEmail(contactToUpdate?.email || "");
        setPhone(contactToUpdate?.phone || "");
        setAge(contactToUpdate?.age);
    }, [contactToUpdate]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setSubmitting(true);
        setError(null);

        const newContact: IContact = {
            id: contactToUpdate?.id || Date.now().toString(),
            name,
            email: email || undefined,
            phone: phone || undefined,
            age: age || undefined,
        };

        try {
            if (contactToUpdate) {
                await apiUpdateContact(newContact);
            } else {
                await apiAddContact(newContact);
            }
            setName("");
            setEmail("");
            setPhone("");
            setAge(undefined);
            onToggleVisibility();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.addContactDiv}>
            <h1>{contactToUpdate ? "Update Contact" : "Add Contact"}</h1>
            <form onSubmit={handleSubmit} className={styles.addContactForm}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label htmlFor="phone">Phone:</label>
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <br />
                <label htmlFor="age">Age:</label>
                <input
                    type="number"
                    id="age"
                    value={age === undefined ? "" : age}
                    onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : undefined)}
                />
                <br />
                <button type="submit" disabled={submitting}>
                    {submitting ? (contactToUpdate ? "Updating..." : "Adding...") : (contactToUpdate ? "Update Contact" : "Add Contact")}
                </button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}
