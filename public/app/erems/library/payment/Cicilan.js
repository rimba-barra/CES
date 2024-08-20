Ext.define('Erems.library.payment.Cicilan', {
     id:0,
     schedule_id:0,
     amount:0,
     scheduletype: '',
     scheduletype_id: 0,
     remaining_balance:0,
     queue:0,
     init:function(id,am,rb,tipe,queue) {
        this.id = parseInt(id);
        
        this.amount = toFloat(am);
        this.schedule_id = parseInt(id);
        this.remaining_balance = toFloat(rb);
        this.scheduletype = tipe;
        this.queue = queue;
        
    },
      getId:function(){
        return this.id;
    },
      getAmount:function(){
        return this.amount;
    },
      getRemainingBalance:function(){
        return this.remaining_balance;
    },
      setRemainingBalance:function(rb){
        this.remaining_balance = toFloat(rb);
    },
     getScheduletype:function(){
        return this.scheduletype;
     },
     setScheduletype:function(st){
        this.scheduletype = st;
     },
     getQueue:function(){
        return this.queue;
     },
     setQueue:function(s){
        this.queue = s;
     }
    
})