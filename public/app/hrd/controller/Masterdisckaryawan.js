Ext.define('Hrd.controller.Masterdisckaryawan', {
    extend: 'Hrd.library.template.controller.Controllermanual',
    alias: 'controller.Masterdisckaryawan',
    requires: [
        'Hrd.template.combobox.Groupcombobox'
    ],
    views: [
        'masterdisckaryawan.Panel',
        'masterdisckaryawan.FormData',
        'masterdisckaryawan.FormSearch',
        'masterdisckaryawan.Grid',
    ],
    stores: [
        'Group',
        'Masterdisckaryawan'
    ],
    models: [
        'Masterdisckaryawan',
    ],
    refs: [
        {ref: 'panel', selector: 'masterdisckaryawanpanel'},
        {ref: 'grid', selector: 'masterdisckaryawangrid'},
        {ref: 'formsearch', selector: 'masterdisckaryawanformsearch'},
        {ref: 'formdata', selector: 'masterdisckaryawanformdata'},
    ],
    controllerName: 'masterdisckaryawan',
    fieldName: 'disckaryawan_id',
    bindPrefixName: 'Masterdisckaryawan',
    state: null,
    typedata: 0,
    formWidth: 650,
    urlcommon: 'hrd/common/read',
    urlrequest: null, senddata: null, info: null,
    rowdata: null,
    init: function (application) {
        var me = this;

        this.control({
            'masterdisckaryawanpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
            },
            'masterdisckaryawangrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masterdisckaryawangrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masterdisckaryawanformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterdisckaryawanformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function () {
                    var me;
                    me = this;
                    me.formDataBoxready();
                },
            },
            'masterdisckaryawanformdata button[action=save]': {
                click: this.dataSave

            },
            'masterdisckaryawanformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'masterdisckaryawanformdata [name=min_masakerja]': {
                change: this.hitungMinDisc
            },
            'masterdisckaryawanformdata [name=persen_disc_pertahun]': {
                change: this.hitungMinDisc
            },
            'masterdisckaryawanformsearch': {
                afterrender: this.formSearchAfterRender,

            },
            'masterdisckaryawanformsearch button[action=search]': {
                click: function () {
                    var me;
                    me = this;
                    me.dataSearch();
                }
            },

            'masterdisckaryawangrid button[action=approve]': {
                click: function () {
                    var me;
                    me = this;
                    me.Approve();
                }
            },
            'masterdisckaryawangrid button[action=reject]': {
                click: function () {
                    var me;
                    me = this;
                    me.Reject();
                }
            },
        });        
    },
    hitungMinDisc: function() {
        var me = this;
        var vs = me.getFormdata().getValues();
		var min_masakerja = vs["min_masakerja"];
		var persen_disc_pertahun = vs["persen_disc_pertahun"];
		if(min_masakerja == undefined || isNaN(min_masakerja) ){
                    min_masakerja = 0;
		}
		if(persen_disc_pertahun == undefined || isNaN(persen_disc_pertahun)){
                    persen_disc_pertahun = 0;
		}
                var min_disc = parseFloat(min_masakerja) * parseFloat(persen_disc_pertahun);
                min_disc = isNaN(min_disc) ? 0 : min_disc;
                me.getFormdata().down("[name=min_disc]").setValue(min_disc);

    },
    formDataAfterRender: function () {
        var me, form;
        me = this;
        form = me.getFormdata();
    },
    formDataBoxready: function () {
        var me, form, statedata, grid, store, record, raw;
        me = this;
        form = me.getFormdata();
        statedata = form.up('window').state.toLowerCase();     
        me.setGroupbyparam();
         
        if (statedata == 'update') {
            grid = me.getGrid();
            store = grid.getStore();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            raw = record.raw;
            form.getForm().loadRecord(record);
            //form.down("[name=value]").setValue(record.get('value'));
        }
    },
    gridAfterRender: function () {
        var me = this;
        grid = me.getGrid();
        store = grid.getStore();
        store.removeAll();
        me.dataReset();
    },
    setGroupbyparam: function () {
        var me, store, combodata, form, mode_read;
        me = this;
        form = me.getFormdata();
        store = form.down("[name='group_code']").getStore();
        combodata = form.down("[name='group_code']");
        
        store.load({
            url: me.urlcommon,
            params: {
                "mode_read": 'getgroupbyprojectpt_wcac',
                "project_id": 1,
                "pt_id": 1,
            },
            callback: function (records, operation, success) {
                var data = records;
                store.loadData(data);
            }
        });                        
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
                                                    url: 'hrd/masterdisckaryawan/read',
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
                                                                        url: 'hrd/masterdisckaryawan/read',
                                                                        method: 'POST',
                                                                        params: {
                                                                                'mode_read' :'approve',
                                                                                'disckaryawan_id': rows[i]['data'].disckaryawan_id
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
                                                    url: 'hrd/masterdisckaryawan/read',
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
                                                                        url: 'hrd/masterdisckaryawan/read',
                                                                        method: 'POST',
                                                                        params: {
                                                                                'mode_read' :'reject',
                                                                                'disckaryawan_id': rows[i]['data'].disckaryawan_id
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