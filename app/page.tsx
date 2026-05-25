import { Container } from "@/components/ui/Container";
import { QuizBoard } from "@/components/quiz/QuizBoard";

export default function QuizPage() {
  return (
    <div className="premium-page py-section" data-auto-reveal="false">
      <Container width="wide">
        <QuizBoard />
      </Container>
    </div>
  );
}
