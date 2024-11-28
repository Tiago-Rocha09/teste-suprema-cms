export type ModalConfigProps = {
  onConfirm: ({ bgColor }: { bgColor: string }) => void;
  onCancel: () => void;
};
