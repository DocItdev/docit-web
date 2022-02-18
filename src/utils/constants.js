export class AsyncStatus {

  static IDLE = new AsyncStatus('idle');
  static LOADING = new AsyncStatus('loading');
  static SUCCESS = new AsyncStatus('success');
  static FAILURE = new AsyncStatus('failure');

  constructor(name) {
    this.name = name;
  }
}