import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';

const DriversTable = () => {
  const [drivers, setDrivers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/drivers');
      setDrivers(response.data);
    } catch (error) {
      console.error('Failed to fetch drivers:', error);
    }
  };

  const showModal = (driver) => {
    setEditingDriver(driver);
    setIsModalVisible(true);
    form.setFieldsValue({
      name: driver?.name || '',
      identity_number: driver?.identity_number || '',
      license_number: driver?.license_number || '',
      license_type: driver?.license_type || '',
      address: driver?.address || '',
      date_of_birth: driver?.date_of_birth ? moment(driver.date_of_birth) : null,
      years_of_experience: driver?.years_of_experience || 0,
      monthly_salary: driver?.monthly_salary || 0,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSave = async (values) => {
    try {
      if (editingDriver) {
        // Update the driver
        await axios.post(`http://localhost:4000/drivers/update/${editingDriver._id}`, values);
      } else {
        // Add a new driver
        await axios.post('http://localhost:4000/drivers/add', values);
      }
      fetchDrivers();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Failed to save driver:', error);
    }
  };

  const deleteDriver = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/drivers/delete/${id}`);
      fetchDrivers();
    } catch (error) {
      console.error('Failed to delete driver:', error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Identity Number',
      dataIndex: 'identity_number',
      key: 'identity_number',
    },
    {
      title: 'License Number',
      dataIndex: 'license_number',
      key: 'license_number',
    },
    {
      title: 'License Type',
      dataIndex: 'license_type',
      key: 'license_type',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Years of Experience',
      dataIndex: 'years_of_experience',
      key: 'years_of_experience',
    },
    {
      title: 'Monthly Salary',
      dataIndex: 'monthly_salary',
      key: 'monthly_salary',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, driver) => (
        <>
          <Button onClick={() => showModal(driver)}>Edit</Button>
          <Button danger onClick={() => deleteDriver(driver._id)} style={{ marginLeft: 8 }}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => showModal(null)} style={{ marginBottom: 16 }}>
        Add Driver
      </Button>
      <Table dataSource={drivers} columns={columns} rowKey="_id" />

      <Modal
        title={editingDriver ? 'Edit Driver' : 'Add Driver'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSave}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Identity Number" name="identity_number" rules={[{ required: true, message: 'Please input identity number!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="License Number" name="license_number" rules={[{ required: true, message: 'Please input license number!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="License Type" name="license_type" rules={[{ required: true, message: 'Please input license type!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input address!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Date of Birth" name="date_of_birth" rules={[{ required: true, message: 'Please select date of birth!' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Years of Experience" name="years_of_experience" rules={[{ required: true, message: 'Please input years of experience!' }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item label="Monthly Salary" name="monthly_salary" rules={[{ required: true, message: 'Please input monthly salary!' }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingDriver ? 'Update' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DriversTable;
