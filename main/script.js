// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 导航栏功能 ==========
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // 移动端导航切换
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 点击导航链接后关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            
            // 更新活动状态
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // 滚动时导航栏效果
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // ========== 轮播图功能 ==========
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // 移除所有活动类
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // 循环索引
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // 添加活动类
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // 绑定按钮事件
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlideShow();
            startSlideShow();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlideShow();
            startSlideShow();
        });
    }

    // 绑定指示器事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopSlideShow();
            startSlideShow();
        });
    });

    // 启动自动轮播
    startSlideShow();

    // 鼠标悬停时暂停轮播
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopSlideShow);
        heroSection.addEventListener('mouseleave', startSlideShow);
    }

    // ========== 数字动画功能 ==========
    function animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // 观察器用于触发数字动画
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(number => {
                    const target = parseInt(number.dataset.target);
                    animateNumber(number, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const introStats = document.querySelector('.intro-stats');
    if (introStats) {
        statsObserver.observe(introStats);
    }

    // ========== 标签页切换功能 ==========
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            // 移除所有活动类
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // 添加活动类
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // ========== 回到顶部按钮 ==========
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

    // ========== 滚动动画 ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 为卡片元素添加滚动动画
    const cards = document.querySelectorAll('.research-card, .team-member, .news-card, .achievement-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        fadeInObserver.observe(card);
    });

    // ========== 平滑滚动到锚点 ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========== 鼠标悬停效果增强 ==========
    const researchCards = document.querySelectorAll('.research-card');
    researchCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ========== 新闻卡片悬停效果 ==========
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('.news-image');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('.news-image');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // ========== 团队成员卡片效果 ==========
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            const photo = this.querySelector('.member-photo');
            if (photo) {
                photo.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        member.addEventListener('mouseleave', function() {
            const photo = this.querySelector('.member-photo');
            if (photo) {
                photo.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // ========== Logo和图片占位符 ==========
    // 为logo创建SVG占位符
    const logo = document.querySelector('.logo');
    if (logo && !logo.src) {
        const svg = `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#0066cc;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#00a8e8;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#grad1)" />
                <path d="M 30 50 L 50 30 L 70 50 L 50 70 Z" fill="white" opacity="0.9"/>
                <circle cx="50" cy="50" r="8" fill="white"/>
            </svg>
        `;
        logo.innerHTML = svg;
    }

    // 为团队成员照片添加占位符
    const memberPhotos = document.querySelectorAll('.member-photo img');
    memberPhotos.forEach((img, index) => {
        img.onerror = function() {
            this.style.display = 'none';
            const colors = ['#0066cc', '#00a8e8', '#667eea', '#764ba2'];
            this.parentElement.style.background = colors[index % colors.length];
            this.parentElement.innerHTML = '👤';
        };
    });

    // 为新闻图片添加占位符
    const newsImages = document.querySelectorAll('.news-image img');
    newsImages.forEach((img, index) => {
        img.onerror = function() {
            this.style.display = 'none';
        };
    });

    // ========== 控制台欢迎信息 ==========
    console.log('%c🎓 科学数据智能与创新实验室', 'color: #0066cc; font-size: 24px; font-weight: bold;');
    console.log('%c欢迎访问我们的网站！', 'color: #00a8e8; font-size: 16px;');
    console.log('%c我们致力于推动人工智能与科学研究的深度融合', 'color: #666; font-size: 14px;');

    // ========== 页面加载完成提示 ==========
    console.log('%c✅ 网站加载完成', 'color: #00a8e8; font-size: 14px; font-weight: bold;');
});

// ========== 页面可见性变化时的处理 ==========
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时暂停动画
        console.log('页面已隐藏');
    } else {
        // 页面可见时恢复动画
        console.log('页面已显示');
    }
});


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
});
