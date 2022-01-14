import Form from "./Form";
import { useHistory } from "react-router-dom";

export default function Reservations() {
  const history = useHistory();

  function cancel(event) {
    // console.log("cancel test");
    event.preventDefault();
    history.go(-1);
  }
  function submit() {
    console.log("submit test");
  }
  return <Form onCancel={cancel} onSubmit={submit} />;
}
