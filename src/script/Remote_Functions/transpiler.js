export function decToBinOuter (ip,mask) {
	let resultArray = [];
	if(ip){
		let ipArray = ip.split('.');
		ipArray = decToBinInner(ipArray);
		resultArray.push(ipArray);
	}
	if(mask){
		let maskArray  = mask.split('.');
		maskArray = decToBinInner(maskArray);
		resultArray.push(maskArray);
	}
	return resultArray;
}

function decToBinInner(array){
	array = array.map((elOut,indOut)=>{
		let parsedElem = parseInt(elOut),
			binElem = parsedElem.toString(2);
		if(binElem.length!==8){
			const lengthDiff = 8 - binElem.length,
				  diffArray = Array(lengthDiff).fill('0');
			let  resultArray = [binElem];
			resultArray = resultArray.concat(diffArray).reverse();
			resultArray = resultArray.join('');
			binElem = resultArray;
		}
		return binElem;
	})
	return array.join('.');
}

export function binToDecOuter (ip,mask){
	const resultArray = [];
	if(ip){
		let ipArray = ip.split('.');
		ipArray = binToDecInner(ipArray);
		resultArray.push(ipArray);
	}
	if(mask){
		let maskArray = mask.split('.');
		maskArray = binToDecInner(maskArray);
		resultArray.push(maskArray);
	}

return resultArray;
}

function binToDecInner(array){
	array = array.map((elOut,indOut)=>{
		let elArray = elOut.split('');
		elArray = elArray.reverse();
		elArray = elArray.map((elInn,indInn)=>{
			return elInn * Math.pow(2,indInn)
		})
		return elArray.reduce((a,b)=>a+b,0);
	})
	return array.join('.');
}