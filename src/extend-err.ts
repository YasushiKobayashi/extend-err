interface ExtendErrInterface extends Error {
  errorStack?: Error;
}

class ExtendErr extends Error implements ExtendErrInterface {
  errorStack?: Error;

  constructor(message?: string | Error, error?: Error) {
    super(message instanceof Error ? message.toString() : message);

    this.errorStack = error;
    if (message instanceof Error) {
      this.message = message.message;
    }

    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export { ExtendErr as default };
