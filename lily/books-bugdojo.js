// 곤충 무술 도장(BUG DOJO) 영어책 시리즈 — 하준이가 좋아하는 애니메이션의 곤충 식구들이 그대로 나와요.
// 이름은 한국 이름의 뜻을 영어로 옮겼어요: 맴맴이=Mem-Mem, 번쩍이=Coach Flash, 집게=Coach Pinch, 꽉이=Coach Grip, 팡이=Coach Pop,
// 동글이=Dot, 팔랑이=Flutter, 긴다리=Longlegs, 반짝이=Sparkle, 윙윙이=Buzz, 콩콩이=Bob, 띵가=Strum.
// art = 그림(곤충 도장 그림 엔진으로 그려요): actors = [{id, pose, x(0~960), f(1 오른쪽/-1 왼쪽), ex(표정), rot, y, rust, gl}]
(() => {
const NAMES = { "mem-mem": "맴맴이 (매미 · 네 가지 다 배우는 주인공)", flash: "번쩍이 (장수풍뎅이 · 레슬링 사범님)", pinch: "집게 (사슴벌레 · 유도 사범님)", grip: "꽉이 (사마귀 · 주짓수 사범님) / 꽉 잡기", pop: "팡이 (메뚜기 · 태권도 사범님)", dot: "동글이 (무당벌레)", sparkle: "반짝이 (반딧불이)", buzz: "윙윙이 (꿀벌)", bob: "콩콩이 (방아깨비)", strum: "띵가 (베짱이)", longlegs: "긴다리 (여치)" };
const W = (o) => Object.assign({}, NAMES, o);
const BUGDOJO = [
  {
    id: "bd-meet", level: 1, style: "곤충 무술 도장", title: "Bug Dojo: Meet Mem-Mem",
    cover: { e: "🥋", bg: "#BFE2C6", art: { actors: [{ id: "cicada", pose: "cheer", x: 480, ex: 3 }] } },
    blurb: "맴맴이와 네 사범님(번쩍이·집게·꽉이·팡이)을 영어로 만나요.",
    pages: [
      { e: "🦗🥋", art: { actors: [{ id: "cicada", pose: "cheer", x: 480, ex: 3 }] }, s: ["This is Mem-Mem.", "Mem-Mem is a cicada.", "Mem-Mem loves the Bug Dojo!"] },
      { e: "🪲💪", art: { actors: [{ id: "rhino", pose: "low", x: 400, f: 1 }, { id: "dummy", pose: "stand", x: 640, f: -1 }] }, s: ["This is Coach Flash.", "He is a big rhino beetle.", "He teaches wrestling.", "He is very, very strong!"] },
      { e: "🪲🥋", art: { actors: [{ id: "stag", pose: "grip", x: 410, f: 1 }, { id: "cicada", pose: "grip", x: 580, f: -1 }] }, s: ["This is Coach Pinch.", "He is a stag beetle with big jaws.", "He teaches judo.", "\"Grip, pull, and throw!\" he says."] },
      { e: "🌿🤼", art: { actors: [{ id: "mantis", pose: "back", rot: -1.5, x: 430, f: 1 }, { id: "cicada", pose: "top", x: 620, f: -1 }] }, s: ["This is Coach Grip.", "She is a praying mantis.", "She teaches jiu-jitsu.", "She can win from her back!"] },
      { e: "🦗🦵", art: { actors: [{ id: "hop", pose: "kick", x: 420, f: 1 }], text: [{ x: 660, y: 170, s: "POW!" }] }, s: ["This is Coach Pop.", "He is a grasshopper.", "He teaches taekwondo.", "Look at his high kick!"] },
      { e: "🙇🙏", art: { actors: [{ id: "rhino", pose: "bow", x: 150, sc: .85 }, { id: "stag", pose: "bow", x: 320, sc: .85 }, { id: "cicada", pose: "bow", x: 480, f: -1 }, { id: "mantis", pose: "bow", x: 650, f: -1, sc: .85 }, { id: "hop", pose: "bow", x: 820, f: -1, sc: .85 }] }, s: ["Mem-Mem learns all four.", "Wrestling, judo, jiu-jitsu, and taekwondo!", "At the end, everybody bows.", "\"Thank you!\""] }
    ],
    words: W({ cicada: "매미", "rhino beetle": "장수풍뎅이", "stag beetle": "사슴벌레", jaws: "턱", "praying mantis": "사마귀", grasshopper: "메뚜기", teaches: "가르쳐요", strong: "힘센", grip: "잡다", pull: "당기다", throw: "던지다", kick: "발차기", bows: "인사해요(절)" }),
    talk: ["Who teaches judo at the Bug Dojo?", "Which coach is the strongest?", "Mem-Mem learns four things. What do you learn?"],
    quiz: [
      { t: "choice", q: "What is Mem-Mem?", a: ["A cicada", "A bee", "A frog"], e: ["🦗", "🐝", "🐸"] },
      { t: "choice", q: "Who teaches wrestling?", a: ["Coach Flash", "Coach Pop", "Coach Grip"], e: ["🪲", "🦗", "🌿"] },
      { t: "word", q: "'사슴벌레'는 영어로?", a: ["stag beetle", "ladybug", "butterfly"] },
      { t: "say", q: "Say it! At the end, everybody says: Thank ...", say: "Thank you!", key: ["thank", "you"] },
      { t: "say", q: "Tell me! What do you like best? Start with: I like ...", say: "I like wrestling best.", key: ["like"], free: true }
    ]
  },
  {
    id: "bd-fall", level: 1, style: "곤충 무술 도장", title: "Bug Dojo: Fall and Get Up",
    cover: { e: "🐞", bg: "#F6C9C3", art: { actors: [{ id: "lady", pose: "turn", x: 440, f: 1 }, { id: "cicada", pose: "tuck", rot: 2.2, y: -90, x: 560, f: 1, ex: 2 }] } },
    blurb: "동글이에게 메쳐진 맴맴이. 낙법하고 바로 일어나요!",
    pages: [
      { e: "🐞🦗", art: { actors: [{ id: "lady", pose: "guard", x: 400, f: 1 }, { id: "cicada", pose: "guard", x: 580, f: -1 }] }, s: ["Today, Dot and Mem-Mem are sparring.", "Dot is a ladybug.", "\"Are you ready?\" asks Dot.", "\"Ready!\" says Mem-Mem."] },
      { e: "💨", art: { actors: [{ id: "lady", pose: "turn", x: 440, f: 1 }, { id: "cicada", pose: "tuck", rot: 2.2, y: -90, x: 560, f: 1, ex: 2 }], text: [{ x: 700, y: 120, s: "WHOOSH!" }] }, s: ["Dot grips and turns.", "Up goes Mem-Mem!", "WHOOSH!"] },
      { e: "🖐️", art: { actors: [{ id: "lady", pose: "finish", x: 380, f: 1 }, { id: "cicada", pose: "flat", rot: -1.57, x: 600, f: 1, ex: 1 }], text: [{ x: 640, y: 230, s: "SLAP!", col: "#1c7ed6" }] }, s: ["Mem-Mem falls on the mat.", "But he slaps the mat. SLAP!", "That is a good fall."] },
      { e: "💪😊", art: { actors: [{ id: "lady", pose: "stand", x: 400, f: 1, ex: 3 }, { id: "cicada", pose: "cheer", x: 580, f: -1, ex: 0 }] }, s: ["Mem-Mem gets up fast.", "\"I'm okay!\" he says.", "\"Good fall!\" says Dot."] },
      { e: "🏃", art: { actors: [{ id: "cicada", pose: "shoot", x: 430, f: 1 }, { id: "lady", pose: "low", x: 600, f: -1, ex: 2 }], text: [{ x: 520, y: 140, s: "TACKLE!", col: "#20c997" }] }, s: ["Now it's Mem-Mem's turn.", "He goes low.", "He shoots in fast. Tackle!"] },
      { e: "🙇", art: { actors: [{ id: "cicada", pose: "bow", x: 400, f: 1 }, { id: "lady", pose: "bow", x: 560, f: -1 }] }, s: ["Everybody falls sometimes.", "Warriors get up.", "Dot and Mem-Mem bow.", "\"Thank you!\""] }
    ],
    words: W({ sparring: "스파링(연습 대결)", ladybug: "무당벌레", ready: "준비된", grips: "잡아요", turns: "돌아요", falls: "넘어져요", slaps: "탁 쳐요", "gets up": "일어나요", fast: "빨리", low: "낮게", "shoots in": "파고들어요", tackle: "태클", warriors: "전사들", sometimes: "가끔" }),
    talk: ["What did Mem-Mem do when he fell?", "Why is slapping the mat good?", "What do you do when you fall at judo?"],
    quiz: [
      { t: "choice", q: "Who threw Mem-Mem?", a: ["Dot", "Coach Flash", "Buzz"], e: ["🐞", "🪲", "🐝"] },
      { t: "choice", q: "What did Mem-Mem slap?", a: ["The mat", "The door", "Dot"], e: ["🟦", "🚪", "🐞"] },
      { t: "word", q: "'일어나요'는 영어로?", a: ["get up", "give up", "go up"] },
      { t: "say", q: "Say it! Everybody falls sometimes. Warriors ...", say: "Warriors get up.", key: ["get", "up"] },
      { t: "say", q: "Tell me! What is your best move? Start with: My best move is ...", say: "My best move is a tackle.", key: ["move"], free: true }
    ]
  },
  {
    id: "bd-rusty", level: 2, style: "곤충 무술 도장", title: "Bug Dojo: Strum Gets Rusty",
    cover: { e: "🎸", bg: "#E3D9A8", art: { actors: [{ id: "grass", pose: "guard", x: 480, ex: 2, rust: .8 }] } },
    blurb: "단체반을 빼먹던 띵가. 한 달 뒤 기술이 녹슬었어요. 다시 녹을 벗길 수 있을까?",
    pages: [
      { e: "🎸🎵", art: { actors: [{ id: "grass", pose: "sit", x: 480, ex: 3 }], text: [{ x: 640, y: 170, s: "♪ ♫", col: "#7048e8" }] }, s: ["This is Strum.", "Strum loves to sing.", "He knows the names of many moves.", "But he does not like group class."] },
      { e: "🛏️😴", art: { actors: [{ id: "grass", pose: "flat", rot: -1.57, x: 480, ex: 5 }] }, s: ["\"I'll just stay home today,\" says Strum.", "He skips class on Monday.", "He skips class on Wednesday.", "He skips class on Friday, too."] },
      { e: "🦗🤼", art: { actors: [{ id: "cicada", pose: "grip", x: 400, f: 1 }, { id: "bang", pose: "grip", x: 570, f: -1 }] }, s: ["Mem-Mem goes to every class.", "He practises with big bugs and small bugs.", "Every day, his moves get a little better."] },
      { e: "🔩😮", art: { actors: [{ id: "grass", pose: "guard", x: 480, ex: 2, rust: .85 }], text: [{ x: 660, y: 160, s: "CREAK!", col: "#9c5220" }] }, s: ["A month later, Strum comes back.", "He tries his move. CREAK!", "His moves are rusty!", "\"Oh no!\" says Strum."] },
      { e: "🪲💬", art: { actors: [{ id: "stag", pose: "stand", x: 380, f: 1, ex: 3 }, { id: "grass", pose: "grip", x: 580, f: -1, rust: .5 }] }, s: ["Coach Pinch smiles.", "\"Rust is not forever,\" he says.", "\"Come to class, and the rust will come off.\""] },
      { e: "✨🎉", art: { actors: [{ id: "cicada", pose: "cheer", x: 400, f: 1, ex: 3 }, { id: "grass", pose: "cheer", x: 580, f: -1, ex: 3 }] }, s: ["Strum comes to class every day.", "Little by little, the rust comes off.", "\"My choice, my result!\" says Strum.", "And he sings a happy song."] }
    ],
    words: W({ sing: "노래하다", moves: "기술들", "group class": "단체반", skips: "빼먹어요", every: "모든·매", practises: "연습해요", better: "더 잘하는", "a month later": "한 달 뒤", rusty: "녹슨", rust: "녹", forever: "영원히", "come off": "벗겨지다", choice: "선택", result: "결과" }),
    talk: ["Why did Strum's moves get rusty?", "What did Coach Pinch say?", "What happens when you skip class?", "How can you keep your moves strong?"],
    quiz: [
      { t: "choice", q: "What does Strum love?", a: ["Singing", "Swimming", "Sleeping"], e: ["🎵", "🏊", "😴"] },
      { t: "choice", q: "What happened to Strum's moves?", a: ["They got rusty", "They got faster", "They got bigger"], e: ["🔩", "⚡", "🐘"] },
      { t: "choice", q: "How does the rust come off?", a: ["Come to class", "Eat more", "Sleep more"], e: ["🥋", "🍔", "🛏️"] },
      { t: "word", q: "'녹슨'은 영어로?", a: ["rusty", "ready", "rainy"] },
      { t: "say", q: "Say it! Strum said: My choice, my ...", say: "My choice, my result!", key: ["result"] }
    ]
  },
  {
    id: "bd-seven", level: 2, style: "곤충 무술 도장", title: "Bug Dojo: The Seven O'Clock Lesson",
    cover: { e: "⏰", bg: "#F7E3B0", art: { actors: [{ id: "cicada", pose: "sit", x: 480, ex: 5 }] } },
    blurb: "아침 7시 개인 레슨. 이불 속이 따뜻한 맴맴이는 갈까, 말까?",
    pages: [
      { e: "⏰😴", art: { actors: [{ id: "cicada", pose: "flat", rot: -1.57, x: 480, ex: 5 }], text: [{ x: 700, y: 130, s: "BEEP! BEEP!", col: "#e03131" }] }, s: ["Beep, beep, beep! It is six thirty.", "Mem-Mem is so sleepy.", "\"Five more minutes,\" he says."] },
      { e: "🛏️🥶", art: { actors: [{ id: "cicada", pose: "sit", x: 480, ex: 5 }] }, s: ["Today he has a lesson at seven o'clock.", "\"I don't want to go,\" says Mem-Mem.", "\"My bed is warm. The dojo is cold.\""] },
      { e: "🤔", art: { actors: [{ id: "cicada", pose: "stand", x: 480, ex: 1 }] }, s: ["Mem-Mem thinks.", "\"If I stay in bed, my moves get rusty.\"", "\"If I go, I get better.\"", "\"It's my choice.\""] },
      { e: "🪲🏃", art: { actors: [{ id: "cicada", pose: "shoot", x: 430, f: 1 }, { id: "rhino", pose: "sprawl", x: 610, f: -1 }], text: [{ x: 520, y: 120, s: "TACKLE!", col: "#20c997" }] }, s: ["Mem-Mem goes to the dojo.", "Coach Flash is already there.", "\"Good morning! Let's tackle!\""] },
      { e: "💦💪", art: { actors: [{ id: "cicada", pose: "top", x: 470, f: 1, ex: 1 }, { id: "dummy", pose: "flat", rot: -1.57, x: 620, f: 1 }] }, s: ["They tackle and tackle.", "They hold and press.", "Mem-Mem is tired, but he does not stop."] },
      { e: "😄🌅", art: { actors: [{ id: "rhino", pose: "cheer", x: 400, f: 1, ex: 3 }, { id: "cicada", pose: "cheer", x: 580, f: -1, ex: 3 }] }, s: ["At the end, Coach Flash gives a big smile.", "\"You came, and you got better.\"", "Mem-Mem feels strong.", "\"I'm glad I got up!\""] }
    ],
    words: W({ sleepy: "졸린", "five more minutes": "5분만 더", lesson: "레슨·수업", "seven o'clock": "7시", warm: "따뜻한", cold: "추운", thinks: "생각해요", stay: "머물다", already: "벌써", hold: "잡고 있다", press: "누르다", tired: "지친", glad: "기쁜" }),
    talk: ["Why didn't Mem-Mem want to go?", "What did Mem-Mem choose?", "How did he feel at the end?", "Is it hard for you to get up early? What helps you?"],
    quiz: [
      { t: "choice", q: "What time is the lesson?", a: ["Seven o'clock", "Ten o'clock", "Three o'clock"], e: ["7️⃣", "🔟", "3️⃣"] },
      { t: "choice", q: "Who is at the dojo?", a: ["Coach Flash", "Strum", "Dot"], e: ["🪲", "🎸", "🐞"] },
      { t: "choice", q: "How does Mem-Mem feel at the end?", a: ["Strong", "Sad", "Angry"], e: ["💪", "😢", "😠"] },
      { t: "word", q: "'졸린'은 영어로?", a: ["sleepy", "slippy", "silly"] },
      { t: "say", q: "Say it! Mem-Mem said: I'm glad I got ...", say: "I'm glad I got up!", key: ["up"] }
    ]
  },
  {
    id: "bd-night", level: 2, style: "곤충 무술 도장", title: "Bug Dojo: Sparkle's Night Training",
    cover: { e: "✨", bg: "#25395B", art: { night: true, actors: [{ id: "fire", pose: "guard", x: 480, gl: .9, ex: 1 }] } },
    blurb: "모두 잠든 밤, 꽁무니에 불을 켜고 혼자 연습하는 반짝이.",
    pages: [
      { e: "🌙", art: { night: true, actors: [{ id: "fire", pose: "stand", x: 480, gl: .3 }] }, s: ["It is night at the Bug Dojo.", "Everyone is asleep.", "But one little light is on."] },
      { e: "✨", art: { night: true, actors: [{ id: "fire", pose: "guard", x: 480, gl: .9, ex: 1 }] }, s: ["It's Sparkle the firefly!", "Her tail glows in the dark.", "Fireflies use their light to talk to their friends."] },
      { e: "🦵✨", art: { night: true, actors: [{ id: "fire", pose: "kick", x: 440, f: 1, gl: .7 }], text: [{ x: 680, y: 170, s: "HI-YA!", col: "#ffd43b" }] }, s: ["Sparkle practises her kicks.", "One, two, three!", "Her light goes blink, blink, blink."] },
      { e: "🥋", art: { night: true, actors: [{ id: "fire", pose: "turn", x: 440, f: 1, gl: .6 }, { id: "dummy", pose: "tuck", rot: 2.4, y: -80, x: 560, f: 1 }] }, s: ["Then she practises her judo throw.", "Grip, turn, and throw!", "The straw dummy goes flying."] },
      { e: "😪", art: { night: true, actors: [{ id: "cicada", pose: "stand", x: 380, f: 1, ex: 5 }, { id: "fire", pose: "stand", x: 580, f: -1, gl: .8, ex: 0 }] }, s: ["Mem-Mem wakes up.", "\"Sparkle, why are you training at night?\"", "\"I want to be ready for tomorrow,\" says Sparkle."] },
      { e: "🌙💤", art: { night: true, actors: [{ id: "cicada", pose: "bow", x: 400, f: 1 }, { id: "fire", pose: "bow", x: 560, f: -1, gl: 1 }] }, s: ["\"Can I train with you?\" asks Mem-Mem.", "\"Yes, but only ten more minutes,\" says Sparkle.", "\"Warriors need sleep, too!\"", "Good night, Bug Dojo."] }
    ],
    words: W({ night: "밤", asleep: "잠든", light: "불빛", firefly: "반딧불이", tail: "꼬리·꽁무니", glows: "빛나요", dark: "어둠", blink: "깜빡", throw: "메치기·던지기", "straw dummy": "짚 인형", flying: "날아가는", training: "훈련하는", tomorrow: "내일", sleep: "잠" }),
    talk: ["Why was Sparkle training at night?", "How do fireflies talk to their friends?", "Why do warriors need sleep?"],
    quiz: [
      { t: "choice", q: "What glows in the dark?", a: ["Sparkle's tail", "Mem-Mem's hat", "The moon cake"], e: ["✨", "🧢", "🍰"] },
      { t: "choice", q: "What did the straw dummy do?", a: ["It went flying", "It sang a song", "It ran away"], e: ["💨", "🎵", "🏃"] },
      { t: "word", q: "'반딧불이'는 영어로?", a: ["firefly", "fire truck", "butterfly"] },
      { t: "say", q: "Say it! Sparkle said: Warriors need ...", say: "Warriors need sleep, too!", key: ["sleep"] },
      { t: "say", q: "Tell me! What time do you go to bed? Start with: I go to bed at ...", say: "I go to bed at nine.", key: ["bed"], free: true }
    ]
  },
  {
    id: "bd-buzz", level: 2, style: "곤충 무술 도장", title: "Bug Dojo: Buzz Kicks Too High",
    cover: { e: "🐝", bg: "#FFE08A", art: { actors: [{ id: "bee", pose: "kick", x: 440, f: 1 }, { id: "bang", pose: "low", x: 600, f: -1, ex: 1 }] } },
    blurb: "발차기만 연습하던 윙윙이가 다리를 잡혔어요. 레슬링이 왜 필요한지 배워요.",
    pages: [
      { e: "🐝🦵", art: { actors: [{ id: "bee", pose: "kick", x: 440, f: 1 }], text: [{ x: 690, y: 160, s: "POW!" }] }, s: ["Buzz the bee loves kicking.", "Her kicks are very fast.", "Buzz, buzz, POW!", "Now she only practises kicks."] },
      { e: "🦗✋", art: { actors: [{ id: "bee", pose: "kick", x: 440, f: 1, ex: 2 }, { id: "bang", pose: "low", x: 600, f: -1, ex: 1 }] }, s: ["One day, Buzz spars with Bob.", "Buzz kicks high.", "But Bob catches her leg!"] },
      { e: "💥", art: { actors: [{ id: "bee", pose: "flat", rot: -1.57, x: 470, f: 1, ex: 2 }, { id: "bang", pose: "top", x: 620, f: -1 }], text: [{ x: 480, y: 220, s: "BUMP!" }] }, s: ["Bob pulls, and Buzz falls down. BUMP!", "\"Hey! That's not fair!\" says Buzz.", "\"It is fair,\" says Bob. \"It's wrestling.\""] },
      { e: "🪲💬", art: { actors: [{ id: "rhino", pose: "stand", x: 400, f: 1, ex: 0 }, { id: "bee", pose: "stand", x: 580, f: -1, ex: 2 }] }, s: ["Coach Flash walks over.", "\"Kicks are great,\" he says.", "\"But if someone catches your leg, you need wrestling, too.\""] },
      { e: "🐝🤼", art: { actors: [{ id: "bee", pose: "sprawl", x: 450, f: 1, ex: 1 }, { id: "bang", pose: "shoot", x: 620, f: -1 }], text: [{ x: 520, y: 150, s: "SPRAWL!", col: "#20c997" }] }, s: ["So Buzz practises wrestling.", "She learns to sprawl.", "Legs back! Hips down!", "Now nobody can grab her legs."] },
      { e: "🎉", art: { actors: [{ id: "bee", pose: "shoot", x: 440, f: 1, ex: 1 }, { id: "bang", pose: "low", x: 610, f: -1, ex: 2 }], text: [{ x: 540, y: 130, s: "TACKLE!", col: "#20c997" }] }, s: ["Next time, Buzz kicks low and fast.", "Then she shoots in for a tackle!", "\"Kicks and wrestling together!\" says Buzz.", "Everybody cheers."] }
    ],
    words: W({ bee: "꿀벌", kicking: "발차기하기", only: "~만", spars: "스파링해요", catches: "잡아요", leg: "다리", fair: "공평한", "walks over": "걸어와요", someone: "누군가", sprawl: "스프롤(다리를 뒤로 빼기)", hips: "엉덩이", grab: "움켜잡다", together: "함께", cheers: "환호해요" }),
    talk: ["What did Bob catch?", "Why does Buzz need wrestling?", "What is a sprawl? Can you show me?", "Which do you like more, kicking or wrestling?"],
    quiz: [
      { t: "choice", q: "What does Buzz love?", a: ["Kicking", "Swimming", "Singing"], e: ["🦵", "🏊", "🎵"] },
      { t: "choice", q: "What did Bob catch?", a: ["Buzz's leg", "Buzz's hat", "A ball"], e: ["🦵", "🧢", "⚽"] },
      { t: "choice", q: "What did Buzz learn?", a: ["To sprawl", "To fly", "To sing"], e: ["🤼", "🪽", "🎵"] },
      { t: "word", q: "'공평한'은 영어로?", a: ["fair", "fire", "far"] },
      { t: "say", q: "Say it! Buzz said: Kicks and wrestling ...", say: "Kicks and wrestling together!", key: ["together"] }
    ]
  }
];
window.LILY_BOOKS = BUGDOJO.concat(window.LILY_BOOKS || []);
})();
