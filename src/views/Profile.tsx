import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import EditProfile from '../components/EditProfile';
import ProfileView from '../components/ProfileView';
import MyPicks from '../components/MyPicks';
import { CategoryType, UserType } from '../types';

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

            { !isEditing && (
                    <Card className='my-3'>
                        <Card.Body>
                                <MyPicks flashMessage={flashMessage} />
                        </Card.Body>
                    </Card>
                )
            }
        </>
    )
}