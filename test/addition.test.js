const add = require('../src/addition');
const logger = require('../utils/logger');

const delimiters = ["\t", ";", "|", " ", ":", "_", "$", "@", "#", "*", "?", "!", '"', "'", "\\", "/", "[", "]", "{", "}", "<", ">"];


test('adds an empty string to return 0', () => {
    expect(add("")).toBe(0);
});

test('adds "1" to return 1', () => {
    expect(add("1")).toBe(1);
});

test('adds "1,5" to return 6', () => {
    expect(add("1,5")).toBe(6);
});

test('handles new lines between numbers', () => {
    expect(add("1\n2,3")).toBe(6);
});

test('handles multiple numbers', () => {
    expect(add("1,2,3,4,5")).toBe(15);
});

test('supports different delimiters', () => {
    expect(add("//;\n1;2")).toBe(3);
});

test('throws an error for negative numbers', () => {
    expect(() => add("1,-2,3")).toThrow('negative numbers not allowed: -2');
});

test('throws an error for multiple negative numbers', () => {
    expect(() => add("1,-2,-3")).toThrow('negative numbers not allowed: -2,-3');
});

delimiters.forEach((delimiter) => {
    test(`handles numbers separated by "${delimiter}"`, () => {
        const input = `1${delimiter}2${delimiter}3`;
        expect(add(input)).toBe(6);
    });
});