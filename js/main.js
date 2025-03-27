/**
 * メインページのJavaScript関数
 */

// ページ読み込み時のフェードイン
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('fade-in');
    
    // スクロールアニメーションの初期チェック
    checkScroll();
    const headerSearchForm = document.querySelector('.header-search-form');
    
    if (headerSearchForm) {
        headerSearchForm.addEventListener('submit', function(e) {
            const searchInput = this.querySelector('.header-search-input');
            
            // 空欄の場合は送信しない
            if (!searchInput.value.trim()) {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }
});

// モバイルメニューの切り替え
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    const nav = document.getElementById('main-nav');
    this.classList.toggle('active');
    nav.classList.toggle('active');
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // モバイルメニューが開いていたら閉じる
            const nav = document.getElementById('main-nav');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
});

// スクロール検出でヘッダースタイル変更
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // スクロールアニメーション要素のチェック
    checkScroll();
});

// スクロールアニメーション要素の表示チェック
function checkScroll() {
    const elements = document.querySelectorAll('.fade-in-element, .manuals-category');
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.85) {
            el.classList.add('visible');
        }
    });
}

// ページ遷移アニメーション
document.querySelectorAll('a:not([href^="#"])').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.indexOf('#') !== 0 && href.indexOf('javascript:') !== 0 && href.indexOf('tel:') !== 0 && href.indexOf('mailto:') !== 0) {
            e.preventDefault();
            document.body.classList.remove('fade-in');
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location = href;
            }, 300);
        }
    });
});

// キーボードナビゲーション検出
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-user');
    }
});

// マウス使用時はキーボードフォーカス表示を非表示
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-user');
});

// ページトップへ戻るボタン
if (document.getElementById('back-to-top')) {
    document.getElementById('back-to-top').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
