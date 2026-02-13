import React from 'react';

export const PixelCatMinimized = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M2 16H4V14H2V16ZM4 14H6V12H4V14ZM6 12H8V10H6V12ZM8 10H10V8H8V10ZM10 8H12V6H10V8ZM14 6H12V8H14V6ZM16 8H14V10H16V8ZM18 10H16V12H18V10ZM20 12H18V14H20V12ZM22 14H20V18H22V14ZM20 18H2H20Z" fill="white" />
        <rect x="2" y="16" width="20" height="6" fill="black" />
        {/* Simplified Pixel Art Representation of the Black Cat */}
        <path fillRule="evenodd" clipRule="evenodd" d="M4 14H2V18H22V14H20V12H18V10H16V8H14V6H10V8H8V10H6V12H4V14ZM7 14H9V16H7V14ZM15 14H17V16H15V14Z" fill="black" />
        <path d="M7 14H9V16H7V14ZM15 14H17V16H15V14Z" fill="white" />
    </svg>
);

export const PixelCatTalking = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Simplified Pixel Art Representation of the White Cat */}
        <path fillRule="evenodd" clipRule="evenodd" d="M4 14H2V18H22V14H20V12H18V10H16V8H14V6H10V8H8V10H6V12H4V14ZM7 14H9V16H7V14ZM15 14H17V16H15V14Z" fill="white" />
        <path d="M7 14H9V16H7V14ZM15 14H17V16H15V14Z" fill="black" />
    </svg>
);
