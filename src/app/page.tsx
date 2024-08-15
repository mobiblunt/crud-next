'use client';

import React, { useState, useEffect } from 'react';
import { Provider, defaultTheme, View } from '@adobe/react-spectrum';
import Auth from '../components/Auth';
import App from '../components/App';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Provider theme={defaultTheme} height="100vh">
      <View height="100%">
        {!session ? <Auth /> : <App />}
      </View>
    </Provider>
  );
}