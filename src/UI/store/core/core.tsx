import session from "../../storage/localStorage";

type user = {
    userID : string,
    name : string,
    password : string
};

interface IState {
    user : session,
}

export type {user, IState};

