import React from 'react';

function selectKernel( props, kernel ){
  //console.log('SENDING', { method: 'select', data: { kernel } });
  //console.log(props.comm)
  props.comm.send({ method: 'select', data: { kernel } });
}

function buildList( props ) {
  return props.items.map( ( item, i ) => {
    return <li key={i}> { item } <button id={item} onClick={ () => selectKernel( props, item ) }> Select</button> </li>;
  })
}

const List = function( props ) {
  return ( 
    <div>
      <ul>
      { buildList( props ) }
      </ul>
    </div>
  );
}

export default List;
