/**
 * DOM Manipulation Tools for SitePilot AI
 * These functions are called by the agent to interact with the page.
 */

export const scrollToSection = (id: string): boolean => {
    const sectionId = id.replace('#', '');
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        return true;
    }
    return false;
};

export const highlightElement = (id: string): boolean => {
    const elementId = id.replace('#', '');
    const el = document.getElementById(elementId);
    if (el) {
        const originalBorder = el.style.border;
        const originalBoxShadow = el.style.boxShadow;
        const originalTransition = el.style.transition;

        el.style.transition = 'all 0.5s ease';
        el.style.border = '2px solid #3b82f6'; // Tailwind blue-500
        el.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.6)';

        el.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Remove highlight after 2 seconds
        setTimeout(() => {
            el.style.border = originalBorder;
            el.style.boxShadow = originalBoxShadow;
            el.style.transition = originalTransition;
        }, 2000);
        return true;
    }
    return false;
};

export const clickElement = (id: string): boolean => {
    const elementId = id.replace('#', '');
    const clickable = document.getElementById(elementId);
    if (clickable) {
        clickable.click();
        return true;
    }
    return false;
};

export const fillForm = (fieldId: string, value: string): boolean => {
    const elementId = fieldId.replace('#', '');
    const input = document.getElementById(elementId) as HTMLInputElement | HTMLTextAreaElement;

    if (input) {
        // Set value
        const prototype = Object.getPrototypeOf(input);
        const valueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;

        if (valueSetter) {
            valueSetter.call(input, value);
        } else {
            input.value = value;
        }

        // Dispatch events to trigger React/framework listeners
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));

        return true;
    }
    return false;
};

export const scrollWindow = (direction: 'up' | 'down' | 'top' | 'bottom'): boolean => {
    switch (direction) {
        case 'up':
            window.scrollBy({ top: -window.innerHeight / 2, behavior: 'smooth' });
            break;
        case 'down':
            window.scrollBy({ top: window.innerHeight / 2, behavior: 'smooth' });
            break;
        case 'top':
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;
        case 'bottom':
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            break;
        default:
            return false;
    }
    return true;
};

export const navigateToPage = (path: string): boolean => {
    try {
        if (typeof window !== 'undefined') {
            window.location.assign(path);
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
};

export const zoomElement = (id: string): boolean => {
    const elementId = id.replace('#', '');
    const el = document.getElementById(elementId);
    if (el) {
        const originalTransition = el.style.transition;
        const originalTransform = el.style.transform;
        const originalZIndex = el.style.zIndex;

        el.style.transition = 'transform 0.5s ease, z-index 0s';
        el.style.zIndex = '50'; // Bring to front
        el.style.transform = 'scale(1.1)'; // Zoom in 10%

        el.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Reset after 3 seconds
        setTimeout(() => {
            el.style.transform = originalTransform;
            el.style.zIndex = originalZIndex;
            setTimeout(() => {
                el.style.transition = originalTransition;
            }, 500); // Wait for transition to finish
        }, 3000);
        return true;
    }
    return false;
};
