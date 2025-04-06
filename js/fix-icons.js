// 检测Font Awesome图标是否正常加载
document.addEventListener('DOMContentLoaded', function() {
  // 尝试添加Font Awesome的CSS，以防主CDN链接失效
  if (typeof FontAwesome === 'undefined') {
    var alternativeCdns = [
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
      'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css',
      'https://use.fontawesome.com/releases/v6.4.0/css/all.css'
    ];
    
    // 尝试按顺序加载备用CDN
    function loadAlternativeCdn(index) {
      if (index >= alternativeCdns.length) return;
      
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = alternativeCdns[index];
      link.onload = function() {
        console.log('Successfully loaded Font Awesome from alternative CDN: ' + alternativeCdns[index]);
      };
      link.onerror = function() {
        console.log('Failed to load Font Awesome from: ' + alternativeCdns[index]);
        loadAlternativeCdn(index + 1);
      };
      document.head.appendChild(link);
    }
    
    loadAlternativeCdn(0);
  }
  
  // 修复社交图标的显示
  document.querySelector('.btn.m-social-links')?.setAttribute('style', 'display: none !important');
  document.querySelectorAll('.social-icons, .social-links').forEach(function(el) {
    el.setAttribute('style', 'display: block !important; visibility: visible !important; opacity: 1 !important;');
  });
}); 