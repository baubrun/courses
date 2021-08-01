import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { hideToaster } from '../../redux/layoutSlice';
import Toaster from '../Toaster/Toaster'
import Spinner from '../Spinner'
import AlertDialog from '../AlertDialog/AlertDialog';

const Layout = (props) => {
    const dispatch = useDispatch()
    const {
        isToasterShow,
        toasterMessage,
        toasterStatus,
        isLoading,
        loadingMessage,
        alertMessage,
        alertTitle,
        isAlertOpen,
    } = useSelector(s => s.layout);

    const _hideToaster = () => {
        dispatch(hideToaster())
    }

    return (
        <>
            <main>{props.children}</main>
            <Toaster
                show={isToasterShow}
                message={toasterMessage}
                status={toasterStatus}
                onClose={_hideToaster}
            />
            {isLoading && <Spinner
                show={true}
                text={loadingMessage}
            />}
            <AlertDialog
                message={alertMessage}
                title={alertTitle}
                onOpen={isAlertOpen}
            />
        </>
    )
}

export default Layout
