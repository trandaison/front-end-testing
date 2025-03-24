import { useState } from "react";

type IModalProps = {
  title: string;
  children: React.ReactNode;
  visible?: boolean;
  onClose?: () => void;
}

export function Modal(props: IModalProps) {
  const [visible, setVisible] = useState(props.visible ?? true);

  function onClose() {
    setVisible(false);
    props.onClose && props.onClose();
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50">
      <div className="relative bg-white p-8 rounded-lg w-96">
        <h2 className="mb-3 text-2xl font-bold text-gray-800">{props.title}</h2>

        {props.children}

        <button
          className="absolute z-2 top-2 right-2 text-2xl px-2 w-[32px] h-[32px] hover:bg-gray-200 rounded-full"
          onClick={onClose}
        >&times;</button>
      </div>
    </div>
  )
}
