     const question = document.getElementById('question');
        const choices = Array.from(document.getElementsByClassName('choice-text'));
        const progressText = document.getElementById('progressText');
        const scoreText = document.getElementById('score');
        const progressBarFull = document.getElementById('progressBarFull');
        const loader = document.getElementById('loader');
        const game = document.getElementById('game');
        const nextButton = document.getElementById('nextButton');
        const feedbackDiv = document.getElementById('feedback');
        let currentQuestion = {};
        let acceptingAnswers = false;
        let score = 0;
        let questionCounter = 0;
        let availableQuestions = [];

        // Load questions from the provided JSON document
        const questions = [
            {
                "question": "The no of external nodes in a full binary tree with n internal nodes is?",
                "choice1": "n",
                "choice2": "n+1",
                "choice3": "2n",
                "choice4": "2n + 1",
                "answer": 4
            },
            {
                "question": "Suppose a binary tree is constructed with n nodes, such that each node has exactly either zero or two children. The maximum height of the tree will be?",
                "choice1": "(n+1)/2",
                "choice2": "(n-1)/2",
                "choice3": "n/2 -1",
                "choice4": "(n+1)/2 -1",
                "answer": 2
            },
            
            {
                "question": "Which of the following statement about binary tree is CORRECT?",
                "choice1": "Every binary tree is either complete or full",
                "choice2": "Every complete binary tree is also a full binary tree",
                "choice3": "Every full binary tree is also a complete binary tree",
                "choice4": "A binary tree cannot be both complete and full",
                "answer": 3
            },
            {
                "question": "Which type of traversal of binary search tree outputs the value in sorted order?",
                "choice1": "Pre-order",
                "choice2": "In-order",
                "choice3": "Post-order",
                "choice4": "None",
                "answer": 2
            },
            {
                "question": "If a node having two children is to be deleted from binary search tree, it is replaced by its",
                "choice1": "In-order predecessor",
                "choice2": "In-order successor",
                "choice3": "Pre-order predecessor",
                "choice4": "None",
                "answer": 2
            },
            {
                "question": "In a full binary tree, every internal node has exactly two children. A full binary tree with 2n+1 nodes contains",
                "choice1": "n leaf nodes",
                "choice2": "n internal nodes",
                "choice3": "n-1 leaf nodes",
                "choice4": "n-1 internal nodes",
                "answer": 2
            },
            {
                "question": "When a binary tree is converted into an extended binary tree, all the nodes of a binary tree in the external node become",
                "choice1": "Internal nodes",
                "choice2": "External nodes",
                "choice3": "Root nodes",
                "choice4": "None",
                "answer": 1
            },
            {
                "question": "In which of the following trees, the parent node has a key value greater than or equal to the key value of both of its children?",
                "choice1": "Binary search tree",
                "choice2": "Complete binary tree",
                "choice3": "Threaded binary tree",
                "choice4": "Max-heap",
                "answer": 4
            },
            {
                "question": "The in-order traversal of a tree will yield a sorted listing of elements of the tree in",
                "choice1": "Binary trees",
                "choice2": "Heaps",
                "choice3": "Binary search trees",
                "choice4": "Binary heaps",
                "answer": 3
            },
            {
                "question": "Three standard ways of traversing a binary tree T with root R are",
                "choice1": "Prefix, infix, postfix",
                "choice2": "Pre-traversal, in-traversal, post-traversal",
                "choice3": "Pre-process, in-process, post-process",
                "choice4": "Pre-order, in-order, post-order",
                "answer": 4
            },
            {
                "question": "If a node having two children is to be deleted from a binary search tree, it is replaced by its",
                "choice1": "In-order predecessor",
                "choice2": "Pre-order predecessor",
                "choice3": "In-order successor",
                "choice4": "None",
                "answer": 3
            },
            {
                "question": "If node N is a terminal node in a binary tree, then its",
                "choice1": "Right tree is empty",
                "choice2": "Left tree is empty",
                "choice3": "Both left & right subtrees are empty",
                "choice4": "Root node is empty",
                "answer": 3
            },
            {
                "question": "The operation of processing each element in the list is known as",
                "choice1": "Sorting",
                "choice2": "Merging",
                "choice3": "Inserting",
                "choice4": "Traversal",
                "answer": 4
            },
            {
                "question": "In binary trees, nodes with no successor are called",
                "choice1": "End nodes",
                "choice2": "Terminal nodes",
                "choice3": "Final nodes",
                "choice4": "Last nodes",
                "answer": 2
            },
            {
                "question": "TREE[1]=NULL indicates the tree is",
                "choice1": "Overflow",
                "choice2": "Underflow",
                "choice3": "Empty",
                "choice4": "Full",
                "answer": 3
            }
            // Add other questions here
        ];

        const MAX_QUESTIONS = questions.length;
        const CORRECT_BONUS = 10;

        // Start the game
        startGame = () => {
            questionCounter = 0;
            score = 0;
            availableQuestions = [...questions];
            getNewQuestion();
            game.classList.remove('hidden');
            loader.classList.add('hidden');
        };

        // Get a new question
        getNewQuestion = () => {
            if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
                // Go to the end page
                return window.location.assign('/end.html');
            }
            questionCounter++;
            progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
            // Update the progress bar
            progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

            const questionIndex = Math.floor(Math.random() * availableQuestions.length);
            currentQuestion = availableQuestions[questionIndex];
            question.innerHTML = currentQuestion.question;

            choices.forEach((choice, index) => {
                choice.innerHTML = currentQuestion['choice' + (index + 1)];
                choice.parentElement.classList.remove('correct', 'incorrect');
            });

            availableQuestions.splice(questionIndex, 1);
            acceptingAnswers = true;
            nextButton.classList.add('hidden');
        };

        // Event listener for clicking on a choice
        choices.forEach((choice) => {
            choice.addEventListener('click', (e) => {
                if (!acceptingAnswers) return;

                acceptingAnswers = false;
                const selectedChoice = e.target;
                const selectedAnswer = parseInt(selectedChoice.dataset['number']);

                if (selectedAnswer === currentQuestion.answer) {
                    incrementScore(CORRECT_BONUS);
                    selectedChoice.parentElement.classList.add('correct');
                    showFeedback('Your answer is correct!');
                } else {
                    choices[currentQuestion.answer - 1].parentElement.classList.add('correct');
                    selectedChoice.parentElement.classList.add('incorrect');
                    showFeedback(`Incorrect! The correct answer is ${choices[currentQuestion.answer - 1].innerText}`);
                }

                nextButton.classList.remove('hidden');
            });
        });

        // Event listener for the Next button
        nextButton.addEventListener('click', () => {
            feedbackDiv.classList.add('hidden');
            getNewQuestion();
        });

        // Function to increment the score
        incrementScore = (num) => {
            score += num;
            scoreText.innerText = score;
        };

        // Function to show feedback
        showFeedback = (message) => {
            feedbackDiv.innerText = message;
            feedbackDiv.classList.remove('hidden');
        };

        // Start the game initially
        startGame();
