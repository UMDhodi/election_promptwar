import '@testing-library/jest-dom';

jest.mock('next/font/google', () => ({
  Inter: () => ({ className: 'inter' }),
  Playfair_Display: () => ({ className: 'playfair' }),
  JetBrains_Mono: () => ({ className: 'jetbrains' }),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn(),
    readText: jest.fn(),
  },
  writable: true,
});