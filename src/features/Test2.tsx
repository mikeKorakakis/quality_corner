import { useModalStore } from "../core/stores/modalStore";

const Test2 = () => {
  const { openModal } = useModalStore();

  const handleOpen = () => {
    openModal(<Dummy id="1" />);
  };

  return (
    <button className="btn-md btn" onClick={() => handleOpen()}>
      Open Modal
    </button>
  );
};

const Dummy = ({ id }: { id: string }) => {
  console.log(id);
  return <div>id</div>;
};

export default Test2;
