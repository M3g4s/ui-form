import logo from "./logo.svg";
import "./App.css";
import DropDown from "./DropDown";
import Table from "./Table";
import { useEffect, useState } from "react";
import { INTERNET, MOBILE, ROUTER } from "./constants";


function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [product, setProduct] = useState("");
  const [isSubmitted,setIsSubmitted] = useState(false)
  let localPoints = 0;

  useEffect(() => {
   checkPoints()
  });

  const submitForm = () => {
    let productPrice = checkPrice(product);
    const points = checkRewardPoints(productPrice);
    let totalPoints = points+localPoints;
    if (checkValidation()) {
      const data = {
        firstName: firstName.toString(),
        lastName: lastName.toString(),
        middleName: middleName.toString(),
        product:product,
        price:productPrice,
        points: points,
        totalPoints:totalPoints
      };
      window.localStorage.setItem(firstName,JSON.stringify(data));
      checkPoints()
      setIsSubmitted(true)
      alert("you have got " + points + " points for this purchase and Total Points :"+ totalPoints);
    }
  };

  const checkPoints = () =>{
    const data = window.localStorage.getItem(firstName)
    if(data != null){
      const localData = JSON.parse(data)
      localPoints = localData.points
    }
  }

  const checkValidation = () => {
    if (firstName.length == 0) {
      alert("Please Enter First Name");
      return false;
    } else if (lastName.length == 0) {
      alert("Please Enter Last Name");
      return false;
    } else if(product === "Choose one"){
      alert("Please Select the product");
      return false;
    }
    else {
      return true;
    }
  };

  const checkPrice = (product) => {
    switch (product) {
      case "Internet":
        return INTERNET;
      case "Mobile":
        return MOBILE;
      case "Router":
        return ROUTER;
    }
  };

  const checkRewardPoints = (amount) => {
    let twopoints = (amount - 100) * 2;
    let onepoint = Math.floor(amount / 50 - 1) * 50;
    let sum = twopoints + onepoint;
    return sum;
  };

  return (
    <div className="App">
      <h1>UI Form </h1>
      <form className="Form">
        <label>
          Enter your FirstName *:
          <input
            className="Input"
            value={firstName}
            onInput={(e) => setFirstName(e.target.value)}
            type="text"
          />
        </label>
      </form>
      <form className="Form">
        <label>
          Enter your LastName *:
          <input
            className="Input"
            value={lastName}
            onInput={(e) => setLastName(e.target.value)}
            type="text"
          />
        </label>
      </form>
      <form className="Form">
        <label>
          Enter your MiddleName:
          <input
            className="InputMiddleName"
            value={middleName}
            onInput={(e) => setMiddleName(e.target.value)}
            type="text"
          />
        </label>
      </form>
      <div className="ProductDropDown">
        <label>
          Product :
          <DropDown selectedProduct={setProduct} />
        </label>
      </div>

      <button onClick={() => submitForm()}>Submit</button>

      <Table state={isSubmitted}/>
    </div>
  );
}

export default App;
