// 곤충 무술 도장(dojo/)의 곤충 그림을 책 삽화로 쓰기 위한 복사본 — 그리는 코드는 dojo/index.html에서 그대로 가져왔어요.
// BugArt.scene(canvas, {night, sign, actors:[{id:'cicada', pose:'grip', x:380, f:1, ex:0}], floaty:[...]}) 로 한 장면을 그려요.
(() => {
'use strict';
const W=960,H=540,G=395,TAU=Math.PI*2,PI=Math.PI;
const ART={tkd:['태권도','#ff6b6b'],judo:['유도','#4dabf7'],wr:['레슬링','#20c997'],bjj:['주짓수','#845ef7']};
const HONEY='#f2b84b',OUT='#1f1a14';
const BL={th:34,sn:34,ft:9,ua:24,fa:24,bc:36,so:58,hd:92};
const LL=o=>Object.assign({},BL,o||{});

/* ---------- 곤충 식구들 ---------- */
const SP={
 rhino:{n:'번쩍이',k:'장수풍뎅이',tag:'사범님',arts:['wr'],s:1.12,L:LL({hd:88}),rx:30,ry:40,hr:18,col:'#8a4520',lc:'#3c1b0b',hc:'#4e2410',lw:10,ant:'short',dark:1,
   moves:'레벨 체인지 · 더블렉 태클 · 번쩍 들기',fact:'뿔을 상대 밑에 넣고 번쩍 들어서 뒤집어요.'},
 stag:{n:'집게',k:'사슴벌레',tag:'사범님',arts:['judo'],s:1.06,L:LL(),rx:25,ry:38,hr:20,col:'#3e271a',lc:'#22140c',hc:'#2e1c12',lw:9,ant:'short',dark:1,eye:[4,-8,8.6],
   moves:'잡기 · 기울이기 · 업어치기',fact:'큰 턱으로 상대를 집어서 던져요.'},
 mantis:{n:'꽉이',k:'사마귀',tag:'사범님',arts:['bjj'],s:1.08,L:LL({th:38,sn:38,ua:26,fa:28,bc:40,so:66,hd:100}),rx:17,ry:44,hr:18,col:'#69b94a',lc:'#4f9a36',hc:'#7acb59',lw:7,ant:'thin',head:'tri',eye:[11,-10,7.5],mouth:[6,10],
   moves:'가드 · 스윕 · 꽉 잡기',fact:'가만히 기다렸다가 앞다리로 순식간에 잡아요.'},
 hop:{n:'팡이',k:'메뚜기',tag:'사범님',arts:['tkd'],s:1.0,L:LL({th:36,sn:36}),rx:20,ry:40,hr:20,col:'#8cbf3f',lc:'#6f9e2c',hc:'#9acb4a',lw:8,tw:2.1,ant:'short',
   moves:'거리 재기 · 뒤후려차기 · 뛰어 앞차기',fact:'뒷다리로 몸길이의 스무 배쯤 뛰어요.'},
 lady:{n:'동글이',k:'무당벌레',tag:'두 가지',arts:['judo','bjj'],s:.88,L:LL({th:28,sn:28,bc:34,so:54,hd:84}),rx:30,ry:35,hr:17,col:'#e63a2e',lc:'#1c1c1c',hc:'#1c1c1c',lw:8,ant:'short',dark:1,
   moves:'데굴데굴 앞구르기 · 낙법',fact:'위험하면 뒤집혀서 죽은 척을 해요.'},
 butter:{n:'팔랑이',k:'나비',tag:'두 가지',arts:['tkd','bjj'],s:.94,L:LL({th:36,sn:36}),rx:13,ry:38,hr:16,col:'#2b2b2b',lc:'#2b2b2b',hc:'#353535',lw:6,ant:'club',wing:'butter',dark:1,
   moves:'톡톡 스텝 · 앞차기 · 버터플라이 스윕',fact:'날개가 아주 작은 비늘로 덮여 있어요.'},
 katy:{n:'긴다리',k:'여치',tag:'두 가지',arts:['wr','tkd'],s:1.0,L:LL({th:38,sn:38}),rx:24,ry:38,hr:20,col:'#5fb04a',lc:'#4b9139',hc:'#6cbd56',lw:8,tw:1.9,ant:'long',
   moves:'긴 다리 앞차기 · 바로 태클',fact:'날개를 비벼서 찌르르 노래해요.'},
 fire:{n:'반짝이',k:'반딧불이',tag:'두 가지',arts:['judo','tkd'],s:.9,L:LL(),rx:21,ry:38,hr:17,col:'#26262b',lc:'#1d1d22',hc:'#2a2a30',lw:7,ant:'thin',glow:1,dark:1,eye:[6,3,7],mouth:[10,11],
   moves:'반짝하는 순간 허리 넣어 메치기',fact:'꽁무니 불빛으로 친구와 신호를 주고받아요.'},
 bee:{n:'윙윙이',k:'꿀벌',tag:'세 가지',arts:['tkd','wr','judo'],s:.9,L:LL({th:30,sn:30}),rx:26,ry:36,hr:18,col:'#fcc419',lc:'#2a2210',hc:'#2a2210',lw:7,ant:'elbow',wing:'bee',dark:1,
   moves:'슉슉슉 연속 발차기 · 싱글렉 · 넘기기',fact:'날개를 1초에 이백 번 넘게 움직여요.'},
 bang:{n:'콩콩이',k:'방아깨비',tag:'세 가지',arts:['wr','judo','bjj'],s:1.08,L:LL({th:42,sn:42,ua:27,fa:27,bc:42,so:70,hd:104}),rx:15,ry:50,hr:15,col:'#7cc35c',lc:'#64a948',hc:'#86cc66',lw:6,tw:1.7,ant:'sword',head:'cone',eye:[14,-10,6.5],mouth:[20,2],
   moves:'방아 찧기 레벨 체인지 · 더블렉 · 누르기',fact:'뒷다리를 잡으면 방아 찧듯 몸을 끄덕여요.'},
 cicada:{n:'맴맴이',k:'매미',tag:'네 가지',arts:['tkd','judo','wr','bjj'],s:1.0,L:LL(),rx:25,ry:38,hr:19,col:'#3f4a2c',lc:'#2f3820',hc:'#4a5733',lw:8,ant:'short',head:'wide',wing:'cicada',hero:1,dark:1,eye:[13,-2,8.4],mouth:[15,9],
   moves:'낙법 · 스프롤 · 메치기 · 오모플라타',fact:'애벌레는 땅속에서 몇 년이나 자라요.'},
 dummy:{n:'짚인형',k:'연습 인형',arts:[],s:1.0,L:LL({ua:20,fa:18,th:30,sn:30,hd:86}),rx:26,ry:38,hr:20,col:'#d2ab6c',lc:'#c49b5d',hc:'#d8b376',lw:13,ant:'none',noface:1}
};
Object.keys(SP).forEach((k,i)=>{SP[k].id=k;SP[k].ph=i*1.37});
SP.grass={n:'띵가',k:'베짱이',tag:'개인 레슨만',arts:['judo','wr'],s:1.0,L:LL({th:38,sn:38}),rx:22,ry:38,hr:19,col:'#a6c75c',lc:'#86a641',hc:'#b4d46a',lw:7,tw:1.8,ant:'long',
  moves:'기술 이름 외우기 · 기타 치며 노래',fact:'날개를 비벼서 베짱베짱 하고 울어요.',id:'grass',ph:17.3,ep:1,scene:'grass'};
SP.dragon={n:'씽씽이',k:'잠자리',tag:'두 가지',arts:['judo','bjj'],s:1.0,L:LL({th:42,sn:42,bc:38,so:76,hd:108}),rx:9,ry:51,hr:21,col:'#5bc9de',lc:'#239caa',hc:'#68d7d3',lw:5,ant:'short',head:'wide',wing:'dragon',
  moves:'빠른 깃 잡기 · 허리후리기 · 삼각조르기 연결',fact:'눈이 머리를 거의 다 덮어서 사방을 다 봐요. 날면서 먹이를 잡는 사냥 성공률이 아주 높아요.',id:'dragon',ph:29.3,ep:10,scene:'arrival10'};
SP.dung={n:'굴리',k:'쇠똥구리',tag:'주짓수만',arts:['bjj'],s:1.0,L:LL(),rx:28,ry:36,hr:18,col:'#2f2f3a',lc:'#1b1b22',hc:'#383844',lw:9,ant:'short',dark:1,look:'stag',
  moves:'바닥에서 데굴데굴 굴리기',fact:'똥 경단을 자기 몸보다 크게 굴려서 옮겨요.',id:'dung',ph:19.1,ep:3,scene:'gulli'};
SP.ant={n:'단단이',k:'개미',tag:'숨은 특훈',arts:['wr','judo'],s:.9,L:LL({th:30,sn:30}),rx:20,ry:30,hr:21,col:'#5a3322',lc:'#2c1810',hc:'#6a3d28',lw:7,ant:'elbow',dark:1,
  moves:'매일 밤 불가리안 백 300번',fact:'자기 몸무게보다 열 배 넘게 무거운 것도 들어요.',id:'ant',ph:21.7,ep:3,scene:'antnight'};
SP.cricket={n:'뚜리',k:'귀뚜라미',tag:'단체반 두 달',arts:['judo'],s:.95,L:LL({th:36,sn:36}),rx:21,ry:36,hr:19,col:'#5a4026',lc:'#3e2c1a',hc:'#6b4c2e',lw:7,tw:1.8,ant:'long',dark:1,
  moves:'매일 밤 단체반 스파링',fact:'귀가 앞다리에 있어요.',id:'cricket',ph:23.3,ep:3,scene:'cricket'};
SP.kidrhino=Object.assign({},SP.rhino,{n:'꼬마뿔',k:'장수풍뎅이',tag:'아빠랑 특훈',arts:['wr','bjj'],s:.82,col:'#a0522d',look:'rhino',
  moves:'매일 밤 아빠랑 스파링',fact:'수컷만 큰 뿔이 있어요.',id:'kidrhino',ph:25.9,ep:4,scene:'kidrhino'});
SP.dadcicada=Object.assign({},SP.cicada,{n:'아빠',k:'매미',tag:'맴맴이 아빠',arts:['judo','wr','bjj'],s:1.22,col:'#343d24',hc:'#3f4a2c',hero:0,look:'cicada',
  moves:'맴맴이랑 스파링',fact:'수컷 매미만 맴맴 노래해요.',id:'dadcicada',ph:27.1,ep:4,scene:'mmdad'});
// Visitors and story antagonists. Species are not inherently villains.
SP.pine={...SP.stag,id:'pine',n:'청솔이',k:'사슴벌레',tag:'솔숲 유도관',arts:['judo'],s:.96,col:'#39716b',hc:'#315a52',look:'stag',ph:31,ep:12,scene:'visitors12',moves:'반대잡기 · 빗당겨치기 · 되치기',fact:'큰 턱은 먹이를 씹는 턱이 변한 것이에요.'};
SP.amber={...SP.lady,id:'amber',n:'호박이',k:'무당벌레',tag:'솔숲 유도관',arts:['judo'],col:'#efaa34',look:'lady',ph:32,ep:12,scene:'visitors12',moves:'발기술 · 모두걸기',fact:'무당벌레는 종류에 따라 색과 무늬가 달라요.'};
const visitors=[
 ['tarantula','털보','타란튤라','spider','#78503e',29,38,9],
 ['huntsman','넓적이','농발거미','spider','#ad8752',26,33,6],
 ['bat','밤날개','박쥐','bat','#79658e',22,33,7],
 ['rat','잽쥐','쥐','rat','#899296',23,34,7],
 ['centipede','마디왕','지네','centipede','#bb6845',15,49,6]
];
for(const [i,n,k,creature,col,rx,ry,lw] of visitors){SP[i]={id:i,n,k,creature,col,hc:col,lc:mixVisitorColor(creature),rx,ry,lw,s:1,L:LL({th:33,sn:33}),hr:19,ant:'none',arts:[],ph:35+visitors.findIndex(v=>v[0]===i),tag:'그늘패',ep:13,scene:'arrival13',moves:'힘자랑 대신 함께 배우는 법을 찾는 중',fact:creature==='spider'?'거미는 다리가 여덟 개이고 곤충이 아니에요.':creature==='bat'?'박쥐는 날 수 있는 포유류예요.':creature==='rat'?'쥐는 수염으로 주변의 좁은 틈을 느껴요.':'지네는 몸의 여러 마디마다 다리가 한 쌍씩 있어요.'};}
function mixVisitorColor(kind){return kind==='spider'?'#624b38':kind==='centipede'?'#8a4532':'#554b63'}
const ORDER=['rhino','stag','mantis','hop','lady','butter','katy','fire','bee','bang','cicada','grass','dung','ant','cricket','kidrhino','dadcicada','dragon','pine','amber','tarantula','huntsman','bat','rat','centipede'];
const UNLOCK={lady:5,butter:10,katy:15,fire:25,bee:35,bang:50};

/* ---------- 자세 ---------- */
const PO={
 stand:{tl:0,flh:.06,flk:.06,blh:-.06,blk:.06,fah:.25,fae:.35,bah:-.15,bae:.35,ex:0},
 guard:{tl:.12,flh:.38,flk:.45,blh:-.38,blk:.35,fah:1.05,fae:1.4,bah:.8,bae:1.6,ex:1},
 low:{tl:.55,flh:.75,flk:1.15,blh:-.3,blk:.95,fah:1.25,fae:.6,bah:1.05,bae:.85,ex:1},
 shoot:{tl:1.05,flh:1.25,flk:1.7,blh:-.7,blk:.3,fah:1.75,fae:.3,bah:1.6,bae:.35,ex:1},
 squat:{tl:.35,flh:.95,flk:1.5,blh:-.05,blk:1.1,fah:1.6,fae:.5,bah:1.5,bae:.6,ex:1},
 lift:{tl:-.05,flh:.3,flk:.3,blh:-.25,blk:.2,fah:2.85,fae:.2,bah:2.75,bae:.25,ex:1},
 grip:{tl:.1,flh:.28,flk:.25,blh:-.28,blk:.2,fah:1.45,fae:.35,bah:1.25,bae:.7,ex:1},
 turn:{tl:.95,flh:.65,flk:1.15,blh:.1,blk:1.15,fah:2.0,fae:1.3,bah:1.6,bae:1.7,ex:1},
 finish:{tl:1.25,flh:.55,flk:.6,blh:-.65,blk:.3,fah:.9,fae:.3,bah:.6,bae:.4,ex:1},
 chamber:{tl:-.1,flh:1.55,flk:2.0,blh:-.05,blk:.05,fah:1.0,fae:1.5,bah:.4,bae:1.3,ex:1},
 kick:{tl:-.4,flh:1.8,flk:.05,blh:-.05,blk:.05,fah:.6,fae:1.3,bah:-.25,bae:1.1,ex:1},
 spin:{tl:.75,flh:.12,flk:.15,blh:-2.15,blk:.08,fah:.7,fae:1.1,bah:.25,bae:.9,ex:1},
 tuck:{tl:.1,flh:1.35,flk:2.1,blh:.95,blk:2.2,fah:2.4,fae:.5,bah:2.2,bae:.5,ex:1},
 back:{tl:.25,flh:1.7,flk:1.05,blh:1.35,blk:1.5,fah:1.4,fae:.9,bah:1.2,bae:1.1,ex:1},
 flat:{tl:0,flh:.18,flk:.12,blh:.06,blk:.12,fah:.5,fae:.2,bah:.25,bae:.2,ex:2},
 top:{tl:.9,flh:.5,flk:2.05,blh:.1,blk:1.7,fah:1.85,fae:.45,bah:1.65,bae:.45,ex:1},
 sprawl:{tl:1.35,flh:-.45,flk:.35,blh:-.95,blk:.2,fah:1.45,fae:.8,bah:1.25,bae:.9,ex:1},
 bow:{tl:.75,flh:0,flk:0,blh:0,blk:0,fah:.12,fae:.1,bah:.08,bae:.1,ex:3},
 cheer:{tl:-.05,flh:.1,flk:.1,blh:-.1,blk:.1,fah:2.7,fae:.5,bah:2.5,bae:.5,ex:3},
 sit:{tl:.2,flh:2.2,flk:2.2,blh:2.0,blk:2.0,fah:1.3,fae:.6,bah:1.1,bae:.8,ex:1}
};
const EZ={io:u=>u<.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2,out:u=>1-Math.pow(1-u,3),in:u=>u*u*u,lin:u=>u};
const easeBack=u=>1+2.70158*Math.pow(u-1,3)+1.70158*Math.pow(u-1,2);

function norm(fr){
  fr=fr.slice().sort((a,b)=>a[0]-b[0]);
  let prev=Object.assign({x:480,y:0,rot:0,f:1,gl:0,rust:0,curl:0},PO.stand);
  return fr.map(([t,name,o])=>{const p=Object.assign({},prev,name?PO[name]:{},o||{});prev=p;return{t,p,e:(o&&o.e)||'io'}});
}
function samp(F,t){
  if(t<=F[0].t) return F[0].p;
  for(let i=1;i<F.length;i++){
    if(t<F[i].t){
      const a=F[i-1],b=F[i];let u=(t-a.t)/(b.t-a.t);u=(EZ[b.e]||EZ.io)(u);
      const p={};
      for(const k in b.p){const va=a.p[k],vb=b.p[k];p[k]=(typeof vb==='number'&&typeof va==='number'&&k!=='f'&&k!=='ex')?va+(vb-va)*u:(u<.5?va:vb)}
      return p;
    }
  }
  return F[F.length-1].p;
}

/* ---------- 몸 계산 ---------- */
const DR=a=>[Math.sin(a),Math.cos(a)];
function geo(sp,P){
  const l=sp.L,t=P.tl,A=d=>[Math.sin(t)*d,-Math.cos(t)*d];
  const leg=(h,k,ox)=>{const d1=DR(h),kn=[ox+d1[0]*l.th,d1[1]*l.th],d2=DR(h-k),ft=[kn[0]+d2[0]*l.sn,kn[1]+d2[1]*l.sn],d3=DR(h-k+PI/2);return{hip:[ox,0],kn,ft,toe:[ft[0]+d3[0]*l.ft,ft[1]+d3[1]*l.ft]}};
  const SO=A(l.so);
  const arm=(h,e,ox)=>{const sh=[SO[0]+ox,SO[1]],d1=DR(h-t),el=[sh[0]+d1[0]*l.ua,sh[1]+d1[1]*l.ua],d2=DR(h-t+e),hd=[el[0]+d2[0]*l.fa,el[1]+d2[1]*l.fa];return{sh,el,hd}};
  return{t,SO,BC:A(l.bc),HD:A(l.hd*(1-.45*(P.curl||0))),fl:leg(P.flh,P.flk,3),bl:leg(P.blh,P.blk,-3),fa:arm(P.fah,P.fae,2),ba:arm(P.bah,P.bae,-3)};
}
function place(sp,P,ground){
  const g=geo(sp,P),pts=[g.fl.toe,g.fl.ft,g.fl.kn,g.bl.toe,g.bl.ft,g.bl.kn],ct=Math.cos(g.t),st=Math.sin(g.t);
  for(let i=0;i<8;i++){const a=i/8*TAU,x=sp.rx*Math.cos(a),y=sp.ry*Math.sin(a);pts.push([g.BC[0]+x*ct-y*st,g.BC[1]+x*st+y*ct])}
  for(let i=0;i<6;i++){const a=i/6*TAU;pts.push([g.HD[0]+sp.hr*Math.cos(a),g.HD[1]+sp.hr*Math.sin(a)])}
  const cr=Math.cos(P.rot),sr=Math.sin(P.rot);let my=-1e9;
  for(const p of pts){const y=p[0]*sr+p[1]*cr;if(y>my)my=y}
  const k=sp.s*(P.sc||1);P.wx=P.x;P.wy=(ground==null?G:ground)+P.y-my*k;P.g=g;return P;
}

/* 두 곤충의 손·발 접촉. 뼈 길이를 유지하는 두 관절 IK; 팔을 꺾거나 늘리지 않는다. */
function jointWorld(a,path){
  const p=path.split('.').reduce((v,k)=>v[k],a.P.g),P=a.P,k=a.sp.s*(P.sc||1),c=Math.cos(P.rot),s=Math.sin(P.rot);
  return[P.wx+P.f*k*(p[0]*c-p[1]*s),P.wy+k*(p[0]*s+p[1]*c)];
}
function reach(a,limb,target,bend=1,weight=1){
  if(weight<=0)return;
  const P=a.P,k=a.sp.s*(P.sc||1),c=Math.cos(P.rot),s=Math.sin(P.rot),dx=(target[0]-P.wx)/(P.f*k),dy=(target[1]-P.wy)/k;
  const goal=[dx*c+dy*s,-dx*s+dy*c],arm=limb==='fa'||limb==='ba',bone=P.g[limb],root=arm?bone.sh:bone.hip,l1=arm?a.sp.L.ua:a.sp.L.th,l2=arm?a.sp.L.fa:a.sp.L.sn;
  let x=goal[0]-root[0],y=goal[1]-root[1],d=Math.hypot(x,y);if(d<.001){x=0;y=1;d=1}
  const ux=x/d,uy=y/d,dist=Math.max(Math.abs(l1-l2)+.01,Math.min(l1+l2-.01,d)),along=(l1*l1-l2*l2+dist*dist)/(2*dist),h=Math.sqrt(Math.max(0,l1*l1-along*along));
  const mid=[root[0]+ux*along-uy*h*bend,root[1]+uy*along+ux*h*bend],end=[root[0]+ux*dist,root[1]+uy*dist],mk=arm?'el':'kn',ek=arm?'hd':'ft',old=bone[ek];
  const mix=(a,b)=>a.map((v,i)=>v+(b[i]-v)*weight);
  bone[mk]=mix(bone[mk],mid);bone[ek]=mix(old,end);
  if(!arm)bone.toe=bone.toe.map((v,i)=>v+bone[ek][i]-old[i]);
}
function gripWeight(t,start,release){return Math.max(0,Math.min(1,(t-start)/.35,(release-t)/.18))}
function contact(a,limb,b,joint,offset,bend,weight){const p=jointWorld(b,joint);reach(a,limb,[p[0]+offset[0],p[1]+offset[1]],bend,weight)}

/* ---------- 그리기 도구 ---------- */
let SIL=false;
const pc=c=>SIL?'#0e1a13':c;
function tint(h,t,k){const a=parseInt(h.slice(1),16),b=parseInt(t.slice(1),16),m=(x,y)=>Math.round(x+(y-x)*k);return'#'+((1<<24)|(m(a>>16,b>>16)<<16)|(m(a>>8&255,b>>8&255)<<8)|m(a&255,b&255)).toString(16).slice(1)}
function mixc(h,a){const n=parseInt(h.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const t=a<0?0:255,k=Math.abs(a);r=Math.round(r+(t-r)*k);g=Math.round(g+(t-g)*k);b=Math.round(b+(t-b)*k);return'#'+((1<<24)|(r<<16)|(g<<8)|b).toString(16).slice(1)}
function poly(c,pts){c.beginPath();c.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)c.lineTo(pts[i][0],pts[i][1])}
function limb(c,pts,w,col){c.lineCap='round';c.lineJoin='round';c.strokeStyle=pc(OUT);c.lineWidth=w+4.5;poly(c,pts);c.stroke();c.strokeStyle=pc(col);c.lineWidth=w;poly(c,pts);c.stroke()}
function blob(c,a,b,w,col){const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,an=Math.atan2(b[1]-a[1],b[0]-a[0]),ln=Math.hypot(b[0]-a[0],b[1]-a[1]);c.beginPath();c.ellipse(mx,my,ln/2+w*.2,w/2,an,0,TAU);c.fillStyle=pc(col);c.fill();c.strokeStyle=pc(OUT);c.lineWidth=2.4;c.stroke()}
function fs(c,col,lw){c.fillStyle=pc(col);c.fill();c.strokeStyle=pc(OUT);c.lineWidth=lw||2.6;c.stroke()}
function rr(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
function star(c,n,r1,r2){c.beginPath();for(let i=0;i<n*2;i++){const r=i%2?r2:r1,a=i/(n*2)*TAU-PI/2;i?c.lineTo(Math.cos(a)*r,Math.sin(a)*r):c.moveTo(Math.cos(a)*r,Math.sin(a)*r)}c.closePath()}

function drawLeg(c,sp,L,col){limb(c,[L.hip,L.kn,L.ft,L.toe],sp.lw,col);if(sp.tw)blob(c,L.hip,L.kn,sp.lw*sp.tw,col)}
function drawArm(c,sp,A,col){
  limb(c,[A.sh,A.el,A.hd],sp.lw*.9,col);
  if(sp.id==='mantis'){
    const dx=A.hd[0]-A.el[0],dy=A.hd[1]-A.el[1],n=Math.hypot(dx,dy)||1,ux=dx/n,uy=dy/n,nx=-uy,ny=ux;
    for(let i=1;i<=3;i++){const bx=A.el[0]+dx*i/4.2,by=A.el[1]+dy*i/4.2;c.beginPath();c.moveTo(bx-ux*3,by-uy*3);c.lineTo(bx+nx*9,by+ny*9);c.lineTo(bx+ux*3,by+uy*3);c.closePath();fs(c,mixc(col,.2),1.5)}
  }else{c.beginPath();c.arc(A.hd[0],A.hd[1],sp.lw*.72,0,TAU);fs(c,col,2.2)}
}
function midLegs(c,sp,g,time,col){
  if(sp.creature)return;
  if(sp.noface)return;const b=g.BC,w=Math.sin(time*3+sp.ph)*.15;
  for(const s of [1,-1]){const a1=s>0?.9+w:-.6-w,p0=[b[0]+s*4,b[1]-4],d1=DR(a1),p1=[p0[0]+d1[0]*16,p0[1]+d1[1]*16],d2=DR(a1*.3),p2=[p1[0]+d2[0]*14,p1[1]+d2[1]*14];limb(c,[p0,p1,p2],sp.lw*.55,col)}
}
function wings(c,sp,g,time){
  const w=sp.wing||(['hop','katy','bang','mantis','grass','cricket'].includes(sp.id)?'fold':null);if(!w)return;
  const rx=sp.rx,ry=sp.ry,off=sp.L.so-sp.L.bc;
  c.save();c.translate(g.SO[0],g.SO[1]);c.rotate(g.t);
  if(w==='dragon'){
    // 앞날개 두 장 + 조금 넓은 뒷날개 두 장. 양옆으로 펼친 투명한 날개.
    for(const side of [-1,1])for(const rear of [0,1]){
      c.save();c.scale(side,1);c.translate(0,rear*20);
      const flutter=Math.sin(time*24+rear)*2;
      c.beginPath();c.moveTo(0,0);c.bezierCurveTo(36,-16+flutter,100,-15+flutter,113,-4+flutter);
      c.bezierCurveTo(121,7+flutter,50,rear?24:13,0,5);c.closePath();
      c.fillStyle=SIL?'rgba(14,26,19,.7)':'rgba(222,250,255,.48)';c.fill();c.strokeStyle=pc('#497d91');c.lineWidth=1.6;c.stroke();
      if(!SIL){c.save();c.clip();c.strokeStyle='rgba(48,112,134,.5)';c.lineWidth=.8;
        c.beginPath();c.moveTo(3,2);c.lineTo(110,-2+flutter);
        for(let x=20;x<105;x+=15){c.moveTo(x,1);c.lineTo(x+9,-15);c.moveTo(x,1);c.lineTo(x+12,22)}c.stroke();c.restore()}
      c.restore();
    }
  }else if(w==='butter'){
    const fl=.55+.45*Math.abs(Math.cos(time*4.5+sp.ph));c.scale(fl,1);
    c.beginPath();c.moveTo(-2,-2);c.bezierCurveTo(-40,-72,-104,-62,-98,-12);c.bezierCurveTo(-92,14,-40,18,-4,10);c.closePath();fs(c,'#ffd43b');
    if(!SIL){c.save();c.clip();c.fillStyle='#1f1f1f';[-30,-56].forEach(x=>c.fillRect(x,-80,8,100));c.beginPath();c.moveTo(-110,-70);c.lineTo(-80,-70);c.lineTo(-90,24);c.lineTo(-120,24);c.fill();c.restore()}
    c.beginPath();c.moveTo(-4,8);c.bezierCurveTo(-62,10,-84,62,-52,82);c.bezierCurveTo(-30,94,-10,60,-2,30);c.closePath();fs(c,'#ffd43b');
    if(!SIL){c.save();c.clip();c.fillStyle='#1f1f1f';c.fillRect(-100,46,100,60);c.fillStyle='#4dabf7';[[-56,64],[-40,74],[-24,68]].forEach(([x,y])=>{c.beginPath();c.arc(x,y,4.5,0,TAU);c.fill()});c.fillStyle='#ff922b';c.beginPath();c.arc(-58,50,5,0,TAU);c.fill();c.restore()}
  }else if(w==='cicada'){
    for(const o of [[-8,4,.45],[0,0,.6]]){c.save();c.translate(o[0],o[1]);c.beginPath();c.moveTo(-2,0);c.bezierCurveTo(-34,-8,-50,44,-40,104);c.bezierCurveTo(-32,122,-12,92,-2,30);c.closePath();c.fillStyle=SIL?'rgba(14,26,19,.8)':`rgba(214,238,255,${o[2]})`;c.fill();c.strokeStyle=pc(OUT);c.lineWidth=2;c.stroke();
      if(!SIL){c.strokeStyle='rgba(45,80,50,.55)';c.lineWidth=1.3;c.beginPath();c.moveTo(-4,8);c.quadraticCurveTo(-30,40,-36,96);c.moveTo(-12,20);c.quadraticCurveTo(-20,60,-22,96);c.stroke()}c.restore()}
  }else if(w==='bee'){
    const fl=Math.sin(time*42)*.35;
    for(const a of [-2.3+fl,-2.0-fl]){c.save();c.rotate(a);c.beginPath();c.ellipse(0,26,11,24,0,0,TAU);c.fillStyle=SIL?'rgba(14,26,19,.85)':'rgba(255,255,255,.62)';c.fill();c.strokeStyle=pc(OUT);c.lineWidth=1.8;c.stroke();c.restore()}
  }else{
    c.beginPath();c.moveTo(2,-6);c.quadraticCurveTo(-rx-16,off,-rx*.35,off+ry+10);c.quadraticCurveTo(-rx*.2,off,2,-6);c.closePath();fs(c,sp.id==='mantis'?'#5aa83c':mixc(sp.col,-.2),2.2);
  }
  c.restore();
}
function rings(c,rx,ry,n,a){c.strokeStyle=`rgba(0,0,0,${a||.18})`;c.lineWidth=2;for(let i=1;i<=n;i++){const y=ry*(.05+i*.2);c.beginPath();c.moveTo(-rx,y-4);c.quadraticCurveTo(0,y+6,rx,y-4);c.stroke()}}
function pattern(c,sp,rx,ry){
  if(sp.creature==='centipede'){rings(c,rx,ry,7,.4);return}
  switch(sp.look||sp.id){
    case 'dragon':c.fillStyle='#243e70';for(let y=-ry+8;y<ry;y+=12)c.fillRect(-rx,y,rx*2,3);break;
    case 'rhino':case 'stag':c.fillStyle='rgba(255,255,255,.22)';c.beginPath();c.ellipse(rx*.25,-ry*.35,rx*.28,ry*.3,-.3,0,TAU);c.fill();c.strokeStyle='rgba(0,0,0,.28)';c.lineWidth=2;c.beginPath();c.moveTo(-rx*.15,-ry);c.quadraticCurveTo(-rx*.35,0,-rx*.1,ry);c.stroke();break;
    case 'mantis':case 'hop':case 'katy':case 'bang':case 'grass':case 'butter':rings(c,rx,ry,4);if(sp.id!=='butter'){c.fillStyle='rgba(0,0,0,.12)';c.fillRect(-rx,-ry,rx*.55,ry*2);c.fillStyle='rgba(255,255,255,.2)';c.fillRect(rx*.45,-ry,rx,ry*2)}break;
    case 'lady':c.fillStyle='#1c1c1c';for(const [a,b,r] of [[-.45,-.45,.26],[.25,-.15,.22],[-.15,.3,.26],[.5,.42,.18],[-.65,.05,.16]]){c.beginPath();c.arc(rx*a,ry*b,rx*r,0,TAU);c.fill()}c.fillStyle='rgba(255,255,255,.3)';c.beginPath();c.ellipse(rx*.3,-ry*.55,rx*.22,ry*.12,-.4,0,TAU);c.fill();break;
    case 'fire':c.fillStyle='#f4ff9a';c.fillRect(-rx,ry*.52,rx*2,ry);c.fillStyle='rgba(255,255,255,.12)';c.fillRect(rx*.4,-ry,rx,ry*2);break;
    case 'bee':c.fillStyle='#2a2210';for(const yy of [-.2,.14,.64])c.fillRect(-rx,ry*yy,rx*2,ry*.16);c.fillStyle='rgba(255,255,255,.28)';c.beginPath();c.ellipse(rx*.3,-ry*.5,rx*.3,ry*.2,0,0,TAU);c.fill();break;
    case 'cicada':c.fillStyle='#86c85e';c.beginPath();c.moveTo(-rx,-ry*.6);c.lineTo(-rx*.2,-ry*.3);c.lineTo(rx*.1,-ry*.75);c.lineTo(rx*.4,-ry*.3);c.lineTo(rx,-ry*.6);c.lineTo(rx,-ry);c.lineTo(-rx,-ry);c.closePath();c.fill();rings(c,rx,ry,3,.25);break;
    case 'dummy':c.strokeStyle='rgba(120,85,40,.35)';c.lineWidth=1.5;for(let i=-4;i<=4;i++){c.beginPath();c.moveTo(i*rx/4,-ry);c.lineTo(i*rx/4+3,ry);c.stroke()}c.fillStyle='#8a6a3a';c.fillRect(-rx,-ry*.25,rx*2,7);c.fillRect(-rx,ry*.15,rx*2,7);break;
  }
}
function body(c,sp,g,time,P){
  const rx=sp.rx,ry=sp.ry;
  c.save();c.translate(g.BC[0],g.BC[1]);c.rotate(g.t);
  if(sp.id==='dragon')rr(c,-rx,-ry,rx*2,ry*2,rx);else{c.beginPath();c.ellipse(0,0,rx,ry,0,0,TAU);}c.fillStyle=pc(sp.col);c.fill();
  c.save();c.clip();
  if(!SIL)pattern(c,sp,rx,ry);
  const rust=P.rust||0,bc=a=>rust>0?tint(ART[a][1],'#8a7d6a',rust*.8):ART[a][1];
  if(rust>0&&!SIL){c.fillStyle=`rgba(156,82,32,${Math.min(.85,rust)})`;for(let i=0;i<16;i++){const x=((i*37)%(rx*2))-rx,y=((i*53)%(ry*2))-ry;c.beginPath();c.arc(x,y,2+(i*7)%4,0,TAU);c.fill()}}
  if(sp.arts.length){const by=ry*.36,n=sp.arts.length,w=rx*2+6;for(let i=0;i<n;i++){c.fillStyle=pc(bc(sp.arts[i]));c.fillRect(-rx-3+w*i/n,by,w/n+.6,10)}c.strokeStyle=pc(OUT);c.lineWidth=1.6;c.strokeRect(-rx-3,by,w,10)}
  c.restore();
  if(sp.id==='dragon')rr(c,-rx,-ry,rx*2,ry*2,rx);else{c.beginPath();c.ellipse(0,0,rx,ry,0,0,TAU);}c.strokeStyle=pc(OUT);c.lineWidth=3;c.stroke();
  if(sp.arts.length){
    const by=ry*.36+5,kx=Math.sqrt(Math.max(0,1-(by/ry)**2))*rx,a0=ART[sp.arts[0]][1],a1=ART[sp.arts[sp.arts.length-1]][1];
    c.lineCap='round';c.lineWidth=5;c.strokeStyle=pc(OUT);c.beginPath();c.moveTo(kx,by);c.lineTo(kx+8,by+14);c.moveTo(kx,by);c.lineTo(kx+2,by+17);c.stroke();
    c.lineWidth=3;c.strokeStyle=pc(a0);c.beginPath();c.moveTo(kx,by);c.lineTo(kx+8,by+14);c.stroke();c.strokeStyle=pc(a1);c.beginPath();c.moveTo(kx,by);c.lineTo(kx+2,by+17);c.stroke();
    rr(c,kx-5,by-6,10,12,3);fs(c,a0,2);
  }
  if(sp.glow){
    const gi=.55+.35*Math.sin(time*3.2)+(P.gl||0)*1.3,r=36+gi*30;
    c.save();c.globalCompositeOperation='lighter';const gr=c.createRadialGradient(0,ry*.75,2,0,ry*.75,r);gr.addColorStop(0,`rgba(225,255,140,${Math.min(1,.6*gi)})`);gr.addColorStop(1,'rgba(225,255,140,0)');c.fillStyle=gr;c.beginPath();c.arc(0,ry*.75,r,0,TAU);c.fill();c.restore();
  }
  if(sp.id==='bee'){c.beginPath();c.moveTo(-7,ry-4);c.lineTo(-3,ry+13);c.lineTo(3,ry-4);c.closePath();fs(c,'#2a2210',2)}
  c.restore();
}
function antennae(c,sp,time){
  const hr=sp.hr,a=sp.ant;if(a==='none')return;const w=Math.sin(time*2.6+sp.ph)*.08;
  const base=sp.head==='cone'?[[hr*1.45,-hr*1.05],[hr*1.2,-hr*1.12]]:[[hr*.25,-hr*.8],[-hr*.05,-hr*.92]];
  base.forEach(([bx,by],i)=>{
    c.save();c.translate(bx,by);c.rotate(w*(i?1:-1)+(i?-.25:0));
    c.strokeStyle=pc(OUT);c.fillStyle=pc(OUT);c.lineWidth=2.6;c.lineCap='round';c.beginPath();
    if(a==='short'){c.moveTo(0,0);c.quadraticCurveTo(6,-10,14,-15);c.stroke()}
    else if(a==='thin'){c.moveTo(0,0);c.quadraticCurveTo(4,-26,22,-34);c.stroke()}
    else if(a==='long'){c.moveTo(0,0);c.bezierCurveTo(6,-40,-20,-92,-92,-112);c.stroke()}
    else if(a==='club'){c.moveTo(0,0);c.quadraticCurveTo(5,-22,18,-32);c.stroke();c.beginPath();c.arc(18,-32,4,0,TAU);c.fill()}
    else if(a==='elbow'){c.moveTo(0,0);c.lineTo(2,-14);c.lineTo(14,-20);c.stroke();c.beginPath();c.arc(14,-20,3,0,TAU);c.fill()}
    else if(a==='sword'){c.moveTo(-3,0);c.lineTo(24,-30);c.lineTo(3,2);c.closePath();c.fillStyle=pc(sp.hc);c.fill();c.lineWidth=2;c.stroke()}
    c.restore();
  });
}
function eye1(c,x,y,r,ex,back,lid){
  if(ex===5){c.save();c.beginPath();c.ellipse(x,y,r*.82,r,0,0,TAU);c.fillStyle='#fff';c.fill();c.clip();c.fillStyle='#17130e';c.beginPath();c.arc(x+r*.22,y+r*.42,r*.42,0,TAU);c.fill();c.fillStyle=pc(lid||'#888');c.fillRect(x-r,y-r*1.2,r*2,r*1.25);c.restore();c.strokeStyle=OUT;c.lineWidth=2.2;c.beginPath();c.ellipse(x,y,r*.82,r,0,0,TAU);c.stroke();c.lineWidth=2.6;c.beginPath();c.moveTo(x-r*.8,y+r*.05);c.lineTo(x+r*.8,y+r*.05);c.stroke();return}
  if(ex===3||ex===4){c.strokeStyle=OUT;c.lineWidth=2.6;c.lineCap='round';c.beginPath();if(ex===3)c.arc(x,y+r*.35,r*.7,PI*1.15,PI*1.85);else{c.moveTo(x-r*.6,y);c.lineTo(x+r*.6,y)}c.stroke();return}
  c.fillStyle='#fff';c.beginPath();c.ellipse(x,y,r*.82,r,0,0,TAU);c.fill();c.strokeStyle=OUT;c.lineWidth=2.2;c.stroke();
  const pr=ex===2?r*.3:r*.48;c.fillStyle='#17130e';c.beginPath();c.arc(x+r*.28,y+r*.08,pr,0,TAU);c.fill();
  c.fillStyle='#fff';c.beginPath();c.arc(x+r*.4,y-r*.18,pr*.38,0,TAU);c.fill();
  if(ex===1&&!back){c.strokeStyle=OUT;c.lineWidth=3;c.beginPath();c.moveTo(x-r*.55,y-r*1.25);c.lineTo(x+r*.75,y-r*.85);c.stroke()}
}
function face(c,sp,ex,time){
  const hr=sp.hr,E=sp.eye||[hr*.38,-hr*.12,hr*.44],blink=((time+sp.ph*3)%4.3)<.12,e=(blink&&ex!==3)?4:ex;
  if(sp.id==='dragon'){
    // 큰 겹눈 두 개: 각 눈 안의 작은 점들은 낱눈의 무늬.
    for(const x of [-12,12]){
      c.beginPath();c.ellipse(x,-3,13,18,0,0,TAU);fs(c,'#146979',1.8);
      if(!SIL){c.save();c.clip();c.fillStyle='#76e5df';
        for(let y=-17;y<15;y+=6)for(let dx=-10;dx<=10;dx+=6){c.beginPath();c.arc(x+dx,y,1.3,0,TAU);c.fill()}
        c.fillStyle='#e8ffff';c.beginPath();c.ellipse(x+3,-11,4,6,.3,0,TAU);c.fill();c.restore();
        if(e===3||e===4){c.strokeStyle=OUT;c.lineWidth=2.4;c.beginPath();c.moveTo(x-7,1);c.quadraticCurveTo(x,-5,x+7,1);c.stroke()}
      }
    }
  }else{
  eye1(c,E[0]-E[2]*.95,E[1]-E[2]*.12,E[2]*.78,e,true,sp.hc);eye1(c,E[0],E[1],E[2],e,false,sp.hc);
  }
  if(SIL)return;
  const m=sp.mouth||[hr*.62,hr*.42];c.strokeStyle=sp.dark?'#f3e7cf':OUT;c.lineWidth=2.4;c.lineCap='round';
  if(ex===2){c.fillStyle='#5a1f1a';c.beginPath();c.ellipse(m[0],m[1],hr*.1,hr*.14,0,0,TAU);c.fill();c.stroke()}
  else if(ex===1){c.beginPath();c.moveTo(m[0]-hr*.18,m[1]);c.lineTo(m[0]+hr*.12,m[1]-hr*.04);c.stroke()}
  else{c.beginPath();c.arc(m[0]-hr*.05,m[1]-hr*.12,hr*.2,PI*.15,PI*.8);c.stroke()}
}
function head(c,sp,g,time,P){
  const hr=sp.hr,id=sp.id;
  c.save();c.translate(g.HD[0],g.HD[1]);c.rotate(g.t*.8);
  antennae(c,sp,time);
  if(sp.creature==='bat'||sp.creature==='rat')for(const side of [-1,1]){
    c.beginPath();if(sp.creature==='bat'){c.moveTo(side*7,-9);c.lineTo(side*17,-42);c.lineTo(side*25,-8);c.closePath()}else c.ellipse(side*15,-17,12,14,0,0,TAU);fs(c,sp.hc,2.5);
  }
  if((sp.look||id)==='rhino'){
    c.beginPath();c.moveTo(hr*.5,-hr*.55);c.quadraticCurveTo(hr*2.0,-hr*.55,hr*2.05,-hr*2.5);c.quadraticCurveTo(hr*1.55,-hr*1.0,hr*.75,hr*.3);c.closePath();fs(c,'#3a1a0b',2.5);
    c.beginPath();c.moveTo(hr*1.92,-hr*2.15);c.lineTo(hr*2.5,-hr*2.55);c.lineTo(hr*2.12,-hr*1.95);c.closePath();fs(c,'#3a1a0b',2);
    c.beginPath();c.moveTo(-hr*.6,-hr*.7);c.quadraticCurveTo(-hr*.1,-hr*1.9,hr*.5,-hr*1.75);c.quadraticCurveTo(0,-hr*1.2,hr*.1,-hr*.7);c.closePath();fs(c,'#5a2a12',2);
  }
  if(id==='stag'||id==='pine')mandible(c,hr,true);
  c.beginPath();
  if(sp.head==='tri'){c.moveTo(-hr*.95,-hr*.55);c.quadraticCurveTo(0,-hr*1.05,hr*1.05,-hr*.6);c.quadraticCurveTo(hr*.9,hr*.3,hr*.25,hr*1.0);c.quadraticCurveTo(-hr*.3,hr*.5,-hr*.95,-hr*.55);c.closePath()}
  else if(sp.head==='cone')c.ellipse(hr*.35,-hr*.35,hr*1.55,hr*.78,-.55,0,TAU);
  else if(sp.head==='wide')c.ellipse(0,0,hr*1.25,hr*.92,0,0,TAU);
  else c.arc(0,0,hr,0,TAU);
  fs(c,sp.hc,3);
  if(id==='fire'){c.beginPath();c.arc(-hr*.1,-hr*.15,hr*1.08,PI*.95,PI*1.95);c.closePath();fs(c,'#f59f00',2.6);c.fillStyle=pc('#e8590c');c.beginPath();c.arc(-hr*.15,-hr*.78,hr*.25,0,TAU);c.fill()}
  if(id==='lady'){c.fillStyle=pc('#f8f9fa');c.beginPath();c.arc(-hr*.4,-hr*.45,hr*.28,0,TAU);c.fill()}
  if(sp.creature==='spider'&&!SIL){for(const px of [-12,-4,4,12]){c.fillStyle='#33251d';c.beginPath();c.arc(px,-12,2.2,0,TAU);c.fill()}}
  if(sp.creature==='rat'&&!SIL){c.strokeStyle='#ddd8d0';c.lineWidth=1;for(let i=-1;i<=1;i++){c.beginPath();c.moveTo(10,7);c.lineTo(36,7+i*7);c.stroke()}}
  if(sp.hero&&!SIL){c.save();c.beginPath();c.ellipse(0,0,hr*1.25,hr*.92,0,0,TAU);c.clip();c.fillStyle='#e8403a';c.fillRect(-hr*1.4,-hr*.82,hr*2.8,hr*.3);c.restore();
    const wv=Math.sin(time*6)*3;c.strokeStyle='#e8403a';c.lineWidth=5;c.lineCap='round';c.beginPath();c.moveTo(-hr*1.15,-hr*.65);c.quadraticCurveTo(-hr*1.8,-hr*.9+wv,-hr*2.3,-hr*.4+wv);c.moveTo(-hr*1.15,-hr*.6);c.quadraticCurveTo(-hr*1.7,-hr*.2+wv,-hr*2.1,hr*.2+wv);c.stroke()}
  if(sp.noface&&!SIL){c.strokeStyle='#b8904f';c.lineWidth=2;for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(i*4,-hr*.9);c.lineTo(i*7,-hr*1.5);c.stroke()}c.strokeStyle='rgba(120,85,40,.5)';c.beginPath();c.moveTo(hr*.2,hr*.35);c.lineTo(hr*.7,hr*.3);c.stroke()}
  if(!sp.noface)face(c,sp,P.ex,time);
  if(id==='stag'||id==='pine')mandible(c,hr,false);
  c.restore();
}
function mandible(c,hr,back){
  c.save();if(back)c.translate(-hr*.15,-hr*.14);
  c.beginPath();c.moveTo(hr*.5,-hr*.25);c.bezierCurveTo(hr*1.4,-hr*.9,hr*2.5,-hr*.6,hr*2.3,hr*.15);c.lineTo(hr*2.0,-hr*.15);c.bezierCurveTo(hr*2.0,-hr*.45,hr*1.4,-hr*.35,hr*.7,hr*.3);c.closePath();fs(c,back?'#2a170d':'#4e2f1b',2.5);
  c.beginPath();c.moveTo(hr*1.45,-hr*.48);c.lineTo(hr*1.6,-hr*.08);c.lineTo(hr*1.78,-hr*.52);c.closePath();fs(c,back?'#2a170d':'#4e2f1b',1.8);
  c.restore();
}
function visitorDetails(c,sp,g,time){
  if(!sp.creature)return;
  c.save();c.translate(g.BC[0],g.BC[1]);c.rotate(g.t);
  if(sp.creature==='spider'){
    // Four extra walking limbs plus the two animated arms and legs = eight.
    for(const side of [-1,1])for(let i=0;i<2;i++){
      const y=-14+i*22,reach=sp.id==='huntsman'?68:51,w=Math.sin(time*3+i)*3;
      limb(c,[[side*12,y],[side*reach,y-22+w],[side*(reach+9),y+17+w]],sp.lw*.7,sp.lc);
      if(sp.id==='tarantula')for(let h=0;h<4;h++){c.strokeStyle=pc(sp.col);c.lineWidth=1.5;c.beginPath();c.moveTo(side*(25+h*6),y-6-h*3);c.lineTo(side*(28+h*6),y-15-h*3);c.stroke()}
    }
  }else if(sp.creature==='centipede'){
    for(let i=0;i<7;i++)for(const side of [-1,1]){const y=-sp.ry+8+i*12,w=Math.sin(time*4+i)*3;limb(c,[[side*8,y],[side*27,y-6],[side*36,y+5+w]],3,sp.lc)}
  }else if(sp.creature==='bat'){
    // Membranes connect the animated arms to the torso; no extra arms.
    for(const a of [g.ba,g.fa]){const sh=[a.sh[0]-g.BC[0],a.sh[1]-g.BC[1]],hd=[a.hd[0]-g.BC[0],a.hd[1]-g.BC[1]];c.beginPath();c.moveTo(...sh);c.lineTo(hd[0]-36,hd[1]-8);c.quadraticCurveTo(hd[0]-28,hd[1]+20,-18,26);c.quadraticCurveTo(-9,8,...sh);fs(c,'#57466d',2)}
  }else if(sp.creature==='rat'){
    c.strokeStyle=pc('#cb9298');c.lineWidth=5;c.beginPath();c.moveTo(-12,25);c.bezierCurveTo(-40,46,-76,5,-58,-16);c.stroke();
  }
  c.restore();
}
function drawBug(c,sp,P,time,sil){
  SIL=!!sil;const g=P.g||geo(sp,P),k=sp.s*(P.sc||1);
  c.save();c.translate(P.wx,P.wy);c.scale(P.f*k,k);c.rotate(P.rot);c.lineCap='round';c.lineJoin='round';
  visitorDetails(c,sp,g,time);
  wings(c,sp,g,time);
  const dk=mixc(sp.lc,-.28);
  drawArm(c,sp,g.ba,dk);drawLeg(c,sp,g.bl,dk);midLegs(c,sp,g,time,dk);
  body(c,sp,g,time,P);
  head(c,sp,g,time,P);
  if(!P.deferFrontLeg)drawLeg(c,sp,g.fl,sp.lc);if(!P.deferFrontArm)drawArm(c,sp,g.fa,sp.lc);
  c.restore();SIL=false;
}
function drawContactLimbs(c,a){
  const {sp,P}=a,k=sp.s*(P.sc||1);c.save();c.translate(P.wx,P.wy);c.scale(P.f*k,k);c.rotate(P.rot);
  if(P.deferFrontLeg)drawLeg(c,sp,P.g.fl,sp.lc);if(P.deferFrontArm)drawArm(c,sp,P.g.fa,sp.lc);c.restore();
}

/* ---------- 책 삽화용 배경과 장면 ---------- */
function bg(c, night, sign) {
  const g = c.createLinearGradient(0, 0, 0, H);
  if (night) { g.addColorStop(0, '#0b1631'); g.addColorStop(1, '#25395b'); } else { g.addColorStop(0, '#bfe2c6'); g.addColorStop(.7, '#eef0c6'); g.addColorStop(1, '#f6e7b4'); }
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  if (night) { c.fillStyle = 'rgba(255,255,240,.85)'; for (let i = 0; i < 46; i++) c.fillRect((i * 137.5) % W, (i * 71.3) % 250, 2, 2); c.fillStyle = '#fdf3c4'; c.beginPath(); c.arc(830, 78, 26, 0, TAU); c.fill(); c.fillStyle = '#25395b'; c.beginPath(); c.arc(842, 70, 22, 0, TAU); c.fill(); }
  c.fillStyle = night ? '#152842' : '#a3d196'; for (let i = -1; i < 10; i++) { c.beginPath(); c.arc(i * 110, G - 38 + ((i * 37) % 30 + 30) % 30, 92, 0, TAU); c.fill(); }
  c.fillStyle = night ? '#1b3150' : '#82bf7a'; for (let i = -1; i < 9; i++) { c.beginPath(); c.arc(i * 130 + 60, G - 4 + ((i * 53) % 24 + 24) % 24, 72, 0, TAU); c.fill(); }
  if (sign) {
    c.strokeStyle = night ? '#8b7a5c' : '#6b4c2e'; c.lineWidth = 3; c.beginPath(); c.moveTo(380, 0); c.lineTo(380, 42); c.moveTo(580, 0); c.lineTo(580, 42); c.stroke();
    rr(c, 340, 38, 280, 64, 10); c.fillStyle = night ? '#8a6a43' : '#c98b4a'; c.fill(); c.strokeStyle = OUT; c.lineWidth = 3; c.stroke();
    c.fillStyle = night ? '#2a1b0e' : '#3b2412'; c.font = 'bold 38px "Andika","Fredoka",sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('BUG DOJO', 480, 72);
  }
  c.fillStyle = night ? '#2d4d7a' : '#3f7fcf'; c.fillRect(0, G, W, 42); c.fillStyle = 'rgba(255,255,255,.25)'; c.fillRect(0, G, W, 4);
  c.fillStyle = night ? '#8f3b36' : '#e2574c'; c.fillRect(30, G, 90, 42); c.fillRect(840, G, 90, 42);
  c.fillStyle = night ? '#5b4026' : '#b5793f'; c.fillRect(0, G + 42, W, H - G - 42);
  c.strokeStyle = 'rgba(0,0,0,.18)'; c.lineWidth = 2; for (let i = 0; i < 12; i++) { c.beginPath(); c.moveTo(i * 90, G + 42); c.lineTo(i * 90 - 30, H); c.stroke(); }
}
function scene(canvas, o) {
  o = o || {}; const c = canvas.getContext('2d');
  if (canvas.width !== W) { canvas.width = W; canvas.height = H; }
  c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, W, H);
  const acts = o.actors || [], z = o.zoom || (acts.length >= 4 ? 1 : acts.length >= 2 ? 1.3 : 1.45);   // camera closer, like the cartoon
  let cx = acts.length ? acts.reduce((a, b) => a + (b.x || 480), 0) / acts.length : 480; const half = W / (2 * z); cx = Math.max(half, Math.min(W - half, cx));
  c.translate(W / 2, G); c.scale(z, z); c.translate(-cx, -G);
  bg(c, !!o.night, o.sign != null ? !!o.sign : z <= 1.05);
  for (const a of (o.actors || [])) {
    const sp = SP[a.id]; if (!sp) continue;
    const P = Object.assign({ x: 480, y: 0, rot: 0, f: 1, gl: 0, rust: 0 }, PO.stand, PO[a.pose] || {}, a);
    place(sp, P, G); drawBug(c, sp, P, a.time != null ? a.time : 1.2, false);
  }
  for (const t of (o.text || [])) {   // big sound words: {x, y, s:'BOOM!', col} — kept inside the picture
    const vy = G - G / z + 34 / z; t.y = Math.max(t.y, vy);
    c.save(); c.font = `bold ${t.size || 44}px "Andika","Fredoka",sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round';
    const tw = c.measureText(t.s).width / 2 + 12; t.x = Math.max(cx - half + tw, Math.min(cx + half - tw, t.x));
    if (t.emoji) { c.font = `${t.size || 54}px "Noto Color Emoji","Apple Color Emoji","Segoe UI Emoji",sans-serif`; c.fillText(t.s, t.x, t.y); c.restore(); continue; }
    c.lineWidth = 8; c.strokeStyle = '#fff'; c.strokeText(t.s, t.x, t.y); c.fillStyle = t.col || '#e8590c'; c.fillText(t.s, t.x, t.y); c.restore();
  }
}
window.BugArt = { scene, W, H, has: (id) => !!SP[id] };
})();
