import { useParams, useNavigate } from 'react-router-dom';
import { useCourseModules } from '@/hooks/useCourseModules';
import { quizData } from '@/data/quizzes';
import Layout from '@/components/Layout';
import QuizComponent from '@/components/QuizComponent';
import { useProgress } from '@/hooks/useProgress';

const QuizPage = () => {
  const { moduleId, topicId } = useParams();
  const navigate = useNavigate();


  const course = useCourseModules();
  const modules = course.data ?? [];
  const { completeQuiz, canAccessTopic } = useProgress(modules);

  if (course.isLoading) {
    return (
      <Layout>
        <div className="p-6">Carregando quiz…</div>
      </Layout>
    );
  }

  const module = modules.find(m => m.id === Number(moduleId));
  const topic = module?.topics.find(t => t.id === topicId);
  const questions = quizData[topicId || ''];

  if (!module || !topic || !questions) {
    return <Layout><div className="text-center py-20 text-muted-foreground">Quiz não encontrado</div></Layout>;
  }

  const allTopics = modules.flatMap(m => m.topics.map(t => ({ moduleId: m.id, ...t })));
  const globalIndex = allTopics.findIndex(t => t.id === topicId);
  const nextTopic = globalIndex < allTopics.length - 1 ? allTopics[globalIndex + 1] : null;

  const handleComplete = (score: number) => {
    completeQuiz(topicId!, score);
  };

  return (
    <Layout>
      <div className="mb-6">
        <p className="text-xs text-muted-foreground mb-1">Módulo {module.id} — {module.title}</p>
        <h1 className="text-2xl font-bold text-foreground">Quiz: {topic.title}</h1>
      </div>

      <QuizComponent
        questions={questions}
        onComplete={handleComplete}
        topicPath={`/topico/${moduleId}/${topicId}`}
        nextTopicPath={nextTopic ? `/topico/${nextTopic.moduleId}/${nextTopic.id}` : null}
      />
    </Layout>
  );
};

export default QuizPage;
