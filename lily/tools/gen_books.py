# 사용법: python3 lily/tools/gen_books.py eps.json lily/books-bugdojo.js
# Builds lily/books-bugdojo.js: English chapter-book retellings of every 곤충 무술 도장 episode,
# illustrated with the poses sampled from the animation itself (eps.json).
import json, sys
EPS = json.load(open(sys.argv[1], encoding="utf-8"))
OUT = sys.argv[2]
FR = [0.15, 0.3, 0.45, 0.55, 0.7, 0.85, 0.97]
beats = {}
for ei, e in enumerate(EPS):
    for b in e["beats"]:
        beats[(ei, b["id"])] = b

def art(ei, bid, q=0.55, extra=None):
    b = beats[(ei, bid)]
    acts = b["acts"][FR.index(q)]
    out = []
    for a in acts:
        if a["x"] < -30 or a["x"] > 990: continue
        d = {"id": a["id"], "x": a["x"], "f": a["f"], "ex": a["ex"]}
        if a["y"]: d["y"] = a["y"]
        if a["rot"]: d["rot"] = a["rot"]
        if a["rust"]: d["rust"] = round(a["rust"], 2)
        if a["gl"]: d["gl"] = round(a["gl"], 2)
        d.update(a["P"])
        out.append(d)
    o = {"actors": out}
    if b["bg"] == "night": o["night"] = True
    if extra: o["text"] = extra
    return o

NAMES = {"mem-mem": "맴맴이 (매미 · 네 가지 다 배우는 주인공)", "flash": "번쩍이 (장수풍뎅이 · 레슬링 사범님)", "pinch": "집게 (사슴벌레 · 유도 사범님)",
         "grip": "꽉이 (사마귀 · 주짓수 사범님) / 꽉 잡다", "pop": "팡이 (메뚜기 · 태권도 사범님)", "dot": "동글이 (무당벌레)", "flutter": "팔랑이 (나비)",
         "longlegs": "긴다리 (여치)", "sparkle": "반짝이 (반딧불이)", "buzz": "윙윙이 (꿀벌)", "bob": "콩콩이 (방아깨비)", "strum": "띵가 (베짱이)",
         "rolly": "굴리 (쇠똥구리)", "rocky": "단단이 (개미)", "chirpy": "뚜리 (귀뚜라미)", "little horn": "꼬마뿔 (번쩍이 사범님 아들)"}

def book(id, ep, epname, title, blurb, cover, pages, words, talk, quiz, bg):
    w = dict(NAMES); w.update(words)
    return {"id": id, "ep": ep, "dojoEp": epname, "level": 3, "style": "곤충 무술 도장 · " + epname, "title": title,
            "cover": {"e": "🥋", "bg": bg, "art": cover}, "blurb": blurb, "pages": pages, "words": w, "talk": talk, "quiz": quiz}

def P(ei, bid, s, ch=None, q=0.55, e="🥋", extra=None):
    d = {"e": e, "art": art(ei, bid, q, extra), "s": s, "beat": bid}
    if ch: d["ch"] = ch
    return d

B = []
# ---------------------------------------------------------------- 1화
B.append(book("ep1", 1, "1화", "Bug Dojo 1: The Cicada Who Learned Four Arts",
  "1화 「네 가지를 배운 매미」를 영어로 — 네 사범님, 여러 가지를 같이 배우는 친구들, 맴맴이의 첫 스파링.",
  art(0, "title"), [
  P(0, "intro", ["Under a big tree in the forest, there was a martial arts school for bugs.", "It was called the Bug Dojo.", "Four masters taught there, and each one was the best at something different."], ch="Chapter 1 · Four Masters Under the Big Tree"),
  P(0, "rhino", ["Coach Flash, the rhinoceros beetle, taught wrestling.", "\"Get low, drive forward, and lift!\" he said, and he scooped the straw dummy up high.", "Real rhinoceros beetles do the same thing: they slide their horn under a rival and flip it over."], extra=[{"x": 520, "y": 120, "s": "LIFT!", "col": "#20c997"}]),
  P(0, "stag", ["Coach Pinch, the stag beetle, taught judo.", "\"Grip, break their balance, and throw,\" he said, and the dummy flew over his shoulder.", "Real stag beetles grab their rivals with their huge jaws and toss them away."], extra=[{"x": 560, "y": 120, "s": "WHOOSH!"}]),
  P(0, "mantis", ["Coach Grip, the praying mantis, taught jiu-jitsu.", "\"Being on your back doesn't mean it's over,\" she said.", "\"Block with your legs, flip them over, and hold on tight.\"", "A real mantis waits very still, then grabs in the blink of an eye."]),
  P(0, "hop", ["Coach Pop, the grasshopper, taught taekwondo.", "He measured the distance, kept his balance, and spun into a lightning-fast spinning back kick.", "Real grasshoppers can jump about twenty times the length of their own bodies!"], extra=[{"x": 700, "y": 150, "s": "POW!"}]),
  P(0, "friends", ["Lots of students at the dojo learned two or three arts at the same time."], ch="Chapter 2 · Friends Who Learn More Than One"),
  P(0, "lady", ["Dot the ladybug learned judo and jiu-jitsu.", "She could roll across the mat like a little red ball, and when she fell, she slapped the mat and never got hurt.", "Real ladybugs flip onto their backs and play dead when they are in danger."]),
  P(0, "butter", ["Flutter the butterfly learned taekwondo and jiu-jitsu.", "She kicked as lightly as a butterfly, and she used the butterfly guard to flip her partners over.", "Yes, there really is a jiu-jitsu move named after a butterfly!"]),
  P(0, "bang", ["Bob the rice grasshopper learned wrestling, judo, and jiu-jitsu.", "When you hold a real rice grasshopper's back legs, it bobs up and down.", "That's just like a wrestler changing levels, isn't it?"]),
  P(0, "cicada", ["And then a friend appeared who had been getting ready for a very long time.", "It was Mem-Mem the cicada!", "Real cicadas grow under the ground for years before they come out, and Mem-Mem had practiced for a long, long time, too."]),
  P(0, "sparin", ["Mem-Mem learned all four arts, just like Hajun: taekwondo, judo, wrestling, and jiu-jitsu.", "Today was sparring day, and he would have one match with each master.", "But first, they bowed to each other."], ch="Chapter 3 · Sparring Day"),
  P(0, "spar1", ["First up was Coach Pinch. Whoosh! Over went Mem-Mem!", "But he had learned how to fall, so he didn't get hurt.", "\"When you fall, you just get back up,\" he said. \"One more time!\""]),
  P(0, "spar2", ["Next was Coach Flash, and here came a tackle!", "Mem-Mem threw his legs back in a sprawl and spun around behind him."], extra=[{"x": 540, "y": 130, "s": "SPRAWL!", "col": "#20c997"}]),
  P(0, "spar3", ["Last of all was Coach Grip, and this time Mem-Mem linked all four arts together.", "He measured the distance with taekwondo, got low with wrestling, threw with judo, and held on with jiu-jitsu.", "Omoplata!"]),
  P(0, "bow", ["Everything he had learned, one piece at a time, joined together into a brand-new kind of strength.", "\"And the most important thing in martial arts,\" said Coach Pinch, \"is the bow.\"", "Everyone bowed together. \"Thank you!\""], q=0.85),
  ], {"rhinoceros beetle": "장수풍뎅이", "stag beetle": "사슴벌레", "praying mantis": "사마귀", "grasshopper": "메뚜기", "scooped": "퍼 올렸다", "rival": "맞수", "balance": "균형", "jaws": "턱", "measured": "쟀다", "distance": "거리", "ladybug": "무당벌레", "play dead": "죽은 척하다", "butterfly guard": "버터플라이 가드", "rice grasshopper": "방아깨비", "changing levels": "자세를 낮췄다 올렸다 하기(레벨 체인지)", "sparring": "스파링", "sprawl": "스프롤(다리를 뒤로 빼서 태클 막기)", "linked": "이었다", "bow": "인사(절)"},
  ["Which master would you like to learn from, and why?", "Why didn't Mem-Mem get hurt when he fell?", "How did Mem-Mem link all four arts together?", "Which of the four arts do you like the most?"],
  [{"t": "choice", "q": "Who teaches wrestling at the Bug Dojo?", "a": ["Coach Flash", "Coach Pop", "Coach Grip"], "e": ["🪲", "🦗", "🌿"]},
   {"t": "choice", "q": "What do real ladybugs do when they are in danger?", "a": ["They play dead", "They sing a song", "They dig a hole"], "e": ["🐞", "🎵", "🕳️"]},
   {"t": "choice", "q": "What did Mem-Mem do when Coach Flash tackled him?", "a": ["He sprawled", "He ran away", "He kicked"], "e": ["🤼", "🏃", "🦵"]},
   {"t": "word", "q": "'균형'은 영어로?", "a": ["balance", "ballet", "bounce"]},
   {"t": "say", "q": "Say it! When you fall, you just ...", "say": "When you fall, you just get back up.", "key": ["get", "up"]},
   {"t": "say", "q": "Tell me! Which master would you like to learn from? Start with: I want to learn from ... because ...", "say": "I want to learn from Coach Flash because he is strong.", "key": ["because"], "free": True}],
  "#BFE2C6"))
# ---------------------------------------------------------------- 2화
B.append(book("ep2", 2, "2화", "Bug Dojo 2: Sparkle's Night Training",
  "2화 「반딧불이의 밤 수련」을 영어로 — 띵가의 녹슨 기술, 반짝이의 단체반 비밀, 고등어 물약, 선택은 내가.",
  art(1, "t2"), [
  P(1, "morning", ["Seven o'clock in the morning. Brrring!", "It was Mem-Mem's private wrestling lesson day, but his eyes just wouldn't open.", "\"Yaaawn. Maybe I'll skip it, just for today.\""], ch="Chapter 1 · Just One Day Off?", extra=[{"x": 690, "y": 140, "s": "BRRRING!", "col": "#e03131"}]),
  P(1, "grass", ["Just then, Strum the grasshopper strolled by, strumming his guitar.", "\"Practice? I'll do it tomorrow!\" he sang. \"I'm only taking fancy private lessons. No tough group classes for me!\"", "Mem-Mem's ears perked up. That sounded pretty nice..."], extra=[{"x": 760, "y": 160, "s": "🎸", "emoji": True}]),
  P(1, "night", ["Meanwhile, Sparkle the firefly went to group judo class every single night.", "The class was full of bugs about her size. One match, then another, then another!", "She lost sometimes, but sparring with lots of bugs her own size was Sparkle's secret."]),
  P(1, "month", ["A month went by.", "Sparkle, who did private lessons AND group class, had grown much stronger.", "But Strum, who only took private lessons and kept skipping practice, had spent lots of acorns, and his moves had gone rusty."], ch="Chapter 2 · A Month Later"),
  P(1, "match", ["On tournament day, Sparkle faced Strum.", "Strum knew the name of every move. \"Shoulder throw! Hip sweep!\" But his body couldn't do them.", "Sparkle won the grip fight, broke his balance, and threw him.", "Knowing a move isn't enough: your body has to remember it, and that takes lots and lots of practice."]),
  P(1, "grip", ["In group class, Mem-Mem sparred with Dot, but he lost the grip fight and went flying.", "He felt so upset that he didn't want to go back to judo.", "Then Coach Pinch said, \"You didn't lose because you're weak. You just need more grip-fighting practice.\""]),
  P(1, "potion", ["Coach Pinch pulled out a secret potion. \"Ta-da! The Champion's Mackerel Potion!\"", "\"It turns your arms into steel ropes and your hands into locks,\" he said.", "Mem-Mem gulped it down, and from then on, he practiced his grips every single day."], extra=[{"x": 640, "y": 210, "s": "🐟", "emoji": True}]),
  P(1, "eyes", ["While Mem-Mem was practicing with Flutter, someone called from outside, and he looked away.", "In that instant, Flutter flipped him over.", "\"Let's try again,\" she said. \"This time, keep your eyes on your partner.\""], ch="Chapter 3 · My Choice, My Result"),
  P(1, "choice", ["Mem-Mem thought hard. \"Morning practice makes me sleepy. But where did my strength come from?\"", "It came from those early wrestling sessions with Coach Flash, and if he quit, that strength would slowly fade away.", "So Mem-Mem decided for himself: \"I'll do private lessons AND group class!\"", "My choice, and my result."]),
  P(1, "back", ["That night, Strum shuffled shyly into the judo hall. \"Um... can I try group class too?\"", "His friends welcomed him with big smiles, and he got thrown again at first, but that was okay.", "Rusty moves come back, shiny and new, when you start practicing again."]),
  P(1, "bow2", ["Today's dojo promise: private practice in the morning, group class at night.", "The friends who spar with lots of bugs their own size get truly strong.", "Everybody together: \"Thank you!\""], q=0.85),
  ], {"private lesson": "개인 레슨", "group class": "단체반", "skip": "빼먹다", "strolled": "어슬렁어슬렁 걸어왔다", "fancy": "비싼·멋진", "perked up": "솔깃해졌다", "firefly": "반딧불이", "acorns": "도토리", "rusty": "녹슨", "tournament": "대회", "shoulder throw": "업어치기", "hip sweep": "허리후리기", "grip fight": "깃 싸움", "upset": "속상한", "mackerel": "고등어", "potion": "물약", "steel ropes": "강철 밧줄", "gulped": "꿀꺽 마셨다", "instant": "순간", "fade away": "점점 사라지다", "result": "결과", "shuffled": "쭈뼛쭈뼛 걸었다", "shyly": "수줍게", "welcomed": "반갑게 맞았다", "promise": "약속"},
  ["Why did Strum's moves get rusty?", "What was Sparkle's secret?", "What did Coach Pinch say when Mem-Mem lost the grip fight?", "Do you ever want to skip morning practice? What do you choose?"],
  [{"t": "choice", "q": "What was Sparkle's secret?", "a": ["She sparred with bugs her size every night", "She drank lots of juice", "She slept all day"], "e": ["🥋", "🧃", "😴"]},
   {"t": "choice", "q": "Why couldn't Strum do the moves?", "a": ["He knew the names but didn't practice", "He forgot his guitar", "He was too big"], "e": ["🔩", "🎸", "🐘"]},
   {"t": "choice", "q": "What did Flutter tell Mem-Mem?", "a": ["Keep your eyes on your partner", "Go home and rest", "Kick higher"], "e": ["👀", "🏠", "🦵"]},
   {"t": "word", "q": "'고등어'는 영어로?", "a": ["mackerel", "marble", "mango"]},
   {"t": "say", "q": "Say it! Mem-Mem decided: My choice, and my ...", "say": "My choice, and my result.", "key": ["result"]},
   {"t": "say", "q": "Tell me! Do you like private lessons or group class more? Start with: I like ... because ...", "say": "I like group class because I can spar with friends.", "key": ["because"], "free": True}],
  "#25395B"))
# ---------------------------------------------------------------- 특집
B.append(book("epsp", 2.5, "특집", "Bug Dojo Special: The Holes You Get From Doing Just One",
  "특집 「하나만 하면 생기는 구멍」을 영어로 — 세 가지 거리, 한 종목만 하면 생기는 구멍, 레슬링이 주짓수에 주는 무기 4가지.",
  art(2, "sp0"), [
  P(2, "map", ["In a fight, there are three distances.", "Far away, you kick. Up close, you grab and tackle. And then there's the ground.", "If you learn only one art, you get a hole somewhere else. Let's take a look!"], ch="Chapter 1 · Three Distances"),
  P(2, "tkdonly", ["First, what if you only do taekwondo?", "Taekwondo kicks are fast and strong from far away, but when you lift your leg, you're standing on just one foot.", "If someone catches your kick, it's hop, hop, hop... BOOM!", "And if your opponent gets really close, there's no room to kick at all."]),
  P(2, "bjjonly", ["Second, what if you only do jiu-jitsu?", "Jiu-jitsu is the best on the ground, but if you can't fight standing up, your opponent can throw you whenever they want.", "BOOM! They get two points, and you start on the bottom.", "Your opponent gets to choose where the fight happens."], ch="Chapter 2 · The Missing Pieces"),
  P(2, "nojudo", ["Third, what if you never learn judo?", "When someone grabs your collar, they can drag you all over the place, and if you push hard, a judo player uses your push to throw you.", "Judo teaches you how to grip, how to use your opponent's strength, and how to fall safely."]),
  P(2, "nowr", ["Fourth, what if you skip wrestling?", "You don't know how to stop a tackle, so down you go, and then you get stuck under heavy pressure and run out of breath fast.", "Wrestling is hard, but the harder it is, the more strength and stamina you build."]),
  P(2, "combo", ["So how does wrestling help in jiu-jitsu? It gives you four weapons.", "One: you choose when to take them down, so you start on top. Two: your pressure is so heavy that they can't move.", "Three: in a scramble, you get to their back first. Four: even if you end up on the bottom, you pop right back up."], ch="Chapter 3 · Four Weapons"),
  P(2, "combo", ["Hajun's strong top pressure comes from all those tough morning wrestling sessions, too!"], q=0.85),
  P(2, "sum", ["If you learn all four arts, you always have something to do: far away, up close, and on the ground.", "Tough morning wrestling and group judo class fill in those holes.", "Let's fill them up one by one, just like Mem-Mem. Everybody together: \"Thank you!\""]),
  ], {"distances": "거리들", "ground": "바닥", "hole": "구멍", "opponent": "상대", "room": "공간", "points": "점수", "bottom": "아래쪽", "collar": "깃", "drag": "끌고 다니다", "safely": "안전하게", "pressure": "누르는 힘", "breath": "숨", "stamina": "체력", "weapons": "무기", "scramble": "뒤엉킨 상황", "pop right back up": "벌떡 다시 일어나다", "fill": "채우다"},
  ["What are the three distances in a fight?", "What happens if you only do taekwondo?", "What are the four weapons wrestling gives you in jiu-jitsu?", "Which hole do you want to fill next?"],
  [{"t": "choice", "q": "What can happen if you only do taekwondo?", "a": ["Your kick gets caught", "You get too tall", "You fly away"], "e": ["🦵", "🦒", "🪽"]},
   {"t": "choice", "q": "What does judo teach you?", "a": ["How to fall safely", "How to swim", "How to sing"], "e": ["🥋", "🏊", "🎵"]},
   {"t": "choice", "q": "In jiu-jitsu, where is the best spot to get to in a scramble?", "a": ["Their back", "The door", "Under the mat"], "e": ["🔙", "🚪", "🟦"]},
   {"t": "word", "q": "'체력'은 영어로?", "a": ["stamina", "stomach", "station"]},
   {"t": "say", "q": "Say it! Wrestling is hard, but it builds strength and ...", "say": "It builds strength and stamina.", "key": ["stamina"]},
   {"t": "say", "q": "Tell me! Which art is the hardest for you, and why? Start with: The hardest one is ... because ...", "say": "The hardest one is wrestling because I get tired.", "key": ["because"], "free": True}],
  "#F7E3B0"))
# ---------------------------------------------------------------- 3화
B.append(book("ep3", 3, "3화", "Bug Dojo 3: The Growth Stairs, Part One",
  "3화 「성장 계단 ① 운동만 잘하면 될까?」를 영어로 — 바닥의 짱 굴리, 밤마다 300번 단단이, 단체반의 팔랑이, 두 달 다닌 뚜리.",
  art(3, "t3"), [
  P(3, "proud", ["These days, Mem-Mem was in the best mood ever, because he had learned all four arts!", "\"I'm good at sports now, so I'm done, right?\" he said.", "But was that really true? Today, Mem-Mem's growth stairs began."], ch="Chapter 1 · Am I Done?"),
  P(3, "gulli", ["In group class, there was Rolly the dung beetle, the king of the ground.", "Rolly only did jiu-jitsu, so nobody could beat him lying down.", "But when it was time to fight standing up, BOOM! And BOOM again! He kept falling."]),
  P(3, "gulli", ["Mem-Mem helped him up. \"Let's practice standing up together!\"", "That was the first step on the growth stairs."], q=0.97),
  P(3, "ant1", ["Rocky the ant used to be a friend Mem-Mem always beat.", "But lately? Whoosh! THUD! It was Mem-Mem who kept flying through the air.", "Why had Rocky gotten so strong?"], ch="Chapter 2 · Secrets Nobody Sees"),
  P(3, "antnight", ["It turned out that every night, Rocky swung a Bulgarian bag at home.", "One, two, three... three hundred times a day!", "Real ants can lift things more than ten times heavier than their own bodies.", "Hard work that nobody sees turns into strength one day. That was the second step."]),
  P(3, "bjjgroup", ["Mem-Mem thought, \"I've had lots of private jiu-jitsu lessons, so I must be the best.\"", "But in group sparring, Flutter the butterfly flipped him right over.", "Flutter hadn't had many private lessons, but she rolled in group class every single day.", "A move becomes yours only when you use it again and again in sparring. That was the third step!"]),
  P(3, "cricket", ["Next came a new friend, Chirpy the cricket.", "Chirpy had only been going to group judo class for two months, and he had never had a private lesson.", "But he threw his friends one after another, even Mem-Mem, who had taken private lessons for more than half a year!"], ch="Chapter 3 · The Two-Month Mystery"),
  P(3, "cricket", ["His secret? For two months, he had sparred with kids his own age every single day.", "That was the fourth step."], q=0.97),
  P(3, "step3", ["\"I thought being good at sports was enough,\" said Mem-Mem, \"but there are still lots of stairs to climb!\"", "So he made a plan: spar a lot in group class, swing the Bulgarian bag at home, and learn from his friends.", "What step do you think Mem-Mem will climb next?"]),
  ], {"mood": "기분", "growth stairs": "성장 계단", "step": "계단 한 칸", "dung beetle": "쇠똥구리", "king of the ground": "바닥의 짱", "lying down": "누워서", "lately": "요즘", "Bulgarian bag": "불가리안 백", "swung": "휘둘렀다", "heavier": "더 무거운", "hard work": "노력", "flipped": "뒤집었다", "rolled": "굴렀다(스파링했다)", "cricket": "귀뚜라미", "mystery": "수수께끼", "half a year": "반년", "age": "나이", "climb": "오르다"},
  ["Why did Rolly keep falling when he was standing up?", "What was Rocky's secret?", "Why could Chirpy beat Mem-Mem after only two months?", "Which growth step is the most important for you?"],
  [{"t": "choice", "q": "What was Rolly the dung beetle good at?", "a": ["Fighting on the ground", "Kicking high", "Flying fast"], "e": ["🤼", "🦵", "🪽"]},
   {"t": "choice", "q": "What did Rocky do every night?", "a": ["Swung a Bulgarian bag 300 times", "Watched TV", "Played the guitar"], "e": ["💪", "📺", "🎸"]},
   {"t": "choice", "q": "Why was Chirpy so good after two months?", "a": ["He sparred with kids his age every day", "He had lots of private lessons", "He was the biggest"], "e": ["🥋", "💰", "🐘"]},
   {"t": "word", "q": "'노력'은 영어로?", "a": ["hard work", "homework", "hard rock"]},
   {"t": "say", "q": "Say it! Hard work that nobody sees turns into ...", "say": "It turns into strength one day.", "key": ["strength"]},
   {"t": "say", "q": "Tell me! What hard work do you do that nobody sees? Start with: At home, I ...", "say": "At home, I do push-ups every day.", "key": ["home"], "free": True}],
  "#E3D9A8"))
# ---------------------------------------------------------------- 4화
B.append(book("ep4", 4, "4화", "Bug Dojo 4: The Growth Stairs, Part Two",
  "4화 「성장 계단 ② 진짜 멋진 매미」를 영어로 — 침착한 꼬마뿔과 아빠 스파링, 공부하는 윙윙이, 바뀐 하루, 친절한 마음.",
  art(4, "t4"), [
  P(4, "kidrhino", ["Little Horn was Coach Flash's son.", "When a big kid tackled him, he calmly stopped it, and he even caught a kick and took the big kid down.", "The big kid tucked into a roll and got right back up.", "Mem-Mem wondered, \"How does Little Horn stay so calm?\""], ch="Chapter 1 · Calm Little Horn"),
  P(4, "dadspar", ["His secret was sparring with his dad every night.", "His dad let him try things for himself. \"Let's go slowly. I'll catch you.\"", "Because they practiced together every day, Little Horn stayed calm in matches, too. That was the fifth step."]),
  P(4, "mmdad", ["Mem-Mem went up to his own dad. \"Dad, let's spar tonight!\"", "He got low, grabbed both legs, and turned the corner.", "His dad fell slowly onto the mat, laughing."]),
  P(4, "beestudy", ["After training, Buzz the bee went home to read English books and solve math problems.", "She wanted to be good at sports AND at school, so she worked on them a little bit every day.", "Real honeybees dance to show their friends where the flowers are!", "The power to learn and think was the sixth step."], ch="Chapter 2 · Strong in Every Way", extra=[{"x": 640, "y": 190, "s": "📚", "emoji": True}]),
  P(4, "montage", ["Mem-Mem tried doing his jobs one at a time: wrestling in the morning, the Bulgarian bag at home, and group class in the evening.", "He sparred with his dad, read English books, and did his math homework.", "Every time he kept a small promise, he grew a little bit."]),
  P(4, "kind", ["Mem-Mem went up to his friends first.", "He taught Rolly how to grip standing up, helped Strum to his feet when he fell, and showed Dot how to break her fall.", "His heart for helping friends grew, too. That was the seventh step."], ch="Chapter 3 · A Kind Heart"),
  P(4, "shine", ["Step by step, Mem-Mem grew: in sports, in learning, and in caring for his friends.", "Everybody bowed together. \"Thank you!\""], q=0.85),
  P(4, "end4", ["Which step would you like to climb first?"]),
  ], {"son": "아들", "calmly": "침착하게", "tucked": "몸을 웅크렸다", "wondered": "궁금했다", "for himself": "스스로", "turned the corner": "옆으로 돌아 방향을 바꿨다", "solve": "풀다", "math problems": "수학 문제", "honeybees": "꿀벌들", "jobs": "할 일들", "homework": "숙제", "kept a promise": "약속을 지켰다", "break her fall": "낙법하다", "heart": "마음", "caring": "아끼는"},
  ["How did Little Horn stay so calm?", "What did Buzz do after training?", "What small promises did Mem-Mem keep every day?", "How do you help your friends at the dojo?"],
  [{"t": "choice", "q": "Who is Little Horn's dad?", "a": ["Coach Flash", "Coach Pop", "Strum"], "e": ["🪲", "🦗", "🎸"]},
   {"t": "choice", "q": "What did Buzz do after training?", "a": ["Read English books and did math", "Went to sleep", "Played games all night"], "e": ["📚", "😴", "🎮"]},
   {"t": "choice", "q": "How did Mem-Mem help Rolly?", "a": ["He taught him to grip standing up", "He gave him a cake", "He carried him home"], "e": ["🤝", "🍰", "🏠"]},
   {"t": "word", "q": "'침착하게'는 영어로?", "a": ["calmly", "quickly", "loudly"]},
   {"t": "say", "q": "Say it! Every time he kept a small promise, he ...", "say": "He grew a little bit.", "key": ["grew"]},
   {"t": "say", "q": "Tell me! What small promise can you keep every day? Start with: Every day, I will ...", "say": "Every day, I will read one English book.", "key": ["every", "day"], "free": True}],
  "#F6C9C3"))
# ---------------------------------------------------------------- 5화
B.append(book("ep5", 5, "5화", "Bug Dojo 5: Mem-Mem's First Tournament",
  "5화 「맴맴이의 첫 대회」를 영어로 — 네 번 숨쉬기, 한 체급 위 콩콩이 형에게 도전, 탭, 대회는 배우러 가는 곳.",
  art(5, "t5"), [
  P(5, "breathe5", ["On the morning of the tournament, Mem-Mem felt like butterflies were flying around in his tummy.", "Coach Pinch spoke slowly. \"Let's take four breaths through your nose.\"", "\"One... two... three... four.\""], ch="Chapter 1 · Butterflies in His Tummy"),
  P(5, "gold5", ["Nobody else in Mem-Mem's weight class showed up.", "So he got the gold medal all by himself."], extra=[{"x": 480, "y": 150, "s": "🥇", "emoji": True}]),
  P(5, "challenge5", ["One weight class up was big brother Bob, who was bigger and had a higher belt.", "Mem-Mem found his courage. \"I want to try, too!\"", "They faced each other and bowed."]),
  P(5, "standing5", ["The match began, and Bob grabbed Mem-Mem's arm and pulled hard.", "Mem-Mem got low and held his ground on both feet.", "The strength he had built in wrestling was helping him."], ch="Chapter 2 · The Big Match"),
  P(5, "guard5", ["Then Bob lay back and made a guard with his legs.", "Mem-Mem tried to slide his knee across and pass. That's called a knee cut.", "But it was still hard to get past Bob's legs."]),
  P(5, "focus5", ["Someone called from outside. \"Mem-Mem!\"", "He almost turned his head, but then he remembered what Flutter had taught him: \"Focus on your partner!\""]),
  P(5, "tap5", ["Bob grabbed his arm, swung his leg over, and set up an armbar.", "Before it could hurt, Mem-Mem tapped. Tap, tap!", "Bob let go right away, and even though Mem-Mem lost, they both finished safely and bowed."]),
  P(5, "upset5", ["Mem-Mem hung his head. \"I'm never doing a tournament again.\"", "Sparkle and Strum came and sat beside him, and they listened to how he felt."], ch="Chapter 3 · Learning From Losing"),
  P(5, "learn5", ["The coaches came over, too.", "\"You don't go to a tournament only to win. You go to learn,\" they said.", "\"Just stepping onto the mat took courage, and you held your ground against a much bigger kid!\"", "Little by little, Mem-Mem lifted his head."]),
  P(5, "plan5", ["There were two things to practice next: the knee cut to pass the guard, and keeping his arms close to stop the armbar.", "He would learn them in private lessons and try them with friends in group class.", "Practicing a lot with bugs your own size is how a move really becomes yours."]),
  P(5, "bow5", ["\"I'm going to the next tournament, too!\" said Mem-Mem.", "Everybody bowed together. \"Thank you!\""], q=0.85),
  ], {"tummy": "배", "breaths": "숨", "weight class": "체급", "showed up": "나타났다", "gold medal": "금메달", "belt": "띠", "courage": "용기", "faced": "마주 봤다", "held his ground": "버텼다", "guard": "가드", "knee cut": "니컷", "pass": "(가드를) 넘다", "armbar": "암바", "tapped": "탭했다(그만 신호)", "let go": "놓아주었다", "safely": "안전하게", "hung his head": "고개를 숙였다", "listened": "귀 기울여 들었다", "lifted": "들었다"},
  ["How did Mem-Mem calm down before the tournament?", "Why did Mem-Mem tap?", "What did the coaches say about tournaments?", "Have you ever felt butterflies in your tummy? What helped you?"],
  [{"t": "choice", "q": "How did Coach Pinch help Mem-Mem calm down?", "a": ["Four slow breaths", "A big snack", "A loud song"], "e": ["🌬️", "🍪", "🎵"]},
   {"t": "choice", "q": "Why did Mem-Mem get a gold medal first?", "a": ["Nobody else was in his weight class", "He beat ten bugs", "He found it"], "e": ["🥇", "🔟", "🔍"]},
   {"t": "choice", "q": "Why do we tap?", "a": ["To stop before it hurts", "To say hello", "To win"], "e": ["✋", "👋", "🏆"]},
   {"t": "word", "q": "'용기'는 영어로?", "a": ["courage", "cabbage", "cottage"]},
   {"t": "say", "q": "Say it! You don't go to a tournament only to win. You go to ...", "say": "You go to learn.", "key": ["learn"]},
   {"t": "say", "q": "Tell me about your tournament! Start with: At my tournament, I ...", "say": "At my tournament, I was nervous but I tried my best.", "key": ["tournament"], "free": True}],
  "#FFE08A"))
# ---------------------------------------------------------------- 6화
B.append(book("ep6", 6, "6화", "Bug Dojo 6: Same Attendance, Different Secret",
  "6화 「같은 출석, 다른 비밀」을 영어로 — 출석은 같은데 실력이 달라진 이유, 반짝이의 복습 작전(영상·더미·사범님께 확인).",
  art(6, "t6"), [
  P(6, "same6", ["Sparkle and Strum came to the dojo on the very same days.", "They got exactly the same attendance stamps.", "But before each class, Sparkle always tried to remember the steps from the last lesson."], ch="Chapter 1 · The Same Stamps"),
  P(6, "forgot6", ["When Strum went home, he thought, \"I went to class, so that's enough!\"", "By the next class, the steps he had learned were all fuzzy."]),
  P(6, "gap6", ["After a few weeks, the difference was easy to see.", "Sparkle flowed from one move to the next, but Strum kept stopping to ask what came next.", "Mem-Mem really wanted to know Sparkle's secret."]),
  P(6, "secret6", ["Sparkle smiled. \"Want to see my secret mission?\"", "Our story goes back to the night before, in Sparkle's room."], ch="Chapter 2 · Sparkle's Secret Mission"),
  P(6, "review6", ["Sparkle watched a video of her private lesson again with her dad.", "\"Oh, this is where I got stuck,\" she said.", "She paused the video and remembered one step her coach had taught her."], extra=[{"x": 560, "y": 200, "s": "📱", "emoji": True}]),
  P(6, "member6", ["Her dad had also signed up for a YouTube membership with the same drills.", "Together, they picked the part she had learned that day.", "Instead of watching a lot, she decided to remember just one thing."]),
  P(6, "dummy6", ["The jiu-jitsu dummy in her room was her practice partner.", "She slowly tried only the moves her coach said were okay to do at home.", "When she got mixed up, she watched the video again, and she never cranked hard on the dummy."]),
  P(6, "check6", ["At the next group class, Sparkle asked, \"Coach, is this the right order?\"", "She fixed the parts she had remembered wrong and practiced them again with a friend."], ch="Chapter 3 · Everyone Has a Secret"),
  P(6, "different6", ["Little Horn practiced with his dad, and Rocky kept doing his exercises.", "Sparkle went over what she had learned with videos and the dummy.", "Behind every friend who was good at something, there was time they had built up, little by little."]),
  P(6, "start6", ["Strum said, \"I'm going to start again, with just one thing I learned today!\"", "The friends practiced together and bowed. \"Thank you!\""]),
  ], {"attendance": "출석", "stamps": "도장", "exactly": "정확히", "steps": "순서", "fuzzy": "가물가물한", "difference": "차이", "flowed": "물 흐르듯 이어 갔다", "mission": "작전", "paused": "멈췄다", "membership": "멤버십", "drills": "연습 동작", "dummy": "더미(연습 인형)", "mixed up": "헷갈린", "cranked": "세게 꺾었다", "order": "순서", "fixed": "고쳤다", "exercises": "운동", "built up": "쌓아 왔다"},
  ["Why did Strum forget the steps?", "What was Sparkle's secret mission?", "Why did Sparkle ask the coach at the next class?", "What is one thing you learned this week that you want to review?"],
  [{"t": "choice", "q": "What was the same for Sparkle and Strum?", "a": ["Their attendance stamps", "Their color", "Their favorite song"], "e": ["📅", "🎨", "🎵"]},
   {"t": "choice", "q": "What did Sparkle watch with her dad?", "a": ["A video of her private lesson", "A scary movie", "A cooking show"], "e": ["📱", "👻", "🍳"]},
   {"t": "choice", "q": "What did Sparkle do when she got mixed up?", "a": ["Watched the video again", "Gave up", "Cranked hard on the dummy"], "e": ["🔁", "🏳️", "💥"]},
   {"t": "word", "q": "'출석'은 영어로?", "a": ["attendance", "attention", "adventure"]},
   {"t": "say", "q": "Say it! Instead of watching a lot, she decided to remember just ...", "say": "She decided to remember just one thing.", "key": ["one", "thing"]},
   {"t": "say", "q": "Tell me! What did you learn in your last lesson? Start with: In my last lesson, I learned ...", "say": "In my last lesson, I learned a new sweep.", "key": ["learned"], "free": True}],
  "#C9B8E0"))
# ---------------------------------------------------------------- 7화
B.append(book("ep7", 7, "7화", "Bug Dojo 7: Hajun's Champion Table",
  "7화 「하준이의 챔피언 식당」을 영어로 — 늦게 시작한 뚜리에게 밀린 이유, 뚜리의 식탁, 스스로 챙기는 식사·물·잠, 다시 대회 우승.",
  art(7, "t7"), [
  P(7, "dismiss7", ["Mem-Mem didn't pay much attention when grown-ups told him to eat well.", "\"I'm just small,\" he said. \"I'll eat a little and practice more instead.\"", "His training got better, but he kept putting off eating."], ch="Chapter 1 · Who Needs Lunch?"),
  P(7, "loss7", ["A few months later, he lost to Chirpy again in a practice match.", "Chirpy had started training after Mem-Mem, but now he looked sturdy, and his grip was stronger than ever.", "\"I started first,\" thought Mem-Mem. \"So why are we so different now?\""]),
  P(7, "mystery7", ["Chirpy said, \"I practice too. But I also take care of eating and resting.\"", "So Mem-Mem followed Chirpy to his secret dinner table."]),
  P(7, "meal7", ["On the table were tomatoes, avocado, and boiled eggs, with rice, tofu, and lots of vegetables.", "Even on busy days when he moved a lot, Chirpy never skipped his meals."], ch="Chapter 2 · The Champion's Table", extra=[{"x": 430, "y": 300, "s": "🍅", "emoji": True}, {"x": 490, "y": 300, "s": "🥑", "emoji": True}, {"x": 550, "y": 300, "s": "🥚", "emoji": True}, {"x": 610, "y": 300, "s": "🍚", "emoji": True}]),
  P(7, "learn7", ["The coach said, \"On days when you move a lot, your body may need more food.\"", "\"You need energy to practice, and building blocks to grow and recover.\"", "At last, Mem-Mem understood what he had been missing."]),
  P(7, "choose7", ["Now Mem-Mem sat down at the table without anyone making him.", "\"Mom, Dad, I moved a lot today, so I'm hungry. Can I have a little more?\"", "When he felt full, he stopped, and he took care of his meals together with the grown-ups."]),
  P(7, "months7", ["Mem-Mem ate well and practiced the moves he had learned.", "He drank water and got a good night's sleep.", "After a few months, he felt strong all the way to the end of practice."], ch="Chapter 3 · Champion!"),
  P(7, "match7", ["Tournament day came again.", "This time, Mem-Mem didn't just push with his strength; he calmly used the moves he had learned.", "He made it through the very last match, and he won!"]),
  P(7, "champion7", ["With the gold medal around his neck, Mem-Mem smiled.", "\"Taking care of my body was part of my training, too!\"", "Eating, resting, reviewing, and steady training had all added up."], extra=[{"x": 480, "y": 120, "s": "🥇", "emoji": True}]),
  P(7, "bow7", ["Chirpy congratulated Mem-Mem on his win.", "Mem-Mem bowed to his friend and the coach who had shared the secret.", "\"Thank you! Let's keep practicing together!\""]),
  ], {"pay attention": "귀 기울이다", "grown-ups": "어른들", "putting off": "미루기", "sturdy": "튼튼한·든든한", "grip": "잡는 힘", "resting": "쉬기", "followed": "따라갔다", "avocado": "아보카도", "boiled eggs": "삶은 달걀", "tofu": "두부", "vegetables": "채소", "skipped": "걸렀다", "meals": "끼니", "energy": "힘·에너지", "building blocks": "재료", "recover": "회복하다", "full": "배부른", "a good night's sleep": "푹 자기", "calmly": "침착하게", "congratulated": "축하했다", "steady": "꾸준한", "added up": "쌓였다"},
  ["Why was Mem-Mem losing to Chirpy?", "What was on Chirpy's table?", "Why does your body need more food on busy days?", "What will you take care of by yourself today?"],
  [{"t": "choice", "q": "What did Mem-Mem keep putting off?", "a": ["Eating", "Practicing", "Bowing"], "e": ["🍽️", "🥋", "🙇"]},
   {"t": "choice", "q": "What was NOT on Chirpy's table?", "a": ["Candy", "Boiled eggs", "Tofu"], "e": ["🍬", "🥚", "🧈"]},
   {"t": "choice", "q": "What helped Mem-Mem win in the end?", "a": ["Eating, resting, reviewing, and training", "A lucky hat", "Pushing really hard"], "e": ["🏆", "🧢", "💥"]},
   {"t": "word", "q": "'회복하다'는 영어로?", "a": ["recover", "remember", "repeat"]},
   {"t": "say", "q": "Say it! Taking care of my body was part of my ...", "say": "Taking care of my body was part of my training.", "key": ["training"]},
   {"t": "say", "q": "Tell me! What did you eat today? Start with: Today, I ate ...", "say": "Today, I ate rice, tofu, and eggs.", "key": ["ate"], "free": True}],
  "#B8D08D"))

# ---------------------------------------------------------------- 8화
B.append(book("ep8", 8, "8화", "Bug Dojo 8: A Chance to Start Again",
  "8화 「다시 시작할 수 있어」를 영어로 — 띵가의 긴 꿈, 피하는 마음과 다시 배우는 마음, 오늘의 작은 선택.",
  art(8, "t8"), [
  P(8, "week8", ["One night, Strum dreamed about going back to the dojo.", "After a week away, he felt clumsy and forgot some steps."], ch="Chapter 1 · The Door to the Dojo"),
  P(8, "loss8", ["He lost several practice matches to Chirpy, who had started later.", "Strum felt upset and embarrassed, but Chirpy never laughed at him.", "They finished safely and bowed to each other on the mat."]),
  P(8, "hide8", ["The next day, Strum stopped outside the dojo door.", "His dad offered to help him try other sports, too.", "But Strum shook his head because he feared losing again."]),
  P(8, "drift8", ["Months passed in the dream, and Strum kept avoiding practice.", "His friends improved while the steps grew harder to remember.", "He said he disliked sports, but really he feared losing."]),
  P(8, "choice8", ["Mem-Mem had upsetting days when he lost practice matches, too.", "Instead of hiding, he asked his coach to explain one thing again.", "The coach saw that he wanted to learn and helped him."], ch="Chapter 2 · A Different Choice"),
  P(8, "dad8", ["He did not need new equipment to practice something he already knew.", "At home, his dad helped him practice one move slowly.", "His dad matched his pace instead of trying to overpower him."]),
  P(8, "gap8", ["Years passed in the dream, and their small choices added up.", "Mem-Mem kept asking questions, while Strum watched from far away.", "Strum felt upset when the difference between them grew larger."]),
  P(8, "grown8", ["As grown-ups in the dream, they tried working in a toy repair shop.", "Mem-Mem asked questions, practiced, and learned to fix a broken toy.", "Strum hid because he feared mistakes and missed a chance to learn.", "He wished he had tried the work he wanted to do."]),
  P(8, "wake8", ["Strum opened his eyes and realized it had been a dream.", "His future was not decided, and he could choose again today."], ch="Chapter 3 · Today Is Another Chance"),
  P(8, "return8", ["Back at the dojo, Strum told his coach how he felt.", "The coach listened and said it was okay to rest.", "When he returned, they could start with something easy together."]),
  P(8, "bow8", ["Strum tried one simple stance again with his friends nearby.", "He did not win right away, but he stayed and asked questions.", "Then everyone smiled and bowed to say thank you together."]),
  ], {"dreamed": "꿈꾸었다", "clumsy": "어색한", "embarrassed": "부끄러운", "avoiding": "피하는", "equipment": "장비", "pace": "속도", "overpower": "힘으로 압도하다", "repair": "수리", "mistakes": "실수", "future": "미래", "decided": "정해진", "stance": "자세"},
  ["Why did Strum stop outside the dojo?", "What did Mem-Mem do when he got stuck?", "Was Strum's future already decided?", "What small thing would you like to try again?"],
  [{"t":"choice", "q":"Why did Strum avoid the dojo?", "a":["He feared losing again", "The door was locked", "His friends laughed at him"], "e":["🚪", "🔒", "🙅"]},
   {"t":"choice", "q":"How did Mem-Mem's dad help?", "a":["He practiced slowly with him", "He always won quickly", "He hid the equipment"], "e":["🤝", "💨", "📦"]},
   {"t":"choice", "q":"What did Strum learn after waking up?", "a":["He could choose again today", "His future was fixed", "Resting was forbidden"], "e":["🌅", "🔒", "🚫"]},
   {"t":"word", "q":"'미래'는 영어로?", "a":["future", "furniture", "feather"]},
   {"t":"say", "q":"Say it! I can start ...", "say":"I can start again today.", "key":["again", "today"]},
   {"t":"say", "q":"What would you like to try again? Start with: I want to try ...", "say":"I want to try my stance again.", "key":["try"], "free":True}],
  "#B8DDEB"))

# ---------------------------------------------------------------- 10화
B.append(book("ep10", 10, "10화", "Bug Dojo 10: Zippy, the Number Two Dragonfly",
  "10화 「2등 잠자리 씽씽이」를 영어로 — 빠른 깃 잡기, 안전한 탭, 서로 배우는 라이벌과 아침 연습.",
  art(10, "arrival10"), [
  P(10, "arrival10", ["A dragonfly hovered above the mat with four clear wings.", "Then he landed softly and introduced himself to his new friends.", "His name was Zippy, and he practiced judo and jiu-jitsu."], ch="Chapter 1 · Four Clear Wings"),
  P(10, "eyes10", ["Two enormous eyes covered almost all of Zippy's small head.", "Real dragonflies can see almost all around them while they fly.", "Zippy quickly noticed which way his training partner was moving."]),
  P(10, "grip10", ["Dot stepped onto the mat for their first practice match.", "Zippy caught her collar and sleeve before she could grab his.", "Getting a grip first helped him start his next move."]),
  P(10, "harai10", ["Zippy turned and moved his hip in front of Dot.", "His sweeping leg helped her turn over in a hip throw.", "Dot landed with a breakfall and smiled at her new friend."], q=0.85),
  P(10, "guard10", ["Next, Chirpy held the top position while Zippy lay underneath.", "Zippy lifted his long legs to make a guard.", "He still had something to try from the bottom position."], ch="Chapter 2 · A Tap Means Let Go"),
  P(10, "triangle10", ["Zippy slowly made a triangle around Chirpy's neck and one arm.", "Chirpy kept his other arm outside and tapped before any squeezing.", "Zippy let go immediately, and both friends smiled with relief."], q=0.7),
  P(10, "friends10", ["Everyone cheered because Zippy had shown them some skillful moves.", "He thanked Dot and Chirpy for practicing with him safely.", "Winning felt good, but learning together made the practice special."]),
  P(10, "rank10", ["A wooden board showed Mem-Mem first and Zippy in second place.", "Their places did not decide how much each friend mattered.", "They wanted to discover what they could learn from each other."], ch="Chapter 3 · A New Thing to Learn", extra=[{"x":480,"y":160,"s":"1. Mem-Mem   2. Zippy"}]),
  P(10, "rivals10", ["Zippy hoped they could have a friendly match one day.", "Mem-Mem smiled because he wanted to try that match, too.", "They respected each other and felt excited about learning together."]),
  P(10, "learn10", ["The coaches said Mem-Mem also used wrestling and taekwondo together.", "He could tackle, press from above, and judge the distance.", "Zippy went to Coach Flash because he wanted to learn wrestling."]),
  P(10, "morning10", ["The next morning, both friends practiced with their Bulgarian bags.", "They practiced breakfalls together and helped each other start again.", "Everyone bowed together, thankful for another chance to learn."], q=0.85),
  ], {"zippy":"씽씽이 (잠자리)","dragonfly":"잠자리","hovered":"공중에 멈춰 있었다","collar":"깃","sleeve":"소매","hip throw":"허리로 넘기는 기술","breakfall":"낙법","triangle":"삼각형","immediately":"즉시","respected":"존중했다","judge the distance":"거리를 가늠하다"},
  ["What helped Zippy notice his partner's movements?", "What must you do when a friend taps?", "Why did Zippy want to learn wrestling?", "Who might win their friendly match, and why?"],
  [{"t":"choice","q":"Which arts did Zippy already practice?","a":["Judo and jiu-jitsu","Swimming and running","Only wrestling"],"e":["🥋","🏊","🤼"]},
   {"t":"choice","q":"What did Zippy do when Chirpy tapped?","a":["He let go immediately","He squeezed harder","He ignored the tap"],"e":["🤝","🙅","🚫"]},
   {"t":"choice","q":"Why did Zippy visit Coach Flash?","a":["He wanted to learn wrestling","He wanted to tease Mem-Mem","He wanted to hide"],"e":["🤼","🙅","🚪"]},
   {"t":"word","q":"'잠자리'는 영어로?","a":["dragonfly","butterfly","firefly"]},
   {"t":"say","q":"Say it! When my friend taps, I ...","say":"When my friend taps, I let go immediately.","key":["let","go"]},
   {"t":"say","q":"What would you like to learn from a friend?","say":"I want to learn a new move from my friend.","key":["learn"],"free":True}],
  "#A8DFE8"))

IDX = {"ep1": 0, "ep2": 1, "epsp": 2, "ep3": 3, "ep4": 4, "ep5": 5, "ep6": 6, "ep7": 7, "ep8": 8, "ep10": 10}   # position in dojo/index.html EPS
for b in B: b["dojoIdx"] = IDX[b["id"]]
js = "// 곤충 무술 도장 영어책 — 애니메이션(dojo/) 각 화의 이야기를 영어 챕터북으로 옮긴 것. 그림은 애니메이션 장면의 자세를 그대로 가져왔어요.\n"
js += "// 새 화가 생기면 scratchpad의 gen_books.py 방식대로 같은 형식으로 추가하면 돼요.\n"
js += "(() => {\nconst BUGDOJO = " + json.dumps(B, ensure_ascii=False, indent=1) + ";\n"
js += "window.LILY_BOOKS = BUGDOJO.concat(window.LILY_BOOKS || []);\n})();\n"
open(OUT, "w", encoding="utf-8").write(js)
n = sum(len(p["s"]) for b in B for p in b["pages"])
print(len(B), "books,", sum(len(b["pages"]) for b in B), "pages,", n, "sentences")
