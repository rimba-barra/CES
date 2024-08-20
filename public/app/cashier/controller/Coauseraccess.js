Ext.define('Cashier.controller.Coauseraccess', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Coauseraccess',
    requires: [
        'Ext.EventObject',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Projectptallcombobox',
        'Cashier.library.template.combobox.Prefixcombobox',
        'Cashier.library.template.combobox.Coacombobox',
        'Cashier.library.template.combobox.Statuscombobox',
        // 'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Deptprefixcombobox',
        'Cashier.library.template.checkbox.CheckColumn',
        'Cashier.library.template.combobox.Vendorcombobox',
        'Cashier.library.template.combobox.Groupcombobox',
        'Cashier.library.template.combobox.Cashbonstatuscombobox',
        'Cashier.library.template.combobox.Employeecombobox',
        'Cashier.library.template.combobox.Coadeptcombobox',
        'Cashier.library.template.combobox.Inoutcombobox',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Usermodulecashiercombobox',
         'Cashier.library.template.combobox.UsermodulecashiercomboboxV2',
        'Cashier.library.template.combobox.Projectcombobox',
         'Cashier.library.template.combobox.ProjectcomboboxV2',
         'Cashier.library.template.combobox.PtprojectcomboboxV2',
         'Cashier.library.template.combobox.Projectptcombobox'
    ],
    views: [
        'coauseraccess.Panel',
        'coauseraccess.Grid',
        'coauseraccess.Griduseraccess',
        'coauseraccess.FormSearch',
        'coauseraccess.FormData',
    ],
    stores: [
        'Coauseraccess',
        'Coacombo',
        'Usermodulecashier',
         'UsermodulecashierV2',
        'Ptbyusermulti',
        'Coa',
        'Project',
        'Ptbyuser',
         'ProjectV2',
          'PtV2',
          'Projectpt'
//        'Pt'
    ],
    models: [
        'Coauseraccess',
        'Coa',
        'Usermodulecashier',
        'UsermodulecashierV2',
        'Projectpt',
        'Project',
        'Pt',
        'Projectpt'
//        'Pt'
    ],
    refs: [
        {ref: 'panel', selector: 'coauseraccesspanel'},
        {ref: 'grid', selector: 'coauseraccessgrid'},
        {ref: 'griddestination', selector: 'coauseraccessgriduseraccess'},
        {ref: 'formsearch', selector: 'coauseraccessformsearch'},
        {ref: 'formdata', selector: 'coauseraccessformdata'},
    ],
    controllerName: 'coauseraccess',
    fieldName: 'coauseraccess',
    bindPrefixName: 'Coauseraccess',
    rowproject: null,
    storept: null,
    state: null,
    rowsource: null,
    rowdestination: null,
    urlcommon: 'cashier/common/create',
    urlrequest: 'cashier/coauseraccess/create',
    senddata: null,
    info: null,
    arraydata: null,
    project_id: 0,
    pt_id: 0,
    init: function (application) {
        var me = this;
        this.control({
            'coauseraccesspanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    this.panelAfterRender();
                    panel.up('window').maximize();
                    me.getStoreUseraccess();
                    me.getStoreUseraccessV2();
                    var a = panel.down("[name=projectpt_id]").getStore().load();
                    a.removeAll();
                    me.getProjectptv2();
                    var b = panel.down("[name=projectpt_id]").getStore().load();
//                    me.getStorePtproject();
                    me.getStoreCoa();
                },
            },
            'coauseraccessgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
                select: this.gridSelectsource,
            },
            'coauseraccessgriduseraccess': {
                select: this.gridSelectdestination,
            },
            'coauseraccessgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'coauseraccessgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'coauseraccessgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'coauseraccessgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'coauseraccessgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
             'kasbondeptpostinggridnew actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                //click: this.gridActionColumnClick
                click: function (view, cell, row, col, e) {
                    var me, grid;
                    me = this;
                    grid = me.getGriddestination();
                    me.gridActionColumnClick(view, cell, row, col, e, grid);
                }
            },
            'coauseraccesspanel [name=user_id]': {
                change: function () {
                    me.setdatainGriddestination();
                },
            },
            'coauseraccesspanel [name=projectpt_id]': {
                change: function (el) {
                    var me = this;
                    var f = me.getPanel();
                    if (el.value) {
                        var e = f.down("[name=projectpt_id]");
                        var x = e.getStore().findRecord("projectpt_id", el.value,0,false,true,true);
                        me.pt_id=x.data['pt_id'];
                        me.project_id=x.data['project_id'];
//                        me.setprojectpt(el.name, el.ownerCt);
                        me.getStoreUseraccessbypt(x.data['pt_id']);
                    }

                    me.setdatainGriddestination();

                }
            },
            'coauseraccesspanel button[action=btntodesctionation]': {
                click: function () {
                    me.Dragcoatogriddestination();
                },
            },
            'coauseraccesspanel button[action=btntosource]': {
                click: function () {
                    me.Dragcoatogridsource();
                }
            },
            'coauseraccesspanel button[action=btnsave]': {
                click: function () {
                    me.saveData();
                }
            },
            'coauseraccessformsearch button[action=search]': {
                click: this.dataSearch
            },
            'coauseraccessformsearch button[action=reset]': {
                click: this.dataReset
            },
            'coauseraccessformdata': {
                afterrender: this.formDataAfterRender
            },
            'coauseraccessformdata [name=coauseraccess] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'coauseraccessformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'coauseraccessformdata button[action=save]': {
                click: function () {
                    me.saveCopyCOA();
                }
            },
             'coauseraccessformdata button[action=savenew]': {

                click: function () {
                  me.saveCopyCOANew();
                }
            },
            'coauseraccessformdata button[action=cancel]': {
                click: this.formDataClose
            },
             'coauseraccessgriduseraccess toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'coauseraccessformdata [name=project_id]': {
                change: function (el) {
                    this.loadPtbyProject();
                }
                
            },
             'coauseraccessformdata [name=project_id_destination]': {
                change: function (el) {
                    this.loadPtbyProjectDestination();
                }
                
            },
            'coauseraccessformdata [name=pt_id]': {
                change: function (el) {
                     this.getStoreUseraccessbypt(el.value);
                }
                
            },
             'coauseraccessformdata [name=pt_id_destination]': {
                change: function (el) {
                     this.getStoreUseraccessbyptFD(el.value);

                }
                
            },
             'coauseraccessgriduseraccess toolbar button[action=grantall]': {
                click: function () {
                    this.GrantAllCoa();
                }
            },
        });
    },
    setdatainGriddestination: function () {
        var me, grid, store, panel, user_id, username;
        me = this;
        grid = me.getGriddestination();
        panel = me.getPanel();
        store = grid.getStore();
        user_id = panel.down('[name=user_id]').getValue();
        username = panel.down('[name=user_id]').getRawValue();
        store.load({
            params: {
                "hideparam": 'search',
                "user_id": user_id,
                "project_id": me.project_id,
                "pt_id": me.pt_id
            },
            callback: function (records, operation, success) {
                if (store.getCount() < 1) {
                    grid.down("button[action=grantall]").setDisabled(false);
                }else{
                	grid.down("button[action=grantall]").setDisabled(true);
                }
            }
        });
        me.getStoreCoa(user_id);
    },
    saveData: function () {
        var me, panel, grid, row, store, counter, user_id, arraydata, pt_id;
        me = this;
        panel = me.getPanel();
        grid = me.getGriddestination();
        store = grid.getStore();
        counter = store.getCount();
        user_id = panel.down('[name=user_id]').getValue();
         rowdata = panel.down('[name=projectpt_id]').valueModels[0]['raw'];
        pt_id = rowdata.pt_id;
        project_id = rowdata.project_id;
        if (user_id != null) {
            if (counter > 0) {
                grid.el.mask('Saving data please wait,..', 'x-mask-loading');
                me.arraydata = [];
                store.each(function (record) { 
                    row = record['data'];
                    row['hideparam'] = 'create';
                    row['user_id'] = user_id;
                    row['project_id'] = project_id;
                    row['pt_id'] = pt_id;
                    me.arraydata.push(row);
                });
                me.senddata = {
                    'hideparam': 'create',
                    'paramdata': me.arraydata,
                };
                me.AjaxRequest(panel);
                grid.el.unmask();
            } else {
                me.buildWarningAlert("Data in grid user access cannot empty");
            }
        } else {
            me.buildWarningAlert("Please select user before create user access coa");
        }
    },
    saveCopyCOA: function () {
        var me, panel, grid, row, store, counter, user_id, arraydata, pt_id, form, formdata, valuedata;
        me = this;
        panel = me.getPanel();
        form = me.getFormdata();
        formdata = me.getFormdata().getForm();
      
       
        valuedata = formdata.getValues();
     
      
        // form.up('window').body.mask('Saving data, please wait ...');
         form.setLoading('Saving data, please wait ...');
      
       
            Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            params: {
                data: Ext.encode(valuedata)
            },
            success: function (response) {
                 Ext.Msg.show({
                    title: 'Success',
                    msg: 'COA Access Has Been Copied Successfully',
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK,
                    fn: function () {
                       me.getFormdata().up('window').close();

                    }
                });
             
            },
            failure: function (response) {
               me.buildWarningAlert("Failed to process, please try again");
                 if (f) {
                    f.setLoading(false);
                }
            }
        });
             
            //form.up('window').body.unmask();
             form.setLoading(false);
     
    },
     saveCopyCOANew: function () {
        var me, panel, grid, row, store, counter, user_id, arraydata, pt_id, form, formdata, valuedata;
        me = this;
        panel = me.getPanel();
        form = me.getFormdata();
        formdata = me.getFormdata().getForm();
      
       
        valuedata = formdata.getValues();
     
      
        // form.up('window').body.mask('Saving data, please wait ...');
         form.setLoading('Saving data, please wait ...');
      
       
            Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            params: {
                data: Ext.encode(valuedata)
            },
            success: function (response) {
                 Ext.Msg.show({
                    title: 'Success',
                    msg: 'COA Access Has Been Copied Successfully',
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK,
                    fn: function () {
                        form.down('[name=project_id_destination]').setRawValue('');
                        form.down('[name=pt_id_destination]').setRawValue('');
                        form.down('[name=user_id_destination]').setRawValue('');
                        form.down('[name=user_id_destination]').setValue('');
                     
                     
                    }
                });
             
            },
            failure: function (response) {
               me.buildWarningAlert("Failed to process, please try again");
                 if (f) {
                    f.setLoading(false);
                }
            }
        });
             
            //form.up('window').body.unmask();
             form.setLoading(false);
            // me.gotoformdata('create');
     
    },
 
    AjaxRequest: function (f) {
        var me;
        me = this;
        if (f) {
            f.setLoading('Please wait');
        }
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 450000000,
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                me.info = Ext.JSON.decode(response.responseText);
                me.setSuccessEvent();
                if (f) {
                    f.setLoading(false);
                }
            },
            failure: function (response) {
                me.buildWarningAlert("Failed to process, please try again");
                 if (f) {
                    f.setLoading(false);
                }
            }
        });
    },
    setSuccessEvent: function () {
        var me = this;
        var data = me.info.data;
        switch (me.info.parameter) {
            case 'default':
                break;
            case 'create':
                me.buildSuccessAlert('Success');
                break;
            case 'importdata':
                me.getFormdata().up('window').close();
                break;
        }
    },
    gridSelectdestination: function () {
        var me, grid, counter, store, record, row;
        me = this;
        grid = me.getGriddestination();
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            record = grid.getSelectionModel().getSelection()[0];
            row = record['data'];
            me.rowdestination = row;
        }
    },
    gridSelectsource: function () {
        var me, grid, counter, store, record, row;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            record = grid.getSelectionModel().getSelection()[0];
            row = record['data'];
            me.rowsource = row;
        }
    },
    Dragcoatogridsource: function () {
        var me, panel, user_id, row, coa, countersource, counterdestination,
                griddestination, storedestination, gridsource, storesource, checkexist,
                rows, record, selectedRecord, confirmmsg;
        me = this;
        gridsource = me.getGrid();
        storesource = gridsource.getStore();
        countersource = storesource.getCount();
        panel = me.getPanel();
        user_id = panel.down('[name=user_id]').getValue();

        griddestination = me.getGriddestination();
        storedestination = griddestination.getStore();
        counterdestination = storedestination.getCount();

        if (user_id != null) {
            rows = griddestination.getSelectionModel().getSelection();
            if (rows.length < 1) {
                Ext.Msg.alert('Info', 'No record selected in grid user access!');
                return;
            } else {
                if (rows.length > 0) {
                    panel.el.mask('Moving data, please wait..', 'x-mask-loading');
                    setTimeout(
                            function () {
                                for (var i = 0; i < rows.length; i++) {
                                    record = rows[i];
                                    row = record.raw;
                                    storesource.add({
                                        coa_id: row.coa_id,
                                        coa: row.coa,
                                        coaname: row.coaname,
                                    });
                                }
                                panel.el.unmask();
                                me.Destroycoaingriddestination();
                            }, 500);

                }
            }

        } else {
            me.buildWarningAlert("Please select user before create user access coa");
        }
    },
    Dragcoatogriddestination: function () {
        var me, panel, user_id, row, coa, countersource, counterdestination,
                griddestination, storedestination, gridsource, storesource, checkexist,
                rows, record, selectedRecord, confirmmsg;
        me = this;
        gridsource = me.getGrid();
        storesource = gridsource.getStore();
        countersource = storesource.getCount();
        panel = me.getPanel();
        user_id = panel.down('[name=user_id]').getValue();

        griddestination = me.getGriddestination();
        storedestination = griddestination.getStore();
        counterdestination = storedestination.getCount();

        if (user_id != null) {
            rows = gridsource.getSelectionModel().getSelection();
            if (rows.length < 1) {
                Ext.Msg.alert('Info', 'No record selected in grid source!');
                return;
            } else {
                if (rows.length > 0) {
                    panel.el.mask('Moving data, please wait..', 'x-mask-loading');
                    //var myMask = new Ext.LoadMask(Ext.getBody(), {msg: "Please wait..."});
                    //myMask.show();
                    setTimeout(
                            function () {
                                for (var i = 0; i < rows.length; i++) {
                                    record = rows[i];
                                    row = record.raw;
                                    storedestination.add({
                                        coa_id: row.coa_id,
                                        coa: row.coa,
                                        coaname: row.coaname,
                                    });
                                }
                                panel.el.unmask();
                                me.Destroycoaingridsource();
                            }, 500);

                    //me.Destroycoaingridsource();
                    // myMask.hide();
                }
            }

        } else {
            me.buildWarningAlert("Please select user before create user access coa");
        }
    },
    Destroycoaingridsource: function () {
        var me, gridsource, storesource, countersource, griddestination,
                storedestination, counterdestination, index;
        me = this;
        gridsource = me.getGrid();
        storesource = gridsource.getStore();
        countersource = storesource.getCount();

        griddestination = me.getGriddestination();
        storedestination = griddestination.getStore();
        counterdestination = storedestination.getCount();

        storedestination.each(function (record) {
            storesource.clearFilter(true);
            storesource.filter('coa', record.get("coa"));
            storesource.removeAt(0);
        });
        storesource.clearFilter();

    },
    Destroycoaingriddestination: function () {
        var me, gridsource, storesource, countersource, griddestination, storedestination, counterdestination;
        me = this;
        gridsource = me.getGrid();
        storesource = gridsource.getStore();
        countersource = storesource.getCount();

        griddestination = me.getGriddestination();
        storedestination = griddestination.getStore();
        counterdestination = storedestination.getCount();

        storesource.each(function (record) {
            storedestination.clearFilter(true);
            storedestination.filter('coa', record.get("coa"));
            storedestination.removeAt(0);
        });
        storedestination.clearFilter();

    },
    checkDatainSource: function (row) {
        var me, grid, store, flagdata;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        flagdata = 'notyet';
        store.each(function (record)
        {
            if (record.data['coa'] == row.coa) {
                flagdata = 'exist';
            }
        });
        return flagdata;
    },
    checkDatainDestination: function (row) {
        var me, grid, flagdata, store;
        me = this;
        grid = me.getGriddestination();
        store = grid.getStore();
        flagdata = 'notyet';
        store.each(function (record)
        {
            if (record.data['coa'] == row.coa) {
                flagdata = 'exist';
            }
        });
        return flagdata;

    },
    getStoreCoa: function (user_id) {
        var me, store, form, project_id, pt_id;
        me = this;
        store = me.getStore('Coa');
        store.load({
            params: {
                "hideparam": 'getcoabyuseridnothave',
                "project_id": me.project_id,
                "pt_id": me.pt_id,
                "user_id": user_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                if (store.getCount() < 1) {
                    //me.buildWarningAlert("Please select user.");
                }
            }
        });
    },
    getStoreUseraccess: function () {
        var me, store, form, project_id, pt_id;
        me = this;
        store = me.getStore('Usermodulecashier');
        store.load();
    },
    getStoreUseraccessV2: function () {
        var me, store, form, project_id, pt_id;
        me = this;
        store = me.getStore('UsermodulecashierV2');
        store.load();
    },
    getStoreUseraccessbypt: function (pt_id) {
        var me = this;
        var project_id = me.project_id;
        store = me.getStore('Usermodulecashier');
        store.load({
            params: {
                "hideparam": 'usermodulecashier',
                "start": 0,
                "limit": 1000000,
                "pt_id": pt_id,
                "project_id": project_id
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                    //f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                    //me.setValueCombobox(me, 'pt_id', row.pt_id,row.ptname);
                }

            }
        });
    },
    getStoreUseraccessbyptFD: function (pt_id) {
        var me = this;
        var f = me.getFormdata();
        var project_id = f.down('[name=project_id]').getValue();
        store = me.getStore('UsermodulecashierV2');
        store.load({
            params: {
                "hideparam": 'usermodulecashierV2',
                "start": 0,
                "limit": 1000000,
                "pt_id": pt_id,
                "project_id": project_id
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                    //f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                    //me.setValueCombobox(me, 'pt_id', row.pt_id,row.ptname);
                }

            }
        });
    },
    getStorePtproject: function () {
        var me, store, form, project_id, pt_id;
        me = this;
        store = me.getStore('Projectpt');
        store.load({
            params: {
                "hideparam": 'getptbyuserid',
                "project_id": apps.project,
                "user_id": apps.uid,
                "start": 0,
                "limit": 1000000
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                    //f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                    //me.setValueCombobox(me, 'pt_id', row.pt_id,row.ptname);
                }

            }
        });
    },
    dataReset: function () {

    },
    gridSelectionChange: function () {

    },
     formDataShow: function(el, act, action) {
        var me = this;
        var formtitle, formicon;

       // var state = action == me.bindPrefixName + 'Create' ? 'create' : 'update';
        switch (me.state) {
            case 'create':
                formtitle = 'Add New';
                formicon = 'icon-form-add';
                break;
            case 'update':
                formtitle = 'Edit';
                formicon = 'icon-form-edit';
                break;
        }
        
        var winId = 'win-holidayformdata';
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: me.formWidth,
                // height:Ext.getBody().getViewSize().height * 0.9,
                //height:200,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                //items: Ext.create('Cashier.view.' + me.controllerName + '.FormData'),
                state: me.state,
                listeners: {
                    boxready: function() {
                        // win.setHeight(200);

                        win.body.mask('Loading...');
                        var tm = setTimeout(function() {
                            win.add(Ext.create('Cashier.view.' + me.controllerName + '.FormData'));
                            // console.log(win.down('panel').height);
                            //  console.log(win.down('panel').el.dom.clientHeight);
                            //win.setHeight(win.down('panel').height);
                            // win.doComponentLayout();
                            win.center();
                            win.body.unmask();
                            clearTimeout(tm);
                        }, 1000);

                    }
                }

            });
        }
        win.show();

    },
    formDataAfterRender: function (el) {
        var me, f, storeproject, storeprojectdestination = '';
        var state = el.up('window').state;
        var me = this;
        f = me.getFormdata();
        me.fdar().init();



        if (state == 'create') {
            me.fdar().create();
             storeproject = me.getStore('Project');
            storeproject.load({
                params: {
                    "hideparam": 'projectpt',
                    "project_id": apps.project,
                    "start": 0,
                    "limit": 1000000,
                }, callback: function (recordscode, operationcode, successcode) {
                    if (successcode) {
                        if (recordscode[0]) {
                            var firstdatacode = recordscode[0]['data'];
                             f.down("[name=project_id]").setValue(parseInt(apps.project));
                           
                        }
                    }
                }

            });

             storeprojectdestination = me.getStore('ProjectV2');
            storeprojectdestination.load({
                params: {
                    "hideparam": 'projectpt',
                    "project_id": apps.project,
                    "start": 0,
                    "limit": 1000000,
                }, callback: function (recordscode, operationcode, successcode) {
                    if (successcode) {
                        if (recordscode[0]) {
                            var firstdatacode = recordscode[0]['data'];
                             f.down("[name=project_id_destination]").setValue(parseInt(apps.project));
                           
                        }
                    }
                }

            });

        } else if (state == 'update') {
            me.fdar().update();


        }
    },
     loadPtbyProject: function(){

       var me = this;
        projectid = me.getFormdata().down("[name=project_id]").getValue();
  
        
        if(projectid != null){
            projectid = me.getFormdata().down("[name=project_id]").getValue();
        }else{
            projectid = apps.project;
        }

        var f = me.getFormdata();
        storecoa = me.getStore('Pt');
        storecoa.load({
            params: {
                "hideparam": 'getptbyuserproject',
                "start": 0,
                "limit": 1000000,
                "project_id": projectid,
                "user_id": apps.uid
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                    me.setValueCombobox(me, 'pt_id', row.pt_id,row.ptname);
                }
                
            }
        });

        
        

    },
    loadPtbyProjectDestination: function(){

       var me = this;
        projectid = me.getFormdata().down("[name=project_id_destination]").getValue();
  
        
        if(projectid != null){
            projectid = me.getFormdata().down("[name=project_id_destination]").getValue();
        }else{
            projectid = apps.project;
        }

        var f = me.getFormdata();
        storecoa = me.getStore('PtV2');
        storecoa.load({
            params: {
                "hideparam": 'getptbyuserproject',
                "start": 0,
                "limit": 1000000,
                "project_id": projectid,
                "user_id": apps.uid
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                     me.setValueCombobox(me, 'pt_id_destination', row.pt_id,row.ptname);
                }
                
            }
        });

        
        

    },
    GrantAllCoa: function () {
        var me, panel, grid, row, store, counter, user_id, arraydata, pt_id, gridsource;
        me = this;
        panel = me.getPanel();
        grid = me.getGriddestination();
       // gridsource = me.getGrid();
        store = grid.getStore();
        counter = store.getCount();
        user_id = panel.down('[name=user_id]').getValue();
        rowdata = panel.down('[name=projectpt_id]').valueModels[0]['raw'];
        pt_id = rowdata.pt_id;
        project_id = rowdata.project_id;
        Ext.MessageBox.show({
            title: 'Confirmation',
            msg: 'Are You Sure Want to Grant Access for All COA ?',
            buttons: Ext.MessageBox.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                	panel.setLoading('Saving data, please wait ...');
                	data = { 'hideparam' : 'grantallcoa',
			                 'project_id' : project_id,
			                 'pt_id' : pt_id,
			                 'user_id_destination' :user_id, 
			                }

			                Ext.Ajax.request({
			                    url: me.urlrequest,
			                    timeout: 45000000,
			                    method: 'POST',
			                    params: {
			                        data: Ext.encode(data)
			                    },
			                   success: function (response) {
					                 Ext.Msg.show({
					                    title: 'Success',
					                    msg: 'Data Saved Successfully',
					                    icon: Ext.Msg.INFO,
					                    buttons: Ext.Msg.OK,
					                    fn: function () {
					                    	me.setdatainGriddestination();
					                        panel.setLoading(false);

					                    }
					                });
					             
					            },
					            failure: function (response) {
					               me.buildWarningAlert("Failed to process, please try again");
					               panel.setLoading(false);
					               
					            }

			            });
                    
                }else{
                	return false;
                }
            }
        });          
       /* if (user_id != null) {
            if (counter > 0) {
                grid.el.mask('Saving data please wait,..', 'x-mask-loading');
                me.arraydata = [];
                store.each(function (record) { 
                    row = record['data'];
                    row['hideparam'] = 'create';
                    row['user_id'] = user_id;
                    row['project_id'] = project_id;
                    row['pt_id'] = pt_id;
                    me.arraydata.push(row);
                });
                me.senddata = {
                    'hideparam': 'create',
                    'paramdata': me.arraydata,
                };
                me.AjaxRequest(panel);
                grid.el.unmask();
            } else {
                me.buildWarningAlert("Data in grid user access cannot empty");
            }
        } else {
            me.buildWarningAlert("Please select user before create user access coa");
        }*/
    },
    getProjectptv2: function () {

        var me, storeproject;
        me = this;
        var f = me.getPanel();

        storeproject = me.getStore('Project');
        storeproject.load({
            params: {
                "hideparam": 'projectpt_v2',
                "user_id": apps.uid,
                "start": 0,
                "limit": 1000000,
            }, callback: function (recordscode, operationcode, successcode) {
                
                if (successcode) {
                    var info = Ext.JSON.decode(recordscode.responseText);
                    var item = recordscode;
                    store = f.down('[name=projectpt_id]').getStore("ptstore");
                    store.removeAll();
                    store.clearFilter();
                    var currentprojectpt_id = 0;
                    var currentproject_id = apps.project;
                    var currentpt = apps.pt;
                    for (let i = 0; i < item.length; i++) {
                        if (apps.pt == item[i].raw.pt_id && apps.project == item[i].raw.project_id) {
                            currentprojectpt_id = item[i].raw.projectpt_id;
                            currentproject_id = item[i].raw.project_id;
                            currentpt = item[i].raw.pt_id;
                        }

                        store.add({
                            projectpt_id : item[i].raw.projectpt_id, 
                            project_id: item[i].raw.project_id,
                            projectname: item[i].raw.project_name,
                            pt_id: item[i].raw.pt_id, 
                            pt_name: item[i].raw.name,
                            ptcode: item[i].raw.code,
                            ptname: item[i].raw.pt_name,
                        });
                    }
                    // f.down('[name=pt_id]').setValue(currentpt);
                    f.down('[name=projectpt_id]').setValue(currentprojectpt_id);
                    // f.down('[name=project_id]').setValue(currentproject_id);
                } else {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");
                }
            }

        });
    }
    
    
});