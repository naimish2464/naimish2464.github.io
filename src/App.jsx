import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import SEOSchema from './components/SEOSchema';
import SEOHead from './components/SEOHead';

function App() {
  return (
    <BrowserRouter>
      <SEOHead />
      <SEOSchema />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
