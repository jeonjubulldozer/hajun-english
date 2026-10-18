// 곤충 무술 도장(BUG DOJO) 챕터북 시리즈 — 하준이가 좋아하는 애니메이션의 곤충 식구들이 그대로 나와요.
// 하준이는 원어민 유치원을 다녔고 영어를 잘 알아들어서, 매직 트리 하우스 정도의 챕터북 수준으로 썼어요 (한 권 = 3챕터).
// 이름은 한국 이름의 뜻을 영어로 옮겼어요: 맴맴이=Mem-Mem, 번쩍이=Coach Flash, 집게=Coach Pinch, 꽉이=Coach Grip, 팡이=Coach Pop,
// 동글이=Dot, 반짝이=Sparkle, 윙윙이=Buzz, 콩콩이=Bob, 띵가=Strum.
// art = 그림(곤충 도장 그림 엔진): actors = [{id, pose, x(0~960), f(1 오른쪽/-1 왼쪽), ex(표정 0웃음 1집중 2놀람 3눈웃음 5졸림), rot, y, rust, gl}]
(() => {
const NAMES = { "mem-mem": "맴맴이 (매미 · 네 가지 다 배우는 주인공)", flash: "번쩍이 (장수풍뎅이 · 레슬링 사범님)", pinch: "집게 (사슴벌레 · 유도 사범님)", grip: "꽉이 (사마귀 · 주짓수 사범님) / 꽉 잡다", pop: "팡이 (메뚜기 · 태권도 사범님)", dot: "동글이 (무당벌레)", sparkle: "반짝이 (반딧불이)", buzz: "윙윙이 (꿀벌)", bob: "콩콩이 (방아깨비)", strum: "띵가 (베짱이)" };
const W = (o) => Object.assign({}, NAMES, o);
const A = (...actors) => ({ actors });
const N = (...actors) => ({ night: true, actors });
const BUGDOJO = [
  {
    id: "bdc-masters", level: 3, style: "곤충 무술 도장 · 챕터북", title: "Mem-Mem and the Four Masters",
    cover: { e: "🥋", bg: "#BFE2C6", art: { zoom: 1.05, sign: true, actors: [{ id: "rhino", pose: "low", x: 170, sc: .85 }, { id: "stag", pose: "guard", x: 340, sc: .85 }, { id: "cicada", pose: "cheer", x: 490, ex: 3 }, { id: "mantis", pose: "guard", x: 640, f: -1, sc: .85 }, { id: "hop", pose: "guard", x: 800, f: -1, sc: .85 }] } },
    blurb: "땅속에서 몇 년을 기다린 맴맴이가 곤충 도장에서 네 사범님을 만나요. 왜 네 가지를 다 배워야 할까?",
    pages: [
      { ch: "Chapter 1 · Years in the Dark", e: "🌳", art: A({ id: "cicada", pose: "stand", x: 480, ex: 4 }), s: ["For years and years, Mem-Mem lived deep under the ground, sipping sap from the roots of an old oak tree.", "It was dark, it was quiet, and it was very, very boring.", "Every night, he dreamed about the same thing.", "\"One day,\" he whispered to the worms, \"I'm going to be a real warrior.\""] },
      { e: "🌙", art: { zoom: 1.1, sign: true, actors: [{ id: "cicada", pose: "cheer", x: 480, ex: 3 }] }, s: ["Then, one warm summer night, Mem-Mem dug his way up into the moonlight.", "He climbed a tree, cracked out of his old skin, and stretched his brand-new wings.", "From the top of the branch, he saw something amazing.", "Under the oak tree stood a wooden sign that said BUG DOJO."] },
      { ch: "Chapter 2 · Four Masters", e: "🪲", art: A({ id: "rhino", pose: "lift", x: 430, f: 1 }, { id: "dummy", pose: "tuck", rot: 3.1, y: -150, x: 450, f: 1, sc: .8 }), s: ["The first master Mem-Mem met was Coach Flash, a rhinoceros beetle with a horn like a crowbar.", "\"Wrestling is about pressure,\" Coach Flash rumbled. \"Get low, drive forward, and never let go.\"", "He dropped his hips, shot in, and lifted the straw dummy high over his head.", "Mem-Mem's mouth fell open."] },
      { e: "🪲", art: A({ id: "stag", pose: "grip", x: 410, f: 1 }, { id: "cicada", pose: "grip", x: 580, f: -1, ex: 2 }), s: ["Next came Coach Pinch, a stag beetle with jaws like a pair of garden scissors.", "\"In judo, you don't fight power with power,\" he said calmly.", "\"You grip, you pull your partner off balance, and then you throw.\"", "He tugged Mem-Mem gently forward, and suddenly Mem-Mem was looking at the sky."] },
      { e: "🌿", art: A({ id: "mantis", pose: "back", rot: -1.5, x: 430, f: 1 }, { id: "cicada", pose: "top", x: 610, f: -1, ex: 2 }), s: ["Coach Grip, the praying mantis, was waiting on the mat, lying flat on her back.", "\"Most bugs think being on your back means you're losing,\" she said with a sly smile.", "\"In jiu-jitsu, that's where the fun begins.\"", "Before Mem-Mem could even blink, she had swept him over and was sitting on top of him."] },
      { e: "🦗", art: { actors: [{ id: "hop", pose: "spin", x: 470, f: 1 }], text: [{ x: 700, y: 170, s: "WHOOSH!" }] }, s: ["Last of all was Coach Pop, a grasshopper who could jump about twenty times the length of his own body.", "\"Taekwondo is all about distance and speed,\" he said, bouncing on his toes.", "He spun around, and his back leg whipped through the air.", "A leaf hanging above them split neatly in two."] },
      { ch: "Chapter 3 · Why Learn Four?", e: "🤔", art: A({ id: "stag", pose: "stand", x: 400, f: 1, ex: 3 }, { id: "cicada", pose: "sit", x: 580, f: -1, ex: 1 }), s: ["That evening, Mem-Mem sat at the edge of the mat, thinking hard.", "\"Coach Pinch,\" he asked, \"why can't I just learn one thing and be really, really good at it?\"", "Coach Pinch smiled. \"Let me show you.\""] },
      { e: "💥", art: { actors: [{ id: "hop", pose: "kick", x: 420, f: 1, ex: 2 }, { id: "rhino", pose: "low", x: 600, f: -1 }], text: [{ x: 520, y: 140, s: "CAUGHT!", col: "#20c997" }] }, s: ["Coach Pop threw his fastest kick at Coach Flash.", "But Coach Flash caught the leg, lifted, and set Coach Pop gently down on the mat.", "\"Kicks are great when you're far away,\" said Coach Flash. \"But up close, you need wrestling and judo.\"", "\"And if you end up on the ground,\" added Coach Grip, \"you need jiu-jitsu.\""] },
      { e: "🙇", art: { zoom: 1, actors: [{ id: "rhino", pose: "bow", x: 150, sc: .85 }, { id: "stag", pose: "bow", x: 320, sc: .85 }, { id: "cicada", pose: "cheer", x: 480, f: -1, ex: 3 }, { id: "mantis", pose: "bow", x: 650, f: -1, sc: .85 }, { id: "hop", pose: "bow", x: 820, f: -1, sc: .85 }] }, s: ["Mem-Mem jumped to his feet. \"Then I'll learn all four!\"", "The four masters looked at each other and laughed.", "\"It's a lot of hard work,\" warned Coach Flash.", "\"I waited years under the ground for this,\" said Mem-Mem. \"I'm ready.\"", "Everybody bowed, and the whole dojo shouted, \"Thank you!\""] }
    ],
    words: W({ sap: "수액", roots: "뿌리", warrior: "전사", dug: "팠다", "cracked out of": "깨고 나왔다", stretched: "쭉 폈다", "rhinoceros beetle": "장수풍뎅이", crowbar: "쇠지렛대", pressure: "누르는 힘", rumbled: "낮게 울리는 목소리로 말했다", drive: "밀고 나가다", "stag beetle": "사슴벌레", jaws: "턱", "off balance": "균형이 무너진", tugged: "잡아당겼다", sly: "능청스러운", swept: "쓸어 넘겼다", distance: "거리", whipped: "휙 휘둘렀다", neatly: "깔끔하게", edge: "가장자리", warned: "경고했다" }),
    talk: ["Why did Mem-Mem want to become a warrior?", "Which master did you like best, and why?", "Why does Coach Flash say you need wrestling up close?", "If you could learn only one, which would you choose? Would that be a good idea?"],
    quiz: [
      { t: "choice", q: "Where did Mem-Mem live before he came to the dojo?", a: ["Deep under the ground", "In a pond", "In a bird's nest"], e: ["🌳", "🐸", "🪺"] },
      { t: "choice", q: "What does Coach Pinch say about judo?", a: ["Don't fight power with power", "Always kick high", "Never hold on"], e: ["🥋", "🦵", "🙅"] },
      { t: "choice", q: "Why does Mem-Mem decide to learn all four?", a: ["Each one helps in a different place", "Because it's easy", "Because the others are boring"], e: ["🧩", "😴", "🙄"] },
      { t: "word", q: "'균형'은 영어로?", a: ["balance", "ballet", "bounce"] },
      { t: "say", q: "Say it! Kicks are great when you're far away. But up close, you need ...", say: "But up close, you need wrestling and judo.", key: ["wrestling", "judo"] },
      { t: "say", q: "Tell me! Which would you learn first, and why? Start with: I would learn ... because ...", say: "I would learn wrestling first because it makes me strong.", key: ["because"], free: true }
    ]
  },
  {
    id: "bdc-fall", level: 3, style: "곤충 무술 도장 · 챕터북", title: "Fall Seven Times, Stand Up Eight",
    cover: { e: "🐞", bg: "#F6C9C3", art: { actors: [{ id: "lady", pose: "turn", x: 440, f: 1 }, { id: "cicada", pose: "tuck", rot: 2.2, y: -90, x: 560, f: 1, ex: 2 }] } },
    blurb: "첫 스파링에서 종이비행기처럼 날아간 맴맴이. 잘 넘어지는 법을 배우고 다시 도전해요.",
    pages: [
      { ch: "Chapter 1 · The First Spar", e: "🐞", art: A({ id: "lady", pose: "guard", x: 400, f: 1, ex: 3 }, { id: "cicada", pose: "guard", x: 580, f: -1 }), s: ["On Mem-Mem's tenth day at the dojo, Coach Pinch called out, \"Time to spar!\"", "Mem-Mem's partner was Dot, a ladybug who was small, round, and surprisingly strong.", "\"Don't worry,\" Dot said with a grin. \"I'll go easy on you.\"", "\"You don't have to,\" said Mem-Mem, puffing out his chest."] },
      { e: "💨", art: { actors: [{ id: "lady", pose: "turn", x: 440, f: 1 }, { id: "cicada", pose: "tuck", rot: 2.2, y: -90, x: 560, f: 1, ex: 2 }], text: [{ x: 700, y: 120, s: "WHOOSH!" }] }, s: ["That was a mistake.", "Dot grabbed his sleeve, spun underneath him, and launched him into the air.", "WHOOSH! Mem-Mem flew over her shoulder like a paper airplane.", "He landed flat on his back with a loud THUD, and all the air rushed out of him."] },
      { e: "😳", art: A({ id: "lady", pose: "stand", x: 380, f: 1, ex: 2 }, { id: "cicada", pose: "flat", rot: -1.57, x: 600, f: 1, ex: 2 }), s: ["A few bugs giggled from the side of the mat.", "Mem-Mem's face turned hot.", "\"I'm terrible at this,\" he mumbled, staring up at the ceiling."] },
      { ch: "Chapter 2 · The Art of Falling", e: "🪲", art: A({ id: "stag", pose: "stand", x: 400, f: 1, ex: 3 }, { id: "cicada", pose: "sit", x: 580, f: -1, ex: 1 }), s: ["After class, Coach Pinch sat down next to him.", "\"Do you know the very first thing every judo student learns?\" he asked.", "Mem-Mem shook his head. \"How to throw?\"", "\"How to fall,\" said Coach Pinch. \"Everybody falls. Warriors learn to fall well.\""] },
      { e: "🖐️", art: { actors: [{ id: "cicada", pose: "flat", rot: -1.57, x: 470, f: 1, ex: 1 }, { id: "stag", pose: "stand", x: 650, f: -1, ex: 3 }], text: [{ x: 480, y: 220, s: "SLAP!", col: "#1c7ed6" }] }, s: ["So they practiced falling, again and again.", "Tuck your chin, so your head doesn't hit the mat.", "Slap the mat with your arm, to spread out the force.", "Roll, slap, and pop back up.", "By the end of the week, Mem-Mem could fall a hundred times without a single bump on his head."] },
      { e: "💡", art: A({ id: "stag", pose: "stand", x: 400, f: 1, ex: 0 }, { id: "cicada", pose: "stand", x: 580, f: -1, ex: 2 }), s: ["\"Losing a match isn't the end,\" Coach Pinch told him.", "\"Every time you fall, your body learns something new.\"", "\"So losing is... learning?\" asked Mem-Mem slowly.", "\"Exactly,\" said Coach Pinch."] },
      { ch: "Chapter 3 · The Rematch", e: "🔁", art: { actors: [{ id: "lady", pose: "turn", x: 440, f: 1 }, { id: "cicada", pose: "tuck", rot: 4.2, y: -60, x: 560, f: 1, ex: 1 }] }, s: ["The next Saturday, Mem-Mem asked Dot for a rematch.", "Dot threw him again, just as fast as before.", "But this time, Mem-Mem tucked his chin, slapped the mat, and rolled straight back to his feet."] },
      { e: "💥", art: { actors: [{ id: "cicada", pose: "shoot", x: 430, f: 1 }, { id: "lady", pose: "low", x: 600, f: -1, ex: 2 }], text: [{ x: 520, y: 140, s: "TACKLE!", col: "#20c997" }] }, s: ["Dot's eyes went wide.", "Before she could reset, Mem-Mem dropped his level and shot in for a double-leg tackle.", "BUMP! This time, it was Dot who landed on the mat."] },
      { e: "😄", art: A({ id: "cicada", pose: "cheer", x: 400, f: 1, ex: 3 }, { id: "lady", pose: "cheer", x: 580, f: -1, ex: 3 }), s: ["For a moment, nobody said a word.", "Then Dot burst out laughing. \"Where did THAT come from?\"", "\"From falling,\" said Mem-Mem, grinning. \"Lots and lots of falling.\"", "They bowed to each other, and Coach Pinch nodded proudly from the corner."] }
    ],
    words: W({ spar: "스파링하다", partner: "상대", surprisingly: "놀랍게도", "go easy": "살살 하다", "puffing out his chest": "가슴을 쭉 펴며 으스대며", mistake: "실수", sleeve: "소매", launched: "쏘아 올렸다", thud: "쿵", giggled: "킥킥 웃었다", terrible: "형편없는", mumbled: "중얼거렸다", tuck: "집어넣다", "spread out": "퍼뜨리다", force: "힘·충격", rematch: "재대결", reset: "자세를 다시 잡다", "dropped his level": "자세를 낮췄다", "burst out laughing": "웃음이 터졌다", proudly: "자랑스럽게" }),
    talk: ["How did Mem-Mem feel after his first fall? Have you ever felt like that?", "Why is learning to fall so important?", "What does 'losing is learning' mean to you?", "How did Mem-Mem win the rematch?"],
    quiz: [
      { t: "choice", q: "How did Mem-Mem feel after his first fall?", a: ["Embarrassed", "Sleepy", "Hungry"], e: ["😳", "😴", "😋"] },
      { t: "choice", q: "What is the first thing every judo student learns?", a: ["How to fall", "How to kick", "How to win"], e: ["🤸", "🦵", "🏆"] },
      { t: "choice", q: "What did Mem-Mem do in the rematch after he was thrown?", a: ["He rolled up and tackled Dot", "He cried and went home", "He asked for a break"], e: ["💥", "😭", "🛑"] },
      { t: "word", q: "'재대결'은 영어로?", a: ["rematch", "remember", "repeat"] },
      { t: "say", q: "Say it! Coach Pinch said: Everybody falls. Warriors learn to ...", say: "Warriors learn to fall well.", key: ["fall", "well"] },
      { t: "say", q: "Tell me about a time you fell or lost. What did you learn? Start with: One time, I ...", say: "One time, I lost a match, but I learned a new move.", key: ["time"], free: true }
    ]
  },
  {
    id: "bdc-rust", level: 3, style: "곤충 무술 도장 · 챕터북", title: "Strum and the Rusty Moves",
    cover: { e: "🎸", bg: "#E3D9A8", art: { actors: [{ id: "grass", pose: "guard", x: 480, ex: 2, rust: .8 }], text: [{ x: 640, y: 170, s: "CREAK!", col: "#9c5220" }] } },
    blurb: "기술 이름은 다 외우는데 단체반은 빼먹는 띵가. 한 달 뒤 기술이 녹슬어 삐걱거려요.",
    pages: [
      { ch: "Chapter 1 · The Bug Who Knew Every Move", e: "🎸", art: { actors: [{ id: "grass", pose: "sit", x: 480, ex: 3 }], text: [{ x: 640, y: 170, s: "♪ ♫", col: "#7048e8" }] }, s: ["Strum was the most musical bug at the dojo.", "He could play the guitar, sing in harmony, and recite the name of every move in all four arts.", "\"Double-leg, single-leg, shoulder throw, omoplata, spinning back kick,\" he would sing. \"I know them all!\""] },
      { e: "😴", art: A({ id: "grass", pose: "flat", rot: -1.57, x: 480, ex: 5 }), s: ["But there was one thing Strum did not like at all: group class.", "Group class was sweaty. Group class was crowded. In group class, bigger bugs squished you flat.", "\"I'll just take my private lesson,\" he said. \"That's enough for me.\"", "So on Monday, he skipped. On Wednesday, he had a tummy ache. On Friday, he simply \"forgot.\""] },
      { e: "🤼", art: A({ id: "cicada", pose: "grip", x: 400, f: 1, ex: 1 }, { id: "bang", pose: "grip", x: 570, f: -1 }), s: ["Meanwhile, Mem-Mem went to every single class.", "He drilled with big bugs, small bugs, fast bugs, and very stubborn bugs.", "Some days he won, and most days he lost.", "But every day, his moves got a tiny bit smoother."] },
      { ch: "Chapter 2 · Creak!", e: "🔩", art: { actors: [{ id: "grass", pose: "guard", x: 480, ex: 2, rust: .85 }], text: [{ x: 660, y: 160, s: "CREAK!", col: "#9c5220" }] }, s: ["A month later, Strum finally showed up for group sparring.", "He stepped onto the mat, set his feet, and tried his favorite throw.", "CREAK! His arms moved like an old, squeaky door.", "Little orange flakes of rust floated down onto the mat."] },
      { e: "😱", art: A({ id: "grass", pose: "stand", x: 400, f: 1, ex: 2, rust: .85 }, { id: "cicada", pose: "stand", x: 580, f: -1, ex: 2 }), s: ["\"What's happening to me?\" Strum gasped.", "\"I know the moves! I know all the names!\"", "\"Knowing the name of a move is not the same as owning it,\" said a calm voice behind him."] },
      { ch: "Chapter 3 · Owning the Move", e: "🪲", art: A({ id: "stag", pose: "stand", x: 380, f: 1, ex: 0 }, { id: "grass", pose: "stand", x: 580, f: -1, rust: .7, ex: 2 }), s: ["It was Coach Pinch.", "\"Private lessons teach you the move,\" he explained.", "\"Group class is where you try it on lots of different partners until it really becomes yours.\"", "\"You need both. The bugs who do both get the strongest.\""] },
      { e: "😟", art: A({ id: "grass", pose: "grip", x: 420, f: 1, rust: .5, ex: 1 }, { id: "cicada", pose: "grip", x: 580, f: -1 }), s: ["Strum swallowed hard. \"Is it too late for me?\"", "\"Rust is never forever,\" said Coach Pinch. \"But there's only one way to get it off.\"", "\"By showing up,\" said Strum quietly."] },
      { e: "🎉", art: A({ id: "grass", pose: "cheer", x: 400, f: 1, ex: 3 }, { id: "cicada", pose: "cheer", x: 580, f: -1, ex: 3 }), s: ["From then on, Strum came to group class every day, even when it was sweaty and crowded.", "Little by little, the rust flaked away and his moves began to shine again.", "At the end of the month, he even wrote a brand-new song.", "It was called \"My Choice, My Result,\" and the whole dojo sang along."] }
    ],
    words: W({ musical: "음악을 좋아하는", harmony: "화음", recite: "줄줄 외우다", sweaty: "땀투성이인", crowded: "붐비는", squished: "짓눌렀다", "private lesson": "개인 레슨", "tummy ache": "배탈", meanwhile: "그동안", drilled: "반복 연습했다", stubborn: "고집 센", smoother: "더 매끄러운", "showed up": "나타났다", squeaky: "삐걱거리는", flakes: "조각", rust: "녹", gasped: "헉 하고 놀랐다", owning: "내 것으로 만들기", "swallowed hard": "침을 꿀꺽 삼켰다", "flaked away": "조각조각 떨어졌다", shine: "빛나다", "sang along": "따라 불렀다" }),
    talk: ["Why didn't Strum like group class?", "What is the difference between knowing a move and owning it?", "Do you ever want to skip a class? What happens if you do?", "What would you say to Strum if he wanted to skip again?"],
    quiz: [
      { t: "choice", q: "Why didn't Strum like group class?", a: ["It was sweaty and crowded", "It was too short", "There was no music"], e: ["🥵", "⏱️", "🔇"] },
      { t: "choice", q: "What happened to Strum's moves after a month?", a: ["They got rusty", "They got faster", "They disappeared"], e: ["🔩", "⚡", "👻"] },
      { t: "choice", q: "What does Coach Pinch say group class is for?", a: ["Making the move really yours", "Learning the names", "Playing the guitar"], e: ["💪", "📖", "🎸"] },
      { t: "word", q: "'개인 레슨'은 영어로?", a: ["private lesson", "pirate lesson", "prize lesson"] },
      { t: "say", q: "Say it! Rust is never forever, and there's only one way to get it off: by ...", say: "By showing up.", key: ["showing", "up"] },
      { t: "say", q: "Tell me! Do you like private lessons or group class more? Why? Start with: I like ... because ...", say: "I like group class because I can spar with friends.", key: ["because"], free: true }
    ]
  },
  {
    id: "bdc-seven", level: 3, style: "곤충 무술 도장 · 챕터북", title: "The Seven O'Clock Battle",
    cover: { e: "⏰", bg: "#F7E3B0", art: { actors: [{ id: "cicada", pose: "sit", x: 480, ex: 5 }], text: [{ x: 660, y: 150, s: "BEEP!", col: "#e03131" }] } },
    blurb: "아침 6시 반, 따뜻한 이불과 7시 개인 레슨 사이의 대결. 맴맴이는 일어날까?",
    pages: [
      { ch: "Chapter 1 · The Enemy Under the Blanket", e: "⏰", art: { actors: [{ id: "cicada", pose: "flat", rot: -1.57, x: 480, ex: 5 }], text: [{ x: 700, y: 140, s: "BEEP-BEEP!", col: "#e03131" }] }, s: ["BEEP-BEEP-BEEP! The alarm went off at six thirty in the morning.", "Mem-Mem cracked open one eye and groaned.", "Outside, it was still gray and chilly. Inside, his leaf blanket was warm and cozy.", "\"Five more minutes,\" he mumbled, pulling the blanket over his head."] },
      { e: "😪", art: A({ id: "cicada", pose: "sit", x: 480, ex: 5 }), s: ["Today was the day of his seven o'clock private lesson with Coach Flash.", "And every part of his body was trying to talk him out of it.", "\"You're too tired,\" said his legs.", "\"It's too cold,\" said his wings.", "\"Just skip it this once,\" said his brain. \"Nobody will ever know.\""] },
      { e: "🤔", art: A({ id: "cicada", pose: "stand", x: 480, ex: 1 }), s: ["But then Mem-Mem remembered Strum and his rusty, creaky moves.", "\"If I stay in bed, my moves get rusty,\" he thought.", "\"If I go, I get a little bit stronger. It's my choice, and the result is mine.\"", "He counted to three, threw off the blanket, and jumped out of bed."] },
      { ch: "Chapter 2 · Cold Mats and Hot Drills", e: "🪲", art: { actors: [{ id: "cicada", pose: "shoot", x: 430, f: 1 }, { id: "rhino", pose: "sprawl", x: 610, f: -1 }], text: [{ x: 520, y: 120, s: "TACKLE!", col: "#20c997" }] }, s: ["When he got to the dojo, Coach Flash was already there, warming up.", "\"Good morning, warrior!\" he boomed. \"Let's start with fifty tackles.\"", "Fifty! Mem-Mem's legs wobbled just thinking about it."] },
      { e: "💦", art: A({ id: "cicada", pose: "top", x: 470, f: 1, ex: 1 }, { id: "dummy", pose: "flat", rot: -1.57, x: 620, f: 1 }), s: ["They drilled double-legs, single-legs, and sprawls until the sun came up.", "Then they practiced pinning: chest down, hips heavy, and never let your partner breathe easy.", "Sweat dripped off Mem-Mem's antennae, but he didn't stop."] },
      { e: "😤", art: A({ id: "rhino", pose: "cheer", x: 400, f: 1, ex: 3 }, { id: "cicada", pose: "stand", x: 580, f: -1, ex: 3 }), s: ["\"Here's a secret,\" said Coach Flash at the end of the lesson.", "\"Everybody feels tired at six thirty. Champions just get up anyway.\"", "Mem-Mem grinned. He felt tired, but he also felt something else. He felt proud."] },
      { ch: "Chapter 3 · The Payoff", e: "🦗", art: { actors: [{ id: "cicada", pose: "shoot", x: 430, f: 1 }, { id: "bang", pose: "low", x: 610, f: -1, ex: 2 }], text: [{ x: 540, y: 120, s: "BOOM!" }] }, s: ["That afternoon at group class, Mem-Mem sparred with Bob, the long-headed grasshopper.", "Bob was so tall that Mem-Mem had never once managed to tackle him.", "But this time, Mem-Mem dropped his level just like he had that morning, fifty times in a row.", "He shot in, wrapped up both legs, and drove straight through. BOOM!"] },
      { e: "🌙", art: A({ id: "cicada", pose: "bow", x: 400, f: 1 }, { id: "bang", pose: "bow", x: 570, f: -1 }), s: ["Bob blinked up at him from the mat. \"Since when can you do THAT?\"", "\"Since seven o'clock this morning,\" said Mem-Mem.", "That night, he set his alarm for six thirty again, and this time he went to sleep smiling."] }
    ],
    words: W({ alarm: "알람", "went off": "울렸다", groaned: "끙 소리를 냈다", chilly: "쌀쌀한", cozy: "포근한", "talk him out of it": "하지 말라고 설득하다", skip: "빼먹다", "threw off": "걷어찼다", boomed: "쩌렁쩌렁 말했다", wobbled: "후들거렸다", drilled: "반복 연습했다", pinning: "누르기", dripped: "뚝뚝 떨어졌다", antennae: "더듬이", champions: "챔피언들", anyway: "그래도", proud: "자랑스러운", payoff: "노력의 결과", managed: "해냈다", wrapped: "감쌌다", blinked: "눈을 깜빡였다" }),
    talk: ["What did Mem-Mem's legs, wings, and brain say to him?", "What made Mem-Mem decide to get up?", "What does 'Champions just get up anyway' mean?", "When is it hard for you to get up? What could help you?"],
    quiz: [
      { t: "choice", q: "What time did the alarm go off?", a: ["Six thirty", "Seven o'clock", "Nine o'clock"], e: ["⏰", "7️⃣", "9️⃣"] },
      { t: "choice", q: "Who did Mem-Mem remember when he wanted to stay in bed?", a: ["Strum and his rusty moves", "Sparkle and her light", "Dot and her throw"], e: ["🎸", "✨", "🐞"] },
      { t: "choice", q: "Why could Mem-Mem finally tackle Bob?", a: ["He practiced fifty tackles that morning", "Bob was sleeping", "Bob let him win"], e: ["💪", "😴", "🙂"] },
      { t: "word", q: "'포근한'은 영어로?", a: ["cozy", "crazy", "cloudy"] },
      { t: "say", q: "Say it! Everybody feels tired at six thirty. Champions just ...", say: "Champions just get up anyway.", key: ["get", "up"] },
      { t: "say", q: "Tell me! What helps you get up early? Start with: When I don't want to get up, I ...", say: "When I don't want to get up, I count to three and jump out of bed.", key: ["get", "up"], free: true }
    ]
  },
  {
    id: "bdc-sparkle", level: 3, style: "곤충 무술 도장 · 챕터북", title: "Sparkle's Secret",
    cover: { e: "✨", bg: "#25395B", art: { night: true, actors: [{ id: "fire", pose: "guard", x: 480, gl: .9, ex: 1 }] } },
    blurb: "모두 잠든 밤, 꽁무니 불을 켜고 혼자 연습하는 반짝이. 반짝이에게는 비밀이 있었어요.",
    pages: [
      { ch: "Chapter 1 · A Light in the Dark", e: "🌙", art: N({ id: "fire", pose: "stand", x: 480, gl: .3 }), s: ["Late one night, Mem-Mem woke up thirsty and crawled out of his leaf to find a drop of dew.", "The whole dojo was dark and silent.", "But down on the training mat, a small greenish-gold light was blinking on and off."] },
      { e: "✨", art: N({ id: "fire", pose: "guard", x: 480, gl: .9, ex: 1 }), s: ["It was Sparkle the firefly.", "Fireflies make light in their tails, and they flash it to send signals to each other, almost like a secret code.", "But tonight, Sparkle wasn't sending signals. She was training."] },
      { e: "🦵", art: { night: true, actors: [{ id: "fire", pose: "kick", x: 440, f: 1, gl: .7 }], text: [{ x: 680, y: 170, s: "HI-YA!", col: "#ffd43b" }] }, s: ["She threw a front kick, a round kick, and a spinning back kick, one after another.", "Each time she kicked, her light flashed a little brighter.", "Blink! Blink! BLINK!"] },
      { ch: "Chapter 2 · The Secret", e: "🥋", art: N({ id: "fire", pose: "turn", x: 440, f: 1, gl: .6 }, { id: "dummy", pose: "tuck", rot: 2.4, y: -80, x: 560, f: 1 }), s: ["Then she grabbed the straw dummy, turned in, and hurled it over her hip.", "The dummy sailed across the mat and landed in a heap.", "\"Wow,\" whispered Mem-Mem from the shadows."] },
      { e: "😲", art: N({ id: "cicada", pose: "stand", x: 380, f: 1, ex: 5 }, { id: "fire", pose: "stand", x: 580, f: -1, gl: 1, ex: 2 }), s: ["Sparkle spun around so fast that her light flickered.", "\"Mem-Mem! You scared me!\"", "\"Sorry,\" he said. \"But why are you training in the middle of the night?\""] },
      { e: "😟", art: N({ id: "cicada", pose: "sit", x: 400, f: 1, ex: 0 }, { id: "fire", pose: "sit", x: 560, f: -1, gl: .4, ex: 1 }), s: ["Sparkle looked down at her feet.", "\"Tomorrow is my yellow belt test,\" she admitted. \"And I'm really, really nervous.\"", "\"What if I freeze? What if everybody laughs at me?\"", "Mem-Mem sat down next to her. \"I was nervous before my first spar, too. I got thrown like a paper airplane.\"", "Sparkle giggled, and her light grew a little warmer."] },
      { ch: "Chapter 3 · Warriors Need Sleep", e: "🌙", art: N({ id: "cicada", pose: "grip", x: 400, f: 1 }, { id: "fire", pose: "grip", x: 570, f: -1, gl: .7 }), s: ["\"Can I train with you for a little while?\" asked Mem-Mem.", "Together they practiced her throws, slowly and carefully, until every step felt easy.", "Then Mem-Mem yawned an enormous yawn. \"You know what Coach Pinch always says?\"", "\"Warriors need sleep, too,\" they both said at the same time, and laughed."] },
      { e: "🟡", art: A({ id: "stag", pose: "stand", x: 380, f: 1, ex: 3 }, { id: "fire", pose: "cheer", x: 570, f: -1, gl: 1, ex: 3 }), s: ["The next morning, Sparkle stepped onto the mat for her test.", "Her legs were shaking, but her moves were smooth and strong.", "When Coach Pinch tied the yellow belt around her waist, her tail glowed so brightly that the whole dojo cheered.", "\"Thanks for last night,\" she whispered to Mem-Mem. \"That's what friends are for,\" he said."] }
    ],
    words: W({ thirsty: "목마른", crawled: "기어 나왔다", dew: "이슬", silent: "고요한", blinking: "깜빡이는", firefly: "반딧불이", signals: "신호", code: "암호", hurled: "내던졌다", sailed: "날아갔다", heap: "더미", shadows: "그림자", flickered: "깜빡였다", admitted: "털어놓았다", nervous: "긴장한", freeze: "얼어붙다", enormous: "엄청 큰", yawned: "하품했다", waist: "허리", glowed: "빛났다" }),
    talk: ["Why was Sparkle training in the middle of the night?", "How did Mem-Mem help Sparkle feel better?", "When do you feel nervous? What helps you?", "Why do warriors need sleep?"],
    quiz: [
      { t: "choice", q: "Why do fireflies flash their light?", a: ["To send signals to each other", "To cook their food", "To keep warm"], e: ["✨", "🍳", "🔥"] },
      { t: "choice", q: "Why was Sparkle training at night?", a: ["She was nervous about her belt test", "It was too noisy in the day", "She lost her light"], e: ["😟", "📢", "🔦"] },
      { t: "choice", q: "What did Mem-Mem tell Sparkle?", a: ["He was nervous before his first spar, too", "He never gets nervous", "She should quit"], e: ["🤝", "😎", "🚪"] },
      { t: "word", q: "'긴장한'은 영어로?", a: ["nervous", "noisy", "narrow"] },
      { t: "say", q: "Say it! They both said at the same time: Warriors need ...", say: "Warriors need sleep, too.", key: ["sleep"] },
      { t: "say", q: "Tell me! When do you feel nervous? Start with: I feel nervous when ...", say: "I feel nervous when I have a tournament.", key: ["nervous"], free: true }
    ]
  },
  {
    id: "bdc-buzz", level: 3, style: "곤충 무술 도장 · 챕터북", title: "Buzz Kicks Too High",
    cover: { e: "🐝", bg: "#FFE08A", art: { actors: [{ id: "bee", pose: "kick", x: 440, f: 1 }, { id: "bang", pose: "low", x: 600, f: -1, ex: 1 }] } },
    blurb: "발차기만 연습하던 윙윙이가 다리를 잡혀 넘어졌어요. 레슬링을 다시 시작한 윙윙이의 반격!",
    pages: [
      { ch: "Chapter 1 · The Fastest Feet in the Garden", e: "🐝", art: { actors: [{ id: "bee", pose: "kick", x: 440, f: 1 }], text: [{ x: 690, y: 160, s: "POW!" }] }, s: ["Buzz the bee had the fastest feet in the whole garden.", "Her wings beat more than two hundred times a second, and her kicks felt almost that fast.", "\"Nobody can touch me,\" she bragged, kicking a dandelion puff into a hundred floating seeds."] },
      { e: "😎", art: A({ id: "bee", pose: "guard", x: 480, f: 1, ex: 3 }), s: ["Buzz trained in three arts: taekwondo, wrestling, and judo.", "But lately, she only wanted to kick.", "\"Wrestling is sweaty, and judo messes up my wings,\" she said. \"Kicks are way cooler.\""] },
      { ch: "Chapter 2 · Caught!", e: "✋", art: A({ id: "bee", pose: "kick", x: 440, f: 1, ex: 2 }, { id: "bang", pose: "low", x: 600, f: -1, ex: 1 }), s: ["One afternoon, Buzz sparred with Bob, the long-headed grasshopper.", "She bounced in and fired a high kick straight at his head.", "But Bob didn't jump back. He stepped in, hugged her leg, and held on tight."] },
      { e: "💥", art: { actors: [{ id: "bee", pose: "flat", rot: -1.57, x: 470, f: 1, ex: 2 }, { id: "bang", pose: "top", x: 620, f: -1 }], text: [{ x: 480, y: 220, s: "BUMP!" }] }, s: ["Buzz hopped around on one foot, buzzing angrily.", "Bob swept her other foot, and she landed on the mat with a BUMP.", "\"Hey! That's not fair!\" Buzz shouted.", "\"It's completely fair,\" said Bob. \"It's wrestling. You just stopped practicing your defense.\""] },
      { ch: "Chapter 3 · Kicks and Wrestling Together", e: "🪲", art: A({ id: "rhino", pose: "stand", x: 400, f: 1, ex: 0 }, { id: "bee", pose: "stand", x: 580, f: -1, ex: 2 }), s: ["Coach Flash lumbered over and helped her up.", "\"Your kicks are amazing,\" he said. \"But when someone catches your leg, kicks can't save you.\"", "\"That's when you need wrestling and judo, the very things you've been skipping.\""] },
      { e: "🤼", art: { actors: [{ id: "bee", pose: "sprawl", x: 450, f: 1, ex: 1 }, { id: "bang", pose: "shoot", x: 620, f: -1 }], text: [{ x: 520, y: 150, s: "SPRAWL!", col: "#20c997" }] }, s: ["So Buzz went back to wrestling practice, even though it was sweaty.", "She learned to sprawl: throw your legs back, drop your hips, and crush the tackle.", "She learned to keep her balance on one leg, and to grip back when someone grabbed her."] },
      { e: "💥", art: { actors: [{ id: "bee", pose: "shoot", x: 440, f: 1, ex: 1 }, { id: "bang", pose: "low", x: 610, f: -1, ex: 2 }], text: [{ x: 540, y: 130, s: "TACKLE!", col: "#20c997" }] }, s: ["A week later, she sparred with Bob again.", "This time, she faked a high kick, and when Bob reached for her leg, she dropped low and shot a double-leg tackle instead.", "Bob went down with a surprised \"Oof!\""] },
      { e: "🎉", art: A({ id: "bee", pose: "cheer", x: 400, f: 1, ex: 3 }, { id: "bang", pose: "cheer", x: 580, f: -1, ex: 3 }), s: ["\"Kicks and wrestling together!\" Buzz cheered, zooming around in a happy circle.", "Bob laughed and shook her hand. \"Okay, okay. Now nobody can touch you.\"", "\"Not yet,\" said Buzz. \"But I'm going to practice everything until they really can't.\""] }
    ],
    words: W({ "two hundred": "200", bragged: "자랑했다", "dandelion puff": "민들레 홀씨", floating: "떠다니는", lately: "요즘", "messes up": "엉망으로 만든다", cooler: "더 멋진", bounced: "통통 뛰었다", fired: "날렸다", hugged: "끌어안았다", angrily: "화나서", swept: "쓸어 넘겼다", completely: "완전히", defense: "방어", lumbered: "쿵쿵 걸어왔다", sprawl: "스프롤(다리를 뒤로 빼기)", crush: "짓누르다", balance: "균형", faked: "속였다(페이크)", zooming: "쌩 날아다니며" }),
    talk: ["Why did Buzz stop practicing wrestling and judo?", "Was it fair when Bob caught her leg? Why?", "How did Buzz beat Bob the second time?", "Which do you like more, kicking or wrestling? Why do you need both?"],
    quiz: [
      { t: "choice", q: "Why did Buzz stop practicing wrestling and judo?", a: ["She thought kicks were cooler", "She hurt her wing", "The coach told her to stop"], e: ["😎", "🤕", "🗣️"] },
      { t: "choice", q: "What did Bob do when Buzz kicked high?", a: ["He caught her leg", "He ran away", "He kicked back"], e: ["✋", "🏃", "🦵"] },
      { t: "choice", q: "How did Buzz beat Bob the second time?", a: ["A fake kick, then a tackle", "A spinning kick", "She flew away"], e: ["💥", "🌀", "🪽"] },
      { t: "word", q: "'방어'는 영어로?", a: ["defense", "distance", "dessert"] },
      { t: "say", q: "Say it! Buzz cheered: Kicks and wrestling ...", say: "Kicks and wrestling together!", key: ["together"] },
      { t: "say", q: "Tell me! If someone catches your kick, what would you do? Start with: I would ...", say: "I would keep my balance and grip back.", key: ["would"], free: true }
    ]
  }
];
window.LILY_BOOKS = BUGDOJO.concat(window.LILY_BOOKS || []);
})();
