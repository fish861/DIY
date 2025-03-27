/**
 * マニュアル表示ページ用JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // ページ読み込み時のフェードイン
    document.body.classList.add('fade-in');
    
    // スクロールイベントの初期チェック
    checkScroll();
    
    // URLからマニュアルIDを取得
    const urlParams = new URLSearchParams(window.location.search);
    const manualId = urlParams.get('id');
    
    if (manualId) {
        // マニュアルデータの取得と表示
        loadManual(manualId);
    } else {
        // IDが指定されていない場合、エラーメッセージを表示
        showNotFound();
    }
});

// マニュアルデータの読み込みと表示
function loadManual(manualId) {
    // ローカルストレージからマニュアルデータを取得
    const manuals = JSON.parse(localStorage.getItem('userManuals')) || [];
    const manual = manuals.find(m => m.id === manualId);
    
    if (manual) {
        // マニュアルが見つかった場合、表示
        displayManual(manual);
    } else {
        // マニュアルが見つからない場合、エラーメッセージを表示
        showNotFound();
    }
}

// マニュアルの表示
function displayManual(manual) {
    const manualContainer = document.getElementById('manual-container');
    
    // 難易度の表示用に変換
    let difficultyStars = '';
    for (let i = 0; i < manual.difficulty; i++) {
        difficultyStars += '★';
    }
    for (let i = manual.difficulty; i < 3; i++) {
        difficultyStars += '☆';
    }
    
    // 日付フォーマット
    const createdDate = new Date(manual.createdAt);
    const formattedDate = `${createdDate.getFullYear()}年${createdDate.getMonth() + 1}月${createdDate.getDate()}日`;
    
    // マニュアルHTMLの生成
    let manualHTML = `
        <div class="manual-header">
            <div class="manual-thumbnail">${manual.thumbnail}</div>
            <h1 class="manual-title">${manual.title}</h1>
            <div class="manual-meta">
                <div class="manual-category">${manual.categoryText}</div>
                <div class="manual-difficulty">${difficultyStars}</div>
                <div class="manual-date">作成日: ${formattedDate}</div>
            </div>
            <div class="manual-description">
                ${manual.description}
            </div>
        </div>
        
        <div class="manual-section">
            <h2 class="manual-section-title">必要な準備物</h2>
            <div class="preparation">
                <div class="tools">
                    <h3>道具</h3>
                    <ul>
                        ${manual.tools.map(tool => `<li>${tool}</li>`).join('')}
                    </ul>
                </div>
                <div class="materials">
                    <h3>材料</h3>
                    <ul>
                        ${manual.materials.map(material => `<li>${material}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="manual-section">
            <h2 class="manual-section-title">作業手順</h2>
            <div class="steps">
                ${manual.steps.map(step => `
                    <div class="step">
                        <h3>${step.title}</h3>
                        <div class="step-content">${step.content}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="manual-section">
            <h2 class="manual-section-title">注意点</h2>
            <div class="notes">
                <h3>作業時の注意事項</h3>
                <ul>
                    ${manual.notes.map(note => `<li>${note}</li>`).join('')}
                </ul>
            </div>
        </div>
        
        <div class="manual-contribution">
            このマニュアルは、ユーザーによって作成されました。
        </div>
    `;
    
    // ローディング表示を削除して、マニュアルを表示
    manualContainer.innerHTML = manualHTML;
    
    // ページタイトルを更新
    document.title = `${manual.title} | 住宅設備マニュアル`;
}

// マニュアルが見つからない場合の表示
function showNotFound() {
    document.getElementById('manual-container').style.display = 'none';
    document.getElementById('not-found').style.display = 'block';
}

// スクロール時の処理
window.addEventListener('scroll', function() {
    checkScroll();
});

// スクロール位置によるUIの更新
function checkScroll() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    // トップに戻るボタンの表示/非表示
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
}