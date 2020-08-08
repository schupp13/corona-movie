import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import './MultiSearch.scss';
import { withRouter } from 'react-router-dom';

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";


 class MultiSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: ''    
        }
    }
    

      handchange = (e)=>{
        console.log(e.target.value);
        this.setState({
            search: e.target.value
        });
      }

      submitForm = (e) => {
        e.preventDefault()
        this.props.history.push(`/search/${this.state.search}`);  
      }

    render() {

        return (
            <div className="search-input">
              <form  onSubmit={this.submitForm}>
          <TextField InputLabelProps={{
              style: {
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                width: '100%',
                color: 'white',
                border: 'white'
              } }} id="outlined-basic" label="Search here" variant="filled" fullWidth onChange={this.handchange} InputProps={{
            
            endAdornment: (
              <InputAdornment>
                <IconButton >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}/> 
            </form>
            </div>
        )
    }
}

export default withRouter(MultiSearch);