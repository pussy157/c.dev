import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useCourseModules } from "@/hooks/useCourseModules";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type TopicType = "lesson" | "project" | "quiz";

export default function AdminDashboard() {
  const { toast } = useToast();
  const auth = useAuth();
  const qc = useQueryClient();
  const course = useCourseModules();

  const modules = course.data ?? [];
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);

  const selectedModule = useMemo(() => {
    const id = selectedModuleId ?? modules[0]?.id ?? null;
    if (id && selectedModuleId === null) setSelectedModuleId(id);
    return modules.find((m) => m.id === id) ?? null;
  }, [modules, selectedModuleId]);

  // New module form
  const [mTitle, setMTitle] = useState("");
  const [mDesc, setMDesc] = useState("");
  const [mLevel, setMLevel] = useState("Extra");
  const [mOrder, setMOrder] = useState(100);

  // New topic form
  const [tTitle, setTTitle] = useState("");
  const [tDesc, setTDesc] = useState("");
  const [tType, setTType] = useState<TopicType>("lesson");
  const [tOrder, setTOrder] = useState(10);
  const [tMarkdown, setTMarkdown] = useState("");

  const isAdmin = auth.role === "admin";

  const ensure = () => {
    if (!supabase) throw new Error("Supabase não configurado (faltam variáveis VITE_...)");
    if (!isAdmin) throw new Error("Acesso negado: você não é admin");
  };

  const refresh = async () => {
    await qc.invalidateQueries({ queryKey: ["course-modules"] });
    toast({ title: "Atualizado", description: "Dados do curso recarregados." });
  };

  const createModule = async () => {
    try {
      ensure();
      const { error } = await supabase!.from("course_modules").insert({
        title: mTitle.trim(),
        description: mDesc.trim(),
        level: mLevel.trim(),
        sort_order: Number(mOrder),
      });
      if (error) throw error;
      setMTitle(""); setMDesc(""); setMLevel("Extra"); setMOrder(100);
      await refresh();
    } catch (e: any) {
      toast({ title: "Erro ao criar módulo", description: e?.message ?? String(e), variant: "destructive" });
    }
  };

  const deleteModule = async (id: number) => {
    try {
      ensure();
      const { error } = await supabase!.from("course_modules").delete().eq("id", id);
      if (error) throw error;
      await refresh();
      setSelectedModuleId(null);
    } catch (e: any) {
      toast({ title: "Erro ao apagar módulo", description: e?.message ?? String(e), variant: "destructive" });
    }
  };

  const createTopic = async () => {
    try {
      ensure();
      if (!selectedModule) throw new Error("Selecione um módulo");
      const { error } = await supabase!.from("course_topics").insert({
        module_id: selectedModule.id,
        title: tTitle.trim(),
        description: tDesc.trim(),
        type: tType,
        sort_order: Number(tOrder),
        content_markdown: tMarkdown.trim() || null,
      });
      if (error) throw error;
      setTTitle(""); setTDesc(""); setTType("lesson"); setTOrder(10); setTMarkdown("");
      await refresh();
    } catch (e: any) {
      toast({ title: "Erro ao criar tópico", description: e?.message ?? String(e), variant: "destructive" });
    }
  };

  const deleteTopic = async (dbTopicId: number) => {
    try {
      ensure();
      const { error } = await supabase!.from("course_topics").delete().eq("id", dbTopicId);
      if (error) throw error;
      await refresh();
    } catch (e: any) {
      toast({ title: "Erro ao apagar tópico", description: e?.message ?? String(e), variant: "destructive" });
    }
  };

  if (!auth.isReady) {
    return <Layout><div className="p-6">Carregando…</div></Layout>;
  }

  if (!auth.user) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto p-6 space-y-3">
          <h1 className="text-2xl font-bold text-foreground">Dashboard Admin</h1>
          <p className="text-sm text-muted-foreground">
            Você precisa estar logado para acessar o painel.
          </p>
          <Button asChild><Link to="/login">Ir para login</Link></Button>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto p-6 space-y-3">
          <h1 className="text-2xl font-bold text-foreground">Acesso negado</h1>
          <p className="text-sm text-muted-foreground">
            Seu usuário não tem role <b>admin</b>. Para virar admin:
          </p>
          <ol className="list-decimal ml-5 text-sm text-muted-foreground space-y-1">
            <li>Crie a conta (email real) no /signup ou Google.</li>
            <li>No Supabase SQL Editor, rode: <code className="px-1">update public.profiles set role='admin' where id='SEU_UUID';</code></li>
          </ol>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Admin</h1>
          <p className="text-sm text-muted-foreground">
            Aqui você cria módulos e tópicos no banco (Supabase). O app lê do banco; se o banco estiver vazio, cai no conteúdo local.
          </p>
          <div className="mt-3">
            <Button variant="secondary" onClick={refresh} disabled={course.isLoading}>
              Recarregar dados
            </Button>
          </div>
        </div>

        {/* Create module */}
        <section className="p-6 rounded-xl border border-border bg-card space-y-4">
          <h2 className="text-lg font-bold text-foreground">Criar módulo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm text-foreground/80">Título</label>
              <Input value={mTitle} onChange={(e) => setMTitle(e.target.value)} placeholder="Ex: Extra — Redes (Sockets)" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-foreground/80">Nível</label>
              <Input value={mLevel} onChange={(e) => setMLevel(e.target.value)} placeholder="Ex: Intermediário / Avançado / Extra" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-foreground/80">Descrição</label>
              <Textarea value={mDesc} onChange={(e) => setMDesc(e.target.value)} placeholder="Explique objetivo do módulo" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-foreground/80">Ordem</label>
              <Input value={String(mOrder)} onChange={(e) => setMOrder(Number(e.target.value || 0))} type="number" />
            </div>
          </div>
          <Button onClick={createModule} disabled={!mTitle.trim() || !mDesc.trim()}>
            Criar módulo
          </Button>
        </section>

        {/* Module selector + topics */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-border bg-card">
            <h2 className="text-lg font-bold text-foreground mb-3">Módulos no banco</h2>

            {course.isLoading ? (
              <div className="text-sm text-muted-foreground">Carregando…</div>
            ) : (
              <div className="space-y-2">
                {modules.map((m) => (
                  <button
                    key={m.id}
                    className={[
                      "w-full text-left p-3 rounded-lg border transition-colors",
                      selectedModule?.id === m.id ? "border-primary bg-primary/10" : "border-border hover:bg-muted/40",
                    ].join(" ")}
                    onClick={() => setSelectedModuleId(m.id)}
                  >
                    <div className="font-semibold text-foreground">{m.title}</div>
                    <div className="text-xs text-muted-foreground">{m.level} • id {m.id}</div>
                  </button>
                ))}
                {modules.length === 0 && (
                  <div className="text-sm text-muted-foreground">
                    Nenhum módulo no banco (o app está usando o conteúdo local).
                  </div>
                )}
              </div>
            )}

            {selectedModule && (
              <div className="mt-4">
                <Button variant="destructive" onClick={() => deleteModule(selectedModule.id)}>
                  Apagar módulo selecionado
                </Button>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h2 className="text-lg font-bold text-foreground mb-2">Tópicos do módulo</h2>
              {!selectedModule ? (
                <div className="text-sm text-muted-foreground">Selecione um módulo.</div>
              ) : (
                <div className="space-y-2">
                  {selectedModule.topics.map((t: any) => (
                    <div key={t.id} className="p-3 rounded-lg border border-border flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-foreground">{t.title}</div>
                        <div className="text-xs text-muted-foreground">{t.type} • {t.description}</div>
                        <div className="text-xs text-muted-foreground">topic id: {t.id}</div>
                      </div>
                      <Button variant="destructive" onClick={() => deleteTopic(t._dbId)}>
                        Apagar
                      </Button>
                    </div>
                  ))}
                  {selectedModule.topics.length === 0 && (
                    <div className="text-sm text-muted-foreground">Sem tópicos ainda.</div>
                  )}
                </div>
              )}
            </div>

            <div className="p-6 rounded-xl border border-border bg-card space-y-4">
              <h2 className="text-lg font-bold text-foreground">Criar tópico</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm text-foreground/80">Título</label>
                  <Input value={tTitle} onChange={(e) => setTTitle(e.target.value)} placeholder="Ex: Ponteiros (com segurança mental)" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-foreground/80">Tipo</label>
                  <select
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                    value={tType}
                    onChange={(e) => setTType(e.target.value as TopicType)}
                  >
                    <option value="lesson">lesson</option>
                    <option value="project">project</option>
                    <option value="quiz">quiz</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-foreground/80">Descrição</label>
                  <Textarea value={tDesc} onChange={(e) => setTDesc(e.target.value)} placeholder="Resumo do tópico" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-foreground/80">Ordem</label>
                  <Input value={String(tOrder)} onChange={(e) => setTOrder(Number(e.target.value || 0))} type="number" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-foreground/80">Conteúdo (Markdown)</label>
                  <Textarea
                    value={tMarkdown}
                    onChange={(e) => setTMarkdown(e.target.value)}
                    placeholder={"# Título\n\nTexto...\n\n```cpp\nint main(){}\n```"}
                    className="min-h-[220px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Para tópicos do banco, o app renderiza Markdown. (Para os módulos locais, ele continua usando os blocos estruturados.)
                  </p>
                </div>
              </div>

              <Button onClick={createTopic} disabled={!selectedModule || !tTitle.trim() || !tDesc.trim()}>
                Criar tópico no módulo selecionado
              </Button>
            </div>
          </div>
        </section>

        <section className="p-6 rounded-xl border border-border bg-card space-y-2">
          <h2 className="text-lg font-bold text-foreground">Checklist do Supabase</h2>
          <ol className="list-decimal ml-5 text-sm text-muted-foreground space-y-1">
            <li>Crie o projeto no Supabase.</li>
            <li>Rode o SQL em <code className="px-1">/supabase/schema.sql</code>.</li>
            <li>Ative Google provider e Email confirmations (opcional).</li>
            <li>Configure <code className="px-1">VITE_SUPABASE_URL</code> e <code className="px-1">VITE_SUPABASE_ANON_KEY</code> no .env.</li>
            <li>Crie sua conta admin (email real), pegue o UUID e marque role=admin.</li>
          </ol>
        </section>
      </div>
    </Layout>
  );
}
