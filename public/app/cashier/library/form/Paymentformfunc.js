Ext.define('Cashier.library.form.Paymentformfunc', {
    id:null,
    form:null,
    init:function(form){
      
        this.form = form;
     
    },
    paymentMethodOnChange:function(){
    
       
        var pmId = parseInt(this.form.down('[name=paymentmethod_id]').getValue());
        // paymentmethod_id CASH = 4
        var val = 0;
        val = pmId==4?1:0;
        this.form.down('[name=is_reference_rejected]').setValue(val);
        
    }
})

