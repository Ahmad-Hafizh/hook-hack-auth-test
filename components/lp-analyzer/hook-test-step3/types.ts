export interface RowData {
  hookImage: string;
  hookMessage: string;
  body1Image: string;
  body1Message: string;
  body2Image: string;
  body2Message: string;
  ctaMessage: string;
}

export interface Sheet {
  id: string;
  name: string;
  data: RowData[];
}

export interface ModalOptions {
  type: "danger" | "success" | "info" | "input";
  title: string;
  message: string;
  inputValue?: string;
  inputPlaceholder?: string;
  buttons?: ModalButton[];
}

export interface ModalButton {
  text: string;
  primary?: boolean;
  onClick?: (inputValue?: string) => void;
}

export interface ImageSlotInfo {
  rowIndex: number;
  imageType: "hookImage" | "body1Image" | "body2Image";
  currentUrl?: string;
}
