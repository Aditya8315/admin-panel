import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const DeleteConfirmationModal = ({ open, onClose, onDelete, userId }) => {
  const handleDelete = () => {
    onDelete(userId);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Confirm Delete
        </Typography>
        <Typography variant="body1" gutterBottom>
          Are you sure you want to delete this user?
        </Typography>
        <Button onClick={handleDelete} variant="contained" color="secondary" sx={{ mr: 2 }}>
          Delete
        </Button>
        <Button onClick={onClose} variant="contained">
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;
