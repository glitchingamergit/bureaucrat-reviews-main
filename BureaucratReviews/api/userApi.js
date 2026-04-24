import ApiManager from "./ApiManager";

const userApi = async options => {
	try {
		let [url,method,data]=[...options], req={
			headers:{
				'content-type': 'application/json'
			}
		}, i=0, params=url.split('/');
		// Check for url parameter and configure axios options
		let len=params.length-++i, temp=params[len];
		if(!method && !data){
			if(++i==len){
				if(params[i]=='bureaucrats'){
					req.params={id:temp};
				}
				else{
					req.params={bureaucratId:temp};
				}
			}
		}
		else{
			req.method = method;
			req.data = data;
		}
		result = await ApiManager(url, req);
		return result;
	}
	catch(error) {
		throw(`Error in Api Manager: ${error}`);
	}
};

export default userApi;