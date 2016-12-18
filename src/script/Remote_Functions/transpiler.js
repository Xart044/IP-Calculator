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
	return array.map((elOut,indOut)=>{
		let binElem = parseInt(elOut).toString(2);
		if(binElem.length!==8){
			const diffArray = Array(8 - binElem.length).fill('0');
			binElem = 
			[binElem]
			.concat(diffArray)
			.reverse()
			.join('');
		}
		return binElem;
	})
	.join('.');
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
	return array.map((elOut,indOut)=>{
		return elOut
		.split('')
		.reverse()
		.map((elInn,indInn)=>{
			return elInn * Math.pow(2,indInn)
		})
		.reduce((a,b)=>a+b,0);
	})
	.join('.');
}