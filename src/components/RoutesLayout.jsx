import React from 'react';
import { Layout } from 'antd';
import RoutesTable from './RoutesTable';

const { Header, Content, Footer } = Layout;

const RoutesLayout = () => {
    return (
        <Layout>
            <Header style={{ color: 'white', textAlign: 'center' }}>
                Routes Management
            </Header>
            <Content style={{ padding: '50px' }}>
                <RoutesTable />
            </Content>
        </Layout>
    );
};

export default RoutesLayout;
