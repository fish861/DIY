/**
 * マニュアル作成ページ用JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // ページ読み込み時のフェードイン
    document.body.classList.add('fade-in');
    
    // スクロールイベントの初期チェック
    checkScroll();
    
    // フォーム要素の参照を取得
    const manualForm = document.getElementById('manual-form');
    const previewBtn = document.getElementById('preview-btn');
    const saveBtn = document.getElementById('save-btn');
    const previewModal = document.getElementById('preview-modal');
    const completeModal = document.getElementById('complete-modal');
    const closeModal = document.querySelector('.close-modal');
    const editBtn = document.getElementById('edit-btn');
    const confirmSaveBtn = document.getElementById('confirm-save-btn');
    const viewManualLink = document.getElementById('view-manual-link');
    
    // 絵文字ピッカー
    const emojiInput = document.getElementById('manual-thumbnail');
    const emojiSuggestions = document.querySelectorAll('.emoji-suggestions span');
    
    // 道具・材料・注意点の追加ボタン
    const addToolBtn = document.getElementById('add-tool');
    const addMaterialBtn = document.getElementById('add-material');
    const addNoteBtn = document.getElementById('add-note');
    const addStepBtn = document.getElementById('add-step');
    
    // 絵文字選択のイベントリスナー
    emojiSuggestions.forEach(emoji => {
        emoji.addEventListener('click', function() {
            emojiInput.value = this.textContent;
        });
    });
    
    // 道具追加ボタンのイベントリスナー
    addToolBtn.addEventListener('click', function() {
        const toolsContainer = document.getElementById('tools-container');
        const newToolInput = document.createElement('div');
        newToolInput.className = 'input-with-btn';
        newToolInput.innerHTML = `
            <input type="text" class="tool-item" name="tools[]" placeholder="道具名">
            <button type="button" class="remove-btn">削除</button>
        `;
        toolsContainer.appendChild(newToolInput);
        
        // 最初の削除ボタンを有効化
        const firstRemoveBtn = toolsContainer.querySelector('.remove-btn[disabled]');
        if (firstRemoveBtn) {
            firstRemoveBtn.removeAttribute('disabled');
        }
        
        // 新しい削除ボタンにイベントリスナーを追加
        newToolInput.querySelector('.remove-btn').addEventListener('click', function() {
            newToolInput.remove();
            
            // 要素が1つだけになったら削除ボタンを無効化
            const remainingInputs = toolsContainer.querySelectorAll('.input-with-btn');
            if (remainingInputs.length === 1) {
                remainingInputs[0].querySelector('.remove-btn').setAttribute('disabled', true);
            }
        });
    });
    
    // 材料追加ボタンのイベントリスナー
    addMaterialBtn.addEventListener('click', function() {
        const materialsContainer = document.getElementById('materials-container');
        const newMaterialInput = document.createElement('div');
        newMaterialInput.className = 'input-with-btn';
        newMaterialInput.innerHTML = `
            <input type="text" class="material-item" name="materials[]" placeholder="材料名">
            <button type="button" class="remove-btn">削除</button>
        `;
        materialsContainer.appendChild(newMaterialInput);
        
        // 最初の削除ボタンを有効化
        const firstRemoveBtn = materialsContainer.querySelector('.remove-btn[disabled]');
        if (firstRemoveBtn) {
            firstRemoveBtn.removeAttribute('disabled');
        }
        
        // 新しい削除ボタンにイベントリスナーを追加
        newMaterialInput.querySelector('.remove-btn').addEventListener('click', function() {
            newMaterialInput.remove();
            
            // 要素が1つだけになったら削除ボタンを無効化
            const remainingInputs = materialsContainer.querySelectorAll('.input-with-btn');
            if (remainingInputs.length === 1) {
                remainingInputs[0].querySelector('.remove-btn').setAttribute('disabled', true);
            }
        });
    });
    
    // 注意点追加ボタンのイベントリスナー
    addNoteBtn.addEventListener('click', function() {
        const notesContainer = document.getElementById('notes-container');
        const newNoteInput = document.createElement('div');
        newNoteInput.className = 'input-with-btn';
        newNoteInput.innerHTML = `
            <input type="text" class="note-item" name="notes[]" placeholder="注意点">
            <button type="button" class="remove-btn">削除</button>
        `;
        notesContainer.appendChild(newNoteInput);
        
        // 最初の削除ボタンを有効化
        const firstRemoveBtn = notesContainer.querySelector('.remove-btn[disabled]');
        if (firstRemoveBtn) {
            firstRemoveBtn.removeAttribute('disabled');
        }
        
        // 新しい削除ボタンにイベントリスナーを追加
        newNoteInput.querySelector('.remove-btn').addEventListener('click', function() {
            newNoteInput.remove();
            
            // 要素が1つだけになったら削除ボタンを無効化
            const remainingInputs = notesContainer.querySelectorAll('.input-with-btn');
            if (remainingInputs.length === 1) {
                remainingInputs[0].querySelector('.remove-btn').setAttribute('disabled', true);
            }
        });
    });
    
    // ステップ追加ボタンのイベントリスナー
    let stepCount = 1;
    
    addStepBtn.addEventListener('click', function() {
        stepCount++;
        const stepsContainer = document.getElementById('steps-container');
        const newStepContainer = document.createElement('div');
        newStepContainer.className = 'step-container';
        newStepContainer.innerHTML = `
            <div class="step-header">
                <h3>ステップ ${stepCount}</h3>
                <button type="button" class="remove-step-btn">削除</button>
            </div>
            <div class="form-group">
                <label for="step-${stepCount}-title">ステップタイトル <span class="required">*</span></label>
                <input type="text" id="step-${stepCount}-title" name="steps[${stepCount-1}][title]" required placeholder="ステップのタイトル">
            </div>
            <div class="form-group">
                <label for="step-${stepCount}-content">詳細説明 <span class="required">*</span></label>
                <textarea id="step-${stepCount}-content" name="steps[${stepCount-1}][content]" rows="4" required placeholder="ステップの詳細説明"></textarea>
            </div>
        `;
        stepsContainer.appendChild(newStepContainer);
        
        // 最初のステップの削除ボタンを有効化
        const firstRemoveBtn = stepsContainer.querySelector('.remove-step-btn[disabled]');
        if (firstRemoveBtn) {
            firstRemoveBtn.removeAttribute('disabled');
        }
        
        // 新しい削除ボタンにイベントリスナーを追加
        newStepContainer.querySelector('.remove-step-btn').addEventListener('click', function() {
            newStepContainer.remove();
            
            // ステップ番号を振り直す
            updateStepNumbers();
            
            // 要素が1つだけになったら削除ボタンを無効化
            const remainingSteps = stepsContainer.querySelectorAll('.step-container');
            if (remainingSteps.length === 1) {
                remainingSteps[0].querySelector('.remove-step-btn').setAttribute('disabled', true);
            }
        });
    });
    
    // ステップ番号を更新する関数
    function updateStepNumbers() {
        const steps = document.querySelectorAll('.step-container');
        steps.forEach((step, index) => {
            const stepNumber = index + 1;
            step.querySelector('h3').textContent = `ステップ ${stepNumber}`;
            
            // 入力フィールドの名前も更新
            const titleInput = step.querySelector('input[id^="step-"]');
            const contentTextarea = step.querySelector('textarea[id^="step-"]');
            
            titleInput.name = `steps[${index}][title]`;
            contentTextarea.name = `steps[${index}][content]`;
            titleInput.id = `step-${stepNumber}-title`;
            contentTextarea.id = `step-${stepNumber}-content`;
        });
        
        // ステップカウントを更新
        stepCount = steps.length;
    }
    
    // プレビューボタンのイベントリスナー
    previewBtn.addEventListener('click', function() {
        // バリデーションチェック
        if (!validateForm()) {
            return;
        }
        
        // フォームデータの取得
        const formData = getFormData();
        
        // プレビューの生成と表示
        generatePreview(formData);
        previewModal.style.display = 'block';
    });
    
    // モーダルを閉じるイベントリスナー
    closeModal.addEventListener('click', function() {
        previewModal.style.display = 'none';
    });
    
    // 編集に戻るボタンのイベントリスナー
    editBtn.addEventListener('click', function() {
        previewModal.style.display = 'none';
    });
    
    // 保存ボタンのイベントリスナー
    saveBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // バリデーションチェック
        if (!validateForm()) {
            return;
        }
        
        // フォームデータの取得
        const formData = getFormData();
        
        // プレビューの生成と表示
        generatePreview(formData);
        previewModal.style.display = 'block';
    });
    
    // 保存確認ボタンのイベントリスナー
    confirmSaveBtn.addEventListener('click', function() {
        // フォームデータの取得
        const formData = getFormData();
        
        // ローカルストレージに保存（実際のアプリケーションではサーバーに送信）
        saveManual(formData);
        
        // プレビューモーダルを閉じる
        previewModal.style.display = 'none';
        
        // 完了モーダルを表示
        completeModal.style.display = 'block';
        
        // 作成したマニュアルへのリンクを設定
        viewManualLink.href = `view-manual.html?id=${formData.id}`;
    });
    
    // フォームのバリデーション
    function validateForm() {
        let isValid = true;
        
        // 既存のエラーメッセージをクリア
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
        
        // 必須項目のチェック
        const requiredFields = document.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('input-error');
                
                // エラーメッセージの追加
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = '入力が必要です';
                field.parentNode.appendChild(errorMessage);
            }
        });
        
        // バリデーションエラーがあれば、最初のエラー要素までスクロール
        if (!isValid) {
            const firstError = document.querySelector('.input-error');
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        return isValid;
    }
    
    // フォームデータの取得
    function getFormData() {
        const title = document.getElementById('manual-title').value;
        const category = document.getElementById('manual-category').value;
        const categoryText = document.getElementById('manual-category').options[document.getElementById('manual-category').selectedIndex].text;
        const difficulty = document.querySelector('input[name="manual-difficulty"]:checked').value;
        const description = document.getElementById('manual-description').value;
        const thumbnail = document.getElementById('manual-thumbnail').value;
        
        // 道具リストの取得
        const toolInputs = document.querySelectorAll('.tool-item');
        const tools = Array.from(toolInputs).map(input => input.value).filter(value => value.trim() !== '');
        
        // 材料リストの取得
        const materialInputs = document.querySelectorAll('.material-item');
        const materials = Array.from(materialInputs).map(input => input.value).filter(value => value.trim() !== '');
        
        // ステップの取得
        const stepContainers = document.querySelectorAll('.step-container');
        const steps = Array.from(stepContainers).map((container, index) => {
            return {
                number: index + 1,
                title: container.querySelector(`input[id^="step-"]`).value,
                content: container.querySelector(`textarea[id^="step-"]`).value
            };
        });
        
        // 注意点の取得
        const noteInputs = document.querySelectorAll('.note-item');
        const notes = Array.from(noteInputs).map(input => input.value).filter(value => value.trim() !== '');
        
        // ユニークIDの生成（実際のアプリケーションでは、サーバー側で生成）
        const id = Date.now().toString();
        
        // 作成日時
        const createdAt = new Date().toISOString();
        
        return {
            id,
            title,
            category,
            categoryText,
            difficulty,
            description,
            thumbnail,
            tools,
            materials,
            steps,
            notes,
            createdAt
        };
    }
    
    // プレビューの生成
    function generatePreview(data) {
        const previewContainer = document.getElementById('preview-container');
        
        // 難易度の表示用に変換
        let difficultyStars = '';
        for (let i = 0; i < data.difficulty; i++) {
            difficultyStars += '★';
        }
        for (let i = data.difficulty; i < 3; i++) {
            difficultyStars += '☆';
        }
        
        // プレビューHTMLの生成
        let previewHTML = `
            <div class="preview-manual">
                <div class="preview-header">
                    <h1>${data.title}</h1>
                    <div class="preview-category">${data.categoryText}</div>
                    <div class="preview-difficulty">${difficultyStars}</div>
                    <div class="preview-description">
                        ${data.description}
                    </div>
                </div>
                
                <div class="preview-section">
                    <h2>必要な準備物</h2>
                    <div class="preview-tools-materials">
                        <div class="preview-tools">
                            <h3>道具</h3>
                            <ul class="preview-list">
                                ${data.tools.map(tool => `<li>${tool}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="preview-materials">
                            <h3>材料</h3>
                            <ul class="preview-list">
                                ${data.materials.map(material => `<li>${material}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="preview-section">
                    <h2>作業手順</h2>
                    <div class="preview-steps">
                        ${data.steps.map(step => `
                            <div class="preview-step">
                                <div class="preview-step-number">${step.number}</div>
                                <h3>${step.title}</h3>
                                <div>${step.content}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="preview-section">
                    <h2>注意点</h2>
                    <div class="preview-notes">
                        <h3>作業時の注意事項</h3>
                        <ul class="preview-list">
                            ${data.notes.map(note => `<li>${note}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        previewContainer.innerHTML = previewHTML;
    }
    
    // マニュアルの保存
    function saveManual(data) {
        // 既存のマニュアルを取得
        let manuals = JSON.parse(localStorage.getItem('userManuals')) || [];
        
        // 新しいマニュアルを追加
        manuals.push(data);
        
        // ローカルストレージに保存
        localStorage.setItem('userManuals', JSON.stringify(manuals));
        
        // 本番環境では、サーバーにAJAX送信などを行います
        console.log('マニュアルを保存しました:', data);
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
    
    // モーダル外クリックで閉じる
    window.addEventListener('click', function(e) {
        if (e.target === previewModal) {
            previewModal.style.display = 'none';
        }
    });
    
    // キーボードイベント（Escキーでモーダルを閉じる）
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            previewModal.style.display = 'none';
        }
    });
});