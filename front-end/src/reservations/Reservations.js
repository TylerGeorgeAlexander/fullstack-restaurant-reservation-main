import Form from "./Form";

export default function Reservations() {
  function cancel() {
    console.log("cancel test");
  }
  function submit() {
    console.log("submit test");
  }
  return <Form onCancel={cancel} onSubmit={submit} />;
}
