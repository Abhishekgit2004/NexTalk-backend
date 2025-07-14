class Apiresponse{
    constructor(statusCode,data,message="success",success){
        this.statusCode=statusCode<400;
        this.data=data
        this.message=message
        this.success=true
    }
}
export {Apiresponse}