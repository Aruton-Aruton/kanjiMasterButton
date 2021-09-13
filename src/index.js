//別ファイルからの関数とクラスのインポート
import { changeViewPort } from "./viewport";
import { yojijyukugoSet } from "./yojijyukugo";
import { kotowazaSet } from "./kotowaza";
import { kokumeiSet } from "./kokumei";

//要素の取得
const pushBtn = document.getElementById("pushBtn");
const mainContainer = document.querySelector(".main-container");
const startBtn = document.getElementById("startBtn");
const timer = document.getElementById("timer");
const pushtext = document.getElementById("push-text");
const result = document.getElementById("result");
const resetBtn = document.getElementById("resetBtn");

//ボタンを押した回数
let pushCount = 0;

//カウントダウンを開始する時間
let startTime = 15;

//ボタンをクリックして表示されたコンテンツの個数
let contentCount = 0;

//カウントダウンを開始する時間を表示する
timer.textContent = startTime.toString();

//ボタンに表示する最初の文章
pushBtn.innerText = pushCount.toString();

//パスの取得
let pathname = location.pathname;
let pathnameYojijyukugo = "yojijyukugo";
let pathnameKotowaza = "kotowaza";
let pathnameKokumei = "kokumei";

//特定の回数だけメインボタンを押したときに呼び出すクラス
class Push {
  constructor(arraySet) {
    this.arraySet = arraySet;
    console.log(this.arraySet);
    this.length = this.arraySet.length;
    console.log(this.length);
    //配列の順番をシャッフルする
    this.randomKanjiSet =
      this.arraySet[Math.floor(Math.random() * this.length)];
    console.log(this.randomKanjiSet);
    //ボタンを押して表示された要素を収納する配列
    this.newArraySet = [];
  }

  pushAction() {
    //newArraySetに抽出した要素を入れる
    this.newArraySet.push(this.randomKanjiSet);
    //元の配列から抽出した配列を除く。
    this.arraySet.splice(this.randomKanjiSet, 1);
    console.log(this.arraySet);
    //コンテンツ要素を追加して、その個数をカウントする
    const content = document.createElement("dl");
    mainContainer.appendChild(content);
    content.classList.add("content");
    contentCount++;

    //コンテンツ内の要素を追加して、そこに取り出した配列の内容を記述する
    const kanji = document.createElement("dd");
    const meaning = document.createElement("dt");
    mainContainer.appendChild(content);
    content.appendChild(kanji);
    content.appendChild(meaning);
    kanji.innerText = this.randomKanjiSet.k;
    meaning.innerText = this.randomKanjiSet.m;
    // console.log(this.randomkanjiSet);
  }
}

//スタートするボタンを押した時の処理
startBtn.addEventListener("click", () => {
  if (startBtn.classList.contains("disabled")) {
    return;
  }
  pushtext.classList.add("flash");
  startBtn.classList.add("disabled");
  pushBtn.classList.remove("disabled");
  runtimer();
});

//メインボタンを押した時の処理
pushBtn.addEventListener("click", () => {
  if (pushBtn.classList.contains("disabled")) {
    return;
  }
  pushCount++;
  pushBtn.innerText = pushCount.toString(10);

  //メインボタンを押した回数が7の倍数になった時、クラスを呼び出す
  if ((pushCount % 7 == 0) & (pushCount != 0)) {
    if (pathname.includes(pathnameYojijyukugo)) {
      let yojijyukugo = new Push(yojijyukugoSet);
      yojijyukugo.pushAction();
    } else if (pathname.includes(pathnameKotowaza)) {
      let kotowaza = new Push(kotowazaSet);
      kotowaza.pushAction();
    } else if (pathname.includes(pathnameKokumei)) {
      let kokumei = new Push(kokumeiSet);
      kokumei.pushAction();
    }
  }
});

//カウントダウンのタイマー
function runtimer() {
  //開始時刻の取得
  let startDt = new Date();
  // console.log(startDt);
  console.log(startDt.getTime());
  // console.log(startDt.getTime() + startTime * 1000);

  //終了時刻の取得
  let endDt = new Date(startDt.getTime() + startTime * 1000);
  console.log(endDt.getTime());

  //１秒ずつ引いていく(カウントダウン)
  let timeCount = startTime;
  let id = setInterval(() => {
    timeCount--;
    timer.textContent = timeCount;

    //１秒ごとにstartDtを取得
    startDt = new Date();

    //startDtとendDtが同じ値になったら(timecountが0になったら)タイマーを止める
    if (startDt.getTime() >= endDt.getTime()) {
      clearInterval(id);
      pushBtn.classList.add("disabled");
      result.textContent = "今回は" + String(contentCount) + "個取得しました!!";
      resetBtn.classList.remove("disabled");
      pushtext.classList.remove("flash");
    }
  }, 1000);
}

//リセットボタンを押して初期化する
function resetGame() {
  resetBtn.addEventListener("click", () => {
    if (resetBtn.classList.contains("disabled")) {
      return;
    }
    result.textContent = "";
    pushCount = 0;
    startTime = 15;
    timer.textContent = startTime.toString();
    contentCount = 0;
    mainContainer.innerHTML = "";
    pushBtn.innerText = pushCount.toString();
    startBtn.classList.remove("disabled");
    resetBtn.classList.add("disabled");
  });
}
resetGame();
