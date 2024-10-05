import React, { useEffect, useState } from 'react';
import { Table, Spin, message, Button, Popconfirm, Modal, Form, Input, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';

const VehicleTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Trạng thái để xác định là thêm mới hay chỉnh sửa
  const [editingVehicle, setEditingVehicle] = useState(null); // Dữ liệu của vehicle đang được chỉnh sửa
  const [form] = Form.useForm();

  // Hàm gọi API để lấy danh sách vehicles
  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:4000/vehicles');
      setVehicles(response.data);
      setLoading(false);
    } catch (error) {
      message.error('Failed to fetch vehicles');
      setLoading(false);
    }
  };

  // Hàm xử lý khi xóa vehicle
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/vehicles/delete/${id}`);
      message.success('Vehicle deleted successfully');
      fetchVehicles(); // Tải lại danh sách sau khi xóa
    } catch (error) {
      message.error('Failed to delete vehicle');
    }
  };

  // Hàm xử lý khi nhấn sửa, mở modal với dữ liệu của vehicle cần chỉnh sửa
  const handleEdit = (vehicle) => {
    setIsEditMode(true);
    setEditingVehicle(vehicle);
    setIsModalVisible(true);

    // Gán dữ liệu vào form
    form.setFieldsValue({
      ...vehicle,
      last_maintenance_date: moment(vehicle.last_maintenance_date),
    });
  };

  // Hiển thị modal thêm mới vehicle
  const showModal = () => {
    setIsEditMode(false); // Đặt chế độ thành thêm mới
    setIsModalVisible(true);
    form.resetFields(); // Xóa dữ liệu form khi mở modal
  };

  // Ẩn modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingVehicle(null); // Reset vehicle đang chỉnh sửa
  };

  // Xử lý khi form được submit (thêm mới hoặc cập nhật vehicle)
  const handleSubmit = async (values) => {
    const vehicleData = {
      ...values,
      last_maintenance_date: values.last_maintenance_date.toISOString(),
    };

    if (isEditMode && editingVehicle) {
      // Xử lý cập nhật vehicle
      try {
        await axios.post(`http://localhost:4000/vehicles/update/${editingVehicle._id}`, vehicleData);
        message.success('Vehicle updated successfully');
        setIsModalVisible(false);
        setEditingVehicle(null); // Reset vehicle sau khi cập nhật
        fetchVehicles(); // Tải lại danh sách
      } catch (error) {
        message.error('Failed to update vehicle');
      }
    } else {
      // Xử lý thêm mới vehicle
      try {
        await axios.post('http://localhost:4000/vehicles/add', vehicleData);
        message.success('Vehicle added successfully');
        setIsModalVisible(false);
        fetchVehicles(); // Tải lại danh sách
      } catch (error) {
        message.error('Failed to add vehicle');
      }
    }
  };

  // Cấu hình các cột của bảng
  const columns = [
    {
      title: 'Plate Number',
      dataIndex: 'plate_number',
      key: 'plate_number',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Manufacturer',
      dataIndex: 'manufacturer',
      key: 'manufacturer',
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Seat Count',
      dataIndex: 'seat_count',
      key: 'seat_count',
    },
    {
      title: 'Manufacture Year',
      dataIndex: 'manufacture_year',
      key: 'manufacture_year',
    },
    {
      title: 'Last Maintenance Date',
      dataIndex: 'last_maintenance_date',
      key: 'last_maintenance_date',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure delete this vehicle?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Gọi API khi component được render lần đầu
  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Thêm mới vehicle
      </Button>
      {loading ? (
        <Spin tip="Loading vehicles..." />
      ) : (
        <Table columns={columns} dataSource={vehicles} rowKey="_id" />
      )}

      <Modal
        title={isEditMode ? 'Chỉnh sửa vehicle' : 'Thêm mới vehicle'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="plate_number"
            label="Plate Number"
            rules={[{ required: true, message: 'Please input the plate number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="color"
            label="Color"
            rules={[{ required: true, message: 'Please input the color!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="manufacturer"
            label="Manufacturer"
            rules={[{ required: true, message: 'Please input the manufacturer!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="model"
            label="Model"
            rules={[{ required: true, message: 'Please input the model!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="seat_count"
            label="Seat Count"
            rules={[{ required: true, message: 'Please input the seat count!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="manufacture_year"
            label="Manufacture Year"
            rules={[{ required: true, message: 'Please input the manufacture year!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="last_maintenance_date"
            label="Last Maintenance Date"
            rules={[{ required: true, message: 'Please select the maintenance date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              {isEditMode ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VehicleTable;
