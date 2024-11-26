import { router, Link } from 'expo-router';
import { TextInput, Button, Alert, Image, ScrollView, Text, View, Platform } from "react-native";
import { useState } from 'react';
import { useSession } from '../context/ctx';




export default function SignIn() {
    const { signIn } = useSession();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        const signInWorked = await signIn(email, password);
        if (signInWorked) {
            router.replace('/');
        }
    };


    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', }}>
            <View>
                <Text>
                    Welcome Back! 👋
                </Text>
            </View>
            <View >
                <TextInput
                    //="Email"
                    placeholder="Enter your email"
                    //icon={icons.email}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    //label="Password"
                    placeholder="Set a password"
                    //icon={icons.lock}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <Button
                    title="Sign In"
                    onPress={handleSignIn}

                />

                <Link href="../sign-up" className="text-lg text-center text-general-200 mt-10" >
                    <Text>Don't have an account? </Text>
                    <Text className="text-primary-500">
                        Sign Up
                    </Text>
                </Link>
            </View>
            {/* Verification Modal */}
        </View>
    );
}
