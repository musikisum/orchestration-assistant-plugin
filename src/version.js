const version = {
  MAJOR: 0,
  MINOR: 1,
  PATCH: 0,
  toString() {
    return `${this.MAJOR}.${this.MINOR}.${this.PATCH}`;
  }
};

export default version;
