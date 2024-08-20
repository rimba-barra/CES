Ext.define('Erems.library.payment.Tagihan', {
    id:null,
    requires:['Erems.library.payment.Cicilan'],
    list_cicilan:[],
    init:function(id,list_cicilan) {
       
        this.id = id;
        if(list_cicilan.length > 0){
            this.import_from_array(list_cicilan);
        }
    },
     getListCicilan:function(){
        return this.list_cicilan;
    },
    
     addCicilan:function(){
        
        this.list_cicilan.push(new Erems.library.payment.Cicilan());
        
    },
     import_from_array:function(data){
        
//        foreach(data as row){
//            this.list_cicilan[] = new Erems_Libraries_Cicilan(row['schedule_id'],row['amount'],row['remaining_balance']);
//        }
          var temp = null;
          for(var x in data){
            
              temp = new Erems.library.payment.Cicilan();
            
              temp.init(data[x].get('schedule_id'),data[x].get('amount'),data[x].get('remaining_balance'),data[x].get('scheduletype'),data[x].get('queue'));
              this.list_cicilan.push(temp);
              //this.list_cicilan.push(new Erems_Libraries_Cicilan(row['schedule_id'],row['amount'],row['remaining_balance']);
          }
        
    },
      getCicilan:function(pos){
        return this.list_cicilan[pos];
    },
      getJumlahCicilan:function(){
        return this.list_cicilan.length;
    },
     getTotalCicilan:function(){
        var total = 0;
//        foreach(this.list_cicilan as row){
//            total += row.getRemainingBalance();
//        }
        for(var x in this.list_cicilan){
            total +=this.list_cicilan[x].getRemainingBalance();
        }
        return total;
    },
    /// added 8 OKT 16.38
    reset:function(){
        this.list_cicilan = [];
    }
})