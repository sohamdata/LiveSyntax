import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Room from './pages/Room';
import { toast, Toaster, ToastBar } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster toastOptions={{
        duration: 3000,
        position: "top-right",
      }}>
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <button onClick={() => toast.dismiss(t.id)} >
                    ✖️
                  </button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/editor/:roomId" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
