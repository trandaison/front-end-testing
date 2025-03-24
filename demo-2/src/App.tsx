import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListPage from '@/pages/products/index';
// import ProductDetailPage from '@/pages/ProductDetailPage';
// import NotFoundPage from '@/pages/NotFoundPage';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        {/* <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
