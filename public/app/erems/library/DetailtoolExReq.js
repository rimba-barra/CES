Ext.define('Erems.library.DetailtoolExReq', {
    extend:'Erems.library.Detailtool',
    parentGridAlias:'expenserequestgriddetail',
    storeUP:null, /// handle Unit PaymentType Store
    requires:['Erems.library.Tool'],
    _formAfterRender:function(){
        var me = this;
        var fl = ['cluster_code','unit_cluster_id','block_code','unit_block_id','unit_unit_number'];
        var form = me.form();
        for(var i=0;i<fl.length;i++){
            form.setReadOnly(fl[i]);
        }
        /// create store
        var ctl = _Apps.getController('Expenserequest');
        if(me.storeUP===null){
            me.storeUP = ctl.instantStore({
                id:'ExReqUnitPaymentType'
            });
        }
        ctl.nomBindingModel('expensedetailunitpaymenttype',me.storeUP);
        
        
        
        
 
    },
    _validation:{
        erMsg:'',
        valid:false,
        proses:function(formValues){
            var tool = new Erems.library.Tool();
            if(tool.getInt(formValues.paymenttype_id)===0){
                this.erMsg = 'No payment type selected';
            }else if(tool.getFloat(formValues.amount)===0){
                this.erMsg = 'Please insert amount';
            }else if(tool.getInt(formValues.expensetype_id)==0){
                this.erMsg = 'No expense type selected';
            }else if(tool.getInt(formValues.unit_id)===0){
                this.erMsg = 'No Unit selected';
            
            }else{
                this.erMsg = 'Hello';
                this.valid = true;
            }
            
         
        }
    },
    _getFinalValues:function(value,form){
       
//        var me = this;
//        value['amount'] = toFloat(value['amount']);
//        value['paymenttype'] = form.down('[name=paymenttype_id]').getSelectedVal('paymenttype',value['paymenttype_id']);
//      
        value['amount'] = toFloat(value['amount']);
        value['block_block'] = form.down('[name=unit_block_id]').getSelectedVal();
        value['cluster_cluster'] = form.down('[name=unit_cluster_id]').getSelectedVal();
        value['paymenttype_paymenttype'] = form.down('[name=paymenttype_id]').getSelectedVal();
        value['expensetype_expensetype'] = form.down('[name=expensetype_id]').getSelectedVal();
        return value;
    },
    _beforeWindowClose:function(){
        var me = this;
        var form  = me.getParentForm();
        var totalAmount = form.down('expenserequestgriddetail').getSumColumn('amount');
        form.down('[name=total_amount]').setValue(me.moneyFormat(totalAmount));
        //var store = form.down('grid').getStore();
        //store.filter("deleted",0);
        
    },
    
    moneyFormat:function(x){
        return x;
    }
    


});

