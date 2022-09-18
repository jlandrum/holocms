declare interface Dialog {
  closeDialog: () => void;
  uuid: string;
}

type DialogClosedCallback = (uuid: string) => void;

declare const HOLOCMS: any | null = {
  accentColor?: () => string,
  type: string,
}

declare interface Window {
  debugLanguages?: boolean;
}