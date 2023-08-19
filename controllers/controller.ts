import { CollectionReference } from "firebase/firestore";

abstract class Controller {
  _collectionName? : string;
  _ref? : CollectionReference;
}

export default Controller;