import { useEffect, useState } from "react";

function Form() {
  const [Formdata, setFormdata] = useState({
    name: "",
    email: "",
    number: "",
    course: "",
  });

  const onDataChange = (e) => {
    setFormdata({
      ...Formdata,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log(Formdata);
  }, [Formdata]);

  return (
    <>
      <label>Name </label>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={Formdata.name}
        onChange={onDataChange}
      ></input>
      <br></br>
      <br></br>
      <label>Email </label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={Formdata.email}
        onChange={onDataChange}
      ></input>
      <br></br>
      <br></br>
      <label>Phone No </label>
      <input
        type="number"
        name="number"
        placeholder="Phone No"
        value={Formdata.number}
        onChange={onDataChange}
      ></input>
      <br></br>
      <br></br>
      <label>Course </label>
      <input
        type="text"
        name="course"
        placeholder="Course"
        value={Formdata.course}
        onChange={onDataChange}
      ></input>
    </>
  );
}

export default Form;
