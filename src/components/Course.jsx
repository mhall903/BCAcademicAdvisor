import React from 'react'
import { Popover, Button } from 'antd';

//single course component
class Course extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            color : 'white',
            isSelected: 0, //0 false, 1 true
            isShown:true,
            info:-1,
            msg:0,
            float:"left",
            width:"60%"
        }
    }

    toParent = () => {
        this.props.parent.getChildrenMsg(this, this.state.msg)
    }
    
    clickHandler = ()=>{
        console.log(this.state)
        console.log(this.state.isSelected)
        console.log(this.state.info)
        console.log(this.state.msg)

        this.state.info = this.props.info;
        if(this.state.info==1){
            this.setState({
                color:"#FF8F59",
                msg : 1
            })
        }else if(this.state.info == 0){
            if(this.state.isSelected == 0){
                this.setState({
                    color:"#FF8F59",
                    msg : 1,
                    isSelected : 1
                })
            }else if(this.state.isSelected == 1){
                this.setState({
                    color:"white",
                    msg : 0,
                    isSelected : 0
                })
            }
        }

        this.toParent();
    }

    render(){
        if(this.props.color != undefined){this.state.color = this.props.color;}
        if(this.props.msg != undefined){this.state.msg = this.props.msg}
        if(this.props.float != undefined){this.state.float = this.props.float}
        if(this.props.width != undefined){this.state.width = this.props.width}
        if(this.state.isShown==true){
            return <div>
                <Button block key={this.props.dep+this.props.no} style={{backgroundColor: this.state.color,width:this.state.width} } onClick={()=>this.clickHandler()} >
                    <h2  style={{fontSize:'14px'}}>{this.props.dep}{this.props.no} {this.props.name}</h2>
                </Button>
                <p/>
            </div>
        }else{
            return <div></div>
        }    
    }
}


export default Course;