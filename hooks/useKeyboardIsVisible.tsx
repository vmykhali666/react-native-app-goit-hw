import { useState, useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';

const useKeyboardIsVisible = () => {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            () => setKeyboardIsVisible(true)
        );
        const hideSubscription = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => setKeyboardIsVisible(false)
        );

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return keyboardIsVisible;
};

export default useKeyboardIsVisible;