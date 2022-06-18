import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { IconContext } from "react-icons";
import Wrapper from "../assets/wrappers/SettingPage";
import Nav from "../components/Nav/Nav";
import { Alert } from "../components";
import Bar from "../components/Bar";

function Profile() {
  const [data, setData] = useState({
    preview: "https://thispersondoesnotexist.com/image",
  });
  const misc = useSelector((state) => state.misc);
  const user = useSelector((state) => state.auth.user);
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
        {misc.showAlert && <Alert />}
        <form>
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
                <input
                  className="text-orange-700 my-2 font-bold"
                  value={user.bio}
                />
                <ul className="permanent-info m-2">
                  <li> {user.firstName + " " + user.lastName}</li>
                  <li>{user.dob}</li>
                  <li>Email : {user.email}</li>
                </ul>
              </div>
            </aside>
            <main role="main" className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
              <h3 className="m-3">Profile</h3>
              <div className="grid grid-cols-2 gap-4 mx-10">
                <div className="grid grid-row-2">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <div onChange={onChange} className="flex">
                    <div className="flex items-center mr-4">
                      <input
                        id="gender"
                        type="radio"
                        value="male"
                        name="gender"
                        defaultChecked
                        className="radio"
                      />
                      <label htmlFor="gender" className="ml-2">
                        Male
                      </label>
                    </div>
                    <div className="flex items-center mr-4">
                      <input
                        id="gender"
                        type="radio"
                        value="female"
                        name="gender"
                        className="radio"
                      />
                      <label htmlFor="gender" className="ml-2">
                        Female
                      </label>
                    </div>
                    <div className="flex items-center mr-4">
                      <input
                        id="gender"
                        type="radio"
                        value="other"
                        name="gender"
                        className="radio"
                      />
                      <label htmlFor="gender" className="ml-2">
                        Other
                      </label>
                    </div>
                  </div>
                </div>
                <div className="grid grid-row-2">
                  <label htmlFor="age" className="form-label">
                    Date of Birth
                  </label>
                  <input />
                </div>
              </div>
            </main>
          </div>
        </form>
      </div>
    </Wrapper>
  );
}

export default Profile;
