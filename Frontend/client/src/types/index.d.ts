export interface User{
_id:string,
username:string,
email:string,
role:string,
profilePicture:string
}
export interface Event{
    _id:string,
    title:string,
    description:string,
    location:string,
    startDate:Date,
    endDate:Date,
    bannerImage:string,
    category:string,
    price:Number
    createdBy:{_id:string,
        username:string,
        profilePicture:string,
    }
}