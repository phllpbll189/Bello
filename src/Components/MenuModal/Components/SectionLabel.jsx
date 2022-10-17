//used to label each section of the menu modal

export const SectionLabel = ({img, label, expand, active}) => {
    const ExpandButton = () => {
        //not every label contains modal
        if(expand) 
            return <button onClick={expand}>{active ? "-" : "+"}</button>
        return <></>
    }

    return (
    <div className="header-bar" >
        <img src={img}/>
        <h4>{label}</h4>
        <ExpandButton/>
    </div>
    )
}