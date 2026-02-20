import { Module } from './types';

export const modules: Module[] = [
  {
    id: 1,
    title: 'Iniciante: Fundamentos (base sólida)',
    description:
      'Do zero absoluto até conseguir escrever programas completos: entrada/saída, decisões, loops, funções, arrays/strings. Fecha com Quiz final e um Projeto obrigatório (Jogo da Velha).',
    level: 'Iniciante',
    topics: [
      { id: 'm1-01-estrutura', title: 'Estrutura de um programa C++', description: 'O que é main(), #include, compilação e execução', type: 'lesson' },
      { id: 'm1-02-variaveis', title: 'Variáveis e tipos', description: 'int, double, bool, char, string + erros comuns', type: 'lesson' },
      { id: 'm1-03-io', title: 'Entrada e saída (cin/cout)', description: 'Ler dados, validar entrada, formatar saída', type: 'lesson' },
      { id: 'm1-04-condicionais', title: 'Decisões (if/else/switch)', description: 'Controle de fluxo, comparação e lógica', type: 'lesson' },
      { id: 'm1-05-loops', title: 'Repetição (for/while/do-while)', description: 'Laços, contadores e loops corretos', type: 'lesson' },
      { id: 'm1-06-funcoes', title: 'Funções (organização do código)', description: 'Assinatura, parâmetros, retorno e boas práticas', type: 'lesson' },
      { id: 'm1-07-arrays-strings', title: 'Arrays e strings', description: 'Vetores simples, string, índices e cuidados', type: 'lesson' },
      { id: 'm1-90-quiz', title: 'QUIZ FINAL — Módulo 1', description: 'Avaliação do módulo inteiro (não é por tópico)', type: 'quiz' },
      { id: 'm1-99-projeto', title: 'PROJETO — Jogo da Velha (obrigatório)', description: 'Projeto final para liberar o Módulo 2. Exige print do jogo rodando.', type: 'project' }
    ]
  },
  {
    id: 2,
    title: 'Intermediário: Estruturas + Game Loop',
    description:
      'Você aprende a modelar estados de jogo, matrizes 2D, structs/enums, vetores e um loop de jogo. Fecha com Quiz final e Projeto obrigatório: Pac-Man de console (versão “lite”).',
    level: 'Intermediário',
    requiresModuleIds: [1],
    topics: [
      { id: 'm2-01-matrizes', title: 'Matrizes 2D e mapas', description: 'Grid, colisão e leitura de mapa', type: 'lesson' },
      { id: 'm2-02-structs', title: 'Structs e modelagem de entidades', description: 'Posição, velocidade, estado e organização', type: 'lesson' },
      { id: 'm2-03-enums-const', title: 'Enums, const e “regras do jogo”', description: 'Constantes, símbolos do mapa e clareza', type: 'lesson' },
      { id: 'm2-04-vectors', title: 'std::vector (lista dinâmica)', description: 'Por que vector é melhor que “array fixo” aqui', type: 'lesson' },
      { id: 'm2-05-game-loop', title: 'Game Loop (tick, input, update, render)', description: 'Estrutura profissional de loop', type: 'lesson' },
      { id: 'm2-90-quiz', title: 'QUIZ FINAL — Módulo 2', description: 'Avaliação geral do módulo 2', type: 'quiz' },
      { id: 'm2-99-projeto', title: 'PROJETO — Pac-Man (console) (obrigatório)', description: 'Projeto para liberar o Módulo 3. Exige print rodando.', type: 'project' }
    ]
  },
  {
    id: 3,
    title: 'Avançado: Ponteiros, RAII e STL',
    description:
      'Ponteiros com segurança mental, referências, alocação, RAII e containers STL (vector/string/array). Você começa a escrever C++ “de verdade”.',
    level: 'Avançado',
    requiresModuleIds: [2],
    topics: [
      { id: 'm3-01-referencias', title: 'Referências vs ponteiros', description: 'Quando usar, quando evitar, e por quê', type: 'lesson' },
      { id: 'm3-02-memoria', title: 'Stack vs Heap (na prática)', description: 'Vida útil, escopo, alocação e bugs clássicos', type: 'lesson' },
      { id: 'm3-03-raii', title: 'RAII (Resource Acquisition Is Initialization)', description: 'Por que isso muda tudo em C++', type: 'lesson' },
      { id: 'm3-04-stl', title: 'STL: vector, string, algoritmos básicos', description: 'Iteração, buscas, transformações', type: 'lesson' },
      { id: 'm3-90-quiz', title: 'QUIZ FINAL — Módulo 3', description: 'Avaliação geral do módulo 3', type: 'quiz' },
      { id: 'm3-99-projeto', title: 'PROJETO — Mini utilitário (obrigatório)', description: 'Projeto para liberar o Módulo 4. Exige print rodando.', type: 'project' }
    ]
  },
  {
    id: 4,
    title: 'Profissional: Classes, cópia/move, exceções',
    description:
      'Encapsulamento, invariantes, regra dos 3/5/0, copy/move, exceções e organização em headers/cpps. Boas práticas no estilo Effective C++.',
    level: 'Profissional',
    requiresModuleIds: [3],
    topics: [
      { id: 'm4-01-classes', title: 'Classes e encapsulamento', description: 'Invariantes, API limpa, getters/setters conscientes', type: 'lesson' },
      { id: 'm4-02-regra-5', title: 'Regra dos 3/5/0', description: 'Construtor, destrutor, cópia e move', type: 'lesson' },
      { id: 'm4-03-excecoes', title: 'Erros e exceções', description: 'try/catch, contratos e mensagens úteis', type: 'lesson' },
      { id: 'm4-90-quiz', title: 'QUIZ FINAL — Módulo 4', description: 'Avaliação geral do módulo 4', type: 'quiz' },
      { id: 'm4-99-projeto', title: 'PROJETO — Biblioteca pequena (obrigatório)', description: 'Projeto para liberar o Módulo 5. Exige print rodando.', type: 'project' }
    ]
  },
  {
    id: 5,
    title: 'Sênior: Templates, performance e design',
    description:
      'Templates sem sofrimento, iterators, algoritmos, performance (cópias/move), profiling básico e design (composição > herança).',
    level: 'Sênior',
    requiresModuleIds: [4],
    topics: [
      { id: 'm5-01-templates', title: 'Templates (mentalidade)', description: 'O que são e por que existem', type: 'lesson' },
      { id: 'm5-02-performance', title: 'Performance e profiling', description: 'Onde otimizar e como medir', type: 'lesson' },
      { id: 'm5-03-design', title: 'Design e arquitetura', description: 'Composição, interfaces e testabilidade', type: 'lesson' },
      { id: 'm5-90-quiz', title: 'QUIZ FINAL — Módulo 5', description: 'Avaliação geral do módulo 5', type: 'quiz' },
      { id: 'm5-99-projeto', title: 'PROJETO — Aplicação final (obrigatório)', description: 'Último projeto do curso. Exige print rodando.', type: 'project' }
    ]
  },
  {
    id: 6,
    title: 'Extra: ImGui e Interfaces',
    description:
      'UI “immediate mode” com Dear ImGui: render loop, widgets, layout e arquitetura UI vs core. (Sem quiz — foco em prática e construção.)',
    level: 'Extra',
    requiresModuleIds: [5],
    topics: [
      { id: 'imgui-01-visao', title: 'O que é ImGui (de verdade)', description: 'Immediate Mode UI e como pensar interface', type: 'lesson' },
      { id: 'imgui-02-renderloop', title: 'Janela + render loop', description: 'Estrutura mínima (contexto, frame, render)', type: 'lesson' },
      { id: 'imgui-03-widgets', title: 'Widgets e layout', description: 'Buttons, sliders, docking e organização', type: 'lesson' },
      { id: 'imgui-04-projeto', title: 'Projeto: Painel de Configurações', description: 'Construir um painel completo', type: 'lesson' }
    ]
  },
  {
    id: 7,
    title: 'Extra: Engenharia Reversa (Iniciante → Profissional)',
    description:
      'Trilha completa depois do Sênior. Foco em RE ética: entender binários, debugging, assembly e análise. (Sem quiz; labs guiados.)',
    level: 'Extra',
    requiresModuleIds: [5],
    topics: [
      { id: 're-01-iniciante', title: 'RE Iniciante: como binário funciona', description: 'Pipeline, formatos e mentalidade', type: 'lesson' },
      { id: 're-02-debug', title: 'Debugging: breakpoints e inspeção', description: 'Step into/over, registradores e memória', type: 'lesson' },
      { id: 're-03-asm', title: 'Assembly essencial (x64)', description: 'MOV, CALL, JMP, stack frame (prático)', type: 'lesson' },
      { id: 're-04-avancado', title: 'RE Avançado: padrões e fluxo', description: 'Strings, cross-references, funções', type: 'lesson' },
      { id: 're-05-profissional', title: 'RE Profissional: análise robusta', description: 'Estratégia, documentação e relatórios', type: 'lesson' }
    ]
  }
];
