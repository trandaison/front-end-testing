import * as utils from '../index';

describe('utils', () => {
  describe('#sleep', () => {
    it('should resolve after 1000ms', async () => {
      const start = Date.now();
      await utils.sleep(1000);
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(1000);
    });
  });

  describe('#formatDateTime', () => {
    it('should return null for invalid date', () => {
      const result = utils.formatDateTime('invalid date');
      expect(result).toBeNull();
    });

    it('should return formatted date', () => {
      const result = utils.formatDateTime('2021-01-01T00:00:00Z');
      expect(result).toBe('1/1/2021, 7:00:00 AM');
    });

    it('should return formatted date with custom locale', () => {
      const result = utils.formatDateTime('2021-01-01T00:00:00Z', 'fr-FR');
      expect(result).toBe('01/01/2021 07:00:00');
    });
  });

  describe('#toRelativeTime', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(1700000001000);
    });

    afterAll(() => {
      vi.useRealTimers();
    });

    describe('when date is in the future', () => {
      it('should return seconds from now', () => {
        const date = new Date(1700000002000);
        const result = utils.toRelativeTime(date);
        expect(result).toBe('1 seconds from now');
      });
    });

    describe('when date is in the past', () => {
      it('should return seconds ago', () => {
        const date = new Date(1700000000000);
        const result = utils.toRelativeTime(date);
        expect(result).toBe('1 seconds ago');
      });
    });

    describe('when date is now', () => {
      it('should return just now', () => {
        const date = new Date();
        const result = utils.toRelativeTime(date);
        expect(result).toBe('just now');
      });
    });

    describe('the difference is less than a second', () => {
      it('should return just now', () => {
        const date = new Date(1700000000999);
        const result = utils.toRelativeTime(date);
        expect(result).toBe('just now');
      });
    });
  });
});
