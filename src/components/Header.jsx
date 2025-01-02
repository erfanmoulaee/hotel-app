import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useState } from "react";
function Header() {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input value={destination} onChange={(e) => setDestination(e.target.value)} type="text" placeholder="whre to go" className="headerSearchInput" name="destination" id="destination" />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown">2023/5/6</div>
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
            {options.adult} adult &bull; {options.children}children &bull; {options.room}room
          </div>
          {openOptions && <GuestOptionList options={options} handleOptions={handleOptions} />}
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionList({ options, handleOptions }) {
  return (
    <div className="guestOptions">
      <OptionItem handleOptions={handleOptions} type="adult" options={options} minLimit={1} />
      <OptionItem handleOptions={handleOptions} type="children" options={options} minLimit={0} />
      <OptionItem handleOptions={handleOptions} type="room" options={options} minLimit={1} />
    </div>
  );
}

function OptionItem({ options, type, minLimit, handleOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button className="optionCounterBtn" disabled={options[type] <= minLimit} onClick={() => handleOptions(type, "dec")}>
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button className="optionCounterBtn" onClick={() => handleOptions(type, "inc")}>
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
