import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  //localStorage.clear();
  const ref = useRef();
  const urli = useRef();
  const useri = useRef();
  const pi = useRef();
  const [form, useForm] = useState({ url: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);
  const changeVis = () => {
    console.log("fn called");
    const s = ref.current.src;
    console.log(s);
    if (s === "https://cdn-icons-png.flaticon.com/128/10969/10969091.png") {
      console.log("pv");
      alert("Password is Visible");
      ref.current.src =
        "https://cdn-icons-png.flaticon.com/128/10968/10968680.png";
    } else if (
      s === "https://cdn-icons-png.flaticon.com/128/10968/10968680.png"
    ) {
      console.log("cv");
      alert("Password is hidden");
      ref.current.src =
        "https://cdn-icons-png.flaticon.com/128/10969/10969091.png";
    }
  };

  const handleChange = (e) => {
    useForm({ ...form, [e.target.name]: e.target.value });
  };

  const storePass = () => {
    console.log(form);
    if (form != { url: "", username: "", password: "" }) {
      setPasswordArray([...passwordArray, form]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, form])
      );
      console.log(passwordArray);
    }
    useForm({ url: "", username: "", password: "" });
  };

  const deletePass = (indexToDelete) => {
    const updated = passwordArray.filter((_, idx) => idx !== indexToDelete);
    setPasswordArray(updated);
    localStorage.setItem("passwords", JSON.stringify(updated));
  };
  return (
    <>
      <nav className="bg-rgb(234, 255, 234) shadow-sm h-20 flex items-center justify-center gap-230">
        <div className="flex items-center justify-center gap-1">
          <a href="/">
            <img
              src="https://cdn-icons-png.freepik.com/256/14103/14103827.png?uid=R204064089&ga=GA1.1.37188644.1740345148&semt=ais_hybrid"
              className="size-15"
            ></img>
          </a>
          <a href="/">
            <h1 className="text-green-600 font-semibold text-4xl mt-2.5">
              PassMtrX
            </h1>
          </a>
        </div>
        <button className="rounded-2xl">
          <a href="https://github.com/">
            <img
              src="https://cdn-icons-png.freepik.com/256/3291/3291695.png?uid=R204064089&ga=GA1.1.37188644.1740345148&semt=ais_hybrid"
              className="size-15"
            ></img>
          </a>
        </button>
      </nav>
      <h1 className="font-medium text-green-400 text-4xl justify-self-center mt-12">
        Secure Your Passwords in a single MatriX!
      </h1>
      <div className="flex-col justify-self-center justify-center w-1/2 mt-8 h-50">
        <input
          ref={urli}
          type="text"
          placeholder="Enter website URL"
          className="border-2 border-green-400 rounded-4xl w-1/1 h-1/4 mb-4 p-4 focus:border-green-600 focus:outline focus:outline-green-600"
          value={form.url}
          onChange={handleChange}
          name="url"
        ></input>
        <input
          ref={useri}
          type="text"
          placeholder="Enter Username"
          className="border-2 border-green-400 rounded-4xl w-1/1 h-1/4 mb-4 p-4 focus:border-green-600 focus:outline focus:outline-green-600"
          value={form.username}
          onChange={handleChange}
          name="username"
        ></input>
        <div className="relative">
          <input
            ref={pi}
            type="text"
            placeholder="Enter Password"
            className="border-2 border-green-400 rounded-4xl w-1/1 h-1/4 p-4 mb-6 focus:border-green-600 focus:outline focus:outline-green-600"
            value={form.password}
            name="password"
            onChange={handleChange}
          ></input>
          <img
            ref={ref}
            src="https://cdn-icons-png.flaticon.com/128/10969/10969091.png"
            className="absolute size-8 ml-180"
            onClick={changeVis}
          ></img>
        </div>
        <button
          className="rounded-4xl bg-green-400 p-2 w-1/8 hover:bg-green-500 ml-82"
          onClick={storePass}
        >
          Save
        </button>
      </div>
      <h2 className="text-green-400 font-medium mt-24 justify-self-center text-2xl">
        Your Passwords
      </h2>
      {passwordArray.length === 0 && (
        <div className="justify-self-center mt-8">No Passwords to show</div>
      )}
      {passwordArray.length != 0 && (
        <table class="table-auto justify-self-center mt-6 w-1/2 rounded-md overflow-hidden mb-8">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="text-center py-2">Website</th>
              <th className="text-center py-2">Username</th>
              <th className="text-center py-2">Password</th>
              <th className="text-center py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-green-200">
            {passwordArray.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="text-center w-32 py-1 px-2">
                    <a href={item.url} target="_blank">
                      {item.url}
                    </a>
                  </td>
                  <td className="text-center w-52 py-1">{item.username}</td>
                  <td className="text-center w-52 py-1">{item.password}</td>
                  <td className="flex justify-center p-2">
                    <button
                      className="size-7"
                      onClick={() => deletePass(index)}
                    >
                      <img src="https://cdn-icons-png.flaticon.com/128/10995/10995755.png"></img>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
