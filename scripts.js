let questions = document.querySelector('.questions');
let nextBtn = document.querySelector('#submit')
let restartBtn = document.querySelector('#restart')
let curQ = document.querySelector('.current-question')
let options = document.querySelector('.options')
let questionContainer = document.querySelector('.current-question-container')
let resultContainer = document.querySelector('.result-container')
let correctAnswer = 0
let answerArr = []
let prevCorrect = []
const quiz = [
    {
        question: 'Where was Gautam Budhha Born?',
        option: [
            {a: 'India'},
            {b: 'China',},
            {c: 'Nepal',},
            {d: 'Bhutan'},
        ],
        correct: 'c'

    },
     {
        question: 'What is the height of Mount Everest?',
        option: [
            {a: '8840 m'},
            {b: '8848 m'},
            {c: '8856 m'},
            {d: '8820 m'}
        ],
        correct: 'b'

    },
     {
        question: 'What is the capital of Nepal?',
        option: [
            {a: 'Delhi'},
            {b: 'Pokhara'},
            {c: 'Chitwan'},
            {d: 'Kathmandu'}
        ],
        
        correct: 'd'

    },
     {
        question: 'Who is called light of Asia?',
        option: [
            {a: 'Jesus Christ'},
            {b: 'Gautam Buddha'},
            {c: 'Prophet Muhammad'},
            {d: 'Guru Nanak'}
    ],
        correct: 'b'

    }
]
const generateRandNum = (num) => {
    return Math.floor(Math.random() * num)
}

const generateOpt = (obj) => {
    obj.map(opt => {
        for(key in opt){
            const optionHtml = `<input type='radio' name='opt' value=${key} class= 'option-select'/> 
            ${key}. <label for=''>${opt[key]}</label> </br>
           `
            options.insertAdjacentHTML('beforeend', optionHtml)
            // console.log(key, opt[key])
        }
        
    })
    
//console.log(obj)
}

let prevQuestionsIndex = []
let curQuiz = generateRandNum(quiz.length)
prevQuestionsIndex.push(curQuiz)
//console.log(prevQuestionsIndex)

const generateQuestion = (q, index, userAns) => {
        const currentQ = `<p class='cur-question'>${q[index]['question']}</p>`
        if(curQ.innerText !== ''){ 
            curQ.innerText = '' 
            options.innerText = ''   
            
        } 
       prevCorrect.push(q[index].correct)
        // if(answerArr[0] == q[index].correct){
        //     correctAnswer++
        // }else{
        //     correctAnswer = correctAnswer
        // }
        curQ.insertAdjacentHTML('afterbegin', currentQ)
        generateOpt(q[index]['option'])
        
            

}

generateQuestion(quiz, curQuiz)

const generateNextQuestion = (ans) => {
    //1. generate random number
     let c = generateRandNum(quiz.length)
     
     //console.log(curQuiz)
    //2. check if it already generated
    while(true){       
        if(prevQuestionsIndex.includes(c)){
            if(prevQuestionsIndex.length == quiz.length){
                break;
            }
            c = generateRandNum(quiz.length)
        
        } else {
            //3. if new number, generate question
        
            generateQuestion(quiz, c, ans)
            prevQuestionsIndex.push(c)          
            break;
        }
        
        // console.log(c)
    }
}
  
    let clicked = 0
    
    nextBtn.addEventListener('click', () =>{    
        o = document.querySelectorAll('.option-select')
        xArr = Array.from(o)
        
        for(let x = 0; x < xArr.length; x++){
            if(xArr[x].checked && clicked < quiz.length){
                let userAnswer = xArr[x].value;
                answerArr.push(userAnswer)
                generateNextQuestion()
                clicked++
            if(clicked == quiz.length){
                for(let y = 0; y < quiz.length; y++){                    
                    if(prevCorrect[y] == answerArr[y]){                           
                        correctAnswer++
                    }else{                           
                        correctAnswer = correctAnswer
                    }                                              
                }
                if(correctAnswer == quiz.length){
                    resultContainer.innerHTML = `<h1>👏 Congratulations 👏</h1><h3>You scored: ${correctAnswer} out of ${quiz.length}</h3><h4>Now you can have some fun</h4>`
                }else if(correctAnswer >0 && correctAnswer < quiz.length){
                    resultContainer.innerHTML = `<h1>👍 Not Bad 👍</h1><h3>You scored: ${correctAnswer} out of ${quiz.length}</h3><h4>Better luck next time</h4>`
                } else {
                    resultContainer.innerHTML = `<h1>😥 OOPS!! 😥</h1><h3>You scored: ${correctAnswer} out of ${quiz.length}</h3><h4>please practice more</h4>`
                } 
              questionContainer.style.display = 'none' 
              resultContainer.style.display = 'block'          
              resultContainer.classList.add('display-score')
              nextBtn.style.display = 'none'
              restartBtn.style.display = 'block'

                // console.log(correctAnswer)
            }
            }
        }              
    })

    const resetQuiz = () => {
        window.location.reload()
    // nextBtn.style.display = 'block'
    // restartBtn.style.display = 'none'
    // questionContainer.style.display = 'block'
    // resultContainer.style.display = 'none'
    // correctAnswer = 0;
    // clicked = 0
    // curQuiz = generateRandNum(quiz.length)
    // prevQuestionsIndex = []
    // answerArr = []
    // prevCorrect = []
    // generateQuestion(quiz, curQuiz)
  }

  restartBtn.addEventListener('click', () => {
      console.log('restart begin')
      resetQuiz()
  })

