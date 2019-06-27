import ExtendErr from './extend-err';

interface CustomErrorInterface extends ExtendErr {}

class CustomError extends ExtendErr implements CustomErrorInterface {
  constructor(message?: string | Error, error?: Error) {
    super(message, error);

    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

describe('ExtendErr', () => {
  it('define custom error', () => {
    const test = 'test';
    const e = new CustomError(test);
    expect(e.name).toBe('CustomError');
    expect(e.message).toBe(test);
    expect(e instanceof CustomError).toBe(true);
  });

  it('throw error', () => {
    const builtinError = 'builtinError';
    try {
      try {
        throw new Error(builtinError);
      } catch (e) {
        throw new CustomError(e);
      }
    } catch (e) {
      expect(e.name).toBe('CustomError');
      expect(e.message).toBe(builtinError);
    }
  });

  it('error stack trace', () => {
    const builtinError = 'builtinError';
    const customError1 = 'customError1';
    const customError2 = 'customError2';
    try {
      try {
        try {
          throw new Error(builtinError);
        } catch (e) {
          throw new CustomError(customError1, e);
        }
      } catch (e) {
        throw new CustomError(customError2, e);
      }
    } catch (e) {
      expect(e.name).toBe('CustomError');
      expect(e.message).toBe(customError2);
      expect(e.errorStack).not.toBeUndefined();
      if (e.errorStack) {
        expect(e.errorStack.message).toBe(customError1);
        expect(e.errorStack.errorStack).not.toBeUndefined();
        if (e.errorStack.errorStack) {
          expect(e.errorStack.errorStack.message).toBe(builtinError);
        }
      }
    }
  });
});
