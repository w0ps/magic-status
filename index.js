function createStatus( statusProperties, updateCb, wait ){
  var internals = {
    updateCb: updateCb,
    sendUpdate: sendUpdate,
    updated: [],
    wait: wait || 500,
    api: {},
    values: {}
  };
  
  Object.keys( statusProperties ).forEach( setGettersAndSettersOnStatus );
  
  return internals.api;

  function setGettersAndSettersOnStatus( propertyKey ){
    
    Object.defineProperty( internals.api, propertyKey, {
      get: returnValue.bind( internals, propertyKey),
      set: setValue.bind( internals, propertyKey ),
      enumerable: true
    });
    
    internals.values[ propertyKey ] = statusProperties[ propertyKey ];
  }

  function returnValue( key ){
    return this.values[key];
  }

  function setValue( key, value ){
    this.values[ key ] = value;
    this.updated[ key ] = value;
    if( !this.timeout ) setTimeout( this.sendUpdate.bind( this ), this.wait );
  }

  function sendUpdate(){
    this.updateCb( this.updated );
    
    this.updated = {};
    delete this.timeout;
  }

}

module.exports = createStatus;
