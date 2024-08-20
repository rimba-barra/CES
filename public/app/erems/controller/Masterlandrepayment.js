Ext.define('Erems.controller.Masterlandrepayment', {
	extend: 'Erems.library.template.controller.Controlleralt',
	alias: 'controller.Masterlandrepayment',
	views: ['masterlandrepayment.Panel', 'masterlandrepayment.Grid', 'masterlandrepayment.FormSearch', 'masterlandrepayment.FormData'],
	stores: ['Masterlandrepayment','Masterlandrepaymentdetail','Masterparameterglobal'],
	models: ['Masterlandrepayment','Masterlandrepaymentdetail','Masterparameterglobal'],
	refs: [
	{
		ref: 'grid',
		selector: 'masterlandrepaymentgrid'
	},
	{
		ref: 'formsearch',
		selector: 'masterlandrepaymentformsearch'
	},
	{
		ref: 'formdata',
		selector: 'masterlandrepaymentformdata'
	},
	{
		ref: 'detailgrid',
		selector: 'masterlandrepaymentgriddetail'
	},
	],
	controllerName: 'masterlandrepayment',
	fieldName: 'code',
	bindPrefixName:'Masterlandrepayment',
	formWidth: 550,
	nomorValue: 1,
	checkedStatus: 0,
	init: function(application) {
		var me = this;
		this.control({
			'masterlandrepaymentpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'masterlandrepaymentgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'masterlandrepaymentgrid toolbar button[action=create]': {
				click: function() {
					this.formDataShow('create');
				}
			},
			'masterlandrepaymentgrid toolbar button[action=update]': {
				click: function() {
					this.formDataShow('update');
				}
			},
			'masterlandrepaymentgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'masterlandrepaymentgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'masterlandrepaymentgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'masterlandrepaymentformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'masterlandrepaymentformsearch button[action=search]': {
				click: this.dataSearch
			},
			'masterlandrepaymentformsearch button[action=reset]': {
				click: this.dataReset
			},
			'masterlandrepaymentformdata': {
				afterrender: this.formDataAfterRender
			},
			'masterlandrepaymentformdata button[action=save]': {
				click: me.dataSave
			},
			'masterlandrepaymentformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'masterlandrepaymentformdata button[action=save_detail]': {
				click: me.detailData.save
			},
			'masterlandrepaymentformdata [name=periode_awal]': {
				change:me.checkDate
			},
			'masterlandrepaymentformdata [name=periode_akhir]': {
				change:me.checkDate
			},
			'masterlandrepaymentgriddetail actioncolumn' : {
				deleteaction: me.detailData.DeleteColumnClick
			},
			'masterlandrepaymentgrid toolbar button[action=lrp_project_setting]': {
				click: me.setLRPProject
			},
			/* BROWSE CONTROL */
            /*'masterlandrepaymentbrowsepanel': {
                beforerender: me.browsepanelBeforeRender
            },
            'masterlandrepaymentbrowsepanel button[action=select]':{
                click:me.browsegridSelection
            },
            'masterlandrepaymentbrowsegrid':{
                afterrender:me.browsegridAfterRender
            },
			'masterlandrepaymentbrowseformsearch button[action=search]': {
                click: me.browsedataSearch
            },
			'masterlandrepaymentbrowseformsearch button[action=reset]': {
                click: me.browsedataReset
            }*/
            /* END BROWSE CONTROL */

			//added by anas 04102021
            'masterlandrepaymentgriddetail': {
				beforerender: me.detailData.beforerender,				
				afterrender: me.detailData.afterRender,
			},


        });
	},
	checkDate:function(){
		var me 		= this;
		var form 	= me.getFormdata();
		var formVal = me.getFormdata().getForm().getValues();
		var today 	= new Date();
		if(formVal.periode_awal > formVal.periode_akhir){
			me.getFormdata().down('[name=periode_awal]').setValue(today);
			me.getFormdata().down('[name=periode_akhir]').setValue(today);
			Ext.Msg.show({
				title: 'Warning', 
				msg: 'Periode Akhir harus lebih besar daripada periode awal',
				icon: Ext.Msg.WARNING,
				buttons: Ext.Msg.OK
			});	
		}
	},
	formDataAfterRender: function(el) {
		var me = this;
		
		var state = el.up('window').state;
		
		me.nomorValue = 1;

		//added by anas 04102021
		Ext.Ajax.request({
            url: 'erems/masterlandrepayment/read',
            params: {
                read_type_mode: 'efisiensi_config'
            },
            success: function (response) {

                me.getFormdata().down('[name=efisiensi]').setVisible(false);
                me.getFormdata().down('[name=lblefisiensi]').setVisible(false);
                if(response.responseText == "1")
                {
                    me.getFormdata().down('[name=efisiensi]').setVisible(true);
	                me.getFormdata().down('[name=lblefisiensi]').setVisible(true);
                }
            }
        });
        //end added by anas
		
		if (state == 'create') {
			me.getFormdata().down('[name=nomor]').setValue(me.nomorValue);
			
			var masterlandrepaymentdetailStore = me.getMasterlandrepaymentdetailStore();
			masterlandrepaymentdetailStore.removeAll();
			
		} else if (state == 'update') {
			var grid = me.getGrid();
			var store = grid.getStore();
			var form = me.getFormdata();

			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			el.loadRecord(record);
			
			me.getFormdata().down('[name=nomor]').setValue(me.nomorValue);
			
			el.body.mask('Loading Detail Nilai Pembayaran, please wait ...');
			var masterlandrepaymentdetailStore = me.getMasterlandrepaymentdetailStore();
			masterlandrepaymentdetailStore.removeAll();
			masterlandrepaymentdetailStore.load({params: {landrepayment_id: record.data.landrepayment_id},
				callback: function(pencairanrec) {
					//me.tcb_synch();
					for(var i=0; i<masterlandrepaymentdetailStore.getCount(); i++)
					{
						masterlandrepaymentdetailStore.each(function(record,idx){
							me.getFormdata().down('[name=nomor]').setValue(record.data.nomor+1);
						});        	
					}
					
					el.body.unmask();
				}
			});
		}
	},
	
	detailData: {
		that: this,
		editingIndexRow: 0,
		//added by anas 04102021
		beforerender: function(){
			var me = this;
			Ext.Ajax.request({
	            url: 'erems/masterlandrepayment/read',
	            params: {
	                read_type_mode: 'efisiensi_config'
	            },
	            success: function (response) {
	                
	                var show_grid = me.getDetailgrid();
		            show_grid.down('[itemId=colms_efisiensi]').setVisible(false);
		            show_grid.down('[itemId=colms_cogs_netto]').setVisible(false);

	                if(response.responseText == "1")
	                {
			            show_grid.down('[itemId=colms_efisiensi]').setVisible(true);
			            show_grid.down('[itemId=colms_cogs_netto]').setVisible(true);
	                }
	            }
	        });
		},
		afterRender: function () {
			var me = this;
			me.getDetailgrid().getStore().removeAll();
			me.getDetailgrid().on('edit', function (editor, e) {
				var rec = e.record;

				if(editor.context.field == 'nilai_pembayaran' || editor.context.field == 'efisiensi'){
					var cogs_netto = rec.get('nilai_pembayaran') / (rec.get('efisiensi')/100);
					//updated by anas 13102021
					rec.set("nilai_efisiensi", cogs_netto);
				}
			});
	  	},
		//end added by anas
		save: function() {
			var me = this;
			
			var form = me.getFormdata().getForm();
			var formVal = me.getFormdata().getForm().getValues();
			
			if (toFloat(formVal.nilai_pembayaran) >= 0) {
				var dStore = me.getDetailgrid().getStore();
				
				//cek jika periode awal / periode akhir dalam range
				var cekDate1 = 0,
				cekDate2 = 0,
				cekNomor = 0;
				if(dStore.getCount() > 0){
					dStore.each(function(record,idx){
						var cekPeriodeAwal = new Date(formVal.periode_awal);
						var cekPeriodeAkhir = new Date(formVal.periode_akhir);

						if(record.data.nomor == formVal.nomor){
							cekNomor = 1;
						}
						
						if(cekDate1 == 0) {  
							cekDate1 = me.checkMyDateWithinRange(cekPeriodeAwal, record.data.periode_awal, record.data.periode_akhir);
						}
						if(cekDate2 == 0) {
							cekDate2 = me.checkMyDateWithinRange(cekPeriodeAkhir, record.data.periode_awal, record.data.periode_akhir);
						}
					});
				}
				
				if(cekNomor == 1){
					Ext.Msg.show({
						title: 'Information', 
						msg: 'Nomor sudah ada dalam list',
						icon: Ext.Msg.WARNING,
						buttons: Ext.Msg.OK
					});	
					
					return false;
				}

				if(cekDate1 == 1 || cekDate2 == 1){
					Ext.Msg.show({
						title: 'Information', 
						msg: 'Periode Awal / Periode Akhir sudah ada dalam list',
						icon: Ext.Msg.WARNING,
						buttons: Ext.Msg.OK
					});	
					
					return false;
				}
				
				var val = {landrepayment_id: formVal.landrepayment_id, 
					nomor: formVal.nomor, 
					periode_awal: formVal.periode_awal, 
					periode_akhir: formVal.periode_akhir, 
					nilai_pembayaran: toFloat(formVal.nilai_pembayaran),
					//added by anas 04101202
					efisiensi: toFloat(formVal.efisiensi),
					//added by anas 13102021
					nilai_efisiensi: toFloat(formVal.nilai_pembayaran) / (toFloat(formVal.efisiensi)/100)};

					dStore.add(val);	

					me.nomorValue = formVal.nomor;
					me.nomorValue++;

					me.getFormdata().down('[name=nomor]').setValue(me.nomorValue);
				} else {
					Ext.Msg.show({
						title: 'Info',
						msg: 'Nilai Pembayaran tidak boleh kosong',
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function() {

						}
					});
				}
			},
			DeleteColumnClick: function(view, rowIndex, colIndex, item, e, record, row) {
				var me = this;
				var gr = me.getDetailgrid();

				Ext.MessageBox.show({
			        title: 'Delete Data',
			        msg: 'Delete data?',
			        buttons: Ext.MessageBox.OKCANCEL,
			        icon: Ext.MessageBox.WARNING,
			        fn: function(btn){
			            if(btn == 'ok'){
							view[5].set("deleted", true);
							gr.getStore().filterBy(function(recod){return recod.data.deleted==false;});
			            } else {
			                return;
			            }
			        }
			    });
			}
		},

		dataSave: function () {
			var me = this;

			var form = me.getFormdata().getForm();
			if (form.isValid()) {
				var store = me.getDetailgrid().getStore();
				me.dataSaveConfirm(store);
			}
		},
		dataSaveConfirm: function (store) {
			var me = this;

			store.clearFilter(true);
			var data = [];
			//added by anas 04102021
			var bool_efisiensi = false;

			for (var i = 0; i < store.getCount(); i++)
			{
				store.each(function (record, idx) {
					if (i == idx) {

						//added by anas 04102021
						if(record.data.efisiensi < 0 || record.data.efisiensi > 100){
		                    bool_efisiensi = true;
		                }
		                //end added by anas

						data[i] = record.data;
					}
				});
			}

			if(bool_efisiensi){
				Ext.Msg.show({
					title   : "Failure",
					msg     : "Error: Efisiensi tidak boleh lebih dari 100",
					buttons : Ext.Msg.OK,
				});
			}
			else
			{
				var fields = me.getFormdata().getValues();

				var myObj = {
					landrepayment_id: fields.landrepayment_id,
					code: fields.code,
					keterangan: fields.keterangan,
					management_fee: fields.management_fee,
					royalty: fields.royalty,
					data_detail: data
				}

				resetTimer();
				me.getFormdata().up('window').body.mask('Saving, please wait ...');
				Ext.Ajax.request({
					url: 'erems/masterlandrepayment/create',
					params: {
						data: Ext.encode(myObj)
					},
					success: function (response) {
						me.getFormdata().up('window').body.unmask();
						if (Ext.decode(response.responseText).success == true){
							console.log(Ext.decode(response.responseText));
							if(Ext.decode(response.responseText).total != 1){
								Ext.Msg.show({
									title: 'Failure',
									msg: Ext.decode(response.responseText).total[0].message,
									icon: Ext.Msg.ERROR,
									buttons: Ext.Msg.OK
								});
							}else{
								Ext.Msg.show({
									title: 'Success',
									msg: 'Data saved successfully.',
									icon: Ext.Msg.INFO,
									buttons: Ext.Msg.OK,
									fn: function () {
										me.getFormdata().up('window').close();
										var gridDepan = me.getGrid();
										var storeDepan = gridDepan.getStore();
										storeDepan.reload();
									}
								});
							}
						} else {
							Ext.Msg.show({
								title: 'Failure',
								msg: 'Error: Unable to save data.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					},
				});
			}
		},

		checkMyDateWithinRange: function(myDate, startDate, endDate) {
			if (startDate <= myDate && myDate <= endDate) {
			//document.writeln('Date is in Range');
			return 1;
		} else {  	 
			//document.writeln('Date is not in Range');
			return 0;
		}
	},
	
	setLRPProject: function (){
		var me = this;
		
		Ext.create('Ext.window.Window', {
			title: 'LRP Project Setting',
			height: 120,
			width: 380,
			padding: '10px 10px 10px 10px',
			modal: true,
			items: {  
				xtype: 'radiogroup',
				fieldLabel: 'Bagi Hasil Setup',
				name: 'group_terbit_untuk_sby',
				column: 1,
				width: '100%',
				items: [
				{
					xtype: 'radiofield',
					boxLabel: 'Hanya satu kali',
					name: 'LRP_PROJECT_SETTING',
					inputValue: '0',
					itemId: 'LRP_PROJECT_SETTING_0',
					checked: ((me.checkedStatus == 0) ? true : false)
				},
				{
					xtype: 'radiofield',
					boxLabel: 'Bisa berkali-kali',
					name: 'LRP_PROJECT_SETTING',
					inputValue: '1',
					itemId: 'LRP_PROJECT_SETTING_1',
					checked: ((me.checkedStatus == 1) ? true : false)
				}
				]
			},
			dockedItems: [
			{
				xtype: 'toolbar',
				dock: 'bottom',
				ui: 'footer',
				layout: {
					padding: 6,
					type: 'hbox'
				},
				items: [
				{
					xtype: 'button',
					action: 'savelrpprojectsetting',
					padding: 5,
					width: 75,
					iconCls: 'icon-save',
					text: 'Save',
					handler: function() {
						var val = this.up('window').items.items[0].getValue().LRP_PROJECT_SETTING;

						this.up('window').body.mask('Saving, Please Wait...');

						me.saveLRPProjectSetting(val, this.up('window'));
					}
				},
				{
					xtype: 'button',
					action: 'cancel',
					itemId: 'btnCancel',
					padding: 5,
					width: 75,
					iconCls: 'icon-cancel',
					text: 'Cancel',
					handler: function() {
						this.up('window').close();
					}
				}
				]
			}
			]
		}).show();
	},
	
	saveLRPProjectSetting: function(val, win) {
		var me = this;
		
		Ext.Ajax.request({
			url:'erems/masterlandrepayment/read',
			params:{
				read_type_mode: 'update_setlrpproject',
				set_status: val
			},
			success:function(response){ 
				win.body.unmask();
				if(Ext.decode(response.responseText).success == true)
				{
					me.checkedStatus = val;
					Ext.Msg.show({
						title: 'Success', 
						msg: 'Setting Updated.',
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function(){ 
							win.close();
						}
					});			
				}
				else {
					Ext.Msg.show({
						title: 'Failure', 
						msg: 'Error: Unable to save data.',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});									
				}
			},
		});
	},
	
	panelAfterRender: function(){
		var me = this;
		
		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: 'LRP_PROJECT_SETTING'}, 
			callback:function(rec){
				if(rec.length > 0){
					me.checkedStatus = rec[0].get('value');
				} else {
					me.checkedStatus = 0;
				}
			}
		});
	},
    dataDestroy: function() {
        var me = this;
        var rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGrid().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
            Ext.Msg.confirm('Delete Data', confirmmsg, function(btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function() {
                        me.getGrid().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {

                        store.remove(rows[i]);
                    }

                    store.on('beforesync', msg);
                    store.sync({
                        success: function(s) {
                            var res = Ext.decode(s.operations[0].response.responseText).total[0] == undefined ? 1 : 0;
                            if(res == 0){
                                me.getGrid().up('window').unmask();
                                store.un('beforesync', msg);
                                store.reload();
                                Ext.Msg.show({
                                    title: 'Failure',
                                    msg: failmsg + ' <br/>The data may have been used.',
                                    icon: Ext.Msg.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }else{
                                me.getGrid().up('window').unmask();
                                var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                                var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                                store.un('beforesync', msg);
                                store.reload();

                                Ext.Msg.show({
                                    title: 'Success',
                                    msg: successmsg,
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        },
                        failure: function() {
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg + ' <br/>The data may have been used.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    }

    

	
});