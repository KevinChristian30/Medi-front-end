import { Firestore, addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import Response from "../models/utility/Response";
import { db } from "../firebase/firebaseConfig";
import Controller from "./controller";
import UserDataDTO, { mapFromObject } from "../DTO/userDataDTO";
import Error from "../models/utility/Error";

class UserDataController extends Controller {
  constructor() {
    super();
    this._collectionName = 'user-data';
  }
  
  insertOrUpdate = async (userDataDTO : UserDataDTO) : Promise<Response<string>> => {
    let response : Response<string> = new Response<string>();

    try {
      const result : any = await setDoc(doc(db,  this._collectionName, userDataDTO.uid), {
        ...userDataDTO
      });

      response.payload = result;
    } catch (error) {
      response.error = new Error('Oops, something went wrong');
    }

    return response;
  }

  findByUID = async (uid: string) : Promise<Response<UserDataDTO>> => {
    let response: Response<UserDataDTO> = new Response<UserDataDTO>();

    try {
      const docRef = doc(db, this._collectionName, uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) response.payload = mapFromObject(docSnap.data());
      else response.error = new Error('');
    } catch (error) {
      response.error = new Error('Failed Saving Data');
    }

    return response;
  }
}

export default UserDataController;