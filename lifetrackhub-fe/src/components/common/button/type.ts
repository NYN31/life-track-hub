export interface SubmitionButton {
  text: string;
  width: string;
  type: ButtonType;
  cursor: string;
  isDisable: boolean;
  isLoading: boolean;
}

export type ButtonType = 'button' | 'submit' | 'reset';
