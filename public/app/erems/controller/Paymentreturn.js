Ext.define('Erems.controller.Paymentreturn', {
    extend: 'Erems.library.template.controller.Controlleralt',
    alias: 'controller.Paymentreturn',
    views: ['paymentreturn.Panel', 'paymentreturn.Grid', 'paymentreturn.FormSearch', 'paymentreturn.FormData', 'paymentreturn.DetailGrid'],
    stores: ['Paymentreturn', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masternotaris', 'Masterblock', 'Mastercluster', 'Masterdata.store.City', 'Paymentreturnschedule'],
    models: ['Paymentreturn', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masternotaris', 'Masterblock', 'Mastercluster', 'Masterdata.model.City', 'Discountcollectionschedule'],
    refs: [
        {
            ref: 'grid',
            selector: 'paymentreturngrid'
        },
        {
            ref: 'formsearch',
            selector: 'paymentreturnformsearch'
        },
        {
            ref: 'formdata',
            selector: 'paymentreturnformdata'
        },
		{
            ref: 'griddetail',
            selector: 'paymentreturndetailgrid'
        },
    ],
    controllerName: 'paymentreturn',
    fieldName: 'paymentreturn_no',
    bindPrefixName: 'Paymentreturn',
    validationItems:[
		{name:'purchaseletter_id',msg:'You must select Kavling / Unit No. first'},
 	],
                 
                 
    formWidth: 800,
	countLoadProcess: 0,
    init: function(application) {
        var me = this;

        this.control({
            test: me.eventMonthField,
            'paymentreturnpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'paymentreturngrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'paymentreturngrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'paymentreturngrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'paymentreturngrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'paymentreturngrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'paymentreturngrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
			'paymentreturnformsearch': {
				afterrender: this.formSearchAfterRender
			},
            'paymentreturnformsearch button[action=search]': {
                click: this.dataSearch
            },
            'paymentreturnformsearch button[action=reset]': {
                click: this.dataReset
            },
            'paymentreturnformdata': {
                afterrender: this.formDataAfterRender
            },
            'paymentreturnformdata button[action=save]': {
                click: this.dataSave
            },
            'paymentreturnformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'paymentreturnformdata button[action=browse_unit]': {
                click: me.selectUnitGridShow
            },
			'paymentreturndetailgrid': {
                cellclick :this.gridDetailClickColumn
            },
			'paymentreturnformdata [name=amount]': {
                //keyup: me.checkSchedule
				keyup: me.gridScheduleCheck
            },
			'paymentreturnformdata [name=is_schedulerelated]': {
                change: me.gridScheduleCheck
            },
        });
    },
	
    selectUnitGridShow: function() {
        var me = this;

       // _Apps.getController('Purchaseletter').browseItem('Paymentreturn');
	   	_myAppGlobal.getController('Sppjb').ctrler = 'Paymentreturn';
		_myAppGlobal.getController('Sppjb').spcreq = 'all';
		_myAppGlobal.getController('Sppjb').instantWindow('browse.Panel', 800, 'Browse Item', 'read', 'myBrowseItemPanel');
    },
    processRowFromItemSelection: function(rows, modul) {
		var me = this;
		
		switch (modul) {
				case 'purchaseletter':
					me.fillPurchaseletter(rows);
					break;
        	}
    },
	
	fillPurchaseletter: function(rows) {
        var me = this;
       
		var me = this;
        var plDetailStore = me.getPurchaseletterdetailStore();
        //me.getFormdata().up('window').body.mask('Loading data...');
        plDetailStore.load({
            params:{mode_read:'detail',purchaseletter_id:rows[0].get('purchaseletter_id')},
            callback:function(rec){
				/*console.log('RECORDS PURCHASE LETTER...');
				console.log(rec[0]);*/
				me.getFormdata().down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
				me.getFormdata().down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
				me.getFormdata().down('[name=purchase_date]').setValue(rec[0].get('purchase_date'));
				me.getFormdata().down('[name=unit_id]').setValue(rec[0].get('unit_id'));
				me.getFormdata().down('#fd_city').setValue(rec[0].get('customer_city_id'));
				me.getFormdata().down('[name=pricetype_id]').setValue(rec[0].get('pricetype_id'));
				me.getFormdata().down('[name=bank_bank_name]').setValue(rec[0].get('bank_bank_name'));
                                me.getFormdata().down('[name=akad_realisasiondate]').setValue(rec[0].get('akad_realisasiondate'));
//				var akad_realisasiondate;
//				akad_realisasiondate = rec[0].get('akad_realisasiondate');	
//				if(akad_realisasiondate){
//					akad_realisasiondate = akad_realisasiondate.replace(' 00:00:00.000','');
//					akad_realisasiondate = akad_realisasiondate.split("-");
//					akad_realisasiondate = akad_realisasiondate[2] + '-' + akad_realisasiondate[1] + '-' + akad_realisasiondate[0];	
//					me.getFormdata().down('[name=akad_realisasiondate]').setValue(akad_realisasiondate);
//				}
				
				var harga_jual = rec[0].get('harga_jual');
				var total_payment = rec[0].get('total_payment');
				me.getFormdata().down('[name=harga_jual]').setValue(me.fmb(harga_jual));
				me.getFormdata().down('[name=total_payment]').setValue(me.fmb(total_payment));
				
				if(harga_jual && total_payment){
					var payment_percentage = (total_payment / harga_jual) * 100;
					me.getFormdata().down('[name=payment_percentage]').setValue(me.fmb(payment_percentage));
				}
				else{
					me.getFormdata().down('[name=payment_percentage]').setValue('');
				}
				
				me.fillUnitDataToForm(rec[0]);
				me.fillMasterCustomerData(rec[0], 'customer');
				
				//fill default note
				var kawasan_name = me.getFormdata().down('[name=unit_cluster_id]').getRawValue();
				var block_name = me.getFormdata().down('[name=unit_block_id]').getRawValue();
				var unit_number = me.getFormdata().down('[name=unit_unit_number]').getRawValue();
				var default_note = 'Kawasan Code: '+kawasan_name+', Block Code : '+block_name+'-'+unit_number;
				me.getFormdata().down('[name=note]').setValue(default_note);
					
				//load detail grid
				var scheduleStore = me.getPaymentreturnscheduleStore();
				scheduleStore.removeAll();
				scheduleStore.load({params: {purchaseletter_id: rows[0].get('purchaseletter_id')}});
			}
		});
    },
	
    fillUnitDataToForm: function(data) {
		
        var me = this;
        var filledFields = ['productcategory', 'type_name', 'land_size', 'long', 'building_size', 'width', 'kelebihan', 'floor', 'block_id', 'cluster_id', 'unit_number', 'pt_name'];
       
        for (var x in filledFields) {
            if (me.getFormdata().down('[name=unit_' + filledFields[x] + ']') != null) {
                me.getFormdata().down('[name=unit_' + filledFields[x] + ']').setValue(data.data['unit_' + filledFields[x]]);
            }

        }
		me.getFormdata().down('[name=code]').setValue(data.data['cluster_code']);
		me.getFormdata().down('[name=block_code]').setValue(data.data['block_code']);
    },
    fillMasterCustomerData: function(records, prefix) {
        var pr = typeof prefix === 'undefined' ? 'customer' : prefix;
		
        var me = this;
        var filledFields = [
			'name', 'ktp', 'npwp', 'address', 'homephone', 'email', 'mobilephone'
		];
      	
        for (var x in filledFields) {
            if (me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']') != null) {
                me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']').setValue(records.data[pr + '_' + filledFields[x]]);
            }

        }
    },
	
	/*checkAllDetailLoadingProcess: function() {
        var me = this;
        if (me.countLoadProcess === 4) {
            me.getFormdata().up('window').body.unmask();
        }
    },*/
	
    formDataAfterRender: function(el) {

        var me = this;
        me.loadComboBoxStore(el);
        var state = el.up('window').state;
		
		//city combobox
		var ftStore = null;
		ftStore = el.down('#fd_city').getStore();
		ftStore.load({params:{start:0,limit:0,country_id:87}});
		
        me.getGriddetail().setDisabled(true);
		
		if (state == 'create') {
            // el.down('#active').setValue(1);
            //me.getFormdata().down('#btnSave').setDisabled(false);
			
			var scheduleStore = me.getPaymentreturnscheduleStore();
			scheduleStore.removeAll();
        } else {

			me.countLoadProcess = 0;
            me.getFormdata().up('window').body.mask('Loading data, please wait ...');
			
			var grid = me.getGrid();
            var store = grid.getStore();
			var form = me.getFormdata();

            var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            el.loadRecord(record);
			
			form.down('[name=amount]').setValue(me.fmb(record.data.amount));
			
			// load purchase letter data
			var purchaseletterdetailStore = me.getPurchaseletterdetailStore();
			purchaseletterdetailStore.removeAll();
			purchaseletterdetailStore.load({params: {purchaseletter_id: record.data.purchaseletter_id, mode_read: 'detail'}, 
					callback:function(rec){
						console.log('RECORDS PURCHASE LETTER...');
						console.log(rec[0]);
						me.getFormdata().down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
						me.getFormdata().down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
						me.getFormdata().down('[name=purchase_date]').setValue(rec[0].get('purchase_date'));
						me.getFormdata().down('[name=unit_id]').setValue(rec[0].get('unit_id'));
						me.getFormdata().down('#fd_city').setValue(rec[0].get('customer_city_id'));
						me.getFormdata().down('[name=pricetype_id]').setValue(rec[0].get('pricetype_id'));
						me.getFormdata().down('[name=bank_bank_name]').setValue(rec[0].get('bank_bank_name'));
						me.getFormdata().down('[name=akad_realisasiondate]').setValue(rec[0].get('akad_realisasiondate'));
//						var akad_realisasiondate;
//						akad_realisasiondate = rec[0].get('akad_realisasiondate');	
//						if(akad_realisasiondate){
//							akad_realisasiondate = akad_realisasiondate.replace(' 00:00:00.000','');
//							akad_realisasiondate = akad_realisasiondate.split("-");
//							akad_realisasiondate = akad_realisasiondate[2] + '-' + akad_realisasiondate[1] + '-' + akad_realisasiondate[0];	
//							me.getFormdata().down('[name=akad_realisasiondate]').setValue(akad_realisasiondate);
//						}				
						var harga_jual = rec[0].get('harga_jual');
						var total_payment = rec[0].get('total_payment');
						me.getFormdata().down('[name=harga_jual]').setValue(me.fmb(harga_jual));
						me.getFormdata().down('[name=total_payment]').setValue(me.fmb(total_payment));
						
						if(harga_jual && total_payment){
							var payment_percentage = (total_payment / harga_jual) * 100;
							me.getFormdata().down('[name=payment_percentage]').setValue(me.fmb(payment_percentage));
						}
						else{
							me.getFormdata().down('[name=payment_percentage]').setValue('');
						}
						
						me.fillUnitDataToForm(rec[0]);
						me.fillMasterCustomerData(rec[0], 'customer');
						
						//load detail grid
						var scheduleStore = me.getPaymentreturnscheduleStore();
						scheduleStore.removeAll();
						scheduleStore.load({params: {purchaseletter_id: record.data.purchaseletter_id, schedule_id: record.data.schedule_id}});
					}
			});
			
			// disable button
			form.down('#fd_browse_unit_btn').setDisabled(true);
			// end disable button
			
			if (state == 'update') {
				
			} else if (state == 'read') {
				me.getFormdata().getForm().getFields().each(function (field) { field.setReadOnly (true); });
				me.getFormdata().down('#btnSave').setDisabled(true);
			}
			
        }
    },

	gridDetailClickColumn: function(grid, rowIndex, colIndex) {
        var me = this,
			store = grid.getStore();
			
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
		
		var returnAmount = toFloat(me.getFormdata().down('[name=amount]').getValue());
			returnAmount = (returnAmount) ? returnAmount : 0;
		
		var schAmount = record.data.amount,
			schRemainingBalance = record.data.remaining_balance;
		var selisihSch = schAmount-schRemainingBalance;
			
		
		if(returnAmount > selisihSch){
			Ext.Msg.show({
				title: 'Warning', 
				msg: 'Pengembalian uang tidak boleh lebih besar dari yang sudah dibayarkan',
				icon: Ext.Msg.INFO,
				buttons: Ext.Msg.OK,
				fn: function(){ 
					me.getFormdata().down('[name=amount]').setValue();
					me.getFormdata().down('[name=schedule_id]').setValue();
				}
			});	
		} else {
			me.getFormdata().down('[name=schedule_id]').setValue(record.data.schedule_id);
		}
    },
	
	// checkSchedule: function() {
        // var me = this;
		
		// var returnAmount = toFloat(me.getFormdata().down('[name=amount]').getValue());
			// returnAmount = (returnAmount) ? returnAmount : 0;
			
		// var is_schedulerelated = me.getFormdata().down('[name=is_schedulerelated]').getValue();
		
		// if(is_schedulerelated == '1'){
			// var grid = me.getGriddetail();
            // var store = grid.getStore();
			
			// var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			// if(record){
				// if(returnAmount > record.data.amount){
					// Ext.Msg.show({
						// title: 'Warning', 
						// msg: 'Return Amount tidak boleh lebih besar dari Schedule Amount',
						// icon: Ext.Msg.INFO,
						// buttons: Ext.Msg.OK,
						// fn: function(){ 
							// me.getFormdata().down('[name=amount]').setValue();
							// me.getFormdata().down('[name=schedule_id]').setValue();
						// }
					// });	
				// } else {
					// me.getFormdata().down('[name=schedule_id]').setValue(record.data.schedule_id);
				// }
			// }
		// }
    // },
	
	gridScheduleCheck: function() {
        var me = this;
		
		var returnAmount = toFloat(me.getFormdata().down('[name=amount]').getValue());
			returnAmount = (returnAmount) ? returnAmount : 0;
			
		var is_schedulerelated = me.getFormdata().down('[name=is_schedulerelated]').getValue();
		var grid = me.getGriddetail();
		var store = grid.getStore();
		 
		if(is_schedulerelated == '1'){
			grid.setDisabled(false);
			
			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			if(record){
				
				var schAmount = record.data.amount,
					schRemainingBalance = record.data.remaining_balance;
				var selisihSch = schAmount-schRemainingBalance;
				
				if(returnAmount > selisihSch){
					Ext.Msg.show({
						title: 'Warning', 
						msg: 'Pengembalian uang tidak boleh lebih besar dari yang sudah dibayarkan',
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function(){ 
							me.getFormdata().down('[name=amount]').setValue();
							me.getFormdata().down('[name=schedule_id]').setValue();
						}
					});	
				} else {
					me.getFormdata().down('[name=schedule_id]').setValue(record.data.schedule_id);
				}
			}
		} else {
			var state = me.getFormdata().up('window').state;
			
			if(state == 'update'){
				var griddepan = me.getGrid();
				var storedepan = griddepan.getStore();
			
				var recorddepan = storedepan.getAt(storedepan.indexOf(griddepan.getSelectionModel().getSelection()[0]));
				if(recorddepan.data.is_schedulerelated == '1'){
					Ext.Msg.show({
						title: 'Warning', 
						msg: 'Harus direlasikan dengan schedule payment, karena sudah memotong sebelumnya',
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function(){ 
							me.getFormdata().down('[name=is_schedulerelated]').setValue('1');
						}
					});	
				} else {
					grid.setDisabled(true);
				}
			} else {
				grid.setDisabled(true);
			}
		}
		
    },
	
	fmb: function(val) {
        return this.fm(val, 2, ',', '.');
    },
    fm: function(n, decPlaces, thouSeparator, decSeparator) {
        var decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
                decSeparator = decSeparator == undefined ? "." : decSeparator,
                thouSeparator = thouSeparator == undefined ? "." : thouSeparator,
                sign = n < 0 ? "-" : "",
                i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
        return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
    }

});