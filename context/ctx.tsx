import { useContext, createContext, useRef, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import { parseSync } from '@babel/core';


const AuthContext = createContext<{
    signIn: (email: string, password: string) => Promise<boolean>;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: async () => false,
    signOut: () => null,
    session: null,
    isLoading: false,
});



// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

const signInAction = async (emailEntered: string, passwordEntered: string) => {
    try {
        // Replace this URL with your Xano API endpoint for logging in
        const xanoUrl = "https://xnme-bfhy-y4ex.n7.xano.io/api:QrQJpPSC/auth/login";

        // Make a POST request to Xano
        const response = await fetch(xanoUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailEntered,
                password: passwordEntered
            }),
        });
        console.debug("xanohit");

        // Parse the response
        const data = await response.json();
        console.debug(data.authToken);

        // Check if the login was successful
        if (response.ok) {
            //Alert.alert("Success", "You have successfully logged in!");
            //save('authTokenKey', data.authToken);
            console.debug("authedok");
            return (data.authToken);

        } else {
            // Handle login failure
            // Alert.alert("Error", data.message || "Login failed. Please try again.");
            return (null);
        }
    } catch (error) {
        // Handle request failure
        return (null);
        //Alert.alert("Error", "Something went wrong. Please try again later.");
    }
};

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');


    return (
        <AuthContext.Provider
            value={{
                signIn: async (email: string, password: string) => {
                    // Perform sign-in logic here
                    console.debug("signincalled");
                    try {
                        const authToken = await signInAction(email, password);
                        if (authToken !== null) {
                            console.debug(authToken);
                            setSession(authToken);
                            return true;
                        }
                        else {
                            return false;
                        }
                    } catch (error) {  // Handle request failure
                        return (false);
                        //Alert.alert("Error", "Something went wrong. Please try again later.");
                    }
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );

}
