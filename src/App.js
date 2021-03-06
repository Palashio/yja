import React, { useState } from "react";

import firebaseConfig from "./firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import logo from "./logo.png";
import "./App.css";

//function to check whether a given email is valid or not.
const isEmail = (email) => {
  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

//function to check if a string is empty; will be used for input boxes
const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

//app
function App() {
  //these are all of the values we will be sending to firebase. note that the only ones with a default are the address and phone
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [center, setCenter] = useState("");
  let [birth, setBirth] = useState("");
  let [diet, setDiet] = useState("");
  let [needs, setNeeds] = useState("");
  let [address, setAddress] = useState("CITY, STATE, ZIP");
  let [phone, setPhone] = useState("___ - ___ - ___");
  let [errors, setErrors] = useState("");

  //firebase reference, stored under collections called submissions.
  const ref = firebase.firestore().collection("submissions");

  //on submit of the form, checks to see if anything is empty
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    //checks to see if any fields are empty.
    if (isEmpty(email)) setErrors({ email: "Must Not Be Empty" });
    if (isEmpty(name)) setErrors({ name: "Must Not Be Empty" });
    if (isEmpty(birth)) setErrors({ birth: "Must Not Be Empty" });
    if (isEmpty(address)) setErrors({ address: "Must Not Be Empty" });
    if (isEmpty(diet)) setErrors({ diet: "Must Not Be Empty" });
    if (isEmpty(needs)) setErrors({ needs: "Must Not Be Empty" });
    if (isEmpty(phone)) setErrors({ phone: "Must Not Be Empty" });
    if (!isEmail(email)) setErrors({ email: "Email Not Valid" });
    else
      ref.doc(name).set({
        name: name,
        email: email,
        center: center,
        dob: birth,
        diet: diet,
        needs: needs,
        phone: phone,
        address: address,
      });
  };

  return (
    //centered div block will all of the contents
    <div align="left" className="App">
      <br></br>
      <img src={logo} height="200" width="200"></img>
      <br></br>
      <br></br>
      Name:{" "}
      <input
        class="rounded-input"
        type="name"
        name="name"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <br></br>
      {errors.name ? <small>{errors.name}</small> : null}
      <br></br>
      Date of Birth:{" "}
      <input
        class="rounded-input"
        type="date"
        name="birth"
        value={birth}
        onChange={(event) => {
          setBirth(event.target.value);
        }}
      />
      <br></br>
      {errors.birth ? <small>{errors.birth}</small> : null}
      <br></br>
      Phone Number:{" "}
      <input
        class="rounded-input"
        type="phone"
        name="phone"
        value={phone}
        onChange={(event) => {
          setPhone(event.target.value);
        }}
      />
      <br></br>
      {errors.phone ? <small>{errors.phone}</small> : null}
      <br></br>
      Email:{" "}
      <input
        class="rounded-input"
        type="email"
        name="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <br></br>
      {errors.email ? <small>{errors.email}</small> : null}
      <br></br>
      Address:{" "}
      <input
        size="50"
        class="rounded-input"
        value="CITY"
        type="address"
        name="address"
        value={address}
        onChange={(event) => {
          setAddress(event.target.value);
        }}
      />
      <br></br>
      {errors.address ? <small>{errors.address}</small> : null}
      <br></br>
      Dietary Preferences:{" "}
      <input
        size="50"
        class="rounded-input"
        type="diet"
        name="diet"
        value={diet}
        onChange={(event) => {
          setDiet(event.target.value);
        }}
      />
      <br></br>
      {errors.diet ? <small>{errors.diet}</small> : null}
      <br></br>
      Any Special Needs?:{" "}
      <input
        size="50"
        class="rounded-input"
        type="needs"
        name="needs"
        value={needs}
        onChange={(event) => {
          setNeeds(event.target.value);
        }}
      />
      <br></br>
      {errors.needs ? <small>{errors.needs}</small> : null}
      <br></br>
      <button
        class="rounded-input"
        type="submit"
        value="Submit"
        onClick={(event) => handleOnSubmit(event)}
      >
        {" "}
        submit{" "}
      </button>
    </div>
  );
}

export default App;
