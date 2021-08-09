import { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useMount, useDebounce } from "utils";
import * as qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debouncedParam = useDebounce(param, 200);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client("users", { data: cleanObject(debouncedParam) }).then(setUsers);
  });

  return (
    <Container>
      <div>
        <h1>项目列表</h1>
        <SearchPanel
          users={users}
          param={param}
          setParam={setParam}
        ></SearchPanel>
        <List users={users} list={list}></List>
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
