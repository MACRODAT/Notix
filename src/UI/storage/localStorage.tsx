import type {user as usr} from '../store/core/core';
 
class session {
    user : usr;
    isLoggedIn : boolean;

    constructor(){
        this.user = {
            userID  : '',
            name : '',
            password : '',
        }
        
        // initially, we are NOT logged IN.
        this.isLoggedIn = false;

        this.checkLS();
    }

    checkLS()
    {
        var idd  = localStorage.getItem('userID');
            
        if (idd !=  null)
        {
                var cr = String(localStorage.getItem('name') ?? '');
                var ex = String(localStorage.getItem('password') ?? '');
                if ( cr !== '')
                {
                    this.login(idd, 
                            cr, 
                            ex);
                }
                else {
                    this.genNoLoginData();
                }
        }
    }

    isLoggedInFunc = () => {
        return this.isLoggedIn;
    }

    signOut()
    {
        this.isLoggedIn = false;

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

        if (this.user.name.length > 0)
        {
            this.isLoggedIn = true;
        }
        console.log(this.user.userID);

        // persist ?
        if (true) // sometimes user does not wish to persist #TODO
        {
            localStorage.setItem('userID', this.user.userID.toString());
            localStorage.setItem('name', this.user.name.toString());
            localStorage.setItem('password', this.user.password.toString());
        }
    }

    genNoLoginData()
    {
        this.user = {userID : '', name : 'loginError', password : ''};
        this.isLoggedIn = false;
    }

}

export default session;