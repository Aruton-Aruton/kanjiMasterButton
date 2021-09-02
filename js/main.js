"use strict";
{
  // console.log(location.pathname);
  //ビューポートが360px超えた時の処理
  !(function () {
    const viewport = document.querySelector('meta[name="viewport"]');
    function switchViewport() {
      const value =
        window.outerWidth > 360
          ? "width=device-width,initial-scale=1"
          : "width=360";
      if (viewport.getAttribute("content") !== value) {
        viewport.setAttribute("content", value);
      }
    }
    addEventListener("resize", switchViewport, false);
    switchViewport();
  })();

  //ボタンを押した時に出てくる漢字の配列
  const yojijyukugoSet = [
    { k: "罵詈讒謗", m: "ばりぞうごん: 徳を慕って自ずと人が集まること" },
    {
      k: "尸位粗餐",
      m: "しいそさん: ある地位についているのに、その職務を果たさないこと",
    },
    { k: "椿萱並茂", m: "ちんけんへいも: 両親がともに健在であること" },
    { k: "人心収攬", m: "じんしんしゅうらん: 人の心をうまく掴むこと" },
    {
      k: "彫心鏤骨",
      m: "ちょうしんるこつ: 詩や文章などを書く際に非常に苦労して作り上げること",
    },
    { k: "桃李成蹊", m: "とうりせいけい: 徳を慕って自ずと人が集まること" },
    { k: "披刑斬棘", m: "ひけいざんぎゃく: 困難を克服しながら前進すること" },
    { k: "衆賢茅茹", m: "しゅうかぼうじょ: たくさんの賢者が協力すること" },
    { k: "艱難辛苦", m: "かんなんしんく: 困難な目にあって苦しむこと" },
    { k: "羞月閉花", m: "しゅうかへいげつ: 美人のこと" },
    { k: "侈衣美食", m: "しいびしょく: 贅沢なたとえ" },
    {
      k: "茅堵蕭然",
      m: "ぼうとしょうぜん: かやぶきの垣根で粗末な家が物寂しいさま",
    },
    { k: "放蕩不覊", m: "ほうとうふき: 勝手気ままに振る舞うこと" },
    { k: "頑迷固陋", m: "がんめいころう: 頑固で視野が狭いこと" },
    { k: "苦心惨憺", m: "くしんさんたん: 苦労を重ね、工夫を凝らすこと" },
    {
      k: "洒洒落落",
      m: "しゃしゃらくらく: さっぱりしていて物事に執着しない性格、言動のこと",
    },
    {
      k: "斎戒沐浴",
      m: "さいかいもくよく: 神仏への祈りや、神聖な儀式の際に、飲食や行動を慎み、身を清めること",
    },
    {
      k: "聚蚊成雷",
      m: "しゅうかせいらい: 小さなものでも、たくさん集まれば大きな力になること",
    },
    { k: "痩身矮躯", m: "そうしんそうく: 痩せ細って体が小さいこと" },
    { k: "簇酒斂衣", m: "そうしゅれんい: 貧しい生活の例え" },
    {
      k: "断爛朝報",
      m: "だんらんちょうほう: 切れ切れになって続きがわからない朝廷の記録のこと",
    },
    {
      k: "笑面夜叉",
      m: "えんめんやしゃ: 笑っていても、心の底は陰険で裏表のある人",
    },
    { k: "攘臂疾言", m: "じょうひしつげん: 得意げな様子" },
    {
      k: "焦頭爛額",
      m: "しょうとうらんがく: 大事なことを忘れて、些細なことを重視すること。また物事を苦労して行うこと",
    },
    { k: "晨夜兼道", m: "しんやけんどう: 昼夜問わず仕事を急ぐこと" },
    {
      k: "塵飯塗羹",
      m: "じんぱんとこう: なんの役にも立たないもの、取るに足らないもの",
    },
    {
      k: "脣亡歯寒",
      m: "しんぼうしかん: 密接な関係にある中で、片方がなくなると、もう片方も危険な状態になること",
    },
    { k: "隋珠和璧", m: "ずいしゅかへき: 貴重な宝物" },
    { k: "炊金鐉玉", m: "すいきんせんぎょく: 豪華なご馳走のこと" },
    {
      k: "彩鳳随鴉",
      m: "さいほうずいあ: 自分よりも劣っている人に嫁ぐこと、またそれに不満を持つこと。転じて、妻が夫をぞんざいに扱うこと",
    },
    {
      k: "豺狼当路",
      m: "さいろうとうじ: 冷酷で非道な人が権力を握っているさま。また権力をふるって暴虐な行為をすること",
    },
    { k: "菜圃麦隴", m: "さいえんばくろう: 畑のこと" },
    {
      k: "灑掃応対",
      m: "さいそうおうたい: 日常生活において必要な仕事や作法のこと",
    },
    { k: "鑿壁偸光", m: "さくへきとうこう: 苦学することのたとえ" },
    { k: "于疎空闊", m: "うそくうかつ: 回りくどく実際に役に立たないこと" },
    {
      k: "禹行舜趨",
      m: "うこうしゅんすう: 見た目を真似しているだけで中身は伴っていないこと",
    },
    { k: "一饋十起", m: "いっきじっき: 熱心に賢者を集めるさま" },
    {
      k: "一丘一壑",
      m: "いっきゅういちがく: 俗世間を離れ、自然の中に身を置き、風流を楽しむこと",
    },
    { k: "一家眷属", m: "いっかけんぞく: 家族、または家臣、部下" },
    { k: "遏悪揚善", m: "あつあくようぜん: 悪意を禁じて善行をすすめること" },
    {
      k: "鴉巣生鳳",
      m: "あそうせいほう: 愚鈍な親が優れた子を産むたとえ。鳶が鷹を生むと同じ意味",
    },
    { k: "偕老同穴", m: "かいろうどうけつ: 夫婦が仲睦まじいこと" },
    { k: "管窺蠡測", m: "かんきれいそく: 見識が狭いこと" },
    {
      k: "対驢撫琴",
      m: "たいろぶきん: 愚かな人に道理を説いても、無駄であるということ",
    },
    { k: "断鶴続鳧", m: "だんかくぞくふ: 後先考えず自然に手を加え損なうこと" },
    { k: "袒裼裸裎", m: "たんせきらてい: 非常に無礼なさま" },
    {
      k: "磨礱砥礪",
      m: "まろうしれい: 気がつかないうちに、ものがすり減ってしまうたとえ",
    },
    { k: "霧鬢風鬟", m: "むびんふうかん: 美しい髪のこと" },
    { k: "銘肌鏤骨", m: "めいきるこつ: 心に深く刻み込んで忘れないこと" },
    {
      k: "和羹塩梅",
      m: "わこうあんばい: 主君を助けて、国を治める優秀な大臣、宰相のこと",
    },
  ];

  const kotowazaSet = [
    {
      k: "刎頚(ふんけい)の交わり",
      m: "生死をともにするほど、非常に親しいことのたとえ",
    },
    {
      k: "鷸蚌(いつぼう)の争い",
      m: "2人で利益を争っているうちに、別の第三者に取られてしまう事。漁夫の利と同じ",
    },
    {
      k: "斗筲(とそう)の人、何ぞ算(かぞ)うるに足らんや",
      m: "器量の狭い人のたとえ",
    },
    { k: "華胥(かしょ)の国に遊ぶ", m: "いい気持ちで昼寝すること" },
    {
      k: "兄弟牆(かき)に鬩(せめ)げども外其の務(あなど)りを禦(ふせ)ぐ",
      m: "普段仲の悪い兄弟でも、外部からの侮辱を受ければ、力をあわせて戦うこと",
    },
    {
      k: "殷鑑(いんかん)遠からず",
      m: "手本となるものは、ごく身近にあるということのたとえ",
    },
    {
      k: "阿漕が(あこぎ)浦に引く網",
      m: "隠し事も、たびたび行えば広く知れ渡ってしまうことのたとえ",
    },
    {
      k: "他人の疝気(せんき)を頭痛に病む",
      m: "自分に関係のないことで、余計な心配をすること",
    },
    {
      k: "綸言(りんげん)汗の如し",
      m: "君主が一度言ったことは、訂正したり、取り消したりはできないということ",
    },
    {
      k: "九仞(きゅうじん)の功を一簣に虧く",
      m: "事が今にも成就しようとしているときに、手を抜いてため、完成しないこと",
    },
    { k: "柳絮(りゅうじょ)の才", m: "非凡な才女" },
    {
      k: "朝菌は晦朔(かいさく)を知らず",
      m: "短命であること、儚いことのたとえ",
    },
    {
      k: "滄海(そうかい)変じて桑田(そうでん)となる",
      m: "世の中の移り変わりが激しいこと",
    },
    {
      k: "疏(麤、疎、蔬)食(そし)をくらい水を飲み肱(ひじ)を曲げて之を枕とす",
      m: "貧しい生活でも、楽しく暮らしていること",
    },
    {
      k: "鷺(さぎ)を烏(からす)と言いくるめる",
      m: "事実をねじ曲げて、間違っていることを無理に正しいと言い張るたとえ",
    },
    {
      k: "騎虎(きこ)の勢い",
      m: "一度物事の勢いがついてしまうと、途中で辞められないということのたとえ",
    },
    { k: "桑楡(そうゆ)且(まさ)に迫らんとす", m: "死期が近づいていること" },
    {
      k: "蛟竜(こうりょう)雲雨を得",
      m: "まだ能力を発揮していなかった人物が、時運を囲ってその才能を発揮すること",
    },
    {
      k: "糟糟(そうこう)の妻は堂より下さず",
      m: "貧しい時から苦労をともにした妻は、自分が出世しても正妻から外さないこと",
    },
    {
      k: "蕎麦(そば)の花見て蜜を取れ",
      m: "何事も時機を逃さず行えというたとえ",
    },
    {
      k: "荒馬の轡は前から",
      m: "困難な問題に直面したときには、堂々と正面から挑んでいけば良いというたとえ",
    },
    {
      k: "渇しても盗泉の水を飲まず",
      m: "どんなに苦しい時でも、決して不正、不義は働かないこと",
    },
    {
      k: "豆腐に鎹(かすがい)、糠(ぬか)に釘",
      m: "手応えがなく、全く効き目がないたとえ",
    },
    { k: "明日ありと思う心の仇桜(あだざくら)", m: "世の中や人生が儚いたとえ" },
    { k: "鰯網で鯨捕る", m: "偶然の幸運のたとえ、またあるはずのないこと" },
    {
      k: "大行は細謹を顧みず",
      m: "大きなことを成し遂げようとする人は、些細なことにこだわらず、目標に向かって進んでいくこと",
    },
    {
      k: "大黒柱を蟻がせせる",
      m: "能力のないものが、それに見合わない大仕事に着手することのたとえ",
    },
    { k: "六日の菖蒲(あやめ)十日の菊", m: "時機に遅れてしまったことのたとえ" },
    {
      k: "鑢(やすり)と薬の飲み違い",
      m: "わずかな違いしかないように見えても、実際は全く異なることのたとえ、また早合点することのたとえ",
    },
    {
      k: "立錐(りっすい)の地なし",
      m: "ひとやものが密集していて、わずかな空間もないさま",
    },
    { k: "社稷(しゃしょく)塩となる", m: "国家が滅びることのたとえ" },
    {
      k: "俯仰(ふぎょう)天地に愧じず",
      m: "自分の行動に何もやましいところがない",
    },
    {
      k: "鼈(べつ)人を食わさんとして却って人に食わる",
      m: "人に危害をくわようとして、却って自分が災いを受けること",
    },
    {
      k: "良馬は鞭影を見て行く",
      m: "他人の指示がなくても行動できることのたとえ",
    },
    {
      k: "驪竜領下(りりょうがんか)の珠",
      m: "危険を冒さないと手に入らない貴重なもののたとえ",
    },
    {
      k: "苛政(かせい)は虎よりも猛し",
      m: "過酷な政治は、虎の害よりも甚大であること",
    },
    {
      k: "門前雀羅(もんぜんじゃくら)を張る",
      m: "訪ねてくる客もおらず、物寂しいさま",
    },
    {
      k: "独活(うど)の大木",
      m: "体が大きいだけでなんの役にも立たない人のたとえ",
    },
    {
      k: "暖簾(のれん)に腕押し",
      m: "力を加えてもなんの反応もないことのたとえ(返事がない、ただの...)",
    },
    {
      k: "馬鹿と鋏(はさみ)は使いよう",
      m: "愚かな人でも、使いようによっては役に立つこと",
    },
    {
      k: "角を矯(た)めて牛を殺す",
      m: "小さな欠点を直すつもりが、かえって全体をダメにしてしまうことのたとえ",
    },
    {
      k: "李下に冠を正さず",
      m: "人から勘違いされたり、疑われるようなことは慎んだほうがいい",
    },
    {
      k: "人と屏風は直には立たず",
      m: "人は正論ばかりではなく、妥協もしないと、うまく世の中を渡っていけないということ",
    },
    {
      k: "梨の礫(つぶて)",
      m: "返事がないこと、音沙汰がないこと(返事がない、ただの...)",
    },
    { k: "駿河の富士と一里塚", m: "比べ物にならないことのたとえ" },
    {
      k: "坊主憎けりゃ袈裟まで憎い",
      m: "その人を憎むあまり、その人に関する全ての事柄まで憎くなってしまうこと",
    },
    { k: "寝た牛に芥(あくた)掛くる", m: "無関係の人に罪をなすりつけること" },
    {
      k: "匹夫(ひっぷ)も志を奪うべからず",
      m: "どんなに地位の低い人であっても、志は尊重すべきであるということ",
    },
    {
      k: "栴檀(せんだん)は双葉より芳し",
      m: "大成する人は、幼いことから優れているということ",
    },
    {
      k: "骨折り損の草臥れ(くたびれ)儲け",
      m: "疲れるだけで何も成果がないこと",
    },
  ];

  const kokumeiSet = [
    { k: "諾威", m: "ノルウェー" },
    { k: "和蘭/阿蘭陀/喎蘭/和蘭陀", m: "オランダ" },
    { k: "丁抹", m: "デンマーク" },
    { k: "芬蘭", m: "フィンランド" },
    { k: "瑞西", m: "スイス" },
    { k: "塞爾維", m: "セルビア" },
    { k: "威内斯", m: "ベネチア" },
    { k: "愛蘭/愛蘭土/阿耳蘭", m: "アイルランド" },
    { k: "土耳古", m: "トルコ" },
    { k: "加布爾", m: "カブール" },
    { k: "厄瓜多/哀瓜多", m: "エクアドル" },
    { k: "以色列", m: "イスラエル" },
    { k: "澳門", m: "マカオ" },
    { k: "牙買加", m: "ジャマイカ" },
    { k: "捏巴爾", m: "ネパール" },
    { k: "秘露", m: "ペルー" },
    { k: "新嘉坡", m: "シンガポール" },
    { k: "巴基斯担", m: "パキスタン" },
    { k: "馬来西亜", m: "マレーシア" },
    { k: "緬甸", m: "ミャンマー" },
    { k: "墨西哥", m: "メキシコ" },
    { k: "馬達加斯加", m: "マダガスカル" },
    { k: "巴西/伯爾西/伯刺西爾", m: "ブラジル" },
    { k: "海地", m: "ハイチ" },
    { k: "土弥尼加", m: "ドミニカ" },
    { k: "埃及/埃及多", m: "エジプト" },
    { k: "越日於比亜", m: "エチオピア" },
    { k: "宇柳具", m: "ウルグアイ" },
    { k: "加納", m: "ガーナ" },
    { k: "夏麦論", m: "カメルーン" },
    { k: "叙利亜", m: "シリア" },
    { k: "錫蘭", m: "スリランカ" },
    { k: "越南", m: "ベトナム" },
    { k: "蘇丹", m: "スーダン" },
    { k: "藦洛哥", m: "モロッコ" },
    { k: "烏克蘭", m: "ウクライナ" },
    { k: "澳地利/澳太利", m: "オーストリア" },
    { k: "黎巴嫩", m: "レバノン" },
    { k: "呉呂茶", m: "クロアチア" },
    { k: "白耳義", m: "ベルギー" },
    { k: "馬爾太", m: "マルタ" },
    { k: "玖馬", m: "キューバ" },
    { k: "撒羅門", m: "ソロモン諸島" },
    { k: "西班牙", m: "スペイン" },
    { k: "俄羅斯/魯西亜/露西亜", m: "ロシア" },
    { k: "葡萄牙", m: "ポルトガル" },
    { k: "勃牙利/伯爾加里", m: "ブルガリア" },
    { k: "捷克", m: "チェコ" },
    { k: "也門", m: "イエメン" },
    { k: "月即別", m: "ウズベキスタン" },
  ];

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
    }

    //連想配列をシャッフルして並び替える
    shuffleArraySet(){
      let i = this.arraySet.length;
      // console.log(i);

      while(--i){
        let j = Math.floor(Math.random() * (i + 1));
        // console.log(j);
        // console.log(i);
        if(i ==j){
          continue;
        }
        let k = this.arraySet[i];
        // console.log(k);
        this.arraySet[i] = this.arraySet[j];
        this.arraySet[j] = k;
      }
      return this.arraySet;
      // console.log(this.arraySet);
    }

    pushAction() {
      //コンテンツを追加して、その個数をカウントする
      const content = document.createElement("dl");
      mainContainer.appendChild(content);
      content.classList.add("content");
      contentCount++;
      // console.log(contentCount);

      //コンテンツに要素を追加して、そこに取り出した配列の内容を記述する
      const kanji = document.createElement("dd");
      const meaning = document.createElement("dt");
      mainContainer.appendChild(content);
      content.appendChild(kanji);
      content.appendChild(meaning);
      kanji.innerText = this.arraySet[contentCount - 1].k;
      meaning.innerText = this.arraySet[contentCount - 1].m;
      // console.log(kanji);
      // console.log(meaning);
    }
  }

  //スタートするボタンを押した時の処理
  startBtn.addEventListener("click", () => {
    if (startBtn.classList.contains("disabled")) {
      return;
    }
    //パス名に応じてシャッフルする連想配列を切り替える
    if (pathname.includes(pathnameYojijyukugo)) {
      let shuffleYojijyukugo = new Push(yojijyukugoSet);
      shuffleYojijyukugo.shuffleArraySet();
    } else if (pathname.includes(pathnameKotowaza)) {
      let shuffleKotowaza = new Push(kotowazaSet);
      shuffleKotowaza.shuffleArraySet();
    } else if (pathname.includes(pathnameKokumei)) {
      let shuffleKokumei = new Push(kokumeiSet);
      shuffleKokumei.shuffleArraySet();
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
    // console.log(startDt.getTime());
    // console.log(startDt.getTime() + startTime * 1000);

    //終了時刻の取得
    let endDt = new Date(startDt.getTime() + startTime * 1000);
    // console.log(endDt.getTime());

    //１秒ずつ引いていく(カウントダウン)
    let timeCount = startTime;
    let id = setInterval(() => {
      timeCount--;
      timer.textContent = timeCount;

      //１秒ごとにstartDtを取得
      startDt = new Date();

      //startDtとendDtが同じ値になったら(timecountが0になったら)タイマーを止めて、要素の個数を数える
      if (startDt.getTime() >= endDt.getTime()) {
        clearInterval(id);
        pushBtn.classList.add("disabled");
        result.textContent =
          "今回は" + String(contentCount) + "個取得しました!!";
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
}