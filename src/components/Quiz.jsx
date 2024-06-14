import React from 'react';
import QuizQuestion from './QuizQuestion';
import QuizSetup from './QuizSetup';
import QuizProgress from './QuizProgress';

const QuizContext = React.createContext();

export default function Quiz() {
	const [quizStart, setQuizStart] = React.useState(false);
	const [quizQuestions, setQuizQuestions] = React.useState([]);
	const [currentQuestion, setCurrentQuestion] = React.useState(0);
	const [answered, setAnswered] = React.useState(false);

	return (
		<QuizContext.Provider
			value={{
				quizStart,
				setQuizStart,
				quizQuestions,
				setQuizQuestions,
				currentQuestion,
				setCurrentQuestion,
				answered,
				setAnswered,
			}}
		>
			{quizStart ? (
				<>
					<QuizProgress />
					<QuizQuestion />
				</>
			) : (
				<QuizSetup />
			)}
		</QuizContext.Provider>
	);
}

export { QuizContext };
