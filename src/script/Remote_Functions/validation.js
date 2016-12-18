import { decToBinOuter } from './transpiler';

export const decRegExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
export const binRegExp = /\b[01]{8}\.[01]{8}\.[01]{8}\.[01]{8}\b/;


export function validateIp(checkingaddress, regExp, ip, mask = false, type = 'decimal') {
	if(mask){
		let maskInBinSystem;
    	if(type === 'decimal'){
    		maskInBinSystem = decToBinOuter(ip, checkingaddress);
    	}
    	maskInBinSystem = maskInBinSystem ? maskInBinSystem[1] : checkingaddress;
    	const isMaskValid = validateMask(maskInBinSystem);
		if(!isMaskValid){
			return false;
		}
	    if(maskInBinSystem==='11111111.11111111.11111111.11111111'){
	    	return false;
	    }
    }
    if (regExp.test(checkingaddress)) {
        return true;
    }
    return false;
}

export function validateMask(mask){
	let isValid = true;
	mask =
	mask
	.substring(0,mask.lastIndexOf('1'))
	.split('')
	.map((el,ind)=>{
		if(el === '0'){
			isValid = false;
		}
	})
	return isValid;
}
