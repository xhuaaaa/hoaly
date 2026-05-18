
let allWords=[];

fetch('complete_vietnamese_database.json')
.then(r=>r.json())
.then(data=>{
allWords=data;
render(allWords);
});

function speak(text){
const utter=new SpeechSynthesisUtterance(text);
utter.lang='vi-VN';
speechSynthesis.cancel();
speechSynthesis.speak(utter);
}

function render(words){

const list=document.getElementById('allWords');
list.innerHTML='';

words.forEach((item,index)=>{

const div=document.createElement('div');
div.className='card';

div.innerHTML=`
<div>${index+1}</div>
<div class="vn">${item.vn}</div>
<div class="zh">${item.zh}</div>
<div class="tag">${item.category}</div>
${item.southern?'<div class="tag">南越口語</div>':''}
<button class="play">🔊 發音</button>
`;

div.querySelector('.play').onclick=()=>speak(item.vn);

list.appendChild(div);

});

}

document.getElementById('search')
.addEventListener('input',e=>{

const v=e.target.value.toLowerCase();

render(
allWords.filter(x=>
x.vn.toLowerCase().includes(v)
||
x.zh.includes(v)
)
);

});
