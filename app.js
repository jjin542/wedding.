import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * Tip
 * - GitHub Pages(또는 정적 호스팅)에서 세션 유지: persistSession/autoRefreshToken/detectSessionInUrl 켜둠
 * - 회사 PC가 "브라우저 종료 시 사이트 데이터 삭제" 정책이면, 어떤 앱도 로그인 유지가 어렵다(브라우저 설정 문제)
 */

const SUPABASE_URL = "https://ibjjbgthwmpvifbzxhwa.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliampiZ3Rod21wdmlmYnp4aHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NjExMTcsImV4cCI6MjA4NDQzNzExN30.Bb3fyGlJ_16gao6W8P0yaMotsD5DIEeTJVan3m5OKQw";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce",
  },
});

const app = document.getElementById("app");

function qs(sel) {
  return document.querySelector(sel);
}
function qsa(sel) {
  return Array.from(document.querySelectorAll(sel));
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

function isMissingTable(err) {
  const msg = String(err?.message || "");
  return msg.includes("42P01") || msg.toLowerCase().includes("does not exist") || msg.toLowerCase().includes("relation");
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
function timeToHHMM(t) {
  if (!t) return "";
  return String(t).slice(0, 5);
}
function hhmmToTime(hhmm) {
  if (!hhmm) return null;
  return hhmm.length === 5 ? `${hhmm}:00` : hhmm;
}

// ---------- Palette (White + Neon Pink Glass) ----------
const PALETTE = {
  accent: "#FF3BD4",
  accent2: "#A855F7",
  ink: "#0F172A",
};

// ---------- Icon system // (Iconly-ish: thin, round, gradient stroke) ----------
 // (Iconly-ish: thin, round, gradient stroke) ----------
// svg gradient id 충돌 방지용 시퀀스
let __svgSeq = 0;

// ---------- Icon system // (Iconly-ish: thin, round, gradient stroke) ----------
function iconSvg(name, active) {
  const isActive = !!active;

  const strokeA = isActive ? PALETTE.accent : "rgba(15,23,42,0.78)";
  const strokeB = isActive ? PALETTE.accent2 : "rgba(15,23,42,0.55)";

  // ✅ 각 svg마다 고유 gid 부여 (안전)
  const gid = `g_${name}_${isActive ? "a" : "i"}_${++__svgSeq}`;

  const base =
    `viewBox="0 0 24 24" width="22" height="22" fill="none" ` +
    `stroke="url(#${gid})" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"`;

  const defs = `
    <defs>
      <linearGradient id="${gid}" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stop-color="${strokeA}"/>
        <stop offset="1" stop-color="${strokeB}"/>
      </linearGradient>
    </defs>
  `;

  const paths = {
    home: `<path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.8V21h13V9.8"/>`,
    calendar: `<rect x="3.5" y="5" width="17" height="16" rx="3"/><path d="M7 3.5v3M17 3.5v3M3.5 9h17"/>`,
    checklist: `<path d="M8.2 6.6h12"/><path d="M8.2 12h12"/><path d="M8.2 17.4h12"/><path d="M4.2 6.6l1.2 1.2 2.1-2.1"/><path d="M4.2 12l1.2 1.2 2.1-2.1"/><path d="M4.2 17.4l1.2 1.2 2.1-2.1"/>`,
    wallet: `<path d="M4 7.5c0-1.4 1.1-2.5 2.5-2.5H18a2 2 0 0 1 2 2v10a2.5 2.5 0 0 1-2.5 2.5H6.5A2.5 2.5 0 0 1 4 17V7.5Z"/><path d="M20 11h-5.5a2 2 0 0 0 0 4H20"/><path d="M16.3 13h.01"/>`,
    note: `<path d="M7 3.8h7.5L19.5 8.8V20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5.8a2 2 0 0 1 2-2Z"/><path d="M14.5 3.8v5h5"/><path d="M8 13h8"/><path d="M8 16.8h6"/>`,
    bag: `<path d="M7 8V7a5 5 0 0 1 10 0v1"/><path d="M6 8h12l-1 13a2 2 0 0 1-2 1H9a2 2 0 0 1-2-1L6 8Z"/>`,
    sparkle: `<path d="M12 3l1.3 3.7L17 8l-3.7 1.3L12 13l-1.3-3.7L7 8l3.7-1.3L12 3Z"/><path d="M19 13l.8 2.1L22 16l-2.2.9L19 19l-.8-2.1L16 16l2.2-.9L19 13Z"/>`,
    clock: `<path d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Z"/><path d="M12 7v5l3 2"/>`,
    pin: `<path d="M14 3 20 9l-2 2-2-2-4 4v5l-2-2-2 2v-5l4-4-2-2 2-2Z"/>`,
  };

  const body = paths[name] || paths.home;
  return `<svg ${base} aria-hidden="true">${defs}${body}</svg>`;
}


function iconBadge(svg, active = false) {
  // circle badge like the reference (soft + border)
  const bg = active
    ? "bg-[rgba(241,251,153,0.45)] border-white/80 shadow-[0_12px_26px_rgba(241,251,153,0.22)]"
    : "bg-white/55 border-white/70";
  return `
    <span class="inline-flex items-center justify-center w-10 h-10 rounded-[18px] border ${bg}">
      ${svg}
    </span>
  `;
}

// ---------- UI classes (smaller + bubble-like) ----------
const UI = {
  pageWrap: "min-h-screen p-4 sm:p-6 md:p-10 flex items-start justify-center bg-white",
  shell: "w-full max-w-6xl grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 md:gap-5",

  card: "backdrop-blur-2xl bg-white/75 border border-[rgba(255,59,212,0.28)] shadow-[0_22px_70px_rgba(255,59,212,0.10)] rounded-[28px] ring-1 ring-white/60",
  cardInner: "p-5 sm:p-6",

  h1: "text-[17px] sm:text-[18px] font-bold tracking-tight text-ink",
  h2: "text-[12.5px] font-bold text-ink",
  sub: "text-[12px] text-slate-700/80",
  tiny:"text-[11px] text-slate-700/70",
  label:"text-[11px] text-slate-700/75",

  navLink:
    "flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-[12.5px] " +
    "text-slate-800/85 hover:bg-white/60 transition",
  navLinkActive:
    "bg-white/85 border border-white/90 shadow-[0_14px_40px_rgba(0,0,0,0.06)]",

  btn:
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 " +
    "text-[12px] font-medium text-ink bg-white/65 border border-white/80 " +
    "hover:bg-white/85 transition shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
  btnSm:
    "inline-flex items-center justify-center gap-2 rounded-full px-3 py-1.5 " +
    "text-[11px] font-medium text-ink bg-white/65 border border-white/80 hover:bg-white/85 transition",

  btnPrimary:
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 " +
    "text-[12px] font-bold text-white bg-accent " +
    "hover:brightness-[0.98] transition shadow-[0_18px_60px_rgba(255,59,212,0.25)]",
  btnDanger:
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 " +
    "text-[12px] font-bold text-white bg-rose-500 " +
    "hover:brightness-[0.98] transition shadow-[0_18px_55px_rgba(244,63,94,0.18)]",


  input:
    "w-full rounded-2xl border border-[rgba(255,59,212,0.22)] bg-white/85 px-4 py-3 " +
    "text-[12.5px] text-ink placeholder:text-slate-400 outline-none " +
    "focus:ring-2 focus:ring-[rgba(255,59,212,0.25)]",

  textarea:
    "w-full rounded-2xl border border-[rgba(255,59,212,0.22)] bg-white/85 px-4 py-3 " +
    "text-[12.5px] text-ink placeholder:text-slate-400 outline-none " +
    "focus:ring-2 focus:ring-[rgba(255,59,212,0.25)]",

  pill:
    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 " +
    "text-[11px] text-ink/90 bg-white/60 border border-white/80",
  pillAccent:
    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 " +
    "text-[11px] font-medium text-ink chip-accent border border-white/80",
  pillStrong:
    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 " +
    "text-[11px] font-semibold text-white bg-accent border border-white/70 shadow-[0_10px_30px_rgba(255,59,212,0.22)]",


  bubble:
    "relative w-full text-left rounded-[24px] p-4 sm:p-[18px] " +
    "bg-white/78 border border-[rgba(255,59,212,0.22)] hover:bg-white/90 transition " +
    "shadow-[0_18px_60px_rgba(255,59,212,0.10)] overflow-hidden",

  bubbleOverlay:
    "absolute inset-0 pointer-events-none",
};

function ensureThemeStyles() {
  if (document.getElementById("__themeStyles")) return;
  const st = document.createElement("style");
  st.id = "__themeStyles";
  st.textContent = `
    :root{
      --accent: ${PALETTE.accent};
      --accent2: ${PALETTE.accent2};
      --accent-weak: rgba(255,59,212,0.26);
      --accent-weak2: rgba(168,85,247,0.20);
    }
    body{
      background: #fff;
      color: ${PALETTE.ink};
    }
    body:before{
      content:"";
      position:fixed;
      inset:0;
      pointer-events:none;
      background:
        radial-gradient(circle at 12% 10%, rgba(255,59,212,0.16), transparent 58%),
        radial-gradient(circle at 86% 18%, rgba(168,85,247,0.12), transparent 60%),
        radial-gradient(circle at 50% 92%, rgba(255,59,212,0.10), transparent 55%);
      mix-blend-mode: normal;
      z-index:-1;
    }
    .bg-accent{ background: linear-gradient(135deg, var(--accent), var(--accent2)); }
    .chip-accent{ background: rgba(255,59,212,0.10); }
    .text-ink{ color: ${PALETTE.ink}; }
    .shadow-soft{ box-shadow: 0 22px 70px rgba(255,59,212,0.10); }
    .neon-border{ border-color: rgba(255,59,212,0.28)!important; }
    .neon-shadow{ box-shadow: 0 18px 60px rgba(255,59,212,0.12)!important; }
    .glass{ backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); }
    .focus-neon:focus{ outline:none; box-shadow: 0 0 0 3px rgba(255,59,212,0.22); }
  `;
  document.head.appendChild(st);
}

function bubbleOverlayStyle() {
  return `background:
    radial-gradient(circle at 18% 20%, var(--accent-weak), transparent 62%),
    radial-gradient(circle at 82% 30%, rgba(255,255,255,0.55), transparent 62%),
    radial-gradient(circle at 70% 90%, var(--accent-weak2), transparent 55%);`;
}


// ---------- Routing ----------
function getRoute() {
  const h = location.hash || "#/overview";
  if (h.startsWith("#/")) return h.slice(1);
  return "/overview";
}
function isAuthHash() {
  return location.hash.startsWith("#access_token=") || location.hash.startsWith("#error=");
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
    const error = params.get("error_description") || params.get("error");
    if (error) console.error("Auth error:", error);

    if (access_token && refresh_token) {
      await supabase.auth.setSession({ access_token, refresh_token });
    }
    location.hash = "#/overview";
  }
}

// ---------- Modal confirm (pretty) ----------
function mountConfirmModal() {
  if (qs("#confirmOverlay")) return;

  const el = document.createElement("div");
  el.innerHTML = `
    <div id="confirmOverlay" class="fixed inset-0 bg-black/25 opacity-0 pointer-events-none transition"></div>
    <div id="confirmPanel" class="fixed inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center
         opacity-0 pointer-events-none transition">
      <div class="w-full sm:w-[420px] mx-auto p-4 sm:p-0">
        <div class="${UI.card} rounded-[28px] overflow-hidden">
          <div class="p-5">
            <div class="flex items-start gap-3">
              <div class="shrink-0">${iconBadge(iconSvg("sparkle", true), true)}</div>
              <div class="min-w-0">
                <div id="confirmTitle" class="text-[14px] font-semibold text-slate-900">확인</div>
                <div id="confirmMsg" class="${UI.sub} mt-1">정말 진행할까?</div>
              </div>
            </div>

            <div class="mt-4 flex items-center justify-end gap-2">
              <button id="confirmCancel" class="${UI.btn}">취소</button>
              <button id="confirmOk" class="${UI.btnPrimary}">확인</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(el);
}

function confirmModal(opts) {
  opts = opts || {};
  var title = opts.title || "확인";
  var message = opts.message || "정말 진행할까?";
  var okText = opts.okText || "확인";
  var cancelText = opts.cancelText || "취소";
  var danger = !!opts.danger;

  mountConfirmModal();

  const overlay = qs("#confirmOverlay");
  const panel = qs("#confirmPanel");
  const titleEl = qs("#confirmTitle");
  const msgEl = qs("#confirmMsg");
  const okBtn = qs("#confirmOk");
  const cancelBtn = qs("#confirmCancel");

  titleEl.textContent = title || "확인";
  msgEl.textContent = message || "정말 진행할까?";
  okBtn.textContent = okText;
  cancelBtn.textContent = cancelText;

  okBtn.className = danger ? UI.btnDanger : UI.btnPrimary;

  return new Promise((resolve) => {
    const close = (val) => {
      overlay.classList.add("opacity-0", "pointer-events-none");
      overlay.classList.remove("opacity-100");
      panel.classList.add("opacity-0", "pointer-events-none");
      panel.classList.remove("opacity-100");
      cleanup();
      resolve(val);
    };

    const onOk = () => close(true);
    const onCancel = () => close(false);
    const onOverlay = () => close(false);
    const onKey = (e) => {
      if (e.key === "Escape") close(false);
      if (e.key === "Enter") close(true);
    };

    const cleanup = () => {
      okBtn.removeEventListener("click", onOk);
      cancelBtn.removeEventListener("click", onCancel);
      overlay.removeEventListener("click", onOverlay);
      window.removeEventListener("keydown", onKey);
    };

    okBtn.addEventListener("click", onOk);
    cancelBtn.addEventListener("click", onCancel);
    overlay.addEventListener("click", onOverlay);
    window.addEventListener("keydown", onKey);

    overlay.classList.remove("opacity-0", "pointer-events-none");
    overlay.classList.add("opacity-100");
    panel.classList.remove("opacity-0", "pointer-events-none");
    panel.classList.add("opacity-100");
  });
}

// ---------- Drawer ----------
let drawerState = { open: false, kind: null, id: null, projectId: null, extra: {} };

function setDrawerOpen(open) {
  drawerState.open = open;
  const dock = qs("#drawerDock");

  if (dock) {
    if (open) {
      dock.classList.remove("hidden");
      // dock content is created by renderDrawer()
      // scroll into view for inline editing UX
      try { dock.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (_) {}
    } else {
      dock.classList.add("hidden");
      dock.innerHTML = "";
      drawerState = { open: false, kind: null, id: null, projectId: null, extra: {} };
    }
    return;
  }

  // DOM 없을 때도 상태는 정리
  if (!open) drawerState = { open: false, kind: null, id: null, projectId: null, extra: {} };
}

function closeDrawer() {
  setDrawerOpen(false);
}
function setDrawerStatus(msg) {
  const el = qs("#drawerStatus");
  if (el) el.textContent = msg || "";
}
async function safeUpdate(table, id, patch) {
  setDrawerStatus("저장 중...");
  const { error } = await supabase.from(table).update(patch).eq("id", id);
  if (error) {
    const msg = String(error.message || "");
    if (msg.toLowerCase().includes("column") && (
      msg.includes("spent_on") || msg.includes("paid_on")
    )) {
      setDrawerStatus(`저장 실패: ${msg} (Tip: budget_items에 spent_on, paid_on 컬럼을 추가하면 지출/지불 날짜 기록이 가능해.)`);
      return false;
    }
    setDrawerStatus(`저장 실패: ${msg}`);
    return false;
  }
  setDrawerStatus("저장됨");
  return true;
}
function bindSave(selector, fn) {
  const el = qs(selector);
  if (!el) return;
  const handler = async () => {
    try {
      await fn(el);
    } catch (e) {
      setDrawerStatus(String(e?.message || e));
    }
  };
  el.addEventListener("change", handler);
  el.addEventListener("blur", handler);
}
async function openDrawer(kind, { id, projectId, ...extra }) {
  drawerState = { open: true, kind, id, projectId, extra };
  setDrawerOpen(true);
  await renderDrawer();
}

// ---------- Drawer renderers ----------
const TIMELINE_ICON_CHOICES = [
  { key: "clock", label: "시간", icon: "clock" },
  { key: "calendar", label: "캘린더", icon: "calendar" },
  { key: "sparkle", label: "포인트", icon: "sparkle" },
  { key: "camera", label: "촬영", icon: "note" }, // reuse note-ish
  { key: "map", label: "장소", icon: "note" },    // keep simple
];

function renderIconSelect(id, valueKey) {
  const v = valueKey || "clock";
  const opts = TIMELINE_ICON_CHOICES.map((c) => {
    const active = c.key === v;
    return `<option value="${c.key}" ${active ? "selected" : ""}>${c.label}</option>`;
  }).join("");
  return `<select id="${id}" class="${UI.input}">${opts}</select>`;
}

async function renderDrawer() {
  const { kind, id, projectId } = drawerState;

  const dock = qs("#drawerDock");
  if (!dock) return;
  // Ensure dock skeleton
  if (!qs("#drawerTitle")) {
    dock.innerHTML = `
      <div class="${UI.bubble} neon-border neon-shadow glass">
        <div class="${UI.bubbleOverlay}" style="${bubbleOverlayStyle()}"></div>
        <div class="relative flex items-center justify-between gap-3">
          <div id="drawerTitle"></div>
          <button id="drawerClose" class="${UI.btnSm}">닫기</button>
        </div>
        <div class="relative mt-4" id="drawerContent"></div>
        <div class="relative mt-3 ${UI.sub}" id="drawerStatus"></div>
      </div>
    `;
  }
  const titleEl = qs("#drawerTitle");
  const contentEl = qs("#drawerContent");
  if (!titleEl || !contentEl) return;
  const dc = qs("#drawerClose");
  if (dc) dc.onclick = closeDrawer;

  if (kind === "timeline_event") {
    titleEl.innerHTML = `<div class="flex items-center gap-2">${iconBadge(iconSvg("calendar", true), true)}<span class="text-[13px] font-semibold text-slate-900">행사일정 편집</span></div>`;

    const [{ data: ev, error: e1 }, { data: days, error: e2 }] = await Promise.all([
      supabase.from("timeline_events").select("*").eq("id", id).single(),
      supabase.from("timeline_days").select("id,title,sort_order").eq("project_id", projectId).order("sort_order"),
    ]);
    if (e1 || e2) {
      contentEl.innerHTML = `<div class="text-sm text-rose-700">${escapeHtml((e1 || e2).message)}</div>`;
      return;
    }

    const iconKey = ev.icon && String(ev.icon).length <= 20 ? ev.icon : "clock";

    contentEl.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <span class="${UI.pillStrong}">시간 ${escapeHtml(timeToHHMM(ev.start_time))}</span>
          <span class="${UI.pill}">소요 <b class="font-semibold">${ev.duration_min || 0}m</b></span>
          ${ev.is_highlighted ? `<span class="${UI.pillStrong}">★ 중요</span>` : ""}
        </div>

        <div>
          <div class="${UI.label} mb-1">아이콘</div>
          ${renderIconSelect("ev_icon", iconKey)}
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
            ${(days ?? [])
              .map((d) => `<option value="${d.id}" ${d.id === ev.day_id ? "selected" : ""}>${escapeHtml(d.title)}</option>`)
              .join("")}
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

        <label class="flex items-center gap-2 text-[12.5px] text-slate-900/85">
          <input id="ev_hi" type="checkbox" ${ev.is_highlighted ? "checked" : ""} />
          중요 표시
        </label>

        <div class="flex items-center justify-between pt-2">
          <button id="ev_delete" class="${UI.btnDanger}">삭제</button>
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
      const ok = await confirmModal({
        title: "일정 삭제",
        message: "이 일정을 삭제할까? 되돌릴 수 없어.",
        okText: "삭제",
        cancelText: "취소",
        danger: true,
      });
      if (!ok) return;
      await supabase.from("timeline_events").delete().eq("id", id);
      closeDrawer();
    };

    setDrawerStatus("열림");
    return;
  }

  if (kind === "checklist_item") {
    titleEl.innerHTML = `<div class="flex items-center gap-2">${iconBadge(iconSvg("checklist", true), true)}<span class="text-[13px] font-semibold text-slate-900">체크리스트 편집</span></div>`;

    const [{ data: it, error: e1 }, { data: sections, error: e2 }] = await Promise.all([
      supabase.from("checklist_items").select("*").eq("id", id).single(),
      supabase.from("checklist_sections").select("id,title,sort_order").eq("project_id", projectId).order("sort_order"),
    ]);
    if (e1 || e2) {
      contentEl.innerHTML = `<div class="text-sm text-rose-700">${escapeHtml((e1 || e2).message)}</div>`;
      return;
    }

    contentEl.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <span class="${UI.pillStrong}">${it.is_done ? "완료" : "진행중"}</span>
        </div>

        <div>
          <div class="${UI.label} mb-1">제목</div>
          <input id="ck_title" class="${UI.input}" value="${escapeHtml(it.title || "")}" />
        </div>

        <div>
          <div class="${UI.label} mb-1">섹션</div>
          <select id="ck_section" class="${UI.input}">
            ${(sections ?? [])
              .map((s) => `<option value="${s.id}" ${s.id === it.section_id ? "selected" : ""}>${escapeHtml(s.title)}</option>`)
              .join("")}
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

        <label class="flex items-center gap-2 text-[12.5px] text-slate-900/85">
          <input id="ck_done" type="checkbox" ${it.is_done ? "checked" : ""} />
          완료
        </label>

        <div class="flex items-center justify-between pt-2">
          <button id="ck_delete" class="${UI.btnDanger}">삭제</button>
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
      const ok = await confirmModal({
        title: "할 일 삭제",
        message: "이 항목을 삭제할까? 되돌릴 수 없어.",
        okText: "삭제",
        cancelText: "취소",
        danger: true,
      });
      if (!ok) return;
      await supabase.from("checklist_items").delete().eq("id", id);
      closeDrawer();
    };

    setDrawerStatus("열림");
    return;
  }



  if (kind === "checklist_task") {
    titleEl.innerHTML = `<div class="flex items-center gap-2">${iconBadge(iconSvg("checklist", true), true)}<span class="text-[13px] font-semibold text-slate-900">상위 할 일 편집</span></div>`;

    const [{ data: t, error: e1 }, { data: sections, error: e2 }] = await Promise.all([
      supabase.from("checklist_tasks").select("*").eq("id", id).single(),
      supabase.from("checklist_sections").select("id,title,sort_order").eq("project_id", projectId).order("sort_order"),
    ]);
    if (e1 || e2) {
      contentEl.innerHTML = isMissingTable(e1 || e2)
        ? missingTableCard(isMissingTable(e1) ? "checklist_tasks" : "checklist_sections")
        : `<div class="text-sm text-rose-700">${escapeHtml((e1 || e2).message)}</div>`;
      return;
    }

    contentEl.innerHTML = `
      <div class="space-y-4">
        <div>
          <div class="${UI.label} mb-1">제목</div>
          <input id="ckt_title" class="${UI.input}" value="${escapeHtml(t.title || "")}" />
        </div>

        <div>
          <div class="${UI.label} mb-1">섹션</div>
          <select id="ckt_section" class="${UI.input}">
            ${(sections ?? [])
              .map((s) => `<option value="${s.id}" ${s.id === t.section_id ? "selected" : ""}>${escapeHtml(s.title)}</option>`)
              .join("")}
          </select>
        </div>

        <div>
          <div class="${UI.label} mb-1">마감일(선택)</div>
          <input id="ckt_due" type="date" class="${UI.input}" value="${t.due_date ?? ""}" />
        </div>

        <div>
          <div class="${UI.label} mb-1">메모(선택)</div>
          <textarea id="ckt_notes" class="${UI.textarea}" rows="5">${escapeHtml(t.notes || "")}</textarea>
        </div>

        <label class="flex items-center gap-2 text-[12.5px] text-slate-900/85">
          <input id="ckt_collapsed" type="checkbox" ${t.is_collapsed ? "checked" : ""} />
          접어두기
        </label>

        <div class="flex items-center justify-between pt-2">
          <button id="ckt_delete" class="${UI.btnDanger}">삭제</button>
          <button id="ckt_close" class="${UI.btnPrimary}">완료</button>
        </div>
      </div>
    `;

    bindSave("#ckt_title", (el) => safeUpdate("checklist_tasks", id, { title: el.value }));
    bindSave("#ckt_section", (el) => safeUpdate("checklist_tasks", id, { section_id: el.value }));
    bindSave("#ckt_due", (el) => safeUpdate("checklist_tasks", id, { due_date: el.value || null }));
    bindSave("#ckt_notes", (el) => safeUpdate("checklist_tasks", id, { notes: el.value || null }));
    bindSave("#ckt_collapsed", (el) => safeUpdate("checklist_tasks", id, { is_collapsed: el.checked }));

    qs("#ckt_close").onclick = closeDrawer;
    qs("#ckt_delete").onclick = async () => {
      const ok = await confirmModal({
        title: "상위 할 일 삭제",
        message: "이 상위 할 일을 삭제할까? 연결된 하위 할 일도 같이 지워질 수 있어.",
        okText: "삭제",
        cancelText: "취소",
        danger: true,
      });
      if (!ok) return;
      await supabase.from("checklist_tasks").delete().eq("id", id);
      closeDrawer();
    };

    setDrawerStatus("열림");
    return;
  }

  if (kind === "checklist_subtask") {
    titleEl.innerHTML = `<div class="flex items-center gap-2">${iconBadge(iconSvg("checklist", true), true)}<span class="text-[13px] font-semibold text-slate-900">하위 할 일 편집</span></div>`;

    const [{ data: st, error: e1 }, { data: tasks, error: e2 }] = await Promise.all([
      supabase.from("checklist_subtasks").select("*").eq("id", id).single(),
      supabase.from("checklist_tasks").select("id,title,sort_order").eq("project_id", projectId).order("sort_order"),
    ]);
    if (e1 || e2) {
      contentEl.innerHTML = isMissingTable(e1 || e2)
        ? missingTableCard(isMissingTable(e1) ? "checklist_subtasks" : "checklist_tasks")
        : `<div class="text-sm text-rose-700">${escapeHtml((e1 || e2).message)}</div>`;
      return;
    }

    contentEl.innerHTML = `
      <div class="space-y-4">
        <div>
          <div class="${UI.label} mb-1">제목</div>
          <input id="cks_title" class="${UI.input}" value="${escapeHtml(st.title || "")}" />
        </div>

        <div>
          <div class="${UI.label} mb-1">상위 할 일</div>
          <select id="cks_task" class="${UI.input}">
            ${(tasks ?? [])
              .map((t) => `<option value="${t.id}" ${t.id === st.task_id ? "selected" : ""}>${escapeHtml(t.title || "(제목 없음)")}</option>`)
              .join("")}
          </select>
        </div>

        <label class="flex items-center gap-2 text-[12.5px] text-slate-900/85">
          <input id="cks_done" type="checkbox" ${st.is_done ? "checked" : ""} />
          완료
        </label>

        <div class="flex items-center justify-between pt-2">
          <button id="cks_delete" class="${UI.btnDanger}">삭제</button>
          <button id="cks_close" class="${UI.btnPrimary}">완료</button>
        </div>
      </div>
    `;

    bindSave("#cks_title", (el) => safeUpdate("checklist_subtasks", id, { title: el.value }));
    bindSave("#cks_task", (el) => safeUpdate("checklist_subtasks", id, { task_id: el.value }));
    bindSave("#cks_done", (el) => safeUpdate("checklist_subtasks", id, { is_done: el.checked }));

    qs("#cks_close").onclick = closeDrawer;
    qs("#cks_delete").onclick = async () => {
      const ok = await confirmModal({
        title: "하위 할 일 삭제",
        message: "이 하위 할 일을 삭제할까? 되돌릴 수 없어.",
        okText: "삭제",
        cancelText: "취소",
        danger: true,
      });
      if (!ok) return;
      await supabase.from("checklist_subtasks").delete().eq("id", id);
      closeDrawer();
    };

    setDrawerStatus("열림");
    return;
  }
  if (kind === "budget_item") {
    titleEl.innerHTML = `<div class="flex items-center gap-2">${iconBadge(iconSvg("wallet", true), true)}<span class="text-[13px] font-semibold text-slate-900">예산 항목 편집</span></div>`;

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
          <span class="${UI.pillStrong}">잔액 ${moneyFmt(unpaid)}원</span>
          <span class="${UI.pill}">예상 <b class="font-semibold">${moneyFmt(it.estimate || 0)}</b></span>
          <span class="${UI.pill}">실제 <b class="font-semibold">${moneyFmt(it.actual || 0)}</b></span>
          <span class="${UI.pill}">지불 <b class="font-semibold">${moneyFmt(it.paid || 0)}</b></span>
        </div>

        <div>
          <div class="${UI.label} mb-1">항목명</div>
          <input id="bd_name" class="${UI.input}" value="${escapeHtml(it.item_name || "")}" />
        </div>

        <div>
          <div class="${UI.label} mb-1">카테고리</div>
          <select id="bd_cat" class="${UI.input}">
            ${(cats ?? [])
              .map((c) => `<option value="${c.id}" ${c.id === it.category_id ? "selected" : ""}>${escapeHtml(c.title)}</option>`)
              .join("")}
          </select>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div>
            <div class="${UI.label} mb-1">예상</div>
            <input id="bd_est" type="number" class="${UI.input}" value="${Number(it.estimate || 0)}" min="0" />
          </div>
          <div>
            <div class="${UI.label} mb-1">실제</div>
            <input id="bd_act" type="number" class="${UI.input}" value="${Number(it.actual || 0)}" min="0" />
          </div>
          <div>
            <div class="${UI.label} mb-1">지불</div>
            <input id="bd_paid" type="number" class="${UI.input}" value="${Number(it.paid || 0)}" min="0" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
  <div>
    <div class="${UI.label} mb-1">지출일(선택)</div>
    <input id="bd_spent" type="date" class="${UI.input}" value="${it.spent_on || ""}" />
  </div>
  <div>
    <div class="${UI.label} mb-1">지불일(선택)</div>
    <input id="bd_paid_on" type="date" class="${UI.input}" value="${it.paid_on ?? ""}" />
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
          <button id="bd_delete" class="${UI.btnDanger}">삭제</button>
          <button id="bd_close" class="${UI.btnPrimary}">완료</button>
        </div>
      </div>
    `;

    bindSave("#bd_name", (el) => safeUpdate("budget_items", id, { item_name: el.value }));
    bindSave("#bd_cat", (el) => safeUpdate("budget_items", id, { category_id: el.value }));
    bindSave("#bd_est", (el) => safeUpdate("budget_items", id, { estimate: Number(el.value || 0) }));
    bindSave("#bd_act", (el) => safeUpdate("budget_items", id, { actual: Number(el.value || 0) }));
    bindSave("#bd_paid", (el) => safeUpdate("budget_items", id, { paid: Number(el.value || 0) }));
    bindSave("#bd_spent", (el) => safeUpdate("budget_items", id, { spent_on: el.value || null }));
    bindSave("#bd_paid_on", (el) => safeUpdate("budget_items", id, { paid_on: el.value || null }));
    bindSave("#bd_due", (el) => safeUpdate("budget_items", id, { due_date: el.value || null }));
    bindSave("#bd_notes", (el) => safeUpdate("budget_items", id, { notes: el.value || null }));

    qs("#bd_close").onclick = closeDrawer;
    qs("#bd_delete").onclick = async () => {
      const ok = await confirmModal({
        title: "예산 항목 삭제",
        message: "이 항목을 삭제할까? 되돌릴 수 없어.",
        okText: "삭제",
        cancelText: "취소",
        danger: true,
      });
      if (!ok) return;
      await supabase.from("budget_items").delete().eq("id", id);
      closeDrawer();
    };

    setDrawerStatus("열림");
    return;
  }

  if (kind === "vendor") {
    titleEl.innerHTML = `<div class="flex items-center gap-2">${iconBadge(iconSvg("bag", true), true)}<span class="text-[13px] font-semibold text-slate-900">업체 편집</span></div>`;

    const { data: v, error } = await supabase.from("vendors").select("*").eq("id", id).single();
    if (error) {
      contentEl.innerHTML = isMissingTable(error)
        ? missingTableCard("vendors")
        : `<div class="text-sm text-rose-700">${escapeHtml(error.message)}</div>`;
      return;
    }

    contentEl.innerHTML = `
      <div class="space-y-4">
        <div>
          <div class="${UI.label} mb-1">이름</div>
          <input id="vd_name" class="${UI.input}" value="${escapeHtml(v.name || "")}" />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <div class="${UI.label} mb-1">분류</div>
            <input id="vd_cat" class="${UI.input}" value="${escapeHtml(v.category || "")}" placeholder="예) 예식장, 스튜디오..." />
          </div>
          <div>
            <div class="${UI.label} mb-1">상태</div>
            <input id="vd_status" class="${UI.input}" value="${escapeHtml(v.status || "")}" placeholder="예) 상담중, 계약완료..." />
          </div>
        </div>

        <div>
          <div class="${UI.label} mb-1">연락처(선택)</div>
          <input id="vd_contact" class="${UI.input}" value="${escapeHtml(v.contact || "")}" placeholder="전화/카톡/메일" />
        </div>

        <div>
          <div class="${UI.label} mb-1">링크(선택)</div>
          <input id="vd_url" class="${UI.input}" value="${escapeHtml(v.url || "")}" placeholder="https://..." />
        </div>

        <div>
          <div class="${UI.label} mb-1">메모(선택)</div>
          <textarea id="vd_memo" class="${UI.textarea}" rows="4">${escapeHtml(v.memo || "")}</textarea>
        </div>

        <div class="flex items-center justify-between pt-2">
          <button id="vd_delete" class="${UI.btnDanger}">삭제</button>
          <button id="vd_close" class="${UI.btnPrimary}">완료</button>
        </div>
      </div>
    `;

    bindSave("#vd_name", (el) => safeUpdate("vendors", id, { name: el.value }));
    bindSave("#vd_cat", (el) => safeUpdate("vendors", id, { category: el.value || null }));
    bindSave("#vd_status", (el) => safeUpdate("vendors", id, { status: el.value || null }));
    bindSave("#vd_contact", (el) => safeUpdate("vendors", id, { contact: el.value || null }));
    bindSave("#vd_url", (el) => safeUpdate("vendors", id, { url: el.value || null }));
    bindSave("#vd_memo", (el) => safeUpdate("vendors", id, { memo: el.value || null }));

    qs("#vd_close").onclick = closeDrawer;
    qs("#vd_delete").onclick = async () => {
      const ok = await confirmModal({
        title: "업체 삭제",
        message: "이 업체를 삭제할까? 되돌릴 수 없어.",
        okText: "삭제",
        cancelText: "취소",
        danger: true,
      });
      if (!ok) return;
      await supabase.from("vendors").delete().eq("id", id);
      closeDrawer();
    };

    setDrawerStatus("열림");
    return;
  }

  if (kind === "note") {
    titleEl.innerHTML = `<div class="flex items-center gap-2">${iconBadge(iconSvg("note", true), true)}<span class="text-[13px] font-semibold text-slate-900">메모 편집</span></div>`;

    const { data: m, error } = await supabase.from("notes").select("*").eq("id", id).single();
    if (error) {
      contentEl.innerHTML = isMissingTable(error)
        ? missingTableCard("notes")
        : `<div class="text-sm text-rose-700">${escapeHtml(error.message)}</div>`;
      return;
    }

    contentEl.innerHTML = `
      <div class="space-y-4">
        <div>
          <div class="${UI.label} mb-1">제목</div>
          <input id="nt_title" class="${UI.input}" value="${escapeHtml(m.title || "")}" placeholder="제목(선택)" />
        </div>

        <div>
          <div class="${UI.label} mb-1">내용</div>
          <textarea id="nt_body" class="${UI.textarea}" rows="8" placeholder="메모를 적어줘">${escapeHtml(m.body || "")}</textarea>
        </div>

        <label class="flex items-center gap-2 text-[12.5px] text-slate-900/85">
          <input id="nt_pin" type="checkbox" ${m.is_pinned ? "checked" : ""} />
          상단 고정
        </label>

        <div class="flex items-center justify-between pt-2">
          <button id="nt_delete" class="${UI.btnDanger}">삭제</button>
          <button id="nt_close" class="${UI.btnPrimary}">완료</button>
        </div>
      </div>
    `;

    bindSave("#nt_title", (el) => safeUpdate("notes", id, { title: el.value || null }));
    bindSave("#nt_body", (el) => safeUpdate("notes", id, { body: el.value || null }));
    bindSave("#nt_pin", (el) => safeUpdate("notes", id, { is_pinned: el.checked }));

    qs("#nt_close").onclick = closeDrawer;
    qs("#nt_delete").onclick = async () => {
      const ok = await confirmModal({
        title: "메모 삭제",
        message: "이 메모를 삭제할까? 되돌릴 수 없어.",
        okText: "삭제",
        cancelText: "취소",
        danger: true,
      });
      if (!ok) return;
      await supabase.from("notes").delete().eq("id", id);
      closeDrawer();
    };

    setDrawerStatus("열림");
    return;
  }

  titleEl.textContent = "Detail";
  contentEl.innerHTML = `<div class="${UI.sub}">지원하지 않는 패널</div>`;
}

// ---------- Missing table card ----------
function missingTableCard(tableName) {
  return `
    <div class="${UI.bubble}">
      <div class="flex items-start gap-3">
        <div class="shrink-0">${iconBadge(iconSvg("note", true), true)}</div>
        <div class="min-w-0">
          <div class="text-[13px] font-semibold text-slate-900">테이블이 없어</div>
          <div class="${UI.sub} mt-1">
            <b>${escapeHtml(tableName)}</b> 테이블이 Supabase에 아직 없는 상태야.
            <br/>같이 들어있는 <b>schema_extra.sql</b>을 SQL Editor에서 실행해줘.
          </div>
        </div>
      </div>
    </div>
  `;
}

// ---------- Project ----------
async function getProjectId() {
  const { data, error } = await supabase.from("projects").select("id").order("created_at", { ascending: true }).limit(1).single();
  if (error) throw error;
  return data.id;
}

const NAV = [
  { route: "/overview", label: "개요", icon: "home" },
  { route: "/ceremony", label: "예식", icon: "sparkle" },
  { route: "/vendors", label: "업체", icon: "bag" },
  { route: "/timeline", label: "행사일정", icon: "calendar" },
  { route: "/checklist", label: "체크리스트", icon: "checklist" },
  { route: "/budget", label: "예산", icon: "wallet" },
  { route: "/notes", label: "메모", icon: "note" },
];

// ---------- Layout ----------
// (NAV already defined above)

function layoutShell(userEmail) {
  ensureThemeStyles();
  app.innerHTML = `
  <div class="${UI.pageWrap}">
    <div class="${UI.shell}">
      <aside class="${UI.card}">
        <div class="${UI.cardInner}">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-3">
              <div class="shrink-0">${iconBadge(iconSvg("sparkle", true), true)}</div>
              <div class="min-w-0">
                <div class="text-[15px] font-semibold tracking-tight text-slate-900">Planner</div>
                <div class="${UI.sub} mt-1 truncate">${escapeHtml(userEmail || "")}</div>
              </div>
            </div>

            <span class="${UI.pill}">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Online
            </span>
          </div>

          <nav class="mt-5 space-y-2" id="nav">
            ${NAV.map((n) => `
              <a class="${UI.navLink}" data-route="${n.route}" href="#${n.route}">
                ${iconBadge(iconSvg(n.icon), false)}
                <span>${escapeHtml(n.label)}</span>
              </a>
            `).join("")}
          </nav>

          <div class="mt-6 flex items-center justify-between">
            <button id="logout" class="${UI.btn}">로그아웃</button>
            <span class="${UI.sub}">Auto-save</span>
          </div>
        </div>
      </aside>

      <main class="${UI.card}">
        <div class="${UI.cardInner}">
          <div id="drawerDock" class="mb-5 hidden"></div>
          <div id="page"></div>
        </div>
      </main>

      
    </div>
  </div>`;

  // active 표시 + 아이콘 active
  const r = (location.hash || "#/overview").replace("#", "");
  qsa("#nav a[data-route]").forEach((a) => {
    const isActive = a.getAttribute("data-route") === r;
    if (isActive) a.classList.add(...UI.navLinkActive.split(" "));
    const iconName = NAV.find((x) => x.route === a.getAttribute("data-route"))?.icon || "home";
    a.querySelector("span.inline-flex")?.remove();
    a.insertAdjacentHTML("afterbegin", iconBadge(iconSvg(iconName, isActive), isActive));
  });

  qs("#logout").onclick = async () => {
    await supabase.auth.signOut();
    render();
  };

  // dock close
  const dc = qs("#drawerClose");
  if (dc) dc.onclick = closeDrawer;

  // ESC로 drawer 닫기(중복 방지)
  if (!window.__drawerEscBound) {
    window.__drawerEscBound = true;
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDrawer();
    });
  }
}

function loginView() {
  ensureThemeStyles();
  app.innerHTML = `
  <div class="${UI.pageWrap}">
    <div class="${UI.card} w-full max-w-sm">
      <div class="${UI.cardInner} space-y-4">
        <div class="flex items-center gap-3">
          <div>${iconBadge(iconSvg("sparkle", true), true)}</div>
          <div>
            <div class="text-[18px] font-semibold tracking-tight text-slate-900">로그인</div>
            <div class="${UI.sub} mt-1">매직 링크로 들어와.</div>
          </div>
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
      options: {
        // GitHub Pages: origin + pathname 유지(쿼리/해시 제거)
        emailRedirectTo: location.origin + location.pathname,
      },
    });

    qs("#msg").textContent = error ? error.message : "메일함에서 링크를 눌러줘!";
  };
}

// ---------- Pages ----------
function header(title, subtitle, rightHtml = "") {
  return `
    <header class="flex items-start justify-between gap-3">
      <div>
        <div class="text-[18px] font-semibold tracking-tight text-slate-900">${escapeHtml(title)}</div>
        ${subtitle ? `<div class="${UI.sub} mt-1">${escapeHtml(subtitle)}</div>` : ""}
      </div>
      ${rightHtml}
    </header>
  `;
}

async function overviewPage(projectId) {
  const page = qs("#page");
  page.innerHTML = `
    ${header("개요", "오늘/전체 진행 상황을 한 번에", "")}
    <div class="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="${UI.bubble}">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="${UI.label}">체크리스트</div>
            <div class="text-[16px] font-semibold text-slate-900 mt-1" id="ov_ck">-</div>
          </div>
          ${iconBadge(iconSvg("checklist", true), true)}
        </div>
        <div class="mt-3 h-2 rounded-full bg-white/60 border border-white/70 overflow-hidden">
          <div id="ov_ck_bar" class="h-full bg-accent" style="width:0%"></div>
        </div>
      </div>

      <div class="${UI.bubble}">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="${UI.label}">예산(미지불)</div>
            <div class="text-[16px] font-semibold text-slate-900 mt-1" id="ov_unpaid">-</div>
          </div>
          ${iconBadge(iconSvg("wallet", true), true)}
        </div>
        <div class="${UI.sub} mt-2" id="ov_budget_sub"></div>
      </div>

      <div class="${UI.bubble}">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="${UI.label}">메모(고정)</div>
            <div class="text-[16px] font-semibold text-slate-900 mt-1" id="ov_pin">-</div>
          </div>
          ${iconBadge(iconSvg("pin", true), true)}
        </div>
        <div class="${UI.sub} mt-2">중요한 메모를 상단에 고정해둘 수 있어.</div>
      </div>
    </div>

    <div class="mt-4 ${UI.bubble}">
      <div class="flex items-start justify-between gap-3">
        <div>
          <div class="text-[14px] font-semibold text-slate-900">오늘의 포인트</div>
          <div class="${UI.sub} mt-1">빈 곳에는 스티커가 살짝 등장해</div>
        </div>
        <div class="shrink-0">${iconBadge(iconSvg("sparkle", true), true)}</div>
      </div>
      <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        <a class="${UI.btn} w-full" href="#/timeline">행사일정 보기</a>
        <a class="${UI.btn} w-full" href="#/checklist">체크리스트 보기</a>
      </div>
    </div>
  `;

  // load quick stats
  // checklist
  const ck = await supabase.from("checklist_items").select("id,is_done").eq("project_id", projectId);
  if (!ck.error) {
    const total = ck.data?.length || 0;
    const done = (ck.data || []).filter((x) => x.is_done).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    qs("#ov_ck").textContent = `${done}/${total} (${pct}%)`;
    qs("#ov_ck_bar").style.width = `${pct}%`;
  } else {
    qs("#ov_ck").textContent = "—";
  }

  // budget
  const bd = await supabase.from("budget_items").select("actual,paid").eq("project_id", projectId);
  if (!bd.error) {
    const totals = (bd.data || []).reduce(
      (acc, it) => {
        acc.actual += n(it.actual);
        acc.paid += n(it.paid);
        return acc;
      },
      { actual: 0, paid: 0 }
    );
    const unpaid = Math.max(0, totals.actual - totals.paid);
    qs("#ov_unpaid").textContent = `${moneyFmt(unpaid)}원`;
    qs("#ov_budget_sub").textContent = `실제 ${moneyFmt(totals.actual)}원 · 지불 ${moneyFmt(totals.paid)}원`;
  } else {
    qs("#ov_unpaid").textContent = "—";
  }

  // pinned notes
  const nt = await supabase.from("notes").select("id").eq("project_id", projectId).eq("is_pinned", true);
  if (!nt.error) qs("#ov_pin").textContent = `${(nt.data || []).length}개`;
  else qs("#ov_pin").textContent = "—";
}

async function ceremonyPage(projectId) {
  const page = qs("#page");
  page.innerHTML = `
    ${header("예식", "기본 정보(날짜/장소 등)를 한 번에", `<button id="ce_edit" class="${UI.btnPrimary}">편집</button>`)}
    <div class="mt-4 ${UI.bubble}" id="ce_card"></div>
  `;

  // one-row profile
  const { data, error } = await supabase.from("ceremony_profile").select("*").eq("project_id", projectId).maybeSingle();

  if (error) {
    qs("#ce_card").innerHTML = isMissingTable(error)
      ? missingTableCard("ceremony_profile")
      : `<div class="text-sm text-rose-700">${escapeHtml(error.message)}</div>`;
    qs("#ce_edit").onclick = () => {};
    return;
  }

  // if no row, create on first open
  let row = data;
  if (!row) {
    const ins = await supabase
      .from("ceremony_profile")
      .insert({ project_id: projectId, title: "예식 정보", date: null, location: null, memo: null })
      .select("*")
      .single();
    row = ins.data;
  }

  const render = () => {
    qs("#ce_card").innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <div class="text-[14px] font-semibold text-slate-900">${escapeHtml(row.title || "예식 정보")}</div>
          <div class="${UI.sub} mt-1">${row.date ? `${escapeHtml(row.date)}` : "날짜 미정"} · ${row.start_time ? `${escapeHtml(String(row.start_time).slice(0,5))}` : "시간 미정"}</div>
          <div class="${UI.sub} mt-1">${row.location ? `${escapeHtml(row.location)}` : "장소 미정"}</div>
        </div>
        <div class="shrink-0">${iconBadge(iconSvg("sparkle", true), true)}</div>
      </div>

      <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="${UI.pill}">홀/룸: <b class="font-semibold">${escapeHtml(row.hall || "—")}</b></div>
        <div class="${UI.pill}">담당: <b class="font-semibold">${escapeHtml(row.manager || "—")}</b></div>
        <div class="${UI.pill}">연락처: <b class="font-semibold">${escapeHtml(row.contact || "—")}</b></div>
        <div class="${UI.pill}">주소: <b class="font-semibold">${escapeHtml(row.address || "—")}</b></div>
      </div>

      <div class="mt-4">
        <div class="${UI.label} mb-1">메모</div>
        <div class="text-[12.5px] text-slate-900/80 whitespace-pre-wrap">${escapeHtml(row.memo || "—")}</div>
      </div>
    `;
  };

  render();

  qs("#ce_edit").onclick = async () => {
    // open in drawer as "note-like" editor but on ceremony_profile row
    drawerState = { open: true, kind: "ceremony_profile", id: row.id, projectId, extra: {} };
    setDrawerOpen(true);

    const titleEl = qs("#drawerTitle");
    const contentEl = qs("#drawerContent");
    titleEl.innerHTML = `<div class="flex items-center gap-2">${iconBadge(iconSvg("sparkle", true), true)}<span class="text-[13px] font-semibold text-slate-900">예식 편집</span></div>`;

    contentEl.innerHTML = `
      <div class="space-y-4">
        <div>
          <div class="${UI.label} mb-1">제목</div>
          <input id="ce_title" class="${UI.input}" value="${escapeHtml(row.title || "")}" />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <div class="${UI.label} mb-1">날짜</div>
            <input id="ce_date" type="date" class="${UI.input}" value="${row.date ?? ""}" />
          </div>
          <div>
            <div class="${UI.label} mb-1">시작시간</div>
            <input id="ce_time" type="time" class="${UI.input}" value="${row.start_time ? String(row.start_time).slice(0,5) : ""}" />
          </div>
        </div>

        <div>
          <div class="${UI.label} mb-1">장소</div>
          <input id="ce_loc" class="${UI.input}" value="${escapeHtml(row.location || "")}" />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <div class="${UI.label} mb-1">홀/룸</div>
            <input id="ce_hall" class="${UI.input}" value="${escapeHtml(row.hall || "")}" />
          </div>
          <div>
            <div class="${UI.label} mb-1">담당</div>
            <input id="ce_manager" class="${UI.input}" value="${escapeHtml(row.manager || "")}" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <div class="${UI.label} mb-1">연락처</div>
            <input id="ce_contact" class="${UI.input}" value="${escapeHtml(row.contact || "")}" />
          </div>
          <div>
            <div class="${UI.label} mb-1">주소</div>
            <input id="ce_addr" class="${UI.input}" value="${escapeHtml(row.address || "")}" />
          </div>
        </div>

        <div>
          <div class="${UI.label} mb-1">메모</div>
          <textarea id="ce_memo" class="${UI.textarea}" rows="6">${escapeHtml(row.memo || "")}</textarea>
        </div>

        <div class="flex items-center justify-end pt-2">
          <button id="ce_close" class="${UI.btnPrimary}">완료</button>
        </div>
      </div>
    `;

    const upd = async (patch) => {
      setDrawerStatus("저장 중...");
      const { data: newRow, error } = await supabase.from("ceremony_profile").update(patch).eq("id", row.id).select("*").single();
      if (error) {
        setDrawerStatus(`저장 실패: ${error.message}`);
        return;
      }
      row = newRow;
      setDrawerStatus("저장됨");
      render();
    };

    const bind = (sel, key, mapFn = (el) => el.value) => {
      const el = qs(sel);
      if (!el) return;
      const handler = async () => {
        const val = mapFn(el);
        await upd({ [key]: val || null });
      };
      el.addEventListener("change", handler);
      el.addEventListener("blur", handler);
    };

    bind("#ce_title", "title");
    bind("#ce_date", "date");
    bind("#ce_time", "start_time", (el) => (el.value ? hhmmToTime(el.value) : null));
    bind("#ce_loc", "location");
    bind("#ce_hall", "hall");
    bind("#ce_manager", "manager");
    bind("#ce_contact", "contact");
    bind("#ce_addr", "address");
    bind("#ce_memo", "memo");

    qs("#ce_close").onclick = closeDrawer;
    setDrawerStatus("열림");
  };
}

async function vendorsPage(projectId) {
  const page = qs("#page");
  page.innerHTML = `
    ${header("업체", "업체 리스트 + 상태/메모", `<button id="vd_add" class="${UI.btnPrimary}">추가</button>`)}
    <div class="mt-4 space-y-3" id="vd_list"></div>
  `;

  async function load() {
    const { data, error } = await supabase
      .from("vendors")
      .select("id,name,category,status,sort_order")
      .eq("project_id", projectId)
      .order("sort_order", { ascending: true });

    if (error) {
      qs("#vd_list").innerHTML = isMissingTable(error)
        ? missingTableCard("vendors")
        : `<div class="text-sm text-rose-700">${escapeHtml(error.message)}</div>`;
      return;
    }

    qs("#vd_list").innerHTML =
      (data || [])
        .map((v) => `
          <button data-id="${v.id}" class="${UI.bubble}">
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-start gap-3 min-w-0">
                ${iconBadge(iconSvg("bag", true), true)}
                <div class="min-w-0">
                  <div class="text-[13.5px] font-semibold text-slate-900 truncate">${escapeHtml(v.name || "이름 없음")}</div>
                  <div class="${UI.sub} mt-1">
                    ${v.category ? escapeHtml(v.category) : "분류 없음"} · ${v.status ? escapeHtml(v.status) : "상태 없음"}
                  </div>
                </div>
              </div>
              <span class="${UI.sub}">열기 →</span>
            </div>
          </button>
        `)
        .join("") ||
      `<div class="${UI.bubble}">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="text-[13.5px] font-semibold text-slate-900">업체가 아직 없어</div>
            <div class="${UI.sub} mt-1">오른쪽 위 ‘추가’로 하나 만들어봐.</div>
          </div>
          ${iconBadge(iconSvg("sparkle", true), true)}
        </div>
      </div>`;

    qsa("#vd_list button[data-id]").forEach((btn) => {
      btn.onclick = () => openDrawer("vendor", { id: btn.dataset.id, projectId });
    });
  }

  qs("#vd_add").onclick = async () => {
    const ins = await supabase
      .from("vendors")
      .insert({
        project_id: projectId,
        name: "새 업체",
        sort_order: Date.now(),
      })
      .select("id")
      .single();

    if (ins.error) {
      await confirmModal({ title: "추가 실패", message: ins.error.message, okText: "닫기" });
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

async function timelinePage(projectId) {
  const page = qs("#page");
  page.innerHTML = `
    ${header("행사일정", "버블을 눌러 상세 편집", `<button id="addEvent" class="${UI.btnPrimary}">추가</button>`)}
    <div class="mt-4 flex flex-wrap gap-2" id="dayTabs"></div>
    <div class="mt-4 space-y-3" id="events"></div>
  `;

  // days
  let { data: days, error: de } = await supabase
    .from("timeline_days")
    .select("id,title,sort_order")
    .eq("project_id", projectId)
    .order("sort_order");

  if (de) {
    qs("#events").innerHTML = `<div class="text-sm text-rose-700">${escapeHtml(de.message)}</div>`;
    return;
  }

  days = days || [];
  if (days.length === 0) {
    const ins = await supabase
      .from("timeline_days")
      .insert({ project_id: projectId, title: "본식 당일", sort_order: 0 })
      .select("id,title,sort_order")
      .single();
    if (ins.data) days = [ins.data];
  }

  let selectedDayId = days[0]?.id;

  function renderTabs() {
    const box = qs("#dayTabs");
    box.innerHTML = (days || [])
      .map((d) => {
        const active = d.id === selectedDayId;
        return `
          <button data-day="${d.id}" class="${UI.pill} ${active ? "bg-white/80 border-white/80 shadow-[0_10px_22px_rgba(0,0,0,0.06)]" : ""}">
            ${escapeHtml(d.title)}
          </button>
        `;
      })
      .join("");

    qsa("#dayTabs button[data-day]").forEach((btn) => {
      btn.onclick = () => {
        selectedDayId = btn.dataset.day;
        load();
      };
    });
  }

  function eventIcon(key) {
    const map = new Set(TIMELINE_ICON_CHOICES.map((x) => x.key));
    const k = map.has(key) ? key : "clock";
    // icon key to svg name
    const svgName = k === "clock" ? "clock" : k === "calendar" ? "calendar" : "sparkle";
    return iconBadge(iconSvg(svgName, true), true);
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

    qs("#events").innerHTML =
      (data || [])
        .map(
          (e) => `
          <button data-id="${e.id}" class="${UI.bubble}">
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-start gap-3 min-w-0">
                ${eventIcon(e.icon)}
                <div class="min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="${UI.pillStrong}">${escapeHtml(timeToHHMM(e.start_time))}</span>
                    <span class="${UI.pill}">${e.duration_min || 0}m</span>
                    ${e.is_highlighted ? `<span class="${UI.pillStrong}">★</span>` : ""}
                  </div>
                  <div class="mt-2 text-[13.5px] font-semibold text-slate-900 truncate">${escapeHtml(e.title || "제목 없음")}</div>
                  ${e.location ? `<div class="${UI.sub} mt-1 truncate">${escapeHtml(e.location)}</div>` : `<div class="${UI.sub} mt-1">장소 없음</div>`}
                </div>
              </div>
              <span class="${UI.sub}">열기 →</span>
            </div>
          </button>
        `
        )
        .join("") ||
      `<div class="${UI.bubble}">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="text-[13.5px] font-semibold text-slate-900">일정이 없어</div>
            <div class="${UI.sub} mt-1">오른쪽 위 ‘추가’로 하나 만들어봐.</div>
          </div>
          ${iconBadge(iconSvg("sparkle", true), true)}
        </div>
      </div>`;

    qsa("#events button[data-id]").forEach((btn) => {
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

    if (ins.error) {
      await confirmModal({ title: "추가 실패", message: ins.error.message, okText: "닫기" });
      return;
    }
    openDrawer("timeline_event", { id: ins.data.id, projectId });
  };

  // realtime
  const ch = supabase
    .channel("timeline")
    .on("postgres_changes", { event: "*", schema: "public", table: "timeline_events", filter: `project_id=eq.${projectId}` }, load)
    .on("postgres_changes", { event: "*", schema: "public", table: "timeline_days", filter: `project_id=eq.${projectId}` }, async () => {
      const res = await supabase
        .from("timeline_days")
        .select("id,title,sort_order")
        .eq("project_id", projectId)
        .order("sort_order");
      if (res.data) {
        days = res.data;
        if (!days.find((d) => d.id === selectedDayId)) selectedDayId = days[0]?.id;
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

async function checklistPageV1(projectId) {
  const page = qs("#page");
  page.innerHTML = `
    ${header("체크리스트", "체크는 바로, 편집은 상단에서", `<button id="addItem" class="${UI.btnPrimary}">추가</button>`)}
    <div class="mt-4 space-y-4" id="sections"></div>
  `;

  async function ensureTemplate() {
    const { data, error } = await supabase.from("checklist_sections").select("id").eq("project_id", projectId).limit(1);
    if (error) return; // table/rls error handled in load
    if (data && data.length > 0) return;

    const defaults = ["6개월 전", "3개월 전", "1개월 전", "2주 전", "1주 전", "당일"];
    await supabase.from("checklist_sections").insert(defaults.map((t, i) => ({ project_id: projectId, title: t, sort_order: i })));
  }

  async function load() {
    await ensureTemplate();

    const { data: sections, error: se } = await supabase
      .from("checklist_sections")
      .select("id,title,sort_order")
      .eq("project_id", projectId)
      .order("sort_order");

    if (se) {
      qs("#sections").innerHTML = isMissingTable(se)
        ? missingTableCard("checklist_sections")
        : `<div class="text-sm text-rose-700">${escapeHtml(se.message)}</div>`;
      return;
    }

    const { data: items, error: ie } = await supabase
      .from("checklist_items")
      .select("id,section_id,title,is_done,sort_order")
      .eq("project_id", projectId)
      .order("sort_order");

    if (ie) {
      qs("#sections").innerHTML = isMissingTable(ie)
        ? missingTableCard("checklist_items")
        : `<div class="text-sm text-rose-700">${escapeHtml(ie.message)}</div>`;
      return;
    }

    const bySection = new Map();
    (items || []).forEach((it) => {
      if (!bySection.has(it.section_id)) bySection.set(it.section_id, []);
      bySection.get(it.section_id).push(it);
    });

    qs("#sections").innerHTML = (sections || [])
      .map((s) => {
        const list = bySection.get(s.id) || [];
        const done = list.filter((x) => x.is_done).length;
        const total = list.length;
        const pct = total ? Math.round((done / total) * 100) : 0;

        return `
          <div class="${UI.bubble}">
  <div class="${UI.bubbleOverlay}" style="${bubbleOverlayStyle()}"></div>
  <div class="relative flex items-center justify-between gap-3">

              <div class="min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <div class="text-[13.5px] font-semibold text-slate-900">${escapeHtml(s.title)}</div>
                  <span class="${UI.pill}">${done}/${total}</span>
                  <span class="${UI.pill}">${pct}%</span>
                </div>
                <div class="mt-2 h-2 rounded-full bg-white/60 border border-white/70 overflow-hidden">
                  <div class="h-full bg-accent" style="width:${pct}%;"></div>
                </div>
              </div>
              <button class="${UI.btnSm}" data-add="${s.id}">추가</button>
            </div>

            <div class="mt-4 space-y-2">
              ${
                total === 0
                  ? `<div class="${UI.sub}">할 일이 없어.</div>`
                  : list
                      .map(
                        (it) => `
                          <div class="flex items-center justify-between gap-3 p-3 rounded-[20px]
                                      bg-white/55 border border-white/70 hover:bg-white/80 transition"
                               data-open="${it.id}">
                            <label class="flex items-center gap-3 flex-1 cursor-pointer">
                              <input type="checkbox" data-toggle="${it.id}" ${it.is_done ? "checked" : ""} />
                              <div class="min-w-0">
                                <div class="text-[12.5px] font-semibold text-slate-900 ${it.is_done ? "line-through opacity-60" : ""}">
                                  ${escapeHtml(it.title)}
                                </div>
                                <div class="${UI.sub} mt-1">클릭해서 상세 편집</div>
                              </div>
                            </label>
                            <span class="${UI.sub}">→</span>
                          </div>
                        `
                      )
                      .join("")
              }
            </div>
          </div>
        `;
      })
      .join("");

    // add item in section
    qsa("#sections button[data-add]").forEach((btn) => {
      btn.onclick = async () => {
        const sectionId = btn.dataset.add;
        const ins = await supabase
          .from("checklist_items")
          .insert({
            project_id: projectId,
            section_id: sectionId,
            title: "새 할 일",
            sort_order: Date.now(),
          })
          .select("id")
          .single();

        if (ins.error) {
          await confirmModal({ title: "추가 실패", message: ins.error.message, okText: "닫기" });
          return;
        }
        openDrawer("checklist_item", { id: ins.data.id, projectId });
      };
    });

    // toggle
    qsa("#sections input[data-toggle]").forEach((cb) => {
      cb.onclick = (e) => e.stopPropagation();
      cb.onchange = async () => {
        const id = cb.dataset.toggle;
        await supabase.from("checklist_items").update({ is_done: cb.checked }).eq("id", id);
      };
    });

    // open drawer
    qsa("#sections [data-open]").forEach((row) => {
      row.onclick = () => openDrawer("checklist_item", { id: row.dataset.open, projectId });
    });
  }

  qs("#addItem").onclick = async () => {
    const { data: sec } = await supabase.from("checklist_sections").select("id").eq("project_id", projectId).order("sort_order").limit(1);

    const sectionId = sec?.[0]?.id;
    if (!sectionId) {
      await confirmModal({ title: "섹션이 없어", message: "먼저 섹션 템플릿이 필요해. (checklist_sections)", okText: "닫기" });
      return;
    }

    const ins = await supabase
      .from("checklist_items")
      .insert({
        project_id: projectId,
        section_id: sectionId,
        title: "새 할 일",
        sort_order: Date.now(),
      })
      .select("id")
      .single();

    if (ins.error) {
      await confirmModal({ title: "추가 실패", message: ins.error.message, okText: "닫기" });
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


// ---------- Checklist v2 (Parent task + Subtasks + progress) ----------
async function checklistPageV2(projectId) {
  const page = qs("#page");
  page.innerHTML = `
    ${header("체크리스트", "상위 할 일 · 하위 할 일 · 진행률", `<button id="ck_add_task" class="${UI.btnPrimary}">작업 추가</button>`)}
    <div class="mt-4 space-y-4" id="ck_sections"></div>
  `;

  async function ensureSectionsTemplate() {
    const { data, error } = await supabase.from("checklist_sections").select("id").eq("project_id", projectId).limit(1);
    if (error) return;
    if (data && data.length > 0) return;
    const defaults = ["6개월 전", "3개월 전", "1개월 전", "2주 전", "1주 전", "당일"];
    await supabase.from("checklist_sections").insert(defaults.map((t, i) => ({ project_id: projectId, title: t, sort_order: i })));
  }

  async function load() {
    await ensureSectionsTemplate();

    const { data: sections, error: se } = await supabase
      .from("checklist_sections")
      .select("id,title,sort_order")
      .eq("project_id", projectId)
      .order("sort_order");

    if (se) {
      qs("#ck_sections").innerHTML = isMissingTable(se)
        ? missingTableCard("checklist_sections")
        : `<div class="text-sm text-rose-700">${escapeHtml(se.message)}</div>`;
      return;
    }

    const { data: tasks, error: te } = await supabase
      .from("checklist_tasks")
      .select("id,section_id,title,due_date,notes,is_collapsed,sort_order")
      .eq("project_id", projectId)
      .order("sort_order");

    if (te) {
      qs("#ck_sections").innerHTML = isMissingTable(te)
        ? `
          <div class="${UI.bubble}">
            <div class="flex items-start gap-3">
              <div class="shrink-0">${iconBadge(iconSvg("checklist", true), true)}</div>
              <div class="min-w-0">
                <div class="text-[13.5px] font-semibold text-slate-900">체크리스트 v2 테이블이 없어</div>
                <div class="${UI.sub} mt-1">Supabase에 <b>checklist_tasks</b>, <b>checklist_subtasks</b> 테이블을 추가하면, 상위/하위 구조 + 진행률 UI가 켜져.</div>
              </div>
            </div>
          </div>
          <div class="mt-3 ${UI.sub}">현재는 기존(단일 목록) 모드로 보여줄게.</div>
        `
        : `<div class="text-sm text-rose-700">${escapeHtml(te.message)}</div>`;
      // fallback to v1
      return checklistPageV1(projectId);
    }

    const { data: subs, error: ue } = await supabase
      .from("checklist_subtasks")
.select("id,task_id,title,is_done,sort_order,due_date,notes")
      .eq("project_id", projectId)
      .order("sort_order");

    if (ue) {
      qs("#ck_sections").innerHTML = isMissingTable(ue)
        ? missingTableCard("checklist_subtasks")
        : `<div class="text-sm text-rose-700">${escapeHtml(ue.message)}</div>`;
      return;
    }

    const tasksBySection = new Map();
    (tasks || []).forEach((t) => {
      if (!tasksBySection.has(t.section_id)) tasksBySection.set(t.section_id, []);
      tasksBySection.get(t.section_id).push(t);
    });

    const subsByTask = new Map();
    (subs || []).forEach((st) => {
      if (!subsByTask.has(st.task_id)) subsByTask.set(st.task_id, []);
      subsByTask.get(st.task_id).push(st);
    });

    const renderTask = (t) => {
      const list = subsByTask.get(t.id) || [];
      const done = list.filter((x) => x.is_done).length;
      const total = list.length;
      const pct = total ? Math.round((done / total) * 100) : 0;
      const collapsed = !!t.is_collapsed;

      return `
        <div class="rounded-[24px] overflow-hidden border border-white/85 bg-white/60">
          <div class="p-4 sm:p-[18px] ${pct === 100 ? "bg-[rgba(241,251,153,0.25)]" : ""}">
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-start gap-3 min-w-0">
                <label class="shrink-0 mt-0.5">
                  <input type="checkbox" data-task-toggle-all="${t.id}" ${total>0 && done===total ? "checked" : ""} ${total===0 ? "disabled" : ""} />
                </label>
                <div class="min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <div class="text-[13.5px] font-semibold text-slate-900 truncate">${escapeHtml(t.title || "제목")}</div>
                    <span class="${UI.pill}">${done}/${total}</span>
                    ${t.due_date ? `<span class="${UI.pill}">${escapeHtml(t.due_date)}</span>` : ``}
                  </div>
                  <div class="mt-2 h-2 rounded-full bg-white/60 border border-white/70 overflow-hidden">
                    <div class="h-full bg-accent" style="width:${pct}%;"></div>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2 shrink-0">
                <button class="${UI.btnSm}" data-task-edit="${t.id}">⋮</button>
                <button class="${UI.btnSm}" data-task-collapse="${t.id}">${collapsed ? "▾" : "▴"}</button>
              </div>
            </div>

            ${collapsed ? "" : `
              <div class="mt-4 space-y-2" data-task-body="${t.id}">
                ${
                  total === 0
                    ? `<div class="${UI.sub}">하위 할 일이 없어. ‘하위 작업 추가’를 눌러봐.</div>`
                    : list
                        .map(
                          (st) => `
                            <div class="flex items-center justify-between gap-3 p-3 rounded-[20px] bg-white/55 border border-white/70 hover:bg-white/80 transition" data-sub-open="${st.id}">
                              <label class="flex items-center gap-3 flex-1 cursor-pointer">
                                <input type="checkbox" data-sub-toggle="${st.id}" ${st.is_done ? "checked" : ""} />
                                <div class="min-w-0">
<div class="min-w-0">
  <div class="flex items-center gap-2 flex-wrap">
    <div class="text-[12.5px] font-semibold text-slate-900 ${st.is_done ? "line-through opacity-60" : ""}">
      ${escapeHtml(st.title)}
    </div>

    ${st.due_date ? `<span class="${UI.pill}">D-${escapeHtml(st.due_date)}</span>` : ``}
  </div>
</div>
                                </div>
                              </label>
                              <button class="${UI.btnSm}" data-sub-edit="${st.id}">편집</button>
                            </div>
                          `
                        )
                        .join("")
                }

                <div class="pt-1">
                  <button class="${UI.btnSm}" data-sub-add="${t.id}">＋ 하위 작업 추가</button>
                </div>
              </div>
            `}
          </div>
        </div>
      `;
    };

    qs("#ck_sections").innerHTML = (sections || [])
      .map((s) => {
        const list = tasksBySection.get(s.id) || [];
        return `
          <div class="${UI.bubble}">
            <div class="${UI.bubbleOverlay}" style="${bubbleOverlayStyle()}"></div>
            <div class="relative flex items-center justify-between gap-3">
              <div class="text-[13.5px] font-semibold text-slate-900">${escapeHtml(s.title)}</div>
              <button class="${UI.btnSm}" data-task-add="${s.id}">작업 추가</button>
            </div>

            <div class="relative mt-4 space-y-3">
              ${list.length ? list.map(renderTask).join("") : `<div class="${UI.sub}">상위 할 일이 없어. ‘작업 추가’를 눌러봐.</div>`}
            </div>
          </div>
        `;
      })
      .join("");

    // add task
    qsa("#ck_sections button[data-task-add]").forEach((btn) => {
      btn.onclick = async () => {
        const sectionId = btn.dataset.taskAdd;
        const ins = await supabase
          .from("checklist_tasks")
          .insert({ project_id: projectId, section_id: sectionId, title: "새 상위 할 일", sort_order: Date.now(), is_collapsed: false })
          .select("id")
          .single();
        if (ins.error) {
          await confirmModal({ title: "추가 실패", message: ins.error.message, okText: "닫기" });
          return;
        }
        openDrawer("checklist_task", { id: ins.data.id, projectId });
      };
    });

    // collapse
    qsa("#ck_sections button[data-task-collapse]").forEach((btn) => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const id = btn.dataset.taskCollapse;
        const t = (tasks || []).find((x) => x.id === id);
        const next = !t?.is_collapsed;
        await supabase.from("checklist_tasks").update({ is_collapsed: next }).eq("id", id);
      };
    });

    // edit task
    qsa("#ck_sections button[data-task-edit]").forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        openDrawer("checklist_task", { id: btn.dataset.taskEdit, projectId });
      };
    });

    // add subtask
    qsa("#ck_sections button[data-sub-add]").forEach((btn) => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const taskId = btn.dataset.subAdd;
        const ins = await supabase
.from("checklist_subtasks")
.select("id,task_id,title,is_done,sort_order,due_date,notes")
          .insert({ project_id: projectId, task_id: taskId, title: "새 하위 할 일", is_done: false, sort_order: Date.now() })
          .single();
        if (ins.error) {
          await confirmModal({ title: "추가 실패", message: ins.error.message, okText: "닫기" });
          return;
        }
        openDrawer("checklist_subtask", { id: ins.data.id, projectId });
      };
    });

    // toggle subtask
    qsa("#ck_sections input[data-sub-toggle]").forEach((cb) => {
      cb.onclick = (e) => e.stopPropagation();
      cb.onchange = async () => {
        const id = cb.dataset.subToggle;
        await supabase.from("checklist_subtasks").update({ is_done: cb.checked }).eq("id", id);
      };
    });

    // open subtask drawer
    qsa("#ck_sections [data-sub-open]").forEach((row) => {
      row.onclick = () => openDrawer("checklist_subtask", { id: row.dataset.subOpen, projectId });
    });

    // edit subtask
    qsa("#ck_sections button[data-sub-edit]").forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        openDrawer("checklist_subtask", { id: btn.dataset.subEdit, projectId });
      };
    });

    // toggle all subtasks by task checkbox
    qsa("#ck_sections input[data-task-toggle-all]").forEach((cb) => {
      cb.onclick = (e) => e.stopPropagation();
      cb.onchange = async () => {
        const taskId = cb.dataset.taskToggleAll;
        await supabase.from("checklist_subtasks").update({ is_done: cb.checked }).eq("task_id", taskId);
      };
    });
  }

  // top add (first section)
  qs("#ck_add_task").onclick = async () => {
    const { data: sec } = await supabase.from("checklist_sections").select("id").eq("project_id", projectId).order("sort_order").limit(1);
    const sectionId = sec?.[0]?.id;
    if (!sectionId) {
      await confirmModal({ title: "섹션이 없어", message: "먼저 checklist_sections 템플릿이 필요해.", okText: "닫기" });
      return;
    }
    const ins = await supabase
      .from("checklist_tasks")
      .insert({ project_id: projectId, section_id: sectionId, title: "새 상위 할 일", sort_order: Date.now(), is_collapsed: false })
      .select("id")
      .single();
    if (ins.error) {
      await confirmModal({ title: "추가 실패", message: ins.error.message, okText: "닫기" });
      return;
    }
    openDrawer("checklist_task", { id: ins.data.id, projectId });
  };

  const ch = supabase
    .channel("checklist_v2")
    .on("postgres_changes", { event: "*", schema: "public", table: "checklist_sections", filter: `project_id=eq.${projectId}` }, load)
    .on("postgres_changes", { event: "*", schema: "public", table: "checklist_tasks", filter: `project_id=eq.${projectId}` }, load)
    .on("postgres_changes", { event: "*", schema: "public", table: "checklist_subtasks", filter: `project_id=eq.${projectId}` }, load)
    .subscribe();

  window.__cleanup?.();
  window.__cleanup = () => supabase.removeChannel(ch);

  await load();
}

// Wrapper: prefer v2 when tables exist, otherwise fallback to v1
async function checklistPage(projectId) {
  // try v2 first (it will fallback internally if tables are missing)
  return checklistPageV2(projectId);
}

async function budgetPage(projectId) {
  const page = qs("#page");
  page.innerHTML = `
    ${header("예산", "클릭해서 상단에서 바로 편집", `<button id="addBudget" class="${UI.btnPrimary}">추가</button>`)}
    <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" id="summary"></div>
    <div class="mt-4 space-y-4" id="cats"></div>
  `;

  async function ensureTemplate() {
    const { data, error } = await supabase.from("budget_categories").select("id").eq("project_id", projectId).limit(1);

    if (error) return; // handled later
    if (data && data.length > 0) return;

    const defaults = ["예식장", "스드메", "스냅/영상", "부케/플라워", "청첩장", "기타"];
    await supabase.from("budget_categories").insert(defaults.map((t, i) => ({ project_id: projectId, title: t, sort_order: i })));
  }

  async function load() {
    await ensureTemplate();

    const { data: cats, error: ce } = await supabase
      .from("budget_categories")
      .select("id,title,sort_order")
      .eq("project_id", projectId)
      .order("sort_order");

    if (ce) {
      qs("#cats").innerHTML = isMissingTable(ce)
        ? missingTableCard("budget_categories")
        : `<div class="text-sm text-rose-700">${escapeHtml(ce.message)}</div>`;
      return;
    }

    // Try extended columns for spend/paid dates (optional). If missing, fallback.
    let items = [];
    let ie = null;
    {
      const try1 = await supabase
        .from("budget_items")
        .select("id,category_id,item_name,estimate,actual,paid,sort_order,spent_on,paid_on,due_date,notes")
        .eq("project_id", projectId)
        .order("sort_order");
      if (!try1.error) {
        items = try1.data || [];
      } else {
        const msg = String(try1.error.message || "");
        if (msg.toLowerCase().includes("column") || msg.toLowerCase().includes("could not find")) {
          const try2 = await supabase
            .from("budget_items")
            .select("id,category_id,item_name,estimate,actual,paid,sort_order")
            .eq("project_id", projectId)
            .order("sort_order");
          ie = try2.error;
          items = try2.data || [];
        } else {
          ie = try1.error;
        }
      }
    }

    if (ie) {
      qs("#cats").innerHTML = isMissingTable(ie)
        ? missingTableCard("budget_items")
        : `<div class="text-sm text-rose-700">${escapeHtml(ie.message)}</div>`;
      return;
    }

    const totals = (items || []).reduce(
      (acc, it) => {
        acc.estimate += n(it.estimate);
        acc.actual += n(it.actual);
        acc.paid += n(it.paid);
        return acc;
      },
      { estimate: 0, actual: 0, paid: 0 }
    );
    const unpaid = Math.max(0, totals.actual - totals.paid);

    qs("#summary").innerHTML = `
      <div class="${UI.bubble}"><div class="${UI.label}">예상</div><div class="text-[15px] font-semibold text-slate-900 mt-1">${moneyFmt(totals.estimate)}원</div></div>
      <div class="${UI.bubble}"><div class="${UI.label}">실제</div><div class="text-[15px] font-semibold text-slate-900 mt-1">${moneyFmt(totals.actual)}원</div></div>
      <div class="${UI.bubble}"><div class="${UI.label}">지불</div><div class="text-[15px] font-semibold text-slate-900 mt-1">${moneyFmt(totals.paid)}원</div></div>
      <div class="${UI.bubble}"><div class="${UI.label}">미지불</div><div class="text-[15px] font-semibold text-slate-900 mt-1">${moneyFmt(unpaid)}원</div></div>
    `;

    const byCat = new Map();
    (items || []).forEach((it) => {
      if (!byCat.has(it.category_id)) byCat.set(it.category_id, []);
      byCat.get(it.category_id).push(it);
    });

    qs("#cats").innerHTML = (cats || [])
      .map((c) => {
        const list = byCat.get(c.id) || [];
        const catTotal = list.reduce((a, it) => a + n(it.actual), 0);

        return `
          <div class="${UI.bubble}">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-2 flex-wrap">
                <div class="text-[13.5px] font-semibold text-slate-900">${escapeHtml(c.title)}</div>
                <span class="${UI.pill}">합계 <b class="font-semibold">${moneyFmt(catTotal)}</b>원</span>
              </div>
              <button class="${UI.btnSm}" data-add="${c.id}">추가</button>
            </div>

            <div class="mt-4 space-y-2">
              ${
                list.length === 0
                  ? `<div class="${UI.sub}">항목이 없어.</div>`
                  : list
                      .map((it) => {
                        const remaining = Math.max(0, n(it.actual) - n(it.paid));
                        return `
                          <button data-open="${it.id}" class="w-full text-left p-3 rounded-[22px] bg-white/55 border border-white/70 hover:bg-white/80 transition">
                            <div class="flex items-start justify-between gap-3">
                              <div class="min-w-0">
                                <div class="text-[12.5px] font-semibold text-slate-900 truncate">${escapeHtml(it.item_name || "항목")}</div>
                                <div class="mt-2 flex flex-wrap gap-2">
                                  <span class="${UI.pill}">예상 <b>${moneyFmt(it.estimate)}</b></span>
                                  <span class="${UI.pill}">실제 <b>${moneyFmt(it.actual)}</b></span>
                                  <span class="${UI.pill}">지불 <b>${moneyFmt(it.paid)}</b></span>
                                  ${it.spent_on ? `<span class="${UI.pill}">지출 ${escapeHtml(it.spent_on)}</span>` : ``}
                                  ${it.paid_on ? `<span class="${UI.pill}">지불일 ${escapeHtml(it.paid_on)}</span>` : ``}
                                  <span class="${UI.pillStrong}">잔액 <b>${moneyFmt(remaining)}</b></span>
                                </div>
                              </div>
                              <span class="${UI.sub}">열기 →</span>
                            </div>
                          </button>
                        `;
                      })
                      .join("")
              }
            </div>
          </div>
        `;
      })
      .join("");

    // add in category
    qsa("#cats button[data-add]").forEach((btn) => {
      btn.onclick = async () => {
        const categoryId = btn.dataset.add;
        const ins = await supabase
          .from("budget_items")
          .insert({
            project_id: projectId,
            category_id: categoryId,
            item_name: "새 항목",
            estimate: 0,
            actual: 0,
            paid: 0,
            sort_order: Date.now(),
          })
          .select("id")
          .single();

        if (ins.error) {
          await confirmModal({ title: "추가 실패", message: ins.error.message, okText: "닫기" });
          return;
        }
        openDrawer("budget_item", { id: ins.data.id, projectId });
      };
    });

    // open drawer
    qsa("#cats button[data-open]").forEach((btn) => {
      btn.onclick = () => openDrawer("budget_item", { id: btn.dataset.open, projectId });
    });
  }

  qs("#addBudget").onclick = async () => {
    const { data: cats } = await supabase.from("budget_categories").select("id").eq("project_id", projectId).order("sort_order").limit(1);
    const categoryId = cats?.[0]?.id;
    if (!categoryId) {
      await confirmModal({ title: "카테고리 없음", message: "budget_categories가 먼저 필요해.", okText: "닫기" });
      return;
    }

    const ins = await supabase
      .from("budget_items")
      .insert({
        project_id: projectId,
        category_id: categoryId,
        item_name: "새 항목",
        estimate: 0,
        actual: 0,
        paid: 0,
        sort_order: Date.now(),
      })
      .select("id")
      .single();

    if (ins.error) {
      await confirmModal({ title: "추가 실패", message: ins.error.message, okText: "닫기" });
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

async function notesPage(projectId) {
  const page = qs("#page");
  page.innerHTML = `
    ${header("메모", "클릭해서 상단에서 바로 편집", `<button id="nt_add" class="${UI.btnPrimary}">추가</button>`)}
    <div class="mt-4 space-y-3" id="nt_list"></div>
  `;

  async function load() {
    const { data, error } = await supabase
      .from("notes")
      .select("id,title,body,is_pinned,created_at")
      .eq("project_id", projectId)
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      qs("#nt_list").innerHTML = isMissingTable(error)
        ? missingTableCard("notes")
        : `<div class="text-sm text-rose-700">${escapeHtml(error.message)}</div>`;
      return;
    }

    qs("#nt_list").innerHTML =
      (data || [])
        .map(
          (m) => `
          <button data-id="${m.id}" class="${UI.bubble}">
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-start gap-3 min-w-0">
                ${iconBadge(iconSvg(m.is_pinned ? "pin" : "note", true), true)}
                <div class="min-w-0">
                  <div class="text-[13.5px] font-semibold text-slate-900 truncate">
                    ${m.is_pinned ? "고정 · " : ""}${escapeHtml(m.title || "메모")}
                  </div>
                  <div class="${UI.sub} mt-1 line-clamp-2">${escapeHtml(m.body || "")}</div>
                </div>
              </div>
              <span class="${UI.sub}">열기 →</span>
            </div>
          </button>
        `
        )
        .join("") ||
      `<div class="${UI.bubble}">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="text-[13.5px] font-semibold text-slate-900">메모가 없어</div>
            <div class="${UI.sub} mt-1">오른쪽 위 ‘추가’로 시작해봐.</div>
          </div>
          ${iconBadge(iconSvg("sparkle", true), true)}
        </div>
      </div>`;

    qsa("#nt_list button[data-id]").forEach((btn) => {
      btn.onclick = () => openDrawer("note", { id: btn.dataset.id, projectId });
    });
  }

  qs("#nt_add").onclick = async () => {
    const ins = await supabase
      .from("notes")
      .insert({ project_id: projectId, title: null, body: "", is_pinned: false })
      .select("id")
      .single();

    if (ins.error) {
      await confirmModal({ title: "추가 실패", message: ins.error.message, okText: "닫기" });
      return;
    }
    openDrawer("note", { id: ins.data.id, projectId });
  };

  const ch = supabase
    .channel("notes")
    .on("postgres_changes", { event: "*", schema: "public", table: "notes", filter: `project_id=eq.${projectId}` }, load)
    .subscribe();

  window.__cleanup?.();
  window.__cleanup = () => supabase.removeChannel(ch);

  await load();
}

// ---------- Render ----------
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
    qs("#page").innerHTML = `<div class="text-sm text-rose-700">projects 테이블을 찾지 못했거나 권한이 없어. (RLS 확인)</div>`;
    return;
  }

  const r = getRoute();
  if (r === "/overview") return overviewPage(projectId);
  if (r === "/ceremony") return ceremonyPage(projectId);
  if (r === "/vendors") return vendorsPage(projectId);
  if (r === "/timeline") return timelinePage(projectId);
  if (r === "/checklist") return checklistPage(projectId);
  if (r === "/budget") return budgetPage(projectId);
  if (r === "/notes") return notesPage(projectId);

  location.hash = "#/overview";
}

window.addEventListener("hashchange", () => {
  closeDrawer();
  render();
});
render();
