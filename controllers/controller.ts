import { CollectionReference } from "firebase/firestore";

abstract class Controller {
  _collectionName : string = '';
}

export default Controller;