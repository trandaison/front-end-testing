import { Spinner } from "./Spinner";

interface ILoadingProps {
  text?: string;
}

export function Loading(props: ILoadingProps) {
  const { text = "Loading..." } = props;

  return (
    <div className="flex justify-center text-center my-40">
      <div className="flex items-center">
        <Spinner className="mr-4 h-8 w-8 text-gray-800" />
        <h1 className="text-gray-500">{text}</h1>
      </div>
    </div>
  );
}
