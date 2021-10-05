import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://kpriwlucrliwacagwjvk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzM2NzU2OSwiZXhwIjoxOTQ4OTQzNTY5fQ.uBBXtyxbwKixUgql4tiYUsqOgSPyB4mLSc2kybqPCPI"
);
