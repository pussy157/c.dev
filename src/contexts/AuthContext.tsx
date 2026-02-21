import { useState, useCallback, useMemo } from "react";
import type { Module } from "@/data/types";

const STORAGE_KEY = "cpp-master-progress";

interface ProgressData {
  completedTopics: string[];
  quizScores: Record<string, number>;
  projectImages: Record<string, string>; // topicId -> dataURL
}

const getStoredProgress = (): ProgressData => {
  try {
    // Segurança extra (caso rode em ambiente sem window)
    if (typeof window === "undefined") {
      return { completedTopics: [], quizScores: {}, projectImages: {} };
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as ProgressData;
  } catch {
    // ignore
  }

  return { completedTopics: [], quizScores: {}, projectImages: {} };
};

export const useProgress = (modules: Module[]) => {
  const [progress, setProgress] = useState<ProgressData>(getStoredProgress);

  const saveProgress = useCallback((data: ProgressData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
    setProgress(data);
  }, []);

  const completeTopic = useCallback(
    (topicId: string) => {
      const current = getStoredProgress();
      if (current.completedTopics.includes(topicId)) return;

      saveProgress({
        ...current,
        completedTopics: [...current.completedTopics, topicId],
      });
    },
    [saveProgress]
  );

  const saveProjectImage = useCallback(
    (topicId: string, dataUrl: string) => {
      const current = getStoredProgress();

      saveProgress({
        ...current,
        projectImages: { ...(current.projectImages ?? {}), [topicId]: dataUrl },
      });
    },
    [saveProgress]
  );

  const completeQuiz = useCallback(
    (topicId: string, score: number) => {
      const current = getStoredProgress();

      const newProgress: ProgressData = {
        completedTopics: current.completedTopics.includes(topicId)
          ? current.completedTopics
          : [...current.completedTopics, topicId],
        quizScores: { ...(current.quizScores ?? {}), [topicId]: score },
        projectImages: current.projectImages ?? {},
      };

      saveProgress(newProgress);
    },
    [saveProgress]
  );

  const isCompleted = useCallback(
    (topicId: string) => progress.completedTopics.includes(topicId),
    [progress.completedTopics]
  );

  const getProjectImage = useCallback(
    (topicId: string) => progress.projectImages?.[topicId] || null,
    [progress.projectImages]
  );

  /**
   * ✅ BUGFIX: antes estava `[]` e “congelava” com modules vazio (loading).
   * Agora recalcula quando `modules` mudar.
   */
  const moduleTopicIds = useMemo(() => {
    const map = new Map<number, string[]>();
    for (const m of modules) map.set(m.id, m.topics.map((t) => t.id));
    return map;
  }, [modules]);

  /**
   * ✅ BUGFIX: precisa depender de `modules` também (antes congelava).
   */
  const canAccessModule = useCallback(
    (moduleId: number) => {
      const mod = modules.find((m) => m.id === moduleId);
      if (!mod) return false;

      const req = mod.requiresModuleIds ?? [];
      if (req.length === 0) return true;

      // regra: módulo libera apenas quando TODOS os tópicos do(s) módulo(s) requerido(s) estiverem concluídos
      for (const reqId of req) {
        const ids = moduleTopicIds.get(reqId) || [];
        const ok = ids.every((id) => progress.completedTopics.includes(id));
        if (!ok) return false;
      }

      return true;
    },
    [modules, moduleTopicIds, progress.completedTopics]
  );

  const canAccessTopic = useCallback(
    (moduleId: number, topicId: string) => {
      if (!canAccessModule(moduleId)) return false;

      const ids = moduleTopicIds.get(moduleId) || [];
      const idx = ids.indexOf(topicId);
      if (idx === -1) return false;

      // regra: “não pode pular tópico”: precisa concluir todos anteriores no módulo
      for (let i = 0; i < idx; i++) {
        if (!progress.completedTopics.includes(ids[i])) return false;
      }

      return true;
    },
    [progress.completedTopics, moduleTopicIds, canAccessModule]
  );

  /**
   * ✅ BUGFIX: também precisa de `modules` nas deps (antes usava modules “antigo”).
   */
  const getModuleProgress = useCallback(
    (moduleId: number) => {
      const mod = modules.find((m) => m.id === moduleId);
      if (!mod) return 0;

      const completed = mod.topics.filter((t) =>
        progress.completedTopics.includes(t.id)
      ).length;

      return Math.round((completed / mod.topics.length) * 100);
    },
    [modules, progress.completedTopics]
  );

  // Mantém exatamente a API que o resto do projeto espera
  return {
    completedTopics: progress.completedTopics,
    quizScores: progress.quizScores,
    projectImages: progress.projectImages,
    completeTopic,
    saveProjectImage,
    completeQuiz,
    isCompleted,
    getProjectImage,
    canAccessModule,
    canAccessTopic,
    getModuleProgress,
  };
};
