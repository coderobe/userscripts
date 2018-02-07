// ==UserScript==
// @name         Fix Github Fonts
// @version      1.0
// @description  Fix Github Fonts
// @author       Robin Broda <robin@broda.me>
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

(function() {
    var selectors_sans = [
        'body',
        '.markdown-body',
        '.tooltipped::after',
        '.default-label .sha .ellipses'
    ];
    var selectors_mono = [
        '.blob-code-inner',
        '.blob-num',
        '.file-info',
        '.commit-tease-sha'
    ];

    var styleNode = document.createElement('style');
    var styleText_sans = document.createTextNode(selectors_sans.join(', ') + ' { font-family: sans-serif !important; }');
    var styleText_mono = document.createTextNode(selectors_mono.join(', ') + ' { font-family: monospace !important; }');

    styleNode.type = "text/css";
    styleNode.appendChild(styleText_sans);
    styleNode.appendChild(styleText_mono);

    document.head.appendChild(styleNode);
})();
