Ext.define('Cashier.controller.Pengajuanserahterima', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Pengajuanserahterima',
    requires: [
        'Cashier.library.box.Config',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.box.tools.Tools',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Unitnumbercombobox'
    ],
    views: [
        'pengajuanserahterima.Panel',
        'pengajuanserahterima.Grid',
        'pengajuanserahterima.FormSearch',
        'pengajuanserahterima.FormData',
    ],
    stores: [
        'Pengajuanserahterima',
        'Project',
        'Ptbyuser',
        'Pt',
        'Unitnumber'
    ],
    models: [
        'Pengajuanserahterima',
        'Project',
        'Pt',
        'Unitnumber'
    ],
    refs: [
        {ref: 'panel', selector: 'pengajuanserahterimapanel'},
        {ref: 'grid', selector: 'pengajuanserahterimagrid'},
        {ref: 'formsearch', selector: 'pengajuanserahterimaformsearch'},
        {ref: 'formdata', selector: 'pengajuanserahterimaformdata'},
    ],
    controllerName: 'pengajuanserahterima',
    formWidth: 500,
    fieldName: 'unit_id',
    bindPrefixName: 'Pengajuanserahterima',
    urldata: 'cashier/pengajuanserahterima/',
    messagedata: null,
    senddata: null,
    info: null,
    state: null,
    loadingrequest: new Ext.LoadMask(Ext.getBody(), {msg: "Please wait..."}),
    project_id: apps.project,
    pt_id: apps.pt,
    valueform: null,
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });

    },
    getMe: function(){
        var me = this;
        return _Apps.getController(me.bindPrefixName);
    },
    init: function(application) {
        var me = this.getMe();
        var events = new Cashier.library.box.tools.EventSelector();
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
        var me = this.getMe();

        this.control({
            'pengajuanserahterimapanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    this.panelAfterRender();
                    panel.up('window').maximize();
                    panel.up('window').setTitle("Pengajuan Serah Terima");
                },
            },
            'pengajuanserahterimagrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
                select: this.gridSelected,
            },
            'pengajuanserahterimaformsearch': {
                afterrender: function () {
                    var me = this.getMe();
                    me.initPT();                    
                    var form = me.getFormsearch();
                    var store = me.getStore("Unitnumber");
                    
                    form.down("[name=unit_id]").on('keyup' , function(e, t, eOpts){
                        
                        store.proxy.extraParams = {
                            "hideparam": 'getunit',
                            "project_id": me.project_id,
                            "pt_id": me.pt_id,
                        }

                    });

                },
            },
            'pengajuanserahterimaformsearch button[action=search]': {
                click: this.dataSearch
            },
            'pengajuanserahterimaformsearch button[action=reset]': {
                click: this.dataReset
            },
            'pengajuanserahterimagrid toolbar button[action=update]': {
                click: function () {
                    var me = this.getMe();
                    if( !me.checkAvailability() ){
                        me.buildWarningAlert('No data selected.');
                        return 0;
                    }
                    me.formDataShow('update');
                }
            },
            'pengajuanserahterimagrid toolbar button[action=destroy]': {
                click: function () {
                    var me = this.getMe();
                    if( !me.checkAvailability() ){
                        me.buildWarningAlert('No data selected.');
                        return 0;
                    }
                    me.dataDestroycustome();
                }
            },
            'pengajuanserahterimaformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function () {
                    me.setFormdataready();
                }
            },
            'pengajuanserahterimaformdata [name=pt_id]':{
                'select': function (g, record, item, index, e, eOpts) {
                    console.log('select');
                    var me, form;
                    me = this.getMe();
                    form = me.getFormdata();
                    form.down('[name=project_id]').setValue(form.down('[name=pt_id]').valueModels[0].data.project_id);
                    form.down('[name=projectname]').setValue(form.down('[name=pt_id]').valueModels[0].data.projectname);
                    form.down('[name=ptname]').setValue(form.down('[name=pt_id]').valueModels[0].data.ptname);
                    me.project_id = form.down('[name=pt_id]').valueModels[0].data.project_id;
                    me.pt_id = form.down('[name=pt_id]').getValue();
                    console.log(me.project_id+' '+me.pt_id);
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    console.log('change');
                    var me, form;
                    me = this.getMe();
                    form = me.getFormdata();
                    form.down('[name=project_id]').setValue(form.down('[name=pt_id]').valueModels[0].data.project_id);
                    form.down('[name=projectname]').setValue(form.down('[name=pt_id]').valueModels[0].data.projectname);
                    form.down('[name=ptname]').setValue(form.down('[name=pt_id]').valueModels[0].data.ptname);
                    me.project_id = form.down('[name=pt_id]').valueModels[0].data.project_id;
                    me.pt_id = form.down('[name=pt_id]').getValue();
                    console.log(me.project_id+' '+me.pt_id);
                    me.setStoreUnitPt();
                },
            },
            'pengajuanserahterimaformdata [name=unit_id]':{
                'select': function (g, record, item, index, e, eOpts) {
                    var me, form, rencana_serahterima_date;
                    me = this.getMe();
                    form = me.getFormdata();
                    rencana_serahterima_date = form.down('[name=unit_id]').valueModels[0].data.rencana_serahterima_date;
                    form.down('[name=rencana_serahterima_date]').setValue( me.formatDateCustomeIndo(new Date(rencana_serahterima_date), '-') );
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form;
                    me = this.getMe();
                    form = me.getFormdata();
                },
            },
            'pengajuanserahterimaformdata [action=save]': {
                click: this.dataSavecustome
            },
        });
    },
    initPT: function () {
        //INIT PT jika kosong, default ke session
        var me = this.getMe();
        if(me.pt_id==0 || me.pt_id==''){
            me.pt_id = apps.pt;
        }
        if(me.project_id==0 || me.project_id==''){
            me.project_id = apps.project;
        }
        if(parseInt(me.project_id) !== parseInt(apps.project)){
            me.pt_id = apps.pt;
            me.project_id = apps.project;
        }
        me.pt_id = parseInt(me.pt_id);
        me.project_id = parseInt(me.project_id);
    },
    checkAvailability: function () {
        var me, records;
        me = this.getMe();
        records = me.getGrid().getSelectionModel().getSelection();
        if(records.length == 0 ){
            return false;
        }else{
            return true;
        }
    },
    dataSearch: function () {
        resetTimer();
        var me = this.getMe();
        var grid;
        var form = me.getFormsearch().getForm();
        grid = me.getGrid();
        var store = grid.getStore();
        me.getFormsearch().down("[name=hideparam]").setValue('default'); // added on april 2016, ahmad riadi    
        var fields = me.getFormsearch().getValues();
        fields['project_id'] = me.project_id;
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
    },
    panelAfterRender: function () {
        var me = this.getMe();
        me.setStorePt();
    },
    formDataAfterRender: function (el) {
        var me, grid, form, store, record, counter;
        me = this.getMe();
        me.fdar().init();
        form = me.getFormdata();
        var state = el.up('window').state;

        if ( state == 'create' ) {

        }else{
            me.fdar().update();
            grid = me.getGrid();
            store = grid.getStore();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            counter = store.getCount();
            if(record == null || record==false || record.length < 1){
                Ext.Msg.alert('Warning', 'Please select data.');
                return 0;
            }

            if ( counter > 0 ) {
                row = record['data'];
                row.unit_id = parseInt(row.unit_id);
                var storeunit = me.getStore('Unitnumber');
                if(row.unit_id>0){
                    storeunit.load({
                        params: {
                            "query": row.unit_id,
                            "hideparam": 'getunit',
                            "project_id": row.project_id,
                            "pt_id": row.pt_id,
                        },
                        callback: function (records, operation, success) {
                             form.down("[name=unit_id]").setValue(row.unit_id);
                        }
                    });
                }
            }
        }
    },
    setFormdataready: function () {
        var me, state, grid, form, store, record, counter;
        me = this.getMe();
        form = me.getFormdata();
        state = form.up('window').state.toLowerCase();

        switch (state) {
            case 'create':
                me.setStorePtuser();
                break;
            case 'update':
                // update
                form.down('[name=pt_id]').setReadOnly(true);
                me.setUnitStore();
                grid = me.getGrid();
                store = grid.getStore();
                record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                counter = store.getCount();
                if(record == null || record==false || record.length < 1){
                    Ext.Msg.alert('Warning', 'Please select data.');
                    return 0;
                }

                if ( counter > 0 ) {
                    row = record['data'];
                    var storeunit = me.getStore('Unitnumber');
                    if(row.unit_number != '' ){
                        storeunit.load({
                            params: {
                                "query": row.unit_number,
                                "hideparam": 'getunit',
                                "project_id": row.project_id,
                                "pt_id": row.pt_id,
                            },
                            callback: function (records, operation, success) {
                                console.log(records);
                                form.down("[name=unit_id]").setValue(records[0].data.unit_id);
                            }
                        });
                    }
                }
                break;
            }

    },
    setStorePt: function () {
        var me, store, form;
        me = this.getMe();
        me.initPT();
        form = me.getFormdata();
        store = me.getStore("Ptbyuser");
        store.load({
            params: {
                "hideparam": 'getptbyuser',
                "project_id": me.project_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
            }
        });

    },
    setStorePtuser: function () {
        var me, store, form;
        me = this.getMe();
        me.initPT();
        form = me.getFormdata();
        store = me.getStore("Ptbyuser");
        store.load({
            params: {
                "hideparam": 'getptbyuser',
                "project_id": me.project_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                store.each(function (record)
                {
                    if (record.data['project_id'] == me.project_id && record.data['pt_id'] == me.pt_id) {
                        me.setVal(form, 'pt_id', record.data['pt_id']);
                    }
                });
            }
        });

    },
    setUnitStore: function () {
        var me, store, form;
        me = this.getMe();
        form = me.getFormdata();
        store = me.getStore("Unitnumber");
        store.load({
            params: {
                "hideparam": 'getunit',
                "project_id": me.project_id,
                "pt_id": me.pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
            }
        });

    },
    setStoreUnitPt: function () {
        var me, store, form;
        me = this.getMe();
        form = me.getFormdata();
        store = me.getStore("Unitnumber");
        store.load({
            params: {
                "hideparam": 'getunit',
                "project_id": me.project_id,
                "pt_id": me.pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
            }
        });


        form.down("[name=unit_id]").on('keyup' , function(e, t, eOpts){
          store.proxy.extraParams = {
                "hideparam": 'getunit',
                "project_id": me.project_id,
                "pt_id": me.pt_id,
            }
        });

    },
    gridSelectionChange: function () {
        var me = this.getMe();
        var grid = me.getGrid();
        var row = grid.getSelectionModel().getSelection();
        if ( row.length > 0 ) {
            grid.down('#btnEdit').setDisabled(false);
            grid.down('#btnDelete').setDisabled(false);
        }else{
            grid.down('#btnEdit').setDisabled(true);
            grid.down('#btnDelete').setDisabled(true);
        }
    },
    gridSelected: function () {
        var me, grid, store, counter, record, row;
        me = this.getMe();
        grid = me.getGrid();
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            grid.down('#btnEdit').setDisabled(false);
            grid.down('#btnDelete').setDisabled(false);
        }else{
            grid.down('#btnEdit').setDisabled(true);
            grid.down('#btnDelete').setDisabled(true);
        }
    },
    AjaxRequest: function(form = '') {
        var me;
        me = this;
        if (form != '') {
            Ext.Ajax.request({
                url: 'cashier/pengajuanserahterima/read',
                timeout: 45000000,
                method: 'POST',
                params: {
                    data: Ext.encode(me.senddata)
                },
                success: function(response) {

                    if (response.responseText.includes("Belum ada")) {
                        Ext.Msg.alert('Error', response.responseText);
                        form.up('window').close();
                        return false;
                    }

                    try {
                        me.info = Ext.JSON.decode(response.responseText);
                        me.setSuccessEvent(form);
                    } catch (err) {
                        Ext.Msg.alert('Error', 'Request Failed.');
                        form.up('window').close();
                    }


                },
                failure: function(response) {
                    form.up('window').close();
                }
            });
        }
    },
    setSuccessEvent: function(form = '') {
        var me, value, data, form, voucher_date, duedate, state;
        me = this;
        if (form != '') {
            data = me.info.data;
            switch (me.info.parameter) {
                case 'getbankcode':
                var f = me.getFormdata();
                state = f.up('window').state.toLowerCase();
                f.down("[name=bank_code]").setValue(data[0].bank_code);
                break;
            }
        }
    },
    dataSavecustome: function() {
        var me, state, form, formdata, addingRecord, store, valuedata, idProperty, rec, paramdata, rowdata, resjsonheader, rowjsonheader, validheader, paramheader, idProperty, msgheader, restotal, error;
        me = this.getMe();
        error = false;
        form = me.getFormdata();
        formdata = me.getFormdata().getForm();
        state = form.up('window').state.toLowerCase();

        var pt_id = form.down('[name=pt_id]').getValue();
        var unit_id = form.down('[name=unit_id]').getValue();
        var rencana_serahterima_date = form.down('[name=rencana_serahterima_date]').getValue();
        var rencana_serahterima_aju_date = form.down('[name=rencana_serahterima_aju_date]').getValue();

        if ( pt_id == null || pt_id == 0 ) {
            me.buildWarningAlert('Please choose project/pt');
            error = true;
            return 0;
        }

        if ( unit_id == null || unit_id == 0 ) {
            me.buildWarningAlert('Please choose unit number');
            error = true;
            return 0;
        }

        if ( rencana_serahterima_date == null || rencana_serahterima_date == '' ) {
            me.buildWarningAlert('Select date');
            error = true;
            return 0;
        }

        if ( rencana_serahterima_aju_date == null || rencana_serahterima_aju_date == '' ) {
            me.buildWarningAlert('Select date');
            error = true;
            return 0;
        }

        if(error){
            return 0;
        }

        if ( formdata.isValid() ) {
            resetTimer();
            valuedata = formdata.getValues();
            store = me.getGrid().getStore();
            form.up('window').body.mask('Saving data, please wait ...');

            switch(state){
                case 'create':
                    store.add(valuedata);
                    addingRecord = true;
                    me.valueform = valuedata;
                    break;
                case 'update':
                    idProperty = store.getProxy().getReader().getIdProperty();
                    rec = store.getById(parseInt(formdata.findField(idProperty).getValue(), 10));
                    rec.beginEdit();
                    rec.set(valuedata);
                    rec.endEdit();
                    valuedata['hideparam'] = 'default';
                    me.valueform = valuedata;
                    break;
            }

            Ext.Ajax.request({
                url: me.urldata + state,
                method: 'POST',
                params: {
                    data: Ext.encode(valuedata)
                },
                success: function (response) {
                    me.messagedata = 'Data Saved';
                    me.alertFormdataSuccess();
                },
                failure: function (response) {
                    me.messagedata = 'Failed to insert data';
                    me.alertFormdataFailed();
                    throw me.messagedata;
                }
            });
        }
    },
    dataDestroycustome: function() {
        var me = this;
        var ids = [];
        var rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGrid().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + rows[0].data.unit_number + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }

            for (var i = 0; i < rows.length; i++) {
                ids.push(rows[i].data.pengajuanserahterima_id);
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

                    Ext.Ajax.request({
                        url: me.urldata + 'delete',
                        method: 'POST',
                        params: {
                            data: Ext.encode({
                                hideparam: 'default',
                                pengajuanserahterima_id: ids
                            })
                        },
                        success: function(response) {
                            me.getGrid().up('window').unmask();
                            me.getGrid().getStore().reload();
                            Ext.Msg.show({
                                title: 'Success',
                                msg: 'Data Deleted',
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        },
                        failure: function(response) {
                            me.getGrid().up('window').unmask();
                            me.getGrid().getStore().reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: 'Data Error',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    })

                }
            });
        }
    },
    alertFormdataSuccess: function() {
        var me, form, store;
        me = this;
        form = me.getFormdata();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Success',
            msg: me.messagedata,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK,
            fn: function() {
                me.getFormdata().up('window').close();
                me.getGrid().getStore().reload();
            }
        });
    },
    alertFormdataFailed: function() {
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
});