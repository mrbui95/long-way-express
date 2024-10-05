import React, { useState, useEffect } from 'react';
import { Layout, Menu, theme } from 'antd';

import VehiclesLayout from '../components/VehiclesLayout';
import TripsLayout from '../components/TripsLayout';
import RoutesLayout from '../components/RoutesLayout';
import DriversLayout from '../components/DriversLayout';


const { Header, Content, Footer } = Layout;

const PAGE_NAME = {
  VEHICLES: 'vehicles',
  DRIVERS: 'drivers',
  TRIPS: 'trips',
  ROUTES: 'routes',
  API: 'api'
}

const items = [
  {
    key: PAGE_NAME.VEHICLES,
    label: 'Vehicles',
  },
  {
    key: PAGE_NAME.DRIVERS,
    label: 'Drivers',
  },
  {
    key: PAGE_NAME.TRIPS,
    label: 'Trips',
  },
  {
    key: PAGE_NAME.ROUTES,
    label: 'Routes',
  },
]




function MainPage() {
  const [pageName, setPageName] = useState(PAGE_NAME.LONG_WAY_EXPRESS)


  const onMenuClick = (e) => {
    setPageName(e.key)
  }

  const renderContent = () => {
    switch(pageName) {
      case PAGE_NAME.VEHICLES: {
        return (<VehiclesLayout />)
      }
      case PAGE_NAME.DRIVERS: {
        return (<DriversLayout />)
      }
      case PAGE_NAME.TRIPS: {
        return (<TripsLayout />)
      }
      case PAGE_NAME.ROUTES: {
        return (<RoutesLayout />)
      }
    }
  }

  return (
    <Layout>
      <Header
        className='main-header'
      >
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={onMenuClick}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: '0 5px',
        }}
      >
        <div
          style={{
            padding: 5,
            height: 'calc(100vh - 130px)'
          }}
        >
          {renderContent()}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Long Way Express ©{new Date().getFullYear()} Created by Bui Huu Thanh - B24CHHT037 
      </Footer>
    </Layout>

  );
}

export default MainPage;