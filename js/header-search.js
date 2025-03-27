/**
 * ヘッダー検索機能のJavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    const headerSearchForms = document.querySelectorAll('.header-search-form');
    
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
});
