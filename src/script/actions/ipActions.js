import {
    TYPE_CHANGE_SUCCESS,
    TYPE_CHANGE_ERROR,
    IP_CHANGE_SUCCESS,
    IP_CHANGE_ERROR
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