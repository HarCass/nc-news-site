const { formatDate } = require('../src/utils/index');

describe('formatDate()', () => {
    it('should return an empty string if passed one.', () => {
        const result = formatDate('');
        expect(result).toBe('');
    });
    it('should return a formatted date string if passed a non formatted date string.', () => {
        let result = formatDate('2020-11-15T13:25:00.000Z');
        expect(result).toBe('15/11/2020 13:25');

        result = formatDate('2020-10-18T01:26:00.000Z');
        expect(result).toBe('18/10/2020 01:26');
    });
});