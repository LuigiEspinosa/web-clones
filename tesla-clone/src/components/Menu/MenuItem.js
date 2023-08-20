import "./Menu.css";

function MenuItem({ title }) {
  return (
    <div className="menuItem">
      <ul>
        <li>{title}</li>
      </ul>
    </div>
  );
}

export default MenuItem;
