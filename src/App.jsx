import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage.jsx';

function App() {
    return (
      <Router basename="/">
        <div>
          <Routes>
            <Route index path="/" element={<MainPage />}>
            </Route>
          </Routes>
        </div>
      </Router >
    );
  }
  
  export default App;