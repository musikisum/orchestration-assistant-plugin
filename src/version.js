const version = {
  MAJOR: 0,
  MINOR: 9,
  PATCH: 1,
  toString() {
    return `${this.MAJOR}.${this.MINOR}.${this.PATCH}`;
  }
};

export default version;
