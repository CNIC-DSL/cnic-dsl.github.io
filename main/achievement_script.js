// ========== 成果页面 Tabs 切换（按 section 作用域绑定，避免和首页旧 tab 冲突） ==========
document.addEventListener('DOMContentLoaded', function () {
  // Tab 切换逻辑
  document.querySelectorAll('.achievements-sections, #achievements').forEach(section => {
    const tabs = section.querySelectorAll('.subtabs .tab');
    const panels = section.querySelectorAll('.tab-panel');

    if (!tabs.length || !panels.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');

        const target = tab.dataset.tab;
        const panel = section.querySelector('#' + CSS.escape(target));
        if (panel) panel.classList.add('active');
      });
    });
  });

  // 加载论文数据
  loadPapers();

  // 回到顶部按钮
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

// ========== 从 JSON 加载并渲染论文列表 ==========
function loadPapers() {
  const panel = document.getElementById('papers');
  if (!panel) return;

  fetch('achievements/paper.json')
    .then(res => res.json())
    .then(papers => {
      // 按年份降序排列，最新论文排在前面
      papers.sort((a, b) => b.year - a.year);

      const html = papers.map(paper => {
        const linkBtn = paper.link
          ? `<span class="divider">|</span><a class="action link" href="${paper.link}" target="_blank" rel="noopener noreferrer">LINK</a>`
          : `<span class="divider">|</span><span class="action link disabled">LINK</span>`;
        const ccfLabel = paper.ccf
          ? `<span class="ccf-tag ccf-${paper.ccf.toLowerCase()}">CCF-${paper.ccf}</span>`
          : '';
        return `
          <div class="list-item">
            <div class="item-main">
              <div class="authors">${paper.authors}</div>
              <div class="title">${paper.title}</div>
              <div class="meta">${paper.venue}${ccfLabel}</div>
            </div>
            <div class="item-actions">
              ${linkBtn}
            </div>
          </div>`;
      }).join('');

      panel.insertAdjacentHTML('beforeend', html);
    })
    .catch(err => {
      console.error('加载论文数据失败:', err);
      panel.insertAdjacentHTML('beforeend', '<p style="padding:1rem;color:#999;">论文数据加载失败，请稍后刷新</p>');
    });
}
