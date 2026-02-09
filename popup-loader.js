// popup-loader.js - Carrega popup externo
(function() {
    'use strict';
    
    // Carregar popup quando DOM estiver pronto
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(carregarPopup, 500);
    });
    
    function carregarPopup() {
        // Criar overlay
        const overlay = document.createElement('div');
        overlay.id = 'popupOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.85);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
        `;
        
        // Criar iframe
        const iframe = document.createElement('iframe');
        iframe.src = 'popup.html';
        iframe.style.cssText = `
            width: 30%;
            max-width: 400px;
            height: 90vh;
            border: none;
            border-radius: 15px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.4);
        `;
        
        // Fechar ao clicar fora
        overlay.onclick = function(e) {
            if (e.target === overlay) {
                fecharPopup();
            }
        };
        
        // Adicionar ao body
        overlay.appendChild(iframe);
        document.body.appendChild(overlay);
        
        // Bloquear rolagem
        document.body.style.overflow = 'hidden';
        
        // Ouvir mensagens do iframe
        window.addEventListener('message', function(e) {
            if (e.data === 'FECHAR_POPUP') {
                fecharPopup();
            }
        });
    }
    
    function fecharPopup() {
        const overlay = document.getElementById('popupOverlay');
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s';
            
            setTimeout(function() {
                document.body.removeChild(overlay);
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }
    
    // Exportar funções para uso externo
    window.PopupLoader = {
        abrir: carregarPopup,
        fechar: fecharPopup
    };
})();