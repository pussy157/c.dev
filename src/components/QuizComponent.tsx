import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizQuestion } from '@/data/types';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, BookOpen, Trophy } from 'lucide-react';

interface Props {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  topicPath: string;
  nextTopicPath: string | null;
}

const QuizComponent = ({ questions, onComplete, topicPath, nextTopicPath }: Props) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentIndex];

  const handleConfirm = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    if (selectedOption === question.correct) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setIsFinished(true);
      const finalScore = Math.round((correctAnswers / questions.length) * 100);
      onComplete(finalScore);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectAnswers(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const scorePercent = Math.round((correctAnswers / questions.length) * 100);
    const passed = scorePercent >= 60;

    return (
      <div className="text-center py-10 animate-fade-in">
        <Trophy className={`h-16 w-16 mx-auto mb-4 ${passed ? 'text-primary' : 'text-muted-foreground'}`} />
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {passed ? 'Parabéns! Tópico concluído!' : 'Continue estudando!'}
        </h2>
        <p className="text-muted-foreground mb-2">
          Você acertou {correctAnswers} de {questions.length} questões
        </p>
        <p className={`text-4xl font-bold mb-8 ${passed ? 'text-primary' : 'text-destructive'}`}>
          {scorePercent}%
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <Button variant="outline" onClick={handleRetry} className="gap-2">
            <RotateCcw className="h-4 w-4" /> Tentar novamente
          </Button>
          <Button variant="outline" onClick={() => navigate(topicPath)} className="gap-2">
            <BookOpen className="h-4 w-4" /> Revisar conteúdo
          </Button>
          {nextTopicPath && passed && (
            <Button onClick={() => navigate(nextTopicPath)} className="gap-2">
              Próximo tópico <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm text-muted-foreground">
          Questão {currentIndex + 1} de {questions.length}
        </span>
        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-6">{question.question}</h3>

      <div className="space-y-3 mb-6">
        {question.options.map((option, i) => {
          let styles = 'border-border hover:border-primary/40 cursor-pointer';
          if (isAnswered) {
            if (i === question.correct) styles = 'border-primary bg-primary/10';
            else if (i === selectedOption) styles = 'border-destructive bg-destructive/10';
            else styles = 'border-border opacity-40';
          } else if (i === selectedOption) {
            styles = 'border-primary bg-primary/10';
          }

          return (
            <button
              key={i}
              onClick={() => !isAnswered && setSelectedOption(i)}
              disabled={isAnswered}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${styles}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm text-foreground">{option}</span>
                {isAnswered && i === question.correct && <CheckCircle2 className="h-5 w-5 text-primary ml-auto flex-shrink-0" />}
                {isAnswered && i === selectedOption && i !== question.correct && <XCircle className="h-5 w-5 text-destructive ml-auto flex-shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Explicação: </span>
            {question.explanation}
          </p>
        </div>
      )}

      <div className="flex justify-end">
        {!isAnswered ? (
          <Button onClick={handleConfirm} disabled={selectedOption === null}>
            Confirmar resposta
          </Button>
        ) : (
          <Button onClick={handleNext} className="gap-2">
            {currentIndex + 1 >= questions.length ? 'Ver resultado' : 'Próxima questão'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;
