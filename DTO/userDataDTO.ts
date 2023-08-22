type UserDataDTO = {
  uid: string;
  firstName: string;
  lastName: string;
  weight: number;
  height: number;
  gender: string;
  dateOfBirth: string;
};

export default UserDataDTO;

export const mapFromObject = (object: any) : UserDataDTO => {
  return {
    uid: object.uid,
    firstName: object.firstName,
    lastName: object.lastName,
    weight: object.weight,
    height: object.height,
    gender: object.gender,
    dateOfBirth: object.dateOfBirth
  }
}
