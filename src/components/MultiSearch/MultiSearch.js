import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import './MultiSearch.scss';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';


export default class MultiSearch extends Component {
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

    //   getSearchResults = (search) =>{

    //   }


    render() {
       let link = `/search/${this.state.search}`;

        return (
            <div className="search-input">
                
          <TextField id="outlined-basic" label="Search for Movies, TV Shows, Actors and more..." variant="outlined" name="results" fullWidth onChange={this.handchange}/> 
          <Button variant="contained" component={Link} to={link}>Default</Button>

            </div>
        )
    }
}

