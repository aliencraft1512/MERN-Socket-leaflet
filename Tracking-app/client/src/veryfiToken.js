import axios from 'axios';

export const verify = () =>{
    const store = JSON.parse(localStorage.getItem('login'));
    if(store) return true
    else return false
}

export const getUser = async () =>{
    const store = JSON.parse(localStorage.getItem('login'));
    let user = null;
    if(store)
    {
      await axios.get('http://localhost:5000/user/me',
       { 
           headers: {
            "x-auth-token" : store.token
           }
       }
       )
        .then(res=>{
           user = res.data
       })
       return user
    }
    else return false

}
export const logout = () =>{
    localStorage.setItem('login','')
}