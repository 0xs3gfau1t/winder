import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { IconContext } from "react-icons";
import Wrapper from "../assets/wrappers/SettingPage";
import Nav from "../components/Nav/Nav";
import Bar from "../components/Bar";

function Setting() {
  const [data, setData] = useState({
    preview: "https://thispersondoesnotexist.com/image",
  });
  const onChange = (e) => {
    let file = e.target.files[0];
    setData((prev) => ({
      ...prev,
      preview: URL.createObjectURL(file),
      file: e.target.files[0],
    }));
  };
  return (
    <Wrapper>
      <Bar title={"Settings"} />
      <div className="navbarr">
        <Nav current="Settings" />
      </div>
      <div className="container mx-auto">
        <div className="flex flex-row flex-wrap py-4">
          <aside className="w-full sm:w-1/3 md:w-1/4 px-2 border-r-2 h-full">
            <div className="sticky top-0 p-4 w-full profile-form">
              <img className="h-76 w-76" src={data.preview} />
              <label className="change-dp" htmlFor="upload">
                <IconContext.Provider value={{ color: "cyan", size: "2em" }}>
                  <MdEdit />
                </IconContext.Provider>
              </label>
              <input
                id="upload"
                type="file"
                accept="image/*"
                name="file"
                onChange={onChange}
              />
              <ul className="permanent-info m-2">
                <li>First Name : Ramri</li>
                <li>Last Name : Nani</li>
                <li>Email : ramri@nani.com</li>
              </ul>
            </div>
          </aside>
          <main role="main" className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
            <h3 className="m-3">Profile</h3>
          </main>
        </div>
      </div>
    </Wrapper>
  );
}

export default Setting;
