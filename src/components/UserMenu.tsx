import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

export default function UserMenu({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-slate-800 rounded-lg text-white hover:bg-slate-700 transition"
      >
        {email}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-700 rounded-lg shadow-lg">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white transition"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}