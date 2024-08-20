Ext.define('Erems.controller.Netpresentvalue', {
	extend : 'Erems.library.template.controller.Controlleralt',
	alias  : 'controller.Netpresentvalue',
	requires    : ['Erems.view.netpresentvalue.GridDetailStandard', 'Erems.view.netpresentvalue.GridDetailRealisasi','Erems.template.ComboBoxFields','Erems.library.template.component.Blockcombobox','Erems.library.template.component.Clustercombobox','Erems.library.XyReportJs'],
	views  : ['netpresentvalue.Panel', 'netpresentvalue.Grid', 'netpresentvalue.GridDetailStandard', 'netpresentvalue.GridDetailRealisasi', 'netpresentvalue.FormSearch', 'netpresentvalue.FormData', 'netpresentvalue.FormDataToolreschedule'],
	stores : ['', 'Netpresentvalue', 'Netpresentvaluedetailstandard', 'Netpresentvaluedetailrealisasi', 'Purchaseletterdetail', 'Purchaseletternetpresentvalue','Mastercluster','Masterblock', 'Scheduletype'],
	models : ['Netpresentvalue', 'Netpresentvaluedetailstandard', 'Netpresentvaluedetailrealisasi', 'Purchaseletter', 'Purchaseletterdetail','Mastercluster','Masterblock', 'Scheduletype'],

	refs   : [
		{
			ref      : 'grid',
			selector : 'netpresentvaluegrid'
		},
		{
			ref      : 'formsearch',
			selector : 'netpresentvalueformsearch'
		},
		{
			ref      : 'formdata',
			selector : 'netpresentvalueformdata'
		},
		{
			ref      : 'formdatatoolreschedule',
			selector : 'netpresentvalueformdatatoolreschedule'
		},
		{
			ref      : 'griddetailstandard',
			selector : 'netpresentvaluegriddetailstandard'
		},
		{
			ref      : 'griddetailrealisasi',
			selector : 'netpresentvaluegriddetailrealisasi'
		},
	],
	controllerName  : 'netpresentvalue',
	fieldName       : 'unit_number',
	bindPrefixName  : 'Netpresentvalue',
	validationItems : [{name: 'purchaseletter_id', msg: 'You must select Kavling / Unit No. first'}],
	formWidth       : 1200,
	xyReport        : null,
	reportFileView : null,
	reportFileType : null,
	user_id        : null,
	localStore     : {
		discount_year       : 0,
		scheduletype_id_old : null,
	},
	init : function (application) {
		var me = this;
		this.control({
			'netpresentvaluepanel': {
				beforerender : me.mainPanelBeforeRender,
				afterrender  : me.panelAfterRender
			},
			'netpresentvaluegrid': {
				afterrender     : this.gridAfterRender,
				itemdblclick    : this.gridItemDblClick,
				itemcontextmenu : this.gridItemContextMenu,
				selectionchange : this.gridSelectionChange
			},
			'netpresentvaluegrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'netpresentvaluegrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'netpresentvaluegrid toolbar button[action=destroy]' : {
				click : this.dataDestroy
			},
            'netpresentvaluegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
			'netpresentvaluegrid actioncolumn' : {
				afterrender : this.gridActionColumnAfterRender,
				click       : this.gridActionColumnClick
			},
            'netpresentvaluegrid button[action=prinout]': {
				click : function(){
					me.formDataPrintout();
				}
            },
			'netpresentvalueformsearch' : {
				afterrender : this.formSearchAfterRender
			},
			'netpresentvalueformsearch button[action=search]' : {
				click : this.dataSearch
			},
			'netpresentvalueformsearch button[action=reset]' : {
				click : this.dataReset
			},
			'netpresentvalueformdata' : {
				afterrender : this.formDataAfterRender
			},
			'netpresentvalueformdata button[action=test_hitung_npv]' : {
				click : me.hitungNPV
			},
			'netpresentvalueformdata button[action=browse_unit]' : {
				click : me.selectUnitGridShow
			},
			'netpresentvalueformdata [name=npv_date]': {
				blur : function(el){
					if( ! el.isValid()) {
		                alert('Format tanggal npv salah!');
		            }
				}
			},
			'netpresentvalueformdata [name=notes]' : {
				change : function(){
					me.limitedMaxchar(me.getFormdata().down('[name=notes]'), 255);
				}
			},
			'netpresentvaluegriddetailstandard button[itemId=transfer_standard_realisasi]' : {
				click : function(){
					me.transferRecordDetail();
				}
			},
			'netpresentvaluegriddetailstandard button[itemId=delete_standard]' : {
				click : function(){
					me.removeRecordDetail('standard');
				}
			},
			'netpresentvaluegriddetailrealisasi button[itemId=delete_realisasi]' : {
				click : function(){
					me.removeRecordDetail('realisasi');
				}
			},
			'netpresentvaluegriddetailstandard' : {
                afterrender: function () {
                	me.getGriddetailstandard().on('edit', function (editor, e) {
                		if(e.field == 'record_no' || e.field == 'amount'){
                			me.getGriddetailrealisasi().getStore().sort([{property:'record_no', direction:'ASC'}]);
                			e.record.set('npv_value', me.generatePV({ amount : e.record.data.amount, record_no : e.record.data.record_no }));
                		}
                		me.hitungNPV();
                		me.getGriddetailstandard().getSelectionModel().refresh();
                    });
                },
            },
			'netpresentvaluegriddetailrealisasi' : {
                afterrender: function () {
                	me.getGriddetailrealisasi().on('edit', function (editor, e) {
                		if(e.field == 'record_no' || e.field == 'amount'){
            				me.getGriddetailrealisasi().getStore().sort([{property:'record_no', direction:'ASC'}]);
                			e.record.set('npv_value', me.generatePV({ amount : e.record.data.amount, record_no : e.record.data.record_no }));
                		}
                		me.hitungNPV();
                		me.getGriddetailrealisasi().getSelectionModel().refresh();
                    });
                }
            },
            'netpresentvaluegriddetailstandard button[itemId=create_standard]' : {
            	click : function(){
            		me.addRecordDetail('standard');	
            	}
            },
            'netpresentvaluegriddetailrealisasi button[itemId=create_realisasi]' : {
            	click : function(){
            		me.addRecordDetail('realisasi');	
            	}
            },
            'netpresentvaluegriddetailrealisasi button[itemId=reschedule_realisasi]' : {
            	click : function(){
            		me.reSchedule();	
            	}
            },
            'netpresentvalueformdatatoolreschedule [name=scheduletype]' : {
            	change : function(el){
	               	var value      = el.value;
                    var valueModel = el.valueModels;

                    Ext.each(valueModel, function (rec) {
                        if(rec.data.scheduletype == value){
                            me.getFormdatatoolreschedule().down('[name=scheduletype_id]').setValue(rec.data.scheduletype_id);
                        }
                    });
            	}
            },
            'netpresentvalueformdatatoolreschedule button[itemId=process_reschedule]' : {
            	click : function(el){
            		el.setDisabled(true);
            		me.generateReSchedule();
            	}
            },
            'netpresentvalueformdatatoolreschedule [name=tanggal_1]' : {
            	change : function(){
            		me.changeTanggal1();
            	}
            },

			/* BROWSE CONTROL */
			'netpresentvaluebrowsepanel': {
				beforerender: me.browsepanelBeforeRender
			},
			'netpresentvaluebrowsepanel button[action=select]': {
				click: me.browsegridSelection
			},
			'netpresentvaluebrowsegrid': {
				afterrender: me.browsegridAfterRender
			},
			'netpresentvaluebrowseformsearch': {
				afterrender: me.browseformSearchAfterRender
			},
			'netpresentvaluebrowseformsearch button[action=search]': {
				click: me.browsedataSearch
			},
			'netpresentvaluebrowseformsearch button[action=reset]': {
				click: me.browsedataReset
			},
			/* END BROWSE CONTROL */

			'netpresentvalueformdata button[action=save]': {
				click: me.dataSave
			},
			'netpresentvalueformdata button[action=cancel]': {
				click: this.formDataClose
			},
		});
	},
	panelAfterRender: function (configs) {
		var me         = this;
		var formGrid   = me.getGrid();
		var FormSearch = me.getFormsearch();

		formGrid.getSelectionModel().setSelectionMode('SINGLE');
		formGrid.down("[action=create]").setDisabled(true);
		formGrid.down("[action=prinout]").setDisabled(true);

        var result =  Ext.JSON.decode(
        	Ext.Ajax.request({
	            url     : 'erems/netpresentvalue/read',
	            method  : 'POST',
	            timeout : 45000000,
	            async   : false,
	            params  : { mode : 'asset' }
	        }).responseText
        );

		me.localStore.discount_year = result.discount_year;

		me.user_id        = result.user_id;
		me.reportFileView = result.print_file ? result.print_file : null;
		me.reportFileType = result.print_type ? result.print_type : null;

        formGrid.down("[action=create]").setDisabled(false);
	},
	selectUnitGridShow : function () {
		var me = this;
		me.instantWindow('browse.Panel', 800, 'Browse Item', 'read', 'myBrowseItemPanel');
	},
	formDataAfterRender: function (el) {
		var me = this;
		me.fdar().init();

		var state = el.up('window').state;

		if (state == 'create') {
			me.fdar().create();
		} 
		else if (state == 'update') {
			me.fdar().update();
		} 
		else if (state == 'read') {
			me.fdar().read();
		}
	},
	fdar: function () {
		var me             = this;
		var formData       = me.getFormdata();
		var storeStandard  = me.getGriddetailstandard();
		var storeRealisasi = me.getGriddetailrealisasi();

		var x = {
			init : function () {
				// /// init here
				storeStandard.getStore().removeAll();
				storeRealisasi.getStore().removeAll();
		        me.validationForm();
			},
			create : function () {},
			update : function () {
				var formGrid      = me.getGrid();
				var gridStandard  = me.getGriddetailstandard();
				var gridRealisasi = me.getGriddetailrealisasi();

				var store    = formGrid.getStore();
				var record   = store.getAt(store.indexOf(formGrid.getSelectionModel().getSelection()[0]));

				formData.down('#fd_browse_unit_btn').setVisible(false);
				
				formData.loadRecord(record);
				formData.down('[name=npv_date]').setValue(new Date(record.data.npv_date));
				formData.down('[name=npv_standard]').setValue(accounting.formatMoney(record.data.npv_standard));
				formData.down('[name=npv_realisasi]').setValue(accounting.formatMoney(record.data.npv_realisasi));
				formData.down('[name=npv_nilai_persen]').setValue(accounting.formatMoney(record.data.npv_nilai_persen));
				formData.down('[name=harga_total_jual_new]').setValue(accounting.formatMoney(record.data.harga_total_jual_new));
				gridStandard.down('[name=total_standard]').setValue(accounting.formatMoney(record.data.total_standard));
				gridRealisasi.down('[name=total_realisasi]').setValue(accounting.formatMoney(record.data.total_realisasi));
				formData.down('[name=selisih_standard]').setValue(accounting.formatMoney(record.data.selisih_standard));
				formData.down('[name=selisih_standard_persen]').setValue(accounting.formatMoney(record.data.selisih_standard_persen));
				formData.down('[name=selisih_realisasi]').setValue(accounting.formatMoney(record.data.selisih_realisasi));
				formData.down('[name=selisih_realisasi_persen]').setValue(accounting.formatMoney(record.data.selisih_realisasi_persen));
				formData.down('[name=selisih_perubahan]').setValue(accounting.formatMoney(record.data.selisih_perubahan));
				formData.down('[name=selisih_perubahan_persen]').setValue(accounting.formatMoney(record.data.selisih_perubahan_persen));

				me.processRowFromItemSelection(record.get('purchaseletter_id'), 'loadPageUpdate');
			},
			read : function () {
				var formGrid      = me.getGrid();
				var gridStandard  = me.getGriddetailstandard();
				var gridRealisasi = me.getGriddetailrealisasi();

				var store    = formGrid.getStore();
				var record   = store.getAt(store.indexOf(formGrid.getSelectionModel().getSelection()[0]));

				formData.down('#fd_browse_unit_btn').setVisible(false);

				formData.loadRecord(record);
				formData.down('[name=npv_date]').setValue(new Date(record.data.npv_date));
				formData.down('[name=npv_standard]').setValue(accounting.formatMoney(record.data.npv_standard));
				formData.down('[name=npv_realisasi]').setValue(accounting.formatMoney(record.data.npv_realisasi));
				formData.down('[name=npv_nilai_persen]').setValue(accounting.formatMoney(record.data.npv_nilai_persen));
				formData.down('[name=harga_total_jual_new]').setValue(accounting.formatMoney(record.data.harga_total_jual_new));
				gridStandard.down('[name=total_standard]').setValue(accounting.formatMoney(record.data.total_standard));
				gridRealisasi.down('[name=total_realisasi]').setValue(accounting.formatMoney(record.data.total_realisasi));
				formData.down('[name=selisih_standard]').setValue(accounting.formatMoney(record.data.selisih_standard));
				formData.down('[name=selisih_standard_persen]').setValue(accounting.formatMoney(record.data.selisih_standard_persen));
				formData.down('[name=selisih_realisasi]').setValue(accounting.formatMoney(record.data.selisih_realisasi));
				formData.down('[name=selisih_realisasi_persen]').setValue(accounting.formatMoney(record.data.selisih_realisasi_persen));
				formData.down('[name=selisih_perubahan]').setValue(accounting.formatMoney(record.data.selisih_perubahan));
				formData.down('[name=selisih_perubahan_persen]').setValue(accounting.formatMoney(record.data.selisih_perubahan_persen));

				me.processRowFromItemSelection(record.get('purchaseletter_id'), 'loadPageUpdate');
			}
		};
		return x;
	},
	gridSelectionChange: function () {
		var me = this;
		var formGrid = me.getGrid(), row = formGrid.getSelectionModel().getSelection();

		formGrid.down('#btnDelete').setDisabled(true);
		formGrid.down('#btnEdit').setDisabled(true);
		formGrid.down('[action=prinout]').setDisabled(true);

		if (row[0]) {
			formGrid.down('#btnDelete').setDisabled(false);
			formGrid.down('#btnEdit').setDisabled(false);
			formGrid.down('[action=prinout]').setDisabled(false);
		} 
	},
	processRowFromItemSelection: function (pl_id, inital) {
		var me = this;

		var plDetailStore = me.getPurchaseletterdetailStore();
		var formData      = me.getFormdata();

		plDetailStore.load({
			params   : {
				mode_read         : 'detail', 
				purchaseletter_id : pl_id
			},
			callback : function (rec) {
				/* UNIT INFOTMATION */
				formData.down('[name=code]').setValue(rec[0].get('cluster_code'));
				formData.down('[name=unit_cluster_id]').setValue(rec[0].get('unit_cluster_id'));
				formData.down('[name=block_code]').setValue(rec[0].get('block_code'));
				formData.down('[name=unit_block_id]').setValue(rec[0].get('unit_block_id'));
				formData.down('[name=unit_pt_name]').setValue(rec[0].get('unit_pt_name'));
				formData.down('[name=unit_unit_number]').setValue(rec[0].get('unit_unit_number'));
				formData.down('[name=unit_productcategory]').setValue(rec[0].get('unit_productcategory'));
				formData.down('[name=unit_type_name]').setValue(rec[0].get('unit_type_name'));
				formData.down('[name=unit_land_size]').setValue(rec[0].get('unit_land_size'));
				formData.down('[name=unit_long]').setValue(rec[0].get('unit_long'));
				formData.down('[name=unit_building_size]').setValue(rec[0].get('unit_building_size'));
				formData.down('[name=unit_width]').setValue(rec[0].get('unit_width'));
				formData.down('[name=unit_kelebihan]').setValue(rec[0].get('unit_kelebihan'));
				formData.down('[name=unit_floor]').setValue(rec[0].get('unit_floor'));
				/* END UNIT INFOTMATION */

				formData.down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
				formData.down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
				formData.down('[name=purchase_date]').setValue(rec[0].get('purchase_date'));
				formData.down('[name=customer_name]').setValue(rec[0].get('customer_name'));
				formData.down('[name=customer_ktp]').setValue(rec[0].get('customer_ktp'));
				formData.down('[name=customer_npwp]').setValue(rec[0].get('customer_npwp'));
				formData.down('[name=harga_netto]').setValue(accounting.formatMoney(rec[0].get('harga_netto')));
				formData.down('[name=harga_total_jual]').setValue(accounting.formatMoney(rec[0].get('harga_total_jual')));
				formData.down('[name=persen_pembayaran]').setValue(accounting.formatMoney((rec[0].get('total_payment') / rec[0].get('harga_total_jual') * 100)));
				formData.down('[name=total_payment]').setValue(accounting.formatMoney(rec[0].get('total_payment')));
				formData.down('[name=disc_collection]').setValue(accounting.formatMoney(rec[0].get('disc_collection')));
				formData.down('[name=pricetype]').setValue(rec[0].get('customer_pendanaan'));

				if(formData.ownerCt.state == 'create'){
					formData.down('[name=harga_total_jual_new]').setValue(accounting.formatMoney(rec[0].get('harga_total_jual')));
				}

				me.dataDetail();
				me.validationForm();
			}
		});
	},
	validationForm : function(){
		var me              = this;
		var formData        = me.getFormdata();
		var detailStandard  = me.getGriddetailstandard();
		var detailRealisasi = me.getGriddetailrealisasi();

		var plid     = formData.down("[name=purchaseletter_id]").getValue();
		var boolean  = plid ? false : true;
		var bool_btn = boolean;

		if(formData.ownerCt.state == 'read'){
			bool_btn = true;

			formData.down('[name=harga_total_jual_new]').setReadOnly(bool_btn);
			formData.down('[name=npv_date]').setReadOnly(bool_btn);
		}

		detailStandard.down("[itemId=create_standard]").setDisabled(bool_btn);
		detailStandard.down("[itemId=delete_standard]").setDisabled(bool_btn);
		detailStandard.down("[itemId=transfer_standard_realisasi]").setDisabled(bool_btn);
		
		detailRealisasi.down("[itemId=create_realisasi]").setDisabled(bool_btn);
		detailRealisasi.down("[itemId=delete_realisasi]").setDisabled(bool_btn);
		detailRealisasi.down("[itemId=reschedule_realisasi]").setDisabled(bool_btn);
		
		formData.down("#btnSave").setDisabled(bool_btn);
	},
	dataSave: function () {
		var me = this,
			formData        = me.getFormdata(),
			detailStandard  = me.getGriddetailstandard(),
			detailRealisasi = me.getGriddetailrealisasi(),
			storeStandard   = detailStandard.getStore(),
			storeRealisasi  = detailRealisasi.getStore();

		storeStandard.clearFilter(true);
		storeRealisasi.clearFilter(true);

    	detailStandard.getSelectionModel().refresh();
    	detailRealisasi.getSelectionModel().refresh();

    	/////////////////////////////////////////////////////////////////////////////////////////////////
		var typeTerminr    = new Array(), 
			warnMonthr     = new Array(),
			warnNPVr       = new Array(),
			warnDiffr      = new Array(),
			warnDuedater   = new Array(),
			warnTyper      = new Array(),
			warnTerminr    = new Array(),
			warnRecnor     = new Array(),
			oldDater       = null,
			oldMonthr      = null,
			urutRecord_nor = 0,
			typeTermins    = new Array(),
			warnRecnos     = new Array(),
			warnNPVs       = new Array(),
			warnDuedates   = new Array(),
			warnTypes      = new Array(),
			warnTermins    = new Array(),
			urutRecord_nos = 0;

    	//////// Realisasi /////////
    	storeRealisasi.each(function(record, idx){
    		var rec_data  = record.data,
				newDater  = new Date(rec_data.duedate),
				newMonthr = newDater.getMonth(),
				oldD      = me.empty(oldDater) ? '' : String(oldDater.getDate()).padStart(2, '0'),
				oldM      = me.empty(oldDater) ? '' : String(oldDater.getMonth() + 1).padStart(2, '0'),
				oldY      = me.empty(oldDater) ? '' : oldDater.getFullYear(),
				newD      = String(newDater.getDate()).padStart(2, '0'),
				newM      = String(newDater.getMonth() + 1).padStart(2, '0'),
				newY      = newDater.getFullYear();
    		
    		typeTerminr.push(rec_data.scheduletype + '_' + rec_data.termin);

    		if(
        		me.empty(accounting.unformat(rec_data.amount)) == false && 
        		parseFloat(accounting.unformat(rec_data.amount)) > 0 && 
        		(me.empty(accounting.unformat(rec_data.npv_value)) || parseFloat(accounting.unformat(rec_data.npv_value)) == 0)
        	){ warnNPVr.push(rec_data.record_no); }
    		if(me.empty(rec_data.duedate)){ warnDuedater.push(rec_data.record_no); }
    		if(me.empty(rec_data.scheduletype_id) || rec_data.scheduletype_id == 0){ warnTyper.push(rec_data.record_no); }
    		if(me.empty(rec_data.termin) || rec_data.termin == 0){ warnTerminr.push(rec_data.record_no); }
    		if(rec_data.record_no - urutRecord_nor != 1){ warnRecnor.push('"' + urutRecord_nor + '-' + rec_data.record_no + '"'); }
    		if(oldMonthr == newMonthr){ warnMonthr.push('"' + oldD + '-' + oldM + '-' + oldY + ' | ' + newD + '-' + newM + '-' + newY + '"'); }
    		if(oldDater != null && me.monthDiff(oldDater, newDater) != 1){ warnDiffr.push('"' + oldD + '-' + oldM + '-' + oldY + ' | ' + newD + '-' + newM + '-' + newY + '"'); }

			oldMonthr      = newMonthr;
			oldDater       = newDater;
			urutRecord_nor = rec_data.record_no;
        }); 
        var duplicateTypeterminr = me.findDuplicatearray(typeTerminr);

        ////// Standard //////
        storeStandard.each(function(record, idx){
			var rec_data = record.data;

        	typeTermins.push(rec_data.scheduletype + '_' + rec_data.termin);

        	if(
        		me.empty(accounting.unformat(rec_data.amount)) == false && 
        		parseFloat(accounting.unformat(rec_data.amount)) > 0 && 
        		(me.empty(accounting.unformat(rec_data.npv_value)) || parseFloat(accounting.unformat(rec_data.npv_value)) == 0)
        	){ warnNPVs.push(rec_data.record_no); }
    		if(me.empty(rec_data.duedate)){ warnDuedates.push(rec_data.record_no); }
    		if(me.empty(rec_data.scheduletype_id) || rec_data.scheduletype_id == 0){ warnTypes.push(rec_data.record_no); }
    		if(me.empty(rec_data.termin) || rec_data.termin == 0){ warnTermins.push(rec_data.record_no); }
    		if(rec_data.record_no - urutRecord_nos != 1){  warnRecnos.push('"' + urutRecord_nos + '-' + rec_data.record_no + '"'); }

			urutRecord_nos = rec_data.record_no;
        });
        var duplicateTypetermins = me.findDuplicatearray(typeTermins);

        if(!formData.down("[name=purchaseletter_id]").getValue()){
        	Ext.Msg.alert('Info', 'Silahkan browse data unit.');
        	return;
        }

        else if(!formData.down("[name=npv_date]").getValue()){
        	Ext.Msg.alert('Info', 'Silahkan pilih tanggal npv.');
        	return;
        }
        else if(Ext.Date.format(formData.down("[name=npv_date]").getValue(), "d-m-Y") == ''){
        	Ext.Msg.alert('Info', 'Tanggal npv salah tidak sesuai dengan format [ d-m-Y ].');
        	return;
        }

        else if(warnRecnos.length){
        	Ext.Msg.alert('Info', 'RecNo [' + warnRecnos.join(', ') + '] pada grid standard harus berurutan.');
    		return;
        }
        else if(warnDuedates.length){
        	Ext.Msg.alert('Info', 'Duedate [RecNo : ' + warnDuedates.join(', ') + '] tidak boleh kosong pada grid standard.');
    		return;
        }
        else if(warnTypes.length){
        	Ext.Msg.alert('Info', 'Type [RecNo : ' + warnTypes.join(', ') + '] tidak boleh kosong pada grid standard.');
    		return;
        }
        else if(warnTermins.length){
        	Ext.Msg.alert('Info', 'Termin [RecNo : ' + warnTypes.join(', ') + '] tidak boleh kosong pada grid standard.');
    		return;
        }
        else if(warnNPVs.length){
        	Ext.Msg.alert('Info', 'PV [RecNo : ' + warnNPVs.join(', ') + '] tidak boleh kosong pada grid standard.');
    		return;
        }
        else if(warnRecnor.length){
        	Ext.Msg.alert('Info', 'RecNo [' + warnRecnor.join(', ') + '] pada grid realisasi harus berurutan.');
    		return;
        }
        else if(warnDuedater.length){
        	Ext.Msg.alert('Info', 'Duedate [RecNo : ' + warnDuedater.join(', ') + '] tidak boleh kosong pada grid realisasi.');
    		return;
        }
        else if(warnTyper.length){
        	Ext.Msg.alert('Info', 'Type [RecNo : ' + warnTyper.join(', ') + '] tidak boleh kosong pada grid realisasi.');
    		return;
        }
        else if(warnTerminr.length){
        	Ext.Msg.alert('Info', 'Termin [RecNo : ' + warnTerminr.join(', ') + '] tidak boleh kosong pada grid realisasi.');
    		return;
        }
        else if(warnNPVr.length){
        	Ext.Msg.alert('Info', 'PV [RecNo : ' + warnNPVr.join(', ') + '] tidak boleh kosong pada grid realisasi.');
    		return;
        }
        else if(warnMonthr.length){
        	Ext.Msg.alert('Info', 'Tidak boleh ada tanggal duedate [' + warnMonthr.join(', ') + '] dalam bulan yang sama pada grid realisasi.');
    		return;
        }
        else if(duplicateTypetermins.length){
        	var warn = new Array();
        	for (var i = 0; i < duplicateTypetermins.length; i++) {
        		var res = duplicateTypetermins[i].split("_");
        		warn.push('Type : ' + res[0] + ', Termin : ' + res[1]);
        	}

        	Ext.Msg.alert('Info', 'Tidak boleh ada type dan termin yg sama [' + warn.join(', ') + '] pada grid standard.');
    		return;
        }
        else if(duplicateTypeterminr.length){
        	var warn = new Array();
        	for (var i = 0; i < duplicateTypeterminr.length; i++) {
        		var res = duplicateTypeterminr[i].split("_");
        		warn.push('Type : ' + res[0] + ', Termin : ' + res[1]);
        	}

        	Ext.Msg.alert('Info', 'Tidak boleh ada type dan termin yg sama [' + warn.join(', ') + '] pada grid realisasi.');
    		return;
        }
        else if(warnDiffr.length){
        	Ext.Msg.alert('Info', 'Duedate harus berurutan bulannya [' + warnDiffr.join(', ') + '] pada grid realisasi.');
    		return;
        }
        else if(accounting.unformat(formData.down("[name=harga_total_jual]").getValue()) != accounting.unformat(detailStandard.down("[name=total_standard]").getValue())){
        	Ext.Msg.alert('Info', 'Harga total jual harus sama dengan total standard.');
        	return;
        }
        else if(accounting.unformat(formData.down("[name=harga_total_jual_new]").getValue()) != accounting.unformat(detailRealisasi.down("[name=total_realisasi]").getValue())){
        	Ext.Msg.alert('Info', 'Harga baru harus sama dengan total realisasi.');
        	return;
        }
        else{
			var fields    = formData.getValues(),
				finalData = new Object(); 

			finalData['npv_id']                   = fields.npv_id;
			finalData['purchaseletter_id']        = fields.purchaseletter_id;
			finalData['harga_total_jual']         = accounting.unformat(fields.harga_total_jual);
			finalData['npv_no']                   = fields.npv_no;
			finalData['npv_date']                 = fields.npv_date;
			finalData['harga_total_jual_new']     = accounting.unformat(fields.harga_total_jual_new);
			finalData['npv_standard']             = accounting.unformat(fields.npv_standard);
			finalData['npv_realisasi']            = accounting.unformat(fields.npv_realisasi);
			finalData['npv_nilai_persen']         = accounting.unformat(fields.npv_nilai_persen);
			finalData['total_standard']           = accounting.unformat(fields.total_standard);
			finalData['total_realisasi']          = accounting.unformat(fields.total_realisasi);
			finalData['selisih_standard']         = accounting.unformat(fields.selisih_standard);
			finalData['selisih_standard_persen']  = accounting.unformat(fields.selisih_standard_persen);
			finalData['selisih_realisasi']        = accounting.unformat(fields.selisih_realisasi);
			finalData['selisih_realisasi_persen'] = accounting.unformat(fields.selisih_realisasi_persen);
			finalData['selisih_perubahan']        = accounting.unformat(fields.selisih_perubahan);
			finalData['selisih_perubahan_persen'] = accounting.unformat(fields.selisih_perubahan_persen);
			finalData['notes']                    = fields.notes;

	        var detail_standard = []; 
	        for(var i=0; i<storeStandard.getCount(); i++){
	            storeStandard.each(function(record, idx){
	                if(i == idx){ 
	                    detail_standard[i] = record.data; 
	                }
	            });        	
	        }
	        finalData['detail_standard'] = detail_standard;

			var detail_realisasi = []; 
	        for(var i=0; i<storeRealisasi.getCount(); i++){
	            storeRealisasi.each(function(record, idx){
	                if(i == idx){ 
	                    detail_realisasi[i] = record.data; 
	                }
	            });        	
	        }
	        finalData['detail_realisasi'] = detail_realisasi;

        	resetTimer();
			me.getFormdata().up('window').body.mask('Saving, please wait ...');
			Ext.Ajax.request({
				url     : 'erems/netpresentvalue/create',
				params  : { data : Ext.encode(finalData) },
				success : function (response) {
					me.getFormdata().up('window').body.unmask();
					if (Ext.decode(response.responseText).success == true){
						Ext.Msg.show({
							title   : 'Success',
							msg     : 'Data saved successfully.',
							icon    : Ext.Msg.INFO,
							buttons : Ext.Msg.OK,
							fn      : function () {
								me.getFormdata().up('window').close();
								var gridDepan  = me.getGrid();
								var storeDepan = gridDepan.getStore();
								storeDepan.reload();
							}
						});
					} else {
						Ext.Msg.show({
							title   : 'Failure',
							msg     : 'Error: Unable to save data.',
							icon    : Ext.Msg.ERROR,
							buttons : Ext.Msg.OK
						});
					}
				},
			});
        }
	},
	dataDetail : function(){
		var me = this;

		var formData      = me.getFormdata();
		var gridStandard  = me.getGriddetailstandard();
		var gridRealisasi = me.getGriddetailrealisasi();
		

		gridStandard.getStore().removeAll();
		gridRealisasi.getStore().removeAll();

		if(formData.ownerCt.state == 'create'){
			var purchaseletter_id = formData.down("[name=purchaseletter_id]").getValue();
			
			if(purchaseletter_id){
				resetTimer();
				formData.up('window').body.mask('Load data schedule ...');

				var tm = setTimeout(function () {
					gridStandard.getStore().getProxy().setExtraParam('mode', 'getschedule');
					gridStandard.getStore().getProxy().setExtraParam('purchaseletter_id', purchaseletter_id);
					gridStandard.getStore().load({
						callback: function (rec) {
							if(rec.length){
								for(var i=0; i < rec.length; i++){
									rec[i].set('npv_value', me.generatePV({ amount : rec[i].data.amount, record_no : rec[i].data.record_no }));
								}
							}

							gridRealisasi.getStore().getProxy().setExtraParam('mode', 'getschedule');
							gridRealisasi.getStore().getProxy().setExtraParam('purchaseletter_id', purchaseletter_id);
							gridRealisasi.getStore().load({
								callback: function (rec) {
									if(rec.length){
										for(var i=0; i < rec.length; i++){
											rec[i].set('npv_value', me.generatePV({ amount : rec[i].data.amount, record_no : rec[i].data.record_no }));
										}
									}

									me.hitungNPV();
									
									formData.up('window').body.unmask();
								}
							});
						}
					});

					clearTimeout(tm);
				}, 1000);
			}
		}
		else{
			var npv_id = formData.down("[name=npv_id]").getValue();
			if(npv_id){
				resetTimer();
				formData.up('window').body.mask('Load data detail ...');

				var tm = setTimeout(function () {
					gridStandard.getStore().getProxy().setExtraParam('mode', 'getdetailstandard');
					gridStandard.getStore().getProxy().setExtraParam('npv_id', npv_id);
					gridStandard.getStore().load({
						callback: function (rec) {
							gridRealisasi.getStore().getProxy().setExtraParam('mode', 'getdetailrealisasi');
							gridRealisasi.getStore().getProxy().setExtraParam('npv_id', npv_id);
							gridRealisasi.getStore().load({
								callback: function (rec) {
									formData.up('window').body.unmask();
								}
							});
						}
					});

					clearTimeout(tm);
				}, 1000);
			}
		}
	},
	totalStandard : function(){
		var me = this;

		var formData = me.getFormdata();
		var grid     = me.getGriddetailstandard();
		
		var store = grid.getStore();
		var data  = store.data.items;

		var total_amount = 0;
		var total_npv    = 0;
		Ext.each(data, function (rec) {
			total_amount += accounting.unformat(rec.data.amount);
			total_npv += accounting.unformat(rec.data.npv_value);
		});

		grid.down('[name=total_standard]').setValue(accounting.formatMoney(total_amount));
		formData.down('[name=npv_standard]').setValue(accounting.formatMoney(total_npv));
	},
	totalRealisasi : function(){
		var me = this;

		var formData = me.getFormdata();
		var grid     = me.getGriddetailrealisasi();

		var store = grid.getStore();
		var data  = store.data.items;

		var total_amount = 0;
		var total_npv    = 0;
		Ext.each(data, function (rec) {
			total_amount += accounting.unformat(rec.data.amount);
			total_npv += accounting.unformat(rec.data.npv_value);
		});

		grid.down('[name=total_realisasi]').setValue(accounting.formatMoney(total_amount));
		formData.down('[name=npv_realisasi]').setValue(accounting.formatMoney(total_npv));
	},
	totalNilaiNPV : function(){
		var me = this;

		var formData = me.getFormdata();

		var npv_standard   = formData.down('[name=npv_standard]').getValue() ? accounting.unformat(formData.down('[name=npv_standard]').getValue()) : 0;
		var npv_realisasi  = formData.down('[name=npv_realisasi]').getValue() ? accounting.unformat(formData.down('[name=npv_realisasi]').getValue()) : 0;

		var npv_nilai_persen = npv_standard != 0 ? ((npv_realisasi - npv_standard) / npv_standard) * 100 : 0;

		formData.down('[name=npv_nilai_persen]').setValue(accounting.formatMoney(npv_nilai_persen));
	},
	hitungNPV : function(){
		var me = this;
		me.totalStandard();
		me.totalRealisasi();
		me.totalNilaiNPV();

		me.hitung_selisih();
	},
	hitung_selisih : function(){
		var me = this;

		var formData      = me.getFormdata();
		var gridStandard  = me.getGriddetailstandard();
		var gridRealisasi = me.getGriddetailrealisasi();

		var npv_standard   = formData.down('[name=npv_standard]').getValue() ? accounting.unformat(formData.down('[name=npv_standard]').getValue()) : 0;
		var npv_realisasi  = formData.down('[name=npv_realisasi]').getValue() ? accounting.unformat(formData.down('[name=npv_realisasi]').getValue()) : 0;

		var total_standard   = gridStandard.down('[name=total_standard]').getValue() ? accounting.unformat(gridStandard.down('[name=total_standard]').getValue()) : 0;
		var total_realisasi  = gridRealisasi.down('[name=total_realisasi]').getValue() ? accounting.unformat(gridRealisasi.down('[name=total_realisasi]').getValue()) : 0;

		var selisih_standard  = total_standard - npv_standard;
		var selisih_realisasi = total_realisasi - npv_realisasi;

		var selisih_standard_persen  = total_standard != 0 ? (selisih_standard / total_standard) * 100 : 0;
		var selisih_realisasi_persen = total_realisasi != 0 ? (selisih_realisasi / total_realisasi) * 100 : 0;

		// var selisih_perubahan        = total_standard - npv_realisasi;
		// var selisih_perubahan_persen = total_standard != 0 ? (selisih_perubahan / total_standard) * 100 : 0;
		var selisih_perubahan        = npv_realisasi - npv_standard;
		var selisih_perubahan_persen = npv_standard != 0 ? (selisih_perubahan / npv_standard) * 100 : 0;

		formData.down('[name=selisih_standard]').setValue(accounting.formatMoney(selisih_standard));
		formData.down('[name=selisih_standard_persen]').setValue(accounting.formatMoney(selisih_standard_persen));
		formData.down('[name=selisih_realisasi]').setValue(accounting.formatMoney(selisih_realisasi));
		formData.down('[name=selisih_realisasi_persen]').setValue(accounting.formatMoney(selisih_realisasi_persen));
		formData.down('[name=selisih_perubahan]').setValue(accounting.formatMoney(selisih_perubahan));
		formData.down('[name=selisih_perubahan_persen]').setValue(accounting.formatMoney(selisih_perubahan_persen));
	},
	generatePV : function(rec){
		var me = this;

		var discount_year  = me.localStore.discount_year > 0 ? me.localStore.discount_year/100 : 0;
		var discount_month = discount_year > 0 ? discount_year/12 : 0;

		return rec.amount * (Math.pow((1/(1+discount_month)), rec.record_no));
	},
	removeRecordDetail : function(flag){
		var me = this;

		if(flag == 'standard'){
			var grid = me.getGriddetailstandard();
		}
		else {
			var grid = me.getGriddetailrealisasi();
		}

		if(grid.getSelectionModel().getSelection().length < 1){
			Ext.Msg.alert('Info', 'No record selected !');
			return;
		}
		else{
			var index = grid.getStore().indexOf(grid.getSelectionModel().getSelection()[0]);
			var record = grid.getStore().getAt(index);

			var selectedRecord = '[RecNo ' + record.data.record_no + ']';
            confirmmsg = 'Delete ' + selectedRecord + ' ?';
			Ext.Msg.confirm('Delete Data', confirmmsg, function(btn) {
	            if (btn == 'yes') {
	            	if(record.data.npv_id > 0){ /// Jika ada npv id nya
						record.set('deleted', true);
						grid.getStore().filter(function(rec){
							return rec.data.deleted == false;
						});
	            	}
	            	else{
						grid.getStore().removeAt(index);
	            	}

					me.generateAllPV(grid.getStore());
					me.hitungNPV();

					grid.getSelectionModel().refresh();

	            }
			});
		}
	},
	addRecordDetail : function(flag){
		var me = this;

		var newObj = {
			npv_detail_realisasi_id : '0',
			npv_id                  : me.getFormdata().down('[name=npv_id]').getValue(),
			record_no               : '',
			duedate                 : '',
			scheduletype_id         : '',
			scheduletype            : '',
			termin                  : '',
			amount                  : '',
			npv_value               : '',
			deleted                 : '0',
		};
		
		if(flag == 'standard'){
			var grid = me.getGriddetailstandard();
			newObj   = Object.assign(newObj, {remaining_balance : ''});
		}
		else{
			var grid = me.getGriddetailrealisasi();
		}

		var store = grid.getStore();

		var index = 0;
		if(typeof grid.getSelectionModel().getSelection()[0] != 'undefined'){
			index = store.indexOf(grid.getSelectionModel().getSelection()[0]);
		}
		else if(store.data.length > 0){
			index = store.data.length;
			index = index - 1;
		}

		store.insert(index, newObj);

		me.generateAllPV(grid.getStore());
		me.hitungNPV();

		grid.getSelectionModel().refresh();

	},
	generateAllPV : function(store){
		var me = this;

		store.each(function(rec, idx){
			var record_no = idx+1;
            rec.set('npv_value', me.generatePV({ amount : rec.data.amount, record_no : record_no }));
			rec.set('record_no', record_no);
		});
	},
	transferRecordDetail : function(){
		var me    = this;
		var gridStandard   = me.getGriddetailstandard();
		var storeStandard  = gridStandard.getStore();
		var gridRealisasi  = me.getGriddetailrealisasi();
		var storeRealisasi = gridRealisasi.getStore();

		if(storeStandard.data.length > 0){
            var confirmmsg = 'Transfer semua data standard ke realisasi ?';
			Ext.Msg.confirm('Transfer Data', confirmmsg, function(btn) {
	            if (btn == 'yes') {
					storeRealisasi.removeAll();

					storeStandard.each(function(rec){
						gridRealisasi.getStore().add({
							npv_detail_realisasi_id : '0',
							npv_id                  : rec.data.npv_id,
							record_no               : rec.data.record_no,
							duedate                 : new Date(rec.data.duedate),
							scheduletype_id         : rec.data.scheduletype_id,
							scheduletype            : rec.data.scheduletype,
							termin                  : rec.data.termin,
							amount                  : rec.data.amount,
							npv_value               : rec.data.npv_value,
							deleted                 : rec.data.deleted,
						});
					});

					me.hitungNPV();
	            }
			});
		}
	},
	reSchedule : function(){
		var me    = this;
		var winId = 'win-' + me.bindPrefixName + 'formdatatoolreschedule';
		var win   = desktop.getWindow(winId);

		if (!win) {
			win = desktop.createWindow({
				id              : winId,
				title           : 'Tool Re-Schedule',
				iconCls         : 'icon-form-add',
				resizable       : false,
				minimizable     : false,
				maximizable     : false,
				width           : 260,
				renderTo        : Ext.getBody(),
				constrain       : true,
				constrainHeader : false,
				modal           : true,
				layout          : 'fit',
				shadow          : 'frame',
				shadowOffset    : 10,
				border          : false,
				state           : 'tool_reschedule',
				listeners       : {
					boxready : function () {
						win.body.mask('Loading...');
						var tm = setTimeout(function () {
							win.add(Ext.create('Erems.view.' + me.controllerName + '.FormDataToolreschedule'));
							win.center();
							win.body.unmask();

							var formData = me.getFormdata();
							var grid     = me.getGriddetailrealisasi();
							var store    = grid.getStore();
							var data     = store.data.items;

							var index   = data.length ? data.length-1 : 0;

							/// tambah 1 bulan dari duedate terakhir ///
							var newDate = new Date(data[index].data.duedate);
					        newDate.setMonth( newDate.getMonth() + 1 );

					        // me.getFormdatatoolreschedule().down("[name=tanggal_1]").setMinValue(newDate);
					        me.getFormdatatoolreschedule().down("[name=tanggal_1]").setValue(newDate);
					        me.getFormdatatoolreschedule().down("[name=tanggal_2]").setMinValue(newDate);

							clearTimeout(tm);
						}, 1000);
					},
				}
			});
		}
		win.show();
	},
	generateReSchedule : function(){
		var me = this;
		var formData       = me.getFormdatatoolreschedule();
		var gridRealisasi  = me.getGriddetailrealisasi();
		var storeRealisasi = gridRealisasi.getStore();

		var tanggal_1       = formData.down('[name=tanggal_1]').getValue();
		var tanggal_2       = formData.down('[name=tanggal_2]').getValue();
		var scheduletype_id = formData.down('[name=scheduletype_id]').getValue();
		var scheduletype    = formData.down('[name=scheduletype]').getValue();
		var nilai           = formData.down('[name=nilai]').getValue();
		var amount          = accounting.unformat(nilai);

        if(me.empty(tanggal_1)){
        	formData.down('[itemId=process_reschedule]').setDisabled(false);
        	Ext.Msg.alert('Info', 'Tanggal 1 tidak boleh kosong.');
        	return;
        }
        else if(me.empty(tanggal_2)){
        	formData.down('[itemId=process_reschedule]').setDisabled(false);
        	Ext.Msg.alert('Info', 'Tanggal 2 tidak boleh kosong.');
        	return;
        }
        else if(me.empty(scheduletype)){
        	formData.down('[itemId=process_reschedule]').setDisabled(false);
        	Ext.Msg.alert('Info', 'Type tidak boleh kosong.');
        	return;
        }
        else if(me.empty(nilai)){
        	formData.down('[itemId=process_reschedule]').setDisabled(false);
        	Ext.Msg.alert('Info', 'Nilai tidak boleh kosong.');
        	return;	
        }
        else {

			var startDate = new Date(tanggal_1);
			var endDate   = new Date(tanggal_2);
			var termin    = 1;
			var record_no = storeRealisasi.data.length;

			for (var newDate = startDate; newDate <= endDate; newDate.setMonth(newDate.getMonth() + 1)) {
				record_no = record_no+1;

				var newObj = {
					npv_detail_realisasi_id : '0',
					npv_id                  : me.getFormdata().down('[name=npv_id]').getValue(),
					record_no               : record_no,
					duedate                 : new Date(newDate),
					scheduletype_id         : scheduletype_id,
					scheduletype            : scheduletype,
					termin                  : termin,
					amount                  : amount,
					npv_value               : me.generatePV({ amount : amount, record_no : record_no }),
					deleted                 : '0',
				};

				gridRealisasi.getStore().add(newObj);
				gridRealisasi.getSelectionModel().refresh();
				termin++;
        	}
        	me.hitungNPV();

        	formData.up('window').close();
        }
	},
	changeTanggal1 : function(){
		var me = this;

		var tanggal1 = me.getFormdatatoolreschedule().down("[name=tanggal_1]").getValue();
		var tanggal2 = me.getFormdatatoolreschedule().down("[name=tanggal_2]").getValue();
		var newDate = new Date(tanggal1);

		if(tanggal2 != null){
			if(tanggal1 > tanggal2){
				me.getFormdatatoolreschedule().down("[name=tanggal_2]").setValue('');
			}
		}

        me.getFormdatatoolreschedule().down("[name=tanggal_2]").setMinValue(newDate);
	},
	formDataPrintout : function(e){
		var me = this;
		if(me.reportFileType == 'mrt'){ /// MRT
			if (!me.xyReport) {
				me.xyReport = new Erems.library.XyReportJs(); //JS
				me.xyReport.init(me);
			}
			me.xyReport.processReport();
		}
		else{
			me.docxProcess();
		}
	},
	xyReportProcessParams: function (reportData) {
		var me = this;

		var grid = me.getGrid();
		var rec  = grid.getSelectedRecord();

		reportData['file']           = me.reportFileView;
		reportData.params["npv_id"]  = rec.get("npv_id");
		reportData.params["user_id"] = me.user_id;
		return reportData;
	},
	docxProcess : function(){
		var me   = this;
		var grid = me.getGrid();
		var rec  = grid.getSelectedRecord();

		grid.up('window').body.mask('Creating Document, Please Wait...');

		Ext.Ajax.request({
			url    : 'erems/' + me.controllerName + '/print',
			params : {
				npv_id   : rec.get("npv_id"),
				doc_name : me.reportFileView,
				doc_type : me.reportFileType,
				mode     : 'getdetail'
			},
			success: function(response) {
				try{
					var resp = response.responseText;
					
					if(resp) {
						var info = Ext.JSON.decode(resp);
						
						if(info.success == true){
							grid.up('window').body.unmask();
							Ext.Msg.show({
								title      : 'Info',
								msg        : '<a href="' + info.url + '" target="blank">Click Here For Download Document</a>',
								icon       : Ext.Msg.INFO,
								buttons    : Ext.Msg.CANCEL,
								buttonText : { cancel : 'Close' }
							});
						} else {
							grid.up('window').body.unmask();
							Ext.Msg.show({
								title   : 'Failure',
								msg     : 'Error: Create Document Failed.',
								icon    : Ext.Msg.ERROR,
								buttons : Ext.Msg.OK
							});
						}
					}
				}catch(e){
					grid.up('window').body.unmask();
					Ext.Msg.show({
						title   : 'Failure',
						msg     : 'Error: Create Document Failed.',
						icon    : Ext.Msg.ERROR,
						buttons : Ext.Msg.OK
					});
				}
			},
			failure: function(e){
				grid.up('window').body.unmask();
				Ext.Msg.show({
					title   : 'Failure',
					msg     : 'Error: Create Document Failed.',
					icon    : Ext.Msg.ERROR,
					buttons : Ext.Msg.OK
				});
			}
		});
	},
	empty : function(e){
		switch (e) {
	    case "":
	    // case 0:
	    // case "0":
	    case null:
	    case false:
	    case typeof(e) == "undefined":
	      return true;
	    default:
	      return false;
	  }
	},
	findDuplicatearray : function(arr){
	  var sorted_arr = arr.slice().sort(); // You can define the comparing function here. 
	  // JS by default uses a crappy string compare.
	  // (we use slice to clone the array so the
	  // original array won't be modified)
	  var results = [];
	  	for (var i = 0; i < sorted_arr.length - 1; i++) {
	    	if (sorted_arr[i + 1] == sorted_arr[i]) {
	      		results.push(sorted_arr[i]);
	    	}
	  	}
	  	return results;
	},
	monthDiff : function(d1, d2){
	    var diff;
	    diff = (d2.getFullYear() - d1.getFullYear()) * 12;
	    diff -= d1.getMonth();
	    diff += d2.getMonth();
	    return diff;
	},
	getSorters: function(items, prop, direc) {
        // var buttons = this.query('toolbar dataview-multisort-sortbutton'),
		var me = this, sorters = [];

        Ext.Array.each(items, function(button) {
            sorters.push({
                // property : button.getDataIndex(),
                // direction: button.getDirection()
				property  : prop,
				direction : direc
            });
        });
        
        return sorters;
    },
	//================= BROWSE PANEL ================================
	instantWindow: function (panel, width, title, state, id) {
		var me = this;
		var formtitle, formicon;


		title     = typeof title == 'undefined' ? 'My Window' : title;
		id        = typeof id == 'undefined' ? 'myInstantWindow' : id;
		state     = typeof state == 'undefined' ? 'create' : state;
		panel     = typeof panel == 'undefined' ? 'Panel' : panel;
		width     = typeof width == 'undefined' ? 600 : width;
		formtitle = title;
		formicon  = 'icon-form-add';
		var winId = id;

		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id              : winId,
				title           : formtitle,
				iconCls         : formicon,
				resizable       : false,
				minimizable     : false,
				maximizable     : false,
				width           : width,
				renderTo        : Ext.getBody(),
				constrain       : true,
				constrainHeader : false,
				modal           : true,
				layout          : 'fit',
				shadow          : 'frame',
				shadowOffset    : 10,
				border          : false,
				items           : Ext.create('Erems.view.' + me.controllerName + '.' + panel),
				state           : state
			});
		}
		win.show();
	},
	browsepanelBeforeRender: function (el, a, b) {
		var me = this;

		var gridView = Ext.create('Erems.view.netpresentvalue.browse.Grid', {
			region: 'center'
		});
		var searchView = Ext.create('Erems.view.netpresentvalue.browse.FormSearch', {
			region      : 'west',
			split       : true,
			maxWidth    : 500,
			minWidth    : 300,
			width       : 300,
			collapsed   : true,
			collapsible : true,
			iconCls     : 'icon-search',
			title       : 'Search'
		});
		el.removeAll();
		el.add(gridView);
        el.add(searchView);

        var items = el.items.items[1].items.items;
        var textfield = Ext.ComponentQuery.query('[xtype=textfield]', items);

        for (var i=0;i<textfield.length;i++) {
            textfield[i].on('keypress', function(e, el){
                if (el.getCharCode() === 13) {
                    me.browsedataSearch(e);
                }
            });
        }
	},
	browsegridSelection: function (el) {
		var me = this;
		var unitGrid = el.up('grid');
		var unitStore = el.up('grid').getStore();
		var rows = unitGrid.getSelectionModel().getSelection();
		if (rows.length == 1) {
			el.up('window').destroy();
			_Apps.getController('Netpresentvalue').processRowFromItemSelection(rows[0].get('purchaseletter_id'), 'loadGrid');

		} else {
			Ext.Msg.alert('Info', 'Require 1 unit!');
			return;

		}
	},
	browsegridAfterRender: function (el, a, b) {
		var me = this;
		me.browsedataReset(el.up('panel').up('panel').down('button[action=search]'));
		// resetTimer();
		// var store = el.getStore();
		// store.removeAll();
		// store.getProxy().setExtraParam('limit', 25);
		// store.loadPage(1);
	},
	browseformSearchAfterRender: function (el) {
		// var me = this;

		// var ftStore = null;
		// ftStore = el.form._fields.items[2].getStore();
		// ftStore.load({params: {start: 0, limit: 0}});
	},
	browsedataSearch: function (el) {
		resetTimer();
		var me = this;

		var form  = el.up('form');
		var store = el.up('panel').up('panel').down('grid').getStore();

		var fields = form.getValues();
		for (var x in fields){
			store.getProxy().setExtraParam(x, fields[x]);
		}
		store.loadPage(1);
	},
	browsedataReset: function (el) {
		var me = this;
		var form = el.up('form');
		form.getForm().reset();
		me.browsedataSearch(el.up('panel').up('panel').down('button[action=search]'));
	},
	//===================== END BROWSE PANEL ===============================
});