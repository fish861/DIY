/**
 * 詳細ページ用のJavaScript関数
 */

// ページ読み込み時のフェードイン
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('fade-in');
    
    // スクロールイベントの初期チェック
    checkScroll();
});

// 詳細を表示するトグル1
if (document.getElementById('toggle-details')) {
    document.getElementById('toggle-details').addEventListener('click', function() {
        var details = document.getElementById('additional-details');
        this.setAttribute('aria-expanded', details.style.display === 'none' ? 'true' : 'false');
        
        if (details.style.display === 'none') {
            details.style.display = 'block';
            this.textContent = '詳細を閉じる';
        } else {
            details.style.display = 'none';
            this.textContent = '追加作業の詳細を見る';
        }
    });
}

// 詳細を表示するトグル2
if (document.getElementById('toggle-details-2')) {
    document.getElementById('toggle-details-2').addEventListener('click', function() {
        var details = document.getElementById('additional-details-2');
        this.setAttribute('aria-expanded', details.style.display === 'none' ? 'true' : 'false');
        
        if (details.style.display === 'none') {
            details.style.display = 'block';
            this.textContent = '詳細を閉じる';
        } else {
            details.style.display = 'none';
            this.textContent = '追加作業の詳細を見る';
        }
    });
}

// 詳細を表示するトグル3
if (document.getElementById('toggle-details-3')) {
    document.getElementById('toggle-details-3').addEventListener('click', function() {
        var details = document.getElementById('additional-details-3');
        this.setAttribute('aria-expanded', details.style.display === 'none' ? 'true' : 'false');
        
        if (details.style.display === 'none') {
            details.style.display = 'block';
            this.textContent = '詳細を閉じる';
        } else {
            details.style.display = 'none';
            this.textContent = '追加作業の詳細を見る';
        }
    });
}

// 詳細を表示するトグル4
if (document.getElementById('toggle-details-4')) {
    document.getElementById('toggle-details-4').addEventListener('click', function() {
        var details = document.getElementById('additional-details-4');
        this.setAttribute('aria-expanded', details.style.display === 'none' ? 'true' : 'false');
        
        if (details.style.display === 'none') {
            details.style.display = 'block';
            this.textContent = '詳細を閉じる';
        } else {
            details.style.display = 'none';
            this.textContent = '追加作業の詳細を見る';
        }
    });
}

// スクロール検出でトップに戻るボタンの表示/非表示
window.addEventListener('scroll', function() {
    checkScroll();
});

// スクロール位置によるUIの更新
function checkScroll() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
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

// キーボードによるトグルボタン操作
document.querySelectorAll('.see-more').forEach(function(toggle) {
    toggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

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