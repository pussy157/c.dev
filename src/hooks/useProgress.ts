import { useState, useCallback, useMemo, useEffect } from "react";
import type { Module } from "@/data/types";

type ProgressData = {
  completedTopics: string[];
  quizScores: Record<string, number>;
  projectImages: Record<string, string>;
};

// chave base
const STORAGE_KEY_BASE = "cpp-master-progress";

// monta chave por usuário (ou guest)
const makeStorageKey = (userId?: string | null) =>
  `${STORAGE_KEY_BASE}:${userId ?? "guest"}`;

const emptyProgress: ProgressData = {
  completedTopics: [],
  quizScores: {},
  projectImages: {},
};

const safeParse = (raw: string | null): ProgressData => {
  if (!raw) return emptyProgress;
  try {
    const p = JSON.parse(raw);
    return {
      completedTopics: Array.isArray(p?.completedTopics) ? p.completedTopics : [],
      quizScores: p?.quizScores && typeof p.quizScores === "object" ? p.quizScores : {},
      projectImages:
        p?.projectImages && typeof p.projectImages === "object" ? p.projectImages : {},
    };
  } catch {
    return emptyProgress;
  }
};

/**
 * useProgress(modules, userId?)
 * - Se você já tem o userId no app (Supabase auth), passe aqui.
 * - Se não passar, cai em "guest".
 */
export const useProgress = (modules: Module[], userId?: string | null) => {
  const storageKey = makeStorageKey(userId);

  const [progress, setProgress] = useState<ProgressData>(() => {
    if (typeof window === "undefined") return emptyProgress;
    return safeParse(localStorage.getItem(storageKey));
  });

  // ✅ quando troca de conta (userId), recarrega o progresso correto
  useEffect(() => {
    if (typeof window === "undefined") return;
    setProgress(safeParse(localStorage.getItem(storageKey)));
  }, [storageKey]);

  const saveProgress = useCallback(
    (data: ProgressData) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
      } catch {
        // ignore
      }
      setProgress(data);
    },
    [storageKey]
  );

  const completeTopic = useCallback(
    (topicId: string) => {
      if (progress.completedTopics.includes(topicId)) return;

      saveProgress({
        ...progress,
        completedTopics: [...progress.completedTopics, topicId],
      });
    },
    [progress, saveProgress]
  );

  const saveProjectImage = useCallback(
    (topicId: string, dataUrl: string) => {
      saveProgress({
        ...progress,
        projectImages: { ...(progress.projectImages ?? {}), [topicId]: dataUrl },
      });
    },
    [progress, saveProgress]
  );

  const completeQuiz = useCallback(
    (topicId: string, score: number) => {
      const completedTopics = progress.completedTopics.includes(topicId)
        ? progress.completedTopics
        : [...progress.completedTopics, topicId];

      saveProgress({
        ...progress,
        completedTopics,
        quizScores: { ...(progress.quizScores ?? {}), [topicId]: score },
      });
    },
    [progress, saveProgress]
  );

  const isCompleted = useCallback(
    (topicId: string) => progress.completedTopics.includes(topicId),
    [progress.completedTopics]
  );

  const getProjectImage = useCallback(
    (topicId: string) => progress.projectImages?.[topicId] || null,
    [progress.projectImages]
  );

  // ✅ não congelar quando modules carregar
  const moduleTopicIds = useMemo(() => {
    const map = new Map<number, string[]>();
    for (const m of modules) map.set(m.id, m.topics.map((t) => t.id));
    return map;
  }, [modules]);

  const canAccessModule = useCallback(
    (moduleId: number) => {
      const mod = modules.find((m) => m.id === moduleId);
      if (!mod) return false;

      const req = mod.requiresModuleIds ?? [];
      if (req.length === 0) return true;

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

      for (let i = 0; i < idx; i++) {
        if (!progress.completedTopics.includes(ids[i])) return false;
      }

      return true;
    },
    [canAccessModule, moduleTopicIds, progress.completedTopics]
  );

  const getModuleProgress = useCallback(
    (moduleId: number) => {
      const mod = modules.find((m) => m.id === moduleId);
      if (!mod || mod.topics.length === 0) return 0;

      const completed = mod.topics.filter((t) =>
        progress.completedTopics.includes(t.id)
      ).length;

      return Math.round((completed / mod.topics.length) * 100);
    },
    [modules, progress.completedTopics]
  );

  return {
    // API original
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
