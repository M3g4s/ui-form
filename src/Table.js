import React, { useEffect, useState } from "react";
import "./styles.css";

const Table = (props) => {

  const data = [];

  const  [state,setState] = useState(props.state)
  useEffect(() =>{
      if(state){
          setState(false)
          window.location.reload()
      }
    
  })

  const allStorage = () => {
    var archive = [],
      keys = Object.keys(localStorage),
      i = 0,
      key;

    for (; (key = keys[i]); i++) {
      archive.push(JSON.parse(localStorage.getItem(key)));
    }
    return archive;
  };

  return (
    <div className="App">
      <table>
        <tbody>
          <tr>
            <th>firstName</th>
            <th>LastName</th>
            <th>Total points</th>
          </tr>
        </tbody>
        {allStorage().map((val, key) => {
          return (
            <tbody>
              <tr key={key}>
                <td>{val.firstName}</td>
                <td>{val.lastName}</td>
                <td>{val.totalPoints}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default Table;
