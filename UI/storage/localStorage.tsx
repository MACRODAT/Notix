import type {user as usr} from '../store/core/core';
 
class session {
    user : usr;

    constructor(){
        this.user = {
            userID  : '',
            name : '',
            password : ''
        }

        this.checkLS();
    }

    checkLS()
    {
        var idd  = localStorage.getItem('userID');
            
        if (idd !=  null)
        {
                var cr = String(localStorage.getItem('name') ?? '');
                var ex = String(localStorage.getItem('password') ?? '');
                if ( idd !== '')
                {
                    this.login(idd, 
                            cr, 
                            ex);
                }
                else {
                    this.login('', '', '');
                }
        }
    }

    isLoggedIn = () => {
        return this.user.userID !== '';
    }

    signOut()
    {
        this.user.userID = '';
        this.user.name = '';
        this.user.password = '';

        localStorage.setItem('userID', this.user.userID.toString());
        localStorage.setItem('name', this.user.name.toString());
        localStorage.setItem('password', this.user.password.toString());
    }

    login(id:string, name : string, password:string)
    {
        this.user.userID = id;
        this.user.name = name;
        this.user.password = password;

        // persist ?
        if (true) // sometimes user does not wish to persist #TODO
        {
            localStorage.setItem('userID', this.user.userID.toString());
            localStorage.setItem('name', this.user.name.toString());
            localStorage.setItem('password', this.user.password.toString());
        }
    }


}

export default session;