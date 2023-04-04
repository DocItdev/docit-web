export class AsyncStatus {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }

  static IDLE = new AsyncStatus('idle');
  static LOADING = new AsyncStatus('loading');
  static SUCCESS = new AsyncStatus('success');
  static FAILURE = new AsyncStatus('failure');
}

export class MediaFeatures {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  static NONE = new MediaFeatures('');
  static SCREEN_REC = new MediaFeatures('screen-recording');
  static SCREEN_SNIP = new MediaFeatures('snap-a-snip');
  static VOICE_REC = new MediaFeatures('voice-recording');
  static DIAGRAM = new MediaFeatures('diagram');
  static UPLOAD_FILE = new MediaFeatures('upload-file');
}

export const MediaTypes = {
  VIDEO: 'video',
  IMAGE: 'image',
  FILE: 'file',
  AUDIO: 'audio'

}

export const drawerWidth = 270;
export const EMPTY_CONTENT =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
