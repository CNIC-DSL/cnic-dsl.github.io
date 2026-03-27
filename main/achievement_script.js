// ========== 成果页面 Tabs 切换（按 section 作用域绑定，避免和首页旧 tab 冲突） ==========
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.achievements-sections, #achievements').forEach(section => {
    const tabs = section.querySelectorAll('.subtabs .tab');
    const panels = section.querySelectorAll('.tab-panel');

    if (!tabs.length || !panels.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');

        const target = tab.dataset.tab;     // 如 "papers"
        const panel = section.querySelector('#' + CSS.escape(target)); // 只在本 section 内找
        if (panel) panel.classList.add('active');
      });
    });
  });

  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
