/**
 * DOM Extraction Utility for SitePilot AI
 * Scrapes the visible DOM and converts it into a minimized Markdown representation for the LLM.
 */

export interface StartElementNode {
    type: string;
    content?: string;
    id?: string;
    interactive?: boolean;
}

// Helper to determine if an element is visible
function isElementVisible(el: HTMLElement): boolean {
    if (!el.offsetParent && el.tagName !== 'BODY') return false;
    const style = window.getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
}

// Helper to extract relevant text content
function cleanText(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
}

/**
 * Traverses the DOM and returns a markdown-like string representation.
 * Focuses on headings, paragraphs, interactive elements (buttons, links, inputs).
 */
const MAX_TEXT_LENGTH = 300;
const MAX_DOM_LENGTH = 50000;

export const extractDOM = (): string => {
    if (typeof window === 'undefined') return '';

    let markdown = '';
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode: (node) => {
                const el = node as HTMLElement;
                if (!isElementVisible(el)) return NodeFilter.FILTER_REJECT;
                if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'SVG', 'PATH'].includes(el.tagName)) return NodeFilter.FILTER_REJECT;
                // Prioritize specific tags
                if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'BUTTON', 'A', 'INPUT', 'TEXTAREA', 'LABEL', 'SECTION', 'DIV', 'IMG', 'UL', 'LI'].includes(el.tagName)) {
                    return NodeFilter.FILTER_ACCEPT;
                }
                return NodeFilter.FILTER_SKIP; // Skip container tags but traverse children
            }
        }
    );

    let currentNode = walker.nextNode();

    while (currentNode) {
        if (markdown.length > MAX_DOM_LENGTH) {
            markdown += '\n...[Content Truncated]...';
            break;
        }

        const el = currentNode as HTMLElement;
        const tag = el.tagName;
        const id = el.id ? ` #${el.id}` : '';
        let text = cleanText(el.innerText || (el as HTMLInputElement).value || (el as HTMLInputElement).placeholder || '');

        // Truncate long text
        if (text.length > MAX_TEXT_LENGTH) {
            text = text.substring(0, MAX_TEXT_LENGTH) + '...';
        }

        // Only include elements with meaningful content or interactivity
        if (tag.startsWith('H') && tag.length === 2 && text) {
            const level = '#'.repeat(parseInt(tag[1]));
            markdown += `${level} ${text}${id}\n`;
        } else if (tag === 'P' && text && text.length > 5) { // Filter extremely short paragraphs
            markdown += `${text}\n`;
        } else if (tag === 'BUTTON' || (tag === 'A' && el.getAttribute('href'))) {
            const label = text || el.getAttribute('aria-label') || 'Link';
            markdown += `[${tag}]: ${label}${id}\n`;
        } else if (tag === 'IMG') {
            const alt = el.getAttribute('alt');
            if (alt) {
                markdown += `[IMG]: ${alt}${id}\n`;
            }
        } else if (tag === 'LI' && text) {
            markdown += `- ${text}\n`;
        } else if (tag === 'INPUT' || tag === 'TEXTAREA') {
            const type = el.getAttribute('type') || 'text';
            const placeholder = el.getAttribute('placeholder') || '';
            markdown += `[INPUT ${type}]: ${placeholder || 'field'}${id}\n`;
        } else if (tag === 'SECTION' && id) {
            markdown += `\n--- SECTION: ${id.trim()} ---\n`;
        } else if (tag === 'DIV' && id) {
            markdown += `\n[CONTAINER]: ${id.trim()}\n`;
        }

        currentNode = walker.nextNode();
    }

    return markdown;
};
