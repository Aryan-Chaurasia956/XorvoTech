import { useRef, useEffect } from 'react';

const LetterGlitch = ({
  glitchColors = ['#2b4539', '#61dca3', '#61b3dc'],
  className = '',
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789',
  backgroundColor = 'transparent',
}) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const letters = useRef([]);
  const grid = useRef({ c: 0, r: 0 });
  const ctx = useRef(null);
  const last = useRef(Date.now());
  const pool = Array.from(characters);
  const fontSize = 16, cw = 10, ch = 20;

  const rnd = a => a[Math.floor(Math.random() * a.length)];
  const hexToRgb = h => {
    if (!h) return null;
    h = h.replace(/^#/, '');
    if (h.length === 3) h = h.split('').map(s => s + s).join('');
    const m = h.match(/.{2}/g);
    return m ? { r: parseInt(m[0], 16), g: parseInt(m[1], 16), b: parseInt(m[2], 16) } : null;
  };
  const mix = (s, e, t) => `rgb(${Math.round(s.r + (e.r - s.r) * t)},${Math.round(s.g + (e.g - s.g) * t)},${Math.round(s.b + (e.b - s.b) * t)})`;

  const calcGrid = (w, h) => ({ c: Math.ceil(w / cw), r: Math.ceil(h / ch) });
  const initLetters = (c, r) => {
    grid.current = { c, r };
    const tot = c * r;
    letters.current = Array.from({ length: tot }, () => {
      const col = rnd(glitchColors);
      return { ch: rnd(pool), color: col, target: rnd(glitchColors), p: 1 };
    });
  };

  const resize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement || document.body;
    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.current = canvas.getContext('2d');
    if (ctx.current && dpr !== 1) {
      ctx.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    ctx.current.font = `${fontSize}px monospace`;
    ctx.current.textBaseline = 'top';
    const { c, r } = calcGrid(rect.width, rect.height);
    initLetters(c, r);
    draw();
  };

  const draw = () => {
    const c = canvasRef.current;
    if (!c || !ctx.current) return;
    const { width, height } = c.getBoundingClientRect();
    ctx.current.clearRect(0, 0, width, height);
    const g = grid.current;
    ctx.current.font = `${fontSize}px monospace`;
    letters.current.forEach((L, i) => {
      const x = (i % g.c) * cw;
      const y = Math.floor(i / g.c) * ch;
      ctx.current.fillStyle = L.color;
      ctx.current.fillText(L.ch, x, y);
    });
  };

  const tickUpdate = () => {
    const len = letters.current.length;
    if (!len) return;
    const upd = Math.max(1, Math.floor(len * 0.05));
    for (let i = 0; i < upd; i++) {
      const idx = Math.floor(Math.random() * len);
      const L = letters.current[idx];
      if (!L) continue;
      L.ch = rnd(pool);
      L.target = rnd(glitchColors);
      L.p = smooth ? 0 : 1;
      if (!smooth) L.color = L.target;
    }
  };

  const smoothStep = () => {
    let redraw = false;
    letters.current.forEach(L => {
      if (L.p < 1) {
        L.p = Math.min(1, L.p + 0.05);
        const s = hexToRgb(L.color);
        const e = hexToRgb(L.target);
        if (s && e) {
          L.color = mix(s, e, L.p);
          redraw = true;
        }
      }
    });
    return redraw;
  };

  const animate = () => {
    const now = Date.now();
    if (now - last.current >= glitchSpeed) {
      tickUpdate();
      draw();
      last.current = now;
    }
    if (smooth && smoothStep()) draw();
    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
    // eslint-disable-next-line
  }, [glitchSpeed, smooth, characters, glitchColors]);

  const C = { position: 'absolute', inset: 0, width: '100%', height: '100%', background: backgroundColor, overflow: 'hidden' };
  const canvasStyle = { display: 'block', width: '100%', height: '100%' };
  const outer = { position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)' };
  const center = { position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)' };

  return (
    <div style={C} className={className}>
      <canvas ref={canvasRef} style={canvasStyle} />
      {outerVignette && <div style={outer} />}
      {centerVignette && <div style={center} />}
    </div>
  );
};

export default LetterGlitch;