const version = {
  MAJOR: 1,
  MINOR: 0,
  PATCH: 4,
  toString() {
    return `${this.MAJOR}.${this.MINOR}.${this.PATCH}`;
  }
};

export default version;
