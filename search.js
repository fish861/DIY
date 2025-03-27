/**
 * 検索機能のJavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // ページ読み込み時のフェードイン
    document.body.classList.add('fade-in');
    
    // URLから検索パラメータを取得
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    const category = urlParams.get('category');
    const difficulty = urlParams.get('difficulty');
    
    // 検索フォームに値をセット
    if (query) {
        document.getElementById('search-query').value = query;
    }
    
    if (category) {
        document.getElementById('category-filter').value = category;
    }
    
    if (difficulty) {
        document.getElementById('difficulty-filter').value = difficulty;
    }
    
    // 検索を実行
    if (query || category || difficulty) {
        performSearch(query, category, difficulty);
    } else {
        // 検索パラメータがない場合は、すべてのマニュアルを表示
        displayAllManuals();
    }
    
    // 検索フォームの送信イベントを処理
    document.getElementById('search-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newQuery = document.getElementById('search-query').value;
        const newCategory = document.getElementById('category-filter').value;
        const newDifficulty = document.getElementById('difficulty-filter').value;
        
        // URLパラメータを更新
        const newUrlParams = new URLSearchParams();
        if (newQuery) newUrlParams.set('q', newQuery);
        if (newCategory) newUrlParams.set('category', newCategory);
        if (newDifficulty) newUrlParams.set('difficulty', newDifficulty);
        
        // 履歴にURLを追加してページをリロード
        const newUrl = `${window.location.pathname}?${newUrlParams.toString()}`;
        window.history.pushState({}, '', newUrl);
        
        // 検索を実行
        performSearch(newQuery, newCategory, newDifficulty);
    });
    
    // フィルターの変更イベントを処理
    document.getElementById('category-filter').addEventListener('change', function() {
        document.getElementById('search-form').dispatchEvent(new Event('submit'));
    });
    
    document.getElementById('difficulty-filter').addEventListener('change', function() {
        document.getElementById('search-form').dispatchEvent(new Event('submit'));
    });
});

/**
 * 検索を実行する関数
 * @param {string} query - 検索クエリ
 * @param {string} category - カテゴリフィルター
 * @param {string} difficulty - 難易度フィルター
 */
function performSearch(query, category, difficulty) {
    // ローディング表示を表示
    document.getElementById('loading').style.display = 'block';
    document.getElementById('no-results').style.display = 'none';
    document.getElementById('search-results').innerHTML = '<div id="loading" class="loading"><div class="spinner"></div><p>検索中...</p></div>';
    
    // ローカルストレージからマニュアルデータを取得
    // 実際のアプリケーションでは、サーバーからデータを取得する
    const systemManuals = getSystemManuals();
    const userManuals = JSON.parse(localStorage.getItem('userManuals')) || [];
    const allManuals = [...systemManuals, ...userManuals];
    
    // 検索を実行（1秒後に結果を表示する模擬遅延）
    setTimeout(() => {
        // クエリ、カテゴリ、難易度でフィルタリング
        let results = allManuals;
        
        // キーワード検索
        if (query && query.trim() !== '') {
            const normalizedQuery = query.toLowerCase().trim();
            results = results.filter(manual => {
                return (
                    manual.title.toLowerCase().includes(normalizedQuery) ||
                    manual.description.toLowerCase().includes(normalizedQuery) ||
                    manual.categoryText.toLowerCase().includes(normalizedQuery) ||
                    manual.tools.some(tool => tool.toLowerCase().includes(normalizedQuery)) ||
                    manual.materials.some(material => material.toLowerCase().includes(normalizedQuery)) ||
                    manual.steps.some(step => 
                        step.title.toLowerCase().includes(normalizedQuery) || 
                        step.content.toLowerCase().includes(normalizedQuery)
                    ) ||
                    manual.notes.some(note => note.toLowerCase().includes(normalizedQuery))
                );
            });
        }
        
        // カテゴリフィルター
        if (category && category.trim() !== '') {
            results = results.filter(manual => manual.category === category);
        }
        
        // 難易度フィルター
        if (difficulty && difficulty.trim() !== '') {
            results = results.filter(manual => Number(manual.difficulty) === Number(difficulty));
        }
        
        // 結果を表示
        displaySearchResults(results);
    }, 500);
}

/**
 * 検索結果を表示する関数
 * @param {Array} results - 検索結果の配列
 */
function displaySearchResults(results) {
    const searchResultsContainer = document.getElementById('search-results');
    const resultCountElement = document.getElementById('result-count');
    const loadingElement = document.getElementById('loading');
    const noResultsElement = document.getElementById('no-results');
    
    // ローディング表示を非表示
    loadingElement.style.display = 'none';
    
    // 結果件数を更新
    resultCountElement.textContent = results.length;
    
    // 検索結果がない場合
    if (results.length === 0) {
        searchResultsContainer.innerHTML = '';
        noResultsElement.style.display = 'block';
        return;
    }
    
    // 検索結果がある場合
    noResultsElement.style.display = 'none';
    
    // 結果をHTML形式で表示
    searchResultsContainer.innerHTML = '';
    
    results.forEach(manual => {
        // 難易度の表示用に変換
        let difficultyStars = '';
        for (let i = 0; i < manual.difficulty; i++) {
            difficultyStars += '★';
        }
        for (let i = manual.difficulty; i < 3; i++) {
            difficultyStars += '☆';
        }
        
        // 日付フォーマット
        let formattedDate = '';
        if (manual.createdAt) {
            const createdDate = new Date(manual.createdAt);
            formattedDate = `${createdDate.getFullYear()}年${createdDate.getMonth() + 1}月${createdDate.getDate()}日`;
        } else {
            formattedDate = 'システム登録';
        }
        
        // 説明の長さを制限（100文字まで）
        const shortDescription = manual.description.length > 100 
            ? manual.description.substring(0, 100) + '...' 
            : manual.description;
        
        const manualCard = document.createElement('div');
        manualCard.className = 'manual-card';
        manualCard.innerHTML = `
            <div class="manual-img">${manual.thumbnail || '📖'}</div>
            <div class="manual-content">
                <span class="category-label">${manual.categoryText}</span>
                <h3>${manual.title}</h3>
                <div class="difficulty">
                    <span>${difficultyStars}</span>
                </div>
                <p>${shortDescription}</p>
                <div class="manual-meta">
                    <span class="date">${formattedDate}</span>
                </div>
                <a href="${manual.isSystem ? manual.url : 'view-manual.html?id=' + manual.id}" class="btn" style="font-size: 0.9rem; padding: 0.5rem 1rem; margin-top: 1rem;">詳細を見る</a>
            </div>
        `;
        
        searchResultsContainer.appendChild(manualCard);
    });
    
    // ページネーションを追加（結果が10件以上の場合）
    if (results.length > 10) {
        addPagination(searchResultsContainer, results.length);
    }
}

/**
 * ページネーションを追加する関数
 * @param {HTMLElement} container - ページネーションを追加するコンテナ要素
 * @param {number} totalItems - 全アイテム数
 * @param {number} itemsPerPage - 1ページあたりのアイテム数
 * @param {number} currentPage - 現在のページ番号
 */
function addPagination(container, totalItems, itemsPerPage = 10, currentPage = 1) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    const paginationElement = document.createElement('div');
    paginationElement.className = 'pagination';
    
    // 前へボタン
    const prevButton = document.createElement('button');
    prevButton.className = `pagination-btn ${currentPage === 1 ? 'disabled' : ''}`;
    prevButton.textContent = '前へ';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', function() {
        if (currentPage > 1) {
            // 前のページに移動するロジック
            // 実際の実装では、URLパラメータを更新するなど
        }
    });
    paginationElement.appendChild(prevButton);
    
    // ページ番号ボタン
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.className = `pagination-btn ${i === currentPage ? 'current' : ''}`;
        pageButton.textContent = i;
        pageButton.addEventListener('click', function() {
            if (i !== currentPage) {
                // ページを切り替えるロジック
                // 実際の実装では、URLパラメータを更新するなど
            }
        });
        paginationElement.appendChild(pageButton);
    }
    
    // 次へボタン
    const nextButton = document.createElement('button');
    nextButton.className = `pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`;
    nextButton.textContent = '次へ';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', function() {
        if (currentPage < totalPages) {
            // 次のページに移動するロジック
            // 実際の実装では、URLパラメータを更新するなど
        }
    });
    paginationElement.appendChild(nextButton);
    
    container.appendChild(paginationElement);
}

/**
 * すべてのマニュアルを表示する関数
 */
function displayAllManuals() {
    // システムのマニュアルとユーザー作成マニュアルを取得
    const systemManuals = getSystemManuals();
    const userManuals = JSON.parse(localStorage.getItem('userManuals')) || [];
    const allManuals = [...systemManuals, ...userManuals];
    
    // 結果を表示
    displaySearchResults(allManuals);
}

/**
 * システムのマニュアルデータを返す関数
 * 実際のアプリケーションでは、サーバーからデータを取得する
 * @returns {Array} システムのマニュアルデータの配列
 */
function getSystemManuals() {
    // トップページに表示されているマニュアルデータ
    return [
        {
            id: 'flooring',
            title: 'フローリングの張替え',
            category: 'interior',
            categoryText: '内装・リフォーム関連',
            difficulty: 3,
            description: '古いフローリングの撤去から新しいフローリングの施工まで、プロ級の仕上がりを目指します。',
            thumbnail: '🪵',
            tools: ['ハンマー', 'バール', 'ノコギリ', '電動ドリル', 'コーキングガン'],
            materials: ['フローリング材', '下地材', '釘', '接着剤', '養生テープ'],
            steps: [
                { number: 1, title: '準備と古いフローリングの撤去', content: '作業スペースを確保し、家具を移動します。古いフローリングを慎重に撤去します。' },
                { number: 2, title: '下地の確認と修正', content: '下地の状態を確認し、必要に応じて修正や補強を行います。' },
                { number: 3, title: '新しいフローリングの施工', content: '新しいフローリング材を適切な位置に配置し、固定します。' },
                { number: 4, title: '仕上げと清掃', content: '端部の処理や巾木の取り付けを行い、清掃して完成です。' }
            ],
            notes: ['作業中は手袋を着用してください', '電動工具の使用には十分注意してください', '廃材は適切に処分してください'],
            isSystem: true,
            url: 'flooring.html',
            createdAt: '2024-01-15T09:00:00.000Z'
        },
        {
            id: 'painting',
            title: '壁のペンキ塗り',
            category: 'interior',
            categoryText: '内装・リフォーム関連',
            difficulty: 2,
            description: '部屋の印象を大きく変える壁のペンキ塗り。下地処理から塗装までのコツを解説します。',
            thumbnail: '🎨',
            tools: ['ローラー', 'ハケ', 'ペンキトレイ', 'マスキングテープ', '脚立'],
            materials: ['ペンキ', 'プライマー', '養生シート', 'サンドペーパー', 'パテ'],
            steps: [
                { number: 1, title: '準備と養生', content: '家具を移動し、床や家具にシートをかけて養生します。' },
                { number: 2, title: '下地処理', content: '壁の汚れを落とし、穴や傷があればパテで埋めます。サンドペーパーで表面を滑らかにします。' },
                { number: 3, title: 'プライマー塗布', content: 'プライマーを塗って下地を整えます。十分に乾かしてください。' },
                { number: 4, title: 'ペンキ塗り', content: '均一にペンキを塗ります。必要に応じて2回塗りします。' }
            ],
            notes: ['換気をよくして作業してください', '乾燥時間を十分に取ってください', 'ペンキの廃棄は自治体のルールに従ってください'],
            isSystem: true,
            url: 'painting.html',
            createdAt: '2024-01-20T09:00:00.000Z'
        },
        {
            id: 'toilet',
            title: 'トイレの設置方法',
            category: 'plumbing',
            categoryText: '水回り関連',
            difficulty: 2,
            description: '古いトイレの撤去から新しいトイレの設置まで、詳細な手順を解説しています。',
            thumbnail: '🚽',
            tools: ['モンキーレンチ', 'シリコンコーキング', 'プライヤー', 'スパナ', 'ドライバー'],
            materials: ['新しいトイレ', 'トイレフランジ', 'ワックスリング', 'ボルト', 'パイプテープ'],
            steps: [
                { number: 1, title: '準備と古いトイレの撤去', content: '水を止め、タンクを空にし、給水管を外します。古いトイレを撤去します。' },
                { number: 2, title: 'フランジの確認と準備', content: 'フロアフランジの状態を確認し、必要に応じて交換します。' },
                { number: 3, title: '新しいトイレの設置', content: 'ワックスリングを取り付け、新しいトイレを設置します。ボルトで固定します。' },
                { number: 4, title: '給水管の接続と確認', content: '給水管を接続し、水漏れがないか確認します。' }
            ],
            notes: ['作業前に水を必ず止めてください', '水漏れテストは必ず行ってください', '重いので持ち上げる際は注意してください'],
            isSystem: true,
            url: 'toilet.html',
            createdAt: '2024-02-10T09:00:00.000Z'
        },
        {
            id: 'lighting',
            title: '照明器具の交換方法',
            category: 'electrical',
            categoryText: '電気関連',
            difficulty: 2,
            description: '照明器具の種類や電気工事の基本知識から実際の交換手順まで解説しています。',
            thumbnail: '💡',
            tools: ['ドライバー', '電圧テスター', '絶縁テープ', 'ワイヤーストリッパー', '脚立'],
            materials: ['新しい照明器具', '配線コネクター', '絶縁テープ'],
            steps: [
                { number: 1, title: '準備と安全確認', content: 'ブレーカーを落とし、電源が切れていることを確認します。' },
                { number: 2, title: '古い照明器具の取り外し', content: 'カバーを外し、配線を確認して古い照明器具を取り外します。' },
                { number: 3, title: '新しい照明器具の配線接続', content: '新しい照明器具の配線を天井の配線と接続します。' },
                { number: 4, title: '照明器具の取り付けと動作確認', content: '器具を天井に固定し、ブレーカーを入れて動作確認をします。' }
            ],
            notes: ['必ずブレーカーを落としてから作業してください', '配線の接続は確実に行ってください', '不安な場合は専門家に依頼してください'],
            isSystem: true,
            url: 'lighting.html',
            createdAt: '2024-03-05T09:00:00.000Z'
        },
        {
            id: 'bookshelf',
            title: '簡単な本棚の作り方',
            category: 'furniture',
            categoryText: '家具・収納DIY',
            difficulty: 2,
            description: '初心者でも作れる基本的な本棚の設計から組み立てまでを解説します。',
            thumbnail: '📚',
            tools: ['ドライバー', 'クランプ', 'メジャー', '水平器', 'サンドペーパー'],
            materials: ['木材', 'ネジ', '木工用接着剤', 'ステイン（着色剤）', 'クリアコート'],
            steps: [
                { number: 1, title: '設計と材料準備', content: '必要なサイズを計測し、木材をカットします。' },
                { number: 2, title: '部品の組み立て', content: '側板、棚板、背板を組み立てていきます。' },
                { number: 3, title: '表面仕上げ', content: 'サンドペーパーで表面を滑らかにし、必要に応じて着色します。' },
                { number: 4, title: '設置と最終確認', content: '壁に固定し、水平を確認して完成です。' }
            ],
            notes: ['木材は使用前にしっかり乾燥させてください', '安全のため壁に固定することをおすすめします', '塗料は十分な換気のもとで使用してください'],
            isSystem: true,
            url: 'bookshelf.html',
            createdAt: '2024-02-25T09:00:00.000Z'
        },
        {
            id: 'deck',
            title: 'ミニウッドデッキの作り方',
            category: 'exterior',
            categoryText: '外構・庭関連',
            difficulty: 3,
            description: '週末DIYで作れる小型ウッドデッキの設計から施工までを解説します。',
            thumbnail: '🪑',
            tools: ['電動ドリル', 'ドライバー', 'ノコギリ', 'レベル', 'メジャー'],
            materials: ['防腐処理木材', 'デッキ用ネジ', 'コンクリート', '防水シート', 'ステイン（着色剤）'],
            steps: [
                { number: 1, title: '設計と基礎準備', content: 'サイズを決め、地面を整地し、基礎を設置します。' },
                { number: 2, title: '骨組みの構築', content: '基礎の上に防水シートを敷き、骨組みを作ります。' },
                { number: 3, title: 'デッキ板の取り付け', content: '骨組みにデッキ板を固定していきます。' },
                { number: 4, title: '仕上げと防腐処理', content: '端部を処理し、必要に応じてステインを塗ります。' }
            ],
            notes: ['防腐処理された木材を使用してください', '定期的なメンテナンスが必要です', '地面との接触部分は湿気対策をしてください'],
            isSystem: true,
            url: 'deck.html',
            createdAt: '2024-01-30T09:00:00.000Z'
        },
        {
            id: 'wall-repair',
            title: '壁の穴の補修方法',
            category: 'maintenance',
            categoryText: 'メンテナンス・修繕',
            difficulty: 1,
            description: '壁に開いた小さな穴から大きな穴まで、適切な補修方法を解説します。',
            thumbnail: '🧱',
            tools: ['パテナイフ', 'サンドペーパー', 'カッター', 'メジャー', 'ペイントブラシ'],
            materials: ['壁用パテ', '補修用メッシュテープ', '石膏ボード（大きな穴用）', '塗料', 'プライマー'],
            steps: [
                { number: 1, title: '穴の周りの準備', content: '穴の周囲の浮いた部分を取り除き、ザラザラした部分をサンドペーパーで滑らかにします。' },
                { number: 2, title: 'パテの充填', content: '適量のパテを穴に詰め、表面を平らに整えます。' },
                { number: 3, title: '乾燥と研磨', content: 'パテが乾いたら、サンドペーパーで表面を壁と同じ高さになるようにします。' },
                { number: 4, title: '塗装', content: 'プライマーを塗り、乾いたら壁と同じ色の塗料で塗装します。' }
            ],
            notes: ['パテは少量ずつ使うと乾きやすくなります', '大きな穴は石膏ボードで裏打ちする必要があります', '塗料は壁と同じ種類を使用してください'],
            isSystem: true,
            url: 'wall-repair.html',
            createdAt: '2024-03-15T09:00:00.000Z'
        },
        {
            id: 'smart-lighting',
            title: 'スマート照明の導入',
            category: 'smart-home',
            categoryText: 'スマートホーム化・省エネ対策',
            difficulty: 2,
            description: 'スマート電球やスマートスイッチを使った照明のIoT化を解説します。',
            thumbnail: '💡',
            tools: ['ドライバー', '電圧テスター', '脚立', 'スマートフォン'],
            materials: ['スマート電球', 'スマートスイッチ', 'Wi-Fiルーター', 'スマートホームハブ（必要な場合）'],
            steps: [
                { number: 1, title: '互換性の確認', content: '既存の照明器具とスマート電球の互換性を確認します。' },
                { number: 2, title: 'スマート電球の設置', content: 'ブレーカーを落とし、古い電球をスマート電球に交換します。' },
                { number: 3, title: 'アプリのセットアップ', content: '専用アプリをダウンロードし、デバイスを追加してWi-Fiに接続します。' },
                { number: 4, title: '動作確認とシーン設定', content: 'アプリから照明を操作できることを確認し、必要に応じてシーンや自動化を設定します。' }
            ],
            notes: ['Wi-Fi環境が必要です', '電球のワット数と口金サイズを確認してください', '複数メーカーの製品を使用する場合は、互換性を確認してください'],
            isSystem: true,
            url: 'smart-lighting.html',
            createdAt: '2024-03-10T09:00:00.000Z'
        }
    ];
}