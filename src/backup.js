import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
/*
function PrintList(props){
    props.test
    
    return 
}*/

const test = [
    {courseName : "intro to CS",courseId : "CS101"},
    {courseName : "intro to CS2",courseId : "CS102"},
    {courseName : "intro to CS3",courseId : "CS103"},
    {courseName : "intro to CS4",courseId : "CS104"}
]
class CourseList extends React.Component{
    constructor(){
        super();

    }
    render(){
        return <div><h1></h1></div>
    }
}
const a = test.map(item=><h5 key={item.courseId}>{item.courseId} + {item.courseName}<input type='checkbox'/><hr/></h5>);
//<PrintList {...test}></PrintList> -->
ReactDOM.render(<div>
   <div>
   <input type='text'/>
   <CourseList cList={test} ></CourseList>
       {
    a
   }</div>

    </div>,document.getElementById('root')
)

//------------------------------------------------------------------
/*
const arrStr = [
    'aaa','bbb','ccc','ddd'
]

ReactDom.render(<div>
    {arrStr.map(item=><h5 key ={item}>item</h5>)}
 <!--要是jsx直接控制的是div，则加给div，即id要赋予最外层元素，见下文-->
    </div>)
*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
