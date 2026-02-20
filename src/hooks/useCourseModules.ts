import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { modules as localModules } from "@/data/modules";
import type { Module, Topic } from "@/data/types";

type DbModuleRow = {
  id: number;
  title: string;
  description: string;
  level: string;
  sort_order: number;
};

type DbTopicRow = {
  id: number;
  module_id: number;
  title: string;
  description: string;
  type: "lesson" | "project" | "quiz";
  sort_order: number;
  content_markdown: string | null;
};

function toModule(db: DbModuleRow, topics: DbTopicRow[]): Module {
  const mappedTopics: Topic[] = topics
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((t) => ({
      id: `db-${t.id}`,
      title: t.title,
      description: t.description,
      type: t.type,
      // @ts-expect-error - extended field used by TopicPage for DB-backed content
      contentMarkdown: t.content_markdown ?? undefined,
      // @ts-expect-error - used by admin UI to map back
      _dbId: t.id,
    }));

  return {
    id: db.id,
    title: db.title,
    description: db.description,
    level: db.level,
    topics: mappedTopics,
    // @ts-expect-error - used by admin UI to map back
    _dbId: db.id,
  };
}

async function fetchCourse(): Promise<Module[]> {
  if (!supabase) return localModules;

  const { data: mods, error: mErr } = await supabase
    .from("course_modules")
    .select("id,title,description,level,sort_order")
    .order("sort_order", { ascending: true });

  if (mErr || !mods || mods.length === 0) return localModules;

  const { data: topics, error: tErr } = await supabase
    .from("course_topics")
    .select("id,module_id,title,description,type,sort_order,content_markdown")
    .order("sort_order", { ascending: true });

  if (tErr || !topics) return localModules;

  const byModule = new Map<number, DbTopicRow[]>();
  for (const t of topics as DbTopicRow[]) {
    const arr = byModule.get(t.module_id) ?? [];
    arr.push(t);
    byModule.set(t.module_id, arr);
  }

  return (mods as DbModuleRow[]).map((m) => toModule(m, byModule.get(m.id) ?? []));
}

export function useCourseModules() {
  return useQuery({
    queryKey: ["course-modules"],
    queryFn: fetchCourse,
    staleTime: 60_000,
  });
}
