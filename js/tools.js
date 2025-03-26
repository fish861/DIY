/**
 * DIY tools page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // ページ読み込み時のフェードイン
    document.body.classList.add('fade-in');
    
    // スクロールイベントの初期チェック
    checkScroll();
    
    // ツールセクション要素にアニメーションクラスを追加
    animateOnScroll();
    
    // キーボード操作を検出したらキーボードユーザークラスを追加
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-user');
        }
    });
});

// スクロール時の処理
window.addEventListener('scroll', function() {
    checkScroll();
    animateOnScroll();
});

// スクロール位置によるUIの更新
function checkScroll() {
    const header = document.querySelector('header');
    const backToTopBtn = document.getElementById('back-to-top');
    
    // ヘッダーのスタイル変更
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // トップに戻るボタンの表示/非表示
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
}

// スクロールアニメーション
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in-element');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
            element.classList.add('visible');
        }
    });
}

// トップに戻るボタンのクリックイベント
if (document.getElementById('back-to-top')) {
    document.getElementById('back-to-top').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ページ遷移アニメーション
document.querySelectorAll('a:not([href^="#"])').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.indexOf('#') !== 0 && href.indexOf('javascript:') !== 0) {
            e.preventDefault();
            document.body.classList.remove('fade-in');
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location = href;
            }, 300);
        }
    });
});