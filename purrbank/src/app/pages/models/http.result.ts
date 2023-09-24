export class HttpResult<T>
{
    public result :  T[] = [];
    public success : boolean | undefined;
    public message : string | undefined;

}