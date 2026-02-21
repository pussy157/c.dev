import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCourseModules } from "@/hooks/useCourseModules";
import { topicContent } from "@/data/content";
import { quizData } from "@/data/quizzes";
import CodeBlock from "@/components/CodeBlock";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  FileQuestion,
  Info,
  Lock,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/contexts/AuthContext";

const TopicPage = () => {
  const { moduleId, topicId } = useParams();
  const navigate = useNavigate();

  const auth = useAuth();

  const course = useCourseModules();
  const modules = course.data ?? [];

  // ✅ progresso por usuário
  const {
    quizScores,
    completeTopic,
    saveProjectImage,
    isCompleted,
    getProjectImage,
    canAccessTopic,
  } = useProgress(modules, auth.user?.id ?? null);

  // Loading
  if (course.isLoading) {
    return (
      <Layout>
        <div className="p-6">Carregando tópico…</div>
      </Layout>
    );
  }

  // ✅ se por algum motivo ainda não carregou módulos, evita “travar tudo”
  if (!modules.length) {
    return (
      <Layout>
        <div className="p-6 text-muted-foreground">Nenhum módulo carregado.</div>
      </Layout>
    );
  }

  const module = modules.find((m) => m.id === Number(moduleId));
  const topic = module?.topics.find((t) => t.id === topicId);
  const content = topicContent[topicId || ""];

  const [uploadError, setUploadError] = useState<string | null>(null);

  const unlocked = module && topic ? canAccessTopic(module.id, topic.id) : false;
  const completed = topic ? isCompleted(topic.id) : false;

  const allTopics = useMemo(
    () => modules.flatMap((m) => m.topics.map((t) => ({ moduleId: m.id, ...t }))),
    [modules]
  );

  const globalIndex = allTopics.findIndex((t) => t.id === topicId);
  const prevTopic = globalIndex > 0 ? allTopics[globalIndex - 1] : null;
  const nextTopic = globalIndex < allTopics.length - 1 ? allTopics[globalIndex + 1] : null;

  const hasQuiz = !!quizData[topicId || ""];
  const score = topicId ? quizScores[topicId] : undefined;

  const projectImage = topic ? getProjectImage(topic.id) : null;

  const handleUpload = async (file: File) => {
    setUploadError(null);
    if (!file.type.startsWith("image/")) {
      setUploadError("Envie um arquivo de imagem (png/jpg/webp).");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setUploadError("Imagem grande demais. Use até 3MB (recomendo PNG/JPG).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      if (topic) saveProjectImage(topic.id, dataUrl);
    };
    reader.onerror = () => setUploadError("Falha ao ler o arquivo. Tente outra imagem.");
    reader.readAsDataURL(file);
  };

  const markdown = (topic as any)?.contentMarkdown as string | undefined;

  if (!module || !topic || (!content && !markdown)) {
    return (
      <Layout>
        <div className="text-center py-20 text-muted-foreground">Tópico não encontrado</div>
      </Layout>
    );
  }

  if (!unlocked) {
    return (
      <Layout>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 flex-wrap">
          <Link to="/" className="hover:text-foreground transition-colors">
            Início
          </Link>
          <span>/</span>
          <span>Módulo {module.id}</span>
          <span>/</span>
          <span className="text-foreground">{topic.title}</span>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-secondary mb-4">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground mb-2">Tópico bloqueado</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Você não pode pular tópicos. Conclua o tópico anterior para liberar este.
          </p>
          {prevTopic && (
            <Button
              onClick={() => navigate(`/topico/${prevTopic.moduleId}/${prevTopic.id}`)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Ir para o tópico anterior
            </Button>
          )}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 flex-wrap">
        <Link to="/" className="hover:text-foreground transition-colors">
          Início
        </Link>
        <span>/</span>
        <span>Módulo {module.id}</span>
        <span>/</span>
        <span className="text-foreground">{topic.title}</span>
        {completed && (
          <span className="ml-2 text-primary text-[10px] bg-primary/10 px-2 py-0.5 rounded-full">
            ✓ Concluído
          </span>
        )}
      </div>

      <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">{topic.title}</h1>
      <p className="text-muted-foreground mb-8">{topic.description}</p>

      <div className="space-y-5">
        {Array.isArray(content) && content.length > 0 ? (
          content.map((block, i) => {
            switch (block.type) {
              case "text":
                return (
                  <p key={i} className="text-foreground/90 leading-relaxed text-sm lg:text-base">
                    {block.content}
                  </p>
                );
              case "code":
                return <CodeBlock key={i} code={block.content} title={block.title} />;
              case "heading":
                return (
                  <h2 key={i} className="text-xl font-bold text-foreground mt-6">
                    {block.content}
                  </h2>
                );
              case "list":
                return (
                  <ul key={i} className="space-y-1.5 ml-1">
                    {block.items?.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-foreground/90">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              case "note":
                return (
                  <div key={i} className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3">
                    <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/90">{block.content}</p>
                  </div>
                );
              case "image":
                return (
                  <figure key={i} className="bg-card border border-border rounded-xl p-4">
                    <img
                      src={block.src}
                      alt={block.alt || "Imagem"}
                      className="w-full rounded-lg"
                      loading="lazy"
                    />
                    {(block.caption || block.alt) && (
                      <figcaption className="text-xs text-muted-foreground mt-2">
                        {block.caption || block.alt}
                      </figcaption>
                    )}
                  </figure>
                );
              default:
                return null;
            }
          })
        ) : (
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{markdown ?? ""}</ReactMarkdown>
          </div>
        )}
      </div>

      {/* Ações de conclusão */}
      <div className="mt-10 space-y-4">
        {topic.type === "lesson" && (
          <div className="p-6 bg-card rounded-xl border border-border">
            <h3 className="text-lg font-bold text-foreground mb-2">Concluir tópico</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Quando você terminar os mini-treinos acima, marque este tópico como concluído para
              liberar o próximo.
            </p>
            {completed ? (
              <div className="inline-flex items-center gap-2 text-sm text-primary">
                <CheckCircle2 className="h-4 w-4" /> Tópico concluído
              </div>
            ) : (
              <Button onClick={() => completeTopic(topic.id)} className="gap-2">
                <CheckCircle2 className="h-4 w-4" /> Marcar como concluído
              </Button>
            )}
          </div>
        )}

        {topic.type === "quiz" && hasQuiz && (
          <div className="p-6 bg-card rounded-xl border border-border text-center">
            <h3 className="text-lg font-bold text-foreground mb-2">Quiz final do módulo</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Faça o quiz para validar que você realmente aprendeu o módulo.
            </p>
            {typeof score === "number" && completed ? (
              <div className="text-sm text-primary mb-3">✓ Concluído — Nota: {score}%</div>
            ) : null}
            <Button onClick={() => navigate(`/quiz/${moduleId}/${topicId}`)} className="gap-2">
              <FileQuestion className="h-4 w-4" /> Iniciar Quiz
            </Button>
          </div>
        )}

        {topic.type === "project" && (
          <div className="p-6 bg-card rounded-xl border border-border">
            <h3 className="text-lg font-bold text-foreground mb-2">Entrega do projeto (obrigatório)</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Para liberar o próximo módulo, envie um print do projeto funcionando e marque como concluído.
            </p>

            <div className="grid gap-4">
              <label className="text-sm text-foreground font-medium flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                Enviar imagem (print) — até 3MB
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(file);
                }}
                className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-secondary file:text-foreground hover:file:bg-secondary/80"
              />

              {uploadError && <p className="text-sm text-destructive">{uploadError}</p>}

              {projectImage && (
                <div className="bg-secondary/30 border border-border rounded-xl p-3">
                  <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                  <img src={projectImage} alt="Preview do projeto" className="w-full rounded-lg" />
                </div>
              )}

              <div className="flex items-center gap-3 flex-wrap">
                {completed ? (
                  <div className="inline-flex items-center gap-2 text-sm text-primary">
                    <CheckCircle2 className="h-4 w-4" /> Projeto concluído
                  </div>
                ) : (
                  <Button
                    onClick={() => completeTopic(topic.id)}
                    className="gap-2"
                    disabled={!projectImage}
                    title={!projectImage ? "Envie uma imagem do projeto rodando para liberar a conclusão" : undefined}
                  >
                    <CheckCircle2 className="h-4 w-4" /> Marcar projeto como concluído
                  </Button>
                )}

                {!projectImage && !completed && (
                  <p className="text-xs text-muted-foreground">
                    (Obrigatório) Envie um print do projeto rodando para habilitar o botão.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-10 gap-3">
        {prevTopic ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/topico/${prevTopic.moduleId}/${prevTopic.id}`)}
            className="gap-2 text-xs max-w-[45%]"
          >
            <ArrowLeft className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{prevTopic.title}</span>
          </Button>
        ) : (
          <div />
        )}

        {nextTopic ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/topico/${nextTopic.moduleId}/${nextTopic.id}`)}
            className="gap-2 text-xs max-w-[45%]"
          >
            <span className="truncate">{nextTopic.title}</span>
            <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
          </Button>
        ) : (
          <div />
        )}
      </div>
    </Layout>
  );
};

export default TopicPage;
