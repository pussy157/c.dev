import { useCallback, useEffect, useMemo, useState } from "react";
import type { Module } from "@/data/types";

type ProgressData = {
  completedTopics: string[];
  quizScores: Record<string, number>;
  projectImages: Record<string, string>;
};

const STORAGE_KEY_BASE = "cpp-master-progress";
const PROGRESS_EVENT = "cpp-progress-updated";

const emptyProgress: ProgressData = {
  completedTopics: [],
  quizScores: {},
  projectImages: {},
};

function makeStorageKey(userId?: string | null) {
  return `${STORAGE_KEY_BASE}:${userId ?? "guest"}`;
}

function safeParse(raw: string | null): ProgressData {
  if (!raw) return emptyProgress;
  try {
    const p = JSON.parse(raw);
    return {
      completedTopics: Array.isArray(p?.completedTopics) ? p.completedTopics : [],
      quizScores: p?.quizScores && typeof p.quizScores === "object" ? p.quizScores : {},
      projectImages: p?.projectImages && typeof p.projectImages === "object" ? p.projectImages : {},
    };
  } catch {
    return emptyProgress;
  }
}

export const useProgress = (modules: Module[], userId?: string | null) => {
  const storageKey = makeStorageKey(userId);

  const [progress, setProgress] = useState<ProgressData>(() => {
    if (typeof window === "undefined") return emptyProgress;
    return safeParse(localStorage.getItem(storageKey));
  });

  // Recarrega quando trocar de conta
  useEffect(() => {
    if (typeof window === "undefined") return;
    setProgress(safeParse(localStorage.getItem(storageKey)));
  }, [storageKey]);

  // Sincroniza Layout <-> TopicPage (mesma aba)
  useEffect(() => {
    const onProgress = () => {
      setProgress(safeParse(localStorage.getItem(storageKey)));
    };

    window.addEventListener(PROGRESS_EVENT, onProgress as EventListener);

    // opcional: se mudar em outra aba, o storage event funciona
    window.addEventListener("storage", onProgress);

    return () => {
      window.removeEventListener(PROGRESS_EVENT, onProgress as EventListener);
      window.removeEventListener("storage", onProgress);
    };
  }, [storageKey]);

  const saveProgress = useCallback(
    (next: ProgressData) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {}
      setProgress(next);
      window.dispatchEvent(new Event(PROGRESS_EVENT));
    },
    [storageKey]
  );

  const completeTopic = useCallback(
    (topicId: string) => {
      setProgress((prev) => {
        if (prev.completedTopics.includes(topicId)) return prev;
        const next = { ...prev, completedTopics: [...prev.completedTopics, topicId] };
        try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
        window.dispatchEvent(new Event(PROGRESS_EVENT));
        return next;
      });
    },
    [storageKey]
  );

  const saveProjectImage = useCallback(
    (topicId: string, dataUrl: string) => {
      setProgress((prev) => {
        const next = {
          ...prev,
          projectImages: { ...(prev.projectImages ?? {}), [topicId]: dataUrl },
        };
        try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
        window.dispatchEvent(new Event(PROGRESS_EVENT));
        return next;
      });
    },
    [storageKey]
  );

  const completeQuiz = useCallback(
    (topicId: string, score: number) => {
      setProgress((prev) => {
        const completedTopics = prev.completedTopics.includes(topicId)
          ? prev.completedTopics
          : [...prev.completedTopics, topicId];

        const next: ProgressData = {
          ...prev,
          completedTopics,
          quizScores: { ...(prev.quizScores ?? {}), [topicId]: score },
        };

        try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
        window.dispatchEvent(new Event(PROGRESS_EVENT));
        return next;
      });
    },
    [storageKey]
  );

  const isCompleted = useCallback(
    (topicId: string) => progress.completedTopics.includes(topicId),
    [progress.completedTopics]
  );

  const getProjectImage = useCallback(
    (topicId: string) => progress.projectImages?.[topicId] || null,
    [progress.projectImages]
  );

  // Progressão: não congelar com modules vazio
  const moduleTopicIds = useMemo(() => {
    const map = new Map<number, string[]>();
    for (const m of modules) map.set(m.id, m.topics.map((t) => t.id));
    return map;
  }, [modules]);

  const canAccessModule = useCallback(
    (moduleId: number) => {
      const mod = modules.find((m) => m.id === moduleId);
      if (!mod) return false;

      const req = (mod as any).requiresModuleIds ?? [];
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

      const completed = mod.topics.filter((t) => progress.completedTopics.includes(t.id)).length;
      return Math.round((completed / mod.topics.length) * 100);
    },
    [modules, progress.completedTopics]
  );

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
    // se você quiser usar em outros lugares
    saveProgress,
  };
};
