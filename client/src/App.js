import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Layout from './layout';
import Register from './pages/register';
import ChatRoom from './pages/chat-page';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/register' element={<Register />} />
          <Route path='/chat' element={<ChatRoom />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
