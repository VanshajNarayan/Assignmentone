import { useEffect, useState } from "react";
import "./First.css";

function First() {
  const [usersApi, setUsersApi] = useState([]);
  const API = "https://jsonplaceholder.typicode.com/users";
  async function invokeApi() {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setUsersApi(data);
    } catch (error) {
      console.error("Something went wrong!!!", error);
    }
  }
  useEffect(() => {
    invokeApi();
  }, []);
  function handleClick(id) {
    setUsersApi(usersApi.map(user =>
      user.id === id ? { ...user, active: !user.active } : user
    ));
  };
  return (
    <>
      <section className="Table_chart">
        <h2 className="heading">User Lists</h2>
        <table border="1" className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Active status</th>
            </tr>
          </thead>
          <tbody>
            {usersApi.map((users, index) => {
              return (
                <tr key={index}>
                  <td> {users.name} 
                    {
                      users.active && <div className="checkbox">
                      </div>
                    }
                  </td>
                  <td> {users.email} </td>
                  <td>
                    <button className={users?.active ? "btn active" : "btn" } onClick={() => handleClick(users.id)}>
                      {users?.active ? "Deactive" : "Active"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default First;
