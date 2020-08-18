import React from 'react';
import MultiSearch from '../../Forms/MultiSearch/MultiSearch';
import './Banner.scss';
export default function Banner(props) {
  let {background, title, options, tagline, search, companies} = props;
  
  return (
    <div
    className="banner"
    style={{ backgroundImage: `url(${background})` }}>
      
      <div className="banner-overlay">
        <div className="banner-content">
          <h1>{title}</h1>
          <p>{tagline}</p>
          {options}
          {search && <MultiSearch></MultiSearch>}
        </div>
      </div>
    </div>
  )
}
