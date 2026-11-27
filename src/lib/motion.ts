/**
 * Script inline que roda antes da primeira pintura: liga as animações de
 * revelação só quando há JS e o usuário não pediu movimento reduzido.
 * Sem ele, o conteúdo marcado com `data-reveal` fica sempre visível (SEO e
 * navegadores sem JS não são afetados).
 */
export const revealBootScript = `(function(){try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&"IntersectionObserver"in window){document.documentElement.setAttribute("data-motion","on")}}catch(e){}})()`;
