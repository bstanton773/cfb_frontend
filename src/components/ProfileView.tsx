import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { UserType, CategoryType } from '../types';
import { editUserById } from '../lib/apiWrapper';

type ProfileViewProps = {
    userData: UserType|null;
    handleEditToggle: () => void;
    flashMessage: (message:string, category:CategoryType) => void;
    updateUser: (updatedUser: UserType) => void;
}

export default function ProfileView({ userData, handleEditToggle, flashMessage, updateUser }: ProfileViewProps) {

    const [show, setShow] = useState(false);
    const [disableSaveBtn, setDisableSaveBtn] = useState(true)
    const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' });

    const navigate = useNavigate()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        const token = localStorage.getItem('token') || ''
        const response = await editUserById(token, userData!.id!, {password: formData.newPassword});
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`Your password has been updated`, 'success');
            updateUser(response.data!)
            handleEditToggle()
            navigate('/profile');
        }
    };

    useEffect(() => {
        const { newPassword, confirmPassword } = formData;

        if (
            newPassword.trim() !== "" && // Ensure the newPassword has text
            confirmPassword.trim() !== "" && // Ensure the confirmPassword has text
            newPassword === confirmPassword // Check both passwords match
        ) {
            setDisableSaveBtn(false); // Enable the button
        } else {
            setDisableSaveBtn(true); // Disable the button
        }
    }, [formData]); // This runs whenever formData changes


    return (
        <>
            <Row className="mb-3">
                <Col>
                <strong>First Name:</strong> {userData?.first_name}
                </Col>
                <Col>
                <strong>Last Name:</strong> {userData?.last_name}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                <strong>Email:</strong> {userData?.email}
                </Col>
                <Col>
                <strong>Username:</strong> {userData?.username}
                </Col>
            </Row>

            <Button variant="primary" onClick={handleEditToggle}>
                Edit Profile
            </Button>

            <Button variant="success"className="mx-3" onClick={handleShow}>
                Edit Password
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">
                                New Password
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">
                                Confirm Password
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" disabled={disableSaveBtn} onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}