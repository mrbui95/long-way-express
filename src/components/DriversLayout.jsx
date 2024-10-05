import React from 'react';
import { Layout } from 'antd';
import DriversTable from './DriversTable';

const { Header, Content, Footer } = Layout;

const DriversLayout = () => {
    return (
        <Layout>
            <Header style={{ color: 'white', textAlign: 'center' }}>
                Drivers Management
            </Header>
            <Content style={{ padding: '50px' }}>
                <DriversTable />
            </Content>
        </Layout>
    );
};

export default DriversLayout;
