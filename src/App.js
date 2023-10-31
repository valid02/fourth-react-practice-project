import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    // کدی که نمیخواهیم مستقیما در تابع کامپوننت اجرا شود را اینجا مینویسیم
    // این کد پس از اجرای تابع کامپوننت، توسط ریکت اجرا میشود
    // ها و اجرا شدن دوباره تابع کامپوننت، اجرا نمیشود state اما اگر بعد از به روز رسانی
    // تغییر کنند دوباره اجرا میشود useEffect فقط در صورتی که وابستگی های آرایه آرگومان دوم
    // در مثال زیر وابستگی نداریم پس کد ما فقط یک بار با شروع برنامه اجرا میشود
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
      // کامپوننت ما دوباره اجرا میشود state پس از اجرا شدن این تابع و تغییر
      // ولی از آنجا کا در اینجا ما هیچ وابستگی نداریم این کد فقط همان بار اول موقع اجرای برنامه اجرا میشود
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
    <AuthContext.Provider 
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler
      }}
    >
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
