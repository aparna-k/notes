import React from 'react';
import ReactDOM from 'react-dom';
import Plot from 'react-plotly.js';

class HistPlot extends React.Component {

  render(){
    return(
      <Plot 
        data={[
          {
            x: this.props.histData,
            type: 'histogram'
          }
        ]}
      />
    )
  }
}

class BaseDiv extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      histData: null,
      mean: 50,
      std: 10,
      num_points: 1000
    };
  }

  updateHistData(){
    const requestOptions = {method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ "mean": this.state.mean,
                                                  "std": this.state.std,
                                                  "num_points":this.state.num_points})};


    
    fetch('/getHistData', requestOptions)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          histData: result.data
        });
      })
  }

  componentDidMount(){
    this.updateHistData()
  }

  handleInputChange(event){
    const val = event.target.value;
    const name = event.target.name;

    if(val && name){
      this.setState({ [name] : parseInt(val)})
    }

    this.updateHistData()
  }


  render(){
    return(
      <div>
        <div>
          <input type='text' value={this.state.mean} name='mean' onChange={this.handleInputChange.bind(this)}/>
          <input type='text' value={this.state.std} name='std' onChange={this.handleInputChange.bind(this)}/>
          <input type='text' value={this.state.num_points} name='num_points' onChange={this.handleInputChange.bind(this)}/>
        </div>
        <HistPlot histData={this.state.histData}/>
      </div>
    )
  }
}

ReactDOM.render(
  <BaseDiv/>,
  document.getElementById('root')
)