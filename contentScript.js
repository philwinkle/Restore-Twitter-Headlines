function processElement(imgElement, altText) {
    var targetDiv = imgElement.closest('[data-testid="card.layoutLarge.media"]');
    if (targetDiv && !targetDiv.hasAttribute('data-headline-injected')) {
        var aTag = targetDiv.querySelector('a');
        if (aTag) {
            var domainSpan = targetDiv.querySelector('span[style="text-overflow: unset;"]');
            var domainText = domainSpan ? domainSpan.innerText.trim() : "";

            var h2 = document.createElement('h2');
            var h2Text = aTag.getAttribute('aria-label').replace(domainText, '').trim();
            h2.style = "font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 1.8rem; padding: 10px; margin: 0; cursor: default;"
            h2.innerText = h2Text;

            var h3 = document.createElement('h3');
            h3.style = "font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 1.2rem; padding: 10px; margin: 0 0 1rem 0; text-overflow: ellipsis; overflow: hidden; display: -webkit-box;-webkit-line-clamp: 2; -webkit-box-orient: vertical; max-height: 2rem; cursor: default;"
            h3.title = altText;
            h3.innerText = altText;

            var newContent = document.createElement('div');
            newContent.appendChild(h2);
            if(altText){
                newContent.appendChild(h3);
            }

            targetDiv.after(newContent);
            targetDiv.setAttribute('data-headline-injected', 'true');
        }
    }
}

// Primary MutationObserver for the whole body
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function (node) {
            // Check if the node is an <img> element
            if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'IMG') {
                // Check if the <img> is a child of the target div
                let targetDiv = node.closest('[data-testid="card.layoutLarge.media"]');
                if (targetDiv) {
                    processElement(node, node.alt);
                }
            }
        });
    });
});

// Configuration of the observer:
var config = { childList: true, subtree: true };

// Start observing the target node for configured mutations
observer.observe(document.body, config);
