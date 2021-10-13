import React, { Component } from 'react'
import AwesomeAlert from "react-native-awesome-alerts";

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
            onCancelPressed: config.onCancelPressed || this.hidePopup,
            onConfirmPressed: config.onConfirmPressed || this.hidePopup,
        })
    }

    hidePopup() {
        this.setState({showAlert: false})
    }

    render() {
        const {
            title, showAlert, textBody, closeOnTouchOutside, closeOnHardwareBackPress,
            showCancelButton, showConfirmButton, cancelText, confirmText,
            onCancelPressed, onConfirmPressed, confirmButtonColor, cancelButtonColor
        } = this.state

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
                onCancelPressed={onCancelPressed}
                onConfirmPressed={onConfirmPressed}
            />
        )
    }
}

export default Alert
