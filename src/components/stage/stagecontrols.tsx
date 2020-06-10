import React from "react";

interface Props {
  onVisualizeClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const StageControls: React.FunctionComponent<Props> = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <span className="navbar-brand title">Path finding algorithm</span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown active">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dijkstra's
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">
                Dijkstra's
              </a>
            </div>
          </li>
          <li className="nav-item dropdown active">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Random Bricks
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">
                Blank Terrain
              </a>
              <a className="dropdown-item" href="#">
                Random Bricks
              </a>
              <a className="dropdown-item" href="#">
                J Terrain
              </a>
            </div>
          </li>
          <li className="nav-item dropdown">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className="btn btn-success"
              onClick={props.onVisualizeClick}
            >
              Visualize
            </button>
          </li>
          <li className="nav-item dropdown">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn btn-warning">Reset board</button>
          </li>
          <li className="range">
            <p>Visualizing speed</p>
            <input type="range" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default StageControls;
