import Viewer from "../_components/viewer";

export default function page({ params }: { params: { id: string } }) {

  return (
    <div className="grid place-items-center">
      <Viewer id={params.id} />
    </div>
  );
}