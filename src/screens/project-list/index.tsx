import { useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debouncedParam = useDebounce(param, 200);
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  const { data: users } = useUsers();

  return (
    <Container>
      <div>
        <h1>项目列表</h1>
        <SearchPanel
          users={users || []}
          param={param}
          setParam={setParam}
        ></SearchPanel>
        {error ? (
          <Typography.Text type="danger">{error.message}</Typography.Text>
        ) : null}
        {/* antd 中的 Table 组件本身就有一个loading参数 */}
        <List
          loading={isLoading}
          users={users || []}
          dataSource={list || []}
        ></List>
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
