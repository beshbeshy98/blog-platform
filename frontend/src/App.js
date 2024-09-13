import './App.css';
import AuthRoute from './components/AuthRoute';
import Footer from './components/Footer';
import Auth from './pages/Auth';
import CreateEditPostPage from './pages/CreateEditPostPage';
import HomePage from './pages/HomePage';
import SinglePostPage from './pages/SinglePostPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
      <Router>
          <div className="App">
              <Routes>
                  {/* Public Route */}
                  <Route path="/login" element={<Auth />} />

                  {/* Protected Routes */}
                  <Route path="/" element={
                      <AuthRoute>
                          <HomePage />
                      </AuthRoute>
                  } />
                  <Route path="/posts/:postId" element={
                      <AuthRoute>
                          <SinglePostPage />
                      </AuthRoute>
                  } />
                  <Route path="/edit/:postId?" element={
                      <AuthRoute>
                          <CreateEditPostPage />
                      </AuthRoute>
                  } />
                  <Route path="/create" element={
                      <AuthRoute>
                          <CreateEditPostPage />
                      </AuthRoute>
                  } />
              </Routes>
              <Footer />

          </div>
      </Router>
  );
}

export default App;
