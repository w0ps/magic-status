function createStatus( statusProperties, updateCb, wait ){
  var internals = {
    updateCb: updateCb,
    sendUpdate: sendUpdate,
    updated: {},
    wait: wait || 500,
    lastUpdate: undefined,
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
    var now = Date.now(),
        delay;

    this.values[ key ] = value;
    this.updated[ key ] = value;

    if( !this.timeOut ){
      this.timeOut = setTimeout( this.sendUpdate.bind( this ), this.wait );
    }
  }

  function sendUpdate(){
    this.lastUpdate = Date.now();

    var status = { updated: this.updated, values: this.values };
    
    this.updated = {};
    delete this.timeOut;

    this.updateCb( status );
    
  }

}

module.exports = createStatus;
