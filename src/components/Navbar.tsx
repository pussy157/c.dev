import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-slate-950 text-white">
      <h1 className="font-bold text-lg">C++ Master</h1>

      {user && <UserMenu email={user.email} />}
    </div>
  );
}