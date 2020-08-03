import http from "../http-common3";

class AuthenticationService {

    //fetch user
    get() {
      return  http.get("/user");
    }
      
    
    
}


export default new AuthenticationService();