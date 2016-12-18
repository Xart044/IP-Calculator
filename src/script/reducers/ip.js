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

const initialState = {
    ip_dec: '',
    ip_bin: '',
    mask_dec: '',
    mask_bin: '',
    mask_length: '',
    ip_type: 'decimal',
    error: ''
};

export default function (state = initialState, action) {
    switch (action.type){
        case TYPE_CHANGE_SUCCESS:
            return {...state, ip_type: action.ip_type, error: ''};
            break;
        case TYPE_CHANGE_ERROR:
            return {...state, error: action.error};
            break;
        case IP_CHANGE_SUCCESS:
            return {...state, ip_dec: action.ip_dec, ip_bin: action.ip_bin, mask_dec: action.mask_dec, mask_bin: action.mask_bin, error: ''};
            break;
        case IP_CHANGE_ERROR:
            return {...state, error: action.error};
            break;
        case MASK_LENGTH_REQUEST_SUCCESS:
            return {...state, mask_length: action.mask_length, error: ''};
            break;
        case MASK_LENGTH_REQUEST_ERROR:
            return {...state, error: action.error};
            break;
        case RESET_REQUEST_SUCCESS :
            return {...state, ip_dec: '', ip_bin: '', mask_dec: '', mask_bin: '', mask_length: ''};
            break; 
        case RESET_REQUEST_ERROR :
            return {...state, error: action.error};
            break;       
        default:
            return state;
    }
}