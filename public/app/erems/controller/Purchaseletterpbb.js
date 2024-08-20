Ext.define('Erems.controller.Purchaseletterpbb', {
    extend: 'Erems.library.template.controller.Controlleralt',
    alias: 'controller.Purchaseletterpbb',
    views: ['purchaseletterpbb.Panel', 'purchaseletterpbb.Grid', 'purchaseletterpbb.FormSearch', 'purchaseletterpbb.FormData', 'purchaseletterpbb.DetailGrid', 'purchaseletterpbb.FormDataDetail'],
    stores: ['Purchaseletterpbb', 'Purchaseletterpbbdetail'],
    models: ['Purchaseletterpbb', 'Purchaseletterpbbdetail'],
    detailTool: null,
	refs: [
        {
            ref: 'grid',
            selector: 'purchaseletterpbbgrid'
        },
        {
            ref: 'formsearch',
            selector: 'purchaseletterpbbformsearch'
        },
        {
            ref: 'formdata',
            selector: 'purchaseletterpbbformdata'
        },
		
		//Detail Grid
		{
            ref: 'detailgrid',
            selector: 'purchaseletterpbbdetailgrid'
        },
		{
            ref: 'formdatadetail',
            selector: 'purchaseletterpbbformdatadetail'
        }
		//end Detail Grid
    ],
    controllerName: 'purchaseletterpbb',
    fieldName: 'purchaseletter_no',
    bindPrefixName: 'Purchaseletterpbb',
    validationItems:[
						{name:'purchaseletter_id',msg:'You must select Kavling / Unit No. first'}
                 	],
                 
                 
    formWidth: 800,
	countLoadProcess: 0,
    init: function(application) {
        var me = this;

        this.control({
            test: me.eventMonthField,
            'purchaseletterpbbpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'purchaseletterpbbgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            
            'purchaseletterpbbgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'purchaseletterpbbgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'purchaseletterpbbgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'purchaseletterpbbgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
			'purchaseletterpbbformsearch': {
				afterrender: this.formSearchAfterRender
			},
            'purchaseletterpbbformsearch button[action=search]': {
                click: this.dataSearch
            },
            'purchaseletterpbbformsearch button[action=reset]': {
                click: this.dataReset
            },
            'purchaseletterpbbformdata': {
				//beforerender: this.formDataBeforeRender,
                afterrender: this.formDataAfterRender
            },
			
            'purchaseletterpbbformdata button[action=save]': {
                click: this.dataSave
            },
            'purchaseletterpbbformdata button[action=cancel]': {
                click: this.formDataClose
            },
						
			//DETAIL
			'purchaseletterpbbdetailgrid': {
                selectionchange: me.detailGridSelectionChange
            },
			'purchaseletterpbbdetailgrid button[action=create_detail]': {
                click: function(){ me.formDataDetailShow('create'); }
            },
			'purchaseletterpbbdetailgrid button[action=edit_detail]': {
                click: function(){ me.formDataDetailShow('update'); }
            },
			'purchaseletterpbbdetailgrid button[action=delete_detail]': {
             	click: me.dataDestroyDetail       
            },
			'purchaseletterpbbformdatadetail': {
                afterrender: me.formDataDetailAfterRender
            },
			'purchaseletterpbbformdatadetail button[action=save]': {
                click: me.dataSaveDetail
            }
        });
    },
    dataSave: function() {
        var me = this;
        var form = me.getFormdata().getForm();
        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }
       
        // added 12 Nov 2013 
        var vp = me.validationProcess();
        var vps = false; // validation prosess status
        if (typeof vp === 'object') {
            vps = vp.status;
            if (!vps) {
                Ext.MessageBox.alert('Alert', vp.msg, function() {
                    var x = me.getFormdata().down('[name=' + vp.field + ']');
                    if (x !== null) {
                        x.markInvalid(vp.msg);
                        x.focus();
                    }
                });
            }
        } else if (typeof vp === 'boolean') {
            vps = vp;
        }
        // end added 12 Nov 2013

        if (form.isValid() && vps) {
            resetTimer();
            var store = null;
            var fida = me.getFinalData(form.getValues());
            if (me.instantCreateMode) {
                store = _Apps.getController(me.callerId).getInstanCreateStorex(me.controllerName);
            } else {
                /* Mendefinisikan store sendiri pada saat proses simpan/edit 
                 * yang ada di me.storeProcess
                 * */
                if (!me.storeProcess) {
                    store = me.getGrid().getStore();
                } else {
                    store = me.storeProcess;
                }
            }

            var msg = function() {
                me.getFormdata().up('window').body.mask('Saving data, please wait ...');
            };
            switch (me.getFormdata().up('window').state.toLowerCase()) {
                case 'create':
                    store.add(fida);
                    addingRecord = true;
                    break;
                case 'update':
                    var idProperty = store.getProxy().getReader().getIdProperty();
                    var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
                    rec.beginEdit();
                    rec.set(fida);
                    rec.endEdit();
                    break;
                default:
                    return;
            }

            store.on('beforesync', msg);
            store.sync({
                success: function(s) {
                    var res = Ext.decode(s.operations[0].response.responseText)[0];
                    if(res.result == 0){
                        me.getFormdata().up('window').body.unmask();
                        store.un('beforesync', msg);
                        store.reload();

                        if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                            Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                        }
                        Ext.Msg.show({
                            title: 'Failure',
                            msg: res.message,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }else{
                        me.getFormdata().up('window').body.unmask();
                        store.un('beforesync', msg);
                        store.reload();

                        if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                            Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                        }
                        Ext.Msg.show({
                            title: 'Success',
                            msg: 'Data saved successfully.',
                            icon: Ext.Msg.INFO,
                            buttons: Ext.Msg.OK,
                            fn: function() {
                                me.formDataClose();
                            }
                        });
                    }
                },
                failure: function() {
                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    if (store.getCount() > 0 && addingRecord) {
                        store.removeAt(store.getCount() - 1);
                    }
                    store.reload();
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Unable to save data.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        }else{
            Ext.Msg.show({
                title: 'Failure',
                msg: me.checkRequired(form)+' is required.',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        }
    },
    // added by rico 21062021
    checkRequired: function(form){
        var me   = this;
        var items = form.getFields().items;
        var label = [];
        for(var i=0;i<items.length;i++){
            if(!items[i].allowBlank && (items[i].activeError != '' && typeof items[i].activeError !== 'undefined') && items[i].xtype != 'hiddenfield'){
                label.push(items[i].fieldLabel);
            }
        }
        return label.join();
    },
	
    formDataAfterRender: function(el) {

        var me = this;
        me.loadComboBoxStore(el);
        var state = el.up('window').state;
		
        if (state == 'create') {
            // el.down('#active').setValue(1);
            //me.getFormdata().down('#btnSave').setDisabled(false);
        } else {
			me.countLoadProcess = 0;
			me.getFormdata().up('window').body.mask('Loading data, please wait ...');
			
			var grid = me.getGrid();
			var store = grid.getStore();
			var form = me.getFormdata();

			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			el.loadRecord(record);
			
			var purchaseletterpbbdetailStore = me.getPurchaseletterpbbdetailStore();
				purchaseletterpbbdetailStore.removeAll();
				purchaseletterpbbdetailStore.load({params: {purchaseletter_id: record.data.purchaseletter_id}});
        }
    },
	
	//==== Form Data Detail ==========
	
	detailGridSelectionChange: function() {
        var me = this;
        var grid = me.getDetailgrid(), row = grid.getSelectionModel().getSelection();		
        grid.down('#btnEdit').setDisabled(row.length != 1);
        grid.down('#btnDelete').setDisabled(row.length < 1);
    },
	
	formDataDetailShow: function(state) {
        var me = this;
		//var state = 'create';//action == me.bindPrefixName + 'Create' ? 'create' : 'update';
        switch (state) {
            case 'create':
                formtitle = 'Create PBB';
                formicon = 'icon-form-add';
                break;
            case 'update':
                formtitle = 'Edit PBB';
                formicon = 'icon-form-edit';
                break;
        }
		var winId = 'win-pbbformdata';
        var win = desktop.getWindow(winId);	
        if(!win){
            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: 500,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
				state: state,
                //items: Ext.create('Erems.view.' + me.controllerName + '.HgbajbFormData'),
				listeners: {
					boxready: function() {
                        win.body.mask('Loading...');
                        var tm = setTimeout(function() {
                            win.add(Ext.create('Erems.view.' + me.controllerName + '.FormDataDetail'));
                            win.center();
                            win.body.unmask();
                            clearTimeout(tm);
                        }, 1000);
                    },
				}
            });        
        }
        win.show();

    },
	
	formDataDetailAfterRender: function(el) {
        var me = this;
		var state = el.up('window').state;
		
		var formdata = me.getFormdata();
		purchaseletterId = formdata.down('[name=purchaseletter_id]').getValue();
		unitId = formdata.down('[name=unit_id]').getValue();
		
		var formdetail = me.getFormdatadetail();
		formdetail.down('[name=purchaseletter_id]').setValue(purchaseletterId);
		formdetail.down('[name=unit_id]').setValue(unitId);
		
		if (state == 'create') {
            // el.down('#active').setValue(1);
        } else if (state == 'update') {

            var grid = me.getDetailgrid();
            var store = grid.getStore();

            var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            el.loadRecord(record);
        }
    },
	
	dataSaveDetail: function() {
        var me = this;
        var form = me.getFormdatadetail().getForm();
        var addingRecord = false;
       
        if (form.isValid()) {

            resetTimer();
            
            var store = null;
            if (me.instantCreateMode) {

                store = _Apps.getController(me.callerId).getInstanCreateStorex(me.controllerName);
            } else {
                store = me.getDetailgrid().getStore();
            }
            var fida = me.getFinalData(form.getValues());

            var msg = function() {
                me.getFormdatadetail().up('window').body.mask('Saving data, please wait ...');
            };
	
            switch (me.getFormdatadetail().up('window').state.toLowerCase()) {
                case 'create':
                    store.add(fida);
                    addingRecord = true;
                    break;
                case 'update':
                    var idProperty = store.getProxy().getReader().getIdProperty();
                    var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
                    rec.beginEdit();
                    rec.set(fida);
                    rec.endEdit();
                    break;
                default:
                    return;
            }

            store.on('beforesync', msg);
            store.sync({
                success: function() {
                    me.getFormdatadetail().up('window').body.unmask();
                    store.un('beforesync', msg);
                    store.reload({params: {purchaseletter_id: fida.purchaseletter_id}});

                    if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                        Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                    }
                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Data saved successfully.',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {
                            //me.formDataClose();
							me.getFormdatadetail().up('window').close();
                        }
                    });
                },
                failure: function() {
                    me.getFormdatadetail().up('window').body.unmask();
                    store.un('beforesync', msg);
                    if (store.getCount() > 0 && addingRecord) {
                        store.removeAt(store.getCount() - 1);
                    }
                    store.reload();
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Unable to save data.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        }else{
            Ext.Msg.show({
                title: 'Failure',
                msg: me.checkRequired(form)+' is required.',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        }
    },
	
	dataDestroyDetail: function() {
        var me = this;
        var rows = me.getDetailgrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getDetailgrid().getStore();
			
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('nop_dibayar') + ']';
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
                        me.getDetailgrid().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {

                        store.remove(rows[i]);
                    }

                    store.on('beforesync', msg);
                    store.sync({
						success: function(s) {
                            me.getDetailgrid().up('window').unmask();
                            var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                            var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                            store.un('beforesync', msg);
                            store.reload();
                            if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                                Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                            }
                            Ext.Msg.show({
                                title: 'Success',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        },
                        failure: function() {
                            me.getDetailgrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg + ' The data may have been used.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
	//==== end Form Data Detail ======
	

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