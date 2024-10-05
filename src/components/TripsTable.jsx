import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, DatePicker, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';

const TripsTable = () => {
  const [trips, setTrips] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTrips();
    fetchDrivers();
    fetchVehicles();
    fetchRoutes();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await axios.get('http://localhost:4000/trips');
      setTrips(response.data);
    } catch (error) {
      console.error('Failed to fetch trips:', error);
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/drivers');
      setDrivers(response.data);
    } catch (error) {
      console.error('Failed to fetch drivers:', error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:4000/vehicles');
      setVehicles(response.data);
    } catch (error) {
      console.error('Failed to fetch vehicles:', error);
    }
  };

  const fetchRoutes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/routes');
      setRoutes(response.data);
    } catch (error) {
      console.error('Failed to fetch routes:', error);
    }
  };

  const showModal = (trip) => {
    setEditingTrip(trip);
    setIsModalVisible(true);
    form.setFieldsValue({
      trip_number: trip?.trip_number || '',
      route_id: trip?.route_id || '',
      vehicle_id: trip?.vehicle_id || '',
      driver_id: trip?.driver_id || '',
      assistant_driver_id: trip?.assistant_driver_id || '',
      passenger_count: trip?.passenger_count || 0,
      ticket_price: trip?.ticket_price || 0,
      trip_date: trip?.trip_date ? moment(trip.trip_date) : null,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSave = async (values) => {
    try {
      if (editingTrip) {
        await axios.post(`http://localhost:4000/trips/update/${editingTrip._id}`, values);
      } else {
        await axios.post('http://localhost:4000/trips/add', values);
      }
      fetchTrips();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Failed to save trip:', error);
    }
  };

  const deleteTrip = async (id) => {
    try {
      await axios.get(`http://localhost:4000/trips/delete/${id}`);
      fetchTrips();
    } catch (error) {
      console.error('Failed to delete trip:', error);
    }
  };

  const getDriverName = (id) => drivers.find(driver => driver._id === id)?.name || 'Unknown Driver';
  const getVehicleName = (id) => vehicles.find(vehicle => vehicle._id === id)?.plate_number || 'Unknown Vehicle';
  const getRouteName = (id) => routes.find(route => route._id === id)?.start_point + ' - ' + routes.find(route => route._id === id)?.end_point || 'Unknown Route';

  const columns = [
    {
      title: 'Trip Number',
      dataIndex: 'trip_number',
      key: 'trip_number',
    },
    {
      title: 'Route',
      dataIndex: 'route_id',
      key: 'route_id',
      render: (id) => getRouteName(id),
    },
    {
      title: 'Vehicle',
      dataIndex: 'vehicle_id',
      key: 'vehicle_id',
      render: (id) => getVehicleName(id),
    },
    {
      title: 'Driver',
      dataIndex: 'driver_id',
      key: 'driver_id',
      render: (id) => getDriverName(id),
    },
    {
      title: 'Assistant Driver',
      dataIndex: 'assistant_driver_id',
      key: 'assistant_driver_id',
      render: (id) => getDriverName(id),
    },
    {
      title: 'Passenger Count',
      dataIndex: 'passenger_count',
      key: 'passenger_count',
    },
    {
      title: 'Ticket Price',
      dataIndex: 'ticket_price',
      key: 'ticket_price',
    },
    {
      title: 'Trip Date',
      dataIndex: 'trip_date',
      key: 'trip_date',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, trip) => (
        <>
          <Button onClick={() => showModal(trip)}>Edit</Button>
          <Button danger onClick={() => deleteTrip(trip._id)} style={{ marginLeft: 8 }}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => showModal(null)} style={{ marginBottom: 16 }}>
        Add Trip
      </Button>
      <Table dataSource={trips} columns={columns} rowKey="_id" />

      <Modal
        title={editingTrip ? 'Edit Trip' : 'Add Trip'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSave}>
          <Form.Item label="Trip Number" name="trip_number" rules={[{ required: true, message: 'Please input trip number!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Route" name="route_id" rules={[{ required: true, message: 'Please select route!' }]}>
            <Select>
              {routes.map(route => (
                <Select.Option key={route._id} value={route._id}>
                  {route.start_point} - {route.end_point}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Vehicle" name="vehicle_id" rules={[{ required: true, message: 'Please select vehicle!' }]}>
            <Select>
              {vehicles.map(vehicle => (
                <Select.Option key={vehicle._id} value={vehicle._id}>
                  {vehicle.plate_number}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Driver" name="driver_id" rules={[{ required: true, message: 'Please select driver!' }]}>
            <Select>
              {drivers.map(driver => (
                <Select.Option key={driver._id} value={driver._id}>
                  {driver.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Assistant Driver" name="assistant_driver_id">
            <Select>
              {drivers.map(driver => (
                <Select.Option key={driver._id} value={driver._id}>
                  {driver.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Passenger Count" name="passenger_count" rules={[{ required: true, message: 'Please input passenger count!' }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item label="Ticket Price" name="ticket_price" rules={[{ required: true, message: 'Please input ticket price!' }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item label="Trip Date" name="trip_date" rules={[{ required: true, message: 'Please select trip date!' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingTrip ? 'Update' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TripsTable;
