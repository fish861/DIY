/**
 * ヘッダー検索機能のJavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    const headerSearchForms = document.querySelectorAll('.header-search-form');
    const photoSearchBtns = document.querySelectorAll('.photo-search-btn');
    const fileInputs = document.querySelectorAll('.photo-search-input');
    
    headerSearchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const searchInput = this.querySelector('.header-search-input');
            
            // 空欄の場合は送信しない
            if (!searchInput.value.trim()) {
                e.preventDefault();
                searchInput.focus();
                return;
            }
            
            // 正常に入力されている場合はフォームをそのまま送信
            // search.html に遷移し、検索処理が行われる
        });
    });
    
    // 写真検索ボタンのイベント設定
    photoSearchBtns.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // 対応するファイル入力をクリック
            fileInputs[index].click();
        });
    });
    
    // ファイル選択時の処理
    fileInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            if (this.files && this.files[0]) {
                // ファイルが選択された場合
                const form = this.closest('form');
                const searchInput = form.querySelector('.header-search-input');
                
                // 選択されたファイル名を検索入力欄に表示（オプション）
                const fileName = this.files[0].name;
                searchInput.value = `写真: ${fileName}`;
                
                // ファイルアイコンを変更して選択済みを示す
                const photoIcon = form.querySelector('.photo-search-btn i, .photo-search-btn span');
                if (photoIcon) {
                    // アイコンまたはテキストを変更
                    photoIcon.textContent = '✓';
                    // スタイルを変更
                    form.querySelector('.photo-search-btn').classList.add('photo-selected');
                }
                
                // フォームを送信
                // 注意: 実際の画像検索実装はサーバーサイドで必要
                form.submit();
            }
        });
    });
    
    // モバイル用の検索タイプ切り替え
    const searchTypeSwitches = document.querySelectorAll('.search-type-switch');
    
    searchTypeSwitches.forEach(switchElem => {
        switchElem.addEventListener('click', function(e) {
            e.preventDefault();
            const form = this.closest('form');
            form.classList.toggle('photo-search-active');
            
            // 切り替え時にラベルを変更
            if (form.classList.contains('photo-search-active')) {
                this.textContent = '📝';
                this.setAttribute('title', 'テキスト検索に切り替え');
            } else {
                this.textContent = '📷';
                this.setAttribute('title', '写真検索に切り替え');
            }
        });
    });
});
