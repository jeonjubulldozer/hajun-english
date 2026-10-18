// 하준이 서재 — Claude가 하준이 수준(듣기는 잘하고 말하기·읽기는 이제 시작)에 맞춰 직접 쓴 이야기들.
// 문장은 짧게, 소리 흉내·반복·웃긴 장면을 넣었어요. 어떤 책의 문장도 옮겨 오지 않은 새 이야기예요.
// 형식: pages[].e = 그림 대신 이모지, pages[].s = 문장 배열, words = 눌렀을 때 보여 줄 뜻, talk = 다 읽고 Lily가 물어볼 거리
window.LILY_BOOKS = [
  {
    id: "pancake", level: 1, style: "웃긴 이야기", title: "Dad's Big Pancake", cover: { e: "🥞", bg: "#F2C66D" },
    blurb: "아빠가 세상에서 제일 큰 팬케이크를 만들겠대요.",
    pages: [
      { e: "🥞👨", s: ["On Sunday, Dad makes pancakes.", "\"Today,\" says Dad, \"I will make the biggest pancake in the world!\""] },
      { e: "🥚🥛", s: ["He puts in two eggs.", "He puts in three cups of flour.", "He puts in milk, and more milk, and more milk.", "The bowl is very, very full."] },
      { e: "🍳😮", s: ["The pancake is as big as the table.", "\"Now I will flip it,\" says Dad.", "\"One, two, THREE!\""] },
      { e: "⬆️🥞", s: ["The pancake goes up, up, up.", "It does not come down.", "It is stuck on the ceiling!"] },
      { e: "👀💥", s: ["We look up.", "The pancake looks down.", "Plop!", "It falls on Dad's head."] },
      { e: "😂🐶", s: ["Dad laughs. We laugh.", "The dog laughs too, I think.", "We eat the biggest pancake in the world, and it is delicious.", "Next Sunday, Dad says, he will make a small one."] }
    ],
    words: { pancake: "팬케이크", biggest: "가장 큰", flour: "밀가루", bowl: "그릇", full: "가득 찬", flip: "뒤집다", stuck: "붙어서 안 떨어지는", ceiling: "천장", delicious: "맛있는" },
    talk: ["What did Dad put in the bowl?", "Where did the pancake get stuck?", "What would you put in a giant pancake?"],
    quiz: [
      { t: "choice", q: "What does Dad make on Sunday?", a: ["Pancakes", "Pizza", "Ice cream"], e: ["🥞", "🍕", "🍦"] },
      { t: "choice", q: "Where does the pancake get stuck?", a: ["On the ceiling", "On the dog", "In the car"], e: ["⬆️", "🐶", "🚗"] },
      { t: "word", q: "'밀가루'는 영어로?", a: ["flour", "flower", "floor"] },
      { t: "say", q: "Say it! The pancake falls on Dad's ...", say: "The pancake falls on Dad's head.", key: ["head"] },
      { t: "say", q: "Tell me! What do you like to eat on Sunday? Start with: I like ...", say: "I like pancakes on Sunday.", key: ["like"], free: true }
    ]
  },
  {
    id: "mantis", level: 1, style: "운동·용기", title: "Tiny Mantis Learns to Fall", cover: { e: "🌿", bg: "#9BC59D" },
    blurb: "제일 힘센 벌레가 되고 싶은 꼬마 사마귀가 '잘 넘어지는 법'을 배워요.",
    pages: [
      { e: "🌿💪", s: ["Tiny Mantis wanted to be strong.", "He did push-ups on a leaf.", "He did sit-ups on a stick.", "\"I am the strongest bug!\" he said."] },
      { e: "🌬️😣", s: ["Then the wind came. Whoosh!", "Tiny Mantis fell down. Bump!", "\"Ouch,\" he said.", "\"I don't like falling.\""] },
      { e: "🐢🍃", s: ["Old Turtle walked by. Slowly. Very slowly.", "\"Strong bugs fall too,\" said Old Turtle.", "\"The trick is to fall well and get up fast.\""] },
      { e: "🔁🤸", s: ["So Tiny Mantis practiced.", "Fall and roll. Fall and roll.", "Tuck your chin. Slap the ground.", "Get up!"] },
      { e: "🌬️🙌", s: ["The wind came again. Whoosh!", "Tiny Mantis fell. Roll! Slap!", "He jumped right back up.", "\"I fell!\" he shouted. \"And I'm okay!\""] },
      { e: "🐛🐞🙏", s: ["Now Tiny Mantis teaches the little bugs.", "\"Everybody falls,\" he says. \"Warriors get up.\"", "And every night, he says thank you for his strong legs, his good friends, and the wind."] }
    ],
    words: { mantis: "사마귀", strong: "힘센", strongest: "가장 힘센", leaf: "나뭇잎", wind: "바람", trick: "비결", practiced: "연습했다", tuck: "집어넣다", chin: "턱", slap: "탁 치다", warriors: "전사들" },
    talk: ["Why did Tiny Mantis fall?", "What did Old Turtle teach him?", "In judo, how do you fall the right way? Can you show me?"],
    quiz: [
      { t: "choice", q: "What made Tiny Mantis fall?", a: ["The wind", "A dog", "A ball"], e: ["🌬️", "🐶", "⚽"] },
      { t: "choice", q: "Who taught Tiny Mantis?", a: ["Old Turtle", "Big Bird", "A frog"], e: ["🐢", "🐦", "🐸"] },
      { t: "word", q: "'턱'은 영어로?", a: ["chin", "chair", "cheese"] },
      { t: "say", q: "Say it! Everybody falls. Warriors ...", say: "Everybody falls. Warriors get up.", key: ["get", "up"] },
      { t: "say", q: "Tell me! What are you thankful for today? Start with: I'm thankful for ...", say: "I'm thankful for my family.", key: ["thankful"], free: true }
    ]
  },
  {
    id: "beetle", level: 1, style: "곤충 탐정", title: "Captain Beetle and the Very Bad Breakfast", cover: { e: "🪲", bg: "#7FB8A4" },
    blurb: "개미들의 딸기를 누가 먹었을까? 정원 최고의 용감한 딱정벌레가 범인을 찾아요.",
    pages: [
      { e: "🪲✨", s: ["This is Captain Beetle.", "He has six strong legs.", "He has a shiny green shell.", "He is the bravest bug in the garden."] },
      { e: "🐜😢", s: ["One morning, the ants were crying.", "\"Captain Beetle! Somebody took our breakfast!\"", "\"What was it?\" asked Captain Beetle.", "\"One big, sweet strawberry!\""] },
      { e: "🔍🍓", s: ["Captain Beetle looked for clues.", "He found a red drop on a leaf.", "He found a red drop on a rock.", "He found a red drop on... a very fat caterpillar."] },
      { e: "🐛😳", s: ["The caterpillar had red juice all over his face.", "\"Did you take the strawberry?\" asked Captain Beetle.", "\"No,\" said the caterpillar.", "Then he burped. BURRRP!", "It smelled like strawberry."] },
      { e: "🐛🙏", s: ["The caterpillar looked down at his feet.", "He had a lot of feet.", "\"I'm sorry,\" he said. \"I was so hungry.\"", "\"It's okay to be hungry,\" said Captain Beetle. \"It's not okay to take.\""] },
      { e: "🍓🤝", s: ["\"Will you help the ants find a new strawberry?\"", "The caterpillar said yes.", "That afternoon, they all shared a giant strawberry.", "Nobody burped. Well, almost nobody."] }
    ],
    words: { beetle: "딱정벌레", shiny: "반짝이는", shell: "껍데기", bravest: "가장 용감한", ants: "개미들", clues: "단서", drop: "방울", caterpillar: "애벌레", juice: "즙", burped: "트림했다", shared: "나눠 먹었다" },
    talk: ["Who took the strawberry?", "How did Captain Beetle find out?", "Was the caterpillar a bad bug? Why?"],
    quiz: [
      { t: "choice", q: "What did the ants lose?", a: ["A strawberry", "A banana", "A cookie"], e: ["🍓", "🍌", "🍪"] },
      { t: "choice", q: "Who ate it?", a: ["The caterpillar", "The ants", "Captain Beetle"], e: ["🐛", "🐜", "🪲"] },
      { t: "word", q: "'단서'는 영어로?", a: ["clues", "clouds", "clocks"] },
      { t: "say", q: "Say it! The caterpillar said, I'm ...", say: "I'm sorry.", key: ["sorry"] },
      { t: "say", q: "Tell me! What is your favorite bug? Start with: My favorite bug is ...", say: "My favorite bug is a beetle.", key: ["favorite"], free: true }
    ]
  },
  {
    id: "cicada", level: 2, style: "일기 코미디 (윔피키드 느낌)", title: "Leo's Secret Notebook: Operation Cicada", cover: { e: "📓", bg: "#E8D9B5" },
    blurb: "벌레 박사(라고 스스로 말하는) 여덟 살 레오의 비밀 공책. 매미를 잡아서 유명해지겠다는 작전!",
    pages: [
      { e: "📓✏️", s: ["Monday.", "This is my secret notebook.", "If you are not me, stop reading right now.", "Okay, fine. You can read one page.", "My name is Leo. I am eight, and I am a bug expert."] },
      { e: "🦗🌳", s: ["Tuesday.", "There is a cicada in the tree outside my window.", "It sings all day. Zzzzzz! Zzzzzz!", "Mom says it sounds like a broken fan.", "I say it sounds like a rock star."] },
      { e: "🧠📝", s: ["Wednesday.", "I made a plan. It is called Operation Cicada.", "Step one: catch the cicada.", "Step two: teach it to sing my favorite song.", "Step three: become famous."] },
      { e: "🌳😬", s: ["Thursday.", "Step one did not go well.", "I climbed the tree, and my pants got stuck on a branch.", "The cicada flew away. My pants did not.", "Dad had to come and get me down. He laughed for ten minutes."] },
      { e: "👧🦗", s: ["Friday.", "My little sister found the cicada on the porch.", "She just picked it up. No tree. No plan.", "Then she gave it to me and said, \"Here, bug expert.\"", "I said thank you. It was very hard to say."] },
      { e: "🌅🎵", s: ["Saturday.", "We let the cicada go, because bugs like to be free.", "It sat in the tree and sang. Zzzzzz!", "It did not sing my favorite song.", "But it was the best song I ever heard.", "Operation Cicada: complete. Kind of."] }
    ],
    words: { secret: "비밀의", notebook: "공책", expert: "전문가", cicada: "매미", broken: "고장 난", plan: "계획", operation: "작전", famous: "유명한", climbed: "올라갔다", branch: "나뭇가지", porch: "현관", free: "자유로운", complete: "완료" },
    talk: ["What was Leo's plan?", "What happened when Leo climbed the tree?", "Who caught the cicada in the end? How did Leo feel?", "Do you have a secret plan? Tell me!"],
    quiz: [
      { t: "choice", q: "What bug is in the tree?", a: ["A cicada", "A spider", "A bee"], e: ["🦗", "🕷️", "🐝"] },
      { t: "choice", q: "What got stuck on the branch?", a: ["Leo's pants", "Leo's hat", "Leo's shoe"], e: ["👖", "🧢", "👟"] },
      { t: "choice", q: "Who caught the cicada?", a: ["Leo's sister", "Leo's dad", "Leo"], e: ["👧", "👨", "🧒"] },
      { t: "word", q: "'유명한'은 영어로?", a: ["famous", "funny", "free"] },
      { t: "say", q: "Say it! We let the cicada go, because bugs like to be ...", say: "Bugs like to be free.", key: ["free"] }
    ]
  },
  {
    id: "yellowbelt", level: 2, style: "일기 코미디 (윔피키드 느낌)", title: "Leo's Secret Notebook: The Yellow Belt Problem", cover: { e: "🥋", bg: "#F5D76E" },
    blurb: "레오의 유도 승급 심사 날. 상대는 샌드위치가 레오 머리보다 큰 '빅 샘'!",
    pages: [
      { e: "🥋📓", s: ["Sunday.", "Big news, notebook.", "Tomorrow is my judo belt test.", "If I pass, I get a yellow belt.", "If I fail, I will move to the moon."] },
      { e: "🤸💥", s: ["Monday morning.", "Coach Kim says the most important thing in judo is falling.", "I said, \"Falling? I'm already great at falling.\"", "Then I fell off the bench.", "Coach Kim did not laugh. Okay, he laughed a little."] },
      { e: "😰🥪", s: ["Monday afternoon.", "My partner for the test is Big Sam.", "Big Sam is not big. He is HUGE.", "His sandwich is bigger than my head."] },
      { e: "🙇💫", s: ["The test.", "First we bowed. I bowed so fast I almost hit Sam's nose.", "Then Sam threw me. BOOM!", "But I fell the right way, and I got up fast."] },
      { e: "🔁💪", s: ["Then it was my turn to throw.", "One, two, three... Sam did not move.", "I tried again. And again.", "On the fourth try, Sam went down. WHUMP!"] },
      { e: "🟡🎉", s: ["Coach Kim gave me a yellow belt.", "He said, \"You fell well, and you never gave up.\"", "Big Sam gave me half of his sandwich.", "I am not moving to the moon. Not this week."] }
    ],
    words: { belt: "띠", test: "시험·심사", pass: "통과하다", fail: "떨어지다", coach: "코치·관장님", bench: "긴 의자", partner: "짝·상대", huge: "엄청 큰", bowed: "인사했다(절)", threw: "던졌다", fourth: "네 번째", "gave up": "포기했다" },
    talk: ["Why was Leo worried?", "What did Coach Kim say is the most important thing?", "How many tries did Leo need?", "What is your favorite judo throw?"],
    quiz: [
      { t: "choice", q: "What belt does Leo want?", a: ["A yellow belt", "A black belt", "A red belt"], e: ["🟡", "⚫", "🔴"] },
      { t: "choice", q: "What is bigger than Leo's head?", a: ["Sam's sandwich", "Sam's shoe", "Coach Kim's cup"], e: ["🥪", "👟", "☕"] },
      { t: "choice", q: "How many tries did Leo need?", a: ["Four", "One", "Ten"], e: ["4️⃣", "1️⃣", "🔟"] },
      { t: "word", q: "'포기하다'는 영어로?", a: ["give up", "get up", "pick up"] },
      { t: "say", q: "Say it! Coach Kim said: You fell well, and you never ...", say: "You never gave up.", key: ["gave", "up"] }
    ]
  },
  {
    id: "sneeze", level: 2, style: "엉뚱한 상상 (로알드 달 느낌)", title: "The Boy Who Sneezed to the Moon", cover: { e: "🌕", bg: "#B9C4E8" },
    blurb: "재채기가 세상에서 제일 큰 아이 맥스. 꽃 냄새 한 번에 달까지 날아가 버렸어요.",
    pages: [
      { e: "🤧🪟", s: ["Max had the biggest sneeze in the world.", "When he sneezed, windows shook.", "Dogs ran away.", "Grandma's hat flew off her head."] },
      { e: "🌼👃", s: ["One spring day, Max smelled a flower.", "His nose started to tickle.", "\"Ah... ah... AH...\"", "Everybody hid under the table."] },
      { e: "🚀💨", s: ["\"AAA-CHOOO!\"", "Max shot up into the sky like a rocket.", "He flew past the birds.", "He flew past the clouds.", "He flew all the way to the moon."] },
      { e: "🌕🐇", s: ["The moon was quiet and gray.", "A little moon rabbit hopped up to him.", "\"Hello,\" said the rabbit. \"Nobody ever visits us.\"", "\"Would you like some moon cake?\""] },
      { e: "🍰🥲", s: ["Max ate moon cake and played moon tag.", "It was fun, but soon he missed his mom.", "\"How do I get home?\" he asked.", "The rabbit thought hard. \"Do you have a big sneeze?\""] },
      { e: "🌸🏡", s: ["The rabbit picked a tiny moon flower. Max smelled it.", "\"Ah... ah... AAA-CHOOO!\"", "Max flew all the way home and landed in his own bed.", "\"Bless you,\" said Mom. \"Where have you been?\"", "Max smiled. \"Nowhere,\" he said. \"Just the moon.\""] }
    ],
    words: { sneeze: "재채기", sneezed: "재채기했다", shook: "흔들렸다", tickle: "간질간질하다", hid: "숨었다", rocket: "로켓", clouds: "구름", quiet: "조용한", rabbit: "토끼", hopped: "깡충 뛰었다", missed: "그리웠다", landed: "내려앉았다", "bless you": "(재채기했을 때) 몸조심해" },
    talk: ["How did Max get to the moon?", "Who did he meet there?", "How did he get home?", "If you could fly to the moon, what would you do there?"],
    quiz: [
      { t: "choice", q: "What made Max sneeze?", a: ["A flower", "Pepper", "A cat"], e: ["🌼", "🌶️", "🐈"] },
      { t: "choice", q: "Where did Max fly?", a: ["To the moon", "To the sea", "To school"], e: ["🌕", "🌊", "🏫"] },
      { t: "choice", q: "Who did he meet?", a: ["A moon rabbit", "An alien", "A robot"], e: ["🐇", "👽", "🤖"] },
      { t: "word", q: "'구름'은 영어로?", a: ["clouds", "clues", "clowns"] },
      { t: "say", q: "Say it! When someone sneezes, we say ...", say: "Bless you!", key: ["bless"] }
    ]
  },
  {
    id: "upside", level: 3, style: "엉뚱한 상상 (로알드 달 느낌)", title: "The Upside-Down House of Mrs. Twizzleton", cover: { e: "🏠", bg: "#E7A98C" },
    blurb: "지붕으로 서 있는 집과 모자를 발에 쓰는 할머니. 만들기를 좋아하는 준이가 집을 바로 세워 줄 수 있을까?",
    pages: [
      { e: "🏠🙃", s: ["At the end of Pickle Lane, there was a house that stood on its roof.", "The chimney was in the ground.", "The front door was high up in the air.", "Nobody knew how Mrs. Twizzleton got in.", "Nobody dared to ask."] },
      { e: "👵☕", s: ["Mrs. Twizzleton was very old and very tall.", "She drank her tea from the bottom of the cup.", "She wore her hat on her feet.", "\"Everything is better upside down,\" she said."] },
      { e: "🧒❓", s: ["One day, a boy named Jun knocked on the door.", "Well, he tried. The door was too high.", "So he shouted, \"Hello! How do you get inside?\""] },
      { e: "🪜🐈", s: ["A rope ladder came tumbling down.", "Jun climbed up and up.", "Inside, the sofa was stuck to the ceiling.", "The lamps grew up from the floor like tall flowers.", "A cat walked across the ceiling and said, \"Woem.\" That is \"meow\" upside down."] },
      { e: "🤧🏚️", s: ["\"Why is your house upside down?\" asked Jun.", "Mrs. Twizzleton sighed.", "\"A giant sneezed on it fifty years ago.\"", "\"I could not turn the house around, so I turned myself around instead.\""] },
      { e: "📐✏️", s: ["Jun loved building things.", "He took out a pencil and drew a plan.", "\"We need ten strong ropes, two big wheels, and one very helpful giant.\"", "Mrs. Twizzleton smiled. \"I know a giant,\" she said. \"He owes me a big sorry.\""] },
      { e: "🌈🏠", s: ["The next morning, the giant pulled the ropes.", "Creeeeak! The house rolled over and landed with a BUMP, the right way up.", "Mrs. Twizzleton looked out of her window.", "\"Hmm,\" she said. \"It looks a bit upside down to me.\"", "And she stood on her head to see it better."] }
    ],
    words: { "upside down": "거꾸로", lane: "골목길", roof: "지붕", chimney: "굴뚝", dared: "감히 ~했다", bottom: "바닥", knocked: "두드렸다", ladder: "사다리", tumbling: "굴러 떨어지는", ceiling: "천장", sighed: "한숨 쉬었다", giant: "거인", wheels: "바퀴", owes: "빚지고 있다", creak: "삐걱" },
    talk: ["What was strange about Mrs. Twizzleton's house?", "Why was the house upside down?", "What did Jun need to fix it?", "If you could build any house, what would it look like?"],
    quiz: [
      { t: "choice", q: "How did the house stand?", a: ["On its roof", "On a boat", "On a hill"], e: ["🙃", "⛵", "⛰️"] },
      { t: "choice", q: "Where did Mrs. Twizzleton wear her hat?", a: ["On her feet", "On her head", "On the cat"], e: ["🦶", "👒", "🐈"] },
      { t: "choice", q: "Who turned the house over?", a: ["A giant", "Jun's dad", "The cat"], e: ["🧌", "👨", "🐈"] },
      { t: "word", q: "'굴뚝'은 영어로?", a: ["chimney", "chicken", "chin"] },
      { t: "say", q: "Say it! Mrs. Twizzleton said: Everything is better ...", say: "Everything is better upside down.", key: ["upside", "down"] }
    ]
  },
  {
    id: "rocketshed", level: 3, style: "우주·만들기", title: "Grandpa Bo's Rocket Shed", cover: { e: "🚀", bg: "#C9B8E0" },
    blurb: "정원 끝 낡은 창고를 로켓으로 만드는 할아버지와 미나. 날지는 못해도 아주 멀리 볼 수 있어요.",
    pages: [
      { e: "🛖🔩", s: ["Grandpa Bo had a shed at the end of the garden.", "It was full of old wheels, bent pipes, and boxes of screws.", "\"One day,\" said Grandpa Bo, \"this shed will be a rocket.\""] },
      { e: "🔨📏", s: ["Every Saturday, Mina helped him.", "She held the hammer.", "She counted the screws.", "She drew plans on big sheets of paper."] },
      { e: "💧🚪", s: ["Some days, nothing worked.", "The door fell off. The pipes leaked.", "\"Is it broken?\" asked Mina.", "\"Not broken,\" said Grandpa Bo. \"Just not finished.\""] },
      { e: "🎨🪟", s: ["They built a round window.", "They built a tall, pointy roof.", "They painted it silver and red.", "Little by little, the shed looked like a rocket."] },
      { e: "🔴😉", s: ["On the last night, they climbed inside.", "Grandpa Bo pushed a big red button.", "Nothing happened.", "Mina looked at him. He winked.", "\"Look up,\" he said."] },
      { e: "✨🌙", s: ["Grandpa Bo opened the roof.", "Above them were a thousand stars.", "They lay on the floor and looked at the moon together.", "\"We didn't fly,\" said Mina.", "\"No,\" said Grandpa Bo. \"But look how far we can see.\"", "\"Thank you, Grandpa,\" said Mina. And she meant it."] }
    ],
    words: { shed: "창고", bent: "휘어진", pipes: "파이프", screws: "나사", hammer: "망치", counted: "셌다", sheets: "(종이) 장", leaked: "샜다", finished: "다 된", pointy: "뾰족한", silver: "은색", "little by little": "조금씩", winked: "윙크했다", thousand: "천 개의" },
    talk: ["What did Grandpa Bo want to build?", "What went wrong some days?", "Why did Grandpa Bo say 'not broken, just not finished'?", "What would you build in a shed?"],
    quiz: [
      { t: "choice", q: "What did Grandpa Bo want to make?", a: ["A rocket", "A car", "A boat"], e: ["🚀", "🚗", "⛵"] },
      { t: "choice", q: "What did Mina hold?", a: ["The hammer", "The cake", "The cat"], e: ["🔨", "🍰", "🐈"] },
      { t: "choice", q: "What did they see at the end?", a: ["The stars", "The sea", "A dog"], e: ["✨", "🌊", "🐶"] },
      { t: "word", q: "'조금씩'은 영어로?", a: ["little by little", "one by one", "up and down"] },
      { t: "say", q: "Say it! It's not broken. It's just not ...", say: "It's just not finished.", key: ["finished"] }
    ]
  }
];
