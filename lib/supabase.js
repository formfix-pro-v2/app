import { createClient } from '@supabase/supabase-js'

// Ove podatke ćeš dobiti kada napraviš nalog na supabase.com
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
