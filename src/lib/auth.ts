import { supabase } from './supabase';
import type { UserRole } from '../types/auth';

export async function createUserWithProfile(email: string, password: string, name: string, role: UserRole) {
  // Check if user exists first
  const { data: existingUser } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single();

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, role }
    }
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error('No user data returned');

  try {
    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{
        id: authData.user.id,
        email: authData.user.email,
        name,
        role
      }]);

    if (profileError) throw profileError;

    return authData.user;
  } catch (error) {
    // Cleanup auth user if profile creation fails
    await supabase.auth.admin.deleteUser(authData.user.id);
    throw error;
  }
}

export async function signInUser(email: string, password: string) {
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (authError) {
    if (authError.status === 400) {
      throw new Error('Invalid email or password');
    }
    throw authError;
  }

  if (!authData.user) throw new Error('No user data returned');

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, name, role, email')
    .eq('id', authData.user.id)
    .single();

  if (profileError) throw profileError;

  return { user: authData.user, profile };
}