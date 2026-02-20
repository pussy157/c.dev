import { ContentBlock } from './types';
export const topicContent: Record<string, ContentBlock[]> = {
  "m1-01-estrutura": [
    {
      "type": "heading",
      "content": "O que é um programa C++?"
    },
    {
      "type": "text",
      "content": "Um programa C++ é um arquivo de código-fonte (geralmente .cpp) que o compilador transforma em um executável. O executável é o arquivo que o sistema operacional realmente roda. A função `main()` é o ponto de entrada: quando você dá “run”, é ali que começa."
    },
    {
      "type": "note",
      "content": "Regra de ouro: primeiro entenda o fluxo *compilar → executar*. Muita gente trava porque tenta aprender C++ como se fosse “texto mágico” e não como um processo."
    },
    {
      "type": "heading",
      "content": "Estrutura mínima (comentada linha a linha)"
    },
    {
      "type": "code",
      "content": "#include <iostream>      // Inclui a biblioteca de entrada/saída (cin, cout)\nusing namespace std;     // Permite usar cout/cin/endl sem escrever std::cout, std::cin...\n\nint main() {             // Função principal: ponto de entrada do programa\n    cout << \"Olá, Mundo!\" << endl; // Imprime uma mensagem e pula linha\n    return 0;            // Retorna 0 = terminou sem erro (convenção)\n}"
    },
    {
      "type": "heading",
      "content": "O que acontece quando você compila? (mentalidade de adulto)"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Você escreve C++ (texto).",
        "O compilador (g++/clang/MSVC) traduz esse texto para código de máquina (binário).",
        "O linker junta bibliotecas e dependências.",
        "O sistema operacional carrega o executável na memória e chama `main()`.",
        "Seu programa roda até dar `return` (ou encerrar por erro)."
      ]
    },
    {
      "type": "heading",
      "content": "Mini-treino (não é quiz)"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Troque a mensagem do Hello World para seu nome.",
        "Imprima 2 linhas usando dois `cout`.",
        "Remova o `using namespace std;` e conserte usando `std::cout` e `std::endl`."
      ]
    }
  ],
  "m1-02-variaveis": [
    {
      "type": "heading",
      "content": "Variáveis: nome para um espaço na memória"
    },
    {
      "type": "text",
      "content": "Variável é um *nome* que você dá para um valor guardado na memória. O *tipo* define o formato e as operações permitidas. Se você entende variáveis, você entende 70% do início da programação."
    },
    {
      "type": "heading",
      "content": "Tipos fundamentais (o mínimo que você precisa dominar agora)"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "`int` → inteiro (ex: idade, quantidade, pontos).",
        "`double` → decimal (ex: altura, média, preço com cuidado).",
        "`bool` → verdadeiro/falso (ex: temChave, logado, vivo).",
        "`char` → um caractere (ex: 'A', '7').",
        "`string` → texto (ex: \"Erik\", \"Olá\")."
      ]
    },
    {
      "type": "heading",
      "content": "Declaração, inicialização e atribuição (não confunda)"
    },
    {
      "type": "code",
      "content": "int idade;          // Declaração: cria a variável (pode estar “lixo”)\nint idade2 = 18;    // Inicialização: cria já com valor\nidade2 = 25;        // Atribuição: troca o valor depois"
    },
    {
      "type": "note",
      "content": "Usar variável sem inicializar pode gerar comportamento imprevisível. Em C++ isso não é “erro sempre” — é pior: pode parecer que funciona e falhar depois."
    },
    {
      "type": "heading",
      "content": "Erro clássico: `=` vs `==`"
    },
    {
      "type": "code",
      "content": "int x = 3;\n\nif (x == 3) {            // COMPARAÇÃO (certo)\n    cout << \"x é 3\\n\";\n}\n\nif (x = 3) {             // ATRIBUIÇÃO (errado dentro do if)\n    cout << \"isso roda porque x vira 3 e 3 é “true”\\n\";\n}"
    },
    {
      "type": "heading",
      "content": "Exemplo estilo livro (comentado linha a linha)"
    },
    {
      "type": "code",
      "content": "#include <iostream>  // entrada/saída\n#include <string>    // string\nusing namespace std;\n\nint main() {\n    int idade;                 // variável inteira para armazenar idade\n    double altura;             // variável decimal para armazenar altura\n    bool temCarteira = false;  // booleano: começa como falso\n    string nome;               // texto\n\n    cout << \"Digite seu nome: \";  // pede o nome\n    cin >> nome;                 // lê o nome (uma palavra)\n\n    cout << \"Digite sua idade: \"; // pede idade\n    cin >> idade;                // lê idade\n\n    cout << \"Digite sua altura (ex: 1.75): \";\n    cin >> altura;\n\n    cout << \"Olá, \" << nome << \"!\" << endl;\n    cout << \"Idade: \" << idade << \" anos.\" << endl;\n    cout << \"Altura: \" << altura << \" m.\" << endl;\n    cout << \"Tem carteira? \" << temCarteira << endl; // 0/1 por padrão\n\n    return 0;\n}"
    },
    {
      "type": "heading",
      "content": "Mini-treino (não é quiz)"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Crie variáveis: `saldo` (double), `vidas` (int), `inicial` (char), `ativo` (bool).",
        "Imprima tudo com mensagens claras.",
        "Teste mudar valores e imprimir de novo."
      ]
    }
  ],
  "m1-03-io": [
    {
      "type": "heading",
      "content": "Entrada e saída: você conversa com o usuário"
    },
    {
      "type": "text",
      "content": "`cout` escreve na tela. `cin` lê do teclado. Isso parece simples, mas aqui mora um dos maiores motivos de iniciante travar: entrada inválida e leitura quebrada."
    },
    {
      "type": "heading",
      "content": "Saída com cout (composição por <<)"
    },
    {
      "type": "code",
      "content": "cout << \"Valor: \" << 10 << \"\\n\";\ncout << \"Soma: \" << (2 + 3) << \"\\n\";"
    },
    {
      "type": "heading",
      "content": "Entrada com cin (leitura por >>)"
    },
    {
      "type": "code",
      "content": "int idade;\ncin >> idade; // lê um inteiro\n\ndouble preco;\ncin >> preco; // lê decimal\n\nstring nome;\ncin >> nome;  // lê uma palavra (até espaço)"
    },
    {
      "type": "note",
      "content": "Para ler linha inteira (com espaços), você usa `getline(cin, texto)`. Mas isso exige entender o buffer. Vamos mostrar o jeito certo."
    },
    {
      "type": "heading",
      "content": "getline e o problema do ENTER pendurado"
    },
    {
      "type": "code",
      "content": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int idade;\n    string nomeCompleto;\n\n    cout << \"Idade: \";\n    cin >> idade;\n\n    cin.ignore(); // consome o '\\n' que ficou no buffer após ler o int\n\n    cout << \"Nome completo: \";\n    getline(cin, nomeCompleto);\n\n    cout << \"Você tem \" << idade << \" e se chama \" << nomeCompleto << \"\\n\";\n    return 0;\n}"
    },
    {
      "type": "heading",
      "content": "Validando entrada (sem frescura, do jeito certo)"
    },
    {
      "type": "text",
      "content": "Quando o usuário digita algo errado (ex: letra onde deveria ser número), `cin` entra em estado de erro. Você precisa limpar e pedir de novo."
    },
    {
      "type": "code",
      "content": "#include <iostream>\n#include <limits>\nusing namespace std;\n\nint main() {\n    int idade;\n\n    while (true) {\n        cout << \"Digite sua idade (0-120): \";\n        cin >> idade;\n\n        if (cin.fail()) { // leitura falhou (ex: 'abc')\n            cin.clear();  // limpa o estado de erro\n            cin.ignore(numeric_limits<streamsize>::max(), '\\n'); // descarta a linha toda\n            cout << \"Entrada inválida. Tente de novo.\\n\";\n            continue;\n        }\n\n        if (idade < 0 || idade > 120) {\n            cout << \"Idade fora do intervalo.\\n\";\n            continue;\n        }\n\n        break; // ok\n    }\n\n    cout << \"Ok, idade = \" << idade << \"\\n\";\n    return 0;\n}"
    },
    {
      "type": "heading",
      "content": "Mini-treino (não é quiz)"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Peça nome completo + idade + altura.",
        "Valide idade (0..120).",
        "Imprima um resumo bonito."
      ]
    }
  ],
  "m1-04-condicionais": [
    {
      "type": "heading",
      "content": "Decisão: seu programa escolhe caminhos"
    },
    {
      "type": "text",
      "content": "Sem decisão, programa é calculadora burra. Com `if/else` e `switch`, você cria comportamento: regras de jogo, validações, menus."
    },
    {
      "type": "heading",
      "content": "Comparação e lógica (base)"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Comparações: `==`, `!=`, `<`, `<=`, `>`, `>=`",
        "Lógica: `&&` (E), `||` (OU), `!` (NÃO)",
        "Ordem mental: compare → combine → decida"
      ]
    },
    {
      "type": "heading",
      "content": "if / else (comentado)"
    },
    {
      "type": "code",
      "content": "int idade = 17;\n\nif (idade >= 18) {             // se idade for 18 ou mais\n    cout << \"Maior de idade\\n\";\n} else {                        // caso contrário\n    cout << \"Menor de idade\\n\";\n}"
    },
    {
      "type": "heading",
      "content": "else if (cadeia de regras)"
    },
    {
      "type": "code",
      "content": "int nota = 78;\n\nif (nota >= 90) {\n    cout << \"A\\n\";\n} else if (nota >= 80) {\n    cout << \"B\\n\";\n} else if (nota >= 70) {\n    cout << \"C\\n\";\n} else {\n    cout << \"D\\n\";\n}"
    },
    {
      "type": "heading",
      "content": "switch (quando você tem escolhas discretas)"
    },
    {
      "type": "text",
      "content": "`switch` é ótimo para menus e estados. Use quando você compara *um valor* contra várias opções fixas."
    },
    {
      "type": "code",
      "content": "int opcao = 2;\n\nswitch (opcao) {\n    case 1:\n        cout << \"Iniciar\\n\";\n        break;\n    case 2:\n        cout << \"Configurações\\n\";\n        break;\n    case 3:\n        cout << \"Sair\\n\";\n        break;\n    default:\n        cout << \"Opção inválida\\n\";\n        break;\n}"
    },
    {
      "type": "note",
      "content": "Não esqueça `break;` — sem ele, você cai no próximo case (fallthrough). Às vezes é útil, mas iniciante quase sempre erra aqui."
    },
    {
      "type": "heading",
      "content": "Mini-treino (não é quiz)"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Crie um menu com 3 opções usando switch.",
        "Peça um número e diga se é positivo, negativo ou zero.",
        "Peça uma nota e dê conceito (A/B/C/D)."
      ]
    }
  ],
  "m1-05-loops": [
    {
      "type": "heading",
      "content": "Loops: repetição controlada"
    },
    {
      "type": "text",
      "content": "Loop é o que faz o programa “trabalhar”. Você precisa dominar **condição de parada** para não criar loop infinito."
    },
    {
      "type": "heading",
      "content": "for (quando você sabe quantas vezes)"
    },
    {
      "type": "code",
      "content": "for (int i = 0; i < 5; i++) {\n    cout << \"i = \" << i << \"\\n\";\n}"
    },
    {
      "type": "heading",
      "content": "while (quando a condição manda)"
    },
    {
      "type": "code",
      "content": "int tentativas = 0;\n\nwhile (tentativas < 3) {\n    cout << \"Tentativa \" << tentativas << \"\\n\";\n    tentativas++;\n}"
    },
    {
      "type": "heading",
      "content": "do-while (quando precisa executar ao menos 1 vez)"
    },
    {
      "type": "code",
      "content": "int opcao;\ndo {\n    cout << \"Digite 1 para sair: \";\n    cin >> opcao;\n} while (opcao != 1);"
    },
    {
      "type": "heading",
      "content": "Padrões úteis (nível livro)"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Loop de validação: repete até a entrada ser válida.",
        "Loop de acumulação: soma valores (ex: total += valor).",
        "Loop de busca: percorre até encontrar (break)."
      ]
    },
    {
      "type": "heading",
      "content": "Exemplo: somar N números"
    },
    {
      "type": "code",
      "content": "int n;\ncout << \"Quantos números? \";\ncin >> n;\n\nint soma = 0;\nfor (int i = 0; i < n; i++) {\n    int x;\n    cout << \"Digite o \" << (i+1) << \"º: \";\n    cin >> x;\n    soma += x;\n}\n\ncout << \"Soma = \" << soma << \"\\n\";"
    },
    {
      "type": "note",
      "content": "Quando usar `break` e `continue`: use com intenção. `continue` pula para a próxima iteração; `break` encerra o loop."
    },
    {
      "type": "heading",
      "content": "Mini-treino (não é quiz)"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Faça um contador regressivo de 10 a 0.",
        "Some números até o usuário digitar 0 (sentinela).",
        "Imprima apenas números pares de 0 a 50."
      ]
    }
  ],
  "m1-06-funcoes": [
    {
      "type": "heading",
      "content": "Funções: organize o código (e pare de sofrer)"
    },
    {
      "type": "text",
      "content": "Se você coloca tudo no `main()`, você cria um monstro. Funções quebram um problema grande em partes pequenas e testáveis — isso é maturidade de programador."
    },
    {
      "type": "heading",
      "content": "Assinatura de função"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Tipo de retorno (ex: `int`, `void`, `bool`)",
        "Nome (ex: `somar`)",
        "Parâmetros (ex: `int a, int b`)"
      ]
    },
    {
      "type": "code",
      "content": "int somar(int a, int b) {\n    return a + b;\n}"
    },
    {
      "type": "heading",
      "content": "void (quando não precisa retornar)"
    },
    {
      "type": "code",
      "content": "void imprimirLinha() {\n    cout << \"----------------\\n\";\n}"
    },
    {
      "type": "heading",
      "content": "Parâmetros por valor vs referência (introdução)"
    },
    {
      "type": "text",
      "content": "Por enquanto, por valor é suficiente. Mas preste atenção: por valor copia. Depois você aprende referência para evitar cópia e permitir “alterar” o original."
    },
    {
      "type": "code",
      "content": "void adicionarUm(int x) {  // x é cópia\n    x = x + 1;\n}\n\nvoid adicionarUmRef(int& x) { // x é referência (altera o original)\n    x = x + 1;\n}"
    },
    {
      "type": "note",
      "content": "A referência (`&`) é um dos superpoderes do C++. Você vai dominar isso no módulo avançado com stack/heap e vida útil."
    },
    {
      "type": "heading",
      "content": "Exemplo completo (comentado)"
    },
    {
      "type": "code",
      "content": "#include <iostream>\nusing namespace std;\n\nint pedirIntNoIntervalo(int min, int max) {\n    int x;\n    while (true) {\n        cout << \"Digite um inteiro (\" << min << \" a \" << max << \"): \";\n        cin >> x;\n        if (x >= min && x <= max) return x;\n        cout << \"Fora do intervalo.\\n\";\n    }\n}\n\nint main() {\n    int idade = pedirIntNoIntervalo(0, 120);\n    cout << \"Idade ok: \" << idade << \"\\n\";\n    return 0;\n}"
    },
    {
      "type": "heading",
      "content": "Mini-treino (não é quiz)"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Crie `int maior(int a, int b)` que devolve o maior.",
        "Crie `bool ehPar(int x)`.",
        "Crie `void imprimirTabuada(int n)` usando loop."
      ]
    }
  ],
  "m1-07-arrays-strings": [
    {
      "type": "heading",
      "content": "Arrays e strings: listas simples"
    },
    {
      "type": "text",
      "content": "Array é uma sequência de elementos do mesmo tipo, em posições contínuas de memória. O índice começa em 0. Erro clássico: estourar índice."
    },
    {
      "type": "heading",
      "content": "Array básico"
    },
    {
      "type": "code",
      "content": "int notas[3];        // 3 inteiros\nnotas[0] = 10;\nnotas[1] = 7;\nnotas[2] = 9;"
    },
    {
      "type": "note",
      "content": "Se você acessar `notas[3]`, isso é fora do array. Pode crashar, pode “parecer funcionar”. É bug sério."
    },
    {
      "type": "heading",
      "content": "Percorrendo com for"
    },
    {
      "type": "code",
      "content": "int soma = 0;\nfor (int i = 0; i < 3; i++) {\n    soma += notas[i];\n}"
    },
    {
      "type": "heading",
      "content": "string (texto de verdade)"
    },
    {
      "type": "text",
      "content": "`std::string` é a forma correta de lidar com texto. Ela cresce, tem tamanho, e evita várias armadilhas de C antigo."
    },
    {
      "type": "code",
      "content": "#include <string>\nstring nome = \"Erik\";\ncout << nome.size() << \"\\n\";      // tamanho\ncout << nome[0] << \"\\n\";          // primeiro char (cuidado com índices)"
    },
    {
      "type": "heading",
      "content": "Mini-treino (não é quiz)"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Leia 5 números em um array e calcule a média.",
        "Leia uma palavra em string e imprima ao contrário.",
        "Conte quantas letras 'a' existem no texto."
      ]
    }
  ],
  "m1-90-quiz": [
    {
      "type": "heading",
      "content": "QUIZ FINAL — regras"
    },
    {
      "type": "text",
      "content": "Este é o **quiz final do módulo 1**. Não existe quiz por tópico — você só faz este aqui quando terminar todos os tópicos do módulo."
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Sem consultar gabarito.",
        "A ideia é medir se você consegue seguir para o módulo 2 sem travar.",
        "Depois de concluir, o sistema libera o tópico do Projeto."
      ]
    },
    {
      "type": "note",
      "content": "Dica honesta: se você tirar menos de 70%, volte e revise os tópicos onde errou. Não avance “no escuro”."
    },
    {
      "type": "heading",
      "content": "Quando estiver pronto"
    },
    {
      "type": "text",
      "content": "Clique no botão abaixo para iniciar o quiz final."
    }
  ],
  "m1-99-projeto": [
    {
      "type": "heading",
      "content": "PROJETO — Jogo da Velha (console)"
    },
    {
      "type": "text",
      "content": "Você vai construir um Jogo da Velha completo no terminal. Este projeto é **obrigatório** para liberar o Módulo 2. Além do código, você precisa enviar um print do jogo funcionando (aqui mesmo) para validar sua entrega."
    },
    {
      "type": "heading",
      "content": "Requisitos obrigatórios"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Tabuleiro: `char tab[3][3]`",
        "2 jogadores alternando: 'X' e 'O'",
        "Validação de jogada (não pode sobrescrever casa)",
        "Detectar vitória (linhas/colunas/diagonais) e empate",
        "Código organizado em funções (nada de monolito no main)"
      ]
    },
    {
      "type": "heading",
      "content": "Sugestão de funções"
    },
    {
      "type": "code",
      "content": "void iniciarTabuleiro(char tab[3][3]);\nvoid imprimirTabuleiro(const char tab[3][3]);\nbool jogadaValida(const char tab[3][3], int lin, int col);\nbool checarVitoria(const char tab[3][3], char jogador);\nbool checarEmpate(const char tab[3][3]);"
    },
    {
      "type": "note",
      "content": "Faça o básico muito bem feito. Jogo da velha é pequeno, mas é perfeito para aprender organização e lógica."
    },
    {
      "type": "heading",
      "content": "Entrega"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Crie/edite o arquivo: `projects/01-jogo-da-velha/README.md` com instruções de compilação.",
        "Código em: `projects/01-jogo-da-velha/src/main.cpp`",
        "Envie o print do jogo rodando usando o campo de upload abaixo e marque como concluído."
      ]
    }
  ],
  "m2-01-matrizes": [
    {
      "type": "heading",
      "content": "Matrizes 2D: o mapa do jogo"
    },
    {
      "type": "text",
      "content": "Pac-Man, Jogo da Velha, labirintos… quase tudo em jogos 2D vira uma matriz. Você vai representar o mundo como um grid: linhas e colunas. O segredo é padronizar símbolos (parede, chão, pellet, player)."
    },
    {
      "type": "code",
      "content": "const int H = 10;\nconst int W = 20;\nchar mapa[H][W]; // mapa[y][x]"
    },
    {
      "type": "note",
      "content": "Padrão: use y (linha) primeiro e x (coluna) depois. Isso evita confusão e bugs."
    },
    {
      "type": "heading",
      "content": "Colisão simples"
    },
    {
      "type": "code",
      "content": "bool ehParede(char c) { return c == '#'; }\n\nbool podeAndar(int x, int y, char mapa[H][W]) {\n    return x >= 0 && x < W && y >= 0 && y < H && !ehParede(mapa[y][x]);\n}"
    },
    {
      "type": "heading",
      "content": "Mini-treino"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Crie um mapa pequeno com paredes (#) e chão (.).",
        "Escreva função que imprime o mapa.",
        "Teste `podeAndar` para algumas posições."
      ]
    }
  ],
  "m2-02-structs": [
    {
      "type": "heading",
      "content": "Structs: modelando entidades"
    },
    {
      "type": "text",
      "content": "Quando o problema cresce, variáveis soltas viram caos. `struct` agrupa dados relacionados (posição, direção, pontuação). Isso é o começo de um design limpo."
    },
    {
      "type": "code",
      "content": "struct Vec2 { int x; int y; };\n\nstruct Player {\n    Vec2 pos;\n    int score;\n    int lives;\n};"
    },
    {
      "type": "note",
      "content": "Regra prática: se você tem 3+ variáveis que “andam juntas”, agrupe num struct."
    },
    {
      "type": "heading",
      "content": "Mini-treino"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Crie struct `Ghost` com posição e direção.",
        "Crie vetor de fantasmas (no próximo tópico)."
      ]
    }
  ],
  "m2-03-enums-const": [
    {
      "type": "heading",
      "content": "Enums e const: parar de usar “números mágicos”"
    },
    {
      "type": "text",
      "content": "C++ bom é C++ legível. Enums e constantes removem valores sem significado (tipo 0,1,2) espalhados pelo código."
    },
    {
      "type": "code",
      "content": "enum class Dir { Up, Down, Left, Right };\n\nconst char WALL = '#';\nconst char PELLET = '.';\nconst char EMPTY = ' ';\nconst char PAC = 'P';"
    },
    {
      "type": "heading",
      "content": "Mini-treino"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Substitua símbolos espalhados por constantes.",
        "Faça uma função que converte Dir em delta (dx, dy)."
      ]
    }
  ],
  "m2-04-vectors": [
    {
      "type": "heading",
      "content": "std::vector: lista dinâmica (STL)"
    },
    {
      "type": "text",
      "content": "`std::vector` é um array que cresce e gerencia memória por você. Em jogos, é perfeito para lista de pellets, fantasmas, etc."
    },
    {
      "type": "code",
      "content": "#include <vector>\n\nvector<int> v;\nv.push_back(10);\nv.push_back(20);\n\nfor (size_t i = 0; i < v.size(); i++) {\n    cout << v[i] << \"\\n\";\n}"
    },
    {
      "type": "note",
      "content": "Use `size_t` para índices de vector. É o tipo retornado por `.size()`."
    },
    {
      "type": "heading",
      "content": "Mini-treino"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Crie `vector<Ghost>` com 4 fantasmas.",
        "Percorra e imprima posições."
      ]
    }
  ],
  "m2-05-game-loop": [
    {
      "type": "heading",
      "content": "Game Loop: a espinha dorsal do Pac-Man"
    },
    {
      "type": "text",
      "content": "Quase todo jogo segue: **Input → Update → Render** em um loop. Isso deixa o jogo previsível e organizado."
    },
    {
      "type": "code",
      "content": "while (rodando) {\n    lerInput();\n    atualizarEstado();\n    renderizar();\n}"
    },
    {
      "type": "heading",
      "content": "Separando responsabilidades"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Input: lê teclado e decide direção.",
        "Update: aplica movimento, colisão, pontuação, IA simples.",
        "Render: imprime mapa/placar."
      ]
    },
    {
      "type": "note",
      "content": "No console, “render” geralmente é limpar tela e imprimir tudo de novo. Mais tarde você aprende técnicas melhores."
    },
    {
      "type": "heading",
      "content": "Mini-treino"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Implemente um player que anda no mapa usando WASD.",
        "Não deixar atravessar parede.",
        "Ao passar em '.', some e aumenta score."
      ]
    }
  ],
  "m2-90-quiz": [
    {
      "type": "heading",
      "content": "QUIZ FINAL — Módulo 2"
    },
    {
      "type": "text",
      "content": "Este quiz cobre: matrizes 2D, structs, enums/const, vector e game loop."
    },
    {
      "type": "text",
      "content": "Clique abaixo para iniciar."
    }
  ],
  "m2-99-projeto": [
    {
      "type": "heading",
      "content": "PROJETO — Pac-Man (console) versão Lite"
    },
    {
      "type": "text",
      "content": "Você vai construir um Pac-Man simplificado no terminal. Obrigatório para liberar o Módulo 3. Exige print rodando."
    },
    {
      "type": "heading",
      "content": "Requisitos mínimos"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Mapa em matriz 2D (char[][]) com paredes '#', pellets '.', vazio ' '.",
        "Pac-Man controlado por WASD.",
        "Pelo menos 2 fantasmas com movimento simples (aleatório ou “vai em linha e quica”).",
        "Pontuação: cada pellet vale pontos.",
        "Colisão: encostar em fantasma perde vida e reinicia posição.",
        "Fim: sem vidas ou sem pellets."
      ]
    },
    {
      "type": "heading",
      "content": "Entrega"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Código: `projects/02-pacman/src/main.cpp` (ou pasta equivalente).",
        "README com como compilar/rodar.",
        "Envie print rodando e marque como concluído."
      ]
    }
  ],
  "m3-01-referencias": [
    {
      "type": "heading",
      "content": "Referências vs ponteiros"
    },
    {
      "type": "text",
      "content": "Conteúdo em expansão: este módulo foi estruturado para seguir uma linha de aprendizado “C++ Primer” (base) + “Effective C++” (boas práticas). Você pode publicar este tópico agora e ir refinando. A UI e o bloqueio já estão prontos."
    }
  ],
  "m3-02-memoria": [
    {
      "type": "heading",
      "content": "Stack vs Heap (na prática)"
    },
    {
      "type": "text",
      "content": "Conteúdo em expansão: este módulo foi estruturado para seguir uma linha de aprendizado “C++ Primer” (base) + “Effective C++” (boas práticas). Você pode publicar este tópico agora e ir refinando. A UI e o bloqueio já estão prontos."
    }
  ],
  "m3-03-raii": [
    {
      "type": "heading",
      "content": "RAII"
    },
    {
      "type": "text",
      "content": "Conteúdo em expansão: este módulo foi estruturado para seguir uma linha de aprendizado “C++ Primer” (base) + “Effective C++” (boas práticas). Você pode publicar este tópico agora e ir refinando. A UI e o bloqueio já estão prontos."
    }
  ],
  "m3-04-stl": [
    {
      "type": "heading",
      "content": "STL"
    },
    {
      "type": "text",
      "content": "Conteúdo em expansão: este módulo foi estruturado para seguir uma linha de aprendizado “C++ Primer” (base) + “Effective C++” (boas práticas). Você pode publicar este tópico agora e ir refinando. A UI e o bloqueio já estão prontos."
    }
  ],
  "m3-90-quiz": [
    {
      "type": "heading",
      "content": "Quiz Final M3"
    },
    {
      "type": "text",
      "content": "Conteúdo em expansão: este módulo foi estruturado para seguir uma linha de aprendizado “C++ Primer” (base) + “Effective C++” (boas práticas). Você pode publicar este tópico agora e ir refinando. A UI e o bloqueio já estão prontos."
    }
  ],
  "m3-99-projeto": [
    {
      "type": "heading",
      "content": "Projeto M3"
    },
    {
      "type": "text",
      "content": "Conteúdo em expansão: este módulo foi estruturado para seguir uma linha de aprendizado “C++ Primer” (base) + “Effective C++” (boas práticas). Você pode publicar este tópico agora e ir refinando. A UI e o bloqueio já estão prontos."
    }
  ],
  "m4-01-classes": [
    {
      "type": "heading",
      "content": "Classes e encapsulamento"
    },
    {
      "type": "text",
      "content": "Conteúdo em expansão: aqui entram invariantes, API limpa, copy/move e exceções com mentalidade profissional."
    }
  ],
  "m4-02-regra-5": [
    {
      "type": "heading",
      "content": "Regra dos 3/5/0"
    },
    {
      "type": "text",
      "content": "Conteúdo em expansão: aqui entram invariantes, API limpa, copy/move e exceções com mentalidade profissional."
    }
  ],
  "m4-03-excecoes": [
    {
      "type": "heading",
      "content": "Exceções"
    },
    {
      "type": "text",
      "content": "Conteúdo em expansão: aqui entram invariantes, API limpa, copy/move e exceções com mentalidade profissional."
    }
  ],
  "m4-90-quiz": [
    {
      "type": "heading",
      "content": "Quiz Final M4"
    },
    {
      "type": "text",
      "content": "Conteúdo em expansão: aqui entram invariantes, API limpa, copy/move e exceções com mentalidade profissional."
    }
  ],
  "m4-99-projeto": [
    {
      "type": "heading",
      "content": "Projeto M4"
    },
    {
      "type": "text",
      "content": "Conteúdo em expansão: aqui entram invariantes, API limpa, copy/move e exceções com mentalidade profissional."
    }
  ],
  "m5-01-templates": [
    {
      "type": "heading",
      "content": "Templates"
    },
    {
      "type": "text",
      "content": "Conteúdo em expansão: templates sem trauma, performance baseada em medição e design pragmático."
    }
  ],
  "m5-02-performance": [
    {
      "type": "heading",
      "content": "Performance e profiling"
    },
    {
      "type": "text",
      "content": "Conteúdo em expansão: templates sem trauma, performance baseada em medição e design pragmático."
    }
  ],
  "m5-03-design": [
    {
      "type": "heading",
      "content": "Design e arquitetura"
    },
    {
      "type": "text",
      "content": "Conteúdo em expansão: templates sem trauma, performance baseada em medição e design pragmático."
    }
  ],
  "m5-90-quiz": [
    {
      "type": "heading",
      "content": "Quiz Final M5"
    },
    {
      "type": "text",
      "content": "Conteúdo em expansão: templates sem trauma, performance baseada em medição e design pragmático."
    }
  ],
  "m5-99-projeto": [
    {
      "type": "heading",
      "content": "Projeto Final"
    },
    {
      "type": "text",
      "content": "Conteúdo em expansão: templates sem trauma, performance baseada em medição e design pragmático."
    }
  ],
  "imgui-01-visao": [
    {
      "type": "heading",
      "content": "ImGui: mentalidade"
    },
    {
      "type": "text",
      "content": "Conteúdo em expansão: este extra foca em construir UI com Dear ImGui de forma limpa e organizada."
    }
  ],
  "imgui-02-renderloop": [
    {
      "type": "heading",
      "content": "Janela + render loop"
    },
    {
      "type": "text",
      "content": "Conteúdo em expansão: este extra foca em construir UI com Dear ImGui de forma limpa e organizada."
    }
  ],
  "imgui-03-widgets": [
    {
      "type": "heading",
      "content": "Widgets e layout"
    },
    {
      "type": "text",
      "content": "Conteúdo em expansão: este extra foca em construir UI com Dear ImGui de forma limpa e organizada."
    }
  ],
  "imgui-04-projeto": [
    {
      "type": "heading",
      "content": "Projeto: Painel"
    },
    {
      "type": "text",
      "content": "Conteúdo em expansão: este extra foca em construir UI com Dear ImGui de forma limpa e organizada."
    }
  ],
  "re-01-iniciante": [
    {
      "type": "heading",
      "content": "Engenharia Reversa (RE): visão geral e ética"
    },
    {
      "type": "text",
      "content": "Aqui você aprende Engenharia Reversa de forma **profissional e ética**: entender binários, depurar, ler assembly e documentar. O objetivo é compreender programas, corrigir bugs, auditar segurança e estudar software — não burlar proteções ou criar trapaças."
    },
    {
      "type": "heading",
      "content": "Pipeline: do código ao binário"
    },
    {
      "type": "image",
      "content": "",
      "src": "/assets/re/re-pipeline.svg",
      "alt": "Diagrama: código → compilador → binário → loader",
      "caption": "Fluxo essencial para entender o que você está revertendo."
    },
    {
      "type": "text",
      "content": "Em RE, você geralmente começa do lado do **binário** e reconstrói intenções: funções, dados, regras e fluxo."
    },
    {
      "type": "heading",
      "content": "Memória: stack vs heap"
    },
    {
      "type": "image",
      "content": "",
      "src": "/assets/re/memoria-stack-heap.svg",
      "alt": "Diagrama: stack vs heap",
      "caption": "Mapa mental para entender variáveis, vida útil e bugs."
    },
    {
      "type": "heading",
      "content": "Mini-lab (seguro)"
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Compile um programa seu que soma dois números.",
        "Abra no debugger e coloque breakpoint antes do return.",
        "Observe variáveis locais e o valor retornado."
      ]
    }
  ],
  "re-02-debug": [
    {
      "type": "heading",
      "content": "Debugging: breakpoints, step e inspeção"
    },
    {
      "type": "image",
      "content": "",
      "src": "/assets/re/debug-flow.svg",
      "alt": "Diagrama: fluxo de debugging",
      "caption": "Breakpoint → inspecionar → step/continue"
    },
    {
      "type": "text",
      "content": "Debug é RE prática: você observa o estado real do programa. O segredo é controlar execução e inspecionar variáveis/registradores."
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Breakpoint: parar num ponto.",
        "Step Over: executa a linha sem entrar na função.",
        "Step Into: entra na função.",
        "Watch: observar expressões/endereços."
      ]
    }
  ],
  "re-03-asm": [
    {
      "type": "heading",
      "content": "Assembly essencial (x64)"
    },
    {
      "type": "text",
      "content": "Você não precisa virar “monstro” em assembly para fazer RE bem. Você precisa reconhecer padrões: CALL (chamada), MOV (cópia), CMP/Jcc (comparação e salto)."
    },
    {
      "type": "code",
      "content": "// Padrão mental:\nCMP a, b     // compara\nJE label     // se igual, pula\nCALL func    // chama função\nMOV reg, x   // move/copia"
    },
    {
      "type": "note",
      "content": "A explicação completa de calling convention e stack frame entra no avançado. Aqui o foco é: reconhecer o que está acontecendo."
    }
  ],
  "re-04-avancado": [
    {
      "type": "heading",
      "content": "RE avançado: padrões de análise"
    },
    {
      "type": "text",
      "content": "Ferramentas típicas: Ghidra/IDA (decompiler), x64dbg/WinDbg (debug). Você aprende a: achar strings, seguir referências, identificar funções e reconstruir lógica."
    }
  ],
  "re-05-profissional": [
    {
      "type": "heading",
      "content": "RE profissional: estratégia e documentação"
    },
    {
      "type": "text",
      "content": "RE profissional não é “clicar em botões”. É um processo: hipótese → evidência → anotação → validação. Você documenta o que descobriu e por quê."
    },
    {
      "type": "list",
      "content": "",
      "items": [
        "Mapear entradas/saídas do programa.",
        "Identificar funções críticas (validação, parsing, criptografia, etc.).",
        "Criar notas e diagramas de fluxo.",
        "Reproduzir e validar conclusões com testes."
      ]
    }
  ]
};
