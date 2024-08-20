Ext.define('Hrd.controller.Workgroupemployee', {
    extend: 'Hrd.library.template.controller.Controllermanual',
    alias: 'controller.Workgroupemployee',
    requires: [
        'Hrd.library.template.combobox.Employeecombobox',
        'Hrd.library.template.combobox.Shifttypecombobox',
    ],
    views: [
        'workgroupemployee.Panel',
        'workgroupemployee.FormSearch',
        'workgroupemployee.Grid',
        'workgroupemployee.Gridemployee',
    ],
    stores: [
        'Workgroup',
        'Workgroupdetail',
        'Workgroupdetailshift',
        'Employee',
        'Shifttype',
    ],
    models: [
        'Workgroup',
        'Workgroupdetail',
        'Workgroupdetailshift',
    ],
    refs: [
        {ref: 'formdata', selector: 'workgroupemployeeformdata'},
        {ref: 'formdatadetail', selector: 'workgroupemployeeformdatadetail'},
        {ref: 'formdatadetailshift', selector: 'workgroupemployeeformdatadetailshift'},
        {ref: 'panel', selector: 'workgroupemployeepanel'},
        {ref: 'grid', selector: 'workgroupemployeegrid'},
        {ref: 'griddetail', selector: 'workgroupemployeedetailgrid'},
        {ref: 'griddetailshift', selector: 'workgroupemployeedetailshiftgrid'},
        {ref: 'gridemployee', selector: 'workgroupemployeegridemployee'},
        {ref: 'formsearch', selector: 'workgroupemployeeformsearch'},
    ],
    controllerName: 'workgroupemployee',
    fieldName: 'code',
    bindPrefixName: 'Workgroupemployee',
    rowproject: null,
    storept: null,
    state: null,
    typedata: 0,
    formWidth: 800,
    rowdata: null,
    urldata: 'hrd/workgroupemployee/',
    urlcommon: 'hrd/common/read',
    urlrequest: null,
    senddata: null,
    info: null,
    messagedata: null,
    idheaderfield: 'workgroup_id',
    idheadervalue: 0,
    idheaderview: 0,
    filtercheckdetail: 'employee_id',
    filtercheckdetailshift: 'shifttype_id',
    fieldconfirmdetail: 'employee_name',
    fieldconfirmdetailshift: 'shifttype',

    init: function (application) {
        var me = this;

        this.control({
            'workgroupemployeepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
            },
            'workgroupemployeegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'workgroupemployeegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'workgroupemployeeformsearch button[action=reset]': {
                click: this.dataReset
            },
            'workgroupemployeeformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function () {
                    me.setFormDataAfterrender();
                },
                beforedestroy: this.formDataBeforeDestroy
            },
            'workgroupemployeeformdata button[action=save]': {
                click: this.dataSaveCustome
            },
            'workgroupemployeeformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'workgroupemployeeformsearch': {
                afterrender: this.formSearchAfterRender
            },
            'workgroupemployeeformsearch button[action=search]': {
                click: function () {
                    var me, form, employee_name;
                    me = this;
                    me.dataSearch();
                }
            },

            //====================================START DETAIL=============================================   
            'workgroupemployeedetailgrid': {
                selectionchange: this.cellgridDetail,
            },
            'workgroupemployeedetailgrid toolbar button[action=create]': {
                click: function () {
                    var me;
                    me = this;
                    me.paramdetail.stateform = 'create';
                    me.GenerateFormdata(me.paramdetail);
                }
            },
            'workgroupemployeedetailgrid actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumndetailclick(view, cell, row, col, e);
                }
            },
            'workgroupemployeeformdatadetail': {
                afterrender: this.formDataDetailAfterRender
            },
            'workgroupemployeeformdatadetail [name=employee_id]': {
                change: function (the, newValue, oldValue, eOpts) {
                    var row, form;
                    form = me.getFormdatadetail();
                    row = the.valueModels[0].data;
                    form.down('[name=employee_name]').setValue(row.employee_name);
                    form.down('[name=employee_nik]').setValue(row.employee_nik);
                    form.down('[name=department]').setValue(row.department);
                }
            },
            'workgroupemployeeformdatadetail button[action=save]': {
                click: this.dataSaveDetailstore
            },
            //====================================END DETAIL=============================================      
            //====================================START DETAIL SHIFT=============================================   
            'workgroupemployeedetailshiftgrid': {
                selectionchange: this.cellgridDetailShift,
            },
            'workgroupemployeedetailshiftgrid toolbar button[action=create]': {
                click: function () {
                    var me;
                    me = this;
                    me.paramdetailshift.stateform = 'create';
                    me.GenerateFormdata(me.paramdetailshift);
                }
            },
            'workgroupemployeedetailshiftgrid actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumndetailshiftclick(view, cell, row, col, e);
                }
            },
            'workgroupemployeeformdatadetailshift': {
                afterrender: this.formDataDetailShiftAfterRender
            },
            'workgroupemployeeformdatadetailshift [name=shifttype_id]': {
                change: function (the, newValue, oldValue, eOpts) {
                    var row, form;
                    form = me.getFormdatadetailshift();
                    row = the.valueModels[0].data;
                    form.down('[name=shifttype]').setValue(row.shifttype);
                }
            },
            'workgroupemployeeformdatadetailshift button[action=save]': {
                click: this.dataSaveDetailShiftstore
            },
            //====================================END DETAIL SHIFT=============================================      



        });
    },
    formDataBeforeDestroy: function () {
        var me;
        me = this;
        me.idheadervalue = 0;
        me.info = null;
        me.senddata = null;
        var storedetailemployee = me.getGriddetail().getStore();
        var storedetailshift = me.getGriddetailshift().getStore();
        if (storedetailemployee.getCount() > 0) {
            storedetailemployee.removeAll();
        }
        if (storedetailshift.getCount() > 0) {
            storedetailshift.removeAll();
        }

    },
    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid();
        var row = grid.getSelectionModel().getSelection();
    },
    paramheader: {
        //start properties form
        store: null,
        data: null,
        record: null,
        row: null,
        form: null,
        stateform: null,
        //start properties form
    },
    setFormDataAfterrender: function () {
        var me = '';
        me = this;
        me.ActionHeader();
    },
    ActionHeader: function () {
        var me, ph, pd, pds = '';
        me = this;
        ph = me.paramheader;
        pd = me.paramdetail;
        pds = me.paramdetailshift;
        ph.form = me.getFormdata();
        ph.stateform = me.getFormdata().up('window').state.toLowerCase();

        me.getGriddetail().setTitle("Data Employee");
        me.getGriddetailshift().setTitle("Data Shift Type");

        switch (ph.stateform) {
            case 'create':
                pd.store = me.getGriddetail().getStore();
                pds.store = me.getGriddetailshift().getStore();
                pd.store.removeAll();
                pds.store.removeAll();
                me.idheadervalue = '0';
                ph.form.down('[name=workgroup_id]').setValue('0');
                break;
            case 'update':
                me.idheadervalue = ph.form.down('[name=workgroup_id]').getValue();
                me.getDatadetailshift();
                me.getDatadetail();
                break;
            default:
        }
    },

    // START DETAIL SHIFT AREA
    paramdetailshift: {
        //start formgeneate
        fromlocation: 'Hrd.view.workgroupemployee.FormDataDetailShift',
        formtitle: 'Form Detail Shift', formicon: 'icon-form-add',
        formid: 'win-formdatadetailshift', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 500, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null,
        //start properties form
    },

    getDatadetailshift: function () {
        var me, pd, counter = '';
        me = this;
        pd = me.paramdetailshift;
        pd.grid = me.getGriddetailshift();
        pd.store = pd.grid.getStore();
        pd.store.clearFilter(true);
        pd.store.load({
            params: {
                "hideparam": 'default',
                "workgroup_id": me.idheadervalue,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                pd.store.sort('code', 'ASC');
                counter = pd.store.getCount();
                if (counter > 0) {
                    pd.grid.getSelectionModel().select(0, true);
                }
            }
        });
    },
    cellgridDetailShift: function () {
        var me, pd = '';
        me = this;
        pd = me.paramdetailshift;
        pd.grid = me.getGriddetailshift();
        pd.object = pd.grid.getSelectionModel().getSelection();
        pd.data = '';
        for (var i = 0; i <= pd.object.length - 1; i++) {
            pd.data = pd.object[i];
        }
        if (pd.data !== '') {
            // pd.rowdata = pd.data['data'];
            pd.rowdata = pd.data;
        }
    },
    gridActionColumndetailshiftclick: function (view, cell, row, col, e) {
        var me, pd, action = '';
        me = this;
        pd = me.paramdetailshift;
        pd.grid = me.getGriddetailshift();
        pd.grid.getSelectionModel().select(row);
        pd.action = e.getTarget().className.match(/\bact-(\w+)\b/)[1];
        pd.rowdata = pd.grid.getStore().getAt(row);
        me.actiondataDetailShift();
    },
    griddetailshiftitemdoubleclick: function () {
        var me, pd;
        me = this;
        pd = me.paramdetailshift;
        pd.action = 'update';
        me.actiondataDetailShift();
    },
    actiondataDetailShift: function () {
        var me, pd, returndata;
        me = this;
        pd = me.paramdetailshift;
        me.cellgridDetailShift();

        switch (pd.action) {
            case 'update':
                me.paramdetailshift.stateform = 'update';
                me.GenerateFormdata(me.paramdetailshift);
                break;
            case 'destroy':
                me.dataDestroydetailshiftwithflag();
                break;
            default:
                returndata = "No action selected";
        }
    },
    dataDestroydetailshiftwithflag: function () {
        var me, rows, ph, pd, confirmmsg, successmsg, failmsg,
                record, recordcounttext, store, selectedRecord, msg, successcount
                , parameter, pesan, dataconfirm, ph, pd;

        me = this;
        ph = me.paramheader;
        pd = me.paramdetailshift;
        dataconfirm = me.fieldconfirmdetailshift;

        rows = me.getGriddetailshift().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = me.getGriddetailshift().getStore();

            if (rows.length == 1) {
                selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(dataconfirm) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }

            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    msg = function () {
                        me.getGriddetailshift().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        record = rows[i];
                        record.set("deleted", true);
                        record.set("statedata", 'delete');
                        store.clearFilter(true);
                        store.filter(me.idheaderfield, me.idheadervalue);
                        store.filter('deleted', false);
                    }
                }

            });

        }
    },
    formDataDetailShiftAfterRender: function () {
        var me, pd, action = '';
        me = this;
        pd = me.paramdetailshift;
        pd.form = me.getFormdatadetailshift();
        me.getShifttype();
        switch (pd.stateform) {
            case 'create':
                pd.form.down("[name=workgroup_id]").setValue(me.idheadervalue);
                pd.form.down("[name=workgroupdetailshift_id]").setValue('0');
                break;
            case 'update':
                pd.form.loadRecord(pd.rowdata);
                break;
            default:
        }
    },
    Checkdatadetailshift: function () {
        var me, status, returndata, pd, filter = '';
        me = this;
        pd = me.paramdetailshift;
        pd.checkdata = false;
        pd.store.each(function (record)
        {

            if (record.data[me.idheaderfield] == pd.row.workgroup_id &&
                    record.data[me.filtercheckdetailshift] == pd.row.shifttype_id &&
                    record.data['indexdata'] == pd.row.indexdata
                    )
            {
                pd.checkdata = true;
            }
        });
    },
    dataSaveDetailShiftstore: function () {
        var me, pd = '';
        me = this;
        pd = me.paramdetailshift;
        pd.form = me.getFormdatadetailshift().getForm();
        if (pd.form.isValid()) {
            pd.grid = me.getGriddetailshift();
            pd.store = pd.grid.getStore();
            pd.row = pd.form.getValues();
            pd.row[me.idheaderfield] = me.idheadervalue;
            if (pd.row.workgroupdetailshift_id == '0') {
                pd.row['statedata'] = 'create';
            } else {
                pd.row['statedata'] = 'update';
            }

            me.Checkdatadetailshift();
            switch (pd.stateform) {
                case 'create':
                    if (pd.checkdata == false) {
                        pd.store.add(pd.row);
                        pd.store.commitChanges();
                    } else {
                        Ext.Msg.alert('Warning', "Sorry Shift Type = " + pd.row.shifttype + " ,already exist in this grid detail shift");
                    }
                    break;
                case 'update':
                    pd.record = pd.store.getAt(pd.store.indexOf(pd.grid.getSelectionModel().getSelection()[0]));
                    pd.record.beginEdit();
                    pd.record.set(pd.row);
                    pd.record.endEdit();
                    pd.store.commitChanges();
                    break;
            }
            me.getFormdatadetailshift().up('window').close();
        }
    },
    // END DETAIL SHIFT AREA


    //START DETAIL AREA

    paramdetail: {
        //start formgeneate
        fromlocation: 'Hrd.view.workgroupemployee.FormDataDetail',
        formtitle: 'Form Detail', formicon: 'icon-form-add',
        formid: 'win-formdatadetail', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 700, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null,
        //start properties form
    },

    getDatadetail: function () {
        var me, pd, counter = '';
        me = this;
        pd = me.paramdetail;
        pd.grid = me.getGriddetail();
        pd.store = me.getGriddetail().getStore();
        pd.store.clearFilter(true);
        pd.store.load({
            params: {
                "hideparam": 'default',
                "workgroup_id": me.idheadervalue,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                pd.store.sort('code', 'ASC');
                counter = pd.store.getCount();
                if (counter > 0) {
                    pd.grid.getSelectionModel().select(0, true);
                }
            }
        });
    },
    cellgridDetail: function () {
        var me, pd = '';
        me = this;
        pd = me.paramdetail;
        pd.grid = me.getGriddetail();
        pd.object = pd.grid.getSelectionModel().getSelection();
        pd.data = '';
        for (var i = 0; i <= pd.object.length - 1; i++) {
            pd.data = pd.object[i];
        }
        if (pd.data !== '') {
            // pd.rowdata = pd.data['data'];
            pd.rowdata = pd.data;
        }
    },
    gridActionColumndetailclick: function (view, cell, row, col, e) {
        var me, pd, action = '';
        me = this;
        pd = me.paramdetail;
        me.getGriddetail().getSelectionModel().select(row);
        pd.action = e.getTarget().className.match(/\bact-(\w+)\b/)[1];
        pd.rowdata = me.getGriddetail().getStore().getAt(row);
        me.actiondataDetail();
    },
    griddetailitemdoubleclick: function () {
        var me, pd;
        me = this;
        pd = me.paramdetail;
        pd.action = 'update';
        me.actiondataDetail();
    },
    actiondataDetail: function () {
        var me, pd, returndata;
        me = this;
        pd = me.paramdetail;
        me.cellgridDetail();

        switch (pd.action) {
            case 'update':
                me.paramdetail.stateform = 'update';
                me.GenerateFormdata(me.paramdetail);
                break;
            case 'destroy':
                me.dataDestroydetailwithflag();
                break;
            default:
                returndata = "No action selected";
        }
    },
    dataDestroydetailwithflag: function () {
        var me, rows, ph, pd, confirmmsg, successmsg, failmsg,
                record, recordcounttext, store, selectedRecord, msg, successcount
                , parameter, pesan, dataconfirm, ph, pd;

        me = this;
        ph = me.paramheader;
        pd = me.paramdetail;
        dataconfirm = me.fieldconfirmdetail;

        rows = me.getGriddetail().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = me.getGriddetail().getStore();

            if (rows.length == 1) {
                selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(dataconfirm) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }

            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    msg = function () {
                        me.getGriddetail().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        record = rows[i];
                        record.set("deleted", true);
                        record.set("statedata", 'delete');
                        store.clearFilter(true);
                        store.filter(me.idheaderfield, me.idheadervalue);
                        store.filter('deleted', false);
                    }
                }

            });

        }
    },

    formDataDetailAfterRender: function () {
        var me, pd, action = '';
        me = this;
        pd = me.paramdetail;
        pd.form = me.getFormdatadetail();
        me.getEmployeedata();

        switch (pd.stateform) {
            case 'create':
                pd.form.down("[name=workgroup_id]").setValue(me.idheadervalue);
                pd.form.down("[name=workgroupdetail_id]").setValue('0');
                break;
            case 'update':
                pd.form.loadRecord(pd.rowdata);
                break;
            default:
        }
    },
    Checkdatadetail: function () {
        var me, status, returndata, pd, filter = '';
        me = this;
        pd = me.paramdetail;
        pd.checkdata = false;
        pd.store.each(function (record)
        {

            if (record.data[me.idheaderfield] == pd.row.workgroup_id &&
                    record.data[me.filtercheckdetail] == pd.row.employee_id
                    )
            {
                pd.checkdata = true;
            }
        });
    },
    dataSaveDetailstore: function () {
        var me, rows,formdetail, pd,recordcounttext, grid,store, record;
        me = this;
        pd = me.paramdetail;       
        grid = me.getGridemployee();
        formdetail = me.getFormdatadetail();
        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            grid.body.mask('Saving data, create data to store please wait ...');
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = grid.getStore();
            resetTimer();
            
            pd.grid = me.getGriddetail();
            pd.store = me.getGriddetail().getStore();
                       
            
            for (var i = 0; i < rows.length; i++) {
                pd.row = rows[i]['data'];  
                pd.row['workgroupdetail_id'] = formdetail.down('[name=workgroupdetail_id]').getValue();
                pd.row[me.idheaderfield] = me.idheadervalue;                
                if (pd.row.workgroupdetail_id == '0') {
                    pd.row['statedata'] = 'create';
                } else {
                    pd.row['statedata'] = 'update';
                }
                
                me.Checkdatadetail();
                switch (pd.stateform) {
                    case 'create':
                        if (pd.checkdata == false) {
                            pd.store.add(pd.row);
                        } else {
                            Ext.Msg.alert('Warning', "Sorry employee = " + pd.row.employee_name + " ,already exist in this grid detail");
                        }
                        break;
                    case 'update':
                        pd.record = pd.store.getAt(pd.store.indexOf(pd.grid.getSelectionModel().getSelection()[0]));
                        pd.record.beginEdit();
                        pd.record.set(pd.row);
                        pd.record.endEdit();
                        break;
                }               
                
            }
             grid.body.unmask();
             me.getFormdatadetail().up('window').close();
        }
        
    },
    
    dataSaveDetailstore_old: function () {
        var me, pd = '';
        me = this;
        pd = me.paramdetail;

        pd.form = me.getFormdatadetail().getForm();
        if (pd.form.isValid()) {
            pd.grid = me.getGriddetail();
            pd.store = me.getGriddetail().getStore();
            pd.row = pd.form.getValues();
            pd.row[me.idheaderfield] = me.idheadervalue;
            if (pd.row.workgroupdetail_id == '0') {
                pd.row['statedata'] = 'create';
            } else {
                pd.row['statedata'] = 'update';
            }

            me.Checkdatadetail();
            switch (pd.stateform) {
                case 'create':
                    if (pd.checkdata == false) {
                        pd.store.add(pd.row);
                        pd.store.commitChanges();
                    } else {
                        Ext.Msg.alert('Warning', "Sorry employee = " + pd.row.employee_name + " ,already exist in this grid detail");
                    }
                    break;
                case 'update':
                    pd.record = pd.store.getAt(pd.store.indexOf(pd.grid.getSelectionModel().getSelection()[0]));
                    pd.record.beginEdit();
                    pd.record.set(pd.row);
                    pd.record.endEdit();
                    pd.store.commitChanges();
                    break;
            }
            me.getFormdatadetail().up('window').close();
        }
    },
    //END DETAIL AREA
    dataSaveCustome: function () {
        var me, form, formdata, addingRecord, vp, vps, x, store, stotedetail,
                valuedata, idProperty, rec, paramdata, rowdata, state_submit, idProperty;
        me = this;
        form = me.getFormdata();
        formdata = me.getFormdata().getForm();

        if (formdata.isValid()) {
            resetTimer();
            store = me.getGrid().getStore();
            valuedata = formdata.getValues();
            form.up('window').body.mask('Saving data, please wait ...');
            state_submit = me.getFormdata().up('window').state.toLowerCase();

            switch (state_submit) {
                case 'create':
                    store.add(valuedata);
                    addingRecord = true;
                    valuedata['hideparam'] = state_submit;
                    me.senddata = valuedata;
                    me.urlrequest = me.urldata + state_submit;
                    me.AjaxRequest();
                    store.commitChanges();
                    break;
                case 'update':
                    idProperty = store.getProxy().getReader().getIdProperty();
                    rec = store.getById(parseInt(formdata.findField(idProperty).getValue(), 10));
                    rec.beginEdit();
                    rec.set(valuedata);
                    rec.endEdit();
                    valuedata['hideparam'] = state_submit;
                    me.senddata = valuedata;
                    me.urlrequest = me.urldata + state_submit;
                    me.AjaxRequest();
                    store.commitChanges();
                    break;
                default:
                    return;
            }

        }
    },
    dataSaveDetaildb: function () {
        var me, store, counter, state, data, stateheader, pd, iddata;
        me = this;
        stateheader = me.getFormdata().up('window').state.toLowerCase();
        pd = me.paramdetail;
        store = me.getGriddetail().getStore();
        store.clearFilter(true);
        if (stateheader == 'create') {
            store.filter(me.idheaderfield, '0');
        } else {
            store.filter(me.idheaderfield, me.idheadervalue);
        }
        if (store.getCount() > 0) {
            store.each(function (record, index) {
                iddata = record.get("workgroupdetail_id");
                state = record.get("statedata");
                data = record['data'];
                data[me.idheaderfield] = me.idheadervalue;
                data['parametersql'] = state;
                data['hideparam'] = 'default';

                if (state == 'create' || state == 'update') {
                    me.senddata = data;
                    me.urlrequest = me.urldata + state + 'detail';
                    me.AjaxRequest();
                }
                if (state == 'delete' && iddata !== 0) {
                    me.senddata = data;
                    me.urlrequest = me.urldata + state + 'detail';
                    me.AjaxRequest();
                }

            });
        }
    },
    dataSaveDetailShiftdb: function () {
        var me, store, counter, state, data, stateheader, pd, iddata;
        me = this;
        stateheader = me.getFormdata().up('window').state.toLowerCase();
        pd = me.paramdetailshift;
        store = me.getGriddetailshift().getStore();
        store.clearFilter(true);
        if (stateheader == 'create') {
            store.filter(me.idheaderfield, '0');
        } else {
            store.filter(me.idheaderfield, me.idheadervalue);
        }
        if (store.getCount() > 0) {
            store.each(function (record, index) {
                iddata = record.get("workgroupdetailshift_id");
                state = record.get("statedata");
                data = record['data'];
                data[me.idheaderfield] = me.idheadervalue;
                data['parametersql'] = state;
                data['hideparam'] = 'default';

                if (state == 'create' || state == 'update') {
                    me.senddata = data;
                    me.urlrequest = me.urldata + state + 'detailshift';
                    me.AjaxRequest();
                }
                if (state == 'delete' && iddata !== 0) {
                    me.senddata = data;
                    me.urlrequest = me.urldata + state + 'detailshift';
                    me.AjaxRequest();
                }

            });
        }
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 90000000,
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
    },
    setSuccessEvent: function () {
        var me = this;
        var data = me.info.data;
        switch (me.info.parameter) {
            case 'default':
                break;
            case 'getdataemployee':
                var form, employee, store;
                form = me.getFormdatadetail();
                //store = form.down('[name=employee_id]').getStore();
                store = me.getGridemployee().getStore();
                store.loadData(data);
                break;
            case 'getdatashiftype':
                var form, employee, store;
                form = me.getFormdatadetailshift();
                store = form.down('[name=shifttype_id]').getStore();
                store.loadData(data);
                break;
            case 'create':
                if (me.info.success == 'true') {
                    me.idheadervalue = me.info.data.workgroup_id;
                    me.dataSaveDetailShiftdb();
                    me.dataSaveDetaildb();
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
                    me.idheadervalue = me.info.data.workgroup_id;
                    me.dataSaveDetailShiftdb();
                    me.dataSaveDetaildb();
                    me.alertFormdataSuccess();
                } else {
                    me.messagedata = me.info.msg;
                    me.alertFormdataFailed();
                }
                break;

        }
    },
    getEmployeedata: function () {
        var me;
        me = this;
        me.senddata = {
            'mode_read': 'getdataemployee',
            'project_id': apps.project,
            'pt_id': apps.pt
        };
        me.urlrequest = me.urlcommon;
        me.AjaxRequest();
    },
    getShifttype: function () {
        var me;
        me = this;
        me.senddata = {
            'mode_read': 'getdatashiftype',
            'project_id': apps.project,
            'pt_id': apps.pt
        };
        me.urlrequest = me.urlcommon;
        me.AjaxRequest();
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
});