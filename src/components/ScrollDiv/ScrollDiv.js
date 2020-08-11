import React from 'react'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from "@material-ui/core/Button";
import './ScrollDiv.scss';
export default function ScrollDiv(props) {
    return (
        <div 
        className="scroll-div"
        onScroll={()=> props.handleScroll()}>
            {props.cards}
            {props.page <= props.total_pages && <Button onClick={()=>props.addPage()}><ArrowForwardIosIcon></ArrowForwardIosIcon></Button>}
        </div>

    )
}



