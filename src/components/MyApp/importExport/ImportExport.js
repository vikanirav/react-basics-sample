//Importing from same file.
import { Link } from "react-router-dom";
import Gallery from "./Gallery";
import { Profile } from "./Gallery";

// import {ProfileComponent, Gallery} from "./Gallery";

export default function ImportExport() {
  return (
    <div>
      <div>
        <Link to="/">Go To Dashboard</Link>
      </div>
      <div>
        <Gallery />
      </div>
    </div>
  );
}
