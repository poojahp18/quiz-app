import { useRef } from "react";
import "./User.css";

export default function User({ setUsername }) {
  const inputRef = useRef();

  const handleClick = () => {
    setUsername(inputRef.current.value);
  };

  return (
    <div className="startUser">
      <input
        type="text"
        placeholder="Enter your name"
        className="startUsername"
        ref={inputRef}
      />
      <button className="startButton" onClick={() => handleClick()}>
        Start
      </button>
    </div>
  );
}
