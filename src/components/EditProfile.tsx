import { useState } from "react";
import { useNavigate } from 'react-router';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { UserType, CategoryType } from "../types";
import { editUserById } from "../lib/apiWrapper";

type EditProfileProps = {
    userData: UserType;
    handleEditToggle: () => void;
    flashMessage: (message:string, category:CategoryType) => void;
    updateUser: (updatedUser: UserType) => void;
};

export default function EditProfile({ userData, handleEditToggle, flashMessage, updateUser }: EditProfileProps) {
    const [formData, setFormData] = useState({ first_name: userData.first_name, last_name: userData.last_name, username: userData.username, email: userData.email });

    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || ''
        const response = await editUserById(token, userData!.id!, formData);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`${response.data?.username} has been updated`, 'success');
            updateUser(response.data!)
            handleEditToggle()
            navigate('/profile');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                    First Name
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                    Last Name
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                    Email
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                    Username
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </Col>
            </Form.Group>

            <Row className="mt-4 text-center">
                <Col>
                    <Button
                        variant="success"
                        type="submit"
                        className="mx-3"
                    >
                        <i className="bi bi-floppy"></i> Save Changes
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleEditToggle}
                        className="mx-3"
                    > Cancel
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
