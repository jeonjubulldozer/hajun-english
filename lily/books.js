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

// ---- 오터 가족 이야기: 페파피그처럼 대화가 가득한 가족 일상 (등장인물·문장 모두 새로 만든 것) ----
window.LILY_BOOKS.push(
  {
    id: "otter-rain", level: 1, style: "가족 대화 (페파피그 느낌)", title: "The Otter Family: A Rainy Day", cover: { e: "🌧️", bg: "#A9C7E3" },
    blurb: "비 오는 토요일, 수달 가족이 거실에 비밀 아지트를 만들어요.",
    pages: [
      { e: "🌧️🦦", s: ["It is Saturday.", "\"Mum! It's raining!\" says Ollie.", "\"Oh dear,\" says Mum. \"No park today.\""] },
      { e: "🏠🤔", s: ["\"What can we do inside?\" asks Ollie.", "\"Let's build a den!\" says Pip.", "\"A den? With what?\" asks Ollie.", "\"With all the pillows!\" says Pip."] },
      { e: "🛋️🧺", s: ["They take the pillows from the sofa.", "They take the blankets from the beds.", "\"Hey!\" says Dad. \"Where is my pillow?\"", "\"It's a wall now,\" says Pip."] },
      { e: "⛺🔦", s: ["The den is big and dark.", "\"We need a light,\" says Ollie.", "Dad gives them a torch. Click!", "\"Wow! It's like a cave!\" says Pip."] },
      { e: "🔑🦦", s: ["\"Can I come in?\" asks Dad.", "\"What's the password?\" asks Ollie.", "Dad thinks. \"Please?\"", "\"Correct!\" says Pip. \"Come in!\""] },
      { e: "📚🌈", s: ["They read books in the den all afternoon.", "Then Ollie looks outside.", "\"Look! A rainbow!\"", "\"Rainy days are the best days,\" says Pip."] }
    ],
    words: { raining: "비가 오는", inside: "안에서", den: "아지트·작은 굴", pillows: "베개들", blankets: "담요들", wall: "벽", dark: "어두운", torch: "손전등(영국말)", cave: "동굴", password: "비밀번호", correct: "맞았어", rainbow: "무지개" },
    talk: ["What did Ollie and Pip build?", "What was the password?", "What do you do on rainy days?"],
    quiz: [
      { t: "choice", q: "What is the weather like?", a: ["It's raining", "It's snowing", "It's sunny"], e: ["🌧️", "❄️", "☀️"] },
      { t: "choice", q: "What did they use for the den?", a: ["Pillows and blankets", "Boxes and tape", "Rocks and sticks"], e: ["🛋️", "📦", "🪨"] },
      { t: "word", q: "'손전등'은 영어로?", a: ["torch", "touch", "towel"] },
      { t: "say", q: "Say it! Dad said the password: ...", say: "Please?", key: ["please"] },
      { t: "say", q: "Tell me! What do you like to do on rainy days? Start with: On rainy days, I ...", say: "On rainy days, I read books.", key: ["rainy"], free: true }
    ]
  },
  {
    id: "otter-soup", level: 1, style: "가족 대화 (페파피그 느낌)", title: "The Otter Family: Pip Wants to Help", cover: { e: "🥕", bg: "#F3B27A" },
    blurb: "엄마를 돕고 싶은 막내 핍. 그런데 소금을 너무 많이 넣었어요!",
    pages: [
      { e: "🍲🥕", s: ["Mum is making soup.", "\"Can I help?\" asks Pip.", "\"Yes, please,\" says Mum. \"You can wash the carrots.\""] },
      { e: "💦😆", s: ["Pip washes the carrots.", "She washes the potatoes.", "She washes the table, the floor, and Ollie.", "\"Hey! I'm all wet!\" says Ollie."] },
      { e: "🧂😬", s: ["\"Can I help some more?\" asks Pip.", "\"You can add a little salt,\" says Mum.", "Pip adds a little salt.", "Then she adds a LOT of salt."] },
      { e: "😝🥛", s: ["Dad tastes the soup.", "\"Mmm... it's very... SALTY!\"", "He drinks a big glass of water.", "Pip looks sad. \"I'm sorry. I wanted to help.\""] },
      { e: "🤗💡", s: ["\"That's okay,\" says Mum. \"Mistakes help us learn.\"", "\"Let's add more water and more carrots,\" says Ollie.", "\"Can I wash them?\" asks Pip.", "\"Yes!\" says everybody. \"Just the carrots!\""] },
      { e: "🍲❤️", s: ["Now the soup is perfect.", "\"Who made this yummy soup?\" asks Dad.", "\"We all did!\" says Pip.", "\"Thank you for helping, Pip,\" says Mum."] }
    ],
    words: { soup: "수프", help: "돕다", wash: "씻다", carrots: "당근들", potatoes: "감자들", wet: "젖은", salt: "소금", tastes: "맛보다", salty: "짠", mistakes: "실수", perfect: "완벽한", yummy: "맛있는" },
    talk: ["What did Pip wash?", "Why was the soup salty?", "What did Mum say about mistakes?", "How do you help at home?"],
    quiz: [
      { t: "choice", q: "What is Mum making?", a: ["Soup", "Cake", "Pizza"], e: ["🍲", "🎂", "🍕"] },
      { t: "choice", q: "What did Pip put in the soup?", a: ["A lot of salt", "A lot of sugar", "A lot of ice"], e: ["🧂", "🍬", "🧊"] },
      { t: "word", q: "'짠'은 영어로?", a: ["salty", "sunny", "sleepy"] },
      { t: "say", q: "Say it! Mum said: Mistakes help us ...", say: "Mistakes help us learn.", key: ["learn"] },
      { t: "say", q: "Tell me! How do you help at home? Start with: I help ...", say: "I help my mom.", key: ["help"], free: true }
    ]
  },
  {
    id: "otter-car", level: 2, style: "가족 대화 (페파피그 느낌)", title: "The Otter Family: Grandpa's Noisy Car", cover: { e: "🚗", bg: "#E57D6E" },
    blurb: "할아버지의 시끄럽고 오래된 빨간 차로 바닷가 가기. 언덕에서 차가 멈췄어요!",
    pages: [
      { e: "🚗💨", s: ["Grandpa Otter has a very old car.", "It is red, it is small, and it is very, very noisy.", "BRRRM! BANG! PUTT-PUTT!"] },
      { e: "🏖️🙋", s: ["\"Who wants to go to the beach?\" asks Grandpa.", "\"Me!\" shout Ollie and Pip.", "\"Are you sure the car can get there?\" asks Mum.", "\"Of course,\" says Grandpa. \"Probably.\""] },
      { e: "⛰️🐢", s: ["The car goes up a big hill.", "It goes slower... and slower... and slower.", "\"Come on, little car!\" says Grandpa.", "\"Come on!\" shout Ollie and Pip."] },
      { e: "🛑😮", s: ["BANG! The car stops.", "\"Oh dear,\" says Grandpa. \"I think it's tired.\"", "\"Cars don't get tired, Grandpa,\" says Ollie.", "\"This one does,\" says Grandpa."] },
      { e: "💪⬆️", s: ["\"Let's push!\" says Ollie.", "Everybody gets out and pushes.", "\"One, two, three, PUSH!\"", "The car rolls to the top of the hill."] },
      { e: "🌊🍦", s: ["Then it rolls all the way down to the beach. Wheee!", "\"We made it!\" says Grandpa.", "They eat ice cream and watch the waves.", "\"Grandpa,\" says Pip, \"your car is noisy, but it's the best car in the world.\""] }
    ],
    words: { noisy: "시끄러운", beach: "바닷가", sure: "확실한", probably: "아마도", hill: "언덕", slower: "더 느리게", tired: "지친", push: "밀다", rolls: "굴러가다", top: "꼭대기", "made it": "해냈다·도착했다", waves: "파도" },
    talk: ["Why did the car stop?", "How did they get to the top of the hill?", "What did they do at the beach?", "Have you been to the beach? What did you do?"],
    quiz: [
      { t: "choice", q: "What color is Grandpa's car?", a: ["Red", "Blue", "Green"], e: ["🟥", "🟦", "🟩"] },
      { t: "choice", q: "Where are they going?", a: ["To the beach", "To school", "To the zoo"], e: ["🏖️", "🏫", "🦁"] },
      { t: "choice", q: "What did everybody do on the hill?", a: ["They pushed the car", "They went home", "They ate lunch"], e: ["💪", "🏠", "🍱"] },
      { t: "word", q: "'시끄러운'은 영어로?", a: ["noisy", "nosy", "nicely"] },
      { t: "say", q: "Say it! At the beach, Grandpa said: We ...", say: "We made it!", key: ["made", "it"] }
    ]
  },
  {
    id: "otter-tooth", level: 2, style: "가족 대화 (페파피그 느낌)", title: "The Otter Family: Ollie's Wobbly Tooth", cover: { e: "🦷", bg: "#D9E4EC" },
    blurb: "흔들리는 이를 지키려고 조심조심 사과를 먹는 올리. 그런데 유도 시간에…!",
    pages: [
      { e: "🦷😮", s: ["\"Mum, my tooth is wobbly!\" says Ollie.", "\"Let me see,\" says Mum. \"Wow, it's very wobbly!\"", "\"Will it fall out?\" asks Ollie.", "\"Yes, soon,\" says Mum."] },
      { e: "🍎🤔", s: ["At lunch, Ollie eats an apple very carefully.", "He chews on the left. He chews on the right.", "\"Why are you eating like that?\" asks Pip.", "\"I don't want to lose my tooth in the apple!\""] },
      { e: "🏫👦", s: ["At school, Ollie shows his friend Max.", "\"Look! I can move it with my tongue.\"", "\"Cool!\" says Max. \"I lost two teeth last week.\"", "\"Did it hurt?\" asks Ollie. \"No,\" says Max. \"Not at all.\""] },
      { e: "🥋🤸", s: ["After school, Ollie goes to judo.", "He does a big forward roll.", "Then he feels something in his mouth.", "\"Coach! My tooth!\""] },
      { e: "✨😁", s: ["The tooth is in his hand. It is tiny and white.", "\"Well done,\" says Coach. \"That was a strong roll!\"", "Ollie smiles. Now there is a gap in his smile."] },
      { e: "🌙📦", s: ["That night, Ollie puts the tooth in a little box.", "\"What will you wish for?\" asks Pip.", "Ollie thinks. \"A new tooth. A big, strong one!\"", "\"Good night, gappy,\" says Dad. Ollie laughs."] }
    ],
    words: { wobbly: "흔들흔들하는", tooth: "이(하나)", teeth: "이들", "fall out": "빠지다", carefully: "조심조심", chews: "씹다", lose: "잃어버리다", tongue: "혀", hurt: "아프다", "forward roll": "앞구르기", tiny: "아주 작은", gap: "틈·빈 곳", wish: "소원을 빌다" },
    talk: ["Why did Ollie eat the apple carefully?", "Where did Ollie's tooth fall out?", "Have you lost a tooth? What happened?"],
    quiz: [
      { t: "choice", q: "What is wobbly?", a: ["Ollie's tooth", "Ollie's chair", "Ollie's bike"], e: ["🦷", "🪑", "🚲"] },
      { t: "choice", q: "Where did the tooth come out?", a: ["At judo", "At the beach", "In bed"], e: ["🥋", "🏖️", "🛏️"] },
      { t: "word", q: "'혀'는 영어로?", a: ["tongue", "tooth", "toes"] },
      { t: "say", q: "Say it! Ollie said: Mum, my tooth is ...", say: "Mum, my tooth is wobbly!", key: ["wobbly"] },
      { t: "say", q: "Tell me! Have you lost a tooth? Start with: Yes, I lost ... or No, I haven't.", say: "Yes, I lost two teeth.", key: [], free: true }
    ]
  },
  {
    id: "otter-bughotel", level: 2, style: "가족 대화 (페파피그 느낌)", title: "The Otter Family: The Bug Hotel", cover: { e: "🐞", bg: "#B8D08D" },
    blurb: "벌레들이 묵을 '벌레 호텔'을 짓는 날. 첫 손님은 누구일까요?",
    pages: [
      { e: "🪵🐞", s: ["\"Dad, what's a bug hotel?\" asks Ollie.", "\"It's a little house for bugs,\" says Dad.", "\"Let's build one!\" says Ollie."] },
      { e: "🧱🌲", s: ["They find old bricks, sticks, pine cones and leaves.", "\"This is the ladybird room,\" says Ollie.", "\"And this is the beetle room,\" says Pip."] },
      { e: "🔨🪧", s: ["Dad puts the bricks on top of each other.", "Ollie puts sticks in the holes.", "Pip makes a sign. It says: BUGS WELCOME!"] },
      { e: "⏳😤", s: ["\"Where are the bugs?\" asks Pip.", "\"We have to wait,\" says Dad.", "Pip waits for one minute.", "\"Where are the bugs NOW?\"", "Everybody laughs."] },
      { e: "🔍🐜", s: ["The next morning, Ollie gets his magnifying glass.", "\"Look! An ant in the stick room!\"", "\"And a spider in the corner!\" says Pip.", "\"And a beetle!\" says Ollie. \"Hello, Mr Beetle!\""] },
      { e: "🏨🌙", s: ["\"Our hotel is full,\" says Ollie proudly.", "\"Do bugs pay for their rooms?\" asks Pip.", "\"No,\" says Dad. \"But they help our garden.\"", "\"That's their thank you,\" says Ollie."] }
    ],
    words: { hotel: "호텔", build: "짓다", bricks: "벽돌", sticks: "나뭇가지", "pine cones": "솔방울", ladybird: "무당벌레(영국말)", beetle: "딱정벌레", holes: "구멍", sign: "표지판", welcome: "환영해요", wait: "기다리다", "magnifying glass": "돋보기", spider: "거미", proudly: "자랑스럽게", pay: "돈을 내다" },
    talk: ["What did they use to build the bug hotel?", "Which bugs came to the hotel?", "If you built a bug hotel, which bug would you want?"],
    quiz: [
      { t: "choice", q: "What is a bug hotel?", a: ["A little house for bugs", "A big hotel for people", "A car for bugs"], e: ["🏠", "🏨", "🚗"] },
      { t: "choice", q: "What did Ollie use to look at the bugs?", a: ["A magnifying glass", "A camera", "A torch"], e: ["🔍", "📷", "🔦"] },
      { t: "word", q: "'돋보기'는 영어로?", a: ["magnifying glass", "magic glass", "glasses"] },
      { t: "say", q: "Say it! Pip's sign says: BUGS ...", say: "Bugs welcome!", key: ["welcome"] },
      { t: "say", q: "Tell me! Which bug do you like? Start with: I like ...", say: "I like beetles.", key: ["like"], free: true }
    ]
  },
  {
    id: "otter-judo", level: 2, style: "가족 대화 (페파피그 느낌)", title: "The Otter Family: Judo Day with Dad", cover: { e: "🥋", bg: "#F1E3C2" },
    blurb: "아빠와 함께하는 유도 수업 날. 도복은 작고, 낙법은 아프고… 올리가 아빠를 가르쳐요.",
    pages: [
      { e: "🥋👨", s: ["\"Dad, can you come to judo today?\" asks Ollie.", "\"Me? On the mat?\" says Dad.", "\"Yes! It's Bring Your Dad Day!\""] },
      { e: "👕😂", s: ["Dad puts on a white judo uniform.", "It is too small. His arms stick out.", "\"You look funny, Dad,\" says Ollie.", "\"I feel funny,\" says Dad."] },
      { e: "🙇🙇", s: ["\"First, we bow,\" says Ollie.", "They bow to the mat. They bow to the coach.", "\"Why do we bow?\" asks Dad.", "\"To say thank you and to show respect,\" says Ollie."] },
      { e: "🤸💥", s: ["\"Now we practise falling,\" says the coach.", "Ollie falls and rolls. Smooth!", "Dad falls and rolls. BOOF!", "\"Ouch,\" says Dad. \"The floor is very hard.\""] },
      { e: "💪👍", s: ["\"Tuck your chin, Dad,\" says Ollie. \"And slap the mat.\"", "Dad tries again. Roll! Slap!", "\"Better!\" says the coach. \"Ollie is a good teacher.\""] },
      { e: "🙏😊", s: ["At the end, Dad and Ollie bow to each other.", "\"Thank you for teaching me,\" says Dad.", "\"Thank you for coming,\" says Ollie.", "\"Same time next week?\" asks the coach.", "Dad rubs his back. \"Maybe next year.\""] }
    ],
    words: { mat: "매트", uniform: "도복·옷", "stick out": "삐져나오다", bow: "인사하다(절)", respect: "존중", practise: "연습하다", smooth: "부드럽게", hard: "딱딱한", tuck: "집어넣다", chin: "턱", slap: "탁 치다", teacher: "선생님", rubs: "문지르다" },
    talk: ["Why was Dad's uniform funny?", "Why do we bow in judo?", "What did Ollie teach Dad?", "What would you teach your dad at judo?"],
    quiz: [
      { t: "choice", q: "Where does Dad go with Ollie?", a: ["To judo", "To the beach", "To the shop"], e: ["🥋", "🏖️", "🛒"] },
      { t: "choice", q: "How was Dad's uniform?", a: ["Too small", "Too big", "Too red"], e: ["🤏", "🐘", "🟥"] },
      { t: "choice", q: "Why do we bow?", a: ["To show respect", "To find bugs", "To sleep"], e: ["🙇", "🐞", "😴"] },
      { t: "word", q: "'존중'은 영어로?", a: ["respect", "rest", "rescue"] },
      { t: "say", q: "Say it! Ollie said: Tuck your chin, and slap the ...", say: "Tuck your chin, and slap the mat.", key: ["mat"] }
    ]
  }
);
