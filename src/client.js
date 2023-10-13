
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wnybnmsuusczkipaaorn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndueWJubXN1dXNjemtpcGFhb3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxNTU3ODAsImV4cCI6MjAxMjczMTc4MH0.vSVhMxGaBm_qFsT20_PFYQwEpj9y9z6VjDZToUk0qNg'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase