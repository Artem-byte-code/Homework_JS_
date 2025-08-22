const Calculator = require('./calculator');

describe('Calculator', () => {
  describe('add', () => {
    it('should add two numbers correctly', () => {
      expect(Calculator.add(2, 3)).toBe(5);
    });

    it('should throw error when arguments are not numbers', () => {
      expect(() => Calculator.add('2', 3)).toThrow('Both arguments must be numbers');
      expect(() => Calculator.add(null, 3)).toThrow('Both arguments must be numbers');
      expect(() => Calculator.add(undefined, 3)).toThrow('Both arguments must be numbers');
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers correctly', () => {
      expect(Calculator.subtract(5, 3)).toBe(2);
    });

    it('should throw error when arguments are not numbers', () => {
      expect(() => Calculator.subtract('5', 3)).toThrow('Both arguments must be numbers');
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers correctly', () => {
      expect(Calculator.multiply(2, 3)).toBe(6);
    });

    it('should throw error when arguments are not numbers', () => {
      expect(() => Calculator.multiply('2', 3)).toThrow('Both arguments must be numbers');
    });
  });

  describe('divide', () => {
    it('should divide two numbers correctly', () => {
      expect(Calculator.divide(6, 3)).toBe(2);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => Calculator.divide(6, 0)).toThrow('Division by zero is not allowed');
    });

    it('should throw error when arguments are not numbers', () => {
      expect(() => Calculator.divide('6', 3)).toThrow('Both arguments must be numbers');
    });
  });
});