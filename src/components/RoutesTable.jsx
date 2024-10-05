import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
import axios from 'axios';

const RoutesTable = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(null);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/routes');
      setRoutes(response.data);
      setLoading(false);
    } catch (error) {
      message.error('Failed to fetch routes');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/routes/delete/${id}`);
      message.success('Route deleted');
      fetchRoutes();
    } catch (error) {
      message.error('Failed to delete route');
    }
  };

  const handleEdit = (route) => {
    setCurrentRoute(route);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setCurrentRoute(null);
    setIsModalVisible(true);
  };

  const handleOk = async (values) => {
    try {
      if (currentRoute) {
        await axios.post(`http://localhost:4000/routes/update/${currentRoute._id}`, values);
        message.success('Route updated successfully');
      } else {
        await axios.post('http://localhost:4000/routes/add', values);
        message.success('Route added successfully');
      }
      fetchRoutes();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to save route');
    }
  };

  const columns = [
    { title: 'Start Point', dataIndex: 'start_point', key: 'start_point' },
    { title: 'End Point', dataIndex: 'end_point', key: 'end_point' },
    { title: 'Distance (km)', dataIndex: 'distance_km', key: 'distance_km' },
    { title: 'Difficulty Level', dataIndex: 'difficulty_level', key: 'difficulty_level' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Route
      </Button>
      <Table columns={columns} dataSource={routes} rowKey="_id" loading={loading} />

      <Modal
        title={currentRoute ? 'Edit Route' : 'Add Route'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={currentRoute}
          onFinish={handleOk}
        >
          <Form.Item label="Start Point" name="start_point" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="End Point" name="end_point" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Distance (km)" name="distance_km" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Difficulty Level" name="difficulty_level" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentRoute ? 'Update' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoutesTable;
