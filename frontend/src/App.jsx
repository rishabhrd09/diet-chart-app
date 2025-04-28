// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button, Table, Modal, Form, Container, Navbar, Alert } from 'react-bootstrap';
// import { 
//   FaPlus, 
//   FaUtensils, 
//   FaClock, 
//   FaFire, 
//   FaInfoCircle, 
//   FaBalanceScale,
//   FaEdit, 
//   FaTrash 
// } from 'react-icons/fa';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

// function App() {
//   const [items, setItems] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const [error, setError] = useState('');
//   const [formData, setFormData] = useState({ 
//     name: '', 
//     time: '', 
//     calories: '', 
//     description: '',
//     quantity_ml: ''
//   });

//   const API_URL = 'http://localhost:8000/api';

//   useEffect(() => {
//     fetchDietItems();
//   }, []);

//   const fetchDietItems = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/diet-items/`);
//       setItems(response.data);
//       setError('');
//     } catch (err) {
//       showError('Failed to fetch diet items');
//     }
//   };

//   const handleEdit = (item) => {
//     setEditItem(item);
//     setFormData({
//       ...item,
//       time: item.time.slice(0, 5) // Convert to HH:MM format
//     });
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/diet-items/${id}/`);
//       fetchDietItems();
//     } catch (err) {
//       showError('Failed to delete item');
//     }
//   };

//   // In handleSubmit function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Convert time format to HH:MM:SS
//       const payload = {
//         ...formData,
//         time: formData.time.includes(':') ? `${formData.time}:00` : formData.time,
//         calories: formData.calories || null,
//         quantity_ml: formData.quantity_ml || null
//       };

//       if (editItem) {
//         // Send PUT request with ID
//         await axios.put(`${API_URL}/diet-items/${editItem.id}/`, payload);
//       } else {
//         // Send POST request for new items
//         await axios.post(`${API_URL}/diet-items/`, payload);
//       }

//       setShowModal(false);
//       setEditItem(null);
//       setFormData({ name: '', time: '', calories: '', description: '', quantity_ml: '' });
//       fetchDietItems();
//     } catch (err) {
//       console.error('API Error:', err.response?.data);
//       showError(editItem ? 'Failed to update item' : 'Failed to create item');
//     }
//   };

//   const formatTime = (timeString) => {
//     const date = new Date(`1970-01-01T${timeString}`);
//     return date.toLocaleTimeString('en-US', {
//       hour: 'numeric',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   const showError = (message) => {
//     setError(message);
//     setTimeout(() => setError(''), 5000);
//   };

//   return (
//     <div className="d-flex flex-column min-vh-100">
//       <Navbar bg="dark" variant="dark" className="shadow-sm">
//         <Container>
//           <Navbar.Brand>
//             <FaUtensils className="me-2" />
//             Diet Chart Manager
//           </Navbar.Brand>
//         </Container>
//       </Navbar>

//       <Container className="main-content py-4 flex-grow-1">
//         {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h2 className="mb-0">Diet Schedule</h2>
//           <Button variant="primary" onClick={() => setShowModal(true)}>
//             <FaPlus className="me-2" />
//             Add New Item
//           </Button>
//         </div>

//         <Table striped bordered hover responsive className="shadow-sm">
//           <thead className="table-dark">
//             <tr>
//               <th><FaUtensils className="me-2" />Food</th>
//               <th><FaClock className="me-2" />Time</th>
//               <th><FaBalanceScale className="me-2" />Quantity</th>
//               <th><FaFire className="me-2" />Calories</th>
//               <th><FaInfoCircle className="me-2" />Description</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map(item => (
//               <tr key={item.id}>
//                 <td>{item.name}</td>
//                 <td>{formatTime(item.time)}</td>
//                 <td>{item.quantity_ml || 'NA'} ml</td>
//                 <td>{item.calories || 'NA'} kcal</td>
//                 <td>{item.description || 'NA'}</td>
//                 <td>
//                   <Button 
//                     variant="outline-warning" 
//                     onClick={() => handleEdit(item)}
//                     className="me-2"
//                   >
//                     <FaEdit />
//                   </Button>
//                   <Button 
//                     variant="outline-danger" 
//                     onClick={() => handleDelete(item.id)}
//                   >
//                     <FaTrash />
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>

        
//         <Modal show={showModal} onHide={() => {
//           setShowModal(false);
//           setEditItem(null); // Clear edit state
//           setFormData({ name: '', time: '', calories: '', description: '', quantity_ml: '' });
//         }}>
//           <Modal.Header closeButton>
//             <Modal.Title>{editItem ? 'Edit' : 'Add'} Diet Item</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form onSubmit={handleSubmit}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Food Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Time</Form.Label>
//                 // In the time input field
//                   <Form.Control
//                     type="time"
//                     required
//                     value={formData.time}
//                     onChange={(e) => setFormData({ ...formData, time: e.target.value })}
//                     step="1" // Show seconds in picker
//                   />
//                 <Form.Text className="text-muted">
//                   Selected time: {formData.time ? formatTime(formData.time + ':00') : '--'}
//                 </Form.Text>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Quantity (ml)</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={formData.quantity_ml}
//                   onChange={(e) => setFormData({ ...formData, quantity_ml: e.target.value })}
//                   placeholder="Optional"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Calories</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={formData.calories}
//                   onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
//                   placeholder="Optional"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Description</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={3}
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   placeholder="Optional"
//                 />
//               </Form.Group>

//               <div className="d-flex justify-content-end gap-2">
//                 <Button 
//                   variant="secondary" 
//                   onClick={() => {
//                     setShowModal(false);
//                     setEditItem(null);
//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button variant="primary" type="submit">
//                   {editItem ? 'Update' : 'Save'} Item
//                 </Button>
//               </div>
//             </Form>
//           </Modal.Body>
//         </Modal>
//       </Container>

//       <footer className="bg-dark text-white py-3 mt-auto">
//         <Container>
//           <div className="text-center">
//             © {new Date().getFullYear()} Diet Chart Manager. All rights reserved.
//           </div>
//         </Container>
//       </footer>
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Modal, Form, Container, Navbar, Alert, Row, Col, Card } from 'react-bootstrap';
import { 
  FaPlus, FaUtensils, FaClock, FaFire, FaInfoCircle, 
  FaBalanceScale, FaEdit, FaTrash, FaCalendarAlt, FaArrowLeft 
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ 
    name: '', 
    hours: '12', 
    minutes: '00',
    ampm: 'AM',
    calories: '', 
    description: '',
    quantity_ml: ''
  });
  const [view, setView] = useState('dashboard');

const API_URL = 'http://localhost:8000/api';
  // In your App.jsx, modify the API_URL to use environment variable:
//const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

  useEffect(() => {
    if(view !== 'dashboard') fetchDietItems();
  }, [view]);

  const fetchDietItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/diet-items/`);
      setItems(response.data);
      setError('');
    } catch (err) {
      showError('Failed to fetch diet items');
    }
  };

  const handleEdit = (item) => {
    const time = new Date(`1970-01-01T${item.time}`);
    const hours = time.getHours() % 12 || 12;
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
    
    setFormData({
      ...item,
      hours: String(hours),
      minutes,
      ampm
    });
    setEditItem(item.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/diet-items/${id}/`);
      fetchDietItems();
    } catch (err) {
      showError('Failed to delete item');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const time = `${parseInt(formData.hours) % 24}:${formData.minutes}:00`;
      const data = {
        ...formData,
        time: convertTo24Hour(time, formData.ampm)
      };

      if (editItem) {
        await axios.put(`${API_URL}/diet-items/${editItem}/`, data);
      } else {
        await axios.post(`${API_URL}/diet-items/`, data);
      }
      
      setShowModal(false);
      setEditItem(null);
      setFormData({ 
        name: '', hours: '12', minutes: '00', ampm: 'AM',
        calories: '', description: '', quantity_ml: '' 
      });
      fetchDietItems();
    } catch (err) {
      showError(editItem ? 'Failed to update item' : 'Failed to create item');
    }
  };

  const convertTo24Hour = (time, ampm) => {
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    return `${String(hours).padStart(2, '0')}:${minutes}:00`;
  };

  const formatTime = (timeString) => {
    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 5000);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar expand="lg" className="navbar">
        <Container>
          {view !== 'dashboard' && (
            <Button 
              variant="link" 
              className="text-white me-3 p-0"
              onClick={() => setView('dashboard')}
            >
              <FaArrowLeft size={24} />
            </Button>
          )}
          <Navbar.Brand href="#">
            <FaUtensils className="me-2" />
            Papa Ka Diet Chart
          </Navbar.Brand>
        </Container>
      </Navbar>

      <main className="main-content">
        <Container>
          {view === 'dashboard' ? (
            <div className="dashboard-view">
              <h2 className="dashboard-title">Diet Management Dashboard</h2>
              <Row className="g-4 justify-content-center">
                <Col md={6} lg={5}>
                  <Card onClick={() => setView('update')}>
                    <Card.Body className="text-center p-4">
                      <div className="card-icon">
                        <FaEdit size={32} className="text-primary" />
                      </div>
                      <h3 className="card-title mt-3 mb-2">Update Menu</h3>
                      <p className="text-muted">
                        Manage and update dietary items in the meal plan
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={6} lg={5}>
                  <Card onClick={() => setView('view')}>
                    <Card.Body className="text-center p-4">
                      <div className="card-icon">
                        <FaCalendarAlt size={32} className="text-primary" />
                      </div>
                      <h3 className="card-title mt-3 mb-2">View Diet Chart</h3>
                      <p className="text-muted">
                        View the complete dietary schedule and meal plan
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          ) : (
            <>
              {view === 'update' && (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="section-title">Meal Management</h2>
                    <Button 
                      variant="primary"
                      onClick={() => setShowModal(true)}
                    >
                      <FaPlus className="me-2" />
                      Add New Meal
                    </Button>
                  </div>

                  {error && <Alert variant="danger">{error}</Alert>}

                  <div className="management-table">
                    <Table hover responsive>
                      <thead className="table-dark">
                        <tr>
                          <th>Meal</th>
                          <th>Time</th>
                          <th>Quantity</th>
                          <th>Calories</th>
                          <th>Details</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map(item => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{formatTime(item.time)}</td>
                            <td>{item.quantity_ml || '-'}</td>
                            <td>{item.calories || '-'}</td>
                            <td>{item.description || '-'}</td>
                            <td>
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                className="me-2"
                                onClick={() => handleEdit(item)}
                              >
                                <FaEdit />
                              </Button>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => handleDelete(item.id)}
                              >
                                <FaTrash />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </>
              )}

              {view === 'view' && (
                <div className="diet-chart-view">
                  <h2 className="section-title text-center mb-5">Daily Diet Plan</h2>
                  <div className="timeline-container">
                    {items.sort((a,b) => a.time.localeCompare(b.time)).map((item, index) => (
                      <div key={item.id} className="timeline-item">
                        <div className="timeline-time">
                          <div className="time-icon">
                            <FaClock />
                          </div>
                          <div className="fw-bold">{formatTime(item.time)}</div>
                        </div>
                        <div className="timeline-content">
                          <h4 className="meal-title">{item.name}</h4>
                          <div className="meal-details">
                            {item.quantity_ml && (
                              <div className="detail-item">
                                <FaBalanceScale className="me-2" />
                                {item.quantity_ml} ml
                              </div>
                            )}
                            {item.calories && (
                              <div className="detail-item">
                                <FaFire className="me-2" />
                                {item.calories} kcal
                              </div>
                            )}
                            {item.description && (
                              <div className="detail-item">
                                <FaInfoCircle className="me-2" />
                                {item.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Form Modal */}
          <Modal show={showModal} onHide={() => {
            setShowModal(false);
            setEditItem(null);
            setFormData({ 
              name: '', hours: '12', minutes: '00', ampm: 'AM',
              calories: '', description: '', quantity_ml: '' 
            });
          }}>
            <Modal.Header closeButton>
              <Modal.Title>{editItem ? 'Edit' : 'Add'} Meal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Meal Name</Form.Label>
                  <Form.Control
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <div className="time-selector">
                    <Form.Select
                      value={formData.hours}
                      onChange={(e) => setFormData({...formData, hours: e.target.value})}
                    >
                      {Array.from({length: 12}, (_, i) => (
                        <option key={i+1} value={i+1}>{i+1}</option>
                      ))}
                    </Form.Select>
                    
                    <Form.Select
                      value={formData.minutes}
                      onChange={(e) => setFormData({...formData, minutes: e.target.value})}
                    >
                      <option value="00">00</option>
                      <option value="15">15</option>
                      <option value="30">30</option>
                      <option value="45">45</option>
                    </Form.Select>
                    
                    <Form.Select
                      value={formData.ampm}
                      onChange={(e) => setFormData({...formData, ampm: e.target.value})}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </Form.Select>
                  </div>
                </Form.Group>

                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Calories</Form.Label>
                      <Form.Control
                        type="number"
                        value={formData.calories}
                        onChange={(e) => setFormData({...formData, calories: e.target.value})}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Quantity (ml)</Form.Label>
                      <Form.Control
                        type="number"
                        value={formData.quantity_ml}
                        onChange={(e) => setFormData({...formData, quantity_ml: e.target.value})}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </Form.Group>

                <div className="d-flex justify-content-end gap-2">
                  <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    {editItem ? 'Update' : 'Save'} Meal
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        </Container>
      </main>

      <footer className="bg-dark text-white py-3 mt-auto">
        <Container className="text-center">
          <small>© {new Date().getFullYear()} Diet Planner Pro. All rights reserved.</small>
        </Container>
      </footer>
    </div>
  );
}

export default App;