import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import logo from "./assets/LOGO2.png";
import eyeo from "./assets/eyeo.svg";
import eyec from "./assets/eyec.svg";

function App() {
  //localStorage.clear();
  const ref = useRef();
  const urli = useRef();
  const useri = useRef();
  const pi = useRef();
  const [form, useForm] = useState({ url: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPass = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPass();
  }, []);

  const [visible, setVisible] = useState(true);
  const changeVis = () => {
    if (visible) {
      const prompt = window.confirm("Do you want to hide password?");
      if (prompt) {
        ref.current.src = eyec;
      }
    } else {
      const prompt = window.confirm("Do you want to show password?");
      if (prompt) {
        ref.current.src = eyeo;
      }
    }
    setVisible(!visible);
  };

  const handleChange = (e) => {
    useForm({ ...form, [e.target.name]: e.target.value });
  };

  const storePass = async () => {
    console.log(form);
    if (form.url !== "" && form.username !== "" && form.password !== "") {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });
      /*localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, form])
      );*/
      console.log(passwordArray);
    } else {
      alert("Please fill all the fields");
    }
    useForm({ url: "", username: "", password: "" });
  };

  const deletePass = async (indexToDelete) => {
    const deletedItem = passwordArray[indexToDelete];
    const updated = passwordArray.filter((_, idx) => idx !== indexToDelete);
    setPasswordArray(updated);
    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deletedItem.id }),
    });
  };
  return (
    <>
      <nav className="bg-rgb(253, 215, 203) shadow-sm h-20 flex items-center justify-center gap-220">
        <div className="flex items-center justify-center gap-3">
          <a href="/">
            <img src={logo} alt="Logo" className="size-15 rounded-sm"></img>
          </a>
          <a href="/">
            <h1 className="text-orange-600 font-semibold text-4xl">PassMtrX</h1>
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
      <h1 className="font-medium text-orange-600 text-4xl justify-self-center mt-12">
        Secure Your Passwords in a single MatriX!
      </h1>
      <div className="flex-col justify-self-center justify-center w-1/2 mt-8 h-50">
        <input
          ref={urli}
          id=""
          type="text"
          placeholder="Enter website URL"
          className="border-2 border-orange-600 rounded-4xl w-1/1 h-1/4 mb-4 p-4 focus:border-orange-600 focus:outline focus:outline-orange-600"
          value={form.url}
          onChange={handleChange}
          name="url"
        ></input>
        <input
          ref={useri}
          id=""
          type="text"
          placeholder="Enter Username"
          className="border-2 border-orange-600 rounded-4xl w-1/1 h-1/4 mb-4 p-4 focus:border-orange-600 focus:outline focus:outline-orange-600"
          value={form.username}
          onChange={handleChange}
          name="username"
        ></input>
        <div className="relative">
          <input
            ref={pi}
            id=""
            type="text"
            placeholder="Enter Password"
            className="border-2 border-orange-600 rounded-4xl w-1/1 h-1/4 p-4 mb-6 focus:border-orange-600 focus:outline focus:outline-orange-600"
            value={form.password}
            name="password"
            onChange={handleChange}
          ></input>
          <button className="cursor-pointer">
            <img
              ref={ref}
              src={eyeo}
              className="absolute size-8 top-3.5 left-180"
              onClick={changeVis}
            ></img>
          </button>
        </div>
        <button
          className="rounded-4xl bg-orange-600 p-2 w-1/8 hover:bg-orange-700 text-white ml-82 cursor-pointer"
          onClick={storePass}
        >
          Save
        </button>
      </div>
      <h2 className="text-orange-600 font-medium mt-24 justify-self-center text-2xl">
        Your Passwords
      </h2>
      {passwordArray.length === 0 && (
        <div className="justify-self-center mt-8">No Passwords to show</div>
      )}
      {passwordArray.length != 0 && (
        <table class="table-auto justify-self-center mt-6 w-1/2 rounded-md overflow-hidden mb-8">
          <thead className="bg-orange-700 text-white">
            <tr>
              <th className="text-center py-2">Website</th>
              <th className="text-center py-2">Username</th>
              <th className="text-center py-2">Password</th>
              <th className="text-center py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-orange-200">
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
                      className="size-7 cursor-pointer"
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
