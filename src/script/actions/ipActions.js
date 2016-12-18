import {
    TYPE_CHANGE_SUCCESS,
    TYPE_CHANGE_ERROR,
    IP_CHANGE_SUCCESS,
    IP_CHANGE_ERROR,
    MASK_LENGTH_REQUEST_SUCCESS,
    MASK_LENGTH_REQUEST_ERROR,
    RESET_REQUEST_SUCCESS,
    RESET_REQUEST_ERROR
} from '../constants/ip'


export const typeChangeEvent = (prevValue) => {
    return function (dispatch) {
    	const newValue = prevValue==='decimal' ? 'binary' : 'decimal';
    	try{
			dispatch({
                type: TYPE_CHANGE_SUCCESS,
                ip_type: newValue
            });
    	}
    	catch(e){
			dispatch({
                type: TYPE_CHANGE_ERROR,
                error: e
            });
    	}
    };
};

export const ipChangeEvent = (ip_dec,ip_bin,mask_dec,mask_bin) => {
    return function (dispatch) {
    	try{
			dispatch({
                type: IP_CHANGE_SUCCESS,
                ip_dec: ip_dec,
                ip_bin: ip_bin,
                mask_dec: mask_dec,
                mask_bin: mask_bin
            });
    	}
    	catch(e){
			dispatch({
                type: IP_CHANGE_ERROR,
                error: e
            });
    	}
    };
};

export const ResetAddress = () => {
    return function (dispatch) {
        try{
            dispatch({
                type: RESET_REQUEST_SUCCESS
            });
        }
        catch(e){
            dispatch({
                type: RESET_REQUEST_ERROR,
                error: e
            });
        }
    };
};

export const getMaskLength = (mask_length) => {
    return function (dispatch) {
        try{
            dispatch({
                type: MASK_LENGTH_REQUEST_SUCCESS,
                mask_length: mask_length
            });
        }
        catch(e){
            dispatch({
                type: MASK_LENGTH_REQUEST_ERROR,
                error: e
            });
        }
    };
};