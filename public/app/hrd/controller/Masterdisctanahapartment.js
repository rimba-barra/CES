Ext.define('Hrd.controller.Masterdisctanahapartment', {
    extend: 'Hrd.library.template.controller.Controllermanual',
    alias: 'controller.Masterdisctanahapartment',
    requires: [
        'Hrd.template.combobox.Groupcodecombobox',
    ],
    views: [
        'masterdisctanahapartment.Panel',
        'masterdisctanahapartment.FormData',
        'masterdisctanahapartment.FormSearch',
        'masterdisctanahapartment.Grid',
    ],
    stores: [
        'Masterdisctanahapartment',
        'Groupcode',
    ],
    models: [
        'Masterdisctanahapartment',
    ],
    refs: [
        {ref: 'panel', selector: 'masterdisctanahapartmentpanel'},
        {ref: 'grid', selector: 'masterdisctanahapartmentgrid'},
        {ref: 'formsearch', selector: 'masterdisctanahapartmentformsearch'},
        {ref: 'formdata', selector: 'masterdisctanahapartmentformdata'},
    ],
    controllerName: 'masterdisctanahapartment',
    fieldName: 'disctanah_apartment_id',
    bindPrefixName: 'Masterdisctanahapartment',
    state: null,
    typedata: 0,
    formWidth: 500,
    urlcommon: 'hrd/common/read',
    urlrequest: null, senddata: null, info: null,
    rowdata: null,
    init: function (application) {
        var me = this;

        this.control({
            'masterdisctanahapartmentpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
            },
            'masterdisctanahapartmentgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masterdisctanahapartmentgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masterdisctanahapartmentformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterdisctanahapartmentformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function () {
                    var me;
                    me = this;
                    me.formDataBoxready();
                },
            },
            'masterdisctanahapartmentformdata button[action=save]': {
                click: this.dataSave

            },
            'masterdisctanahapartmentformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'masterdisctanahapartmentformdata [name=max_luasbangunan]': {
                change: this.hitungMaxTanah
            },
            'masterdisctanahapartmentformsearch': {
                afterrender: this.formSearchAfterRender,

            },
            'masterdisctanahapartmentformsearch button[action=search]': {
                click: function () {
                    var me;
                    me = this;
                    me.dataSearch();
                }
            },
            'masterdisctanahapartmentgrid button[action=approve]': {
                click: function () {
                    var me;
                    me = this;
                    me.Approve();
                }
            },
            'masterdisctanahapartmentgrid button[action=reject]': {
                click: function () {
                    var me;
                    me = this;
                    me.Reject();
                }
            },

        });        
    },
    formDataAfterRender: function () {
        var me, form;
        me = this;
        form = me.getFormdata();
        me.setGroupcode();
    },
    formDataBoxready: function () {
        var me, form, statedata, grid, store, record, raw;
        me = this;
        form = me.getFormdata();
        statedata = form.up('window').state.toLowerCase();       
         
        if (statedata == 'update') {
            grid = me.getGrid();
            store = grid.getStore();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            raw = record.raw;
            form.getForm().loadRecord(record);
        }
    },
    gridAfterRender: function () {
        var me = this;
        grid = me.getGrid();
        store = grid.getStore();
        store.removeAll();
        me.dataReset();
    },
    hitungMaxTanah: function() {
        var me = this;
        var vs = me.getFormdata().getValues();
        
        var max_luasbangunan = vs["max_luasbangunan"];
        if(max_luasbangunan == undefined || isNaN(max_luasbangunan) ){
            max_luasbangunan = 0;
        }
        var max_tanah = parseFloat(max_luasbangunan) * parseFloat(1.54);
        max_tanah = isNaN(max_tanah) ? 0 : max_tanah;
        me.getFormdata().down("[name=rumus_luas_tanah]").setValue(max_tanah);

    },
    setGroupcode: function () {
        var me, store;
        me = this;
        store = me.getStore("Groupcode");
        store.load();
    },
    Approve: function () {
        var me, grid, rows, data, row, counter, countarray;
        me = this;
        grid = me.getGrid();
        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
			countarray 	= rows.length;
			counter 	= 0;
                        me.arraydata = [];
			
			var cek_belum_approve = 0;	
			for (var i = 0; i < rows.length; i++) {
				var is_approve = rows[i]['data'].is_approve;
				if(is_approve == ''){
					cek_belum_approve++;
				}
			}
			
			if(cek_belum_approve == 0){
				Ext.Msg.alert('Info', 'No record to approve, all record already approved.');
				return;
			}
			
			Ext.Msg.show({
				title: 'Approve',
				msg: 'Are you sure want to Approve ?',
				width: 300,
				closable: false,
				buttons: Ext.Msg.YESNO,
				buttonText:
					{
						yes: 'YES',
						no: 'CANCEL'
					},
				multiline: false,
				fn: function (buttonValue, inputText, showConfig) {
					if (buttonValue == 'yes') {
                                                grid.setLoading(true);
                                                Ext.Ajax.request({
                                                    url: 'hrd/masterdisctanahapartment/read',
                                                    method: 'POST',
                                                    params: {
                                                        mode_read :'validateapprove'
                                                    },
                                                    success: function (response){
                                                        var data = Ext.JSON.decode(response.responseText);
                                                        var counter = data['counter'];
                                                        if(parseInt(counter) == 0){
                                                            grid.setLoading(false);
                                                            Ext.Msg.alert('Warning', 'Do not have authorized to approve');
                                                            return false;

                                                        } else {
                                                            var success = 0;
                                                            var failed = 0;
                                                            var already_approved = 0;
                                                            var count = 0;
                                                            var success_msg = '' ;
                                                            var failed_msg = '' ;
                                                            var already_msg = '' ;
                                                            for (var i = 0; i < rows.length; i++) {
                                                                count++;
                                                                var is_approve = rows[i]['data'].is_approve;
                                                                if(is_approve == ''){
                                                                    Ext.Ajax.request({
                                                                        url: 'hrd/masterdisctanahapartment/read',
                                                                        method: 'POST',
                                                                        params: {
                                                                                'mode_read' :'approve',
                                                                                'disctanah_apartment_id': rows[i]['data'].disctanah_apartment_id
                                                                        },
                                                                        success: function (response) {
                                                                                grid.setLoading(false);
                                                                                var data = Ext.JSON.decode(response.responseText);
                                                                                var data = data['data'];
                                                                                if(data == 'true'){
                                                                                    success++;
                                                                                } else {
                                                                                    failed++;                                                                                
                                                                                }
                                                                                if(rows.length == count){
                                                                                    me.getGrid().getStore().reload();
                                                                                    
                                                                                    if(success > 0){
                                                                                            success_msg = 'Successfully approved ' + success + ' record(s)' ;
                                                                                    }
                                                                                    if(failed > 0){
                                                                                            failed_msg = '<br>Failed to approve '+ failed + ' record(s)';
                                                                                    }
                                                                                    if(already_approved > 0){
                                                                                            already_msg = '<br>Already approved '+ already_approved + ' record(s)';
                                                                                    }

                                                                                    Ext.Msg.alert('Info', success_msg + failed_msg + already_msg);
                                                                                    
                                                                                }
                                                                        },
                                                                        failure: function (response) {
                                                                                grid.setLoading(false);
                                                                        }
                                                                    });
                                                                } else {
                                                                    already_approved++;
                                                                    grid.setLoading(false);
                                                                    if(rows.length == count){
                                                                        me.getGrid().getStore().reload();
                                                                        
                                                                        if(success > 0){
                                                                                success_msg = 'Successfully approved ' + success + ' record(s)' ;
                                                                        }
                                                                        if(failed > 0){
                                                                                failed_msg = '<br>Failed to approve '+ failed + ' record(s)';
                                                                        }
                                                                        if(already_approved > 0){
                                                                                already_msg = '<br>Already approved '+ already_approved + ' record(s)';
                                                                        }
                                                                        
                                                                        Ext.Msg.alert('Info', success_msg + failed_msg + already_msg);
                                                                    }
                                                                    
                                                                }
                                                            }                                                            
                                                                            
                                                        }
                                                    },
                                                    failure: function (response) {
                                                        grid.setLoading(false);
                                                    }
                                                });
					}
				},
				icon: Ext.Msg.QUESTION
			});
			
        }
    },    
    Reject: function () {
        var me, grid, rows, data, row, counter, countarray;
        me = this;
        grid = me.getGrid();
        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
			countarray 	= rows.length;
			counter 	= 0;
                        me.arraydata = [];
			
			var cek_belum_reject = 0;	
			for (var i = 0; i < rows.length; i++) {
				var is_reject = rows[i]['data'].is_reject;
				if(is_reject == ''){
					cek_belum_reject++;
				}
			}
			
			if(cek_belum_reject == 0){
				Ext.Msg.alert('Info', 'No record to reject, all record already rejected.');
				return;
			}
			
			Ext.Msg.show({
				title: 'Reject',
				msg: 'Are you sure want to Reject ?',
				width: 300,
				closable: false,
				buttons: Ext.Msg.YESNO,
				buttonText:
					{
						yes: 'YES',
						no: 'CANCEL'
					},
				multiline: false,
				fn: function (buttonValue, inputText, showConfig) {
					if (buttonValue == 'yes') {
                                                grid.setLoading(true);
                                                Ext.Ajax.request({
                                                    url: 'hrd/masterdisctanahapartment/read',
                                                    method: 'POST',
                                                    params: {
                                                        mode_read :'validateapprove'
                                                    },
                                                    success: function (response){
                                                        var data = Ext.JSON.decode(response.responseText);
                                                        var counter = data['counter'];
                                                        if(parseInt(counter) == 0){
                                                            grid.setLoading(false);
                                                            Ext.Msg.alert('Warning', 'Do not have authorized to reject');
                                                            return false;

                                                        } else {
                                                            var success = 0;
                                                            var failed = 0;
                                                            var already_rejected = 0;
                                                            var count = 0;
                                                            var success_msg = '' ;
                                                            var failed_msg = '' ;
                                                            var already_msg = '' ;
                                                            
                                                            for (var i = 0; i < rows.length; i++) {
                                                                count++;
                                                                var is_reject = rows[i]['data'].is_reject;
                                                                if(is_reject == ''){
                                                                    Ext.Ajax.request({
                                                                        url: 'hrd/masterdisctanahapartment/read',
                                                                        method: 'POST',
                                                                        params: {
                                                                                'mode_read' :'reject',
                                                                                'disctanah_apartment_id': rows[i]['data'].disctanah_apartment_id
                                                                        },
                                                                        success: function (response) {
                                                                                grid.setLoading(false);
                                                                                var data = Ext.JSON.decode(response.responseText);
                                                                                var data = data['data'];
                                                                                if(data == 'true'){
                                                                                    success++;
                                                                                } else {
                                                                                    failed++;                                                                                
                                                                                }
                                                                                if(rows.length == count){
                                                                                    me.getGrid().getStore().reload();
                                                                                    
                                                                                    if(success > 0){
                                                                                            success_msg = 'Successfully rejected ' + success + ' record(s)' ;
                                                                                    }
                                                                                    if(failed > 0){
                                                                                            failed_msg = '<br>Failed to reject '+ failed + ' record(s)';
                                                                                    }
                                                                                    if(already_rejected > 0){
                                                                                            already_msg = '<br>Already rejected '+ already_rejected + ' record(s)';
                                                                                    }

                                                                                    Ext.Msg.alert('Info', success_msg + failed_msg + already_msg);
                                                                                    
                                                                                }
                                                                        },
                                                                        failure: function (response) {
                                                                                grid.setLoading(false);
                                                                        }
                                                                    });
                                                                } else {
                                                                    already_rejected++;
                                                                    grid.setLoading(false);
                                                                    if(rows.length == count){
                                                                        me.getGrid().getStore().reload();
                                                                        
                                                                        if(success > 0){
                                                                                success_msg = 'Successfully rejected ' + success + ' record(s)' ;
                                                                        }
                                                                        if(failed > 0){
                                                                                failed_msg = '<br>Failed to reject '+ failed + ' record(s)';
                                                                        }
                                                                        if(already_rejected > 0){
                                                                                already_msg = '<br>Already rejected '+ already_rejected + ' record(s)';
                                                                        }
                                                                        
                                                                        Ext.Msg.alert('Info', success_msg + failed_msg + already_msg);
                                                                    }
                                                                    
                                                                }
                                                            }                                                            
                                                                            
                                                        }
                                                    },
                                                    failure: function (response) {
                                                        grid.setLoading(false);
                                                    }
                                                });
					}
				},
				icon: Ext.Msg.QUESTION
			});
			
        }
    },
    gridSelectionChange: function() {
            var me = this;
            var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
            var edit = grid.down('#btnEdit');
            var deleteb = grid.down('#btnDelete');
            var approveb = grid.down('#btnApprove');
            var rejectb = grid.down('#btnReject');
            var submitforappb = grid.down('#btnSubmitforapp');
            if (edit !== null) {
                    edit.setDisabled(row.length != 1);
            }
            if (deleteb !== null) {
                    deleteb.setDisabled(row.length < 1);
            }
            if (approveb !== null) {
                    approveb.setDisabled(row.length < 1);
            }
            if (rejectb !== null) {
                    rejectb.setDisabled(row.length < 1);
            }
            if (submitforappb !== null) {
                    submitforappb.setDisabled(row.length < 1);
            }
    }
});