import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/types/supabase';

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Nur einmal beim ersten Laden ausführen
    if (!initialized) {
      const clearSession = async () => {
        try {
          await supabase.auth.signOut();
          localStorage.clear();
          setUser(null);
          setProfile(null);
        } catch (error) {
          console.error('Error clearing session:', error);
        } finally {
          setLoading(false);
          setInitialized(true);
        }
      };

      clearSession();
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth State Change Event:', event);
        console.log('Session vorhanden?', !!session);
        console.log('Aktueller Pfad:', window.location.pathname);

        if (event === 'SIGNED_IN' && session) {
          console.log('SIGNED_IN erkannt - User wird gesetzt');
          setUser(session.user);
          if (session.user) {
            console.log('User-ID:', session.user.id);
            await fetchProfile(session.user.id);
          }
        } else if (event === 'SIGNED_OUT') {
          console.log('SIGNED_OUT erkannt - User wird gelöscht');
          setUser(null);
          setProfile(null);
          console.log('User und Profil auf null gesetzt');
        }
        
        console.log('Loading wird auf false gesetzt');
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [initialized]); // Nur von initialized abhängig

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 