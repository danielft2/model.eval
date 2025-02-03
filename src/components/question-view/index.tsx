import { cn } from "@/lib/utils";
import { ImportedQuestion } from "@/types/imported-question";

type QuestionViewProps = {
  question: ImportedQuestion;
  className?: string;
}

export function QuestionView({ question, className }: QuestionViewProps) {
  const questionOptions = question.options
    .replace(/^\['|'\]$/g, "")
    .split("', '");
  const optionsLabels = ["A", "B", "C", "D"];
  
  return (
    <div className={cn("space-y-7", className)}>
      <div className="space-y-2">
        <h1 className="font-heading font-medium text-slate-800 -tracking-wider">
          {question.title}
        </h1>
        <p className="font-body text-sm font-medium text-slate-600 max-w-full line-clamp-3 leading-relaxed">
          {question.text}
        </p>
      </div>

      <div className="font-heading -tracking-wider space-y-2">
        <h1 className="text-[15px] font-medium text-slate-700">
          {question.command}
        </h1>
        <ul className="space-y-1">
          {questionOptions.map((option, index) => (
            <li key={index}>
              <span
                className={cn("text-[15px] text-slate-600", {
                  "text-brand-800 font-medium":
                    optionsLabels[index].toLowerCase() == question.answer_item,
                })}
              >
                {`${optionsLabels[index]})`} {option}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="px-4 py-2 bg-slate-200 font-heading font-medium -tracking-wider text-slate-700 text-[15px] rounded-lg">
        {question.descriptor}
      </p>
    </div>
  );
}
