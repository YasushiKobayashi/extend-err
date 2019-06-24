import ExtendErr from './extend-err';

describe('ExtendErr', () => {
  it('define custom error', () => {
    const test = 'test';
    const e = new ExtendErr(test);
    expect(e.name).toBe('ExtendErr');
    expect(e.message).toBe(test);
    expect(e instanceof ExtendErr).toBe(true);
  });

  it('throw error', () => {
    const builtinError = 'builtinError';
    try {
      try {
        throw new Error(builtinError);
      } catch (e) {
        throw new ExtendErr(e);
      }
    } catch (e) {
      expect(e.name).toBe('ExtendErr');
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
          throw new ExtendErr(customError1, e);
        }
      } catch (e) {
        throw new ExtendErr(customError2, e);
      }
    } catch (e) {
      expect(e.name).toBe('ExtendErr');
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
