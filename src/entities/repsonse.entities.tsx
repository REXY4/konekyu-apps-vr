export interface ResponseAuthEntities<T> {
   status : number,
   data : {
    result :T,
    status : string,
   }
}