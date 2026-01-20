import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://ibjjbgthwmpvifbzxhwa.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliampiZ3Rod21wdmlmYnp4aHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NjExMTcsImV4cCI6MjA4NDQzNzExN30.Bb3fyGlJ_16gao6W8P0yaMotsD5DIEeTJVan3m5OKQw
";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const app = document.getElementById("app");

function qs(sel) { return document.querySelector(sel); }
function route() { return (location.hash || "#/timeline").replace("#", ""); }

async function ensureAuthCallbackExchange() {
  // 매직링크 로그인 후 URL에 ?code=... 가 붙을 수 있음
  const url = new URL(location.href);
  const code = url.searchParams.get("code");
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
    url.searchParams.delete("code");
    history.replaceState({}, "", url.toString());
  }
}

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

function layoutShell(userEmail) {
  app.innerHTML = `
  <div class="min-h-screen grid grid-cols-1 md:grid-cols-[260px_1fr]">
    <aside class="border-b md:border-b-0 md:border-r p-4">
      <div class="font-semibold text-lg">Wedding Planner</div>
      <div class="text-xs opacity-70 mt-1">${userEmail}</div>
      <nav class="mt-4 space-y-2 text-sm">
        <a class="block hover:underline" href="#/timeline">행사일정</a>
        <a class="block hover:underline" href="#/checklist">체크리스트</a>
        <a class="block hover:underline" href="#/budget">예산</a>
      </nav>
      <button id="logout" class="mt-6 text-sm border rounded-xl px-3 py-2">로그아웃</button>
    </aside>
    <main class="p-4 md:p-6">
      <div id="page"></div>
    </main>
  </div>`;
  qs("#logout").onclick = async () => { await supabase.auth.signOut(); render(); };
}

function loginView() {
  app.innerHTML = `
  <main class="min-h-screen flex items-center justify-center p-6">
    <div class="w-full max-w-sm space-y-3">
      <h1 class="text-2xl font-semibold">로그인</h1>
      <input id="email" class="w-full border rounded-xl p-3" placeholder="email@example.com" />
      <button id="send" class="w-full rounded-xl p-3 border">매직 링크 보내기</button>
      <p id="msg" class="text-sm opacity-80"></p>
    </div>
  </main>`;
  qs("#send").onclick = async () => {
    const email = qs("#email").value.trim();
    if (!email) return;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: location.origin + location.pathname } // GitHub Pages면 pages URL로 자동
    });
    qs("#msg").textContent = error ? error.message : "메일함 확인해줘!";
  };
}

async function timelinePage(projectId) {
  const page = qs("#page");
  page.innerHTML = `
    <header class="flex items-center justify-between">
      <h1 class="text-xl font-semibold">행사일정</h1>
      <button id="addEvent" class="border rounded-xl px-3 py-2 text-sm">+ 추가</button>
    </header>
    <div class="mt-4 space-y-2" id="events"></div>
  `;

  async function load() {
    const { data, error } = await supabase
      .from("timeline_events")
      .select("id,start_time,duration_min,icon,title,is_highlighted")
      .eq("project_id", projectId)
      .order("sort_order");
    if (error) { page.innerHTML += `<p class="text-sm text-red-600">${error.message}</p>`; return; }

    const box = qs("#events");
    box.innerHTML = (data ?? []).map(e => `
      <div class="border rounded-2xl p-3 flex items-center justify-between">
        <div class="flex gap-3">
          <div class="text-xl">${e.icon}</div>
          <div>
            <div class="text-xs opacity-70">${e.start_time} · ${e.duration_min}m</div>
            <div class="font-medium">${e.title}</div>
          </div>
        </div>
        <button data-id="${e.id}" data-hi="${e.is_highlighted}"
          class="text-sm border rounded-xl px-3 py-2">
          ${e.is_highlighted ? "강조 해제" : "강조"}
        </button>
      </div>
    `).join("") || `<div class="text-sm opacity-70 p-4 border rounded-2xl">일정이 없어.</div>`;

    box.querySelectorAll("button[data-id]").forEach(btn => {
      btn.onclick = async () => {
        const id = btn.dataset.id;
        const next = btn.dataset.hi !== "true";
        await supabase.from("timeline_events").update({ is_highlighted: next }).eq("id", id);
      };
    });
  }

  qs("#addEvent").onclick = async () => {
    await supabase.from("timeline_events").insert({
      project_id: projectId,
      day_id: (await ensureDefaultDay(projectId)),
      sort_order: 9999,
      start_time: "18:00:00",
      duration_min: 30,
      icon: "⏰",
      title: "새 일정"
    });
  };

  async function ensureDefaultDay(pid) {
    // day_id가 필요해서 “기본 day 1개” 없으면 생성
    const { data } = await supabase.from("timeline_days")
      .select("id").eq("project_id", pid).order("sort_order").limit(1);
    if (data?.[0]?.id) return data[0].id;

    const ins = await supabase.from("timeline_days").insert({
      project_id: pid, title: "본식 당일", sort_order: 0
    }).select("id").single();
    return ins.data.id;
  }

  // Realtime 구독(변경되면 자동 새로고침)
  const ch = supabase.channel("timeline")
    .on("postgres_changes", { event: "*", schema: "public", table: "timeline_events", filter: `project_id=eq.${projectId}` }, load)
    .subscribe();

  window.__cleanup?.();
  window.__cleanup = () => supabase.removeChannel(ch);

  await load();
}

async function checklistPage() {
  qs("#page").innerHTML = `<h1 class="text-xl font-semibold">체크리스트</h1><p class="mt-3 text-sm opacity-70">다음 단계에서 붙일게(구조는 행사일정과 동일: select + insert + update + realtime).</p>`;
}

async function budgetPage() {
  qs("#page").innerHTML = `<h1 class="text-xl font-semibold">예산</h1><p class="mt-3 text-sm opacity-70">다음 단계에서 붙일게(합계/잔액 포함).</p>`;
}

async function render() {
  await ensureAuthCallbackExchange();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) { loginView(); return; }

  layoutShell(session.user.email || "");
  const projectId = await getProjectId();

  const r = route();
  if (r === "/timeline") await timelinePage(projectId);
  if (r === "/checklist") await checklistPage();
  if (r === "/budget") await budgetPage();
}

window.addEventListener("hashchange", render);
render();
