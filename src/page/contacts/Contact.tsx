import React, { useState } from "react";
import ListContacts from "./ListContacts";
import NewContacts from "./NewContacts";
import { IContact } from "../../data/contacts/types";

export default function Contacts() {
    const [isNewContactVisible, setIsNewContactVisible] = useState(false);
    const [contactToUpdate, setContactToUpdate] = useState<IContact | null>(null);

    const onToggleVisibility = () => {
        setIsNewContactVisible(!isNewContactVisible);
        setContactToUpdate(null);
    };

    const onEditContact = (contact: IContact) => {
        setIsNewContactVisible(true);
        setContactToUpdate(contact);
    };

    return (
        <div>
            {!isNewContactVisible && (
                <ListContacts
                    onToggleVisibility={onToggleVisibility}
                    onEditContact={onEditContact}
                />
            )}
            {isNewContactVisible && (
                <NewContacts
                    onToggleVisibility={onToggleVisibility}
                    contactToUpdate={contactToUpdate}
                />
            )}
        </div>
    );
}
