export interface SubmitionButton {
  text: string;
  width: string;
  type: ButtonType;
  cursor: string;
  isDisable: boolean;
  isLoading: boolean;
}

export interface ClickButton {
  color: string;
  text: string;
  width: string;
  cursor: string;
  isDisable: boolean;
  isLoading: boolean;
  action: () => void;
  borderRadius?: string;
}

export type ButtonType = 'button' | 'submit' | 'reset';
