import React from "react";
import classNames from "classnames";
import DropdownOption from "./typings/dropdownoption";

interface Props {
  id: string;
  options: DropdownOption[];
  classname?: string;
  onOptionSelected: (option: DropdownOption) => void;
}

const Dropdown: React.FunctionComponent<Props> = (props) => {
  // get selected item text
  const getSelectedItemText = () => {
    let selectedItem = props.options.filter((item) => item.isSelected);
    if (selectedItem) {
      return selectedItem[0].value;
    }

    return null;
  };

  /**
   * render all menu items
   */
  const renderMenuIems = () => {
    return props.options.map((option: DropdownOption) => {
      let id = `${props.id}-item-${option.id}`;
      return (
        <a
          key={id}
          id={id}
          className="dropdown-item"
          href="#"
          onClick={() => {
            props.onOptionSelected(option);
          }}
        >
          {option.value}
        </a>
      );
    });
  };

  return (
    <li id={props.id} className="nav-item dropdown active">
      <a
        className={classNames("nav-link dropdown-toggle", props.classname)}
        href="#"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {getSelectedItemText()}
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        {renderMenuIems()}
      </div>
    </li>
  );
};

export default Dropdown;
