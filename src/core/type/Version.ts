export class Version {
  constructor(
    public readonly major: number,
    public readonly minor: number,
    public readonly patch: number,
    public readonly prerelease?: string,
    public readonly meta?: string,
  ) {
  }

  equals(other: Version): boolean {
    return this.major === other.major &&
      this.minor === other.minor &&
      this.patch === other.patch &&
      this.prerelease === other.prerelease &&
      this.meta === other.meta
  }

  lessThan(other: Version): boolean {
    if (this.major < other.major) {
      return true
    }

    if (this.major > other.major) {
      return false
    }

    if (this.minor < other.minor) {
      return true
    }

    if (this.minor > other.minor) {
      return false
    }

    if (this.patch < other.patch) {
      return true
    }

    if (this.patch > other.patch) {
      return false
    }

    return false
  }
}
