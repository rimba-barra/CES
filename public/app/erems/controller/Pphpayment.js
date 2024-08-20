Ext.define('Erems.controller.Pphpayment', {
    extend: 'Main.library.Controller',
    
	alias: 'controller.Pphpayment',
	
	models: [
        'Pphpayment',
		'Pphpaymentlist'
    ],
    stores: [
        'Pphpayment',
		'Pphpaymentlist'
    ],
    views: [
        'pphpayment.Panel',
		'pphpayment.FormSearch',
		'pphpayment.Grid',
		'pphpayment.FormData',
		'pphpayment.GridListPayment',
    ],
	
	init: function(application) {
		var me = this;
		
		me.control('#PphpaymentListGrid actioncolumn', {
			click: this.gridPphpaymentlistActionColumnClick
		});
		
		me.callParent(arguments);
	},
    gridPanelAfterRender: function(el) {
        var me = this;
    
        me.dataReset();

        var form = me.getMainFormSearch();
        me.textfield = Ext.ComponentQuery.query('[xtype=textfield]', form);
        
        for (var i=0;i<me.textfield.length;i++) {
            Ext.applyIf(me.textfield[i], {enableKeyEvents: true});
            
            me.textfield[i].on('keypress', function(e, el){
                if (el.getCharCode() === 13) {
                    me.dataSearch();
                }
            });
        }
    },
	
	gridPphpaymentlistActionColumnClick: function(view, cell, row, col, e, el) {
		var me = this, gridpanel = view.panel, gridpanelStore = gridpanel.getStore();
		
		var val = {is_pph_pay: 0, pph_pay_date: null, pph_amount: null, pph_ntpn_no: null};
		var rec = gridpanelStore.getAt(row);
		rec.beginEdit();
		rec.set(val);
		rec.endEdit();
		
		gridpanel.up().down('#randomnumber').setValue(me.randomString(5));
	},
	
	randomString : function (string_length){
		var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var randomstring = '';
		var charCount = 0;
		var numCount = 0;
		
		for (var i=0; i<string_length; i++) {
			// If random bit is 0, there are less than 3 digits already saved, and there are not already 5 characters saved, generate a numeric value. 
			if((Math.floor(Math.random() * 2) == 0) && numCount < 3 || charCount >= 5) {
				var rnum = Math.floor(Math.random() * 10);
				randomstring += rnum;
				numCount += 1;
			} else {
				// If any of the above criteria fail, go ahead and generate an alpha character from the chars string
				var rnum = Math.floor(Math.random() * chars.length);
				randomstring += chars.substring(rnum,rnum+1);
				charCount += 1;
			}
		}
		return randomstring;
	}
	
	/*dataSave: function(el) {
		var me = this, form = el.up('form'), errorMsg = '';
		switch(form.getItemId()) {
			case me.mainFormData:
				var pphDate = form.down('#pph_date').getValue();
				var grid = form.down('#PphpaymentListGrid');
				var listpaymentStore = grid.getStore();
				var rows = grid.getSelectionModel().getSelection();
				
				if (rows.length < 1) {
					Ext.Msg.alert('Info', 'No record selected !');
					return;
				} else {
					if(pphDate){
						for (var i = 0; i < rows.length; i++) {
							var val = {is_pph_pay: 1, pph_pay_date: pphDate};
							var rec = listpaymentStore.getAt(rows[i].index);
							rec.beginEdit();
							rec.set(val);
							rec.endEdit();
						}
					}
				}
					
				break;
		}
		if (errorMsg) {
			Ext.Msg.show({ title:'Error', msg:errorMsg, icon:Ext.Msg.ERROR, buttons:Ext.Msg.OK });
			return false;
		}				
		
		me.callParent(arguments);
	}*/
});