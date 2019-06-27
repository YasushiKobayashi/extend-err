interface ExtendErrInterface extends Error {
  errorStack?: Error;
}

abstract class ExtendErr extends Error implements ExtendErrInterface {
  errorStack?: Error;

  constructor(message?: string | Error, error?: Error) {
    super(message instanceof Error ? message.toString() : message);

    this.errorStack = error;
    if (message instanceof Error) {
      this.message = message.message;
    }
  }
}

export { ExtendErr as default };
