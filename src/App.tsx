import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Toaster } from 'sonner';
import { Navigation } from './components/Navigation';
import { Discovery } from './pages/Discovery';
import { Matches } from './pages/Matches';
import { Profile } from './pages/Profile';
import { Premium } from './pages/Premium';
import { Chat } from './pages/Chat';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-rose-100 selection:text-rose-900">
          <div className="max-w-screen-sm mx-auto bg-white min-h-screen shadow-2xl relative">
            <Routes>
              <Route path="/" element={<><Discovery /><Navigation /></>} />
              <Route path="/matches" element={<><Matches /><Navigation /></>} />
              <Route path="/profile" element={<><Profile /><Navigation /></>} />
              <Route path="/premium" element={<><Premium /><Navigation /></>} />
              <Route path="/chat/:profileId" element={<Chat />} />
            </Routes>
          </div>
          <Toaster position="top-center" richColors />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;