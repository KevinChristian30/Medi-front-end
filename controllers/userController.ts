import { CollectionReference, addDoc, collection } from "firebase/firestore";
import Response from "../models/utility/Response";
import { db } from "../firebase/firebaseConfig";
import Controller from "./controller";
import UserDataDTO from "../DTO/userDataDTO";
import Error from "../models/utility/Error";

class UserDataController extends Controller {
  constructor() {
    super();
    this._collectionName = 'user-data';
    this._ref = collection(db, this._collectionName);
  }
  
  insert = async (userDataDTO : UserDataDTO) : Promise<Response<string>> => {
    let response : Response<string> = new Response<string>();

    if (!this._ref) {
      response.error = new Error('Reference not found');
      
      return response;
    }

    try {
      const result : any = await addDoc(this._ref, {
        ...userDataDTO
      });

      response.payload = result;
    } catch (error) {
      response.error = new Error('Oops, something went wrong');
    }

    return response;
  }

  get = async () : Promise<Response<UserDataDTO>> => {
    let response : Response<UserDataDTO> = new Response<UserDataDTO>();

    // ToDo: Fetch Data and Return as Response

    return response;
  }
}

export default UserDataController;