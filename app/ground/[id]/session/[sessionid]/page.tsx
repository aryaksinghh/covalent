import Sessionui from "./sessionui";


interface paramsType{
    params: Promise<{sessionid:string}>
}

export default async function Session({params} : paramsType){
    const {sessionid} = await params;
    return (
        <Sessionui/>
    )
}