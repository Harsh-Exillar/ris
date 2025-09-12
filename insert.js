import fs from 'fs';
import csv from 'csv-parser';
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project details
const SUPABASE_URL = 'https://duzglmnrcczwpvkrrngv.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1emdsbW5yY2N6d3B2a3Jybmd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzU3NjAwNiwiZXhwIjoyMDczMTUyMDA2fQ.2nMjbxYUfGs5xCPyGk8PV8oRvktGnMw6E8ztUjMImIg'; // Get this from Supabase Dashboard → Settings → API → service_role

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

fs.createReadStream('Restaurant Details - Dim Store with MailID.csv')
  .pipe(csv())
  .on('data', async (row) => {
    const obid = row.OBID; // Adjust column name as per your CSV
    const password = row.Password; // Adjust column name as per your CSV
    const email = `${obid}@oceanbasket.com`;

    // Create user
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (error) {
      console.error(`Error creating user ${email}:`, error.message);
    } else {
      console.log(`User created: ${email}`);
    }
  })
  .on('end', () => {
    console.log('CSV import complete.');
  });