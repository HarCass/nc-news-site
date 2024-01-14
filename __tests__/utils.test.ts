import {describe, it, expect} from "vitest";
import formatDate from "../src/utils/formatDate";
import formatStrToTitle from "../src/utils/formatStrToTitle";


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

describe('formatStrToUpper()', () => {
    it('should return an empty string if passed one.', () => {
        const result = formatStrToTitle('');
        expect(result).toBe('');
    });
    it('should return the string with a capital first letter.', () => {
        const result = formatStrToTitle('author');
        expect(result).toBe('Author');
    });
    it('should return "Date" when passed "created_at".', () => {
        const result = formatStrToTitle('created_at');
        expect(result).toBe('Date');
    });
    it('should return "Comments" when passed "comment_count".', () => {
        const result = formatStrToTitle('comment_count');
        expect(result).toBe('Comments');
    });
});