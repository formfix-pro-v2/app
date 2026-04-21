import { createClient } from '@supabase/supabase-js'

// Tvoji uneti podaci sa Supabase panela
const supabaseUrl = 'https://yxzttbqkamyrfabdhgau.supabase.co'
const supabaseAnonKey = 'sb_publishable_dN8is-V2SwWjdFTUYnifeA_gUrvJjrc'

// Inicijalizacija Supabase klijenta
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

