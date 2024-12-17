import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ProfileView from '../components/ProfileView';
import { CategoryType, UserType } from '../types';
import EditProfile from '../components/EditProfile';

type ProfileProps = {
    currentUser: UserType;
    flashMessage: (message:string, category:CategoryType) => void;
    updateUser: (updatedUser: UserType) => void;
}

export default function Profile({ currentUser, flashMessage, updateUser }: ProfileProps) {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditToggle = () => {
        setIsEditing((prev) => !prev);
    };

    return (
        <>
            <h1 className='text-center'>User Profile</h1>
            <Card>
                <Card.Body>
                    { isEditing ? (
                        <EditProfile userData={currentUser} handleEditToggle={handleEditToggle} flashMessage={flashMessage} updateUser={updateUser} /> 
                    ) : (
                        <ProfileView userData={currentUser} handleEditToggle={handleEditToggle} flashMessage={flashMessage} updateUser={updateUser} /> 
                    )}
                </Card.Body>
            </Card>
        </>
    )
}