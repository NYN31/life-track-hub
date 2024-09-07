export interface SubmitionButton {
  text: string;
  width: string;
  type: ButtonType;
  cursor: string;
  isDisable: boolean;
  isLoading: boolean;
}

export interface ClickButton {
  text: string;
  width: string;
  cursor: string;
  isDisable: boolean;
  isLoading: boolean;
  action: () => void;
}

export type ButtonType = 'button' | 'submit' | 'reset';
