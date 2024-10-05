import React from 'react';
import { Layout } from 'antd';
import TripsTable from './TripsTable';

const { Header, Content, Footer } = Layout;

const TripsLayout = () => {
    return (
        <Layout>
            <Header style={{ color: 'white', textAlign: 'center' }}>
                Trips Management
            </Header>
            <Content style={{ padding: '50px' }}>
                <TripsTable />
            </Content>
        </Layout>
    );
};

export default TripsLayout;
