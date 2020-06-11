import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DataProvider from './PdfDataProvider';
import PDFViewer from './PdfViewer';
import PDFJSBackend from './PdfViewerBackend';
import Table from './PdfViewerTable';
// import axios from 'axios';
import {PulseLoader} from 'react-spinners';
import {API, Auth} from 'aws-amplify';
import { s3upload } from './awsLibs'; 
import './Pdf.css'

export default class Pdf extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      selectedFileUrl: null,
      isLoading: false,
      tableData: [],
      jobId: null,
      jobPath: null
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

      // response contains the file title, not the full key
      console.log("Calling s3 with " + response)
      const converted = await API.post("bcadmin", "/pdf", {
        body: response
      });

      console.log("PDF Job ID");
      console.log(converted);
      this.state.jobId = converted;
      this.state.jobPath = response;
    }
    catch (e) {
      console.log(e);
    }
  }

  sleep() {
    console.log("sleeping till response");
    const date = Date.now();
    var currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < 10000);
  }

  async checkJobStatus() {
    try {
      var count = 0;
      var jobStatus = '';
      do {
        jobStatus = await API.post("bcadmin", "/pdfScannerResult", {
          body: [
            "cc0a693261c08fd68dc1d89f7419ecb02b1558aa3d6536b59673d00bbf74e57e",
            "us-west-2:4c072669-7f0a-43ce-8087-d5ec4b596cef/1591752437977-BC Unofficial Transcript"
          ]
        });
        /*
        body: [
            this.state.jobId,
            this.state.jobPath
          ]
        body: [
          "cc0a693261c08fd68dc1d89f7419ecb02b1558aa3d6536b59673d00bbf74e57e",
          "us-west-2:4c072669-7f0a-43ce-8087-d5ec4b596cef/1591752437977-BC Unofficial Transcript"
        ]
        */

        console.log(jobStatus);
        if (jobStatus.length <= 0){
          this.sleep()
        }

      } while (jobStatus.length <= 0 && count < 15)

      this.props.classes(jobStatus);
    }
    catch (e) {
      console.log(e);
    }
  }

  clickButtonStatus = event => {
    this.checkJobStatus();
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
                  <input type="button" value="Submit" onClick={this.clickButton} />
                </div>
                <div>
                  <input type="button" value="Check Status" onClick={this.clickButtonStatus} />
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