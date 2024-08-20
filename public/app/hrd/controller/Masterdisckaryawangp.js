Ext.define('Hrd.controller.Masterdisckaryawangp', {
    extend: 'Hrd.library.template.controller.Controllermanual',
    alias: 'controller.Masterdisckaryawangp',
    requires: [
        'Hrd.template.combobox.Reporttocombobox',
    ],
    views: [
        'masterdisckaryawangp.Panel',
        'masterdisckaryawangp.FormData',
        'masterdisckaryawangp.FormSearch',
        'masterdisckaryawangp.Grid',
    ],
    stores: [
        'Reportto',
        'Masterdisckaryawangp',
    ],
    models: [
        'Masterdisckaryawangp',
    ],
    refs: [
        {ref: 'panel', selector: 'masterdisckaryawangppanel'},
        {ref: 'grid', selector: 'masterdisckaryawangpgrid'},
        {ref: 'formsearch', selector: 'masterdisckaryawangpformsearch'},
        {ref: 'formdata', selector: 'masterdisckaryawangpformdata'},
    ],
    controllerName: 'masterdisckaryawangp',
    fieldName: 'generalparameter_id',
    bindPrefixName: 'Masterdisckaryawangp',
    state: null,
    typedata: 0,
    formWidth: 600,
    urlcommon: 'hrd/common/read',
    urlrequest: null, senddata: null, info: null,
    rowdata: null,
    init: function (application) {
        var me = this;

        this.control({
            'masterdisckaryawangppanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
            },
            'masterdisckaryawangpgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masterdisckaryawangpgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masterdisckaryawangpformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterdisckaryawangpformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function () {
                    var me;
                    me = this;
                    me.formDataBoxready();
                },
            },
            'masterdisckaryawangpformdata button[action=save]': {
                click: this.dataSave

            },
            'masterdisckaryawangpformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'masterdisckaryawangpformsearch': {
                afterrender: this.formSearchAfterRender,

            },
            'masterdisckaryawangpformsearch button[action=search]': {
                click: function () {
                    var me;
                    me = this;
                    me.dataSearch();
                }
            },
            'masterdisckaryawangpformdata [name=employee_value]': {
                select: function (the, newValue, oldValue, eOpts) {
                    var row, form;
                    form = me.getFormdata();
                    row = the.valueModels[0].data;                    
                    form.down("[name='value']").setValue(row['employee_id']);
                    //console.log('row ' + row['employee_id']);
                }
            },
            'masterdisckaryawangpgrid button[action=approve]': {
                click: function () {
                    var me;
                    me = this;
                    me.Approve();
                }
            },
            'masterdisckaryawangpgrid button[action=reject]': {
                click: function () {
                    var me;
                    me = this;
                    me.Reject();
                }
            },

        });        
    },
    formDataAfterRender: function () {
        var me, form, store, combodata;
        me = this;
        form = me.getFormdata();
    },
    formDataBoxready: function () {
        var me, form, statedata, grid, store, record, raw, combodata;
        me = this;
        form = me.getFormdata();
        statedata = form.up('window').state.toLowerCase();
        me.setEmployee(); 
        
        store = form.down("[name='employee_value']").getStore();
        combodata = form.down("[name='employee_value']");
        
        if (statedata == 'update') {
            grid = me.getGrid();
            store = grid.getStore();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            raw = record.raw;
            form.getForm().loadRecord(record);

            // kalau Direktur KP, HC KP Tahap 1, HC KP Tahap 2 pilihnya Master Employee                
            form.down("[name=value]").show();
            form.down("[name=employee_value]").hide();

            if(record.get('name_form') === 'Harga Bangunan'){                
                form.down("[name=satuan]").setValue('&nbsp; % * at cost');
            } else if(record.get('name_form') === 'Reset Masa Kerja'){           
                form.down("[name=satuan]").setValue('&nbsp; tahun');                
            } else if(record.get('name_form') === 'Persen Ditanggung Project'){           
                form.down("[name=satuan]").setValue('&nbsp; %');                
            } else {                
                // kalau Direktur KP, HC KP Tahap 1, HC KP Tahap 2 pilihnya Master Employee   
                form.down("[name=value]").hide();
                form.down("[name=employee_value]").show();
            }
        }       
        
    },
    gridAfterRender: function () {     
        var me = this;
        var grid = me.getGrid();
        var store = grid.getStore();
        store.removeAll();
        me.dataReset();
    },
    setEmployee: function () {
        var me, store, combodata, form, mode_read;
        me = this;
        form = me.getFormdata();
        store = form.down("[name='employee_value']").getStore();
        combodata = form.down("[name='employee_value']");
        
        form.setLoading("Please wait...");
        store.load({
            url: me.urlcommon,
            params: {
                "mode_read": 'getdataemployeedatasubholdingwithexception_for_reportto',
                "project_id": 1,
                "pt_id": 1,
            },
            callback: function (records, operation, success) {
                var data = records;
                store.loadData(data);
                form.setLoading(false);
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
                                                    url: 'hrd/masterdisckaryawangp/read',
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
                                                                        url: 'hrd/masterdisckaryawangp/read',
                                                                        method: 'POST',
                                                                        params: {
                                                                                'mode_read' :'approve',
                                                                                'generalparameter_id': rows[i]['data'].generalparameter_id
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
                                                    url: 'hrd/masterdisckaryawangp/read',
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
                                                                        url: 'hrd/masterdisckaryawangp/read',
                                                                        method: 'POST',
                                                                        params: {
                                                                                'mode_read' :'reject',
                                                                                'generalparameter_id': rows[i]['data'].generalparameter_id
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