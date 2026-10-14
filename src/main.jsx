import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Home, Search, Library, Plus, Heart, Play, Pause, SkipBack, SkipForward,
  Shuffle, Repeat, Repeat1, Volume2, VolumeX, ListMusic, MonitorSpeaker,
  Maximize2, ChevronLeft, ChevronRight, MoreHorizontal, Clock3, Music2,
  CirclePlus, Check, X, Menu, Disc3, Headphones, Radio, Sparkles, ListFilter,
  ArrowDownWideNarrow, PanelLeftClose, ExternalLink
} from 'lucide-react';
import './style.css';

const art = (id, w=640) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;
const tracks = [
  {id:'t1', title:'Midnight City', artist:'M83', album:'Hurry Up, We’re Dreaming', duration:244, cover:art('photo-1519608487953-e999c86e7455'), audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', color:'#344e65'},
  {id:'t2', title:'After Dark', artist:'Mr.Kitty', album:'Time', duration:251, cover:art('photo-1519608487953-e999c86e7455'), audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', color:'#342b4f'},
  {id:'t3', title:'The Less I Know The Better', artist:'Tame Impala', album:'Currents', duration:216, cover:art('photo-1519681393784-d120267933ba'), audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', color:'#5b4554'},
  {id:'t4', title:'505', artist:'Arctic Monkeys', album:'Favourite Worst Nightmare', duration:253, cover:art('photo-1470225620780-dba8ba36b745'), audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', color:'#4e3530'},
  {id:'t5', title:'Sweater Weather', artist:'The Neighbourhood', album:'I Love You.', duration:240, cover:art('photo-1470252649378-9c29740c9fa8'), audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', color:'#34443d'},
  {id:'t6', title:'Do I Wanna Know?', artist:'Arctic Monkeys', album:'AM', duration:272, cover:art('photo-1519608487953-e999c86e7455'), audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', color:'#28282a'},
  {id:'t7', title:'Little Dark Age', artist:'MGMT', album:'Little Dark Age', duration:299, cover:art('photo-1500530855697-b586d89ba3ee'), audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', color:'#51405b'},
  {id:'t8', title:'505 (Live)', artist:'Arctic Monkeys', album:'Live at the Royal Albert Hall', duration:318, cover:art('photo-1470225620780-dba8ba36b745'), audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', color:'#4e3530'},
  {id:'t9', title:'Chamber of Reflection', artist:'Mac DeMarco', album:'Salad Days', duration:219, cover:art('photo-1470252649378-9c29740c9fa8'), audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', color:'#4a655b'},
  {id:'t10', title:'Genesis', artist:'Grimes', album:'Visions', duration:251, cover:art('photo-1519681393784-d120267933ba'), audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', color:'#443d6a'},
];
const albums = [
  {id:'a1', title:'Noites em neon', subtitle:'Uma viagem pela noite', cover:art('photo-1519608487953-e999c86e7455'), tracks:[tracks[0],tracks[1],tracks[6],tracks[9]]},
  {id:'a2', title:'Indie para sempre', subtitle:'Guitarras, sentimentos e tudo mais', cover:art('photo-1470225620780-dba8ba36b745'), tracks:[tracks[3],tracks[4],tracks[5],tracks[8]]},
  {id:'a3', title:'Horizonte alternativo', subtitle:'Som para perder a noção do tempo', cover:art('photo-1519681393784-d120267933ba'), tracks:[tracks[2],tracks[6],tracks[8],tracks[9]]},
  {id:'a4', title:'Fim de tarde', subtitle:'Uma trilha para desacelerar', cover:art('photo-1470252649378-9c29740c9fa8'), tracks:[tracks[4],tracks[8],tracks[2],tracks[0]]},
  {id:'a5', title:'No volume máximo', subtitle:'Rock alternativo sem pausa', cover:art('photo-1500530855697-b586d89ba3ee'), tracks:[tracks[3],tracks[5],tracks[7],tracks[1]]},
  {id:'a6', title:'Dream pop', subtitle:'Camadas de som e atmosfera', cover:art('photo-1500530855697-b586d89ba3ee'), tracks:[tracks[9],tracks[2],tracks[6],tracks[1]]},
];
const starterPlaylists = [
  {id:'liked', name:'Músicas curtidas', description:'Suas faixas favoritas em um só lugar', cover:null, tracks:[]},
  {id:'mix1', name:'Seu mix alternativo', description:'Uma mistura feita para você', cover:albums[1].cover, tracks:[tracks[3],tracks[4],tracks[5]]},
  {id:'mix2', name:'Noite chuvosa', description:'Sons para ouvir olhando pela janela', cover:albums[0].cover, tracks:[tracks[1],tracks[8],tracks[9]]},
];
const fmt = n => { if (!Number.isFinite(n)) return '0:00'; const m=Math.floor(n/60); return `${m}:${String(Math.floor(n%60)).padStart(2,'0')}`; };
const readStore = (key, fallback) => { try { const v=localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } };

function App() {
  const [page,setPage] = useState({type:'home'});
  const [query,setQuery] = useState('');
  const [playing,setPlaying] = useState(false);
  const [current,setCurrent] = useState(tracks[0]);
  const [queue,setQueue] = useState(tracks.slice(1,6));
  const [position,setPosition] = useState(0);
  const [duration,setDuration] = useState(tracks[0].duration);
  const [volume,setVolume] = useState(.72);
  const [shuffle,setShuffle] = useState(false);
  const [repeat,setRepeat] = useState(0);
  const [liked,setLiked] = useState(()=>readStore('spotfly-liked',['t1','t3']));
  const [playlists,setPlaylists] = useState(()=>readStore('spotfly-playlists',starterPlaylists));
  const [libraryOpen,setLibraryOpen] = useState(true);
  const [queueOpen,setQueueOpen] = useState(false);
  const [toast,setToast] = useState('');
  const [filter,setFilter] = useState('Tudo');
  const [sort,setSort] = useState('Recentes');
  const [mobileMenu,setMobileMenu] = useState(false);
  const audioRef = useRef(null);
  const seekRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(()=>localStorage.setItem('spotfly-liked',JSON.stringify(liked)),[liked]);
  useEffect(()=>localStorage.setItem('spotfly-playlists',JSON.stringify(playlists)),[playlists]);
  useEffect(()=>{ if(audioRef.current) audioRef.current.volume=volume; },[volume]);
  useEffect(()=>{ if(playing && audioRef.current) { const p=audioRef.current.play(); if(p?.catch) p.catch(()=>setPlaying(false)); } else if(audioRef.current) audioRef.current.pause(); },[playing,current?.id]);
  useEffect(()=>{ if(!toast) return; const t=setTimeout(()=>setToast(''),2400); return ()=>clearTimeout(t); },[toast]);
  useEffect(()=>{ const el=audioRef.current; if(!el) return; const time=()=>setPosition(el.currentTime||0); const meta=()=>setDuration(el.duration||current.duration); el.addEventListener('timeupdate',time); el.addEventListener('loadedmetadata',meta); return ()=>{el.removeEventListener('timeupdate',time);el.removeEventListener('loadedmetadata',meta)}; },[current]);

  const likedTracks = tracks.filter(t=>liked.includes(t.id));
  const allPlaylists = playlists;
  const visibleTracks = useMemo(()=>{
    const q=query.trim().toLowerCase();
    if(page.type==='liked') return likedTracks;
    if(page.type==='playlist') return (playlists.find(p=>p.id===page.id)?.tracks||[]);
    if(page.type==='album') return page.album.tracks;
    if(page.type==='artist') return tracks.filter(t=>t.artist===page.name);
    if(page.type==='search') return q ? tracks.filter(t=>[t.title,t.artist,t.album].some(s=>s.toLowerCase().includes(q))) : [];
    return tracks;
  },[page,query,liked,playlists]);
  const go = p => { setPage(p); setMobileMenu(false); if(p.type!=='search') setQuery(''); };
  const playTrack = (track,list=tracks) => {
    if(!track) return;
    const isSame=current?.id===track.id;
    if(isSame) setPlaying(v=>!v); else { setCurrent(track); setPosition(0); setDuration(track.duration); setPlaying(true); }
    setQueue(list.filter(t=>t.id!==track.id));
  };
  const nextTrack = () => {
    if(repeat===1 && current) { setPosition(0); if(audioRef.current) audioRef.current.currentTime=0; setPlaying(true); return; }
    const source=queue.length ? [current,...queue] : tracks;
    const index=source.findIndex(t=>t.id===current?.id);
    const next=shuffle ? source[Math.floor(Math.random()*source.length)] : source[(index+1)%source.length];
    setCurrent(next); setPosition(0); setPlaying(true);
    if(!shuffle) setQueue(source.filter(t=>t.id!==next.id));
  };
  const previousTrack = () => {
    if(position>3) { setPosition(0); if(audioRef.current) audioRef.current.currentTime=0; return; }
    const prev=tracks[(tracks.findIndex(t=>t.id===current?.id)-1+tracks.length)%tracks.length];
    setCurrent(prev); setPosition(0); setPlaying(true);
  };
  const toggleLike = track => { setLiked(old=>old.includes(track.id)?old.filter(id=>id!==track.id):[...old,track.id]); setToast(liked.includes(track.id)?'Removida das músicas curtidas':'Adicionada às músicas curtidas'); };
  const makePlaylist = () => {
    const name=window.prompt('Qual será o nome da playlist?');
    if(!name?.trim()) return;
    const p={id:'p'+Date.now(),name:name.trim(),description:'Criada por você',cover:null,tracks:[]};
    setPlaylists(old=>[...old,p]); go({type:'playlist',id:p.id}); setToast('Playlist criada');
  };
  const addToPlaylist = track => {
    const target=playlists.find(p=>p.id!=='liked');
    if(!target) { setToast('Crie uma playlist primeiro'); return; }
    setPlaylists(old=>old.map(p=>p.id===target.id?{...p,tracks:p.tracks.some(t=>t.id===track.id)?p.tracks:[...p.tracks,track]}:p));
    setToast(`Adicionada a “${target.name}”`);
  };
  const playAll = list => { if(list?.length) { setCurrent(list[0]);setPosition(0);setQueue(list.slice(1));setPlaying(true); } };
  const fmtList = page.type==='liked'?'Músicas curtidas':page.type==='playlist'?playlists.find(p=>p.id===page.id)?.name:page.type==='album'?page.album.title:page.type==='artist'?page.name:'';
  const playlist = page.type==='playlist' ? playlists.find(p=>p.id===page.id) : null;

  function TrackRows({items,showAlbum=true}) {
    if(!items.length) return <div className="empty-state"><Music2 size={28}/><h3>Nada por aqui ainda</h3><p>Quando houver músicas, elas vão aparecer nesta lista.</p></div>;
    return <div className="track-list">
      <div className="track-head"><span>#</span><span>Título</span>{showAlbum&&<span className="album-col">Álbum</span>}<span><Clock3 size={15}/></span><span></span></div>
      {items.map((t,i)=><div className={'track-row '+(current?.id===t.id?'is-current':'')} key={t.id} onDoubleClick={()=>{setCurrent(t);setPosition(0);setPlaying(true);setQueue(items.filter(x=>x.id!==t.id));}}>
        <span className="track-index"><span className="row-number">{i+1}</span><button className="row-play" aria-label={'Tocar '+t.title} onClick={()=>playTrack(t,items)}>{playing&&current?.id===t.id?<Pause size={15} fill="currentColor"/>:<Play size={15} fill="currentColor"/>}</button></span>
        <div className="track-title"><img src={t.cover} alt="" /><div><button className="text-button title-button" onClick={()=>playTrack(t,items)}>{t.title}</button><button className="text-button muted artist-link" onClick={()=>go({type:'artist',name:t.artist})}>{t.artist}</button></div></div>
        {showAlbum&&<button className="text-button track-album" onClick={()=>go({type:'album',album:albums.find(a=>a.tracks.some(x=>x.id===t.id))||albums[0]})}>{t.album}</button>}
        <span className="track-duration">{fmt(t.duration)}</span>
        <div className="track-actions"><button className={'icon-button like-button '+(liked.includes(t.id)?'liked':'')} aria-label="Curtir" onClick={()=>toggleLike(t)}>{liked.includes(t.id)?<Heart size={16} fill="currentColor"/>:<Heart size={16}/>}</button><button className="icon-button" aria-label="Mais opções" onClick={()=>addToPlaylist(t)}><MoreHorizontal size={18}/></button></div>
      </div>)}
    </div>;
  }
  function Cards({items}) {
    return <div className="card-grid">{items.map((a)=><button className="music-card" key={a.id} onClick={()=>go({type:'album',album:a})}><div className="card-art"><img src={a.cover} alt=""/><span className="card-play"><Play fill="currentColor" size={22}/></span></div><strong>{a.title}</strong><span>{a.subtitle}</span></button>)}</div>;
  }
  function PageContent() {
    if(page.type==='home') return <><section className="welcome"><div><span className="eyebrow"><Sparkles size={14}/> SEU ESPAÇO MUSICAL</span><h1>Boa música.<br/><em>Do seu jeito.</em></h1><p>Encontre o som certo para cada momento.</p></div><div className="welcome-orb"><Disc3 size={118} strokeWidth={1}/></div></section><section className="quick-grid">{albums.slice(0,6).map(a=><button key={a.id} className="quick-item" onClick={()=>{go({type:'album',album:a});playAll(a.tracks)}}><img src={a.cover} alt=""/><strong>{a.title}</strong><span className="quick-play"><Play size={17} fill="currentColor"/></span></button>)}</section><section className="content-section"><div className="section-heading"><div><h2>Feito para você</h2><p>Uma seleção para entrar no clima.</p></div><button className="text-button show-all" onClick={()=>go({type:'explore'})}>Mostrar tudo</button></div><Cards items={albums}/></section><section className="content-section"><div className="section-heading"><div><h2>Continue explorando</h2><p>Mais sons para descobrir.</p></div></div><div className="horizontal-cards">{albums.slice().reverse().map(a=><button className="small-card" key={a.id} onClick={()=>go({type:'album',album:a})}><img src={a.cover} alt=""/><strong>{a.title}</strong><span>{a.subtitle}</span></button>)}</div></section></>;
    if(page.type==='search') return <><div className="page-title"><h1>Buscar</h1><p>Encontre sua próxima música favorita.</p></div>{query.trim()?<section className="content-section"><div className="section-heading"><h2>Resultados para “{query}”</h2><span className="muted">{visibleTracks.length} faixas</span></div><TrackRows items={visibleTracks}/></section>:<section className="content-section"><h2>Explore por clima</h2><div className="genre-grid">{[['Feito para você','#493f77'],['Rock alternativo','#813f35'],['Indie','#3e6254'],['Eletrônica','#315a72'],['Para relaxar','#8b7650'],['Descobertas','#74526f']].map(([name,color])=><button key={name} style={{'--genre':color}} onClick={()=>{setQuery(name==='Rock alternativo'?'Arctic Monkeys':name==='Indie'?'Tame Impala':name==='Eletrônica'?'M83':'');}}>{name}<Music2 size={40}/></button>)}</div></section>}</>;
    if(page.type==='explore') return <><div className="page-title"><h1>Explorar</h1><p>Álbuns, sons e novas descobertas.</p></div><Cards items={albums}/><section className="content-section"><div className="section-heading"><h2>Faixas em destaque</h2><button className="primary-button small" onClick={()=>playAll(tracks)}><Play size={15} fill="currentColor"/> Tocar tudo</button></div><TrackRows items={tracks}/></section></>;
    if(page.type==='liked'||page.type==='playlist'||page.type==='album'||page.type==='artist') {
      const cover=page.type==='liked'?null:page.type==='playlist'?playlist?.cover:page.type==='album'?page.album.cover:tracks.find(t=>t.artist===page.name)?.cover;
      const title=page.type==='liked'?'Músicas curtidas':page.type==='playlist'?playlist?.name||'Playlist':page.type==='album'?page.album.title:page.name;
      const subtitle=page.type==='liked'?'As faixas que você guardou':page.type==='playlist'?playlist?.description||'Sua playlist':page.type==='album'?page.album.subtitle:'Artista';
      return <><div className={'hero-detail '+(page.type==='liked'?'liked-hero':'')}><div className="detail-cover">{cover?<img src={cover} alt=""/>:<Heart size={76} fill="white" strokeWidth={0}/>}</div><div className="detail-info"><span className="eyebrow">{page.type==='album'?'ÁLBUM':page.type==='artist'?'ARTISTA':page.type==='playlist'?'PLAYLIST':'PLAYLIST'}</span><h1>{title}</h1><p>{subtitle}</p><span className="detail-meta">Spotfly · {visibleTracks.length} músicas</span></div></div><div className="detail-controls"><button className="big-play" onClick={()=>playAll(visibleTracks)} aria-label="Tocar"><Play size={25} fill="currentColor"/></button>{page.type!=='liked'&&page.type!=='artist'&&<button className="icon-button" onClick={()=>setToast('Opções da coleção')}><MoreHorizontal size={24}/></button>}<button className="icon-button" onClick={()=>{setSort(v=>v==='Recentes'?'Título':'Recentes')}}><ArrowDownWideNarrow size={20}/></button><span className="muted">{sort==='Título'?'Ordenado por título':'Ordenado por recentes'}</span></div><TrackRows items={visibleTracks}/></>;
    }
    if(page.type==='queue') return <><div className="page-title"><h1>Fila</h1><p>O que vem a seguir.</p></div><section className="content-section"><h2>Tocando agora</h2><TrackRows items={current?[current]:[]}/><div className="section-heading"><h2>Próximas</h2><button className="text-button" onClick={()=>setQueue([])}>Limpar fila</button></div><TrackRows items={queue}/></section></>;
    return <><div className="page-title"><h1>Descobrir</h1><p>Seu próximo som favorito pode estar aqui.</p></div><Cards items={albums}/></>;
  }

  return <div className="app-shell">
    <audio ref={audioRef} src={current?.audio} onEnded={nextTrack} onError={()=>{if(playing)setToast('A amostra de áudio não pôde ser carregada')}} preload="metadata"/>
    <aside className={'sidebar '+(mobileMenu?'mobile-open':'')}>
      <div className="brand-row"><button className="brand" onClick={()=>go({type:'home'})}><span className="brand-mark"><Disc3 size={24}/></span><span>spotfly<span className="brand-dot">.</span></span></button><button className="icon-button mobile-close" onClick={()=>setMobileMenu(false)}><X/></button></div>
      <nav className="main-nav"><button className={page.type==='home'?'active':''} onClick={()=>go({type:'home'})}><Home size={21}/><span>Início</span></button><button className={page.type==='search'||page.type==='explore'?'active':''} onClick={()=>go({type:'search'})}><Search size={21}/><span>Buscar</span></button></nav>
      <div className="library-head"><button className="library-title" onClick={()=>setLibraryOpen(v=>!v)}><Library size={21}/><span>Sua biblioteca</span></button><button className="icon-button" title="Criar playlist" onClick={makePlaylist}><Plus size={20}/></button><button className="icon-button collapse-button" title="Recolher biblioteca" onClick={()=>setLibraryOpen(v=>!v)}><PanelLeftClose size={18}/></button></div>
      {libraryOpen&&<div className="library-content"><div className="library-chips">{['Tudo','Playlists','Álbuns'].map(x=><button key={x} className={filter===x?'selected':''} onClick={()=>setFilter(x)}>{x}</button>)}</div><div className="library-tools"><button className="icon-button" onClick={()=>setSort(v=>v==='Recentes'?'Título':'Recentes')} title="Ordenar"><Search size={16}/></button><button className="text-button" onClick={()=>setSort(v=>v==='Recentes'?'Título':'Recentes')}>{sort}<ListFilter size={15}/></button></div><div className="library-items">
        {filter!=='Álbuns'&&allPlaylists.filter(p=>filter==='Tudo'||filter==='Playlists').map(p=><button className={'library-item '+((page.type==='liked'&&p.id==='liked')||(page.type==='playlist'&&page.id===p.id)?'selected':'')} key={p.id} onClick={()=>p.id==='liked'?go({type:'liked'}):go({type:'playlist',id:p.id})}><span className={'library-thumb '+(p.id==='liked'?'liked-thumb':'')}>{p.id==='liked'?<Heart size={19} fill="white"/>:p.cover?<img src={p.cover} alt=""/>:<Music2 size={20}/>}</span><span className="library-copy"><strong>{p.name}</strong><small>Playlist · {p.tracks.length} músicas</small></span></button>)}
        {filter!=='Playlists'&&albums.slice(0,filter==='Álbuns'?albums.length:3).map(a=><button className="library-item" key={a.id} onClick={()=>go({type:'album',album:a})}><span className="library-thumb"><img src={a.cover} alt=""/></span><span className="library-copy"><strong>{a.title}</strong><small>Álbum · Spotfly</small></span></button>)}
      </div></div>}
      <div className="sidebar-bottom"><div className="offline-note"><span className="status-dot"/><span>Seu espaço, seu som.</span></div><span className="version-label">SPOTFLY PREVIEW · 0.1</span></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><div className="top-left"><button className="icon-button mobile-menu-button" onClick={()=>setMobileMenu(true)}><Menu/></button><button className="round-nav" onClick={()=>go({type:'home'})}><ChevronLeft size={20}/></button><button className="round-nav" onClick={()=>go({type:'explore'})}><ChevronRight size={20}/></button><label className={'global-search '+(page.type==='search'?'search-active':'')}><Search size={19}/><input value={query} onFocus={()=>{if(page.type!=='search')setPage({type:'search'})}} onChange={e=>{setQuery(e.target.value);if(page.type!=='search')setPage({type:'search'});}} placeholder="O que você quer ouvir?" aria-label="Buscar músicas, artistas e álbuns"/>{query&&<button className="icon-button" onClick={()=>setQuery('')}><X size={16}/></button>}<kbd>Ctrl K</kbd></label></div><div className="top-actions"><button className="outline-pill" onClick={()=>setToast('O Spotfly é um projeto independente em desenvolvimento')}><Sparkles size={15}/> Sobre o Spotfly</button><button className="profile-button" title="Perfil de demonstração">V</button></div></header>
      <div className="scroll-content"><PageContent/><footer className="footer"><span>Spotfly · Uma experiência musical independente.</span><span>Protótipo de estudo · Sem vínculo com Spotify.</span></footer></div>
    </main>
    <footer className="player-bar">
      <div className="now-playing">{current&&<><img src={current.cover} alt="Capa do álbum"/><div className="now-copy"><button className="text-button title-button" onClick={()=>go({type:'album',album:albums.find(a=>a.tracks.some(t=>t.id===current.id))||albums[0]})}>{current.title}</button><button className="text-button muted artist-link" onClick={()=>go({type:'artist',name:current.artist})}>{current.artist}</button></div><button className={'icon-button player-like '+(liked.includes(current.id)?'liked':'')} onClick={()=>toggleLike(current)} aria-label="Curtir música">{liked.includes(current.id)?<Heart size={17} fill="currentColor"/>:<Heart size={17}/>}</button></>}</div>
      <div className="player-center"><div className="player-controls"><button className={'icon-button control-muted '+(shuffle?'control-active':'')} title="Aleatório" onClick={()=>setShuffle(v=>!v)}><Shuffle size={17}/></button><button className="icon-button" title="Anterior" onClick={previousTrack}><SkipBack size={19} fill="currentColor"/></button><button className="play-toggle" title={playing?'Pausar':'Tocar'} onClick={()=>setPlaying(v=>!v)}>{playing?<Pause size={19} fill="currentColor"/>:<Play size={19} fill="currentColor"/>}</button><button className="icon-button" title="Próxima" onClick={nextTrack}><SkipForward size={19} fill="currentColor"/></button><button className={'icon-button control-muted '+(repeat?'control-active':'')} title="Repetir" onClick={()=>setRepeat(v=>(v+1)%3)}>{repeat===2?<Repeat1 size={17}/>:<Repeat size={17}/>}</button></div><div className="progress-row"><span>{fmt(position)}</span><input ref={seekRef} type="range" min="0" max={duration||1} value={Math.min(position,duration||1)} onChange={e=>{const n=Number(e.target.value);setPosition(n);if(audioRef.current)audioRef.current.currentTime=n;}} aria-label="Progresso da música"/><span>{fmt(duration)}</span></div></div>
      <div className="player-extra"><button className={'icon-button '+(queueOpen?'control-active':'')} title="Fila" onClick={()=>{setQueueOpen(v=>!v);go({type:'queue'});}}><ListMusic size={18}/></button><button className="icon-button" title="Dispositivo de reprodução" onClick={()=>setToast('Reprodução local no navegador')}><MonitorSpeaker size={18}/></button><Volume2 size={18} className="volume-icon"/><input type="range" min="0" max="1" step=".01" value={volume} onChange={e=>setVolume(Number(e.target.value))} aria-label="Volume"/><button className="icon-button expand-button" title="Expandir" onClick={()=>setToast('A visualização expandida estará disponível em uma próxima versão')}><Maximize2 size={17}/></button></div>
    </footer>
    {queueOpen&&<div className="queue-popover"><div className="queue-popover-head"><strong>Fila</strong><button className="icon-button" onClick={()=>setQueueOpen(false)}><X size={18}/></button></div><p className="muted">Tocando agora</p><div className="queue-current"><img src={current.cover} alt=""/><span><strong>{current.title}</strong><small>{current.artist}</small></span></div><p className="muted">A seguir</p>{queue.slice(0,5).map(t=><button className="queue-item" key={t.id} onClick={()=>playTrack(t,queue)}><img src={t.cover} alt=""/><span><strong>{t.title}</strong><small>{t.artist}</small></span></button>)}</div>}
    {toast&&<div className="toast"><Check size={17}/>{toast}<button className="icon-button" onClick={()=>setToast('')}><X size={15}/></button></div>}
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
