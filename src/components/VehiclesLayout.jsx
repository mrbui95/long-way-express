import React from 'react';
import { Layout } from 'antd';
import VehicleTable from './VehiclesTable';

const { Header, Content, Footer } = Layout;

const VehiclesLayout = () => {
    return (
        <Layout>
            <Header style={{ color: 'white', textAlign: 'center' }}>
                Vehicle Management
            </Header>
            <Content style={{ padding: '50px' }}>
                <VehicleTable />
            </Content>
        </Layout>
    );
};

export default VehiclesLayout;
