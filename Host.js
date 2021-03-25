class Host {
  constructor(joinCode, ready, start) {
      // device ids contains array of all nicknames of game participants
      this.joinCode = joinCode;
      this.ready = ready;
      this.start = start;
  }
}

export default Host