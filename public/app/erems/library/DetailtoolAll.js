Ext.define('Erems.library.DetailtoolAll', {
    extend:'Erems.library.Detailtool',
    parentGridAlias:'',
	setParentGridAlias: function(n){
		this.parentGridAlias = n;
	},
    /*_formAfterRender:function(){
        var me = this;
        var fl = ['cluster_code','cluster_id','block_code','block_id','unit_number'];
        var form = me.form();
        for(var i=0;i<fl.length;i++){
            form.setReadOnly(fl[i]);
        }
        
 
    },
	*/
    _validation:{
        erMsg:'',
        valid:true,
        proses:function(formValues){
          /*  if(formValues.paymenttype_id==null){
                this.erMsg = 'No payment type selected';
            }else if(toFloat(formValues.amount)<1){
                this.erMsg = 'Please insert amount';
            }else if(formValues.expensetype_id==null){
                this.erMsg = 'No expense type selected';
            }else if(isNaN(parseInt(formValues.unit_id))){
                this.erMsg = 'No Unit selected';
            }else{
                this.erMsg = 'Hello';
                this.valid = true;
            }
            */
         
        }
    },
	
	
    _getFinalValues:function(value,form){
       
        var me = this;
        //value['amount'] = toFloat(value['amount']);
        //value['paymenttype'] = form.down('[name=paymenttype_id]').getSelectedVal('paymenttype',value['paymenttype_id']);
        
        return value;
    },
    _beforeWindowClose:function(){
        var me = this;
        var form  = me.getParentForm();console.log('asds');
        //var totalAmount = form.down('expenserequestgriddetail').getSumColumn('amount');
        //form.down('[name=total_payment]').setValue(totalAmount);
  
    }
    


});

