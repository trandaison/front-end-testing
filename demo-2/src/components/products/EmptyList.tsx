interface IEmptyListProps {
  text?: string;
}

export function EmptyList(props: IEmptyListProps) {
  const { text } = props;

  return (
    <div className="text-center my-40">
      <h1 className="text-gray-500">{text}</h1>
    </div>
  );
}
