import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://ibjjbgthwmpvifbzxhwa.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliampiZ3Rod21wdmlmYnp4aHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NjExMTcsImV4cCI6MjA4NDQzNzExN30.Bb3fyGlJ_16gao6W8P0yaMotsD5DIEeTJVan3m5OKQw";

// ✅ "로그인 한 번 하면 계속 유지" 세팅을 명시적으로 켜둠
// - persistSession: localStorage에 세션 저장
// - autoRefreshToken: access token 자동 갱신
// - detectSessionInUrl: 매직링크/PKCE 콜백 처리 자동 보조
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce",
    storageKey: "wedding_planner_session_v1",
  },
});

const app = document.getElementById("app");

// ---------- UI Tokens (Glass) ----------
const UI = {
  pageWrap: "min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10",
  shell: "w-full max-w-6xl grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 md:gap-5",

  card:
    "backdrop-blur-2xl bg-white/65 border border-white/60 " +
    "shadow-[0_20px_70px_rgba(124,58,237,0.15),0_12px_28px_rgba(0,0,0,0.10)] " +
    "rounded-[28px]",
  cardInner: "p-5 sm:p-6",

  h1: "text-[22px] sm:text-[24px] font-semibold tracking-tight text-slate-900",
  sub: "text-[12.5px] text-slate-600/90",
  label: "text-[12px] text-slate-600/90",

  navLink:
    "flex items-center gap-2 px-3.5 py-2.5 rounded-2xl " +
    "text-[13.5px] text-slate-700/90 hover:bg-white/55 transition",
  navLinkActive:
    "bg-white/70 text-slate-900 shadow-[0_8px_18px_rgba(0,0,0,0.06)] border border-white/70",

  btn:
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 " +
    "text-[13px] font-medium text-slate-800 " +
    "bg-white/60 border border-white/70 hover:bg-white/80 transition " +
    "shadow-[0_8px_20px_rgba(0,0,0,0.06)]",
  btnSm:
    "inline-flex items-center justify-center gap-2 rounded-full px-3 py-1.5 " +
    "text-[12px] font-medium text-slate-800 " +
    "bg-white/60 border border-white/70 hover:bg-white/80 transition",
  btnDanger:
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 " +
    "text-[13px] font-semibold text-rose-700 " +
    "bg-white/60 border border-rose-200/70 hover:bg-rose-50/70 transition",
  btnPrimary:
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 " +
    "text-[13px] font-semibold text-white " +
    "bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 " +
    "hover:from-violet-700 hover:via-fuchsia-600 hover:to-pink-600 transition " +
    "shadow-[0_18px_45px_rgba(124,58,237,0.30)]",

  input:
    "w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 " +
    "text-[13.5px] text-slate-900 placeholder:text-slate-400 " +
    "outline-none focus:ring-2 focus:ring-violet-500/25 focus:border-white/70",
  textarea:
    "w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 " +
    "text-[13.5px] text-slate-900 placeholder:text-slate-400 " +
    "outline-none focus:ring-2 focus:ring-violet-500/25 focus:border-white/70",

  pill:
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 " +
    "text-[12px] text-slate-700 bg-white/60 border border-white/70",
  pillStrong:
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 " +
    "text-[12px] font-semibold text-slate-900 bg-white/75 border border-white/80",

  row:
    "w-full text-left rounded-[22px] p-4 sm:p-[18px] " +
    "bg-white/55 border border-white/70 hover:bg-white/80 transition " +
    "shadow-[0_10px_28px_rgba(0,0,0,0.07)]",
};

// ---------- Helpers ----------
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
function isAuthHash() {
  return location.hash.startsWith("#access_token=") || location.hash.startsWith("#error=");
}
function getRoute() {
  const h = location.hash || "#/timeline";
  if (h.startsWith("#/")) return h.slice(1);
  return "/timeline";
}
function hhmmToTime(hhmm) {
  if (!hhmm) return null;
  return hhmm.length === 5 ? `${hhmm}:00` : hhmm;
}
function timeToHHMM(t) {
  if (!t) return "";
  return String(t).slice(0, 5);
}
function moneyFmt(x) {
  const v = Number(x);
  const n = Number.isFinite(v) ? v : 0;
  return Math.round(n).toLocaleString("ko-KR");
}

// ✅ int4(sort_order) 범위 안전: Date.now() 쓰면 13자리라 400 터짐
function nowOrder() {
  return Math.floor(Date.now() / 1000); // seconds (<= 2,147,483,647 until 2038)
}

async function insertReturnId(table, row) {
  const { data, error } = await supabase.from(table).insert(row).select("id").single();
  if (error) {
    console.error(`[insert ${table}]`, error);
    alert(error.message);
    return null;
  }
  return data?.id ?? null;
}

async function ensureAuthFromUrl() {
  // PKCE code: ?code=...
  const url = new URL(location.href);
  const code = url.searchParams.get("code");
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) console.error("exchangeCodeForSession error:", error);
    url.searchParams.delete("code");
    history.replaceState({}, "", url.toString());
  }

  // hash token: #access_token=...&refresh_token=...
  if (isAuthHash()) {
    const params = new URLSearchParams(location.hash.slice(1));
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");
    const error = params.get("error_description") || params.get("error");
    if (error) console.error("Auth error:", error);

    if (access_token && refresh_token) {
      const { error: e2 } = await supabase.auth.setSession({ access_token, refresh_token });
      if (e2) console.error("setSession error:", e2);
    }
    location.hash = "#/timeline";
  }
}

// ---------- Drawer ----------
let drawerState = { open: false, kind: null, id: null, projectId: null, extra: {} };

function setDrawerOpen(open) {
  drawerState.open = open;

  const overlay = qs("#drawerOverlay");
  const panel = qs("#drawerPanel");

  // DOM 없을 때도 상태는 정리
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

async function renderDrawer() {
  const { kind, id, projectId } = drawerState;
  const titleEl = qs("#drawerTitle");
  const contentEl = qs("#drawerContent");
  if (!titleEl || !contentEl) return;

  const headerBadge = (emoji, label) =>
    `<span class="${UI.pillStrong}">${emoji} ${escapeHtml(label)}</span>`;

  if (kind === "timeline_event") {
    titleEl.innerHTML = `${headerBadge("📅", "행사일정 편집")}`;

    const [{ data: ev, error: e1 }, { data: days, error: e2 }] = await Promise.all([
      supabase.from("timeline_events").select("*").eq("id", id).single(),
      supabase
        .from("timeline_days")
        .select("id,title,sort_order")
        .eq("project_id", projectId)
        .order("sort_order"),
    ]);
    if (e1 || e2) {
      contentEl.innerHTML = `<div class="text-sm text-rose-700">${escapeHtml((e1 || e2).message)}</div>`;
      return;
    }

    contentEl.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <span class="${UI.pillStrong}">${escapeHtml(ev.icon || "⏰")} 아이콘</span>
          <span class="${UI.pill}">⏰ <b class="font-semibold">${escapeHtml(timeToHHMM(ev.start_time))}</b></span>
          <span class="${UI.pill}">⏳ <b class="font-semibold">${ev.duration_min || 0}m</b></span>
          ${ev.is_highlighted ? `<span class="${UI.pillStrong}">⭐ 중요</span>` : ""}
        </div>

        <div>
          <div class="${UI.label} mb-1">아이콘</div>
          <select id="ev_icon" class="${UI.input}">
            ${["⏰","📸","🍽️","💍","🎉","🚗","🏨","📍","🎤","🕯️","🧾","👗"].map(ic =>
              `<option value="${ic}" ${ic===ev.icon ? "selected" : ""}>${ic}</option>`
            ).join("")}
          </select>
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
            ${(days ?? []).map(d =>
              `<option value="${d.id}" ${d.id===ev.day_id ? "selected":""}>${escapeHtml(d.title)}</option>`
            ).join("")}
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

        <label class="flex items-center gap-2 text-[13px] text-slate-800">
          <input id="ev_hi" type="checkbox" ${ev.is_highlighted ? "checked":""} />
          ⭐ 중요 표시
        </label>

        <div class="flex items-center justify-between pt-2">
          <button id="ev_delete" class="${UI.btnDanger}">🗑️ 삭제</button>
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
      if (!confirm("삭제할까?")) return;
      await supabase.from("timeline_events").delete().eq("id", id);
      closeDrawer();
    };

    setDrawerStatus("열림");
    return;
  }

  if (kind === "checklist_item") {
    titleEl.innerHTML = `${headerBadge("✅", "체크리스트 편집")}`;

    const [{ data: it, error: e1 }, { data: sections, error: e2 }] = await Promise.all([
      supabase.from("checklist_items").select("*").eq("id", id).single(),
      supabase
        .from("checklist_sections")
        .select("id,title,sort_order")
        .eq("project_id", projectId)
        .order("sort_order"),
    ]);
    if (e1 || e2) {
      contentEl.innerHTML = `<div class="text-sm text-rose-700">${escapeHtml((e1 || e2).message)}</div>`;
      return;
    }

    const sectionTitle = (sections ?? []).find(s => s.id === it.section_id)?.title || "섹션";

    contentEl.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <span class="${UI.pillStrong}">${it.is_done ? "✅" : "⬜"} 상태</span>
          <span class="${UI.pill}">🗂️ <b class="font-semibold">${escapeHtml(sectionTitle)}</b></span>
        </div>

        <div>
          <div class="${UI.label} mb-1">제목</div>
          <input id="ck_title" class="${UI.input}" value="${escapeHtml(it.title || "")}" />
        </div>

        <div>
          <div class="${UI.label} mb-1">섹션</div>
          <select id="ck_section" class="${UI.input}">
            ${(sections ?? []).map(s =>
              `<option value="${s.id}" ${s.id===it.section_id?"selected":""}>${escapeHtml(s.title)}</option>`
            ).join("")}
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

        <label class="flex items-center gap-2 text-[13px] text-slate-800">
          <input id="ck_done" type="checkbox" ${it.is_done ? "checked":""} />
          완료
        </label>

        <div class="flex items-center justify-between pt-2">
          <button id="ck_delete" class="${UI.btnDanger}">🗑️ 삭제</button>
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
      if (!confirm("삭제할까?")) return;
      await supabase.from("checklist_items").delete().eq("id", id);
      closeDrawer();
    };

    setDrawerStatus("열림");
    return;
  }

  if (kind === "budget_item") {
    titleEl.innerHTML = `${headerBadge("💳", "예산 항목 편집")}`;

    const [{ data: it, error: e1 }, { data: cats, error: e2 }] = await Promise.all([
      supabase.from("budget_items").select("*").eq("id", id).single(),
      supabase
        .from("budget_categories")
        .select("id,title,sort_order")
        .eq("project_id", projectId)
        .order("sort_order"),
    ]);
    if (e1 || e2) {
      contentEl.innerHTML = `<div class="text-sm text-rose-700">${escapeHtml((e1 || e2).message)}</div>`;
      return;
    }

    const unpaid = Math.max(0, Number(it.actual || 0) - Number(it.paid || 0));

    contentEl.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <span class="${UI.pillStrong}">🧾 잔액 <span class="ml-1">${moneyFmt(unpaid)}원</span></span>
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
            ${(cats ?? []).map(c =>
              `<option value="${c.id}" ${c.id===it.category_id?"selected":""}>${escapeHtml(c.title)}</option>`
            ).join("")}
          </select>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div>
            <div class="${UI.label} mb-1">예상</div>
            <input id="bd_est" type="number" class="${UI.input}" value="${Number(it.estimate||0)}" min="0" />
          </div>
          <div>
            <div class="${UI.label} mb-1">실제</div>
            <input id="bd_act" type="number" class="${UI.input}" value="${Number(it.actual||0)}" min="0" />
          </div>
          <div>
            <div class="${UI.label} mb-1">지불</div>
            <input id="bd_paid" type="number" class="${UI.input}" value="${Number(it.paid||0)}" min="0" />
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
          <button id="bd_delete" class="${UI.btnDanger}">🗑️ 삭제</button>
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
      if (!confirm("삭제할까?")) return;
      await supabase.from("budget_items").delete().eq("id", id);
      closeDrawer();
    };

    setDrawerStatus("열림");
    return;
  }

  titleEl.textContent = "Detail";
  contentEl.innerHTML = `<div class="${UI.sub}">지원하지 않는 패널</div>`;
}

// ---------- Data ----------
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

// ---------- Layout ----------
function layoutShell(userEmail) {
  app.innerHTML = `
  <div class="${UI.pageWrap}">
    <div class="${UI.shell}">
      <aside class="${UI.card}">
        <div class="${UI.cardInner}">
          <div class="flex items-start justify-between gap-3">
            <div>
              <div class="flex items-center gap-2">
                <span class="${UI.pillStrong}">💍</span>
                <div class="text-[16px] font-semibold tracking-tight text-slate-900">Wedding Planner</div>
              </div>
              <div class="${UI.sub} mt-1">${escapeHtml(userEmail)}</div>
            </div>
            <span class="${UI.pill}"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> Online</span>
          </div>

          <nav class="mt-5 space-y-2" id="nav">
            <a class="${UI.navLink}" data-route="/timeline" href="#/timeline">
              <span class="${UI.pillStrong}">📅</span> 행사일정
            </a>
            <a class="${UI.navLink}" data-route="/checklist" href="#/checklist">
              <span class="${UI.pillStrong}">✅</span> 체크리스트
            </a>
            <a class="${UI.navLink}" data-route="/budget" href="#/budget">
              <span class="${UI.pillStrong}">💳</span> 예산
            </a>
          </nav>

          <div class="mt-6 flex items-center justify-between">
            <button id="logout" class="${UI.btn}">↩︎ 로그아웃</button>
            <span class="${UI.sub}">Auto-save</span>
          </div>
        </div>
      </aside>

      <main class="${UI.card}">
        <div class="${UI.cardInner}">
          <div id="page"></div>
        </div>
      </main>

      <!-- Drawer Overlay + Panel -->
      <div id="drawerOverlay" class="fixed inset-0 bg-black/25 opacity-0 pointer-events-none transition"></div>

      <aside id="drawerPanel"
        class="fixed right-0 top-0 h-full w-full md:w-[440px]
               translate-x-full transition-transform duration-200
               ${UI.card} rounded-none md:rounded-l-[28px]
               border-l border-white/60 ring-1 ring-white/50">
        <div class="p-5 sm:p-6 h-full flex flex-col">
          <div class="flex items-center justify-between gap-3">
            <div id="drawerTitle" class="text-[13px] font-semibold text-slate-900"></div>
            <button id="drawerClose" class="${UI.btnSm}">닫기 ✕</button>
          </div>
          <div class="mt-4 flex-1 overflow-auto" id="drawerContent"></div>
          <div class="mt-3 text-[12px] text-slate-600/90" id="drawerStatus"></div>
        </div>
      </aside>
    </div>
  </div>`;

  const r = (location.hash || "#/timeline").replace("#", "");
  qsa("#nav a[data-route]").forEach((a) => {
    if (a.getAttribute("data-route") === r) a.classList.add(...UI.navLinkActive.split(" "));
  });

  qs("#logout").onclick = async () => {
    await supabase.auth.signOut();
    render();
  };

  // ✅ drawer close handlers는 DOM 만든 뒤 여기서만
  qs("#drawerOverlay").onclick = closeDrawer;
  qs("#drawerClose").onclick = closeDrawer;

  // ESC 핸들러(중복 방지)
  if (!window.__drawerEscBound) {
    window.__drawerEscBound = true;
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDrawer();
    });
  }
}

function loginView() {
  const saved = localStorage.getItem("wp_last_email") || "";
  app.innerHTML = `
  <div class="${UI.pageWrap}">
    <div class="${UI.card} w-full max-w-sm">
      <div class="${UI.cardInner} space-y-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="${UI.pillStrong}">💍</span>
            <h1 class="${UI.h1}">로그인</h1>
          </div>
          <p class="${UI.sub} mt-1">매직 링크 한 번 로그인하면 세션이 저장돼서 다음엔 자동으로 들어와.</p>
        </div>

        <input id="email" class="${UI.input}" placeholder="email@example.com" value="${escapeHtml(saved)}" />
        <button id="send" class="${UI.btnPrimary} w-full">✉️ 매직 링크 보내기</button>

        <p id="msg" class="${UI.sub}"></p>
      </div>
    </div>
  </div>`;

  qs("#send").onclick = async () => {
    const email = qs("#email").value.trim();
    if (!email) return;
    localStorage.setItem("wp_last_email", email);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: location.origin + location.pathname,
        shouldCreateUser: true,
      },
    });

    qs("#msg").textContent = error ? error.message : "메일함에서 링크를 눌러줘! (다음부터는 자동 로그인)";
  };
}

// ---------- Pages ----------
async function timelinePage(projectId) {
  const page = qs("#page");
  page.innerHTML = `
    <header class="flex items-start justify-between gap-3">
      <div>
        <div class="flex items-center gap-2">
          <span class="${UI.pillStrong}">📅</span>
          <h1 class="${UI.h1}">행사일정</h1>
        </div>
        <div class="${UI.sub} mt-1">카드를 클릭하면 오른쪽에서 상세 편집</div>
      </div>
      <button id="addEvent" class="${UI.btnPrimary}">＋ 일정 추가</button>
    </header>

    <div class="mt-4 flex flex-wrap gap-2" id="dayTabs"></div>
    <div class="mt-4 space-y-3" id="events"></div>
  `;

  async function loadDays() {
    return await supabase
      .from("timeline_days")
      .select("id,title,sort_order")
      .eq("project_id", projectId)
      .order("sort_order");
  }

  let { data: days } = await loadDays();
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
    box.innerHTML = (days || []).map(d => {
      const active = d.id === selectedDayId;
      return `
        <button data-day="${d.id}"
          class="${UI.pill} ${active ? "bg-white/80 border-white/80 shadow-[0_10px_22px_rgba(0,0,0,0.06)]" : ""}">
          🗓️ ${escapeHtml(d.title)}
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
      <button data-id="${e.id}" class="${UI.row}">
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-start gap-3">
            <div class="w-11 h-11 rounded-2xl flex items-center justify-center
                        bg-gradient-to-br from-violet-600/15 via-fuchsia-500/10 to-pink-500/15
                        border border-white/70">
              <span class="text-[20px]">${escapeHtml(e.icon || "⏰")}</span>
            </div>

            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="${UI.pill}">⏰ <b class="font-semibold">${escapeHtml(timeToHHMM(e.start_time))}</b></span>
                <span class="${UI.pill}">⏳ <b class="font-semibold">${e.duration_min}m</b></span>
                ${e.is_highlighted ? `<span class="${UI.pillStrong}">⭐ 중요</span>` : ""}
              </div>

              <div class="mt-2 text-[15px] font-semibold text-slate-900">${escapeHtml(e.title)}</div>
              ${e.location ? `<div class="${UI.sub} mt-1">📍 ${escapeHtml(e.location)}</div>` : ""}
            </div>
          </div>

          <span class="${UI.sub} mt-1">열기 →</span>
        </div>
      </button>
    `).join("") || `
      <div class="${UI.row} text-[13px] text-slate-700">
        아직 일정이 없어. 오른쪽 위 <b>＋ 일정 추가</b>로 만들어봐.
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
        icon: "⏰",
        title: "새 일정",
      })
      .select("id")
      .single();

    if (ins.error) {
      console.error(ins.error);
      alert(ins.error.message);
      return;
    }
    openDrawer("timeline_event", { id: ins.data.id, projectId });
  };

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

async function checklistPage(projectId) {
  const page = qs("#page");
  page.innerHTML = `
    <header class="flex items-start justify-between gap-3">
      <div>
        <div class="flex items-center gap-2">
          <span class="${UI.pillStrong}">✅</span>
          <h1 class="${UI.h1}">체크리스트</h1>
        </div>
        <div class="${UI.sub} mt-1">체크는 바로, 편집은 카드 클릭</div>
      </div>
      <button id="addItem" class="${UI.btnPrimary}">＋ 할 일 추가</button>
    </header>
    <div class="mt-4 space-y-4" id="sections"></div>
  `;

  async function ensureTemplate() {
    const { data, error } = await supabase
      .from("checklist_sections")
      .select("id")
      .eq("project_id", projectId)
      .limit(1);

    if (error) throw error;
    if (data && data.length > 0) return;

    const defaults = ["6개월 전", "3개월 전", "1개월 전", "2주 전", "1주 전", "당일"];
    const { error: e2 } = await supabase.from("checklist_sections").insert(
      defaults.map((t, i) => ({ project_id: projectId, title: t, sort_order: i }))
    );
    if (e2) throw e2;
  }

  async function load() {
    await ensureTemplate();

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
        <div class="${UI.row}">
          <div class="flex items-center justify-between gap-3">
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <div class="text-[15px] font-semibold text-slate-900">${escapeHtml(s.title)}</div>
                <span class="${UI.pill}">✅ ${done}/${total}</span>
                <span class="${UI.pill}">📈 ${pct}%</span>
              </div>
              <div class="mt-2 h-2 rounded-full bg-white/55 overflow-hidden border border-white/70">
                <div class="h-full bg-gradient-to-r from-violet-600/60 via-fuchsia-500/55 to-pink-500/55" style="width:${pct}%;"></div>
              </div>
            </div>
            <button class="${UI.btnSm}" data-add="${s.id}">＋ 이 섹션</button>
          </div>

          <div class="mt-4 space-y-2">
            ${total === 0 ? `<div class="${UI.sub}">할 일이 없어.</div>` :
              list.map(it => `
                <div class="flex items-center justify-between gap-3 p-3 rounded-[18px]
                            bg-white/55 border border-white/70 hover:bg-white/80 transition"
                     data-open="${it.id}">
                  <label class="flex items-center gap-3 flex-1 cursor-pointer">
                    <input type="checkbox" data-toggle="${it.id}" ${it.is_done ? "checked" : ""} />
                    <div class="min-w-0">
                      <div class="text-[13.5px] font-medium text-slate-900 ${it.is_done ? "line-through opacity-60" : ""}">
                        ${escapeHtml(it.title)}
                      </div>
                      <div class="${UI.sub} mt-1">클릭해서 상세 편집</div>
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

    // add item in section (✅ Date.now() 금지 -> nowOrder + 에러 체크)
    qsa("#sections button[data-add]").forEach(btn => {
      btn.onclick = async () => {
        const sectionId = btn.dataset.add;
        const id = await insertReturnId("checklist_items", {
          project_id: projectId,
          section_id: sectionId,
          title: "새 할 일",
          sort_order: nowOrder(),
        });
        if (!id) return;
        openDrawer("checklist_item", { id, projectId });
      };
    });

    // toggle (stop opening drawer)
    qsa("#sections input[data-toggle]").forEach(cb => {
      cb.onclick = (e) => e.stopPropagation();
      cb.onchange = async () => {
        const id = cb.dataset.toggle;
        const { error } = await supabase.from("checklist_items").update({ is_done: cb.checked }).eq("id", id);
        if (error) console.error(error);
      };
    });

    // open drawer on row click
    qsa("#sections [data-open]").forEach(row => {
      row.onclick = () => openDrawer("checklist_item", { id: row.dataset.open, projectId });
    });
  }

  qs("#addItem").onclick = async () => {
    const { data: sec, error } = await supabase
      .from("checklist_sections")
      .select("id")
      .eq("project_id", projectId)
      .order("sort_order")
      .limit(1);
    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    const sectionId = sec?.[0]?.id;
    if (!sectionId) return;

    const id = await insertReturnId("checklist_items", {
      project_id: projectId,
      section_id: sectionId,
      title: "새 할 일",
      sort_order: nowOrder(),
    });
    if (!id) return;
    openDrawer("checklist_item", { id, projectId });
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

async function budgetPage(projectId) {
  const page = qs("#page");
  page.innerHTML = `
    <header class="flex items-start justify-between gap-3">
      <div>
        <div class="flex items-center gap-2">
          <span class="${UI.pillStrong}">💳</span>
          <h1 class="${UI.h1}">예산</h1>
        </div>
        <div class="${UI.sub} mt-1">카드 클릭 → 우측에서 금액/마감/메모 편집</div>
      </div>
      <button id="addBudget" class="${UI.btnPrimary}">＋ 항목 추가</button>
    </header>

    <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" id="summary"></div>
    <div class="mt-4 space-y-4" id="cats"></div>
  `;

  async function ensureTemplate() {
    const { data, error } = await supabase
      .from("budget_categories")
      .select("id")
      .eq("project_id", projectId)
      .limit(1);

    if (error) throw error;
    if (data && data.length > 0) return;

    const defaults = ["예식장", "스드메", "스냅/영상", "부케/플라워", "청첩장", "기타"];
    const { error: e2 } = await supabase.from("budget_categories").insert(
      defaults.map((t, i) => ({ project_id: projectId, title: t, sort_order: i }))
    );
    if (e2) throw e2;
  }

  function n(x) {
    const v = Number(x);
    return Number.isFinite(v) ? v : 0;
  }

  async function load() {
    await ensureTemplate();

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
      <div class="${UI.row}"><div class="${UI.sub}">예상</div><div class="text-[18px] font-semibold text-slate-900 mt-1">${moneyFmt(totals.estimate)}원</div></div>
      <div class="${UI.row}"><div class="${UI.sub}">실제</div><div class="text-[18px] font-semibold text-slate-900 mt-1">${moneyFmt(totals.actual)}원</div></div>
      <div class="${UI.row}"><div class="${UI.sub}">지불</div><div class="text-[18px] font-semibold text-slate-900 mt-1">${moneyFmt(totals.paid)}원</div></div>
      <div class="${UI.row}"><div class="${UI.sub}">미지불</div><div class="text-[18px] font-semibold text-slate-900 mt-1">${moneyFmt(unpaid)}원</div></div>
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
        <div class="${UI.row}">
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-2 flex-wrap">
              <div class="text-[15px] font-semibold text-slate-900">${escapeHtml(c.title)}</div>
              <span class="${UI.pill}">합계 <b class="font-semibold">${moneyFmt(catTotal)}</b>원</span>
            </div>
            <button class="${UI.btnSm}" data-add="${c.id}">＋ 추가</button>
          </div>

          <div class="mt-4 space-y-2">
            ${
              list.length === 0
                ? `<div class="${UI.sub}">항목이 없어.</div>`
                : list.map((it) => {
                    const remaining = Math.max(0, n(it.actual) - n(it.paid));
                    return `
                      <button data-open="${it.id}" class="w-full ${UI.row} !p-3">
                        <div class="flex items-start justify-between gap-3">
                          <div class="min-w-0">
                            <div class="flex items-center gap-2">
                              <span class="${UI.pillStrong}">🧾</span>
                              <div class="text-[14px] font-semibold text-slate-900 truncate">
                                ${escapeHtml(it.item_name || "항목")}
                              </div>
                            </div>

                            <div class="mt-2 flex flex-wrap gap-2">
                              <span class="${UI.pill}">예상 <b class="font-semibold">${moneyFmt(it.estimate)}</b></span>
                              <span class="${UI.pill}">실제 <b class="font-semibold">${moneyFmt(it.actual)}</b></span>
                              <span class="${UI.pill}">지불 <b class="font-semibold">${moneyFmt(it.paid)}</b></span>
                              <span class="${UI.pillStrong}">잔액 <b class="font-semibold">${moneyFmt(remaining)}</b></span>
                            </div>
                          </div>

                          <span class="${UI.sub} mt-1">열기 →</span>
                        </div>
                      </button>
                    `;
                  }).join("")
            }
          </div>
        </div>
      `;
    }).join("");

    // add in category (✅ Date.now() 금지 -> nowOrder + 에러 체크)
    qsa("#cats button[data-add]").forEach((btn) => {
      btn.onclick = async () => {
        const categoryId = btn.dataset.add;
        const id = await insertReturnId("budget_items", {
          project_id: projectId,
          category_id: categoryId,
          item_name: "새 예산 항목",
          estimate: 0,
          actual: 0,
          paid: 0,
          sort_order: nowOrder(),
        });
        if (!id) return;
        openDrawer("budget_item", { id, projectId });
      };
    });

    // open drawer
    qsa("#cats button[data-open]").forEach((btn) => {
      btn.onclick = () => openDrawer("budget_item", { id: btn.dataset.open, projectId });
    });
  }

  qs("#addBudget").onclick = async () => {
    const { data: cats, error } = await supabase
      .from("budget_categories")
      .select("id")
      .eq("project_id", projectId)
      .order("sort_order")
      .limit(1);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    const categoryId = cats?.[0]?.id;
    if (!categoryId) return;

    const id = await insertReturnId("budget_items", {
      project_id: projectId,
      category_id: categoryId,
      item_name: "새 예산 항목",
      estimate: 0,
      actual: 0,
      paid: 0,
      sort_order: nowOrder(),
    });
    if (!id) return;

    openDrawer("budget_item", { id, projectId });
  };

  const ch = supabase
    .channel("budget")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "budget_categories", filter: `project_id=eq.${projectId}` },
      load
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "budget_items", filter: `project_id=eq.${projectId}` },
      load
    )
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
  const projectId = await getProjectId();

  const r = getRoute();
  if (r === "/timeline") return timelinePage(projectId);
  if (r === "/checklist") return checklistPage(projectId);
  if (r === "/budget") return budgetPage(projectId);

  location.hash = "#/timeline";
}

// auth 상태 변경 시 자동 렌더(로그인/로그아웃 반영)
if (!window.__authBound) {
  window.__authBound = true;
  supabase.auth.onAuthStateChange(() => {
    // render는 내부적으로 session을 다시 읽음
    render();
  });
}

window.addEventListener("hashchange", render);
render();
