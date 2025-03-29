import {setupCounter} from './counter';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('setupCounter', () => {
  let element: HTMLButtonElement;

  beforeEach(() => {
    // Create a mock button element before each test
    element = document.createElement('button');
    document.body.appendChild(element);
  });

  afterEach(() => {
    // Clean up the DOM after each test
    document.body.removeChild(element);
  });

  it('should initialize counter to 0', () => {
    setupCounter(element);
    expect(element.innerHTML).toBe('count is 0');
  });

  it('should increment counter on click', () => {
    setupCounter(element);
    element.click();
    expect(element.innerHTML).toBe('count is 1');
  });
});

