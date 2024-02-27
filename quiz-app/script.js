const questions=[
    {
        question:"Which is the largest animal in the world?",
        answers:[
            {text:"Shark",correct:false},
            {text:"Blue Whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false},
        ]
    },
    {
        question:"Who has scored the most number of goals in the history of football?",
        answers:[
            {text:"Cristiano Ronaldo",correct:true},
            {text:"Lionel Messi",correct:false},
            {text:"kylian Mbappe",correct:false},
            {text:"Neymar jr.",correct:false},
        ]
    },
    {
        question:"Who holds the record of highest individual score in an ODI match?",
        answers:[
            {text:"Virat Kohli",correct:false},
            {text:"MS Dhoni",correct:false},
            {text:"Rohit Sharma",correct:true},
            {text:"Sachin Tendulkar",correct:false},
        ]
    },
    {
        question:"Who betrayed The Shield in WWE ?",
        answers:[
            {text:"Jinder Mahal",correct:false},
            {text:"Roman Reigns",correct:false},
            {text:"Dean Ambrose",correct:false},
            {text:"Seth Rollins",correct:true},
        ]
    }

];


const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("options");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;


function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex + 1;
    questionElement.innerHTML=questionNo + ". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

