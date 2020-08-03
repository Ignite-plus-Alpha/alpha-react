import http from "../http-common2";

class ProfileService {

//get user by email id
getProfileByEmailId(emailId){

    return http.get(`/user/${emailId}`)
  
  }   
  //get user address userId id
getAddressesByUserId(userId){

  return http.get(`/address/${userId}`)

}    
  //get user address userId id
  getWalletsByUserId(userId){

    return http.get(`/wallet/${userId}`)
  
  } 

    //delete card by userId cardId
    deleteCardByUserIdWalletId(userId,walletId){

      return http.delete(`/wallet/${userId}/${walletId}`)
    
    }

        //delete card by userId cardId
        deleteAddressByUserIdAddressId(userId,addressId){

          return http.delete(`/address/${userId}/${addressId}`)
        
        }


        //update profile default address by emailId
        setDefaultAddressByEmailId(emailId,data){
          return http.put(`/user/address/${emailId}`,data)        
        }
      //update profile default wallet by emailId
       setDefaultWalletByEmailId(emailId,data){
        return http.put(`/user/wallet/${emailId}`,data)        
      }
      //addWallet
      createWallet(data){
        return http.post(`/wallet`,data)
      }
      //addAddress
      createAddress(data){
        return http.post(`/address`,data)
      }
      //update profile
      updateProfile(emailId,data){
        return http.put(`/user/${emailId}`,data)
      }
      //update Wallet Expiry
      updateWalletExpiry(userId,walletId,data){
        return http.put(`/wallet/${userId}/${walletId}`,data)
      }
      
      //update Address 
      updateAddress(userId,addressId,data){
        return http.put(`/address/${userId}/${addressId}`,data)
      }
            
      

        
}
export default new ProfileService();