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
}
