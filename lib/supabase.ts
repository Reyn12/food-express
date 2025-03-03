import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zdoaqqnnewlvvyxqgvek.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpkb2FxcW5uZXdsdnZ5eHFndmVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMDYzNDIsImV4cCI6MjA1NjU4MjM0Mn0.pZJMhhPwzseawWDb7nPxVHMgNt8j7bGxpBM8aTRkcU8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})