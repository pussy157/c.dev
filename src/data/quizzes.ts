import { QuizQuestion } from './types';

export const quizData: Record<string, QuizQuestion[]> = {
  "m1-90-quiz": [
    {
      "question": "Qual é o ponto de entrada obrigatório de um programa C++?",
      "options": [
        "start()",
        "main()",
        "init()",
        "run()"
      ],
      "correct": 1,
      "explanation": "Todo programa C++ executável começa em main()."
    },
    {
      "question": "O que `#include <iostream>` faz?",
      "options": [
        "Compila o programa",
        "Inclui biblioteca de entrada/saída (cin/cout)",
        "Declara uma variável",
        "Cria uma string"
      ],
      "correct": 1,
      "explanation": "iostream fornece cin/cout/endl etc."
    },
    {
      "question": "Qual operador é usado para comparar igualdade?",
      "options": [
        "=",
        "==",
        "===",
        "!="
      ],
      "correct": 1,
      "explanation": "`==` compara; `=` atribui."
    },
    {
      "question": "Qual tipo é mais apropriado para idade?",
      "options": [
        "double",
        "int",
        "string",
        "char"
      ],
      "correct": 1,
      "explanation": "Idade normalmente é um inteiro."
    },
    {
      "question": "`cin >> nome;` lendo `string nome;` lê...",
      "options": [
        "A linha inteira com espaços",
        "Apenas uma palavra até o primeiro espaço",
        "Apenas números",
        "Nada, sempre falha"
      ],
      "correct": 1,
      "explanation": "O operador >> para string para no espaço. Para linha inteira use getline."
    },
    {
      "question": "Para ler uma linha inteira após ler um int com cin, você geralmente precisa:",
      "options": [
        "Nada, getline funciona sempre",
        "cin.ignore() para consumir o \\n pendente",
        "cin.clear() sempre",
        "usar printf"
      ],
      "correct": 1,
      "explanation": "Após `cin >> int`, fica um newline no buffer; `cin.ignore()` evita getline ler vazio."
    },
    {
      "question": "Qual estrutura é melhor quando você sabe exatamente quantas repetições quer?",
      "options": [
        "for",
        "while",
        "switch",
        "if"
      ],
      "correct": 0,
      "explanation": "for é ideal quando você tem contador/limite claro."
    },
    {
      "question": "O que `break;` faz dentro de um loop?",
      "options": [
        "Pula para próxima iteração",
        "Encerra o loop imediatamente",
        "Reinicia o loop",
        "Imprime uma mensagem"
      ],
      "correct": 1,
      "explanation": "break sai do loop."
    },
    {
      "question": "Qual é a diferença principal entre `while` e `do-while`?",
      "options": [
        "Não existe diferença",
        "do-while executa pelo menos 1 vez",
        "while executa pelo menos 1 vez",
        "do-while não tem condição"
      ],
      "correct": 1,
      "explanation": "do-while testa a condição no final."
    },
    {
      "question": "Uma função `void`...",
      "options": [
        "Sempre retorna int",
        "Não retorna valor",
        "Só pode ter 1 parâmetro",
        "Só existe em C"
      ],
      "correct": 1,
      "explanation": "void indica ausência de retorno."
    },
    {
      "question": "Qual problema acontece ao acessar `notas[3]` em `int notas[3];`?",
      "options": [
        "Nada, é o último elemento",
        "Acessa fora do array (bug)",
        "O compilador corrige",
        "Vira automaticamente vector"
      ],
      "correct": 1,
      "explanation": "Índices válidos: 0,1,2. `notas[3]` é fora do array."
    },
    {
      "question": "Qual é a saída padrão de `cout << true;`?",
      "options": [
        "true",
        "1",
        "T",
        "erro"
      ],
      "correct": 1,
      "explanation": "Por padrão, bool imprime 1/0 (a não ser que use boolalpha)."
    },
    {
      "question": "Qual comando imprime e pula linha com flush?",
      "options": [
        "\\n",
        "endl",
        "printf",
        "scanf"
      ],
      "correct": 1,
      "explanation": "endl insere newline e faz flush do buffer."
    },
    {
      "question": "Qual é a forma correta de declarar um caractere 'A'?",
      "options": [
        "char c = \"A\";",
        "char c = 'A';",
        "string c = 'A';",
        "int c = 'A';"
      ],
      "correct": 1,
      "explanation": "char usa aspas simples."
    },
    {
      "question": "Qual é o objetivo de usar funções no seu código?",
      "options": [
        "Deixar o programa mais lento",
        "Evitar includes",
        "Organizar e reutilizar lógica",
        "Obrigar o uso de ponteiros"
      ],
      "correct": 2,
      "explanation": "Funções melhoram organização, leitura e reutilização."
    }
  ],
  "m2-90-quiz": [
    {
      "question": "Em um mapa `char mapa[H][W]`, qual acesso é mais comum?",
      "options": [
        "mapa[x][y]",
        "mapa[y][x]",
        "mapa[w][h]",
        "mapa[xy]"
      ],
      "correct": 1,
      "explanation": "Padrão: primeiro linha (y), depois coluna (x)."
    },
    {
      "question": "Qual vantagem principal de `struct` em jogos?",
      "options": [
        "Deixar tudo global",
        "Agrupar dados relacionados (ex: posição/estado)",
        "Evitar loops",
        "Substituir funções"
      ],
      "correct": 1,
      "explanation": "Structs organizam estado e evitam variáveis soltas."
    },
    {
      "question": "Por que `enum class` é melhor que `enum` simples na maioria dos casos?",
      "options": [
        "É mais lento",
        "Evita colisão de nomes e força escopo",
        "Não funciona em C++",
        "É igual"
      ],
      "correct": 1,
      "explanation": "enum class é fortemente tipado e evita conflitos."
    },
    {
      "question": "`std::vector` é útil porque...",
      "options": [
        "Tem tamanho fixo",
        "Cresce dinamicamente e gerencia memória",
        "Só armazena int",
        "Substitui if"
      ],
      "correct": 1,
      "explanation": "Vector cresce e é seguro/idiomático."
    },
    {
      "question": "Qual ordem descreve um game loop típico?",
      "options": [
        "Render → Update → Input",
        "Input → Update → Render",
        "Update → Render → Input",
        "Input → Render → Update"
      ],
      "correct": 1,
      "explanation": "Padrão clássico: ler input, atualizar estado, renderizar."
    },
    {
      "question": "Colisão com parede é geralmente checada...",
      "options": [
        "Depois de renderizar",
        "Antes de mover/confirmar movimento",
        "Somente no final do jogo",
        "Nunca"
      ],
      "correct": 1,
      "explanation": "Você valida o movimento antes de aplicar."
    },
    {
      "question": "Constantes como `WALL='#'` servem para...",
      "options": [
        "Aumentar RAM",
        "Evitar 'números/símbolos mágicos' e melhorar leitura",
        "Substituir struct",
        "Evitar vector"
      ],
      "correct": 1,
      "explanation": "Constantes deixam o código legível e consistente."
    },
    {
      "question": "`v.size()` retorna:",
      "options": [
        "int",
        "size_t",
        "double",
        "bool"
      ],
      "correct": 1,
      "explanation": "size() retorna size_t."
    },
    {
      "question": "Qual estrutura ajuda a representar direção em 4 lados?",
      "options": [
        "string",
        "enum class Dir",
        "double",
        "char*"
      ],
      "correct": 1,
      "explanation": "Enum é ideal para conjunto fechado de opções."
    },
    {
      "question": "Se você tem 3+ variáveis que andam juntas (x,y,vida), a melhor escolha é:",
      "options": [
        "Deixar global",
        "Agrupar em struct",
        "Duplicar em todo lugar",
        "Usar goto"
      ],
      "correct": 1,
      "explanation": "Struct organiza e reduz bugs."
    },
    {
      "question": "No Pac-Man Lite, pellets são geralmente:",
      "options": [
        "Um arquivo .exe",
        "Caracteres no mapa ('.')",
        "Um tipo de ponteiro",
        "Um enum obrigatório"
      ],
      "correct": 1,
      "explanation": "Pellets podem ser representados como caracteres no grid."
    },
    {
      "question": "Objetivo do loop:",
      "options": [
        "Rodar só 1 vez",
        "Rodar até o jogo terminar (rodando=false)",
        "Rodar enquanto tiver teclado",
        "Rodar só quando renderizar"
      ],
      "correct": 1,
      "explanation": "O loop roda até condição de término."
    }
  ]
};
