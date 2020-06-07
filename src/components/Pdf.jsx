import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DataProvider from './PdfDataProvider';
import PDFViewer from './PdfViewer';
import PDFJSBackend from './PdfViewerBackend';
import Table from './PdfViewerTable';
// import axios from 'axios';
import {PulseLoader} from 'react-spinners';
import { s3upload } from './awsLibs'; 
import {Auth} from 'aws-amplify';
import './Pdf.css'

export default class Pdf extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      selectedFileUrl: null,
      isLoading: false,
      tableData: []
    };

    
  }

  onChangeHandler = event => {
    console.log(event.target);
    console.log(`File being added: ${event.target.files[0].name}`);
    this.setState({
      selectedFile: event.target.files[0],
      selectedFileUrl: URL.createObjectURL(event.target.files[0]),
      loaded: 0,
    });
  };

  async handleUpload() {
    try {
      console.log("loading user information");
      const authResponse = await Auth.currentAuthenticatedUser();
      console.log(authResponse);
      console.log("loading user information completed");
      const response = await s3upload(this.state.selectedFile);
    }
    catch (e) {
      console.log(e);
    }
  }

  clickButton = event => {

    console.log("submit transcript");
    if (this.state.selectedFile !== null) {
      try {
        // s3upload(this.state.selectedFile);
        this.handleUpload();
      }
      catch (e) {
        console.log(e);
      }
    }
    else {
      console.log("file is null");
    }
    
    
    /*
    this.setState({
      isLoading: true
    });
    console.log("Sending file to be processed...");
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    
    var returned_result = null;
    try {
      axios.post("http://localhost:8000/upload", data, {

      }).then(res =>  {
        console.log(res.statusText);
        console.log(res.data);
        returned_result = JSON.parse(res.data);
        let tempArray = [];
        for (var i = 0; i < returned_result.length; i++) {
          // Converting JSON to react array
          tempArray.push(returned_result[i]);
        }
        this.setState({
          isLoading: false,
          selectedFile: null,
          selectedFileUrl: null,
          tableData: returned_result
        });
      });
    }
    catch (error) {
      console.log(error);
    }
    */
  };

  render() {

    // Conditional for displaying transcript PDF
    let transcriptImage
    if (this.state.selectedFile != null){
      console.log('Setting transcript');
      transcriptImage = <object width="100%" height="400" data={this.state.selectedFileUrl} type="application/pdf"></object>
    }
    else {
      console.log('Using default transcript message');
      transcriptImage = <div className="transimg">No Transcript Loaded</div>
    }

    // Conditional for displaying loading icon
    // let loadingImage
    if (this.state.isLoading) { 
      console.log('Loading... ');
      transcriptImage = <PulseLoader></PulseLoader>
    }

    if (this.state.tableData.length > 0) {
      console.log('Creating table');
      for (var i = 0; i < this.state.tableData.length; i++) {
        console.log(this.state.tableData[i]);
      }
      transcriptImage = 
        <table>
          <thead>
            <tr>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tableData.map((key, data) => {
              return(
                <tr key={key}>
                  <td>{key}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
    }

    return (
      <div id='root'>
        <div>
          <DataProvider endpoint="api/users/" render={data => <Table data={data} />} />
        </div>
        <div className="row">
          <div className="leftcolumn">
            <div className="card">
              <h2>Transcript Uploader</h2>
              <h5>Upload your transcript</h5>
              <p> Upload a PDF file of your transcript:<br />
                <input type="file" name="datasize" size="30" onChange={this.onChangeHandler} />
              </p>
                <div>
                  <input type="submit" value="Submit" onClick={this.clickButton} />
                </div>
            </div>      
          </div>
          <div className="rightcolumn">
            <div className="card">
              <h2>Your Transcript</h2>
              <div className="transimg">
                {transcriptImage}
              </div>
              <p></p>
            </div>      
          </div>
        </div>
        <div className="PDFViewer">
          <PDFViewer 
            backend={PDFJSBackend}
            src='/myPDF.pdf'/>
        </div>
        
        <div className="footer">
            <h2>BC Advisor</h2>
        </div>
      </div>
    )
  }
}