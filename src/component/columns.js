import { Checkbox } from "antd";
const Checkbox = () => <Checkbox />;

const onChange = (e) => {
  console.log("e", e);
};

export const columns = [
  {
    name: (
      <Checkbox
        onChange={onChange}
        tier={"all"}
        // checked={

        // }
      ></Checkbox>
    ),
    dataId: (
      <input type="checkbox" id="vehicle2" name="vehicle1" value="Bike"></input>
    ),
  },
  {
    name: "Name",
    dataId: "tier_name",
  },
  {
    name: "Category",
    dataId: "tier_category_name",
  },
];
