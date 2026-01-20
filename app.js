import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/** =========================
 *  Supabase
 *  ========================= */
const SUPABASE_URL = "https://ibjjbgthwmpvifbzxhwa.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliampiZ3Rod21wdmlmYnp4aHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NjExMTcsImV4cCI6MjA4NDQzNzExN30.Bb3fyGlJ_16gao6W8P0yaMotsD5DIEeTJVan3m5OKQw";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce",
    storageKey: "planner_session_v1",
  },
});

/** =========================
 *  Font (Noonnu: 그리운 몽토리체)
 *  ========================= */
(function injectFontAndBaseStyle() {
  const css = `
  @font-face {
    font-family: 'NostalgicMongtori';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-1@1.0/Griun_Mongtori-Rg.woff2') format('woff2');
    font-weight: normal;
    font-display: swap;
  }
  :root {
    --ink: 15 23 42; /* slate-900 */
    --muted: 100 116 139; /* slate-500 */
    --glass: 255 255 255;
    --v1: 124 58 237; /* violet-600 */
    --p1: 236 72 153; /* pink-500 */
  }
  html, body { height: 100%; }
  body {
    font-family: 'NostalgicMongtori', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    letter-spacing: -0.01em;
  }
  /* smoother */
  * { -webkit-tap-highlight-color: transparent; }

  /* custom scroll */
  ::-webkit-scrollbar { width: 10px; height: 10px; }
  ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 999px; }
  ::-webkit-scrollbar-track { background: rgba(255,255,255,0.35); border-radius: 999px; }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
})();

/** =========================
 *  Small utils
 *  ========================= */
const app = document.getElementById("app");

const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

function timeToHHMM(t) {
  if (!t) return "";
  return String(t).slice(0, 5);
}
function hhmmToTime(hhmm) {
  if (!hhmm) return null;
  return hhmm.length === 5 ? `${hhmm}:00` : hhmm;
}
function moneyFmt(x) {
  const v = Number(x);
  const n = Number.isFinite(v) ? v : 0;
  return Math.round(n).toLocaleString("ko-KR");
}
function n(x) {
  const v = Number(x);
  return Number.isFinite(v) ? v : 0;
}

/** =========================
 *  Icon set (Iconly 느낌: 라인 + 그라데이션)
 *  ========================= */
let __iconSeq = 0;
function icon(name, size = 20) {
  __iconSeq += 1;
  const gid = `g${__iconSeq}`;
  const common = `width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg" stroke="url(#${gid})" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"`;

  const grad = `
    <defs>
      <linearGradient id="${gid}" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stop-color="rgb(var(--v1))"/>
        <stop offset="1" stop-color="rgb(var(--p1))"/>
      </linearGradient>
    </defs>
  `;

  const paths = {
    home: `<path d="M9 21h6"/><path d="M4 11.5 12 4l8 7.5"/><path d="M6.5 10.8V20a1 1 0 0 0 1 1H9v-6h6v6h1.5a1 1 0 0 0 1-1v-9.2"/>`,
    calendar: `<path d="M7 3v3M17 3v3"/><path d="M4.5 7.5h15"/><path d="M5 6.5h14a1.5 1.5 0 0 1 1.5 1.5v12A2 2 0 0 1 18.5 22h-13A2 2 0 0 1 3.5 20V8A1.5 1.5 0 0 1 5 6.5z"/><path d="M7.5 11.5h3"/><path d="M7.5 15h3"/><path d="M13.5 11.5h3"/><path d="M13.5 15h3"/>`,
    checklist: `<path d="M9 6h11"/><path d="M9 12h11"/><path d="M9 18h11"/><path d="M4 6l1.2 1.2L7.5 5"/><path d="M4 12l1.2 1.2L7.5 11"/><path d="M4 18l1.2 1.2L7.5 17"/>`,
    wallet: `<path d="M3.5 8.5V7A2.5 2.5 0 0 1 6 4.5h12.5A2 2 0 0 1 20.5 6.5v1"/><path d="M3.5 8.5h15.5a1.5 1.5 0 0 1 1.5 1.5v8A2.5 2.5 0 0 1 18 20.5H6A2.5 2.5 0 0 1 3.5 18V8.5z"/><path d="M16.5 14h4"/><path d="M18.5 12.5v3"/>`,
    building: `<path d="M4.5 21h15"/><path d="M6 21V5.5A2 2 0 0 1 8 3.5h8A2 2 0 0 1 18 5.5V21"/><path d="M9 7h.01"/><path d="M12 7h.01"/><path d="M15 7h.01"/><path d="M9 10h.01"/><path d="M12 10h.01"/><path d="M15 10h.01"/><path d="M9 13h.01"/><path d="M12 13h.01"/><path d="M15 13h.01"/><path d="M10 21v-4h4v4"/>`,
    doc: `<path d="M8 3.5h7l3 3V20A2 2 0 0 1 16 22H8A2 2 0 0 1 6 20V5.5A2 2 0 0 1 8 3.5z"/><path d="M15 3.5V7h3"/><path d="M9 11h6"/><path d="M9 14.5h6"/><path d="M9 18h4"/>`,
    note: `<path d="M7.5 4.5h9A2 2 0 0 1 18.5 6.5v11A4 4 0 0 1 14.5 21.5h-7A2 2 0 0 1 5.5 19.5v-13A2 2 0 0 1 7.5 4.5z"/><path d="M8.5 9h7"/><path d="M8.5 12.5h7"/><path d="M8.5 16h5"/>`,
    spark: `<path d="M12 2l1.2 5.2L18 8l-4.8.8L12 14l-1.2-5.2L6 8l4.8-.8L12 2z"/><path d="M4 13l.7 2.7L7 16l-2.3.3L4 19l-.7-2.7L1 16l2.3-.3L4 13z"/><path d="M19 13l.7 2.7L22 16l-2.3.3L19 19l-.7-2.7L16 16l2.3-.3L19 13z"/>`,
    trash: `<path d="M4 7h16"/><path d="M10 11v7"/><path d="M14 11v7"/><path d="M6 7l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14"/><path d="M9 7V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V7"/>`,
    plus: `<path d="M12 5v14"/><path d="M5 12h14"/>`,
    chevron: `<path d="M9 6l6 6-6 6"/>`,
    clock: `<path d="M12 7v6l4 2"/><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"/>`,
    tag: `<path d="M20 12l-8 8-10-10V4h6l12 8z"/><path d="M7.5 7.5h.01"/>`,
  };

  const body = paths[name] || paths.note;
  return `<svg ${common}>${grad}${body}</svg>`;
}

/** =========================
 *  UI tokens (크기 전반적으로 ↓)
 *  ========================= */
const UI = {
  // layout
  pageWrap: "min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10",
  shell: "w-full max-w-6xl grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 md:gap-5",

  // glass card
  card:
    "backdrop-blur-2xl bg-white/60 border border-white/60 " +
    "shadow-[0_20px_70px_rgba(124,58,237,0.12),0_12px_28px_rgba(0,0,0,0.10)] " +
    "rounded-[26px]",
  cardInner: "p-5 sm:p-6",

  // typography (smaller)
  h1: "text-[18px] sm:text-[19px] font-semibold tracking-tight text-slate-900",
  h2: "text-[13px] font-semibold tracking-tight text-slate-900",
  sub: "text-[11.5px] text-slate-600/90",
  label: "text-[11px] text-slate-600/90",

  // nav
  navLink:
    "flex items-center gap-2 px-3.5 py-2.5 rounded-[18px] " +
    "text-[12.5px] text-slate-700/90 hover:bg-white/55 transition",
  navLinkActive:
    "bg-white/70 text-slate-900 shadow-[0_8px_18px_rgba(0,0,0,0.06)] border border-white/70",

  // buttons
  btn:
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 " +
    "text-[12px] font-medium text-slate-800 " +
    "bg-white/55 border border-white/70 hover:bg-white/80 transition " +
    "shadow-[0_8px_20px_rgba(0,0,0,0.06)]",
  btnSm:
    "inline-flex items-center justify-center gap-2 rounded-full px-3 py-1.5 " +
    "text-[11.5px] font-medium text-slate-800 " +
    "bg-white/55 border border-white/70 hover:bg-white/80 transition",
  btnPrimary:
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 " +
    "text-[12px] font-semibold text-white " +
    "bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 " +
    "hover:from-violet-700 hover:via-fuchsia-600 hover:to-pink-600 transition " +
    "shadow-[0_18px_45px_rgba(124,58,237,0.26)]",
  btnDanger:
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 " +
    "text-[12px] font-semibold text-rose-700 " +
    "bg-white/55 border border-rose-200/70 hover:bg-rose-50/70 transition",

  // inputs
  input:
    "w-full rounded-[18px] border border-white/70 bg-white/65 px-4 py-3 " +
    "text-[12.5px] text-slate-900 placeholder:text-slate-400 " +
    "outline-none focus:ring-2 focus:ring-violet-500/25 focus:border-white/70",
  textarea:
    "w-full rounded-[18px] border border-white/70 bg-white/65 px-4 py-3 " +
    "text-[12.5px] text-slate-900 placeholder:text-slate-400 " +
    "outline-none focus:ring-2 focus:ring-violet-500/25 focus:border-white/70",

  // pills
  pill:
    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 " +
    "text-[11.5px] text-slate-700 bg-white/55 border border-white/70",
  pillStrong:
    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 " +
    "text-[11.5px] font-semibold text-slate-900 bg-white/75 border border-white/80",

  // chat bubble row
  bubbleBtn:
    "relative w-full text-left overflow-hidden rounded-[22px] px-4 py-4 sm:px-[18px] sm:py-[18px] " +
    "border border-white/75 bg-white/52 hover:bg-white/78 transition " +
    "shadow-[0_12px_30px_rgba(0,0,0,0.08)]",
  bubbleGlow:
    "pointer-events-none absolute -inset-10 bg-gradient-to-br from-violet-500/12 via-fuchsia-500/6 to-pink-500/12 blur-2xl",
  iconChip:
    "w-11 h-11 rounded-[18px] flex items-center justify-center " +
    "bg-white/55 border border-white/75 shadow-[0_10px_22px_rgba(0,0,0,0.08)]",
};

/** =========================
 *  Modal (삭제 확인용, 예쁘게)
 *  ========================= */
let __modalResolve = null;
function openConfirmModal({ title = "확인", message = "", confirmText = "삭제", cancelText = "취소", tone = "danger" } = {}) {
  const overlay = qs("#modalOverlay");
  const panel = qs("#modalPanel");
  if (!overlay || !panel) return Promise.resolve(false);

  qs("#modalTitle").textContent = title;
  qs("#modalMessage").textContent = message;

  const confirmBtn = qs("#modalConfirm");
  const cancelBtn = qs("#modalCancel");

  confirmBtn.textContent = confirmText;
  cancelBtn.textContent = cancelText;

  confirmBtn.className = tone === "danger" ? UI.btnDanger : UI.btnPrimary;

  overlay.classList.remove("opacity-0", "pointer-events-none");
  overlay.classList.add("opacity-100");
  panel.classList.remove("scale-95", "opacity-0");
  panel.classList.add("scale-100", "opacity-100");

  return new Promise((resolve) => {
    __modalResolve = resolve;
    const close = (val) => {
      overlay.classList.add("opacity-0", "pointer-events-none");
      overlay.classList.remove("opacity-100");
      panel.classList.add("scale-95", "opacity-0");
      panel.classList.remove("scale-100", "opacity-100");
      __modalResolve = null;
      resolve(val);
    };

    const onOverlay = (e) => { if (e.target === overlay) close(false); };
    const onCancel = () => close(false);
    const onConfirm = () => close(true);
    const onEsc = (e) => { if (e.key === "Escape") close(false); };

    overlay.addEventListener("click", onOverlay, { once: true });
    cancelBtn.addEventListener("click", onCancel, { once: true });
    confirmBtn.addEventListener("click", onConfirm, { once: true });
    window.addEventListener("keydown", onEsc, { once: true });
  });
}

/** =========================
 *  Drawer
 *  ========================= */
let drawerState = { open: false, kind: null, id: null, projectId: null, extra: {} };

function setDrawerOpen(open) {
  drawerState.open = open;

  const overlay = qs("#drawerOverlay");
  const panel = qs("#drawerPanel");

  if (!overlay || !panel) {
    if (!open) drawerState = { open: false, kind: null, id: null, projectId: null, extra: {} };
    return;
  }

  if (open) {
    overlay.classList.remove("opacity-0", "pointer-events-none");
    overlay.classList.add("opacity-100");
    panel.classList.remove("translate-x-full");
  } else {
    overlay.classList.add("opacity-0", "pointer-events-none");
    overlay.classList.remove("opacity-100");
    panel.classList.add("translate-x-full");
    drawerState = { open: false, kind: null, id: null, projectId: null, extra: {} };
  }
}

function closeDrawer() { setDrawerOpen(false); }
function setDrawerStatus(msg) {
  const el = qs("#drawerStatus");
  if (el) el.textContent = msg || "";
}

async function safeUpdate(table, id, patch) {
  setDrawerStatus("저장 중...");
  const { error } = await supabase.from(table).update(patch).eq("id", id);
  if (error) {
    setDrawerStatus(`저장 실패: ${error.message}`);
    return false;
  }
  setDrawerStatus("저장됨");
  return true;
}
function bindSave(selector, fn) {
  const el = qs(selector);
  if (!el) return;
  const handler = async () => {
    try { await fn(el); } catch (e) { setDrawerStatus(String(e?.message || e)); }
  };
  el.addEventListener("change", handler);
  el.addEventListener("blur", handler);
}

async function openDrawer(kind, { id, projectId, ...extra }) {
  drawerState = { open: true, kind, id, projectId, extra };
  setDrawerOpen(true);
  await renderDrawer();
}

function drawerHeaderChip(label, iconName) {
  return `
    <span class="${UI.pillStrong}">
      <span class="w-[18px] h-[18px]">${icon(iconName, 18)}</span>
      ${escapeHtml(label)}
    </span>
  `;
}

/** =========================
 *  Table existence guard + SQL helper
 *  ========================= */
function isMissingRelationError(error) {
  if (!error) return false;
  // PostgREST missing relation can be 404 / code PGRST116 or message includes "relation" / "does not exist"
  const msg = String(error.message || "").toLowerCase();
  return msg.includes("does not exist") || msg.includes("relation") || String(error.code || "").includes("PGRST");
}

function missingTableCard({ title, table, sql }) {
  const esc = (x) => escapeHtml(x);
  const id = `sql_${table}_${Math.random().toString(16).slice(2)}`;
  return `
    <div class="${UI.card} rounded-[22px] p-5">
      <div class="flex items-start justify-between gap-3">
        <div>
          <div class="${UI.h2}">테이블이 아직 없어</div>
          <div class="${UI.sub} mt-1">${esc(title)} 를 쓰려면 <b>${esc(table)}</b> 테이블이 필요해.</div>
        </div>
        <div class="${UI.pill}">SQL</div>
      </div>
      <pre class="mt-4 text-[11px] leading-[1.35] bg-white/55 border border-white/70 rounded-[18px] p-4 overflow-auto" id="${id}">${esc(sql)}</pre>
      <div class="mt-3 flex items-center gap-2">
        <button class="${UI.btnSm}" data-copy="${id}">${icon("doc", 16)} 복사</button>
        <div class="${UI.sub}">Supabase → SQL Editor에 붙여넣고 실행</div>
      </div>
    </div>
  `;
}

function bindCopyButtons(root = document) {
  qsa("[data-copy]", root).forEach((btn) => {
    btn.onclick = async () => {
      const id = btn.getAttribute("data-copy");
      const pre = qs(`#${id}`);
      if (!pre) return;
      const txt = pre.textContent || "";
      try {
        await navigator.clipboard.writeText(txt);
        btn.innerHTML = `${icon("spark", 16)} 복사됨`;
        setTimeout(() => (btn.innerHTML = `${icon("doc", 16)} 복사`), 1200);
      } catch {
        alert("복사 실패. 직접 드래그해서 복사해줘!");
      }
    };
  });
}

/** =========================
 *  Drawer renderer (timeline / checklist / budget / vendor / memo)
 *  ========================= */
async function renderDrawer() {
  const { kind, id, projectId } = drawerState;
  const titleEl = qs("#drawerTitle");
  const contentEl = qs("#drawerContent");
  if (!titleEl || !contentEl) return;

  // ---- Timeline event ----
  if (kind === "timeline_event") {
    titleEl.innerHTML = drawerHeaderChip("행사일정 편집", "calendar");

    const [{ data: ev, error: e1 }, { data: days, error: e2 }] = await Promise.all([
      supabase.from("timeline_events").select("*").eq("id", id).single(),
      supabase.from("timeline_days").select("id,title,sort_order").eq("project_id", projectId).order("sort_order"),
    ]);

    if (e1 || e2) {
      contentEl.innerHTML = `<div class="text-sm text-rose-700">${escapeHtml((e1 || e2).message)}</div>`;
      return;
    }

    contentEl.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <span class="${UI.pillStrong}">
            <span class="w-[18px] h-[18px]">${icon("clock", 18)}</span>
            ${escapeHtml(timeToHHMM(ev.start_time))}
          </span>
          <span class="${UI.pill}">소요 <b class="font-semibold">${ev.duration_min || 0}m</b></span>
          ${ev.is_highlighted ? `<span class="${UI.pillStrong}">중요</span>` : ""}
        </div>

        <div>
          <div class="${UI.label} mb-1">아이콘</div>
          <select id="ev_icon" class="${UI.input}">
            ${["clock","calendar","spark","tag","doc","note","wallet","checklist","building"].map(nm =>
              `<option value="${nm}" ${nm===ev.icon ? "selected" : ""}>${nm}</option>`
            ).join("")}
          </select>
          <div class="${UI.sub} mt-1">아이콘은 “Iconly 느낌” 라인 아이콘으로 표시돼.</div>
        </div>

        <div>
          <div class="${UI.label} mb-1">제목</div>
          <input id="ev_title" class="${UI.input}" value="${escapeHtml(ev.title || "")}" />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <div class="${UI.label} mb-1">시작시간</div>
            <input id="ev_time" type="time" class="${UI.input}" value="${escapeHtml(timeToHHMM(ev.start_time))}" />
          </div>
          <div>
            <div class="${UI.label} mb-1">소요(분)</div>
            <input id="ev_dur" type="number" class="${UI.input}" value="${ev.duration_min ?? 30}" min="0" />
          </div>
        </div>

        <div>
          <div class="${UI.label} mb-1">Day</div>
          <select id="ev_day" class="${UI.input}">
            ${(days ?? []).map(d => `<option value="${d.id}" ${d.id===ev.day_id ? "selected":""}>${escapeHtml(d.title)}</option>`).join("")}
          </select>
        </div>

        <div>
          <div class="${UI.label} mb-1">장소(선택)</div>
          <input id="ev_loc" class="${UI.input}" value="${escapeHtml(ev.location || "")}" />
        </div>

        <div>
          <div class="${UI.label} mb-1">메모(선택)</div>
          <textarea id="ev_notes" class="${UI.textarea}" rows="4">${escapeHtml(ev.notes || "")}</textarea>
        </div>

        <label class="flex items-center gap-2 text-[12px] text-slate-800">
          <input id="ev_hi" type="checkbox" ${ev.is_highlighted ? "checked":""} />
          중요 표시
        </label>

        <div class="flex items-center justify-between pt-2">
          <button id="ev_delete" class="${UI.btnDanger}">${icon("trash", 16)} 삭제</button>
          <button id="ev_close" class="${UI.btnPrimary}">완료</button>
        </div>
      </div>
    `;

    bindSave("#ev_icon", (el) => safeUpdate("timeline_events", id, { icon: el.value }));
    bindSave("#ev_title", (el) => safeUpdate("timeline_events", id, { title: el.value }));
    bindSave("#ev_time", (el) => safeUpdate("timeline_events", id, { start_time: hhmmToTime(el.value) }));
    bindSave("#ev_dur", (el) => safeUpdate("timeline_events", id, { duration_min: Number(el.value || 0) }));
    bindSave("#ev_day", (el) => safeUpdate("timeline_events", id, { day_id: el.value }));
    bindSave("#ev_loc", (el) => safeUpdate("timeline_events", id, { location: el.value || null }));
    bindSave("#ev_notes", (el) => safeUpdate("timeline_events", id, { notes: el.value || null }));
    bindSave("#ev_hi", (el) => safeUpdate("timeline_events", id, { is_highlighted: el.checked }));

    qs("#ev_close").onclick = closeDrawer;
    qs("#ev_delete").onclick = async () => {
      const ok = await openConfirmModal({
        title: "일정 삭제",
        message: "이 일정은 복구할 수 없어. 정말 삭제할까?",
        confirmText: "삭제",
        cancelText: "취소",
        tone: "danger",
      });
      if (!ok) return;
      await supabase.from("timeline_events").delete().eq("id", id);
      closeDrawer();
    };

    setDrawerStatus("열림");
    return;
  }

  // ---- Checklist item ----
  if (kind === "checklist_item") {
    titleEl.innerHTML = drawerHeaderChip("체크리스트 편집", "checklist");

    const [{ data: it, error: e1 }, { data: sections, error: e2 }] = await Promise.all([
      supabase.from("checklist_items").select("*").eq("id", id).single(),
      supabase.from("checklist_sections").select("id,title,sort_order").eq("project_id", projectId).order("sort_order"),
    ]);

    if (e1 || e2) {
      contentEl.innerHTML = `<div class="text-sm text-rose-700">${escapeHtml((e1 || e2).message)}</div>`;
      return;
    }

    const secTitle = (sections ?? []).find(s => s.id === it.section_id)?.title || "섹션";

    contentEl.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <span class="${UI.pillStrong}">${it.is_done ? "완료" : "진행중"}</span>
          <span class="${UI.pill}">섹션 <b class="font-semibold">${escapeHtml(secTitle)}</b></span>
        </div>

        <div>
          <div class="${UI.label} mb-1">제목</div>
          <input id="ck_title" class="${UI.input}" value="${escapeHtml(it.title || "")}" />
        </div>

        <div>
          <div class="${UI.label} mb-1">섹션</div>
          <select id="ck_section" class="${UI.input}">
            ${(sections ?? []).map(s => `<option value="${s.id}" ${s.id===it.section_id?"selected":""}>${escapeHtml(s.title)}</option>`).join("")}
          </select>
        </div>

        <div>
          <div class="${UI.label} mb-1">마감일(선택)</div>
          <input id="ck_due" type="date" class="${UI.input}" value="${it.due_date ?? ""}" />
        </div>

        <div>
          <div class="${UI.label} mb-1">메모(선택)</div>
          <textarea id="ck_notes" class="${UI.textarea}" rows="4">${escapeHtml(it.notes || "")}</textarea>
        </div>

        <label class="flex items-center gap-2 text-[12px] text-slate-800">
          <input id="ck_done" type="checkbox" ${it.is_done ? "checked":""} />
          완료
        </label>

        <div class="flex items-center justify-between pt-2">
          <button id="ck_delete" class="${UI.btnDanger}">${icon("trash", 16)} 삭제</button>
          <button id="ck_close" class="${UI.btnPrimary}">완료</button>
        </div>
      </div>
    `;

    bindSave("#ck_title", (el) => safeUpdate("checklist_items", id, { title: el.value }));
    bindSave("#ck_section", (el) => safeUpdate("checklist_items", id, { section_id: el.value }));
    bindSave("#ck_due", (el) => safeUpdate("checklist_items", id, { due_date: el.value || null }));
    bindSave("#ck_notes", (el) => safeUpdate("checklist_items", id, { notes: el.value || null }));
    bindSave("#ck_done", (el) => safeUpdate("checklist_items", id, { is_done: el.checked }));

    qs("#ck_close").onclick = closeDrawer;
    qs("#ck_delete").onclick = async () => {
      const ok = await openConfirmModal({
        title: "할 일 삭제",
        message: "이 할 일을 삭제할까?",
        confirmText: "삭제",
        cancelText: "취소",
        tone: "danger",
      });
      if (!ok) return;
      await supabase.from("checklist_items").delete().eq("id", id);
      closeDrawer();
    };

    setDrawerStatus("열림");
    return;
  }

  // ---- Budget item ----
  if (kind === "budget_item") {
    titleEl.innerHTML = drawerHeaderChip("예산 항목 편집", "wallet");

    const [{ data: it, error: e1 }, { data: cats, error: e2 }] = await Promise.all([
      supabase.from("budget_items").select("*").eq("id", id).single(),
      supabase.from("budget_categories").select("id,title,sort_order").eq("project_id", projectId).order("sort_order"),
    ]);

    if (e1 || e2) {
      contentEl.innerHTML = `<div class="text-sm text-rose-700">${escapeHtml((e1 || e2).message)}</div>`;
      return;
    }

    const unpaid = Math.max(0, n(it.actual) - n(it.paid));

    contentEl.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <span class="${UI.pillStrong}">잔액 <b>${moneyFmt(unpaid)}원</b></span>
          <span class="${UI.pill}">예상 <b>${moneyFmt(it.estimate)}원</b></span>
          <span class="${UI.pill}">실제 <b>${moneyFmt(it.actual)}원</b></span>
          <span class="${UI.pill}">지불 <b>${moneyFmt(it.paid)}원</b></span>
        </div>

        <div>
          <div class="${UI.label} mb-1">항목명</div>
          <input id="bd_name" class="${UI.input}" value="${escapeHtml(it.item_name || "")}" />
        </div>

        <div>
          <div class="${UI.label} mb-1">카테고리</div>
          <select id="bd_cat" class="${UI.input}">
            ${(cats ?? []).map(c => `<option value="${c.id}" ${c.id===it.category_id?"selected":""}>${escapeHtml(c.title)}</option>`).join("")}
          </select>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div>
            <div class="${UI.label} mb-1">예상</div>
            <input id="bd_est" type="number" class="${UI.input}" value="${n(it.estimate)}" min="0" />
          </div>
          <div>
            <div class="${UI.label} mb-1">실제</div>
            <input id="bd_act" type="number" class="${UI.input}" value="${n(it.actual)}" min="0" />
          </div>
          <div>
            <div class="${UI.label} mb-1">지불</div>
            <input id="bd_paid" type="number" class="${UI.input}" value="${n(it.paid)}" min="0" />
          </div>
        </div>

        <div>
          <div class="${UI.label} mb-1">결제 마감(선택)</div>
          <input id="bd_due" type="date" class="${UI.input}" value="${it.due_date ?? ""}" />
        </div>

        <div>
          <div class="${UI.label} mb-1">메모(선택)</div>
          <textarea id="bd_notes" class="${UI.textarea}" rows="4">${escapeHtml(it.notes || "")}</textarea>
        </div>

        <div class="flex items-center justify-between pt-2">
          <button id="bd_delete" class="${UI.btnDanger}">${icon("trash", 16)} 삭제</button>
          <button id="bd_close" class="${UI.btnPrimary}">완료</button>
        </div>
      </div>
    `;

    bindSave("#bd_name", (el) => safeUpdate("budget_items", id, { item_name: el.value }));
    bindSave("#bd_cat", (el) => safeUpdate("budget_items", id, { category_id: el.value }));
    bindSave("#bd_est", (el) => safeUpdate("budget_items", id, { estimate: Number(el.value || 0) }));
    bindSave("#bd_act", (el) => safeUpdate("budget_items", id, { actual: Number(el.value || 0) }));
    bindSave("#bd_paid", (el) => safeUpdate("budget_items", id, { paid: Number(el.value || 0) }));
    bindSave("#bd_due", (el) => safeUpdate("budget_items", id, { due_date: el.value || null }));
    bindSave("#bd_notes", (el) => safeUpdate("budget_items", id, { notes: el.value || null }));

    qs("#bd_close").onclick = closeDrawer;
    qs("#bd_delete").onclick = async () => {
      const ok = await openConfirmModal({
        title: "예산 항목 삭제",
        message: "이 항목을 삭제할까?",
        confirmText: "삭제",
        cancelText: "취소",
        tone: "danger",
      });
      if (!ok) return;
      await supabase.from("budget_items").delete().eq("id", id);
      closeDrawer();
    };

    setDrawerStatus("열림");
    return;
  }

  // ---- Vendor ----
  if (kind === "vendor") {
    titleEl.innerHTML = drawerHeaderChip("업체 편집", "building");

    const { data: it, error } = await supabase.from("vendors").select("*").eq("id", id).single();
    if (error) {
      contentEl.innerHTML = `<div class="text-sm text-rose-700">${escapeHtml(error.message)}</div>`;
      return;
    }

    contentEl.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <span class="${UI.pillStrong}">${escapeHtml(it.category || "업체")}</span>
          <span class="${UI.pill}">상태 <b>${escapeHtml(it.status || "진행")}</b></span>
        </div>

        <div>
          <div class="${UI.label} mb-1">카테고리</div>
          <input id="vd_cat" class="${UI.input}" value="${escapeHtml(it.category || "")}" placeholder="예: 예식장, 스냅, 드레스..." />
        </div>

        <div>
          <div class="${UI.label} mb-1">업체명</div>
          <input id="vd_name" class="${UI.input}" value="${escapeHtml(it.name || "")}" />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <div class="${UI.label} mb-1">연락처(선택)</div>
            <input id="vd_contact" class="${UI.input}" value="${escapeHtml(it.contact || "")}" placeholder="전화 / 인스타 / 카톡" />
          </div>
          <div>
            <div class="${UI.label} mb-1">상태</div>
            <select id="vd_status" class="${UI.input}">
              ${["리서치","문의","계약","진행","완료"].map(s => `<option value="${s}" ${s===it.status ? "selected":""}>${s}</option>`).join("")}
            </select>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div>
            <div class="${UI.label} mb-1">계약금(선택)</div>
            <input id="vd_contract" type="number" class="${UI.input}" value="${n(it.contract_amount)}" min="0" />
          </div>
          <div>
            <div class="${UI.label} mb-1">지불(선택)</div>
            <input id="vd_paid" type="number" class="${UI.input}" value="${n(it.paid_amount)}" min="0" />
          </div>
          <div>
            <div class="${UI.label} mb-1">잔액</div>
            <input disabled class="${UI.input} opacity-70" value="${moneyFmt(Math.max(0, n(it.contract_amount) - n(it.paid_amount)))}원" />
          </div>
        </div>

        <div>
          <div class="${UI.label} mb-1">메모(선택)</div>
          <textarea id="vd_notes" class="${UI.textarea}" rows="4">${escapeHtml(it.notes || "")}</textarea>
        </div>

        <div class="flex items-center justify-between pt-2">
          <button id="vd_delete" class="${UI.btnDanger}">${icon("trash", 16)} 삭제</button>
          <button id="vd_close" class="${UI.btnPrimary}">완료</button>
        </div>
      </div>
    `;

    bindSave("#vd_cat", (el) => safeUpdate("vendors", id, { category: el.value || null }));
    bindSave("#vd_name", (el) => safeUpdate("vendors", id, { name: el.value }));
    bindSave("#vd_contact", (el) => safeUpdate("vendors", id, { contact: el.value || null }));
    bindSave("#vd_status", (el) => safeUpdate("vendors", id, { status: el.value }));
    bindSave("#vd_contract", (el) => safeUpdate("vendors", id, { contract_amount: Number(el.value || 0) }));
    bindSave("#vd_paid", (el) => safeUpdate("vendors", id, { paid_amount: Number(el.value || 0) }));
    bindSave("#vd_notes", (el) => safeUpdate("vendors", id, { notes: el.value || null }));

    qs("#vd_close").onclick = closeDrawer;
    qs("#vd_delete").onclick = async () => {
      const ok = await openConfirmModal({
        title: "업체 삭제",
        message: "이 업체 항목을 삭제할까?",
        confirmText: "삭제",
        cancelText: "취소",
        tone: "danger",
      });
      if (!ok) return;
      await supabase.from("vendors").delete().eq("id", id);
      closeDrawer();
    };

    setDrawerStatus("열림");
    return;
  }

  // ---- Memo ----
  if (kind === "memo") {
    titleEl.innerHTML = drawerHeaderChip("메모 편집", "note");

    const { data: it, error } = await supabase.from("memos").select("*").eq("id", id).single();
    if (error) {
      contentEl.innerHTML = `<div class="text-sm text-rose-700">${escapeHtml(error.message)}</div>`;
      return;
    }

    contentEl.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <span class="${UI.pillStrong}">${escapeHtml(it.tag || "메모")}</span>
          <span class="${UI.pill}">업데이트 <b>${escapeHtml(String(it.updated_at || "").slice(0,10) || "-")}</b></span>
        </div>

        <div>
          <div class="${UI.label} mb-1">태그(선택)</div>
          <input id="mm_tag" class="${UI.input}" value="${escapeHtml(it.tag || "")}" placeholder="예: 아이디어, 링크, 할말..." />
        </div>

        <div>
          <div class="${UI.label} mb-1">제목</div>
          <input id="mm_title" class="${UI.input}" value="${escapeHtml(it.title || "")}" />
        </div>

        <div>
          <div class="${UI.label} mb-1">내용</div>
          <textarea id="mm_body" class="${UI.textarea}" rows="8">${escapeHtml(it.body || "")}</textarea>
        </div>

        <div class="flex items-center justify-between pt-2">
          <button id="mm_delete" class="${UI.btnDanger}">${icon("trash", 16)} 삭제</button>
          <button id="mm_close" class="${UI.btnPrimary}">완료</button>
        </div>
      </div>
    `;

    bindSave("#mm_tag", (el) => safeUpdate("memos", id, { tag: el.value || null }));
    bindSave("#mm_title", (el) => safeUpdate("memos", id, { title: el.value }));
    bindSave("#mm_body", (el) => safeUpdate("memos", id, { body: el.value || null }));

    qs("#mm_close").onclick = closeDrawer;
    qs("#mm_delete").onclick = async () => {
      const ok = await openConfirmModal({
        title: "메모 삭제",
        message: "이 메모를 삭제할까?",
        confirmText: "삭제",
        cancelText: "취소",
        tone: "danger",
      });
      if (!ok) return;
      await supabase.from("memos").delete().eq("id", id);
      closeDrawer();
    };

    setDrawerStatus("열림");
    return;
  }

  titleEl.textContent = "Detail";
  contentEl.innerHTML = `<div class="${UI.sub}">지원하지 않는 패널</div>`;
}

/** =========================
 *  Auth / route helpers
 *  ========================= */
function isAuthHash() {
  return location.hash.startsWith("#access_token=") || location.hash.startsWith("#error=");
}
function getRoute() {
  const h = location.hash || "#/overview";
  if (h.startsWith("#/")) return h.slice(1);
  return "/overview";
}
async function ensureAuthFromUrl() {
  const url = new URL(location.href);
  const code = url.searchParams.get("code");
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
    url.searchParams.delete("code");
    history.replaceState({}, "", url.toString());
  }

  if (isAuthHash()) {
    const params = new URLSearchParams(location.hash.slice(1));
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");
    if (access_token && refresh_token) {
      await supabase.auth.setSession({ access_token, refresh_token });
    }
    location.hash = "#/overview";
  }
}

/** =========================
 *  Layout
 *  ========================= */
function navItem(route, label, iconName) {
  return `
    <a class="${UI.navLink}" data-route="${route}" href="#${route}">
      <span class="w-[18px] h-[18px]">${icon(iconName, 18)}</span>
      <span class="truncate">${escapeHtml(label)}</span>
    </a>
  `;
}

function layoutShell(userEmail) {
  app.innerHTML = `
  <div class="${UI.pageWrap}">
    <div class="${UI.shell}">

      <aside class="${UI.card}">
        <div class="${UI.cardInner}">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="w-9 h-9 rounded-[16px] bg-white/55 border border-white/75 flex items-center justify-center">
                  ${icon("spark", 18)}
                </span>
                <div class="text-[15px] font-semibold tracking-tight text-slate-900">우리 플래너</div>
              </div>
              <div class="${UI.sub} mt-1 truncate">${escapeHtml(userEmail)}</div>
            </div>
            <span class="${UI.pill}">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              온라인
            </span>
          </div>

          <nav class="mt-5 space-y-2" id="nav">
            ${navItem("/overview", "개요", "home")}
            ${navItem("/timeline", "행사일정", "calendar")}
            ${navItem("/ceremony", "예식", "doc")}
            ${navItem("/vendors", "업체", "building")}
            ${navItem("/checklist", "체크리스트", "checklist")}
            ${navItem("/budget", "예산", "wallet")}
            ${navItem("/memos", "메모", "note")}
          </nav>

          <div class="mt-6 flex items-center justify-between">
            <button id="logout" class="${UI.btn}">${icon("chevron", 16)} 로그아웃</button>
            <span class="${UI.sub}">자동 저장</span>
          </div>
        </div>
      </aside>

      <main class="${UI.card}">
        <div class="${UI.cardInner}">
          <div id="page"></div>
        </div>
      </main>

      <!-- Drawer -->
      <div id="drawerOverlay" class="fixed inset-0 bg-black/25 opacity-0 pointer-events-none transition"></div>
      <aside id="drawerPanel"
        class="fixed right-0 top-0 h-full w-full md:w-[440px]
               translate-x-full transition-transform duration-200
               ${UI.card} rounded-none md:rounded-l-[26px]
               border-l border-white/60 ring-1 ring-white/40">
        <div class="p-5 sm:p-6 h-full flex flex-col">
          <div class="flex items-center justify-between gap-3">
            <div id="drawerTitle" class="text-[12.5px] font-semibold text-slate-900"></div>
            <button id="drawerClose" class="${UI.btnSm}">닫기</button>
          </div>
          <div class="mt-4 flex-1 overflow-auto" id="drawerContent"></div>
          <div class="mt-3 text-[11.5px] text-slate-600/90" id="drawerStatus"></div>
        </div>
      </aside>

      <!-- Modal -->
      <div id="modalOverlay" class="fixed inset-0 bg-black/30 opacity-0 pointer-events-none transition flex items-center justify-center p-4">
        <div id="modalPanel"
          class="${UI.card} w-full max-w-sm rounded-[26px] p-5 sm:p-6
                 scale-95 opacity-0 transition">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-[18px] bg-white/55 border border-white/75 flex items-center justify-center">
              ${icon("trash", 18)}
            </div>
            <div class="min-w-0">
              <div id="modalTitle" class="text-[14px] font-semibold text-slate-900">확인</div>
              <div id="modalMessage" class="${UI.sub} mt-1">정말 삭제할까?</div>
            </div>
          </div>
          <div class="mt-5 flex items-center justify-end gap-2">
            <button id="modalCancel" class="${UI.btn}">취소</button>
            <button id="modalConfirm" class="${UI.btnDanger}">삭제</button>
          </div>
        </div>
      </div>

    </div>
  </div>`;

  // active nav
  const r = (location.hash || "#/overview").replace("#", "");
  qsa("#nav a[data-route]").forEach((a) => {
    if (a.getAttribute("data-route") === r) a.classList.add(...UI.navLinkActive.split(" "));
  });

  // actions
  qs("#logout").onclick = async () => {
    await supabase.auth.signOut();
    render();
  };

  // drawer close handlers
  qs("#drawerOverlay").onclick = closeDrawer;
  qs("#drawerClose").onclick = closeDrawer;

  // ESC for drawer (single bind)
  if (!window.__drawerEscBound) {
    window.__drawerEscBound = true;
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDrawer();
    });
  }
}

function loginView() {
  app.innerHTML = `
  <div class="${UI.pageWrap}">
    <div class="${UI.card} w-full max-w-sm">
      <div class="${UI.cardInner} space-y-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="w-9 h-9 rounded-[16px] bg-white/55 border border-white/75 flex items-center justify-center">
              ${icon("spark", 18)}
            </span>
            <h1 class="${UI.h1}">로그인</h1>
          </div>
          <p class="${UI.sub} mt-1">이메일 매직 링크로 접속</p>
        </div>

        <input id="email" class="${UI.input}" placeholder="email@example.com" />
        <button id="send" class="${UI.btnPrimary} w-full">매직 링크 보내기</button>

        <p id="msg" class="${UI.sub}"></p>
      </div>
    </div>
  </div>`;

  qs("#send").onclick = async () => {
    const email = qs("#email").value.trim();
    if (!email) return;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: location.origin + location.pathname },
    });
    qs("#msg").textContent = error ? error.message : "메일함에서 링크를 눌러줘!";
  };
}

/** =========================
 *  Project
 *  ========================= */
async function getProjectId() {
  const { data, error } = await supabase
    .from("projects")
    .select("id")
    .order("created_at", { ascending: true })
    .limit(1)
    .single();

  if (error) throw error;
  return data.id;
}

/** =========================
 *  Pages
 *  ========================= */
function pageHeader(title, subtitle, iconName, rightHtml = "") {
  return `
    <header class="flex items-start justify-between gap-3">
      <div>
        <div class="flex items-center gap-2">
          <span class="w-9 h-9 rounded-[16px] bg-white/55 border border-white/75 flex items-center justify-center">
            ${icon(iconName, 18)}
          </span>
          <h1 class="${UI.h1}">${escapeHtml(title)}</h1>
        </div>
        <div class="${UI.sub} mt-1">${escapeHtml(subtitle || "")}</div>
      </div>
      ${rightHtml || ""}
    </header>
  `;
}

function bubbleRow({ leftIconName = "note", topPillsHtml = "", title = "", sub = "", rightHint = "열기" } = {}) {
  return `
    <div class="${UI.bubbleGlow}"></div>
    <div class="relative">
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-start gap-3 min-w-0">
          <div class="${UI.iconChip} shrink-0">
            <span class="w-[20px] h-[20px]">${icon(leftIconName, 20)}</span>
          </div>

          <div class="min-w-0">
            <div class="flex items-center gap-2 flex-wrap">${topPillsHtml}</div>
            <div class="mt-2 text-[13.5px] font-semibold text-slate-900 truncate">${escapeHtml(title)}</div>
            ${sub ? `<div class="${UI.sub} mt-1 line-clamp-2">${escapeHtml(sub)}</div>` : ""}
          </div>
        </div>

        <div class="${UI.sub} mt-1 shrink-0 flex items-center gap-1">
          ${escapeHtml(rightHint)} <span class="w-[14px] h-[14px]">${icon("chevron", 14)}</span>
        </div>
      </div>
    </div>
  `;
}

/* ---------- Overview ---------- */
async function overviewPage(projectId) {
  const page = qs("#page");
  page.innerHTML = pageHeader("개요", "전체 현황을 한눈에", "home");

  // counts (best-effort; errors ignored)
  const [
    daysRes,
    evRes,
    secRes,
    itemRes,
    catRes,
    budRes,
    memoRes,
    vendorRes,
    cerRes,
  ] = await Promise.all([
    supabase.from("timeline_days").select("id").eq("project_id", projectId),
    supabase.from("timeline_events").select("id").eq("project_id", projectId),
    supabase.from("checklist_sections").select("id").eq("project_id", projectId),
    supabase.from("checklist_items").select("id,is_done").eq("project_id", projectId),
    supabase.from("budget_categories").select("id").eq("project_id", projectId),
    supabase.from("budget_items").select("estimate,actual,paid").eq("project_id", projectId),
    supabase.from("memos").select("id").eq("project_id", projectId),
    supabase.from("vendors").select("id").eq("project_id", projectId),
    supabase.from("ceremony_info").select("id").eq("project_id", projectId).limit(1),
  ]);

  const checklistTotal = (itemRes.data || []).length;
  const checklistDone = (itemRes.data || []).filter(x => x.is_done).length;
  const checklistPct = checklistTotal ? Math.round((checklistDone / checklistTotal) * 100) : 0;

  const totals = (budRes.data || []).reduce((acc, it) => {
    acc.estimate += n(it.estimate);
    acc.actual += n(it.actual);
    acc.paid += n(it.paid);
    return acc;
  }, { estimate: 0, actual: 0, paid: 0 });
  const unpaid = Math.max(0, totals.actual - totals.paid);

  const cards = [
    { icon: "calendar", label: "일정", value: `${(evRes.data || []).length}개`, sub: `${(daysRes.data || []).length} Day` },
    { icon: "checklist", label: "체크리스트", value: `${checklistPct}%`, sub: `${checklistDone}/${checklistTotal}` },
    { icon: "wallet", label: "예산(미지불)", value: `${moneyFmt(unpaid)}원`, sub: `실제 ${moneyFmt(totals.actual)}원` },
    { icon: "note", label: "메모", value: `${(memoRes.data || []).length}개`, sub: `업체 ${(vendorRes.data || []).length}개` },
  ];

  page.innerHTML += `
    <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      ${cards.map(c => `
        <div class="${UI.bubbleBtn}">
          ${bubbleRow({
            leftIconName: c.icon,
            topPillsHtml: `<span class="${UI.pillStrong}">${escapeHtml(c.label)}</span>`,
            title: c.value,
            sub: c.sub,
            rightHint: ""
          })}
        </div>
      `).join("")}
    </div>

    <div class="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
      <div class="${UI.bubbleBtn}">
        ${bubbleRow({
          leftIconName: "doc",
          topPillsHtml: `<span class="${UI.pillStrong}">예식</span>`,
          title: cerRes.error ? "테이블 미설정" : (cerRes.data?.[0] ? "정보 있음" : "아직 없음"),
          sub: "예식 탭에서 날짜/장소/메모를 정리해봐",
          rightHint: "이동"
        })}
      </div>
      <div class="${UI.bubbleBtn}">
        ${bubbleRow({
          leftIconName: "building",
          topPillsHtml: `<span class="${UI.pillStrong}">업체</span>`,
          title: vendorRes.error ? "테이블 미설정" : `${(vendorRes.data || []).length}개`,
          sub: "계약금/지불/상태를 한 곳에",
          rightHint: "이동"
        })}
      </div>
    </div>
  `;

  // quick links
  const quick = page.querySelectorAll(".mt-4 .grid .bubbleBtn");
  // keep simple: click the two link cards to navigate
  const grid2 = page.querySelectorAll(".mt-4.grid.grid-cols-1.lg\\:grid-cols-2 ."+UI.bubbleBtn.split(" ")[0]);
  // easier: set explicit IDs instead
  // We'll just add handlers via delegation:
  page.onclick = (e) => {
    const t = e.target.closest("[data-go]");
    if (!t) return;
    location.hash = t.getAttribute("data-go");
  };

  // add go attributes by small patch
  const blocks = qsa(".mt-4.grid.grid-cols-1.lg\\:grid-cols-2.gap-3 > div", page);
  if (blocks[0]) blocks[0].setAttribute("data-go", "#/ceremony");
  if (blocks[1]) blocks[1].setAttribute("data-go", "#/vendors");

  // copy button binds if any
  bindCopyButtons(page);
}

/* ---------- Timeline ---------- */
async function timelinePage(projectId) {
  const page = qs("#page");
  page.innerHTML = pageHeader(
    "행사일정",
    "카드를 클릭하면 오른쪽에서 상세 편집",
    "calendar",
    `<button id="addEvent" class="${UI.btnPrimary}"><span class="w-[16px] h-[16px]">${icon("plus", 16)}</span>추가</button>`
  );

  async function loadDays() {
    return supabase
      .from("timeline_days")
      .select("id,title,sort_order")
      .eq("project_id", projectId)
      .order("sort_order");
  }

  let { data: days } = await loadDays();
  days = days || [];

  // 기본 day 보장
  if (days.length === 0) {
    const ins = await supabase
      .from("timeline_days")
      .insert({ project_id: projectId, title: "본식 당일", sort_order: 0 })
      .select("id,title,sort_order")
      .single();
    if (ins.data) days = [ins.data];
  }

  let selectedDayId = days[0]?.id;

  page.innerHTML += `
    <div class="mt-4 flex flex-wrap gap-2" id="dayTabs"></div>
    <div class="mt-4 space-y-3" id="events"></div>
  `;

  function renderTabs() {
    const box = qs("#dayTabs");
    box.innerHTML = (days || []).map(d => {
      const active = d.id === selectedDayId;
      return `
        <button data-day="${d.id}"
          class="${UI.pill} ${active ? "bg-white/80 border-white/80 shadow-[0_10px_22px_rgba(0,0,0,0.06)]" : ""}">
          <span class="w-[16px] h-[16px]">${icon("calendar", 16)}</span>
          ${escapeHtml(d.title)}
        </button>
      `;
    }).join("");

    qsa("#dayTabs button[data-day]").forEach(btn => {
      btn.onclick = () => {
        selectedDayId = btn.dataset.day;
        load();
      };
    });
  }

  async function load() {
    const { data, error } = await supabase
      .from("timeline_events")
      .select("id,start_time,duration_min,icon,title,location,is_highlighted,sort_order")
      .eq("project_id", projectId)
      .eq("day_id", selectedDayId)
      .order("sort_order", { ascending: true });

    if (error) {
      qs("#events").innerHTML = `<div class="text-sm text-rose-700">${escapeHtml(error.message)}</div>`;
      return;
    }

    qs("#events").innerHTML = (data ?? []).map(e => `
      <button data-id="${e.id}" class="${UI.bubbleBtn}">
        ${bubbleRow({
          leftIconName: e.icon || "clock",
          topPillsHtml: `
            <span class="${UI.pillStrong}">${escapeHtml(timeToHHMM(e.start_time))}</span>
            <span class="${UI.pill}">${escapeHtml(String(e.duration_min || 0))}m</span>
            ${e.is_highlighted ? `<span class="${UI.pillStrong}">중요</span>` : ""}
          `,
          title: e.title || "일정",
          sub: e.location ? `장소: ${e.location}` : "",
          rightHint: "편집"
        })}
      </button>
    `).join("") || `
      <div class="${UI.bubbleBtn}">
        ${bubbleRow({
          leftIconName: "calendar",
          topPillsHtml: `<span class="${UI.pillStrong}">비어있음</span>`,
          title: "이 Day의 일정이 없어",
          sub: "오른쪽 위 추가 버튼으로 만들어봐",
          rightHint: ""
        })}
      </div>
    `;

    qsa("#events button[data-id]").forEach(btn => {
      btn.onclick = () => openDrawer("timeline_event", { id: btn.dataset.id, projectId });
    });
  }

  qs("#addEvent").onclick = async () => {
    const { data: last } = await supabase
      .from("timeline_events")
      .select("sort_order")
      .eq("project_id", projectId)
      .eq("day_id", selectedDayId)
      .order("sort_order", { ascending: false })
      .limit(1);

    const nextOrder = (last?.[0]?.sort_order ?? 0) + 1;

    const ins = await supabase
      .from("timeline_events")
      .insert({
        project_id: projectId,
        day_id: selectedDayId,
        sort_order: nextOrder,
        start_time: "18:00:00",
        duration_min: 30,
        icon: "clock",
        title: "새 일정",
      })
      .select("id")
      .single();

    if (ins.error || !ins.data?.id) {
      openConfirmModal({
        title: "추가 실패",
        message: ins.error?.message || "권한/테이블 상태를 확인해줘.",
        confirmText: "확인",
        cancelText: "닫기",
        tone: "ok",
      });
      return;
    }

    openDrawer("timeline_event", { id: ins.data.id, projectId });
  };

  // realtime
  const ch = supabase
    .channel("timeline")
    .on("postgres_changes", { event: "*", schema: "public", table: "timeline_events", filter: `project_id=eq.${projectId}` }, load)
    .on("postgres_changes", { event: "*", schema: "public", table: "timeline_days", filter: `project_id=eq.${projectId}` }, async () => {
      const res = await loadDays();
      if (res.data) {
        days = res.data;
        if (!days.find(d => d.id === selectedDayId)) selectedDayId = days[0]?.id;
        renderTabs();
        load();
      }
    })
    .subscribe();

  window.__cleanup?.();
  window.__cleanup = () => supabase.removeChannel(ch);

  renderTabs();
  await load();
}

/* ---------- Checklist ---------- */
async function checklistPage(projectId) {
  const page = qs("#page");
  page.innerHTML = pageHeader(
    "체크리스트",
    "체크는 바로, 편집은 카드 클릭",
    "checklist",
    `<button id="addItem" class="${UI.btnPrimary}"><span class="w-[16px] h-[16px]">${icon("plus", 16)}</span>추가</button>`
  );
  page.innerHTML += `<div class="mt-4 space-y-4" id="sections"></div>`;

  async function ensureTemplate() {
    const { data, error } = await supabase
      .from("checklist_sections")
      .select("id")
      .eq("project_id", projectId)
      .limit(1);

    if (error) return { ok: false, error };

    if (data && data.length > 0) return { ok: true };

    const defaults = ["6개월 전", "3개월 전", "1개월 전", "2주 전", "1주 전", "당일"];
    const ins = await supabase.from("checklist_sections").insert(
      defaults.map((t, i) => ({ project_id: projectId, title: t, sort_order: i }))
    );
    return ins.error ? { ok: false, error: ins.error } : { ok: true };
  }

  async function load() {
    const t = await ensureTemplate();
    if (!t.ok) {
      // if table missing, show SQL guide
      const sql = `-- checklist_sections / checklist_items (필요하면 실행)
create table if not exists public.checklist_sections (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  sort_order bigint not null default 0,
  created_at timestamptz not null default now()
);
create table if not exists public.checklist_items (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  section_id uuid not null references public.checklist_sections(id) on delete cascade,
  title text not null,
  is_done boolean not null default false,
  due_date date,
  notes text,
  sort_order bigint not null default 0,
  created_at timestamptz not null default now()
);

alter table public.checklist_sections enable row level security;
alter table public.checklist_items enable row level security;

-- project_members 기반 정책(이미 project_members 테이블이 있다고 가정)
create policy if not exists "ck_sections_select" on public.checklist_sections
for select using (exists (select 1 from public.project_members pm where pm.project_id = checklist_sections.project_id and pm.user_id = auth.uid()));
create policy if not exists "ck_sections_write" on public.checklist_sections
for all using (exists (select 1 from public.project_members pm where pm.project_id = checklist_sections.project_id and pm.user_id = auth.uid()))
with check (exists (select 1 from public.project_members pm where pm.project_id = checklist_sections.project_id and pm.user_id = auth.uid()));

create policy if not exists "ck_items_select" on public.checklist_items
for select using (exists (select 1 from public.project_members pm where pm.project_id = checklist_items.project_id and pm.user_id = auth.uid()));
create policy if not exists "ck_items_write" on public.checklist_items
for all using (exists (select 1 from public.project_members pm where pm.project_id = checklist_items.project_id and pm.user_id = auth.uid()))
with check (exists (select 1 from public.project_members pm where pm.project_id = checklist_items.project_id and pm.user_id = auth.uid()));`;

      qs("#sections").innerHTML = missingTableCard({
        title: "체크리스트",
        table: "checklist_sections / checklist_items",
        sql
      });
      bindCopyButtons(page);
      return;
    }

    const { data: sections, error: se } = await supabase
      .from("checklist_sections")
      .select("id,title,sort_order")
      .eq("project_id", projectId)
      .order("sort_order");

    if (se) {
      qs("#sections").innerHTML = `<div class="text-sm text-rose-700">${escapeHtml(se.message)}</div>`;
      return;
    }

    const { data: items, error: ie } = await supabase
      .from("checklist_items")
      .select("id,section_id,title,is_done,sort_order")
      .eq("project_id", projectId)
      .order("sort_order");

    if (ie) {
      qs("#sections").innerHTML = `<div class="text-sm text-rose-700">${escapeHtml(ie.message)}</div>`;
      return;
    }

    const bySection = new Map();
    (items || []).forEach(it => {
      if (!bySection.has(it.section_id)) bySection.set(it.section_id, []);
      bySection.get(it.section_id).push(it);
    });

    qs("#sections").innerHTML = (sections || []).map(s => {
      const list = bySection.get(s.id) || [];
      const done = list.filter(x => x.is_done).length;
      const total = list.length;
      const pct = total ? Math.round((done / total) * 100) : 0;

      return `
        <div class="${UI.bubbleBtn}">
          ${bubbleRow({
            leftIconName: "checklist",
            topPillsHtml: `
              <span class="${UI.pillStrong}">${escapeHtml(s.title)}</span>
              <span class="${UI.pill}">${done}/${total}</span>
              <span class="${UI.pill}">${pct}%</span>
              <button class="${UI.btnSm}" data-add="${s.id}"><span class="w-[14px] h-[14px]">${icon("plus", 14)}</span>이 섹션</button>
            `,
            title: total === 0 ? "할 일이 없어" : "할 일 목록",
            sub: total === 0 ? "추가해서 시작해봐" : "아래 목록을 눌러서 상세 편집",
            rightHint: ""
          })}

          <div class="relative mt-4 space-y-2">
            ${total === 0 ? "" :
              list.map(it => `
                <div class="flex items-center justify-between gap-3 px-3 py-2.5 rounded-[18px]
                            bg-white/55 border border-white/70 hover:bg-white/80 transition"
                     data-open="${it.id}">
                  <label class="flex items-center gap-3 flex-1 cursor-pointer min-w-0">
                    <input type="checkbox" data-toggle="${it.id}" ${it.is_done ? "checked" : ""} />
                    <div class="min-w-0">
                      <div class="text-[12.5px] font-medium text-slate-900 ${it.is_done ? "line-through opacity-60" : ""} truncate">
                        ${escapeHtml(it.title)}
                      </div>
                      <div class="${UI.sub} mt-1">클릭해서 편집</div>
                    </div>
                  </label>
                  <span class="${UI.sub}">→</span>
                </div>
              `).join("")
            }
          </div>
        </div>
      `;
    }).join("");

    // add item in section
    qsa("#sections [data-add]").forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const sectionId = btn.getAttribute("data-add");
        const ins = await supabase.from("checklist_items").insert({
          project_id: projectId,
          section_id: sectionId,
          title: "새 할 일",
          sort_order: Date.now(),
        }).select("id").single();

        if (ins.error || !ins.data?.id) {
          openConfirmModal({
            title: "추가 실패",
            message: ins.error?.message || "권한/테이블 상태를 확인해줘.",
            confirmText: "확인",
            cancelText: "닫기",
            tone: "ok",
          });
          return;
        }

        openDrawer("checklist_item", { id: ins.data.id, projectId });
      };
    });

    // toggle
    qsa("#sections input[data-toggle]").forEach(cb => {
      cb.onclick = (e) => e.stopPropagation();
      cb.onchange = async () => {
        const id = cb.getAttribute("data-toggle");
        await supabase.from("checklist_items").update({ is_done: cb.checked }).eq("id", id);
      };
    });

    // open drawer
    qsa("#sections [data-open]").forEach(row => {
      row.onclick = () => openDrawer("checklist_item", { id: row.getAttribute("data-open"), projectId });
    });
  }

  qs("#addItem").onclick = async () => {
    const { data: sec, error } = await supabase
      .from("checklist_sections")
      .select("id")
      .eq("project_id", projectId)
      .order("sort_order")
      .limit(1);

    if (error || !sec?.[0]?.id) {
      openConfirmModal({
        title: "추가 실패",
        message: error?.message || "섹션을 찾을 수 없어. 먼저 템플릿 생성이 필요해.",
        confirmText: "확인",
        cancelText: "닫기",
        tone: "ok",
      });
      return;
    }

    const ins = await supabase.from("checklist_items").insert({
      project_id: projectId,
      section_id: sec[0].id,
      title: "새 할 일",
      sort_order: Date.now(),
    }).select("id").single();

    if (ins.error || !ins.data?.id) {
      openConfirmModal({
        title: "추가 실패",
        message: ins.error?.message || "권한/테이블 상태를 확인해줘.",
        confirmText: "확인",
        cancelText: "닫기",
        tone: "ok",
      });
      return;
    }

    openDrawer("checklist_item", { id: ins.data.id, projectId });
  };

  const ch = supabase
    .channel("checklist")
    .on("postgres_changes", { event: "*", schema: "public", table: "checklist_sections", filter: `project_id=eq.${projectId}` }, load)
    .on("postgres_changes", { event: "*", schema: "public", table: "checklist_items", filter: `project_id=eq.${projectId}` }, load)
    .subscribe();

  window.__cleanup?.();
  window.__cleanup = () => supabase.removeChannel(ch);

  await load();
}

/* ---------- Budget ---------- */
async function budgetPage(projectId) {
  const page = qs("#page");
  page.innerHTML = pageHeader(
    "예산",
    "카드 클릭 → 오른쪽에서 금액/마감/메모 편집",
    "wallet",
    `<button id="addBudget" class="${UI.btnPrimary}"><span class="w-[16px] h-[16px]">${icon("plus", 16)}</span>항목</button>`
  );

  page.innerHTML += `
    <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" id="summary"></div>
    <div class="mt-4 space-y-4" id="cats"></div>
  `;

  async function ensureTemplate() {
    const { data, error } = await supabase
      .from("budget_categories")
      .select("id")
      .eq("project_id", projectId)
      .limit(1);

    if (error) return { ok: false, error };
    if (data && data.length > 0) return { ok: true };

    const defaults = ["예식장", "스드메", "스냅/영상", "부케/플라워", "청첩장", "기타"];
    const ins = await supabase.from("budget_categories").insert(
      defaults.map((t, i) => ({ project_id: projectId, title: t, sort_order: i }))
    );
    return ins.error ? { ok: false, error: ins.error } : { ok: true };
  }

  async function load() {
    const t = await ensureTemplate();
    if (!t.ok) {
      const sql = `-- budget_categories / budget_items (필요하면 실행)
create table if not exists public.budget_categories (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  sort_order bigint not null default 0,
  created_at timestamptz not null default now()
);
create table if not exists public.budget_items (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  category_id uuid not null references public.budget_categories(id) on delete cascade,
  item_name text not null,
  estimate numeric not null default 0,
  actual numeric not null default 0,
  paid numeric not null default 0,
  due_date date,
  notes text,
  sort_order bigint not null default 0,
  created_at timestamptz not null default now()
);

alter table public.budget_categories enable row level security;
alter table public.budget_items enable row level security;

create policy if not exists "bd_cats_select" on public.budget_categories
for select using (exists (select 1 from public.project_members pm where pm.project_id = budget_categories.project_id and pm.user_id = auth.uid()));
create policy if not exists "bd_cats_write" on public.budget_categories
for all using (exists (select 1 from public.project_members pm where pm.project_id = budget_categories.project_id and pm.user_id = auth.uid()))
with check (exists (select 1 from public.project_members pm where pm.project_id = budget_categories.project_id and pm.user_id = auth.uid()));

create policy if not exists "bd_items_select" on public.budget_items
for select using (exists (select 1 from public.project_members pm where pm.project_id = budget_items.project_id and pm.user_id = auth.uid()));
create policy if not exists "bd_items_write" on public.budget_items
for all using (exists (select 1 from public.project_members pm where pm.project_id = budget_items.project_id and pm.user_id = auth.uid()))
with check (exists (select 1 from public.project_members pm where pm.project_id = budget_items.project_id and pm.user_id = auth.uid()));`;

      qs("#cats").innerHTML = missingTableCard({
        title: "예산",
        table: "budget_categories / budget_items",
        sql
      });
      bindCopyButtons(page);
      return;
    }

    const { data: cats, error: ce } = await supabase
      .from("budget_categories")
      .select("id,title,sort_order")
      .eq("project_id", projectId)
      .order("sort_order");

    if (ce) {
      qs("#cats").innerHTML = `<div class="text-sm text-rose-700">${escapeHtml(ce.message)}</div>`;
      return;
    }

    const { data: items, error: ie } = await supabase
      .from("budget_items")
      .select("id,category_id,item_name,estimate,actual,paid,sort_order")
      .eq("project_id", projectId)
      .order("sort_order");

    if (ie) {
      qs("#cats").innerHTML = `<div class="text-sm text-rose-700">${escapeHtml(ie.message)}</div>`;
      return;
    }

    const totals = (items || []).reduce((acc, it) => {
      acc.estimate += n(it.estimate);
      acc.actual += n(it.actual);
      acc.paid += n(it.paid);
      return acc;
    }, { estimate: 0, actual: 0, paid: 0 });
    const unpaid = Math.max(0, totals.actual - totals.paid);

    qs("#summary").innerHTML = `
      <div class="${UI.bubbleBtn}">${bubbleRow({ leftIconName:"wallet", topPillsHtml:`<span class="${UI.pillStrong}">예상</span>`, title:`${moneyFmt(totals.estimate)}원`, sub:"", rightHint:"" })}</div>
      <div class="${UI.bubbleBtn}">${bubbleRow({ leftIconName:"wallet", topPillsHtml:`<span class="${UI.pillStrong}">실제</span>`, title:`${moneyFmt(totals.actual)}원`, sub:"", rightHint:"" })}</div>
      <div class="${UI.bubbleBtn}">${bubbleRow({ leftIconName:"wallet", topPillsHtml:`<span class="${UI.pillStrong}">지불</span>`, title:`${moneyFmt(totals.paid)}원`, sub:"", rightHint:"" })}</div>
      <div class="${UI.bubbleBtn}">${bubbleRow({ leftIconName:"wallet", topPillsHtml:`<span class="${UI.pillStrong}">미지불</span>`, title:`${moneyFmt(unpaid)}원`, sub:"", rightHint:"" })}</div>
    `;

    const byCat = new Map();
    (items || []).forEach(it => {
      if (!byCat.has(it.category_id)) byCat.set(it.category_id, []);
      byCat.get(it.category_id).push(it);
    });

    qs("#cats").innerHTML = (cats || []).map(c => {
      const list = byCat.get(c.id) || [];
      const catTotal = list.reduce((a, it) => a + n(it.actual), 0);

      return `
        <div class="${UI.bubbleBtn}">
          ${bubbleRow({
            leftIconName: "wallet",
            topPillsHtml: `
              <span class="${UI.pillStrong}">${escapeHtml(c.title)}</span>
              <span class="${UI.pill}">합계 <b>${moneyFmt(catTotal)}</b>원</span>
              <button class="${UI.btnSm}" data-add="${c.id}"><span class="w-[14px] h-[14px]">${icon("plus", 14)}</span>추가</button>
            `,
            title: list.length ? "항목 목록" : "항목이 없어",
            sub: list.length ? "항목을 눌러서 상세 편집" : "추가해서 시작해봐",
            rightHint: ""
          })}

          <div class="relative mt-4 space-y-2">
            ${list.length === 0 ? "" :
              list.map(it => {
                const remaining = Math.max(0, n(it.actual) - n(it.paid));
                return `
                  <button data-open="${it.id}"
                    class="w-full text-left px-3 py-3 rounded-[18px]
                           bg-white/55 border border-white/70 hover:bg-white/80 transition">
                    <div class="flex items-start justify-between gap-3">
                      <div class="min-w-0">
                        <div class="text-[12.8px] font-semibold text-slate-900 truncate">${escapeHtml(it.item_name)}</div>
                        <div class="mt-2 flex flex-wrap gap-2">
                          <span class="${UI.pill}">예상 <b>${moneyFmt(it.estimate)}</b></span>
                          <span class="${UI.pill}">실제 <b>${moneyFmt(it.actual)}</b></span>
                          <span class="${UI.pill}">지불 <b>${moneyFmt(it.paid)}</b></span>
                          <span class="${UI.pillStrong}">잔액 <b>${moneyFmt(remaining)}</b></span>
                        </div>
                      </div>
                      <span class="${UI.sub} mt-1">편집</span>
                    </div>
                  </button>
                `;
              }).join("")
            }
          </div>
        </div>
      `;
    }).join("");

    // add in category
    qsa("#cats [data-add]").forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const categoryId = btn.getAttribute("data-add");
        const ins = await supabase.from("budget_items").insert({
          project_id: projectId,
          category_id: categoryId,
          item_name: "새 예산 항목",
          estimate: 0,
          actual: 0,
          paid: 0,
          sort_order: Date.now(),
        }).select("id").single();

        if (ins.error || !ins.data?.id) {
          openConfirmModal({
            title: "추가 실패",
            message: ins.error?.message || "권한/테이블 상태를 확인해줘.",
            confirmText: "확인",
            cancelText: "닫기",
            tone: "ok",
          });
          return;
        }

        openDrawer("budget_item", { id: ins.data.id, projectId });
      };
    });

    // open drawer
    qsa("#cats [data-open]").forEach(btn => {
      btn.onclick = () => openDrawer("budget_item", { id: btn.getAttribute("data-open"), projectId });
    });
  }

  qs("#addBudget").onclick = async () => {
    const { data: cats, error } = await supabase
      .from("budget_categories")
      .select("id")
      .eq("project_id", projectId)
      .order("sort_order")
      .limit(1);

    if (error || !cats?.[0]?.id) {
      openConfirmModal({
        title: "추가 실패",
        message: error?.message || "카테고리를 찾을 수 없어. 먼저 템플릿 생성이 필요해.",
        confirmText: "확인",
        cancelText: "닫기",
        tone: "ok",
      });
      return;
    }

    const ins = await supabase.from("budget_items").insert({
      project_id: projectId,
      category_id: cats[0].id,
      item_name: "새 예산 항목",
      estimate: 0,
      actual: 0,
      paid: 0,
      sort_order: Date.now(),
    }).select("id").single();

    if (ins.error || !ins.data?.id) {
      openConfirmModal({
        title: "추가 실패",
        message: ins.error?.message || "권한/테이블 상태를 확인해줘.",
        confirmText: "확인",
        cancelText: "닫기",
        tone: "ok",
      });
      return;
    }

    openDrawer("budget_item", { id: ins.data.id, projectId });
  };

  const ch = supabase
    .channel("budget")
    .on("postgres_changes", { event: "*", schema: "public", table: "budget_categories", filter: `project_id=eq.${projectId}` }, load)
    .on("postgres_changes", { event: "*", schema: "public", table: "budget_items", filter: `project_id=eq.${projectId}` }, load)
    .subscribe();

  window.__cleanup?.();
  window.__cleanup = () => supabase.removeChannel(ch);

  await load();
}

/* ---------- Ceremony ---------- */
async function ceremonyPage(projectId) {
  const page = qs("#page");
  page.innerHTML = pageHeader("예식", "한 번 정리해두면 계속 편해", "doc");

  // try load
  const { data, error } = await supabase
    .from("ceremony_info")
    .select("*")
    .eq("project_id", projectId)
    .limit(1);

  if (error) {
    const sql = `-- ceremony_info (예식 정보: 단일 row)
create table if not exists public.ceremony_info (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  ceremony_date date,
  ceremony_time time,
  venue text,
  address text,
  contact text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.ceremony_info enable row level security;

create policy if not exists "cer_select" on public.ceremony_info
for select using (exists (select 1 from public.project_members pm where pm.project_id = ceremony_info.project_id and pm.user_id = auth.uid()));
create policy if not exists "cer_write" on public.ceremony_info
for all using (exists (select 1 from public.project_members pm where pm.project_id = ceremony_info.project_id and pm.user_id = auth.uid()))
with check (exists (select 1 from public.project_members pm where pm.project_id = ceremony_info.project_id and pm.user_id = auth.uid()));`;

    page.innerHTML += `<div class="mt-4">${missingTableCard({ title: "예식", table: "ceremony_info", sql })}</div>`;
    bindCopyButtons(page);
    return;
  }

  let row = data?.[0] || null;

  if (!row) {
    // create default row
    const ins = await supabase.from("ceremony_info").insert({
      project_id: projectId,
      ceremony_date: null,
      ceremony_time: null,
      venue: "",
      address: "",
      contact: "",
      notes: "",
    }).select("*").single();

    if (ins.error) {
      page.innerHTML += `<div class="mt-4 text-sm text-rose-700">${escapeHtml(ins.error.message)}</div>`;
      return;
    }
    row = ins.data;
  }

  page.innerHTML += `
    <div class="mt-4 ${UI.bubbleBtn}">
      ${bubbleRow({
        leftIconName: "doc",
        topPillsHtml: `<span class="${UI.pillStrong}">정보</span>`,
        title: "예식 정보",
        sub: "입력하면 자동 저장돼",
        rightHint: ""
      })}

      <div class="relative mt-4 space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <div class="${UI.label} mb-1">날짜</div>
            <input id="ce_date" type="date" class="${UI.input}" value="${row.ceremony_date ?? ""}"/>
          </div>
          <div>
            <div class="${UI.label} mb-1">시간</div>
            <input id="ce_time" type="time" class="${UI.input}" value="${row.ceremony_time ? timeToHHMM(row.ceremony_time) : ""}"/>
          </div>
        </div>

        <div>
          <div class="${UI.label} mb-1">장소</div>
          <input id="ce_venue" class="${UI.input}" value="${escapeHtml(row.venue || "")}" placeholder="예식장 이름"/>
        </div>

        <div>
          <div class="${UI.label} mb-1">주소(선택)</div>
          <input id="ce_addr" class="${UI.input}" value="${escapeHtml(row.address || "")}" />
        </div>

        <div>
          <div class="${UI.label} mb-1">연락처(선택)</div>
          <input id="ce_contact" class="${UI.input}" value="${escapeHtml(row.contact || "")}" placeholder="담당자/전화/메신저"/>
        </div>

        <div>
          <div class="${UI.label} mb-1">메모(선택)</div>
          <textarea id="ce_notes" class="${UI.textarea}" rows="6">${escapeHtml(row.notes || "")}</textarea>
        </div>

        <div class="${UI.sub}">※ 저장은 자동으로 돼 (입력 후 포커스가 빠지면 저장)</div>
      </div>
    </div>
  `;

  const id = row.id;
  const save = (patch) => safeUpdate("ceremony_info", id, { ...patch, updated_at: new Date().toISOString() });

  bindSave("#ce_date", (el) => save({ ceremony_date: el.value || null }));
  bindSave("#ce_time", (el) => save({ ceremony_time: hhmmToTime(el.value) }));
  bindSave("#ce_venue", (el) => save({ venue: el.value || "" }));
  bindSave("#ce_addr", (el) => save({ address: el.value || "" }));
  bindSave("#ce_contact", (el) => save({ contact: el.value || "" }));
  bindSave("#ce_notes", (el) => save({ notes: el.value || "" }));
}

/* ---------- Vendors ---------- */
async function vendorsPage(projectId) {
  const page = qs("#page");
  page.innerHTML = pageHeader(
    "업체",
    "상태/지불/메모를 한 번에",
    "building",
    `<button id="addVendor" class="${UI.btnPrimary}"><span class="w-[16px] h-[16px]">${icon("plus", 16)}</span>추가</button>`
  );

  page.innerHTML += `<div class="mt-4 space-y-3" id="vendorsList"></div>`;

  async function load() {
    const { data, error } = await supabase
      .from("vendors")
      .select("id,category,name,status,contract_amount,paid_amount,updated_at,created_at")
      .eq("project_id", projectId)
      .order("updated_at", { ascending: false });

    if (error) {
      const sql = `-- vendors (업체)
create table if not exists public.vendors (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  category text,
  name text not null,
  contact text,
  status text not null default '리서치',
  contract_amount numeric not null default 0,
  paid_amount numeric not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.vendors enable row level security;

create policy if not exists "vendors_select" on public.vendors
for select using (exists (select 1 from public.project_members pm where pm.project_id = vendors.project_id and pm.user_id = auth.uid()));
create policy if not exists "vendors_write" on public.vendors
for all using (exists (select 1 from public.project_members pm where pm.project_id = vendors.project_id and pm.user_id = auth.uid()))
with check (exists (select 1 from public.project_members pm where pm.project_id = vendors.project_id and pm.user_id = auth.uid()));`;

      qs("#vendorsList").innerHTML = missingTableCard({ title: "업체", table: "vendors", sql });
      bindCopyButtons(page);
      return;
    }

    qs("#vendorsList").innerHTML = (data || []).map(v => {
      const remain = Math.max(0, n(v.contract_amount) - n(v.paid_amount));
      return `
        <button class="${UI.bubbleBtn}" data-open="${v.id}">
          ${bubbleRow({
            leftIconName: "building",
            topPillsHtml: `
              <span class="${UI.pillStrong}">${escapeHtml(v.category || "업체")}</span>
              <span class="${UI.pill}">${escapeHtml(v.status || "진행")}</span>
              <span class="${UI.pill}">잔액 <b>${moneyFmt(remain)}</b>원</span>
            `,
            title: v.name || "업체명",
            sub: "",
            rightHint: "편집"
          })}
        </button>
      `;
    }).join("") || `
      <div class="${UI.bubbleBtn}">
        ${bubbleRow({
          leftIconName: "building",
          topPillsHtml: `<span class="${UI.pillStrong}">비어있음</span>`,
          title: "등록된 업체가 없어",
          sub: "추가 버튼으로 시작해봐",
          rightHint: ""
        })}
      </div>
    `;

    qsa("#vendorsList [data-open]").forEach(btn => {
      btn.onclick = () => openDrawer("vendor", { id: btn.getAttribute("data-open"), projectId });
    });
  }

  qs("#addVendor").onclick = async () => {
    const ins = await supabase.from("vendors").insert({
      project_id: projectId,
      category: "업체",
      name: "새 업체",
      status: "리서치",
      contract_amount: 0,
      paid_amount: 0,
      updated_at: new Date().toISOString(),
    }).select("id").single();

    if (ins.error || !ins.data?.id) {
      openConfirmModal({
        title: "추가 실패",
        message: ins.error?.message || "권한/테이블 상태를 확인해줘.",
        confirmText: "확인",
        cancelText: "닫기",
        tone: "ok",
      });
      return;
    }

    openDrawer("vendor", { id: ins.data.id, projectId });
  };

  const ch = supabase
    .channel("vendors")
    .on("postgres_changes", { event: "*", schema: "public", table: "vendors", filter: `project_id=eq.${projectId}` }, load)
    .subscribe();

  window.__cleanup?.();
  window.__cleanup = () => supabase.removeChannel(ch);

  await load();
}

/* ---------- Memos ---------- */
async function memosPage(projectId) {
  const page = qs("#page");
  page.innerHTML = pageHeader(
    "메모",
    "아이디어/링크/할 말을 모아두기",
    "note",
    `<button id="addMemo" class="${UI.btnPrimary}"><span class="w-[16px] h-[16px]">${icon("plus", 16)}</span>추가</button>`
  );

  page.innerHTML += `
    <div class="mt-4 flex items-center gap-2">
      <input id="memoSearch" class="${UI.input}" placeholder="검색(제목/내용/태그)" />
      <button id="memoClear" class="${UI.btnSm}">지우기</button>
    </div>
    <div class="mt-4 space-y-3" id="memosList"></div>
  `;

  let all = [];

  async function load() {
    const { data, error } = await supabase
      .from("memos")
      .select("id,tag,title,body,updated_at,created_at")
      .eq("project_id", projectId)
      .order("updated_at", { ascending: false });

    if (error) {
      const sql = `-- memos (메모)
create table if not exists public.memos (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  tag text,
  title text not null,
  body text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.memos enable row level security;

create policy if not exists "memos_select" on public.memos
for select using (exists (select 1 from public.project_members pm where pm.project_id = memos.project_id and pm.user_id = auth.uid()));
create policy if not exists "memos_write" on public.memos
for all using (exists (select 1 from public.project_members pm where pm.project_id = memos.project_id and pm.user_id = auth.uid()))
with check (exists (select 1 from public.project_members pm where pm.project_id = memos.project_id and pm.user_id = auth.uid()));`;

      qs("#memosList").innerHTML = missingTableCard({ title: "메모", table: "memos", sql });
      bindCopyButtons(page);
      return;
    }

    all = data || [];
    renderList();
  }

  function renderList() {
    const q = (qs("#memoSearch").value || "").trim().toLowerCase();
    const list = q
      ? all.filter(x =>
          String(x.title || "").toLowerCase().includes(q) ||
          String(x.body || "").toLowerCase().includes(q) ||
          String(x.tag || "").toLowerCase().includes(q)
        )
      : all;

    qs("#memosList").innerHTML = (list || []).map(m => `
      <button class="${UI.bubbleBtn}" data-open="${m.id}">
        ${bubbleRow({
          leftIconName: "note",
          topPillsHtml: `
            <span class="${UI.pillStrong}">${escapeHtml(m.tag || "메모")}</span>
            <span class="${UI.pill}">${escapeHtml(String(m.updated_at || "").slice(0,10) || "")}</span>
          `,
          title: m.title || "메모",
          sub: (m.body || "").slice(0, 120),
          rightHint: "편집"
        })}
      </button>
    `).join("") || `
      <div class="${UI.bubbleBtn}">
        ${bubbleRow({
          leftIconName: "note",
          topPillsHtml: `<span class="${UI.pillStrong}">비어있음</span>`,
          title: "메모가 없어",
          sub: "추가해서 쌓아두면 편해",
          rightHint: ""
        })}
      </div>
    `;

    qsa("#memosList [data-open]").forEach(btn => {
      btn.onclick = () => openDrawer("memo", { id: btn.getAttribute("data-open"), projectId });
    });
  }

  qs("#memoSearch").addEventListener("input", renderList);
  qs("#memoClear").onclick = () => { qs("#memoSearch").value = ""; renderList(); };

  qs("#addMemo").onclick = async () => {
    const ins = await supabase.from("memos").insert({
      project_id: projectId,
      tag: "메모",
      title: "새 메모",
      body: "",
      updated_at: new Date().toISOString(),
    }).select("id").single();

    if (ins.error || !ins.data?.id) {
      openConfirmModal({
        title: "추가 실패",
        message: ins.error?.message || "권한/테이블 상태를 확인해줘.",
        confirmText: "확인",
        cancelText: "닫기",
        tone: "ok",
      });
      return;
    }

    openDrawer("memo", { id: ins.data.id, projectId });
  };

  const ch = supabase
    .channel("memos")
    .on("postgres_changes", { event: "*", schema: "public", table: "memos", filter: `project_id=eq.${projectId}` }, load)
    .subscribe();

  window.__cleanup?.();
  window.__cleanup = () => supabase.removeChannel(ch);

  await load();
}

/** =========================
 *  Render
 *  ========================= */
async function render() {
  await ensureAuthFromUrl();

  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData?.session;

  if (!session) {
    loginView();
    return;
  }

  layoutShell(session.user.email || "");
  let projectId;
  try {
    projectId = await getProjectId();
  } catch (e) {
    qs("#page").innerHTML = `<div class="text-sm text-rose-700">프로젝트를 불러오지 못했어: ${escapeHtml(e?.message || e)}</div>`;
    return;
  }

  const r = getRoute();
  if (r === "/overview") return overviewPage(projectId);
  if (r === "/timeline") return timelinePage(projectId);
  if (r === "/ceremony") return ceremonyPage(projectId);
  if (r === "/vendors") return vendorsPage(projectId);
  if (r === "/checklist") return checklistPage(projectId);
  if (r === "/budget") return budgetPage(projectId);
  if (r === "/memos") return memosPage(projectId);

  location.hash = "#/overview";
}

window.addEventListener("hashchange", render);
render();
