import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://ibjjbgthwmpvifbzxhwa.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliampiZ3Rod21wdmlmYnp4aHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NjExMTcsImV4cCI6MjA4NDQzNzExN30.Bb3fyGlJ_16gao6W8P0yaMotsD5DIEeTJVan3m5OKQw";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const app = document.getElementById("app");

function qs(sel) {
  return document.querySelector(sel);
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

// 해시 라우팅: #/timeline, #/checklist, #/budget
function getRoute() {
  const h = location.hash || "#/timeline";
  if (h.startsWith("#/")) return h.slice(1);
  return "/timeline";
}

// auth 링크가 해시(#access_token=...)로 오는 경우(설정에 따라 발생)
function isAuthHash() {
  return location.hash.startsWith("#access_token=") || location.hash.startsWith("#error=");
}

async function ensureAuthFromUrl() {
  // 1) PKCE 코드 방식: ?code=...
  const url = new URL(location.href);
  const code = url.searchParams.get("code");
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
    url.searchParams.delete("code");
    history.replaceState({}, "", url.toString());
  }

  // 2) 해시 토큰 방식: #access_token=...&refresh_token=...
  if (isAuthHash()) {
    const params = new URLSearchParams(location.hash.slice(1));
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");
    const error = params.get("error_description") || params.get("error");
    if (error) console.error("Auth error:", error);

    if (access_token && refresh_token) {
      await supabase.auth.setSession({ access_token, refresh_token });
    }
    // auth hash는 라우팅 hash로 교체
    location.hash = "#/timeline";
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
      <div class="text-xs opacity-70 mt-1">${escapeHtml(userEmail)}</div>
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

  qs("#logout").onclick = async () => {
    await supabase.auth.signOut();
    render();
  };
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
      options: {
        // GitHub Pages(레포 하위경로)까지 포함해서 redirect
        emailRedirectTo: location.origin + location.pathname,
      },
    });
    qs("#msg").textContent = error ? error.message : "메일함 확인해줘!";
  };
}

async function ensureDefaultDay(projectId) {
  const { data } = await supabase
    .from("timeline_days")
    .select("id")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true })
    .limit(1);

  if (data?.[0]?.id) return data[0].id;

  const ins = await supabase
    .from("timeline_days")
    .insert({ project_id: projectId, title: "본식 당일", sort_order: 0 })
    .select("id")
    .single();

  return ins.data.id;
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

  const dayId = await ensureDefaultDay(projectId);

  async function load() {
    const { data, error } = await supabase
      .from("timeline_events")
      .select("id,start_time,duration_min,icon,title,location,is_highlighted,sort_order")
      .eq("project_id", projectId)
      .eq("day_id", dayId)
      .order("sort_order", { ascending: true });

    if (error) {
      qs("#events").innerHTML = `<p class="text-sm text-red-600">${escapeHtml(error.message)}</p>`;
      return;
    }

    qs("#events").innerHTML =
      (data ?? [])
        .map((e) => `
        <div class="border rounded-2xl p-3 flex items-center justify-between">
          <div class="flex gap-3">
            <div class="text-xl">${escapeHtml(e.icon)}</div>
            <div>
              <div class="text-xs opacity-70">${escapeHtml(e.start_time)} · ${e.duration_min}m</div>
              <div class="font-medium">${escapeHtml(e.title)}</div>
              ${e.location ? `<div class="text-sm opacity-70">${escapeHtml(e.location)}</div>` : ""}
            </div>
          </div>
          <div class="flex gap-2">
            <button data-hi="${e.is_highlighted}" data-id="${e.id}" class="text-sm border rounded-xl px-3 py-2">
              ${e.is_highlighted ? "강조 해제" : "강조"}
            </button>
            <button data-edit="${e.id}" class="text-sm border rounded-xl px-3 py-2">수정</button>
            <button data-del="${e.id}" class="text-sm border rounded-xl px-3 py-2">삭제</button>
          </div>
        </div>
      `)
        .join("") || `<div class="text-sm opacity-70 p-4 border rounded-2xl">일정이 없어.</div>`;

    qs("#events").querySelectorAll("button[data-id]").forEach((btn) => {
      btn.onclick = async () => {
        const id = btn.dataset.id;
        const next = btn.dataset.hi !== "true";
        await supabase.from("timeline_events").update({ is_highlighted: next }).eq("id", id);
      };
    });

    qs("#events").querySelectorAll("button[data-edit]").forEach((btn) => {
      btn.onclick = async () => {
        const id = btn.dataset.edit;
        const cur = (data ?? []).find((x) => x.id === id);
        if (!cur) return;
        const title = prompt("제목", cur.title) ?? cur.title;
        const start_time = prompt("시작시간(HH:MM:SS)", cur.start_time) ?? cur.start_time;
        const duration_min = Number(prompt("소요(분)", String(cur.duration_min)) ?? cur.duration_min);
        const location = prompt("장소(선택)", cur.location ?? "") ?? (cur.location ?? "");
        await supabase
          .from("timeline_events")
          .update({ title, start_time, duration_min: Number.isFinite(duration_min) ? duration_min : cur.duration_min, location })
          .eq("id", id);
      };
    });

    qs("#events").querySelectorAll("button[data-del]").forEach((btn) => {
      btn.onclick = async () => {
        const id = btn.dataset.del;
        if (!confirm("삭제할까?")) return;
        await supabase.from("timeline_events").delete().eq("id", id);
      };
    });
  }

  qs("#addEvent").onclick = async () => {
    const { data } = await supabase
      .from("timeline_events")
      .select("sort_order")
      .eq("project_id", projectId)
      .eq("day_id", dayId)
      .order("sort_order", { ascending: false })
      .limit(1);

    const nextOrder = (data?.[0]?.sort_order ?? 0) + 1;

    await supabase.from("timeline_events").insert({
      project_id: projectId,
      day_id: dayId,
      sort_order: nextOrder,
      start_time: "18:00:00",
      duration_min: 30,
      icon: "⏰",
      title: "새 일정",
    });
  };

  const ch = supabase
    .channel("timeline")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "timeline_events", filter: `project_id=eq.${projectId}` },
      load
    )
    .subscribe();

  window.__cleanup?.();
  window.__cleanup = () => supabase.removeChannel(ch);

  await load();
}

async function checklistPage(projectId) {
  const page = qs("#page");
  page.innerHTML = `
    <header class="flex items-center justify-between">
      <h1 class="text-xl font-semibold">체크리스트</h1>
      <div class="flex gap-2">
        <button id="addSection" class="border rounded-xl px-3 py-2 text-sm">섹션 추가</button>
        <button id="addItem" class="border rounded-xl px-3 py-2 text-sm">할 일 추가</button>
      </div>
    </header>
    <div class="mt-4 space-y-3" id="sections"></div>
  `;

  async function ensureTemplate() {
    const { data } = await supabase
      .from("checklist_sections")
      .select("id")
      .eq("project_id", projectId)
      .limit(1);

    if (data && data.length > 0) return;

    const defaults = ["6개월 전", "3개월 전", "1개월 전", "2주 전", "1주 전", "당일"];
    await supabase.from("checklist_sections").insert(
      defaults.map((t, i) => ({ project_id: projectId, title: t, sort_order: i }))
    );
  }

  async function load() {
    await ensureTemplate();

    const { data: sections, error: se } = await supabase
      .from("checklist_sections")
      .select("id,title,sort_order")
      .eq("project_id", projectId)
      .order("sort_order", { ascending: true });

    if (se) {
      qs("#sections").innerHTML = `<p class="text-sm text-red-600">${escapeHtml(se.message)}</p>`;
      return;
    }

    const { data: items, error: ie } = await supabase
      .from("checklist_items")
      .select("id,section_id,title,is_done,sort_order")
      .eq("project_id", projectId)
      .order("sort_order", { ascending: true });

    if (ie) {
      qs("#sections").innerHTML = `<p class="text-sm text-red-600">${escapeHtml(ie.message)}</p>`;
      return;
    }

    const bySection = new Map();
    (items || []).forEach((it) => {
      if (!bySection.has(it.section_id)) bySection.set(it.section_id, []);
      bySection.get(it.section_id).push(it);
    });

    const box = qs("#sections");
    box.innerHTML = (sections || []).map((s) => {
      const list = bySection.get(s.id) || [];
      const done = list.filter((x) => x.is_done).length;
      const total = list.length;

      return `
        <div class="border rounded-2xl p-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="font-semibold">${escapeHtml(s.title)}</div>
              <div class="text-xs opacity-70">(${done}/${total})</div>
            </div>
            <button class="text-sm border rounded-xl px-3 py-2" data-add="${s.id}">+ 이 섹션에 추가</button>
          </div>

          <div class="mt-3 space-y-2">
            ${total === 0 ? `<div class="text-sm opacity-70">할 일이 없어.</div>` :
              list.map((it) => `
                <div class="flex items-center justify-between gap-3 border rounded-xl p-2">
                  <label class="flex items-center gap-2 flex-1">
                    <input type="checkbox" data-toggle="${it.id}" ${it.is_done ? "checked" : ""} />
                    <span class="${it.is_done ? "line-through opacity-60" : ""}">${escapeHtml(it.title)}</span>
                  </label>
                  <div class="flex gap-2">
                    <button class="text-xs border rounded-lg px-2 py-1" data-edit="${it.id}">수정</button>
                    <button class="text-xs border rounded-lg px-2 py-1" data-del="${it.id}">삭제</button>
                  </div>
                </div>
              `).join("")
            }
          </div>
        </div>
      `;
    }).join("");

    box.querySelectorAll("button[data-add]").forEach((btn) => {
      btn.onclick = async () => {
        const sectionId = btn.dataset.add;
        const title = prompt("할 일 제목?");
        if (!title) return;
        await supabase.from("checklist_items").insert({
          project_id: projectId,
          section_id: sectionId,
          title,
          sort_order: Date.now(),
        });
      };
    });

    box.querySelectorAll("input[data-toggle]").forEach((cb) => {
      cb.onchange = async () => {
        const id = cb.dataset.toggle;
        await supabase.from("checklist_items").update({ is_done: cb.checked }).eq("id", id);
      };
    });

    box.querySelectorAll("button[data-edit]").forEach((btn) => {
      btn.onclick = async () => {
        const id = btn.dataset.edit;
        const cur = (items || []).find((x) => x.id === id)?.title || "";
        const next = prompt("새 제목", cur);
        if (!next) return;
        await supabase.from("checklist_items").update({ title: next }).eq("id", id);
      };
    });

    box.querySelectorAll("button[data-del]").forEach((btn) => {
      btn.onclick = async () => {
        const id = btn.dataset.del;
        if (!confirm("삭제할까?")) return;
        await supabase.from("checklist_items").delete().eq("id", id);
      };
    });
  }

  qs("#addSection").onclick = async () => {
    const title = prompt("섹션 이름?");
    if (!title) return;
    await supabase.from("checklist_sections").insert({
      project_id: projectId,
      title,
      sort_order: Date.now(),
    });
  };

  qs("#addItem").onclick = async () => {
    const title = prompt("할 일 제목?");
    if (!title) return;

    const { data: sec } = await supabase
      .from("checklist_sections")
      .select("id")
      .eq("project_id", projectId)
      .order("sort_order", { ascending: true })
      .limit(1);

    const sectionId = sec?.[0]?.id;
    if (!sectionId) return;

    await supabase.from("checklist_items").insert({
      project_id: projectId,
      section_id: sectionId,
      title,
      sort_order: Date.now(),
    });
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
    <header class="flex items-center justify-between">
      <h1 class="text-xl font-semibold">예산</h1>
      <div class="flex gap-2">
        <button id="addCat" class="border rounded-xl px-3 py-2 text-sm">카테고리 추가</button>
        <button id="addBudget" class="border rounded-xl px-3 py-2 text-sm">항목 추가</button>
      </div>
    </header>
    <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3" id="summary"></div>
    <div class="mt-4 space-y-3" id="cats"></div>
  `;

  async function ensureTemplate() {
    const { data } = await supabase
      .from("budget_categories")
      .select("id")
      .eq("project_id", projectId)
      .limit(1);

    if (data && data.length > 0) return;

    const defaults = ["예식장", "스드메", "스냅/영상", "부케/플라워", "청첩장", "기타"];
    await supabase.from("budget_categories").insert(
      defaults.map((t, i) => ({ project_id: projectId, title: t, sort_order: i }))
    );
  }

  function n(x) {
    const v = Number(x);
    return Number.isFinite(v) ? v : 0;
  }
  function fmt(x) {
    return Math.round(n(x)).toLocaleString("ko-KR");
  }

  async function load() {
    await ensureTemplate();

    const { data: cats, error: ce } = await supabase
      .from("budget_categories")
      .select("id,title,sort_order")
      .eq("project_id", projectId)
      .order("sort_order", { ascending: true });

    if (ce) {
      qs("#cats").innerHTML = `<p class="text-sm text-red-600">${escapeHtml(ce.message)}</p>`;
      return;
    }

    const { data: items, error: ie } = await supabase
      .from("budget_items")
      .select("id,category_id,item_name,estimate,actual,paid,sort_order")
      .eq("project_id", projectId)
      .order("sort_order", { ascending: true });

    if (ie) {
      qs("#cats").innerHTML = `<p class="text-sm text-red-600">${escapeHtml(ie.message)}</p>`;
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
      <div class="border rounded-2xl p-3"><div class="text-xs opacity-70">예상합계</div><div class="text-lg font-semibold">${fmt(totals.estimate)}원</div></div>
      <div class="border rounded-2xl p-3"><div class="text-xs opacity-70">실제합계</div><div class="text-lg font-semibold">${fmt(totals.actual)}원</div></div>
      <div class="border rounded-2xl p-3"><div class="text-xs opacity-70">지불완료</div><div class="text-lg font-semibold">${fmt(totals.paid)}원</div></div>
      <div class="border rounded-2xl p-3"><div class="text-xs opacity-70">미지불</div><div class="text-lg font-semibold">${fmt(unpaid)}원</div></div>
    `;

    const byCat = new Map();
    (items || []).forEach((it) => {
      if (!byCat.has(it.category_id)) byCat.set(it.category_id, []);
      byCat.get(it.category_id).push(it);
    });

    qs("#cats").innerHTML = (cats || []).map((c) => {
      const list = byCat.get(c.id) || [];
      return `
        <div class="border rounded-2xl p-3">
          <div class="flex items-center justify-between">
            <div class="font-semibold">${escapeHtml(c.title)}</div>
            <button class="text-sm border rounded-xl px-3 py-2" data-add="${c.id}">+ 이 카테고리에 추가</button>
          </div>
          <div class="mt-3 space-y-2">
            ${list.length === 0 ? `<div class="text-sm opacity-70">항목이 없어.</div>` :
              list.map((it) => {
                const remaining = Math.max(0, n(it.actual) - n(it.paid));
                return `
                  <div class="border rounded-xl p-2">
                    <div class="flex items-center justify-between gap-2">
                      <div class="font-medium">${escapeHtml(it.item_name)}</div>
                      <div class="flex gap-2">
                        <button class="text-xs border rounded-lg px-2 py-1" data-edit="${it.id}">수정</button>
                        <button class="text-xs border rounded-lg px-2 py-1" data-del="${it.id}">삭제</button>
                      </div>
                    </div>
                    <div class="mt-2 text-sm opacity-80 grid grid-cols-2 md:grid-cols-4 gap-2">
                      <div>예상: <b>${fmt(it.estimate)}</b></div>
                      <div>실제: <b>${fmt(it.actual)}</b></div>
                      <div>지불: <b>${fmt(it.paid)}</b></div>
                      <div>잔액: <b>${fmt(remaining)}</b></div>
                    </div>
                  </div>
                `;
              }).join("")
            }
          </div>
        </div>
      `;
    }).join("");

    qs("#cats").querySelectorAll("button[data-add]").forEach((btn) => {
      btn.onclick = async () => {
        const categoryId = btn.dataset.add;
        const name = prompt("항목 이름?");
        if (!name) return;
        await supabase.from("budget_items").insert({
          project_id: projectId,
          category_id: categoryId,
          item_name: name,
          estimate: 0,
          actual: 0,
          paid: 0,
          sort_order: Date.now(),
        });
      };
    });

    qs("#cats").querySelectorAll("button[data-edit]").forEach((btn) => {
      btn.onclick = async () => {
        const id = btn.dataset.edit;
        const cur = (items || []).find((x) => x.id === id);
        if (!cur) return;

        const item_name = prompt("항목 이름", cur.item_name) ?? cur.item_name;
        const estimate = Number(prompt("예상 금액(숫자)", String(cur.estimate)) ?? cur.estimate);
        const actual = Number(prompt("실제 금액(숫자)", String(cur.actual)) ?? cur.actual);
        const paid = Number(prompt("지불 금액(숫자)", String(cur.paid)) ?? cur.paid);

        await supabase.from("budget_items")
          .update({
            item_name,
            estimate: n(estimate),
            actual: n(actual),
            paid: n(paid),
          })
          .eq("id", id);
      };
    });

    qs("#cats").querySelectorAll("button[data-del]").forEach((btn) => {
      btn.onclick = async () => {
        const id = btn.dataset.del;
        if (!confirm("삭제할까?")) return;
        await supabase.from("budget_items").delete().eq("id", id);
      };
    });
  }

  qs("#addCat").onclick = async () => {
    const title = prompt("카테고리 이름?");
    if (!title) return;
    await supabase.from("budget_categories").insert({
      project_id: projectId,
      title,
      sort_order: Date.now(),
    });
  };

  qs("#addBudget").onclick = async () => {
    const name = prompt("항목 이름?");
    if (!name) return;

    const { data: cats } = await supabase
      .from("budget_categories")
      .select("id")
      .eq("project_id", projectId)
      .order("sort_order", { ascending: true })
      .limit(1);

    const categoryId = cats?.[0]?.id;
    if (!categoryId) return;

    await supabase.from("budget_items").insert({
      project_id: projectId,
      category_id: categoryId,
      item_name: name,
      estimate: 0,
      actual: 0,
      paid: 0,
      sort_order: Date.now(),
    });
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

  // unknown route
  location.hash = "#/timeline";
}

window.addEventListener("hashchange", render);
render();

