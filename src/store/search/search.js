const search = {
  state:{
    start:new Date(new Date().getTime()+24*3600*1000),
    end:new Date(new Date().getTime()+24*3600*1000*2),
    checkIn:new Date(new Date().getTime()+24*3600*1000),
    checkOut:new Date(new Date().getTime()+24*3600*1000*2),
  },
  mutations:{
    set_checkIn(state,val){
      state.checkIn = val;
    },
    set_checkOut(state,val){
      state.checkOut = val;
    }
  }

}

export {search}
