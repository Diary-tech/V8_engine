import { useMemo, useState } from 'react'
import Button from './Button.jsx'

/**
 * @param {{questions: Array<{question:string, options:string[], answer:number, explanation:string}>}} props
 */
export default function Quiz({ questions }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)

  const question = questions[index]
  const finished = index >= questions.length
  const answered = selected !== null
  const progress = useMemo(() => finished ? 100 : ((index + 1) / questions.length) * 100, [finished, index, questions.length])

  function choose(optionIndex) {
    if (answered || finished) return
    setSelected(optionIndex)
    if (optionIndex === question.answer) setScore((value) => value + 1)
  }

  function next() {
    setSelected(null)
    setIndex((value) => value + 1)
  }

  function restart() {
    setSelected(null)
    setIndex(0)
    setScore(0)
  }

  if (finished) {
    return (
      <section className="quiz-card" aria-labelledby="quiz-result">
        <p className="eyebrow">Complete</p>
        <h3 id="quiz-result">Score: {score} / {questions.length}</h3>
        <p>The quiz is a quick check, not a substitute for the technical explanations above.</p>
        <Button variant="primary" onClick={restart}>Try again</Button>
      </section>
    )
  }

  return (
    <section className="quiz-card" aria-labelledby="quiz-title">
      <div className="quiz-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      <p className="eyebrow">Question {index + 1} / {questions.length}</p>
      <h3 id="quiz-title">{question.question}</h3>
      <div className="quiz-options" role="group" aria-label="Answer choices">
        {question.options.map((option, optionIndex) => {
          const isCorrect = optionIndex === question.answer
          const isSelected = optionIndex === selected
          const stateClass = answered
            ? isCorrect ? 'is-correct' : isSelected ? 'is-wrong' : ''
            : ''
          return (
            <button
              key={option}
              className={`quiz-option ${stateClass}`}
              type="button"
              onClick={() => choose(optionIndex)}
              aria-pressed={isSelected}
              disabled={answered}
            >
              <span className="quiz-key">{String.fromCharCode(65 + optionIndex)}</span>
              <span>{option}</span>
            </button>
          )
        })}
      </div>
      {answered ? (
        <div className="quiz-explanation" role="status">
          <strong>{selected === question.answer ? 'Correct.' : 'Review this one.'}</strong>
          <p>{question.explanation}</p>
          <Button variant="primary" onClick={next}>{index === questions.length - 1 ? 'See score' : 'Next question'}</Button>
        </div>
      ) : (
        <p className="muted">Choose an answer. Your explanation appears immediately after the choice.</p>
      )}
    </section>
  )
}
