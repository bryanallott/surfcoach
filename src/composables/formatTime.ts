
export function useFormattedTime() {

  function zeroPrefix(num:number, digit:number):string {
    var zero = '';
    for(var i = 0; i < digit; i++) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  }

  function formatTime(timeElapsed:number) : string {

    var dt = new Date(timeElapsed);
    var hour = dt.getUTCHours()
        , min = dt.getUTCMinutes()
        , sec = dt.getUTCSeconds()
        , ms = dt.getUTCMilliseconds();
    
    // expose managed state as return value
    return zeroPrefix(hour, 2) + ":" + 
      zeroPrefix(min, 2) + ":" + 
      zeroPrefix(sec, 2) + "." + 
      zeroPrefix(ms, 3);
  }

  return  {
    formatTime
  };
}