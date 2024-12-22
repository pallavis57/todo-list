import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button, List, ListItem, ListItemText,
  IconButton, Checkbox, Snackbar, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Slide, Tooltip, Tabs, Tab, AppBar
} from '@mui/material';
import { Delete, AddCircle } from '@mui/icons-material';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleAddTask = () => {
    if (newTaskTitle.trim() && newTaskDescription.trim()) {
      const now = new Date();
      const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      setTasks([...tasks, { title: newTaskTitle, description: newTaskDescription, completed: false, time }]);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    setDialogOpen(false);
    setTaskToDelete(null);
  };

  const handleToggleComplete = (index) => {
    setTasks(tasks.map((task, i) => i === index ? { ...task, completed: !task.completed } : task));
  };

  const openDialog = (index) => {
    setTaskToDelete(index);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setTaskToDelete(null);
  };

  const [toDoTasks, completedTasks] = [
    tasks.filter(task => !task.completed),
    tasks.filter(task => task.completed)
  ];

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: '2em 0', color: '#fff' }}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom style={{ color: '#fff' }}>
          To-Do List
        </Typography>
        <TextField
          label="Task Title"
          variant="outlined"
          fullWidth
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          sx={{
            marginBottom: '1em',
            '& .MuiInputLabel-root': { color: '#50C878' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#50C878' },
              '&:hover fieldset': { borderColor: '#50C878' },
              '&.Mui-focused fieldset': { borderColor: '#50C878' },
              '& input': { color: '#fff' },
            }
          }}
        />
        <TextField
          label="Task Description"
          variant="outlined"
          fullWidth
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          sx={{
            marginBottom: '1em',
            '& .MuiInputLabel-root': { color: '#50C878' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#50C878' },
              '&:hover fieldset': { borderColor: '#50C878' },
              '&.Mui-focused fieldset': { borderColor: '#50C878' },
              '& input': { color: '#fff' },
            }
          }}
        />
        <Tooltip title="Add Task">
          <Button
            variant="contained"
            fullWidth
            startIcon={<AddCircle />}
            onClick={handleAddTask}
            sx={{
              backgroundColor: '#50C878',
              '&:hover': { backgroundColor: '#45B469' },
              color: '#000'
            }}
          >
            Add Task
          </Button>
        </Tooltip>
        <AppBar position="static" style={{ backgroundColor: '#1a1a1a', boxShadow: 'none', marginTop: '1em' }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} centered>
            <Tab label="To Do" style={{ color: '#fff' }} />
            <Tab label="Completed" style={{ color: '#fff' }} />
          </Tabs>
        </AppBar>
        {[{ tasks: toDoTasks, label: 'To Do' }, { tasks: completedTasks, label: 'Completed' }].map(({ tasks, label }, tabIndex) =>
          tabValue === tabIndex && (
            <div key={label} style={{ backgroundColor: '#1a1a1a', padding: '1em', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', marginTop: '1em' }}>
              <List>
                <TransitionGroup>
                  {tasks.map((task, index) => (
                    <CSSTransition key={index} timeout={500} classNames="task">
                      <ListItem divider style={{ borderBottom: '1px solid #50C878' }}>
                        <Checkbox
                          checked={task.completed}
                          onChange={() => handleToggleComplete(index)}
                          sx={{ color: '#50C878' }}
                        />
                        <ListItemText
                          primary={<span style={{ fontSize: '1.2em', color: '#fff' }}>{task.title}</span>}
                          secondary={<span style={{ color: '#fff' }}>{task.description}<br />{task.time}</span>}
                          sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                        />
                        <Tooltip title="Delete Task">
                          <IconButton edge="end" color="secondary" onClick={() => openDialog(index)} sx={{ color: '#ff0000' }}>
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </ListItem>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </List>
            </div>
          )
        )}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message="Task added!"
          TransitionComponent={Transition}
        />
        <Dialog
          open={dialogOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={closeDialog}
        >
          <DialogTitle>{"Delete Task"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this task?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color="primary">Cancel</Button>
            <Button onClick={() => handleDeleteTask(taskToDelete)} color="secondary">Delete</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default App;
