
const useResources = () => {
    const fileURL = "https://hotelapp.fastery.dev/v1/uploads/"

    function getImage(string: string) {
        if(!string) return
        
        let imgsource = string?.split("/")
        let imageresult = imgsource[imgsource?.length -1]
        
        return fileURL+imageresult;
    }  

    return {
        // Properties
        getImage
    }
}
export default useResources;
