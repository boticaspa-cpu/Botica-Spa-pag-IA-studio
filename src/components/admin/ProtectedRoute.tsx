import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<'loading' | 'auth' | 'unauth'>('loading');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setStatus(user ? 'auth' : 'unauth');
    });
    return unsub;
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#5A5A40] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return status === 'auth' ? <>{children}</> : <Navigate to="/admin/login" replace />;
};
