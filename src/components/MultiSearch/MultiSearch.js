import React, { Component } from 'react';
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import './MultiSearch.scss';

export default class MultiSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            results: []    
        }
    }

      handchange = (e)=>{
        console.log(e.target.value);
      }

    //   getSearchResults = (search) =>{

    //   }


    render() {
       

        return (
            <div className="search-input">
          <TextField id="outlined-basic" label="Search for Movies, TV Shows, Actors and more..." variant="outlined" name="results" fullWidth onChange={this.handchange}/> 
            </div>
        )
    }
}

