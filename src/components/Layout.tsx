import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  BookOpen,
  Terminal,
  Lock,
} from "lucide-react";
import { useCourseModules } from "@/hooks/useCourseModules";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/contexts/AuthContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState<number[]>([1]);
  const location = useLocation();

  const course = useCourseModules();
  const modules = course.data ?? [];

  const auth = useAuth();

  // ✅ progress por usuário (cada conta separada)
  const { isCompleted, getModuleProgress, canAccessModule, canAccessTopic } =
    useProgress(modules, auth.user?.id ?? null);

  const toggleModule = (id: number) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const sidebar = (
    <aside className="h-full w-72 bg-card border-r border-border flex flex-col">
      <div className="p-5 border-b border-border">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setSidebarOpen(false)}
        >
          <Terminal className="h-7 w-7 text-primary" />
          <div>
            <h1 className="font-bold text-foreground">C++ Master</h1>
            <p className="text-xs text-muted-foreground">
              Do zero ao sênior (+ extras)
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {modules.map((mod) => {
          const progress = getModuleProgress(mod.id);
          const moduleUnlocked = canAccessModule(mod.id);

          return (
            <div key={mod.id} className={!moduleUnlocked ? "opacity-70" : ""}>
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors text-left"
              >
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground block truncate flex items-center gap-2">
                    {!moduleUnlocked && (
                      <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    )}
                    {mod.id}. {mod.title}
                  </span>

                  {progress > 0 && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {progress}%
                      </span>
                    </div>
                  )}

                  {!moduleUnlocked && (
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Complete o módulo anterior para desbloquear.
                    </p>
                  )}
                </div>

                {expandedModules.includes(mod.id) ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
                )}
              </button>

              {expandedModules.includes(mod.id) && (
                <div className="ml-3 pl-3 border-l border-border space-y-0.5 mt-1 mb-2">
                  {mod.topics.map((topic) => {
                    const topicPath = `/topico/${mod.id}/${topic.id}`;
                    const isActive =
                      location.pathname === topicPath ||
                      location.pathname === `/quiz/${mod.id}/${topic.id}`;

                    const completed = isCompleted(topic.id);
                    const unlocked = canAccessTopic(mod.id, topic.id);

                    if (!unlocked) {
                      return (
                        <div
                          key={topic.id}
                          className="flex items-center gap-2 py-1.5 px-2 rounded-md text-xs text-muted-foreground/80 cursor-not-allowed"
                          title="Complete o tópico anterior para liberar"
                        >
                          <Lock className="h-3.5 w-3.5 flex-shrink-0" />
                          <span className="truncate">{topic.title}</span>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={topic.id}
                        to={topicPath}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-2 py-1.5 px-2 rounded-md text-xs transition-colors ${
                          isActive
                            ? "bg-primary/15 text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                      >
                        {completed ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        ) : (
                          <BookOpen className="h-3.5 w-3.5 flex-shrink-0" />
                        )}
                        <span className="truncate">{topic.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="hidden lg:block fixed top-0 left-0 h-full z-30">
        {sidebar}
      </div>

      <div
        className={`fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative">
          {sidebar}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 lg:ml-72">
        <header className="lg:hidden sticky top-0 z-30 bg-card/90 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5 text-foreground" />
          </button>

          <Terminal className="h-5 w-5 text-primary" />
          <span className="font-semibold text-sm text-foreground">C++ Master</span>

          {/* ✅ evita sumir em zoom por layout apertado */}
          <div className="ml-auto flex items-center gap-2 flex-wrap">
            {auth.user ? (
              <>
                {auth.role === "admin" && (
                  <Link
                    to="/admin"
                    className="text-xs px-2 py-1 rounded-md border border-border hover:bg-muted/40 shrink-0"
                  >
                    Admin
                  </Link>
                )}
                <button
                  className="text-xs px-2 py-1 rounded-md border border-border hover:bg-muted/40 shrink-0"
                  onClick={() => auth.signOut()}
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-xs px-2 py-1 rounded-md border border-border hover:bg-muted/40 shrink-0"
              >
                Entrar
              </Link>
            )}
          </div>
        </header>

        <main className="p-5 lg:p-10 max-w-4xl mx-auto animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
