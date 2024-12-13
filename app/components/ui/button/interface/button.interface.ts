export interface ButtonProps {
  text: string;
  isPending?: boolean;
  type: "submit" | "reset" | "button" | undefined;
}
