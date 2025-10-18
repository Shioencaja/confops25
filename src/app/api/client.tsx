import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASEURL as string;
const supabaseKey = process.env.SUPABASEKEY as string;

export const client = createClient(supabaseUrl, supabaseKey);
