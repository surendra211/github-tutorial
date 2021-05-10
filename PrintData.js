

const PrintData=({posts})=>{
    return <>
<br />
<br />
    <div>{posts.map((article,key)=>{
        <h1 style={{color:'red'}}>{article.jobtitle}</h1>

    })}
    
    </div>
    </>
}

export default PrintData