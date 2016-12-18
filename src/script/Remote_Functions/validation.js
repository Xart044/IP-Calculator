import { decToBinOuter } from './transpiler';

export const decRegExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
export const binRegExp = /\b[01]{8}\.[01]{8}\.[01]{8}\.[01]{8}\b/;


export function validateIp(checkingaddress, regExp, ip, mask = false, type = 'decimal') {
	if(mask){
		let maskInBinSystem;
    	if(type === 'decimal'){
    		maskInBinSystem = decToBinOuter(ip, checkingaddress);
    	}
    	maskInBinSystem = maskInBinSystem ? maskInBinSystem : checkingaddress;
    	const isMaskValid = validateMask(maskInBinSystem[1]);
		if(!isMaskValid){
			return false;
		}
    }
    if (regExp.test(checkingaddress)) {
        return true;
    }
    return false;
}

export function validateMask(mask){
	let maskString = mask.replace('.', ''),
		isValid = true;
	maskString = maskString.substring(0,maskString.lastIndexOf('1'));
	maskString = maskString.split('').map((el,ind)=>{
		if(el === '0'){
			isValid = false;
		}
	})
	return isValid;
}
