import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import {
    Container,
    Box,
    Typography,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Button,
    Modal,
    FormControl,
    FormGroup,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    IconButton,
    CssBaseline,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateUserModal from '../components/UpdateUserModal';
import DeleteModal from '../components/DeleteModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/header';

const Dashboard = () => {
    const navigate = useNavigate();
    const { currentUser, loggedIn, loading:authLoading } = useAuth();
   
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
    });

    useEffect(() => {
        if (!authLoading) {
            if (!loggedIn) {
                navigate('/login');
            } else if (loggedIn && currentUser !== 'Admin') {
                navigate('/');
            }
        }
    }, [authLoading, loggedIn, currentUser, navigate]);

    useEffect(() => {
        if (loggedIn && currentUser === 'Admin') {
            fetchUsers();
        }
    }, [loggedIn, currentUser]);

    if (authLoading || loading) {
        return <LoadingSpinner />;
    }
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
            );
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleModalOpen = () => {
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: 'User',
        });
    };

    const handleUpdateModalOpen = (user) => {
        setFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        });
        setSelectedUserId(user._id);
        setOpenUpdateModal(true);
    };

    const handleUpdateModalClose = () => {
        setOpenUpdateModal(false);
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: 'User',
        });
        setSelectedUserId(null);
    };

    const handleUpdateSubmit = async (userId, updatedData) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!selectedUserId) {
                console.error('No userId selected for update');
                return; 
            }
            const response = await axios.put(
                `/api/users/${selectedUserId}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ); 
            
    
            fetchUsers(); // Refresh user list after successful 
            handleUpdateModalClose(); // Close modal after successful update
            setLoading(false);
            toast.success('User updated successfully');
        } catch (error) {
            toast.error('Failed to update user. Please try again.');
        }
    };

    const handleDeleteModalOpen = (userId) => {
        setSelectedUserId(userId);
        setOpenDeleteModal(true);
    };

    const handleDeleteModalClose = () => {
        setOpenDeleteModal(false);
        setSelectedUserId(null);
    };

    const handleDeleteUser = async (userId) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            await axios.delete(`/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }); 
    
            fetchUsers(); 
            handleDeleteModalClose(); 
            setLoading(false);
            toast.success('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user. Please try again.');
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post('/api/auth/register', formData);
            fetchUsers(); 
            handleModalClose(); 
            setLoading(false);
            toast.success('User Created successfully');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to register. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    return (
        <>
        <Header />
        <Container maxWidth="lg">
            <CssBaseline />
            <Box sx={{ marginTop: 8 }}>
                <Typography variant="h4" gutterBottom>
                    Users Dashboard
                </Typography>
                <Button variant="contained" color="primary" onClick={handleModalOpen}>
                    Create New User
                </Button>
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}
                                    hover
                                    sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
                                >
                                    <TableCell>{user._id}</TableCell>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleUpdateModalOpen(user)}>
                                            <EditIcon color="primary" />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteModalOpen(user._id)}>
                                            <DeleteIcon color="secondary" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <UpdateUserModal
                        open={openUpdateModal}
                        onClose={handleUpdateModalClose}
                        user={formData}
                        onUpdate={handleUpdateSubmit}
                    />
                    <DeleteModal
                        open={openDeleteModal}
                        onClose={handleDeleteModalClose}
                        onDelete={handleDeleteUser}
                        userId={selectedUserId}
                    />
                </TableContainer>
            </Box>
            <Modal open={openModal} onClose={handleModalClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '60%', // Adjust width as per your design
                        maxWidth: 600,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">Create New User</Typography>
                        <IconButton onClick={handleModalClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <FormGroup>
                            <TextField
                                required
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                required
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                required
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                required
                                label="Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="role-select-label">Role</InputLabel>
                                <Select
                                    labelId="role-select-label"
                                    id="role-select"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    placeholder='Select Role'
                                >
                                    <MenuItem value="User">User</MenuItem>
                                    <MenuItem value="Admin">Admin</MenuItem>
                                </Select>
                            </FormControl>
                            <Button type="submit" variant="contained" color="primary">
                                Register
                            </Button>
                        </FormGroup>
                    </form>
                </Box>
            </Modal>
        </Container>
        </>
    );
};

export default Dashboard;
