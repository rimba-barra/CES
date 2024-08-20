Ext.define('Hrd.controller.Employeeptkp', {
    extend: 'Hrd.library.template.controller.Controllermanual',
    alias: 'controller.Employeeptkp',
    requires: [
        'Hrd.library.box.tools.EventSelector1b',
        'Hrd.library.box.tools.Tools',
        'Hrd.library.template.combobox.Departmentcombobox',
        'Hrd.template.combobox.Projectcombobox',
        'Hrd.template.combobox.Ptcombobox',
        'Hrd.template.combobox.Ptkpcombobox',
        'Hrd.template.combobox.Ptkpclaimcombobox', 
    ],
    views: [
        'employeeptkp.Panel',
        'employeeptkp.FormData',
        'employeeptkp.FormSearch',
        'employeeptkp.Grid',
        'employeeptkp.FormAll',
    ],
    stores: [
        'Employeeptkp',
        'Project',
        'Pt',
        'Ptkp',
        'PtkpClaim',
    ],
    models: [
        'Employeeptkp',
        'Ptkp'
    ],
    refs: [
        {ref: 'panel', selector: 'employeeptkppanel'},
        {ref: 'grid', selector: 'employeeptkpgrid'},
        {ref: 'formsearch', selector: 'employeeptkpformsearch'},
        {ref: 'formdata', selector: 'employeeptkpformdata'},
        {ref: 'formall', selector: 'employeeptkpformall'},
    ],
    controllerName: 'employeeptkp',
    fieldName: 'employee_nik',
    bindPrefixName: 'Employeeptkp',
    urldata: 'hrd/employeeptkp/',
    urlcommon: 'hrd/common/read',
    urlrequest: null,
    senddata: null,
    info: null,
    messagedata: null,
    typedata: 0,
    formWidth: 650,
    rowdata: null,
    win: null,
    winId: null,
    arraydata: null,
    loadingrequest: new Ext.LoadMask(Ext.getBody(), {msg: "Please wait..."}),
    init: function (application) {
        var me = this;

        this.control({
            'employeeptkppanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
            },
            'employeeptkpgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'employeeptkpgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },         
            'employeeptkpformsearch button[action=reset]': {
                click: this.dataReset
            },
            'employeeptkpformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function () {
                    var me;
                    me = this;
                    me.formDataBoxready();
                }
            },
            'employeeptkpformdata button[action=save]': {
                click: this.dataSavecustom
                
            },
            'employeeptkpformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'employeeptkpformsearch': {
                afterrender: this.formSearchAfterRender,

            },
            'employeeptkpformsearch button[action=search]': {
                click: function () {
                    var me;
                    me = this;
                    me.dataSearch();
                }
            },            
            'employeeptkpformdata [name=is_applied]': {
                change: function(checkbox, newValue, oldValue, eOpts) {            
                    if(newValue == 1){
                        me.setReadonly(true);
                    } else {
                        me.setReadonly(false);
                    }
                }
            },
            'employeeptkpgrid button[action=updateall]': {
                click: function () {
                    me.showFormAll();
                }
            }, 
            'employeeptkpgrid #EmployeeptkpbtnCheckeds': {
                click: function () {
                    this.checkedSelected(1);
                }
            }, 
            'employeeptkpgrid #EmployeeptkpbtnUncheckeds': {
                click: function () {
                    this.checkedSelected(0);
                }
            }, 
            'employeeptkpgrid #EmployeeptkpbtnCheckedf': {
                click: function () {
                    this.checkedFiltered(1);
                }
            }, 
            'employeeptkpgrid #EmployeeptkpbtnUncheckedf': {
                click: function () {
                    this.checkedFiltered(0);
                }
            },
            'employeeptkpformall': {
                afterrender: this.formDataAfterRender
            },
            'employeeptkpformall button[action=saveselected]': {
                click: this.dataSaveselected
                
            },
            'employeeptkpformall button[action=saveall]': {
                click: this.dataSaveall
                
            },
            'employeeptkpgrid button[action=generate]': {
                click: this.generate
            }, 
            

        });
    },
    formDataAfterRender: function () {
        var me, form, store;
        me = this;
        form = me.getFormdata();
        //me.setStoreProject();
        //me.setStorePt();        
        me.setStorePtkp(); 
        me.setStorePtkpClaim();        
    },
    formDataBoxready: function () {
        var me, form, formvalue, element, statedata, grid, store, record, row;
        me = this;
        form = me.getFormdata();
        statedata = form.up('window').state.toLowerCase();
        if (statedata == 'update') {
            grid = me.getGrid();
            store = grid.getStore();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            form.getForm().loadRecord(record);
            row = record.raw;

            // console.log(row);
            form.down('[name=ptkp_claim_id]').setValue(row.ptkp_claim_id);
            form.down('[name=ptkp_id]').setValue(row.ptkp_id);
            // alert(row.ptkp_claim_id); alert(row.ptkp_id);

            if (statedata == 'update') {                
                if(row.is_applied == 1){
                    me.setReadonly(true);
                } else {
                    me.setReadonly(false);
                }
            }
        }
    },
    gridActionColumnClick: function (view, cell, row, col, e) {
        var me = this;
        var record = me.getGrid().getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);
        me.getGrid().getSelectionModel().select(row);
        if (m) {
            switch (m[1]) {
                case 'update':
                    me.formDataShow('update');
                    break;
                case 'destroy':
                    me.dataDestroy();
                    break;
            }
        }
    },
    dataSavecustom: function () {
        var me, form, formvalue, state_submit;
        me = this;
        form = me.getFormdata();
        
        // enable sebelum submit supaya nilai tetap terkirim
        form.down('[name=is_applied]').setDisabled(false);  
        
        formvalue = form.getForm().getValues();
        if (form.getForm().isValid()) {
            state_submit = me.getFormdata().up('window').state.toLowerCase();
            me.urlrequest = me.urldata + state_submit;
            formvalue['hideparam'] = state_submit;
            formvalue['mode_read'] = state_submit;
                        
            
            me.senddata = formvalue;
            switch (state_submit) {
                case 'update':
                    form.up('window').body.mask('Saving data, update data please wait ...');
                    
                    Ext.Ajax.request({
                        url: me.urlrequest,
                        method: 'POST',
                        params: {
                            data: Ext.encode(me.senddata)
                        },
                        success: function (response) {
                            me.info = Ext.JSON.decode(response.responseText);
                            me.setSuccessEvent();
                            form.up('window').body.unmask();
                        },
                        failure: function (response) {
                            me.getFormdata().up('window').close();
                        }
                    });
                    break;
            }
        }
    },
    dataSaveselected: function () {
        var me, form, data, row, counter, countarray, formvalue, info;
        me = this;
        form = me.getFormall();
        
        if (!form.getForm().isValid()) {
            return false;
        }
        
        
        if (me.arraydata == null || me.arraydata.length == 0 ){
            Ext.Msg.show({
                title: 'Error',
                msg: 'Please Select Record',
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK,
                fn: function () {
                    me.getFormall().up('window').close();
                }
            });
                                    
        } else {
            
            form.up('window').body.mask('Saving data, update data please wait ...');
            
            data = me.arraydata;
            countarray = data.length;
            counter = 0;
            
            me.urlrequest = me.urldata + 'updateall';
            formvalue = form.getForm().getValues();

            Ext.each(data, function (value) {      
                formvalue['employeeptkp_id'] = value;      
                formvalue['hideparam'] = 'updateselected';   
                Ext.Ajax.request({
                    url: me.urlrequest,
                    method: 'POST',
                    timeout: 90000000,
                    params: {
                        mode_read : 'updateselected',
                        data: Ext.encode(formvalue)
                    },
                    success: function (response) {
                        counter++;                   

                        if (countarray == counter) {            
                            me.getGrid().getStore().reload();
                            form = me.getFormall();
                            form.up('window').body.unmask();
                            info = Ext.JSON.decode(response.responseText);
                            Ext.Msg.show({
                                title: 'Success',
                                msg: info.msg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK,
                                fn: function () {
                                    me.getFormall().up('window').close();
                                }
                            });
                            me.arraydata = null;
                            
                        }
                    },
                    failure: function (response) {
                        
                    }
                });
            });
        }
    },
    dataSaveall: function () {
        var me, form, forms, formvalue, formsvalue, info, grid, ptkp_id, effective_date, ptkp_claim_id, claim_effective_date, note;
        me = this;
        form = me.getFormall();
        
        if (!form.getForm().isValid()) {
            return false;
        }
        
        Ext.Msg.show({
            title: 'Confirm Update',
            msg: 'Are you sure want to update All Filtered records ?',
            width: 300,
            closable: false,
            buttons: Ext.Msg.YESNO,
            buttonText:
                {
                    yes: 'YES',
                    no: 'NO'
                },
            multiline: false,
            fn: function (buttonValue, inputText, showConfig) {
                if (buttonValue == 'yes') {
                    
                    form.up('window').body.mask('Saving data, update data please wait ...');

                    me.urlrequest = me.urldata + 'updateall';
                    formvalue = form.getForm().getValues();

                    forms = me.getFormsearch();
                    formsvalue = forms.getForm().getValues();

                    Ext.Ajax.request({
                        url: me.urlrequest,
                        method: 'POST',
                        timeout: 90000000,
                        params: {
                            data: Ext.encode(formsvalue),
                            mode_read: 'updateall',
                            ptkp_id: form.down("[name=ptkp_id]").getValue(),
                            effective_date: form.down("[name=effective_date]").getValue(),
                            ptkp_claim_id: form.down("[name=ptkp_claim_id]").getValue(),
                            claim_effective_date: form.down("[name=claim_effective_date]").getValue(),
                            note: form.down("[name=note]").getValue()
                        },
                        success: function (response) {                
                            me.getGrid().getStore().reload();
                            form = me.getFormall();
                            form.up('window').body.unmask();
                            info = Ext.JSON.decode(response.responseText);
                            Ext.Msg.show({
                                title: 'Success',
                                msg: info.msg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK,
                                fn: function () {
                                    me.getFormall().up('window').close();
                                }
                            });
                        },
                        failure: function (response) {

                        }
                    });
                
                }
            },
            icon: Ext.Msg.QUESTION
        });
        
        
    },
    /*
    filterPtbyprojectbyparam: function (form, prefix_id, project_id) {
        var me, form, store, combodata, prefix;
        me = this;
        store = form.down("[name=" + prefix_id + "]").getStore();
        combodata = form.down("[name=" + prefix_id + "]");
        store.load({
            params: {
                "mode_read": 'getpt',
                "project_id": project_id,
            },
            callback: function (records, operation, success) {
                if (records !== null) {
                    var data = records[0].raw.others[0][0].data;
                    store.loadData(data);
                    prefix = combodata.getValue();
                    if (prefix !== null) {
                        combodata.setValue(prefix);
                    }
                }
            }
        });
    },
    setStoreProject: function () {
        var me, store, form, combodata, prefix;
        me = this;
        store = me.getStore("Project");
        form = me.getFormdata();
        combodata = form.down("[name=new_project_id]");
        store.load({
            params: {
                "mode_read": 'getproject',
            },
            callback: function (records, operation, success) {
                var data = records[0].raw.others[0][0].data;
                store.loadData(data);
                prefix = combodata.getValue();
                if (prefix !== null) {
                    combodata.setValue(prefix);
                }
            }
        });
    },
    setStorePt: function () {
        var me, store, form, combodata, prefix;
        me = this;
        form = me.getFormdata();
        store = me.getStore("Pt");
        combodata = form.down("[name=new_pt_id]");
        store.load({
            params: {
                "mode_read": 'getpt',
            },
            callback: function (records, operation, success) {
                var data = records[0].raw.others[0][0].data;
                store.loadData(data);
                prefix = combodata.getValue();
                if (prefix !== null) {
                    combodata.setValue(prefix);
                }
            }
        });
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 90000000, // comment by Wulan Sari 2018.07.17
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                me.info = Ext.JSON.decode(response.responseText);
                me.setSuccessEvent();
            },
            failure: function (response) {
                me.getFormdata().up('window').close();
            }
        });
    },*/
    
    setSuccessEvent: function () {
        var me = this;
        var data = me.info.data;
        switch (me.info.parameter) {
            case 'default':
                break;
            case 'create':
                if (me.info.success == 'true') {
                    me.messagedata = me.info.msg;
                    me.alertFormdataSuccess();
                } else {
                    me.messagedata = me.info.msg;
                    me.alertFormdataFailed();
                }
                break;
            case 'update':
                if (me.info.success == 'true') {
                    me.messagedata = me.info.msg;
                    me.alertFormdataSuccess();
                } else {
                    me.messagedata = me.info.msg;
                    me.alertFormdataFailed();
                }
                break;
        }
    },
    alertFormdataSuccess: function () {
        var me, form, store;
        me = this;
        me.getGrid().getStore().reload();
        form = me.getFormdata();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Success',
            msg: me.messagedata,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK,
            fn: function () {
                me.formDataClose();
            }
        });
    },
    alertFormdataFailed: function () {
        var me, form, store;
        me = this;
        me.getGrid().getStore().reload();
        form = me.getFormdata();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Failure',
            msg: 'Error: ' + me.messagedata,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });
    },
    setStorePtkp: function () {
        var me, store,prefix,form;
        me = this;
        store = me.getStore("Ptkp");
        store.load();
        // form = me.getFormdata();
        // store = form.down("[name=ptkp_id]").getStore();
        // combodata = form.down("[name=ptkp_id]");
        // prefix = "ptkp_id";
        // store.load({
        //     url: me.urlcommon,
        //     params: {
        //         "mode_read": 'getptkp',
        //     },
        //     callback: function (records, operation, success) {
        //         var data = records;
        //         store.loadData(data);
        //         prefix = combodata.getValue();
        //         if (prefix !== null) {
        //             combodata.setValue(prefix);
        //         }
        //     }
        // });
    },
    setStorePtkpClaim: function () {
        var me, store, form,prefix;
        me = this;
        // form = me.getFormdata();
        // store = form.down("[name=ptkp_claim_id]").getStore();
        store = me.getStore("PtkpClaim");
        store.load();
        // combodata = form.down("[name=ptkp_claim_id]");
        // prefix = "ptkp_claim_id";
        // store.load({
        //     url: me.urlcommon,
        //     params: {
        //         "mode_read": 'getptkp',
        //     },
        //     callback: function (records, operation, success) {
        //         var data = records;
        //         store.loadData(data);
        //         prefix = combodata.getValue();
        //         if (prefix !== null) {
        //             combodata.setValue(prefix);
        //         }
        //     }
        // });
    },
  
    setReadonly: function (val) {
        var me, form;
        me = this;
        form = me.getFormdata();
        form.down('[name=ptkp_id]').setReadOnly(val);
        form.down('[name=effective_date]').setReadOnly(val);
        form.down('[name=ptkp_claim_id]').setReadOnly(val);
        form.down('[name=claim_effective_date]').setReadOnly(val);
        form.down('[name=is_checked]').setReadOnly(val);
        form.down('[name=is_applied]').setDisabled(!val);        
        if(val){
            form.down('[name=is_applied]').getEl().setStyle('backgroundColor', '#BCF5A9');
        } 
    },
    showFormAll: function () {
        
        var me, grid, rows;
        me = this;
        grid = me.getGrid();
        rows = grid.getSelectionModel().getSelection();
        if (rows.length != 0) {
            me.arraydata = [];
            for (var i = 0; i < rows.length; i++) {
                me.arraydata.push(rows[i]['data'].employeeptkp_id);
            }            
        }
        
        var me = this;
        var win = me.instantWindow("FormAll", me.formWidth, "Update Selected / Filtered", "create", "employeeptkpformall");
        var form = me.getFormall();
        form.down("[name=mode_name]").setValue();
        
    },
    checkedSelected: function (check) {
        
        var me, grid, rows, data, countarray, counter, info, mode_read, text;
        me = this;
        grid = me.getGrid();
        rows = grid.getSelectionModel().getSelection();
        if (rows.length != 0) {
            me.arraydata = [];
            for (var i = 0; i < rows.length; i++) {
                me.arraydata.push(rows[i]['data'].employeeptkp_id);
            }            
        }
        
        if (me.arraydata == null){
            Ext.Msg.show({
                title: 'Error',
                msg: 'Please Select Record',
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK,
                fn: function () {
                }
            });
                                    
        } else {
            data = me.arraydata;
            countarray = data.length;
            counter = 0;
            
            me.urlrequest = me.urldata + 'updateall';            
            mode_read = check == 1 ? 'checked' : 'unchecked'
            text = check == 1 ? 'Checked' : 'Unchecked';
            
            Ext.Msg.show({
            title: 'Confirm',
            msg: 'Are you sure want to ' + text + ' selected records ?',
            width: 300,
            closable: false,
            buttons: Ext.Msg.YESNO,
            buttonText:
            {
                yes: 'YES',
                no: 'NO'
            },
            multiline: false,
            fn: function (buttonValue, inputText, showConfig) {
                if (buttonValue == 'yes') {
                    
                    me.getGrid().up('window').body.mask('Saving data, update data please wait ...');

                    Ext.each(data, function (value) {
                        Ext.Ajax.request({
                            url: me.urlrequest,
                            method: 'POST',
                            timeout: 90000000,
                            params: {
                                employeeptkp_id: value,
                                mode_read:mode_read,
                                is_checked:check
                            },   
                            success: function (response) {
                                counter++;                   

                                if (countarray == counter) {            
                                    me.getGrid().getStore().reload();
                                    grid.up('window').body.unmask();
                                    info = Ext.JSON.decode(response.responseText);
                                    Ext.Msg.show({
                                        title: 'Success',
                                        msg: info.msg,
                                        icon: Ext.Msg.INFO,
                                        buttons: Ext.Msg.OK,
                                        fn: function () {
                                        }
                                    });
                                    
                                    me.arraydata = null;
                                }
                            },
                            failure: function (response) {

                            }
                        });
                    });
                    
                }
            }
            });           
            
        }
    },
    checkedFiltered: function (check) {
        var me, form, forms, formsvalue, info, mode_read, text;
        me = this;
        
        text = check == 1 ? 'Checked' : 'Unchecked';
                    
        Ext.Msg.show({
            title: 'Confirm',
            msg: 'Are you sure want to ' + text + ' all filtered records ?',
            width: 300,
            closable: false,
            buttons: Ext.Msg.YESNO,
            buttonText:
                    {
                        yes: 'YES',
                        no: 'NO'
                    },
            multiline: false,
            fn: function (buttonValue, inputText, showConfig) {
                if (buttonValue == 'yes') {
                    
                    me.getGrid().up('window').body.mask('Saving data, update data please wait ...');

                    me.urlrequest = me.urldata + 'updateall';
                    
                    forms = me.getFormsearch();
                    formsvalue = forms.getForm().getValues();
                    mode_read = check == 1 ? 'checkedf' : 'uncheckedf'
                    Ext.Ajax.request({
                        url: me.urlrequest,
                        method: 'POST',
                        timeout: 90000000,
                        params: {
                            data: Ext.encode(formsvalue),
                            mode_read: mode_read,
                            is_checked:check
                        },
                        success: function (response) {                
                            me.getGrid().getStore().reload();
                            me.getGrid().up('window').body.unmask();
                            info = Ext.JSON.decode(response.responseText);
                            Ext.Msg.show({
                                title: 'Success',
                                msg: info.msg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK,
                                fn: function () {
                                }
                            });
                        },
                        failure: function (response) {

                        }
                    });
                
                }
            },
            icon: Ext.Msg.QUESTION
        });
        
        
    },
    generate: function(){
        var me = this;
        var dt = new Date();
        var y = dt.getFullYear();
        Ext.Msg.prompt(
        "Generate PTKP",
        "Periode",
        function (btn, inputValue) {
            if (btn == "ok") {
                if(inputValue == '' || parseInt(inputValue) < y || isNaN(inputValue)){
                     Ext.Msg.show({
                        title: 'Error',
                        msg: 'Please enter a valid Periode',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                        }
                    });
                } else {

                    Ext.Msg.show({
                        title: 'Confirm Generate',
                        msg: 'Are you sure want to Generate PTKP Periode ' + inputValue + ' ?',
                        width: 300,
                        closable: false,
                        buttons: Ext.Msg.YESNO,
                        buttonText:
                            {
                                yes: 'YES',
                                no: 'NO'
                            },
                        multiline: false,
                        fn: function (buttonValue, inputText, showConfig) {
                            if (buttonValue == 'yes') {
                                    me.urlrequest = me.urldata + 'generate';
                                    me.getGrid().up('window').body.mask('Saving data, update data please wait ...');                                  
                                    Ext.Ajax.request({
                                        url: me.urlrequest,
                                        method: 'POST',
                                        timeout: 90000000,
                                        params: {
                                            mode_read : 'generate',
                                            periode : inputValue,
                                        },
                                        success: function (response) {          
                                                me.getGrid().getStore().reload();                                            
                                                me.getGrid().up('window').body.unmask();
                                        },
                                        failure: function (response) {                                   
                                                me.getGrid().up('window').body.unmask();
                                        }
                                    });
                            }
                        }
                    });

                }
            }
        },
        null,
        false,
        y,
        {xtype:'textfield'});
    },


});