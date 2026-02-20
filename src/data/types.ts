export type TopicType = 'lesson' | 'quiz' | 'project';

export interface Topic {
  /**
   * Quando um tópico vem do banco (Supabase), o conteúdo pode vir como Markdown.
   * Para tópicos locais, o conteúdo vem de src/data/content.ts
   */
  contentMarkdown?: string;
  /** interno (dashboard): id numérico do registro no banco */
  _dbId?: number;

  id: string;
  title: string;
  description: string;
  /**
   * lesson  = conteúdo didático + botão "Marcar como concluído"
   * quiz    = tópico especial que leva ao QuizPage (avaliativo do módulo)
   * project = tópico especial que exige envio de imagem + marcar como concluído
   */
  type?: TopicType;
}

export interface Module {
  /** interno (dashboard): id numérico do registro no banco */
  _dbId?: number;

  id: number;
  title: string;
  description: string;
  level: string;
  /**
   * Se definido, o módulo só libera quando TODOS os tópicos do(s) módulo(s) anterior(es) forem concluídos.
   * (Implementado no hook useProgress e aplicado no Layout/Index)
   */
  requiresModuleIds?: number[];
  topics: Topic[];
}

export interface ContentBlock {
  type: 'text' | 'code' | 'heading' | 'list' | 'note' | 'image';
  content: string;
  items?: string[];
  title?: string;
  /**
   * Para bloco type='image', use src relativo (ex: /assets/re/memoria-stack-heap.svg)
   */
  src?: string;
  alt?: string;
  caption?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}
