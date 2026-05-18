
let allWords = [];

fetch('vndb.json')
.then(res => res.json())
.then(data => {
    allWords = data;
    generateWords(10);
});

function speak(text){

    const utter =
      new SpeechSynthesisUtterance(text);

    utter.lang = 'vi-VN';

    speechSynthesis.cancel();

    speechSynthesis.speak(utter);
}

function render(words){

    const list =
      document.getElementById('wordList');

    list.innerHTML = '';

    words.forEach((item,index)=>{

        const card =
          document.createElement('div');

        card.className = 'card';

        card.innerHTML = `
            <div class="small">
              ${index + 1}
            </div>

            <div class="vn">
              ${item.vn}
            </div>

            <div class="zh">
              ${item.zh}
            </div>

            <div class="tag">
              ${item.category}
            </div>

            ${item.southern ?
              '<div class="tag">南越口語</div>' : ''
            }

            <button class="play">
              🔊 播放發音
            </button>
        `;

        card.querySelector('.play')
          .onclick = () => speak(item.vn);

        list.appendChild(card);

    });

}

function generateWords(count){

    const shuffled =
      [...allWords]
      .sort(() => 0.5 - Math.random());

    render(shuffled.slice(0,count));

}

function showSouthern(){

    const southern =
      allWords.filter(x => x.southern);

    render(
      southern
        .sort(() => 0.5 - Math.random())
        .slice(0,10)
    );

}

document
.getElementById('search')
.addEventListener('input',e=>{

    const v =
      e.target.value.toLowerCase();

    const filtered =
      allWords.filter(x =>

        x.vn.toLowerCase().includes(v)
        ||
        x.zh.includes(v)

      );

    render(filtered);

});
