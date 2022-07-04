import React, {useState, useEffect} from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    //dummy method 
    onLogOut: () => {}, 
    onLogIn: (email, password) => {}
});

//named export
export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem('isLoggedIn');

        if (isUserLoggedIn === '1') {
            setIsLoggedIn(true);
        }
    }, []);

    const logOutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    const logInHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };

    return (
        <AuthContext.Provider
            value={
                {
                    isLoggedIn: isLoggedIn, 
                    onLogOut: logOutHandler, 
                    onLogIn: logInHandler
                }
            }
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;