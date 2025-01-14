import Homepage from "./homepage";


export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <Homepage searchParams={searchParams} />
    </div>
  );
}
