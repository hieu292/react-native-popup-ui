import React, { Component } from 'react'
import AwesomeAlert from "react-native-awesome-alerts";
import {isPromise} from "../../utils/isPromise";

class Alert extends Component {
    static alertInstance

    static show({ ...config }) {
        this.alertInstance.start(config)
    }

    static hide() {
        this.alertInstance.hidePopup()
    }

    state = {
        showAlert: false,
        isCancelLoading: false,
        isConfirmLoading: false,
    }

    start({ ...config }) {
        this.setState({
            showAlert: true,
            title: config.title,
            textBody: config.textBody,
            closeOnTouchOutside: config.closeOnTouchOutside || false,
            closeOnHardwareBackPress: config.closeOnHardwareBackPress || false,
            showCancelButton: config.showCancelButton || true,
            showConfirmButton: config.showConfirmButton || true,
            cancelText: config.cancelText || "Cancel",
            confirmText: config.confirmText || "Ok",
            cancelButtonColor: config.cancelButtonColor || "#D0D0D0",
            confirmButtonColor: config.confirmButtonColor || "#AEDEF4",
            onCancelPressed: config.onCancelPressed,
            onConfirmPressed: config.onConfirmPressed,
            isCancelLoading: false,
            isConfirmLoading: false,
        })
    }

    hidePopup() {
        this.setState({showAlert: false})
    }

    handleCancelPress = async () => {
        const {onCancelPressed} = this.state;

        if(onCancelPressed){
            this.setState({isCancelLoading: true})
            const p = onCancelPressed()
            if(isPromise(p)){
                await p;
            }
            this.setState({isCancelLoading: false})
        }
        this.hidePopup();
    }

    handleConfirmPress = async () => {
        const {onConfirmPressed} = this.state;

        if(onConfirmPressed){
            this.setState({isConfirmLoading: true})
            const p = onConfirmPressed();
            if(isPromise(p)){
                await p;
            }
            this.setState({isConfirmLoading: false})
        }
        this.hidePopup();
    }

    render() {
        const {
            title, showAlert, textBody, closeOnTouchOutside, closeOnHardwareBackPress,
            showCancelButton, showConfirmButton, cancelText, confirmText,
            confirmButtonColor, cancelButtonColor,
            isCancelLoading, isConfirmLoading
        } = this.state;

        const isDisableBtn = isCancelLoading || isConfirmLoading;

        return (
            <AwesomeAlert
                ref={c => this._root = c}
                show={showAlert}
                showProgress={false}
                title={title}
                message={textBody}
                closeOnTouchOutside={closeOnTouchOutside}
                closeOnHardwareBackPress={closeOnHardwareBackPress}
                showCancelButton={showCancelButton}
                showConfirmButton={showConfirmButton}
                cancelText={cancelText}
                confirmText={confirmText}
                confirmButtonColor={confirmButtonColor}
                cancelButtonColor={cancelButtonColor}
                isCancelLoading={isCancelLoading}
                isConfirmLoading={isConfirmLoading}
                onCancelPressed={isDisableBtn ? () => {} : this.handleCancelPress}
                onConfirmPressed={isDisableBtn ? () => {} : this.handleConfirmPress}
            />
        )
    }
}

export default Alert
