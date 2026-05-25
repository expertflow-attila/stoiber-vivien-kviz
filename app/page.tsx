import { Container } from "@/components/ui/Container";
import { QuizBoard } from "@/components/quiz/QuizBoard";
import { BotanicalDecor } from "@/components/decor/BotanicalDecor";

export default function QuizPage() {
  return (
    <div
      className="premium-page py-section relative overflow-hidden"
      data-auto-reveal="false"
    >
      <BotanicalDecor />
      <Container width="wide" className="relative z-10">
        <QuizBoard />
      </Container>
    </div>
  );
}
