import React from 'react';
import { QuizContext } from './Quiz';
import QuizAnswer from './QuizAnswer';

export default function QuizQuestion() {
	const {
		quizQuestions,
		setQuizStart,
		currentQuestion,
		setCurrentQuestion,
		answered,
		setAnswered,
	} = React.useContext(QuizContext);

	const [answers, setAnswers] = React.useState([]);
	const [correctAnswer, setCorrectAnswer] = React.useState(
		quizQuestions[currentQuestion].correctAnswer
	);

	const shuffleAnswers = answersArr => {
		let shuffled = answersArr
			.map(answer => ({ answer, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ answer }) => answer);

		return shuffled;
	};

	React.useEffect(() => {
		getAnswers();
	}, [currentQuestion]);

	const getAnswers = () => {
		if (currentQuestion + 1 < quizQuestions.length) {
			setCorrectAnswer(quizQuestions[currentQuestion + 1].correctAnswer);
		}
		let answersArray = shuffleAnswers([
			quizQuestions[currentQuestion].correctAnswer,
			...quizQuestions[currentQuestion].incorrectAnswers,
		]);
		setAnswers(
			answersArray.map(answer => {
				if (answer === correctAnswer) {
					return {
						answer,
						correct: true,
					};
				} else {
					return {
						answer,
						correct: false,
					};
				}
			})
		);
	};

	const getNextQuestion = () => {
		if (currentQuestion + 1 >= quizQuestions.length) {
			setCurrentQuestion(0);
			setAnswered(false);
			setCorrectAnswer('');
			setQuizStart(false);
		} else {
			setCurrentQuestion(currentQuestion => currentQuestion + 1);
			setAnswered(false);
			getAnswers();
		}
	};

	return (
		<div className="quiz-question-container">
			<h1 className="quiz-question">
				{quizQuestions[currentQuestion].question.text}
			</h1>
			<div className="quiz-answer-container">
				{answers.map((answer, index) => (
					<QuizAnswer key={index} correct={answer.correct}>
						{answer.answer}
					</QuizAnswer>
				))}
			</div>

			<div className={`button-container ${answered ? '' : 'button-hide'}`}>
				<button
					className={`quiz-button ${
						currentQuestion + 1 < quizQuestions.length
							? 'next-question'
							: 'button-restart'
					}`}
					onClick={getNextQuestion}
				>
					{currentQuestion + 1 < quizQuestions.length
						? 'Next Question'
						: 'Restart Quiz'}
				</button>
			</div>
		</div>
	);
}
