import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const { toast } = useToast();
  const nav = useNavigate();
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    try {
      setBusy(true);
      await auth.signInWithEmail(email.trim(), password);
      toast({ title: "Login feito", description: "Você já pode continuar o curso." });
      nav("/");
    } catch (e: any) {
      toast({ title: "Falha no login", description: e?.message ?? String(e), variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    try {
      setBusy(true);
      await auth.signInWithGoogle();
    } catch (e: any) {
      toast({ title: "Falha no Google", description: e?.message ?? String(e), variant: "destructive" });
      setBusy(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto p-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Entrar</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Use email/senha ou Google. Se o seu projeto estiver sem Supabase configurado, isso não vai funcionar (modo offline).
        </p>

        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm text-foreground/80">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@gmail.com" />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-foreground/80">Senha</label>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" />
          </div>

          <Button className="w-full" onClick={submit} disabled={busy || !email || !password}>
            Entrar
          </Button>

          <Button className="w-full" variant="secondary" onClick={google} disabled={busy}>
            Entrar com Google
          </Button>

          <div className="text-xs text-muted-foreground">
            Não tem conta? <Link className="underline" to="/signup">Cadastrar</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
