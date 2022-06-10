const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const remark = document.getElementById('remark');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const maxScore = localStorage.getItem('maxScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

finalScore.innerText = mostRecentScore;
let p = (mostRecentScore/maxScore)*100;

if(p>=90)
{
    remark.innerText = "Excellent";
}
else if(p>=80 && p<90)
{
    remark.innerText = "Good";
}
else if(p>=60 && p<80)
{
    remark.innerText = "Average";
}
else{
    remark.innerText = "Poor";
}

username.addEventListener("keyup", ()=>{
    saveScoreBtn.disabled = !username.value;
    saveScoreBtn.addEventListener("click", ()=>{
        username.value = null;
        saveScoreBtn.disabled = !username.value;
    })
})

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('index.html');
};