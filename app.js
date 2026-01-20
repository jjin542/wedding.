from pathlib import Path
import shutil, zipfile, re, textwrap, json

# Build full app.js (overwrite)
SUPA_URL = "https://ibjjbgthwmpvifbzxhwa.supabase.co"
SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliampiZ3Rod21wdmlmYnp4aHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NjExMTcsImV4cCI6MjA4NDQzNzExN30.Bb3fyGlJ_16gao6W8P0yaMotsD5DIEeTJVan3m5OKQw"

app_full = f"""import {{ createClient }} from "https://esm.sh/@supabase/supabase-js@2";

/** =========================
 *  Supabase
 *  ========================= */
const SUPABASE_URL = "https://ibjjbgthwmpvifbzxhwa.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliampiZ3Rod21wdmlmYnp4aHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NjExMTcsImV4cCI6MjA4NDQzNzExN30.Bb3fyGlJ_16gao6W8P0yaMotsD5DIEeTJVan3m5OKQw";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {{
  auth: {{
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  }},
}});

const app = document.getElementById("app");

/** =========================
 *  UI Tokens (Spring Light + Twilight Blue as MAIN accents)
 *  ========================= */
const UI = {{
  pageWrap: "min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10",
  shell: "w-full max-w-6xl grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 md:gap-5",

  card:
    "backdrop-blur-2xl bg-white/60 border border-white/70 " +
    "shadow-soft rounded-[26px]",
  cardInner: "p-5 sm:p-6",

  // Typography (smaller)
  title: "text-[16px] font-semibold tracking-tight text-ink",
  h1: "text-[18px] sm:text-[19px] font-semibold tracking-tight text-ink",
  h2: "text-[13px] font-semibold tracking-tight text-ink",
  sub: "text-[12px] text-slate-700/85",
  tiny: "text-[11px] text-slate-700/75",
  label: "text-[11px] text-slate-700/80",

  navLink:
    "flex items-center gap-2 px-3.5 py-2.5 rounded-2xl " +
    "text-[12.5px] text-slate-800/85 hover:bg-white/55 transition",
  navLinkActive:
    "bg-white/75 text-ink shadow-[0_10px_26px_rgba(0,0,0,0.06)] border border-white/80",

  btn:
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 " +
    "text-[12px] font-medium text-ink " +
    "bg-white/60 border border-white/75 hover:bg-white/80 transition " +
    "shadow-[0_10px_26px_rgba(0,0,0,0.06)]",
  btnSm:
    "inline-flex items-center justify-center gap-2 rounded-full px-3 py-1.5 " +
    "text-[11px] font-medium text-ink " +
    "bg-white/60 border border-white/75 hover:bg-white/80 transition",
  btnPrimary:
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 " +
    "text-[12px] font-semibold text-ink " +
    "bg-spring hover:brightness-[0.98] transition " +
    "shadow-[0_18px_46px_rgba(97,134,228,0.22)] border border-white/80",
  btnPrimary2:
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 " +
    "text-[12px] font-semibold text-white " +
    "bg-twilight hover:brightness-[0.95] transition " +
    "shadow-[0_18px_46px_rgba(97,134,228,0.30)] border border-white/40",
  btnDanger:
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 " +
    "text-[12px] font-semibold text-rose-700 " +
    "bg-white/60 border border-rose-200/70 hover:bg-rose-50/70 transition",

  input:
    "w-full rounded-2xl border border-white/80 bg-white/70 px-4 py-3 " +
    "text-[12.5px] text-ink placeholder:text-slate-400 " +
    "outline-none focus:ring-2 focus:ring-twilight/25 focus:border-white/80",
  textarea:
    "w-full rounded-2xl border border-white/80 bg-white/70 px-4 py-3 " +
    "text-[12.5px] text-ink placeholder:text-slate-400 " +
    "outline-none focus:ring-2 focus:ring-twilight/25 focus:border-white/80",

  pill:
    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 " +
    "text-[11px] text-ink/90 bg-white/55 border border-white/75",
  pillBlue:
    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 " +
    "text-[11px] text-white bg-twilight border border-white/30",
  pillSpring:
    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 " +
    "text-[11px] text-ink bg-spring border border-white/60",

  // chat bubble row
  bubble:
    "relative w-full text-left rounded-[22px] p-4 sm:p-[18px] " +
    "bg-white/55 border border-white/80 hover:bg-white/75 transition " +
    "shadow-[0_12px_30px_rgba(0,0,0,0.06)] overflow-hidden",
  bubbleOverlay:
    "absolute inset-0 opacity-[0.90] pointer-events-none " +
    "bg-[radial-gradient(circle_at_20%_10%,rgba(241,251,153,0.55),transparent_60%)," +
    "radial-gradient(circle_at_85%_30%,rgba(97,134,228,0.20),transparent_55%)]",
}};

/** =========================
 *  Helpers
 *  ========================= */
function qs(sel) {{ return document.querySelector(sel); }}
function qsa(sel) {{ return Array.from(document.querySelectorAll(sel)); }}

function escapeHtml(s) {{
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({{
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }}[c]));
}}

function moneyFmt(x) {{
  const v = Number(x);
  const n = Number.isFinite(v) ? v : 0;
  return Math.round(n).toLocaleString("ko-KR");
}}
function n(x) {{ const v = Number(x); return Number.isFinite(v) ? v : 0; }}

function getRoute() {{
  const h = location.hash || "#/overview";
  if (h.startsWith("#/")) return h.slice(1);
  return "/overview";
}}

/** =========================
 *  Auth URL handling (PKCE + hash)
 *  ========================= */
function isAuthHash() {{
  return location.hash.startsWith("#access_token=") || location.hash.startsWith("#error=");
}}

async function ensureAuthFromUrl() {{
  // PKCE: ?code=...
  const url = new URL(location.href);
  const code = url.searchParams.get("code");
  if (code) {{
    await supabase.auth.exchangeCodeForSession(code);
    url.searchParams.delete("code");
    history.replaceState({{}}, "", url.toString());
  }}

  // Hash token: #access_token=...&refresh_token=...
  if (isAuthHash()) {{
    const params = new URLSearchParams(location.hash.slice(1));
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");
    const error = params.get("error_description") || params.get("error");
    if (error) console.error("Auth error:", error);

    if (access_token && refresh_token) {{
      await supabase.auth.setSession({{ access_token, refresh_token }});
    }}
    location.hash = "#/overview";
  }}
}}

/** =========================
 *  Icons (simple, line style)
 *  ========================= */
function icon(name, size = 18) {{
  const common = `width="${{size}}" height="${{size}}" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"`;

  const paths = {{
    overview: `<path d="M10 3H5a2 2 0 0 0-2 2v5h7V3Z"/><path d="M21 10V5a2 2 0 0 0-2-2h-5v7h7Z"/><path d="M10 21v-7H3v5a2 2 0 0 0 2 2h5Z"/><path d="M14 21h5a2 2 0 0 0 2-2v-5h-7v7Z"/>`,
    schedule: `<path d="M7 3v3"/><path d="M17 3v3"/><path d="M4 7h16"/><rect x="4" y="5" width="16" height="16" rx="3"/><path d="M8 11h4"/><path d="M8 15h6"/>`,
    checklist: `<path d="M9 11l2 2 4-5"/><rect x="4" y="4" width="16" height="16" rx="4"/>`,
    budget: `<path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M4 10h16"/><path d="M15 14h3"/>`,
    vendors: `<path d="M6 7l1-3h10l1 3"/><path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 10v2"/><path d="M15 10v2"/>`,
    ceremony: `<path d="M12 21s-7-4.4-7-11a4 4 0 0 1 7-2a4 4 0 0 1 7 2c0 6.6-7 11-7 11Z"/>`,
    notes: `<path d="M8 4h8a2 2 0 0 1 2 2v12l-3-2-3 2-3-2-3 2V6a2 2 0 0 1 2-2Z"/><path d="M9 8h6"/><path d="M9 12h6"/>`,
    home: `<path d="M3 11l9-8 9 8"/><path d="M5 10v10a1 1 0 0 0 1 1h4v-7h4v7h4a1 1 0 0 0 1-1V10"/>`,
    box: `<path d="M21 8l-9-5-9 5 9 5 9-5Z"/><path d="M3 8v10l9 5 9-5V8"/><path d="M12 13v10"/>`,
    more: `<path d="M12 12h.01"/><path d="M19 12h.01"/><path d="M5 12h.01"/>`,
    user: `<path d="M20 21a8 8 0 1 0-16 0"/><circle cx="12" cy="8" r="4"/>`,
    trash: `<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M9 6v14"/><path d="M15 6v14"/><path d="M6 6l1 16h10l1-16"/>`,
    plus: `<path d="M12 5v14"/><path d="M5 12h14"/>`,
    chevron: `<path d="M9 18l6-6-6-6"/>`,
    clock: `<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>`,
    tag: `<path d="M20 10l-8 8-9-9V4h5l12 6Z"/><path d="M7.5 7.5h.01"/>`,
    link: `<path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1"/><path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1"/>`,
  }};

  return `<svg ${{common}}>${{paths[name] || ""}}</svg>`;
}}

function iconCircle(name) {{
  return `
    <span class="w-9 h-9 rounded-2xl flex items-center justify-center
                 bg-white/65 border border-white/80 shadow-[0_10px_24px_rgba(0,0,0,0.05)] text-twilight">
      ${{icon(name, 18)}}
    </span>
  `;
}}

/** =========================
 *  Toast
 *  ========================= */
function toast(msg) {{
  const el = qs("#toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.remove("opacity-0", "pointer-events-none");
  el.classList.add("opacity-100");
  setTimeout(() => {{
    el.classList.add("opacity-0", "pointer-events-none");
    el.classList.remove("opacity-100");
  }}, 2400);
}}

/** =========================
 *  Confirm Modal (pretty)
 *  ========================= */
let __confirmResolver = null;

function confirmModal({{ title = "확인", desc = "", confirmText = "삭제", cancelText = "취소", danger = true }} = {{}}) {{
  return new Promise((resolve) => {{
    __confirmResolver = resolve;
    qs("#confirmTitle").textContent = title;
    qs("#confirmDesc").textContent = desc;
    qs("#confirmOk").textContent = confirmText;
    qs("#confirmCancel").textContent = cancelText;

    const ok = qs("#confirmOk");
    ok.className = danger ? UI.btnDanger : UI.btnPrimary2;

    const overlay = qs("#confirmOverlay");
    const panel = qs("#confirmPanel");
    overlay.classList.remove("opacity-0", "pointer-events-none");
    overlay.classList.add("opacity-100");
    panel.classList.remove("scale-95", "opacity-0");
    panel.classList.add("scale-100", "opacity-100");
  }});
}}

function closeConfirm(val) {{
  const overlay = qs("#confirmOverlay");
  const panel = qs("#confirmPanel");
  overlay.classList.add("opacity-0", "pointer-events-none");
  overlay.classList.remove("opacity-100");
  panel.classList.add("scale-95", "opacity-0");
  panel.classList.remove("scale-100", "opacity-100");
  const r = __confirmResolver;
  __confirmResolver = null;
  r?.(val);
}}

/** =========================
 *  Drawer
 *  ========================= */
let drawerState = {{ open: false, kind: null, id: null, projectId: null, domainId: null, extra: {{}} }};

function setDrawerOpen(open) {{
  drawerState.open = open;
  const overlay = qs("#drawerOverlay");
  const panel = qs("#drawerPanel");
  if (!overlay || !panel) return;

  if (open) {{
    overlay.classList.remove("opacity-0", "pointer-events-none");
    overlay.classList.add("opacity-100");
    panel.classList.remove("translate-x-full");
  }} else {{
    overlay.classList.add("opacity-0", "pointer-events-none");
    overlay.classList.remove("opacity-100");
    panel.classList.add("translate-x-full");
    drawerState = {{ open: false, kind: null, id: null, projectId: null, domainId: null, extra: {{}} }};
  }}
}}

function closeDrawer() {{ setDrawerOpen(false); }}
function setDrawerStatus(msg) {{ const el = qs("#drawerStatus"); if (el) el.textContent = msg || ""; }}

async function safeUpdate(table, id, patch) {{
  setDrawerStatus("저장 중...");
  const {{ error }} = await supabase.from(table).update(patch).eq("id", id);
  if (error) {{ setDrawerStatus(`저장 실패: ${{error.message}}`); return false; }}
  setDrawerStatus("저장됨");
  return true;
}}

function bindSave(selector, fn) {{
  const el = qs(selector);
  if (!el) return;
  const handler = async () => {{
    try {{ await fn(el); }} catch (e) {{ setDrawerStatus(String(e?.message || e)); }}
  }};
  el.addEventListener("change", handler);
  el.addEventListener("blur", handler);
}}

async function openDrawer(kind, {{ id, projectId, domainId, ...extra }}) {{
  drawerState = {{ open: true, kind, id, projectId, domainId, extra }};
  setDrawerOpen(true);
  await renderDrawer();
}}

/** =========================
 *  Domain (big category) state
 *  ========================= */
const DOMAIN_KEY = "planner_domain_id";
function getSavedDomainId() {{ return localStorage.getItem(DOMAIN_KEY) || null; }}
function saveDomainId(id) {{ localStorage.setItem(DOMAIN_KEY, id); }}

/** =========================
 *  Project & Membership (best-effort)
 *  ========================= */
async function ensureProject() {{
  const {{ data, error }} = await supabase
    .from("projects")
    .select("id")
    .order("created_at", {{ ascending: true }})
    .limit(1)
    .maybeSingle();

  if (!error && data?.id) return data.id;

  const ins = await supabase.from("projects").insert({{ name: "Project" }}).select("id").single();
  if (ins.error) throw ins.error;
  return ins.data.id;
}}

async function ensureMember(projectId, userId) {{
  try {{
    await supabase.from("project_members").upsert({{
      project_id: projectId,
      user_id: userId,
      role: "owner",
    }});
  }} catch (_) {{
    // ignore if schema differs
  }}
}}

/** =========================
 *  Domains + Templates
 *  ========================= */
async function ensureDomains(projectId) {{
  const {{ data, error }} = await supabase
    .from("domains")
    .select("id,title,sort_order")
    .eq("project_id", projectId)
    .order("sort_order");
  if (!error && data?.length) return data;

  const defaults = ["예식", "집", "혼수", "기타"];
  const ins = await supabase.from("domains").insert(
    defaults.map((t, i) => ({{ project_id: projectId, title: t, sort_order: i }}))
  ).select("id,title,sort_order");

  if (ins.error) throw ins.error;
  return ins.data || [];
}}

async function ensureChecklistTemplate(projectId, domainId) {{
  const {{ data }} = await supabase
    .from("checklist_sections")
    .select("id")
    .eq("project_id", projectId)
    .eq("domain_id", domainId)
    .limit(1);
  if (data && data.length > 0) return;

  const defaults = ["준비", "진행 중", "완료"];
  await supabase.from("checklist_sections").insert(
    defaults.map((t, i) => ({{ project_id: projectId, domain_id: domainId, title: t, sort_order: i }}))
  );
}}

async function ensureBudgetTemplate(projectId, domainId) {{
  const {{ data }} = await supabase
    .from("budget_categories")
    .select("id")
    .eq("project_id", projectId)
    .eq("domain_id", domainId)
    .limit(1);
  if (data && data.length > 0) return;

  const domain = await supabase.from("domains").select("title").eq("id", domainId).single();
  const title = domain.data?.title || "기타";

  const map = {{
    "예식": ["예식장", "스드메", "스냅/영상", "플라워", "청첩장", "기타"],
    "집": ["전세/월세", "이사", "가전", "수리/인테리어", "기타"],
    "혼수": ["가구", "침구", "주방", "가전", "기타"],
    "기타": ["기타"],
  }};
  const defaults = map[title] || ["기타"];

  await supabase.from("budget_categories").insert(
    defaults.map((t, i) => ({{ project_id: projectId, domain_id: domainId, title: t, sort_order: i }}))
  );
}}

/** =========================
 *  Layout
 *  ========================= */
function layoutShell(userEmail) {{
  app.innerHTML = `
  <div class="${{UI.pageWrap}}">
    <div class="${{UI.shell}}">
      <aside class="${{UI.card}}">
        <div class="${{UI.cardInner}}">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/70 border border-white/80 text-twilight">
                  ${{icon("overview", 18)}}
                </span>
                <div class="${{UI.title}}">Planner</div>
              </div>
              <div class="${{UI.sub}} mt-1 truncate">${{escapeHtml(userEmail)}}</div>
            </div>
            <span class="${{UI.pillSpring}}">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              온라인
            </span>
          </div>

          <nav class="mt-5 space-y-2" id="nav">
            <a class="${{UI.navLink}}" data-route="/overview" href="#/overview">${{iconCircle("overview")}}개요</a>
            <a class="${{UI.navLink}}" data-route="/timeline" href="#/timeline">${{iconCircle("schedule")}}행사일정</a>
            <a class="${{UI.navLink}}" data-route="/checklist" href="#/checklist">${{iconCircle("checklist")}}체크리스트</a>
            <a class="${{UI.navLink}}" data-route="/budget" href="#/budget">${{iconCircle("budget")}}예산</a>
            <a class="${{UI.navLink}}" data-route="/vendors" href="#/vendors">${{iconCircle("vendors")}}업체</a>
            <a class="${{UI.navLink}}" data-route="/ceremony" href="#/ceremony">${{iconCircle("ceremony")}}예식</a>
            <a class="${{UI.navLink}}" data-route="/notes" href="#/notes">${{iconCircle("notes")}}메모</a>
          </nav>

          <div class="mt-6 flex items-center justify-between">
            <button id="logout" class="${{UI.btn}}">로그아웃</button>
            <span class="${{UI.tiny}}">Auto-save</span>
          </div>
        </div>
      </aside>

      <main class="${{UI.card}}">
        <div class="${{UI.cardInner}}">
          <div id="page"></div>
        </div>
      </main>

      <!-- Drawer -->
      <div id="drawerOverlay" class="fixed inset-0 bg-black/25 opacity-0 pointer-events-none transition"></div>
      <aside id="drawerPanel"
        class="fixed right-0 top-0 h-full w-full md:w-[460px]
               translate-x-full transition-transform duration-200
               ${{UI.card}} rounded-none md:rounded-l-[26px]
               border-l border-white/70">
        <div class="p-5 sm:p-6 h-full flex flex-col">
          <div class="flex items-center justify-between gap-3">
            <div class="${{UI.h2}}" id="drawerTitle">상세</div>
            <button id="drawerClose" class="${{UI.btnSm}}">닫기</button>
          </div>
          <div class="mt-4 flex-1 overflow-auto" id="drawerContent"></div>
          <div class="mt-3 ${{UI.tiny}}" id="drawerStatus"></div>
        </div>
      </aside>

      <!-- Confirm Modal -->
      <div id="confirmOverlay" class="fixed inset-0 bg-black/30 opacity-0 pointer-events-none transition"></div>
      <div class="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
        <div id="confirmPanel"
             class="${{UI.card}} w-full max-w-sm p-5 sm:p-6 pointer-events-auto
                    opacity-0 scale-95 transition">
          <div class="flex items-start gap-3">
            <span class="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/70 border border-white/80 text-twilight">
              ${{icon("trash", 18)}}
            </span>
            <div class="min-w-0">
              <div class="${{UI.h2}}" id="confirmTitle">확인</div>
              <div class="${{UI.sub}} mt-1" id="confirmDesc"></div>
            </div>
          </div>
          <div class="mt-5 flex items-center justify-end gap-2">
            <button id="confirmCancel" class="${{UI.btn}}">취소</button>
            <button id="confirmOk" class="${{UI.btnDanger}}">삭제</button>
          </div>
        </div>
      </div>

      <!-- Toast -->
      <div id="toast"
           class="fixed left-1/2 -translate-x-1/2 bottom-6 px-4 py-2 rounded-full
                  bg-white/80 border border-white/80 shadow-[0_14px_40px_rgba(0,0,0,0.12)]
                  text-[12px] text-ink opacity-0 pointer-events-none transition">
        -
      </div>
    </div>
  </div>`;

  // Active nav
  const r = (location.hash || "#/overview").replace("#", "");
  qsa("#nav a[data-route]").forEach((a) => {{
    if (a.getAttribute("data-route") === r) a.classList.add(...UI.navLinkActive.split(" "));
  }});

  // handlers
  qs("#logout").onclick = async () => {{ await supabase.auth.signOut(); render(); }};
  qs("#drawerOverlay").onclick = closeDrawer;
  qs("#drawerClose").onclick = closeDrawer;

  qs("#confirmCancel").onclick = () => closeConfirm(false);
  qs("#confirmOk").onclick = () => closeConfirm(true);
  qs("#confirmOverlay").onclick = () => closeConfirm(false);

  // ESC closes confirm or drawer
  if (!window.__escBound) {{
    window.__escBound = true;
    window.addEventListener("keydown", (e) => {{
      if (e.key !== "Escape") return;
      const confirmOpen = !qs("#confirmOverlay").classList.contains("pointer-events-none");
      if (confirmOpen) return closeConfirm(false);
      closeDrawer();
    }});
  }}
}}

/** =========================
 *  Login
 *  ========================= */
function loginView() {{
  app.innerHTML = `
  <div class="${{UI.pageWrap}}">
    <div class="${{UI.card}} w-full max-w-sm">
      <div class="${{UI.cardInner}} space-y-4">
        <div class="flex items-center gap-3">
          <span class="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/70 border border-white/80 text-twilight">
            ${{icon("user", 18)}}
          </span>
          <div>
            <div class="${{UI.h1}}">로그인</div>
            <div class="${{UI.sub}} mt-1">매직 링크로 접속</div>
          </div>
        </div>

        <input id="email" class="${{UI.input}}" placeholder="email@example.com" />
        <button id="send" class="${{UI.btnPrimary2}} w-full">매직 링크 보내기</button>

        <p id="msg" class="${{UI.sub}}"></p>
      </div>
    </div>
  </div>`;

  qs("#send").onclick = async () => {{
    const email = qs("#email").value.trim();
    if (!email) return;
    const {{ error }} = await supabase.auth.signInWithOtp({{
      email,
      options: {{ emailRedirectTo: location.origin + location.pathname + "#/overview" }},
    }});
    qs("#msg").textContent = error ? error.message : "메일함에서 링크를 눌러줘.";
  }};
}}

/** =========================
 *  Shared: Domain tabs
 *  ========================= */
function domainTabs(domains, selectedId) {{
  return `
    <div class="flex flex-wrap gap-2 items-center" id="domainTabs">
      ${(domains || []).map(d => `
        <button data-domain="${{d.id}}"
          class="${{UI.pill}} ${{d.id === selectedId ? "bg-spring border-white/80" : ""}}">
          ${{escapeHtml(d.title)}}
        </button>
      `).join("")}
      <button id="manageDomains" class="${{UI.btnSm}}">${{icon("tag", 16)}} 대분류</button>
    </div>
  `;
}}

async function bindDomainTabs(onChange) {{
  qsa("#domainTabs button[data-domain]").forEach(btn => {{
    btn.onclick = () => onChange(btn.dataset.domain);
  }});
  const manage = qs("#manageDomains");
  if (manage) manage.onclick = () => openDrawer("domains_manage", {{ projectId: window.__projectId }});
}}

/** =========================
 *  Overview
 *  ========================= */
async function overviewPage(projectId, domains, selectedDomainId) {{
  const page = qs("#page");
  page.innerHTML = `
    <header class="flex items-start justify-between gap-3">
      <div class="flex items-center gap-3">
        <span class="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/70 border border-white/80 text-twilight">
          ${{icon("overview", 18)}}
        </span>
        <div>
          <div class="${{UI.h1}}">개요</div>
          <div class="${{UI.sub}} mt-1">대분류별 진행상황을 한눈에</div>
        </div>
      </div>
    </header>

    <div class="mt-4">
      ${{domainTabs(domains, selectedDomainId)}}
    </div>

    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3" id="overviewCards"></div>
  `;

  await bindDomainTabs(async (id) => {{ saveDomainId(id); render(); }});

  const dId = selectedDomainId;
  const [ckItems, bdItems, vd, notes] = await Promise.all([
    supabase.from("checklist_items").select("id,is_done").eq("project_id", projectId).eq("domain_id", dId),
    supabase.from("budget_items").select("id,estimate,actual,paid,deposit").eq("project_id", projectId).eq("domain_id", dId),
    supabase.from("vendors").select("id").eq("project_id", projectId).eq("domain_id", dId),
    supabase.from("notes").select("id,is_pinned").eq("project_id", projectId).eq("domain_id", dId),
  ]);

  const totalCk = (ckItems.data || []).length;
  const doneCk = (ckItems.data || []).filter(x => x.is_done).length;
  const pct = totalCk ? Math.round((doneCk / totalCk) * 100) : 0;

  const totals = (bdItems.data || []).reduce((acc, it) => {{
    acc.estimate += n(it.estimate);
    acc.actual += n(it.actual);
    acc.paid += n(it.paid);
    acc.deposit += n(it.deposit);
    return acc;
  }}, {{ estimate: 0, actual: 0, paid: 0, deposit: 0 }});

  const unpaid = Math.max(0, totals.actual - totals.paid);
  const pinned = (notes.data || []).filter(x => x.is_pinned).length;

  qs("#overviewCards").innerHTML = `
    <div class="${{UI.bubble}}">
      <div class="${{UI.bubbleOverlay}}"></div>
      <div class="relative">
        <div class="flex items-center justify-between">
          <div class="${{UI.h2}}">체크리스트</div>
          <button class="${{UI.btnSm}}" id="goChecklist">${{icon("chevron", 16)}} 이동</button>
        </div>
        <div class="mt-3 flex items-center gap-2 flex-wrap">
          <span class="${{UI.pillSpring}}">완료 ${{doneCk}}/${{totalCk}}</span>
          <span class="${{UI.pill}}">진행률 ${{pct}}%</span>
        </div>
        <div class="mt-3 h-2 rounded-full bg-white/70 border border-white/80 overflow-hidden">
          <div class="h-full bg-twilight/80" style="width:${{pct}}%;"></div>
        </div>
      </div>
    </div>

    <div class="${{UI.bubble}}">
      <div class="${{UI.bubbleOverlay}}"></div>
      <div class="relative">
        <div class="flex items-center justify-between">
          <div class="${{UI.h2}}">예산</div>
          <button class="${{UI.btnSm}}" id="goBudget">${{icon("chevron", 16)}} 이동</button>
        </div>
        <div class="mt-3 grid grid-cols-2 gap-2">
          <span class="${{UI.pill}}">예상 ${{moneyFmt(totals.estimate)}}원</span>
          <span class="${{UI.pill}}">실제 ${{moneyFmt(totals.actual)}}원</span>
          <span class="${{UI.pill}}">지불 ${{moneyFmt(totals.paid)}}원</span>
          <span class="${{UI.pillSpring}}">잔액 ${{moneyFmt(unpaid)}}원</span>
        </div>
        <div class="mt-2 flex flex-wrap gap-2">
          <span class="${{UI.pill}}">보증금/계약금 합 ${{moneyFmt(totals.deposit)}}원</span>
        </div>
      </div>
    </div>

    <div class="${{UI.bubble}}">
      <div class="${{UI.bubbleOverlay}}"></div>
      <div class="relative">
        <div class="flex items-center justify-between">
          <div class="${{UI.h2}}">업체</div>
          <button class="${{UI.btnSm}}" id="goVendors">${{icon("chevron", 16)}} 이동</button>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span class="${{UI.pill}}">등록 ${{(vd.data || []).length}}개</span>
        </div>
      </div>
    </div>

    <div class="${{UI.bubble}}">
      <div class="${{UI.bubbleOverlay}}"></div>
      <div class="relative">
        <div class="flex items-center justify-between">
          <div class="${{UI.h2}}">메모</div>
          <button class="${{UI.btnSm}}" id="goNotes">${{icon("chevron", 16)}} 이동</button>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span class="${{UI.pill}}">전체 ${{(notes.data || []).length}}개</span>
          <span class="${{UI.pillSpring}}">고정 ${{pinned}}개</span>
        </div>
      </div>
    </div>
  `;

  qs("#goChecklist").onclick = () => (location.hash = "#/checklist");
  qs("#goBudget").onclick = () => (location.hash = "#/budget");
  qs("#goVendors").onclick = () => (location.hash = "#/vendors");
  qs("#goNotes").onclick = () => (location.hash = "#/notes");
}}

/** =========================
 *  Timeline
 *  ========================= */
async function ensureDefaultDay(projectId, domainId) {{
  const {{ data }} = await supabase
    .from("timeline_days")
    .select("id")
    .eq("project_id", projectId)
    .eq("domain_id", domainId)
    .order("sort_order", {{ ascending: true }})
    .limit(1);

  if (data?.[0]?.id) return data[0].id;

  const ins = await supabase
    .from("timeline_days")
    .insert({{ project_id: projectId, domain_id: domainId, title: "Day 1", sort_order: 0 }})
    .select("id")
    .single();

  return ins.data?.id;
}}

async function timelinePage(projectId, domains, selectedDomainId) {{
  const page = qs("#page");
  page.innerHTML = `
    <header class="flex items-start justify-between gap-3">
      <div class="flex items-center gap-3">
        <span class="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/70 border border-white/80 text-twilight">
          ${{icon("schedule", 18)}}
        </span>
        <div>
          <div class="${{UI.h1}}">행사일정</div>
          <div class="${{UI.sub}} mt-1">카드 클릭 → 오른쪽에서 편집</div>
        </div>
      </div>
      <button id="addEvent" class="${{UI.btnPrimary2}}">${{icon("plus", 16)}} 추가</button>
    </header>

    <div class="mt-4">
      ${{domainTabs(domains, selectedDomainId)}}
    </div>

    <div class="mt-4 flex flex-wrap gap-2" id="dayTabs"></div>
    <div class="mt-4 space-y-3" id="events"></div>
  `;

  await bindDomainTabs(async (id) => {{ saveDomainId(id); render(); }});

  const domainId = selectedDomainId;

  let {{ data: days }} = await supabase
    .from("timeline_days")
    .select("id,title,sort_order")
    .eq("project_id", projectId)
    .eq("domain_id", domainId)
    .order("sort_order");
  days = days || [];
  if (!days.length) {{
    const dayId = await ensureDefaultDay(projectId, domainId);
    const res = await supabase.from("timeline_days").select("id,title,sort_order").eq("id", dayId).single();
    if (res.data) days = [res.data];
  }}

  let selectedDayId = days[0]?.id;

  function renderTabs() {{
    const box = qs("#dayTabs");
    box.innerHTML = (days || []).map(d => `
      <button data-day="${{d.id}}" class="${{UI.pill}} ${{d.id===selectedDayId ? "bg-spring" : ""}}">
        ${{escapeHtml(d.title)}}
      </button>
    `).join("") + `
      <button id="addDay" class="${{UI.btnSm}}">${{icon("plus", 16)}} Day</button>
    `;

    qsa("#dayTabs button[data-day]").forEach(btn => {{
      btn.onclick = () => {{ selectedDayId = btn.dataset.day; load(); }};
    }});

    qs("#addDay").onclick = async () => {{
      const name = prompt("Day 이름", `Day ${{days.length + 1}}`);
      if (!name) return;
      const ins = await supabase.from("timeline_days").insert({{
        project_id: projectId,
        domain_id: domainId,
        title: name,
        sort_order: days.length,
      }}).select("id,title,sort_order").single();

      if (ins.error) return toast(ins.error.message);
      days.push(ins.data);
      selectedDayId = ins.data.id;
      renderTabs();
      load();
    }};
  }}

  async function load() {{
    const {{ data, error }} = await supabase
      .from("timeline_events")
      .select("id,start_time,duration_min,title,location,is_highlighted,sort_order")
      .eq("project_id", projectId)
      .eq("domain_id", domainId)
      .eq("day_id", selectedDayId)
      .order("sort_order", {{ ascending: true }});

    if (error) {{
      qs("#events").innerHTML = `<div class="text-sm text-rose-700">${{escapeHtml(error.message)}}</div>`;
      return;
    }}

    qs("#events").innerHTML = (data ?? []).map(e => `
      <button data-id="${{e.id}}" class="${{UI.bubble}}">
        <div class="${{UI.bubbleOverlay}}"></div>
        <div class="relative flex items-start justify-between gap-3">
          <div class="flex items-start gap-3 min-w-0">
            <span class="w-11 h-11 rounded-2xl flex items-center justify-center bg-white/70 border border-white/80 text-twilight">
              ${{icon("clock", 18)}}
            </span>
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="${{UI.pillBlue}}">${{escapeHtml(String(e.start_time||"").slice(0,5) || "시간")}}</span>
                <span class="${{UI.pill}}">${{e.duration_min || 0}}m</span>
                ${{e.is_highlighted ? `<span class="${{UI.pillSpring}}">중요</span>` : ""}}
              </div>
              <div class="mt-2 text-[14px] font-semibold text-ink truncate">${{escapeHtml(e.title || "")}}</div>
              ${{e.location ? `<div class="${{UI.sub}} mt-1 truncate">${{escapeHtml(e.location)}}</div>` : ""}}
            </div>
          </div>
          <span class="${{UI.tiny}} mt-1">열기</span>
        </div>
      </button>
    `).join("") || `
      <div class="${{UI.bubble}}">
        <div class="${{UI.bubbleOverlay}}"></div>
        <div class="relative ${{UI.sub}}">아직 일정이 없어. 오른쪽 위에서 추가해줘.</div>
      </div>
    `;

    qsa("#events button[data-id]").forEach(btn => {{
      btn.onclick = () => openDrawer("timeline_event", {{ id: btn.dataset.id, projectId, domainId }});
    }});
  }}

  qs("#addEvent").onclick = async () => {{
    const {{ data: last }} = await supabase
      .from("timeline_events")
      .select("sort_order")
      .eq("project_id", projectId)
      .eq("domain_id", domainId)
      .eq("day_id", selectedDayId)
      .order("sort_order", {{ ascending: false }})
      .limit(1);

    const nextOrder = (last?.[0]?.sort_order ?? 0) + 1;

    const ins = await supabase.from("timeline_events").insert({{
      project_id: projectId,
      domain_id: domainId,
      day_id: selectedDayId,
      sort_order: nextOrder,
      start_time: "18:00:00",
      duration_min: 30,
      title: "새 일정",
    }}).select("id").single();

    if (ins.error || !ins.data?.id) return toast(ins.error?.message || "추가 실패");
    openDrawer("timeline_event", {{ id: ins.data.id, projectId, domainId }});
  }};

  const ch = supabase.channel("timeline_ui")
    .on("postgres_changes", {{ event: "*", schema: "public", table: "timeline_events", filter: `project_id=eq.${{projectId}}` }}, load)
    .on("postgres_changes", {{ event: "*", schema: "public", table: "timeline_days", filter: `project_id=eq.${{projectId}}` }}, async () => {{
      const res = await supabase.from("timeline_days").select("id,title,sort_order")
        .eq("project_id", projectId).eq("domain_id", domainId).order("sort_order");
      days = res.data || [];
      if (!days.find(d => d.id === selectedDayId)) selectedDayId = days[0]?.id;
      renderTabs();
      load();
    }})
    .subscribe();

  window.__cleanup?.();
  window.__cleanup = () => supabase.removeChannel(ch);

  renderTabs();
  load();
}}

/** =========================
 *  Checklist
 *  ========================= */
async function checklistPage(projectId, domains, selectedDomainId) {{
  const page = qs("#page");
  page.innerHTML = `
    <header class="flex items-start justify-between gap-3">
      <div class="flex items-center gap-3">
        <span class="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/70 border border-white/80 text-twilight">
          ${{icon("checklist", 18)}}
        </span>
        <div>
          <div class="${{UI.h1}}">체크리스트</div>
          <div class="${{UI.sub}} mt-1">체크는 바로, 편집은 항목 클릭</div>
        </div>
      </div>
      <button id="addItem" class="${{UI.btnPrimary2}}">${{icon("plus", 16)}} 추가</button>
    </header>

    <div class="mt-4">
      ${{domainTabs(domains, selectedDomainId)}}
    </div>

    <div class="mt-4 space-y-4" id="sections"></div>
  `;

  await bindDomainTabs(async (id) => {{ saveDomainId(id); render(); }});

  const domainId = selectedDomainId;

  async function load() {{
    await ensureChecklistTemplate(projectId, domainId);

    const {{ data: sections, error: se }} = await supabase
      .from("checklist_sections")
      .select("id,title,sort_order")
      .eq("project_id", projectId)
      .eq("domain_id", domainId)
      .order("sort_order");

    if (se) {{
      qs("#sections").innerHTML = `<div class="text-sm text-rose-700">${{escapeHtml(se.message)}}</div>`;
      return;
    }}

    const {{ data: items, error: ie }} = await supabase
      .from("checklist_items")
      .select("id,section_id,title,is_done,sort_order,due_date")
      .eq("project_id", projectId)
      .eq("domain_id", domainId)
      .order("sort_order");

    if (ie) {{
      qs("#sections").innerHTML = `<div class="text-sm text-rose-700">${{escapeHtml(ie.message)}}</div>`;
      return;
    }}

    const bySection = new Map();
    (items || []).forEach(it => {{
      if (!bySection.has(it.section_id)) bySection.set(it.section_id, []);
      bySection.get(it.section_id).push(it);
    }});

    qs("#sections").innerHTML = (sections || []).map(s => {{
      const list = bySection.get(s.id) || [];
      const done = list.filter(x => x.is_done).length;
      const total = list.length;
      const pct = total ? Math.round((done / total) * 100) : 0;

      return `
        <div class="${{UI.bubble}}">
          <div class="${{UI.bubbleOverlay}}"></div>
          <div class="relative">
            <div class="flex items-center justify-between gap-3">
              <div class="min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <div class="text-[13px] font-semibold text-ink">${{escapeHtml(s.title)}}</div>
                  <span class="${{UI.pillSpring}}">${{done}}/${{total}}</span>
                  <span class="${{UI.pill}}">${{pct}}%</span>
                </div>
                <div class="mt-2 h-2 rounded-full bg-white/70 border border-white/80 overflow-hidden">
                  <div class="h-full bg-twilight/80" style="width:${{pct}}%;"></div>
                </div>
              </div>
              <button class="${{UI.btnSm}}" data-add="${{s.id}}">${{icon("plus", 16)}} 이 섹션</button>
            </div>

            <div class="mt-4 space-y-2">
              ${{total === 0 ? `<div class="${{UI.sub}}">할 일이 없어.</div>` :
                list.map(it => `
                  <div class="rounded-[18px] bg-white/60 border border-white/80 hover:bg-white/80 transition p-3"
                       data-open="${{it.id}}">
                    <div class="flex items-center justify-between gap-3">
                      <label class="flex items-center gap-3 flex-1 cursor-pointer">
                        <input type="checkbox" data-toggle="${{it.id}}" ${{it.is_done ? "checked" : ""}} />
                        <div class="min-w-0">
                          <div class="text-[12.5px] font-medium text-ink ${{it.is_done ? "line-through opacity-60" : ""}}">
                            ${{escapeHtml(it.title)}}
                          </div>
                          <div class="${{UI.tiny}} mt-1">${{it.due_date ? `마감 ${{escapeHtml(it.due_date)}}` : "클릭해서 편집"}}</div>
                        </div>
                      </label>
                      <span class="${{UI.tiny}}">${{icon("chevron", 16)}}</span>
                    </div>
                  </div>
                `).join("")
              }}
            </div>
          </div>
        </div>
      `;
    }}).join("");

    // add
    qsa("#sections button[data-add]").forEach(btn => {{
      btn.onclick = async () => {{
        const sectionId = btn.dataset.add;
        const ins = await supabase.from("checklist_items").insert({{
          project_id: projectId,
          domain_id: domainId,
          section_id: sectionId,
          title: "새 할 일",
          sort_order: Date.now(),
        }}).select("id").single();

        if (ins.error || !ins.data?.id) return toast(ins.error?.message || "추가 실패");
        openDrawer("checklist_item", {{ id: ins.data.id, projectId, domainId }});
      }};
    }});

    // toggle
    qsa("#sections input[data-toggle]").forEach(cb => {{
      cb.onclick = (e) => e.stopPropagation();
      cb.onchange = async () => {{
        const id = cb.dataset.toggle;
        await supabase.from("checklist_items").update({{ is_done: cb.checked }}).eq("id", id);
      }};
    }});

    // open
    qsa("#sections [data-open]").forEach(row => {{
      row.onclick = () => openDrawer("checklist_item", {{ id: row.dataset.open, projectId, domainId }});
    }});
  }}

  qs("#addItem").onclick = async () => {{
    const {{ data: sec }} = await supabase
      .from("checklist_sections")
      .select("id")
      .eq("project_id", projectId)
      .eq("domain_id", domainId)
      .order("sort_order")
      .limit(1);

    const sectionId = sec?.[0]?.id;
    if (!sectionId) return toast("섹션이 없어.");

    const ins = await supabase.from("checklist_items").insert({{
      project_id: projectId,
      domain_id: domainId,
      section_id: sectionId,
      title: "새 할 일",
      sort_order: Date.now(),
    }}).select("id").single();

    if (ins.error || !ins.data?.id) return toast(ins.error?.message || "추가 실패");
    openDrawer("checklist_item", {{ id: ins.data.id, projectId, domainId }});
  }};

  const ch = supabase.channel("checklist_ui")
    .on("postgres_changes", {{ event: "*", schema: "public", table: "checklist_sections", filter: `project_id=eq.${{projectId}}` }}, load)
    .on("postgres_changes", {{ event: "*", schema: "public", table: "checklist_items", filter: `project_id=eq.${{projectId}}` }}, load)
    .subscribe();

  window.__cleanup?.();
  window.__cleanup = () => supabase.removeChannel(ch);

  load();
}}

/** =========================
 *  Budget (enhanced + category manage)
 *  ========================= */
async function budgetPage(projectId, domains, selectedDomainId) {{
  const page = qs("#page");
  page.innerHTML = `
    <header class="flex items-start justify-between gap-3">
      <div class="flex items-center gap-3">
        <span class="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/70 border border-white/80 text-twilight">
          ${{icon("budget", 18)}}
        </span>
        <div>
          <div class="${{UI.h1}}">예산</div>
          <div class="${{UI.sub}} mt-1">항목 클릭 → 오른쪽에서 상세 편집</div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button id="manageCats" class="${{UI.btn}}">${{icon("tag", 16)}} 카테고리</button>
        <button id="addBudget" class="${{UI.btnPrimary2}}">${{icon("plus", 16)}} 항목</button>
      </div>
    </header>

    <div class="mt-4">
      ${{domainTabs(domains, selectedDomainId)}}
    </div>

    <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3" id="summary"></div>
    <div class="mt-4 space-y-4" id="cats"></div>
  `;

  await bindDomainTabs(async (id) => {{ saveDomainId(id); render(); }});
  const domainId = selectedDomainId;

  qs("#manageCats").onclick = () => openDrawer("budget_categories_manage", {{ projectId, domainId }});

  async function load() {{
    await ensureBudgetTemplate(projectId, domainId);

    const {{ data: cats, error: ce }} = await supabase
      .from("budget_categories")
      .select("id,title,sort_order")
      .eq("project_id", projectId)
      .eq("domain_id", domainId)
      .order("sort_order");

    if (ce) {{
      qs("#cats").innerHTML = `<div class="text-sm text-rose-700">${{escapeHtml(ce.message)}}</div>`;
      return;
    }}

    const {{ data: items, error: ie }} = await supabase
      .from("budget_items")
      .select("id,category_id,item_name,estimate,actual,paid,deposit,due_date,assignee,sort_order")
      .eq("project_id", projectId)
      .eq("domain_id", domainId)
      .order("sort_order");

    if (ie) {{
      qs("#cats").innerHTML = `<div class="text-sm text-rose-700">${{escapeHtml(ie.message)}}</div>`;
      return;
    }}

    const totals = (items || []).reduce((acc, it) => {{
      acc.estimate += n(it.estimate);
      acc.actual += n(it.actual);
      acc.paid += n(it.paid);
      acc.deposit += n(it.deposit);
      return acc;
    }}, {{ estimate: 0, actual: 0, paid: 0, deposit: 0 }});

    const unpaid = Math.max(0, totals.actual - totals.paid);

    qs("#summary").innerHTML = `
      <div class="${{UI.bubble}}"><div class="${{UI.bubbleOverlay}}"></div><div class="relative"><div class="${{UI.tiny}}">예상</div><div class="text-[14px] font-semibold text-ink mt-1">${{moneyFmt(totals.estimate)}}원</div></div></div>
      <div class="${{UI.bubble}}"><div class="${{UI.bubbleOverlay}}"></div><div class="relative"><div class="${{UI.tiny}}">실제</div><div class="text-[14px] font-semibold text-ink mt-1">${{moneyFmt(totals.actual)}}원</div></div></div>
      <div class="${{UI.bubble}}"><div class="${{UI.bubbleOverlay}}"></div><div class="relative"><div class="${{UI.tiny}}">지불</div><div class="text-[14px] font-semibold text-ink mt-1">${{moneyFmt(totals.paid)}}원</div></div></div>
      <div class="${{UI.bubble}}"><div class="${{UI.bubbleOverlay}}"></div><div class="relative"><div class="${{UI.tiny}}">잔액</div><div class="text-[14px] font-semibold text-ink mt-1">${{moneyFmt(unpaid)}}원</div></div></div>
      <div class="${{UI.bubble}}"><div class="${{UI.bubbleOverlay}}"></div><div class="relative"><div class="${{UI.tiny}}">보증금/계약금 합</div><div class="text-[14px] font-semibold text-ink mt-1">${{moneyFmt(totals.deposit)}}원</div></div></div>
    `;

    const byCat = new Map();
    (items || []).forEach(it => {{
      if (!byCat.has(it.category_id)) byCat.set(it.category_id, []);
      byCat.get(it.category_id).push(it);
    }});

    qs("#cats").innerHTML = (cats || []).map(c => {{
      const list = byCat.get(c.id) || [];
      const catTotal = list.reduce((a, it) => a + n(it.actual), 0);

      return `
        <div class="${{UI.bubble}}">
          <div class="${{UI.bubbleOverlay}}"></div>
          <div class="relative">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-2 min-w-0">
                <span class="w-9 h-9 rounded-2xl flex items-center justify-center bg-white/70 border border-white/80 text-twilight">
                  ${{icon("tag", 18)}}
                </span>
                <div class="min-w-0">
                  <div class="text-[13px] font-semibold text-ink truncate">${{escapeHtml(c.title)}}</div>
                  <div class="${{UI.tiny}} mt-0.5">합계 ${{moneyFmt(catTotal)}}원</div>
                </div>
              </div>
              <button class="${{UI.btnSm}}" data-add="${{c.id}}">${{icon("plus", 16)}} 추가</button>
            </div>

            <div class="mt-4 space-y-2">
              ${{list.length === 0 ? `<div class="${{UI.sub}}">항목이 없어.</div>` :
                list.map(it => {{
                  const remaining = Math.max(0, n(it.actual) - n(it.paid));
                  const progress = it.actual ? Math.min(100, Math.round((n(it.paid) / Math.max(1, n(it.actual))) * 100)) : 0;
                  return `
                    <button data-open="${{it.id}}"
                      class="w-full text-left rounded-[18px] bg-white/60 border border-white/80 hover:bg-white/80 transition p-3">
                      <div class="flex items-start justify-between gap-3">
                        <div class="min-w-0">
                          <div class="flex items-center gap-2 flex-wrap">
                            <div class="text-[12.5px] font-semibold text-ink truncate">${{escapeHtml(it.item_name || "")}}</div>
                            ${{it.assignee ? `<span class="${{UI.pill}}">${{escapeHtml(it.assignee)}}</span>` : ""}}
                            ${{it.due_date ? `<span class="${{UI.pillSpring}}">마감 ${{escapeHtml(it.due_date)}}</span>` : ""}}
                            ${{n(it.deposit) ? `<span class="${{UI.pill}}">보증금 ${{moneyFmt(it.deposit)}}원</span>` : ""}}
                          </div>

                          <div class="mt-2 grid grid-cols-4 gap-2">
                            <span class="${{UI.pill}}">예상 ${{moneyFmt(it.estimate)}}원</span>
                            <span class="${{UI.pill}}">실제 ${{moneyFmt(it.actual)}}원</span>
                            <span class="${{UI.pill}}">지불 ${{moneyFmt(it.paid)}}원</span>
                            <span class="${{UI.pillSpring}}">잔액 ${{moneyFmt(remaining)}}원</span>
                          </div>

                          <div class="mt-3 h-2 rounded-full bg-white/70 border border-white/80 overflow-hidden">
                            <div class="h-full bg-twilight/80" style="width:${{progress}}%;"></div>
                          </div>
                        </div>
                        <span class="${{UI.tiny}} mt-1">${{icon("chevron", 16)}}</span>
                      </div>
                    </button>
                  `;
                }}).join("")
              }}
            </div>
          </div>
        </div>
      `;
    }}).join("");

    // add item
    qsa("#cats button[data-add]").forEach(btn => {{
      btn.onclick = async () => {{
        const categoryId = btn.dataset.add;
        const ins = await supabase.from("budget_items").insert({{
          project_id: projectId,
          domain_id: domainId,
          category_id: categoryId,
          item_name: "새 예산 항목",
          estimate: 0,
          actual: 0,
          paid: 0,
          deposit: 0,
          due_date: null,
          assignee: null,
          sort_order: Date.now(),
        }}).select("id").single();

        if (ins.error || !ins.data?.id) return toast(ins.error?.message || "추가 실패");
        openDrawer("budget_item", {{ id: ins.data.id, projectId, domainId }});
      }};
    }});

    // open drawer
    qsa("#cats button[data-open]").forEach(btn => {{
      btn.onclick = () => openDrawer("budget_item", {{ id: btn.dataset.open, projectId, domainId }});
    }});
  }}

  qs("#addBudget").onclick = async () => {{
    const {{ data: cats }} = await supabase
      .from("budget_categories")
      .select("id")
      .eq("project_id", projectId)
      .eq("domain_id", domainId)
      .order("sort_order")
      .limit(1);

    const categoryId = cats?.[0]?.id;
    if (!categoryId) return toast("카테고리가 없어.");

    const ins = await supabase.from("budget_items").insert({{
      project_id: projectId,
      domain_id: domainId,
      category_id: categoryId,
      item_name: "새 예산 항목",
      estimate: 0,
      actual: 0,
      paid: 0,
      deposit: 0,
      sort_order: Date.now(),
    }}).select("id").single();

    if (ins.error || !ins.data?.id) return toast(ins.error?.message || "추가 실패");
    openDrawer("budget_item", {{ id: ins.data.id, projectId, domainId }});
  }};

  const ch = supabase.channel("budget_ui")
    .on("postgres_changes", {{ event: "*", schema: "public", table: "budget_categories", filter: `project_id=eq.${{projectId}}` }}, load)
    .on("postgres_changes", {{ event: "*", schema: "public", table: "budget_items", filter: `project_id=eq.${{projectId}}` }}, load)
    .subscribe();

  window.__cleanup?.();
  window.__cleanup = () => supabase.removeChannel(ch);

  load();
}}

/** =========================
 *  Vendors
 *  ========================= */
async function vendorsPage(projectId, domains, selectedDomainId) {{
  const page = qs("#page");
  page.innerHTML = `
    <header class="flex items-start justify-between gap-3">
      <div class="flex items-center gap-3">
        <span class="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/70 border border-white/80 text-twilight">
          ${{icon("vendors", 18)}}
        </span>
        <div>
          <div class="${{UI.h1}}">업체</div>
          <div class="${{UI.sub}} mt-1">연락처/링크/상태 정리</div>
        </div>
      </div>
      <button id="addVendor" class="${{UI.btnPrimary2}}">${{icon("plus", 16)}} 추가</button>
    </header>

    <div class="mt-4">
      ${{domainTabs(domains, selectedDomainId)}}
    </div>

    <div class="mt-4 space-y-3" id="vendors"></div>
  `;

  await bindDomainTabs(async (id) => {{ saveDomainId(id); render(); }});
  const domainId = selectedDomainId;

  async function load() {{
    const {{ data, error }} = await supabase
      .from("vendors")
      .select("id,name,category,status,contact,url,estimate,sort_order")
      .eq("project_id", projectId)
      .eq("domain_id", domainId)
      .order("sort_order");

    if (error) {{
      qs("#vendors").innerHTML = `<div class="text-sm text-rose-700">${{escapeHtml(error.message)}}</div>`;
      return;
    }}

    qs("#vendors").innerHTML = (data || []).map(v => `
      <button class="${{UI.bubble}}" data-open="${{v.id}}">
        <div class="${{UI.bubbleOverlay}}"></div>
        <div class="relative flex items-start justify-between gap-3">
          <div class="flex items-start gap-3 min-w-0">
            <span class="w-11 h-11 rounded-2xl flex items-center justify-center bg-white/70 border border-white/80 text-twilight">
              ${{icon("vendors", 18)}}
            </span>
            <div class="min-w-0">
              <div class="text-[13px] font-semibold text-ink truncate">${{escapeHtml(v.name || "")}}</div>
              <div class="mt-2 flex flex-wrap gap-2">
                ${{v.category ? `<span class="${{UI.pill}}">${{escapeHtml(v.category)}}</span>` : ""}}
                ${{v.status ? `<span class="${{UI.pillSpring}}">${{escapeHtml(v.status)}}</span>` : ""}}
                ${{v.estimate != null ? `<span class="${{UI.pill}}">예상 ${{moneyFmt(v.estimate)}}원</span>` : ""}}
              </div>
              <div class="${{UI.tiny}} mt-2 truncate">
                ${{v.contact ? escapeHtml(v.contact) : ""}}
                ${{v.url ? ` · ${{escapeHtml(v.url)}}` : ""}}
              </div>
            </div>
          </div>
          <span class="${{UI.tiny}} mt-1">${{icon("chevron", 16)}}</span>
        </div>
      </button>
    `).join("") || `
      <div class="${{UI.bubble}}">
        <div class="${{UI.bubbleOverlay}}"></div>
        <div class="relative ${{UI.sub}}">아직 업체가 없어. 추가해줘.</div>
      </div>
    `;

    qsa("#vendors button[data-open]").forEach(btn => {{
      btn.onclick = () => openDrawer("vendor", {{ id: btn.dataset.open, projectId, domainId }});
    }});
  }}

  qs("#addVendor").onclick = async () => {{
    const ins = await supabase.from("vendors").insert({{
      project_id: projectId,
      domain_id: domainId,
      name: "새 업체",
      sort_order: Date.now(),
    }}).select("id").single();

    if (ins.error || !ins.data?.id) return toast(ins.error?.message || "추가 실패");
    openDrawer("vendor", {{ id: ins.data.id, projectId, domainId }});
  }};

  const ch = supabase.channel("vendors_ui")
    .on("postgres_changes", {{ event: "*", schema: "public", table: "vendors", filter: `project_id=eq.${{projectId}}` }}, load)
    .subscribe();

  window.__cleanup?.();
  window.__cleanup = () => supabase.removeChannel(ch);

  load();
}}

/** =========================
 *  Ceremony (profile, single)
 *  ========================= */
async function ceremonyPage(projectId) {{
  const page = qs("#page");
  page.innerHTML = `
    <header class="flex items-start justify-between gap-3">
      <div class="flex items-center gap-3">
        <span class="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/70 border border-white/80 text-twilight">
          ${{icon("ceremony", 18)}}
        </span>
        <div>
          <div class="${{UI.h1}}">예식</div>
          <div class="${{UI.sub}} mt-1">기본 정보 정리</div>
        </div>
      </div>
      <button id="editCeremony" class="${{UI.btnPrimary2}}">${{icon("chevron", 16)}} 편집</button>
    </header>

    <div class="mt-4" id="ceremonyCard"></div>
  `;

  async function ensureRow() {{
    const {{ data }} = await supabase.from("ceremony_profile").select("*").eq("project_id", projectId).maybeSingle();
    if (data?.id) return data;
    const ins = await supabase.from("ceremony_profile").insert({{ project_id: projectId, title: "예식" }}).select("*").single();
    if (ins.error) throw ins.error;
    return ins.data;
  }}

  async function load() {{
    const row = await ensureRow();
    const date = row.date ? String(row.date) : "날짜 미정";
    const time = row.start_time ? String(row.start_time).slice(0,5) : "시간 미정";
    const loc = row.location || "장소 미정";

    qs("#ceremonyCard").innerHTML = `
      <div class="${{UI.bubble}}">
        <div class="${{UI.bubbleOverlay}}"></div>
        <div class="relative">
          <div class="text-[14px] font-semibold text-ink">${{escapeHtml(row.title || "예식")}}</div>
          <div class="mt-3 flex flex-wrap gap-2">
            <span class="${{UI.pillBlue}}">${{escapeHtml(date)}}</span>
            <span class="${{UI.pill}}">${{escapeHtml(time)}}</span>
            <span class="${{UI.pillSpring}}">${{escapeHtml(loc)}}</span>
          </div>
          <div class="${{UI.tiny}} mt-3">
            ${{row.hall ? `홀: ${{escapeHtml(row.hall)}} · ` : ""}}
            ${{row.manager ? `담당: ${{escapeHtml(row.manager)}} · ` : ""}}
            ${{row.contact ? `연락처: ${{escapeHtml(row.contact)}}` : ""}}
          </div>
          ${{row.memo ? `<div class="${{UI.sub}} mt-3 whitespace-pre-wrap">${{escapeHtml(row.memo)}}</div>` : ""}}
        </div>
      </div>
    `;
  }}

  qs("#editCeremony").onclick = async () => {{
    const row = await supabase.from("ceremony_profile").select("id").eq("project_id", projectId).single();
    if (row.error) return toast(row.error.message);
    openDrawer("ceremony", {{ id: row.data.id, projectId }});
  }};

  const ch = supabase.channel("ceremony_ui")
    .on("postgres_changes", {{ event: "*", schema: "public", table: "ceremony_profile", filter: `project_id=eq.${{projectId}}` }}, load)
    .subscribe();

  window.__cleanup?.();
  window.__cleanup = () => supabase.removeChannel(ch);

  load();
}}

/** =========================
 *  Notes
 *  ========================= */
async function notesPage(projectId, domains, selectedDomainId) {{
  const page = qs("#page");
  page.innerHTML = `
    <header class="flex items-start justify-between gap-3">
      <div class="flex items-center gap-3">
        <span class="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/70 border border-white/80 text-twilight">
          ${{icon("notes", 18)}}
        </span>
        <div>
          <div class="${{UI.h1}}">메모</div>
          <div class="${{UI.sub}} mt-1">아이디어/링크/정리</div>
        </div>
      </div>
      <button id="addNote" class="${{UI.btnPrimary2}}">${{icon("plus", 16)}} 추가</button>
    </header>

    <div class="mt-4">
      ${{domainTabs(domains, selectedDomainId)}}
    </div>

    <div class="mt-4 flex items-center gap-2">
      <input id="noteSearch" class="${{UI.input}}" placeholder="검색..." />
      <button id="pinFilter" class="${{UI.btn}}">고정만</button>
    </div>

    <div class="mt-4 space-y-3" id="notes"></div>
  `;

  await bindDomainTabs(async (id) => {{ saveDomainId(id); render(); }});
  const domainId = selectedDomainId;

  let onlyPinned = false;

  qs("#pinFilter").onclick = () => {{ onlyPinned = !onlyPinned; load(); }};
  qs("#noteSearch").oninput = () => load();

  async function load() {{
    const q = (qs("#noteSearch")?.value || "").trim().toLowerCase();

    let query = supabase
      .from("notes")
      .select("id,title,body,is_pinned,created_at")
      .eq("project_id", projectId)
      .eq("domain_id", domainId)
      .order("is_pinned", {{ ascending: false }})
      .order("created_at", {{ ascending: false }});

    if (onlyPinned) query = query.eq("is_pinned", true);

    const {{ data, error }} = await query;

    if (error) {{
      qs("#notes").innerHTML = `<div class="text-sm text-rose-700">${{escapeHtml(error.message)}}</div>`;
      return;
    }}

    const filtered = (data || []).filter(n => {{
      if (!q) return true;
      return String(n.title || "").toLowerCase().includes(q) || String(n.body || "").toLowerCase().includes(q);
    }});

    qs("#notes").innerHTML = (filtered || []).map(nr => `
      <button class="${{UI.bubble}}" data-open="${{nr.id}}">
        <div class="${{UI.bubbleOverlay}}"></div>
        <div class="relative flex items-start justify-between gap-3">
          <div class="flex items-start gap-3 min-w-0">
            <span class="w-11 h-11 rounded-2xl flex items-center justify-center bg-white/70 border border-white/80 text-twilight">
              ${{icon("notes", 18)}}
            </span>
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <div class="text-[13px] font-semibold text-ink truncate">${{escapeHtml(nr.title || "메모")}}</div>
                ${{nr.is_pinned ? `<span class="${{UI.pillSpring}}">고정</span>` : ""}}
              </div>
              <div class="${{UI.sub}} mt-2 line-clamp-2">
                ${{escapeHtml(String(nr.body || "").slice(0, 120))}}
              </div>
            </div>
          </div>
          <span class="${{UI.tiny}} mt-1">${{icon("chevron", 16)}}</span>
        </div>
      </button>
    `).join("") || `
      <div class="${{UI.bubble}}">
        <div class="${{UI.bubbleOverlay}}"></div>
        <div class="relative ${{UI.sub}}">메모가 없어. 추가해줘.</div>
      </div>
    `;

    qsa("#notes button[data-open]").forEach(btn => {{
      btn.onclick = () => openDrawer("note", {{ id: btn.dataset.open, projectId, domainId }});
    }});
  }}

  qs("#addNote").onclick = async () => {{
    const ins = await supabase.from("notes").insert({{
      project_id: projectId,
      domain_id: domainId,
      title: "새 메모",
      body: "",
      is_pinned: false,
    }}).select("id").single();

    if (ins.error || !ins.data?.id) return toast(ins.error?.message || "추가 실패");
    openDrawer("note", {{ id: ins.data.id, projectId, domainId }});
  }};

  const ch = supabase.channel("notes_ui")
    .on("postgres_changes", {{ event: "*", schema: "public", table: "notes", filter: `project_id=eq.${{projectId}}` }}, load)
    .subscribe();

  window.__cleanup?.();
  window.__cleanup = () => supabase.removeChannel(ch);

  load();
}}

/** =========================
 *  Drawer renderer
 *  ========================= */
async function renderDrawer() {{
  const {{ kind, id, projectId, domainId }} = drawerState;
  const titleEl = qs("#drawerTitle");
  const contentEl = qs("#drawerContent");
  if (!titleEl || !contentEl) return;

  const header = (label, iconName) => `
    <div class="flex items-center gap-2">
      <span class="w-9 h-9 rounded-2xl flex items-center justify-center bg-white/70 border border-white/80 text-twilight">
        ${{icon(iconName, 18)}}
      </span>
      <span>${{escapeHtml(label)}}</span>
    </div>
  `;

  // ---- timeline_event ----
  if (kind === "timeline_event") {{
    titleEl.innerHTML = header("행사일정 편집", "schedule");

    const [evRes, daysRes] = await Promise.all([
      supabase.from("timeline_events").select("*").eq("id", id).single(),
      supabase.from("timeline_days").select("id,title,sort_order").eq("project_id", projectId).eq("domain_id", domainId).order("sort_order"),
    ]);
    if (evRes.error) {{
      contentEl.innerHTML = `<div class="text-sm text-rose-700">${{escapeHtml(evRes.error.message)}}</div>`;
      return;
    }}
    const ev = evRes.data;
    const days = daysRes.data || [];

    const timeVal = ev.start_time ? String(ev.start_time).slice(0,5) : "";
    contentEl.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <span class="${{UI.pillBlue}}">${{timeVal || "시간"}}</span>
          <span class="${{UI.pill}}">${{ev.duration_min || 0}}m</span>
          ${{ev.is_highlighted ? `<span class="${{UI.pillSpring}}">중요</span>` : ""}}
        </div>

        <div>
          <div class="${{UI.label}} mb-1">제목</div>
          <input id="ev_title" class="${{UI.input}}" value="${{escapeHtml(ev.title || "")}}" />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <div class="${{UI.label}} mb-1">시작시간</div>
            <input id="ev_time" type="time" class="${{UI.input}}" value="${{escapeHtml(timeVal)}}" />
          </div>
          <div>
            <div class="${{UI.label}} mb-1">소요(분)</div>
            <input id="ev_dur" type="number" class="${{UI.input}}" value="${{ev.duration_min ?? 30}}" min="0" />
          </div>
        </div>

        <div>
          <div class="${{UI.label}} mb-1">Day</div>
          <select id="ev_day" class="${{UI.input}}">
            ${(days || []).map(d => `<option value="${{d.id}}" ${{d.id===ev.day_id ? "selected":""}}>${{escapeHtml(d.title)}}</option>`).join("")}
          </select>
        </div>

        <div>
          <div class="${{UI.label}} mb-1">장소(선택)</div>
          <input id="ev_loc" class="${{UI.input}}" value="${{escapeHtml(ev.location || "")}}" />
        </div>

        <div>
          <div class="${{UI.label}} mb-1">메모(선택)</div>
          <textarea id="ev_notes" class="${{UI.textarea}}" rows="4">${{escapeHtml(ev.notes || "")}}</textarea>
        </div>

        <label class="flex items-center gap-2 text-[12px] text-ink">
          <input id="ev_hi" type="checkbox" ${{ev.is_highlighted ? "checked":""}} />
          중요 표시
        </label>

        <div class="flex items-center justify-between pt-2">
          <button id="ev_delete" class="${{UI.btnDanger}}">${{icon("trash", 16)}} 삭제</button>
          <button id="ev_close" class="${{UI.btnPrimary2}}">완료</button>
        </div>
      </div>
    `;

    bindSave("#ev_title", (el) => safeUpdate("timeline_events", id, {{ title: el.value }}));
    bindSave("#ev_time",  (el) => safeUpdate("timeline_events", id, {{ start_time: el.value ? `${{el.value}}:00` : null }}));
    bindSave("#ev_dur",   (el) => safeUpdate("timeline_events", id, {{ duration_min: Number(el.value || 0) }}));
    bindSave("#ev_day",   (el) => safeUpdate("timeline_events", id, {{ day_id: el.value }}));
    bindSave("#ev_loc",   (el) => safeUpdate("timeline_events", id, {{ location: el.value || null }}));
    bindSave("#ev_notes", (el) => safeUpdate("timeline_events", id, {{ notes: el.value || null }}));
    bindSave("#ev_hi",    (el) => safeUpdate("timeline_events", id, {{ is_highlighted: el.checked }}));

    qs("#ev_close").onclick = closeDrawer;
    qs("#ev_delete").onclick = async () => {{
      const ok = await confirmModal({{ title: "삭제할까?", desc: "이 일정이 완전히 삭제돼.", confirmText: "삭제", cancelText: "취소", danger: true }});
      if (!ok) return;
      await supabase.from("timeline_events").delete().eq("id", id);
      closeDrawer();
    }};

    setDrawerStatus("열림");
    return;
  }}

  // ---- checklist_item ----
  if (kind === "checklist_item") {{
    titleEl.innerHTML = header("체크리스트 편집", "checklist");

    const [itRes, secRes] = await Promise.all([
      supabase.from("checklist_items").select("*").eq("id", id).single(),
      supabase.from("checklist_sections").select("id,title,sort_order").eq("project_id", projectId).eq("domain_id", domainId).order("sort_order"),
    ]);
    if (itRes.error) {{
      contentEl.innerHTML = `<div class="text-sm text-rose-700">${{escapeHtml(itRes.error.message)}}</div>`;
      return;
    }}
    const it = itRes.data;
    const sections = secRes.data || [];

    contentEl.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <span class="${{UI.pillSpring}}">${{it.is_done ? "완료" : "진행 중"}}</span>
          ${{it.due_date ? `<span class="${{UI.pill}}">마감 ${{escapeHtml(it.due_date)}}</span>` : ""}}
        </div>

        <div>
          <div class="${{UI.label}} mb-1">제목</div>
          <input id="ck_title" class="${{UI.input}}" value="${{escapeHtml(it.title || "")}}" />
        </div>

        <div>
          <div class="${{UI.label}} mb-1">섹션</div>
          <select id="ck_section" class="${{UI.input}}">
            ${(sections || []).map(s => `<option value="${{s.id}}" ${{s.id===it.section_id ? "selected":""}}>${{escapeHtml(s.title)}}</option>`).join("")}
          </select>
        </div>

        <div>
          <div class="${{UI.label}} mb-1">마감일(선택)</div>
          <input id="ck_due" type="date" class="${{UI.input}}" value="${{it.due_date ?? ""}}" />
        </div>

        <div>
          <div class="${{UI.label}} mb-1">메모(선택)</div>
          <textarea id="ck_notes" class="${{UI.textarea}}" rows="4">${{escapeHtml(it.notes || "")}}</textarea>
        </div>

        <label class="flex items-center gap-2 text-[12px] text-ink">
          <input id="ck_done" type="checkbox" ${{it.is_done ? "checked":""}} />
          완료
        </label>

        <div class="flex items-center justify-between pt-2">
          <button id="ck_delete" class="${{UI.btnDanger}}">${{icon("trash", 16)}} 삭제</button>
          <button id="ck_close" class="${{UI.btnPrimary2}}">완료</button>
        </div>
      </div>
    `;

    bindSave("#ck_title",   (el) => safeUpdate("checklist_items", id, {{ title: el.value }}));
    bindSave("#ck_section", (el) => safeUpdate("checklist_items", id, {{ section_id: el.value }}));
    bindSave("#ck_due",     (el) => safeUpdate("checklist_items", id, {{ due_date: el.value || null }}));
    bindSave("#ck_notes",   (el) => safeUpdate("checklist_items", id, {{ notes: el.value || null }}));
    bindSave("#ck_done",    (el) => safeUpdate("checklist_items", id, {{ is_done: el.checked }}));

    qs("#ck_close").onclick = closeDrawer;
    qs("#ck_delete").onclick = async () => {{
      const ok = await confirmModal({{ title: "삭제할까?", desc: "이 항목이 완전히 삭제돼.", confirmText: "삭제", cancelText: "취소", danger: true }});
      if (!ok) return;
      await supabase.from("checklist_items").delete().eq("id", id);
      closeDrawer();
    }};

    setDrawerStatus("열림");
    return;
  }}

  // ---- budget_item ----
  if (kind === "budget_item") {{
    titleEl.innerHTML = header("예산 항목 편집", "budget");

    const [itRes, catsRes] = await Promise.all([
      supabase.from("budget_items").select("*").eq("id", id).single(),
      supabase.from("budget_categories").select("id,title,sort_order").eq("project_id", projectId).eq("domain_id", domainId).order("sort_order"),
    ]);

    if (itRes.error) {{
      contentEl.innerHTML = `<div class="text-sm text-rose-700">${{escapeHtml(itRes.error.message)}}</div>`;
      return;
    }}
    const it = itRes.data;
    const cats = catsRes.data || [];
    const remaining = Math.max(0, n(it.actual) - n(it.paid));

    contentEl.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <span class="${{UI.pillBlue}}">잔액 ${{moneyFmt(remaining)}}원</span>
          <span class="${{UI.pill}}">보증금 ${{moneyFmt(it.deposit || 0)}}원</span>
          ${{it.due_date ? `<span class="${{UI.pillSpring}}">마감 ${{escapeHtml(it.due_date)}}</span>` : ""}}
          ${{it.assignee ? `<span class="${{UI.pill}}">담당 ${{escapeHtml(it.assignee)}}</span>` : ""}}
        </div>

        <div>
          <div class="${{UI.label}} mb-1">항목명</div>
          <input id="bd_name" class="${{UI.input}}" value="${{escapeHtml(it.item_name || "")}}" />
        </div>

        <div>
          <div class="${{UI.label}} mb-1">카테고리</div>
          <select id="bd_cat" class="${{UI.input}}">
            ${(cats || []).map(c => `<option value="${{c.id}}" ${{c.id===it.category_id?"selected":""}}>${{escapeHtml(c.title)}}</option>`).join("")}
          </select>
        </div>

        <div class="grid grid-cols-4 gap-3">
          <div>
            <div class="${{UI.label}} mb-1">예상</div>
            <input id="bd_est" type="number" class="${{UI.input}}" value="${{Number(it.estimate||0)}}" min="0" />
          </div>
          <div>
            <div class="${{UI.label}} mb-1">실제</div>
            <input id="bd_act" type="number" class="${{UI.input}}" value="${{Number(it.actual||0)}}" min="0" />
          </div>
          <div>
            <div class="${{UI.label}} mb-1">지불</div>
            <input id="bd_paid" type="number" class="${{UI.input}}" value="${{Number(it.paid||0)}}" min="0" />
          </div>
          <div>
            <div class="${{UI.label}} mb-1">보증금</div>
            <input id="bd_dep" type="number" class="${{UI.input}}" value="${{Number(it.deposit||0)}}" min="0" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <div class="${{UI.label}} mb-1">보증금 지불일(선택)</div>
            <input id="bd_dep_paid_at" type="date" class="${{UI.input}}" value="${{it.deposit_paid_at ?? ""}}" />
          </div>
          <div>
            <div class="${{UI.label}} mb-1">잔금 지불일(선택)</div>
            <input id="bd_bal_paid_at" type="date" class="${{UI.input}}" value="${{it.balance_paid_at ?? ""}}" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <div class="${{UI.label}} mb-1">마감(선택)</div>
            <input id="bd_due" type="date" class="${{UI.input}}" value="${{it.due_date ?? ""}}" />
          </div>
          <div>
            <div class="${{UI.label}} mb-1">담당(선택)</div>
            <input id="bd_assignee" class="${{UI.input}}" value="${{escapeHtml(it.assignee || "")}}" placeholder="예: 나 / 파트너 / 업체명" />
          </div>
        </div>

        <div>
          <div class="${{UI.label}} mb-1">메모(선택)</div>
          <textarea id="bd_notes" class="${{UI.textarea}}" rows="4">${{escapeHtml(it.notes || "")}}</textarea>
        </div>

        <div class="flex items-center justify-between pt-2">
          <button id="bd_delete" class="${{UI.btnDanger}}">${{icon("trash", 16)}} 삭제</button>
          <button id="bd_close" class="${{UI.btnPrimary2}}">완료</button>
        </div>
      </div>
    `;

    bindSave("#bd_name", (el) => safeUpdate("budget_items", id, {{ item_name: el.value }}));
    bindSave("#bd_cat",  (el) => safeUpdate("budget_items", id, {{ category_id: el.value }}));
    bindSave("#bd_est",  (el) => safeUpdate("budget_items", id, {{ estimate: Number(el.value || 0) }}));
    bindSave("#bd_act",  (el) => safeUpdate("budget_items", id, {{ actual: Number(el.value || 0) }}));
    bindSave("#bd_paid", (el) => safeUpdate("budget_items", id, {{ paid: Number(el.value || 0) }}));
    bindSave("#bd_dep",  (el) => safeUpdate("budget_items", id, {{ deposit: Number(el.value || 0) }}));
    bindSave("#bd_due",  (el) => safeUpdate("budget_items", id, {{ due_date: el.value || null }}));
    bindSave("#bd_assignee", (el) => safeUpdate("budget_items", id, {{ assignee: el.value || null }}));
    bindSave("#bd_notes", (el) => safeUpdate("budget_items", id, {{ notes: el.value || null }}));
    bindSave("#bd_dep_paid_at", (el) => safeUpdate("budget_items", id, {{ deposit_paid_at: el.value || null }}));
    bindSave("#bd_bal_paid_at", (el) => safeUpdate("budget_items", id, {{ balance_paid_at: el.value || null }}));

    qs("#bd_close").onclick = closeDrawer;
    qs("#bd_delete").onclick = async () => {{
      const ok = await confirmModal({{ title: "삭제할까?", desc: "이 예산 항목이 완전히 삭제돼.", confirmText: "삭제", cancelText: "취소", danger: true }});
      if (!ok) return;
      await supabase.from("budget_items").delete().eq("id", id);
      closeDrawer();
    }};

    setDrawerStatus("열림");
    return;
  }}

  // ---- vendor ----
  if (kind === "vendor") {{
    titleEl.innerHTML = header("업체 편집", "vendors");

    const itRes = await supabase.from("vendors").select("*").eq("id", id).single();
    if (itRes.error) {{
      contentEl.innerHTML = `<div class="text-sm text-rose-700">${{escapeHtml(itRes.error.message)}}</div>`;
      return;
    }}
    const v = itRes.data;

    contentEl.innerHTML = `
      <div class="space-y-4">
        <div>
          <div class="${{UI.label}} mb-1">업체명</div>
          <input id="vd_name" class="${{UI.input}}" value="${{escapeHtml(v.name || "")}}" />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <div class="${{UI.label}} mb-1">카테고리(선택)</div>
            <input id="vd_cat" class="${{UI.input}}" value="${{escapeHtml(v.category || "")}}" placeholder="예: 촬영/플라워" />
          </div>
          <div>
            <div class="${{UI.label}} mb-1">상태(선택)</div>
            <input id="vd_status" class="${{UI.input}}" value="${{escapeHtml(v.status || "")}}" placeholder="예: 계약/상담" />
          </div>
        </div>

        <div>
          <div class="${{UI.label}} mb-1">연락처(선택)</div>
          <input id="vd_contact" class="${{UI.input}}" value="${{escapeHtml(v.contact || "")}}" />
        </div>

        <div>
          <div class="${{UI.label}} mb-1">링크(선택)</div>
          <input id="vd_url" class="${{UI.input}}" value="${{escapeHtml(v.url || "")}}" placeholder="https://..." />
        </div>

        <div>
          <div class="${{UI.label}} mb-1">예상비용(선택)</div>
          <input id="vd_est" type="number" class="${{UI.input}}" value="${{Number(v.estimate||0)}}" min="0" />
        </div>

        <div>
          <div class="${{UI.label}} mb-1">메모(선택)</div>
          <textarea id="vd_memo" class="${{UI.textarea}}" rows="4">${{escapeHtml(v.memo || "")}}</textarea>
        </div>

        <div class="flex items-center justify-between pt-2">
          <button id="vd_delete" class="${{UI.btnDanger}}">${{icon("trash", 16)}} 삭제</button>
          <button id="vd_close" class="${{UI.btnPrimary2}}">완료</button>
        </div>
      </div>
    `;

    bindSave("#vd_name", (el) => safeUpdate("vendors", id, {{ name: el.value }}));
    bindSave("#vd_cat", (el) => safeUpdate("vendors", id, {{ category: el.value || null }}));
    bindSave("#vd_status", (el) => safeUpdate("vendors", id, {{ status: el.value || null }}));
    bindSave("#vd_contact", (el) => safeUpdate("vendors", id, {{ contact: el.value || null }}));
    bindSave("#vd_url", (el) => safeUpdate("vendors", id, {{ url: el.value || null }}));
    bindSave("#vd_est", (el) => safeUpdate("vendors", id, {{ estimate: Number(el.value || 0) }}));
    bindSave("#vd_memo", (el) => safeUpdate("vendors", id, {{ memo: el.value || null }}));

    qs("#vd_close").onclick = closeDrawer;
    qs("#vd_delete").onclick = async () => {{
      const ok = await confirmModal({{ title: "삭제할까?", desc: "업체 정보가 삭제돼.", confirmText: "삭제", cancelText: "취소", danger: true }});
      if (!ok) return;
      await supabase.from("vendors").delete().eq("id", id);
      closeDrawer();
    }};

    setDrawerStatus("열림");
    return;
  }}

  // ---- note ----
  if (kind === "note") {{
    titleEl.innerHTML = header("메모 편집", "notes");

    const itRes = await supabase.from("notes").select("*").eq("id", id).single();
    if (itRes.error) {{
      contentEl.innerHTML = `<div class="text-sm text-rose-700">${{escapeHtml(itRes.error.message)}}</div>`;
      return;
    }}
    const n1 = itRes.data;

    contentEl.innerHTML = `
      <div class="space-y-4">
        <div>
          <div class="${{UI.label}} mb-1">제목</div>
          <input id="nt_title" class="${{UI.input}}" value="${{escapeHtml(n1.title || "")}}" />
        </div>

        <div>
          <div class="${{UI.label}} mb-1">내용</div>
          <textarea id="nt_body" class="${{UI.textarea}}" rows="10">${{escapeHtml(n1.body || "")}}</textarea>
        </div>

        <label class="flex items-center gap-2 text-[12px] text-ink">
          <input id="nt_pin" type="checkbox" ${{n1.is_pinned ? "checked":""}} />
          고정
        </label>

        <div class="flex items-center justify-between pt-2">
          <button id="nt_delete" class="${{UI.btnDanger}}">${{icon("trash", 16)}} 삭제</button>
          <button id="nt_close" class="${{UI.btnPrimary2}}">완료</button>
        </div>
      </div>
    `;

    bindSave("#nt_title", (el) => safeUpdate("notes", id, {{ title: el.value }}));
    bindSave("#nt_body", (el) => safeUpdate("notes", id, {{ body: el.value }}));
    bindSave("#nt_pin", (el) => safeUpdate("notes", id, {{ is_pinned: el.checked }}));

    qs("#nt_close").onclick = closeDrawer;
    qs("#nt_delete").onclick = async () => {{
      const ok = await confirmModal({{ title: "삭제할까?", desc: "메모가 삭제돼.", confirmText: "삭제", cancelText: "취소", danger: true }});
      if (!ok) return;
      await supabase.from("notes").delete().eq("id", id);
      closeDrawer();
    }};

    setDrawerStatus("열림");
    return;
  }}

  // ---- ceremony ----
  if (kind === "ceremony") {{
    titleEl.innerHTML = header("예식 편집", "ceremony");

    const itRes = await supabase.from("ceremony_profile").select("*").eq("id", id).single();
    if (itRes.error) {{
      contentEl.innerHTML = `<div class="text-sm text-rose-700">${{escapeHtml(itRes.error.message)}}</div>`;
      return;
    }}
    const c = itRes.data;
    const timeVal = c.start_time ? String(c.start_time).slice(0,5) : "";

    contentEl.innerHTML = `
      <div class="space-y-4">
        <div>
          <div class="${{UI.label}} mb-1">제목</div>
          <input id="ce_title" class="${{UI.input}}" value="${{escapeHtml(c.title || "")}}" />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <div class="${{UI.label}} mb-1">날짜</div>
            <input id="ce_date" type="date" class="${{UI.input}}" value="${{c.date ?? ""}}" />
          </div>
          <div>
            <div class="${{UI.label}} mb-1">시간</div>
            <input id="ce_time" type="time" class="${{UI.input}}" value="${{escapeHtml(timeVal)}}" />
          </div>
        </div>

        <div>
          <div class="${{UI.label}} mb-1">장소</div>
          <input id="ce_loc" class="${{UI.input}}" value="${{escapeHtml(c.location || "")}}" />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <div class="${{UI.label}} mb-1">홀(선택)</div>
            <input id="ce_hall" class="${{UI.input}}" value="${{escapeHtml(c.hall || "")}}" />
          </div>
          <div>
            <div class="${{UI.label}} mb-1">담당(선택)</div>
            <input id="ce_mgr" class="${{UI.input}}" value="${{escapeHtml(c.manager || "")}}" />
          </div>
        </div>

        <div>
          <div class="${{UI.label}} mb-1">연락처(선택)</div>
          <input id="ce_contact" class="${{UI.input}}" value="${{escapeHtml(c.contact || "")}}" />
        </div>

        <div>
          <div class="${{UI.label}} mb-1">주소(선택)</div>
          <input id="ce_addr" class="${{UI.input}}" value="${{escapeHtml(c.address || "")}}" />
        </div>

        <div>
          <div class="${{UI.label}} mb-1">메모(선택)</div>
          <textarea id="ce_memo" class="${{UI.textarea}}" rows="6">${{escapeHtml(c.memo || "")}}</textarea>
        </div>

        <div class="flex items-center justify-between pt-2">
          <button id="ce_close" class="${{UI.btnPrimary2}}">완료</button>
        </div>
      </div>
    `;

    bindSave("#ce_title", (el) => safeUpdate("ceremony_profile", id, {{ title: el.value }}));
    bindSave("#ce_date", (el) => safeUpdate("ceremony_profile", id, {{ date: el.value || null }}));
    bindSave("#ce_time", (el) => safeUpdate("ceremony_profile", id, {{ start_time: el.value ? `${{el.value}}:00` : null }}));
    bindSave("#ce_loc", (el) => safeUpdate("ceremony_profile", id, {{ location: el.value || null }}));
    bindSave("#ce_hall", (el) => safeUpdate("ceremony_profile", id, {{ hall: el.value || null }}));
    bindSave("#ce_mgr", (el) => safeUpdate("ceremony_profile", id, {{ manager: el.value || null }}));
    bindSave("#ce_contact", (el) => safeUpdate("ceremony_profile", id, {{ contact: el.value || null }}));
    bindSave("#ce_addr", (el) => safeUpdate("ceremony_profile", id, {{ address: el.value || null }}));
    bindSave("#ce_memo", (el) => safeUpdate("ceremony_profile", id, {{ memo: el.value || null }}));

    qs("#ce_close").onclick = closeDrawer;
    setDrawerStatus("열림");
    return;
  }}

  // ---- domains_manage ----
  if (kind === "domains_manage") {{
    titleEl.innerHTML = header("대분류 관리", "tag");

    const res = await supabase.from("domains").select("id,title,sort_order").eq("project_id", projectId).order("sort_order");
    const domains = res.data || [];

    contentEl.innerHTML = `
      <div class="space-y-4">
        <div class="${{UI.sub}}">예: 예식 / 집 / 혼수 / 기타</div>
        <div class="space-y-2" id="domainList">
          ${(domains || []).map(d => `
            <div class="rounded-[18px] bg-white/60 border border-white/80 p-3 flex items-center gap-2">
              <button class="${{UI.btnSm}}" data-up="${{d.id}}">↑</button>
              <button class="${{UI.btnSm}}" data-down="${{d.id}}">↓</button>
              <input class="${{UI.input}} !py-2" data-title="${{d.id}}" value="${{escapeHtml(d.title)}}" />
              <button class="${{UI.btnDanger}} !px-3 !py-2" data-del="${{d.id}}">${{icon("trash", 16)}}</button>
            </div>
          `).join("")}
        </div>

        <button id="domainAdd" class="${{UI.btnPrimary}}">${{icon("plus", 16)}} 대분류 추가</button>

        <div class="flex justify-end pt-2">
          <button id="domainClose" class="${{UI.btnPrimary2}}">닫기</button>
        </div>
      </div>
    `;

    // rename
    qsa("input[data-title]").forEach(inp => {{
      inp.onchange = async () => {{
        await safeUpdate("domains", inp.dataset.title, {{ title: inp.value }});
        toast("저장됨");
      }};
    }});

    // reorder helpers
    async function swap(a, b) {{
      if (!a || !b) return;
      await supabase.from("domains").update({{ sort_order: b.sort_order }}).eq("id", a.id);
      await supabase.from("domains").update({{ sort_order: a.sort_order }}).eq("id", b.id);
    }}

    qsa("button[data-up]").forEach(btn => {{
      btn.onclick = async () => {{
        const idd = btn.dataset.up;
        const idx = domains.findIndex(x => x.id === idd);
        if (idx <= 0) return;
        await swap(domains[idx], domains[idx-1]);
        await renderDrawer();
        render(); // update tabs selection state if needed
      }};
    }});

    qsa("button[data-down]").forEach(btn => {{
      btn.onclick = async () => {{
        const idd = btn.dataset.down;
        const idx = domains.findIndex(x => x.id === idd);
        if (idx < 0 || idx >= domains.length-1) return;
        await swap(domains[idx], domains[idx+1]);
        await renderDrawer();
        render();
      }};
    }});

    // delete domain (cascades)
    qsa("button[data-del]").forEach(btn => {{
      btn.onclick = async () => {{
        const idd = btn.dataset.del;
        const ok = await confirmModal({{ title: "대분류 삭제?", desc: "이 대분류에 속한 데이터도 함께 삭제될 수 있어.", confirmText: "삭제", cancelText: "취소", danger: true }});
        if (!ok) return;
        const del = await supabase.from("domains").delete().eq("id", idd);
        if (del.error) toast(del.error.message);
        await renderDrawer();
        // selection fix
        const cur = getSavedDomainId();
        if (cur === idd) localStorage.removeItem(DOMAIN_KEY);
        render();
      }};
    }});

    qs("#domainAdd").onclick = async () => {{
      const name = prompt("대분류 이름", "새 대분류");
      if (!name) return;
      const max = Math.max(-1, ...domains.map(d => d.sort_order ?? 0));
      const ins = await supabase.from("domains").insert({{ project_id: projectId, title: name, sort_order: max + 1 }}).select("id").single();
      if (ins.error) toast(ins.error.message);
      await renderDrawer();
      render();
    }};

    qs("#domainClose").onclick = closeDrawer;
    setDrawerStatus("열림");
    return;
  }}

  // ---- budget_categories_manage ----
  if (kind === "budget_categories_manage") {{
    titleEl.innerHTML = header("카테고리 관리", "tag");

    const res = await supabase.from("budget_categories")
      .select("id,title,sort_order")
      .eq("project_id", projectId).eq("domain_id", domainId)
      .order("sort_order");
    const cats = res.data || [];

    contentEl.innerHTML = `
      <div class="space-y-4">
        <div class="${{UI.sub}}">이 대분류 안에서 예산 카테고리를 관리해.</div>

        <div class="space-y-2">
          ${(cats || []).map(c => `
            <div class="rounded-[18px] bg-white/60 border border-white/80 p-3 flex items-center gap-2">
              <button class="${{UI.btnSm}}" data-up="${{c.id}}">↑</button>
              <button class="${{UI.btnSm}}" data-down="${{c.id}}">↓</button>
              <input class="${{UI.input}} !py-2" data-title="${{c.id}}" value="${{escapeHtml(c.title)}}" />
              <button class="${{UI.btnDanger}} !px-3 !py-2" data-del="${{c.id}}">${{icon("trash", 16)}}</button>
            </div>
          `).join("")}
        </div>

        <button id="catAdd" class="${{UI.btnPrimary}}">${{icon("plus", 16)}} 카테고리 추가</button>

        <div class="flex justify-end pt-2">
          <button id="catClose" class="${{UI.btnPrimary2}}">닫기</button>
        </div>
      </div>
    `;

    qsa("input[data-title]").forEach(inp => {{
      inp.onchange = async () => {{
        await safeUpdate("budget_categories", inp.dataset.title, {{ title: inp.value }});
        toast("저장됨");
      }};
    }});

    async function swap(a, b) {{
      if (!a || !b) return;
      await supabase.from("budget_categories").update({{ sort_order: b.sort_order }}).eq("id", a.id);
      await supabase.from("budget_categories").update({{ sort_order: a.sort_order }}).eq("id", b.id);
    }}

    qsa("button[data-up]").forEach(btn => {{
      btn.onclick = async () => {{
        const idd = btn.dataset.up;
        const idx = cats.findIndex(x => x.id === idd);
        if (idx <= 0) return;
        await swap(cats[idx], cats[idx-1]);
        await renderDrawer();
      }};
    }});
    qsa("button[data-down]").forEach(btn => {{
      btn.onclick = async () => {{
        const idd = btn.dataset.down;
        const idx = cats.findIndex(x => x.id === idd);
        if (idx < 0 || idx >= cats.length-1) return;
        await swap(cats[idx], cats[idx+1]);
        await renderDrawer();
      }};
    }});

    // delete category (block if items exist)
    qsa("button[data-del]").forEach(btn => {{
      btn.onclick = async () => {{
        const catId = btn.dataset.del;
        const cnt = await supabase.from("budget_items").select("id", {{ count: "exact", head: true }}).eq("category_id", catId);
        const c = cnt.count || 0;
        if (c > 0) return toast("이 카테고리에 항목이 있어서 삭제할 수 없어. (항목을 먼저 옮겨줘)");
        const ok = await confirmModal({{ title: "카테고리 삭제?", desc: "카테고리가 삭제돼.", confirmText: "삭제", cancelText: "취소", danger: true }});
        if (!ok) return;
        const del = await supabase.from("budget_categories").delete().eq("id", catId);
        if (del.error) toast(del.error.message);
        await renderDrawer();
      }};
    }});

    qs("#catAdd").onclick = async () => {{
      const name = prompt("카테고리 이름", "새 카테고리");
      if (!name) return;
      const max = Math.max(-1, ...cats.map(c => c.sort_order ?? 0));
      const ins = await supabase.from("budget_categories").insert({{
        project_id: projectId,
        domain_id: domainId,
        title: name,
        sort_order: max + 1,
      }}).select("id").single();
      if (ins.error) toast(ins.error.message);
      await renderDrawer();
    }};

    qs("#catClose").onclick = closeDrawer;
    setDrawerStatus("열림");
    return;
  }}

  // fallback
  titleEl.textContent = "상세";
  contentEl.innerHTML = `<div class="${{UI.sub}}">지원하지 않는 패널</div>`;
}}

/** =========================
 *  Render (router)
 *  ========================= */
async function render() {{
  await ensureAuthFromUrl();

  const {{ data: sessionData }} = await supabase.auth.getSession();
  const session = sessionData?.session;

  if (!session) {{
    loginView();
    return;
  }}

  layoutShell(session.user.email || "");

  const projectId = await ensureProject();
  window.__projectId = projectId;

  await ensureMember(projectId, session.user.id);

  const domains = await ensureDomains(projectId);
  let selectedDomainId = getSavedDomainId();
  if (!selectedDomainId || !domains.find(d => d.id === selectedDomainId)) {{
    selectedDomainId = domains[0]?.id;
    if (selectedDomainId) saveDomainId(selectedDomainId);
  }}

  const r = getRoute();

  if (r === "/overview") return overviewPage(projectId, domains, selectedDomainId);
  if (r === "/timeline") return timelinePage(projectId, domains, selectedDomainId);
  if (r === "/checklist") return checklistPage(projectId, domains, selectedDomainId);
  if (r === "/budget") return budgetPage(projectId, domains, selectedDomainId);
  if (r === "/vendors") return vendorsPage(projectId, domains, selectedDomainId);
  if (r === "/notes") return notesPage(projectId, domains, selectedDomainId);
  if (r === "/ceremony") return ceremonyPage(projectId);

  location.hash = "#/overview";
}}

window.addEventListener("hashchange", render);
render();
"""

# write app.js
(base_dir / "app.js").write_text(app_full, encoding="utf-8")
len(app_full)
