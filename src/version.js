const version = {
  MAJOR: 1,
  MINOR: 0,
  PATCH: 1,
  toString() {
    return `${this.MAJOR}.${this.MINOR}.${this.PATCH}`;
  }
};

export default version;
