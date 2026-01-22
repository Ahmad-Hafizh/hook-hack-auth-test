export interface RowData {
  hookImage: string;
  hook: string;
  body1Image: string;
  body1ImageB?: string;
  body1: string;
  body2Image: string;
  body2ImageB?: string;
  body2: string;
  cta: string;
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
