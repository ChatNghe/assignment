import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { randomUser } from "../../service/userService";

export default function RandomUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: any) => {
    if (state !== undefined) {
      return state.users.users.results;
    }
  });
  const [queryValue, setQueryValue] = useState({
    page: 1,
    sort: "",
  });
  const [sortUsers, setSortUsers] = useState(users);

  const handleSort = async (value: string) => {
    setQueryValue({
      page: queryValue.page,
      sort: value,
    });
    let temp = [...users];
    if (value === "") {
      setSortUsers(temp);
    }
    if (value === "fullname") {
      setSortUsers(
        temp.sort((a: any, b: any) => a.name.first.localeCompare(b.name.first))
      );
    }
    if (value === "username") {
      setSortUsers(
        temp.sort((a: any, b: any) =>
          a.login.username.localeCompare(b.login.username)
        )
      );
    }
  };

  const handleClick = async (e: any) => {
    setQueryValue({
      page: +e.target.title,
      sort: queryValue.sort,
    });
  };

  const paginationUser = [];
  if (sortUsers !== undefined) {
    let newUsers = [...sortUsers];
    if (newUsers.length > 100) newUsers.splice(100);
    while (newUsers.length) paginationUser.push(newUsers.splice(0, 10));
  } else if (users !== undefined) {
    let newUsers = [...users];
    if (newUsers.length > 100) newUsers.splice(100);
    while (newUsers.length) paginationUser.push(newUsers.splice(0, 10));
  }

  const searchParams = new URLSearchParams();
  useEffect(() => {
    searchParams.append("page", queryValue.page.toString());
    if (queryValue.sort !== "") searchParams.append("sortBy", queryValue.sort);
    const queryString = searchParams.toString();
    navigate("?" + queryString);
  }, [queryValue]);

  useEffect(() => {
    dispatch(randomUser());
  }, []);
  return (
    <>
      <div className={"head"}>
        <a>Sort by: </a>
        <select
          className={"select"}
          name="sort"
          onChange={(e) => {
            handleSort(e.target.value).then();
          }}
        >
          <option value={""}></option>
          <option value={"fullname"}>Full Name</option>
          <option value={"username"}>Username</option>
        </select>
      </div>
      <div className={"body"}>
        <table className={'table'} id={"users"}>
          <thead>
            <tr>
              <th className={'index'} scope="col">#</th>
              <th className={'fullName'} scope="col">Full name</th>
              <th className={'username'} scope="col">Username</th>
              <th className={'thumbnail'} scope="col">Thumbnail icon</th>
            </tr>
          </thead>
          <tbody>
            {paginationUser[queryValue.page - 1] !== undefined &&
              paginationUser[queryValue.page - 1].map((item, key) => (
                <>
                  <tr>
                    <td className={'index'} scope="row">{(queryValue.page - 1) * 10 + key + 1}</td>
                    <td className={'fullName'}>
                      {item.name.title}. {item.name.first} {item.name.last}
                    </td>
                    <td className={'username'}>{item.login.username}</td>
                    <td className={'thumbnail'}>
                      <img src={`${item.picture.thumbnail}`} />
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>

      <div>
        <ul className="pager">
          {paginationUser.map((item, key) => (
            <>
              <li className="pager__item">
                <a
                  className="pager__link"
                  title={`${key + 1}`}
                  onClick={handleClick}
                  href="#"
                >
                  {key + 1}
                </a>
              </li>
            </>
          ))}
        </ul>
      </div>
    </>
  );
}
