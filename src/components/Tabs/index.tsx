import { Button } from "antd";
import { useState } from "react";
import style from "./style.module.scss";
type Props = {
  onChange: Function;
};

const Tabs = ({ onChange }: Props) => {
  const [active, setActive] = useState(0);
  const tabArr = [
    {
      id: 0,
      label: "All",
    },
    {
      id: 1,
      label: "In Progress",
      color: "primary",
    },
    {
      id: 2,
      label: "Finished",
      color: "success",
    },
  ];

  const onChangeTab = (id: number) => {
    onChange(id);
    setActive(id);
  };

  return (
    <div className={style.tabContainer}>
      <div className={style.left}>
        {tabArr.map((item) => (
          <Button
            size="small"
            type={active === item.id ? "primary" : undefined}
            key={item.id}
            onClick={() => onChangeTab(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>
      {/* <div className={style.right}>
        <Button size="small" onClick={() => onChange(4)}>
          Delete All
        </Button>
      </div> */}
    </div>
  );
};

export default Tabs;
