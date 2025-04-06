// 专门用于放大About页面标题的脚本
document.addEventListener('DOMContentLoaded', function() {
  // 检查当前是否在About页面
  const pageTitle = document.querySelector('.page-title');
  if (pageTitle && pageTitle.textContent.includes('About Me')) {
    // 应用自定义样式
    pageTitle.style.fontSize = '3.8rem';
    pageTitle.style.textAlign = 'center';
    pageTitle.style.fontWeight = '700';
    pageTitle.style.marginBottom = '1.2em';
    pageTitle.style.color = '#333';
    pageTitle.style.letterSpacing = '0.02em';
    pageTitle.style.textShadow = '1px 1px 3px rgba(0,0,0,0.1)';
  }
}); 