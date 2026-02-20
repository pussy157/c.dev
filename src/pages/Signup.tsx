import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function Signup() {
  const { toast } = useToast();
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    try {
      setBusy(true);
      await auth.signUpWithEmail(email.trim(), password);
      toast({
        title: "Conta criada",
        description:
          "Agora confirme o email (verificação). Depois do clique de confirmação, volte e faça login.",
      });
    } catch (e: any) {
      toast({ title: "Falha no cadastro", description: e?.message ?? String(e), variant: "destructive" });
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
        <h1 className="text-2xl font-bold text-foreground mb-2">Cadastrar</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Cadastro por email/senha exige verificação por email (se você ativar no Supabase). Google já entra como verificado.
        </p>

        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm text-foreground/80">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@gmail.com" />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-foreground/80">Senha</label>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="mín. 6 caracteres" />
          </div>

          <Button className="w-full" onClick={submit} disabled={busy || !email || password.length < 6}>
            Criar conta
          </Button>

          <Button className="w-full" variant="secondary" onClick={google} disabled={busy}>
            Continuar com Google
          </Button>

          <div className="text-xs text-muted-foreground">
            Já tem conta? <Link className="underline" to="/login">Entrar</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
