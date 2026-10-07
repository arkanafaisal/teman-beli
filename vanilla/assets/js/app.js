function initTheme() {
  const savedTheme = localStorage.getItem(DB.KEY_THEME) || "light";
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem(DB.KEY_THEME, isDark ? "dark" : "light");
}

function updateAuthUI() {
  const user = DB.getUser();
  const authContainer = document.getElementById("auth-nav");
  if (!authContainer) return;

  if (user.isLoggedIn) {
    authContainer.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-sm font-medium text-slate-700 dark:text-slate-200">
          Hi, ${user.name} <span class="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full font-semibold">Verified</span>
        </span>
        <button onclick="handleLogout()" class="text-xs text-red-500 hover:underline">Keluar</button>
      </div>
    `;
  } else {
    authContainer.innerHTML = `
      <button onclick="handleLoginSSO()" class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition">
        Masuk SSO Kampus
      </button>
    `;
  }
}

function handleLoginSSO() {
  const mockUser = {
    isLoggedIn: true,
    isVerified: true,
    name: "Mahasiswa Verified",
    email: "mhs@student.uns.ac.id",
  };
  DB.setUser(mockUser);
  location.reload();
}

function handleLogout() {
  DB.setUser({ isLoggedIn: false, isVerified: false, name: "" });
  location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  updateAuthUI();
});
