export class AsyncStatus {

  static IDLE = new AsyncStatus('idle');
  static LOADING = new AsyncStatus('loading');
  static SUCCESS = new AsyncStatus('success');
  static FAILURE = new AsyncStatus('failure');


  constructor(name) {
    this.name = name;
  }
}

export class MediaFeatures {

  static NONE = new MediaFeatures('');
  static SCREEN_REC = new MediaFeatures('screen-recording');
  static SCREEN_SNIP = new MediaFeatures('snap-a-snip');
  static VOICE_REC = new MediaFeatures('voice-recording');
  static DIAGRAM = new MediaFeatures('diagram');
  static UPLOAD_FILE = new MediaFeatures('upload-file');
  
  constructor(name) {
    this.name = name;
  }
}

export const MediaTypes = {
  VIDEO: 'video',
  IMAGE: 'image',
  FILE: 'file'
}