Ext.define('Cashier.controller.Deptaccess', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Deptaccess',
    requires: [
        'Ext.EventObject',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Projectptallcombobox',
        // 'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Deptprefixcombobox',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.checkbox.CheckColumn',
        'Cashier.library.template.combobox.Vendorcombobox',
        'Cashier.library.template.combobox.Groupcombobox',
        'Cashier.library.template.combobox.Cashbonstatuscombobox',
        'Cashier.library.template.combobox.Employeecombobox',
        'Cashier.library.template.combobox.Coadeptcombobox',
        'Cashier.library.template.combobox.Inoutcombobox',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Usermodulecashiercombobox',
        'Cashier.library.template.combobox.Projectptcombobox'
    ],
    views: [
        'deptaccess.Panel',
        'deptaccess.Grid',
        'deptaccess.Griduseraccess',
        'deptaccess.FormSearch',
        'deptaccess.FormData',
    ],
    stores: [
        'Deptaccess',
        'Department',
        'Usermodulecashier',
        'Pt',
        'Projectpt'
    ],
    models: [
        'Deptaccess',
        'Department',
        'Usermodulecashier',
        'Pt',
        'Projectpt'
    ],
    refs: [
        { ref: 'panel', selector: 'deptaccesspanel' },
        { ref: 'grid', selector: 'deptaccessgrid' },
        { ref: 'griddestination', selector: 'deptaccessgriduseraccess' },
        { ref: 'formsearch', selector: 'deptaccessformsearch' },
        { ref: 'formdata', selector: 'deptaccessformdata' },
    ],
    controllerName: 'deptaccess',
    fieldName: 'deptaccess',
    bindPrefixName: 'Deptaccess',
    rowproject: null,
    storept: null,
    state: null,
    rowsource: null,
    rowdestination: null,
    urlcommon: 'cashier/common/create',
    urlrequest: 'cashier/deptaccess/create',
    senddata: null,
    info: null,
    arraydata: null,
    project_id: 0,
    pt_id: 0,
    init: function(application) {
        var me = this;
        this.control({
            'deptaccesspanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function(panel) {
                    this.panelAfterRender();
                    panel.up('window').maximize();

                    me.getGriddestination().down('[name=pt_id]').setValue(parseInt(apps.pt));
                    me.getGriddestination().down('[name=project_id]').setValue(parseInt(apps.project));

                    me.getStoreUseraccess();
                    me.getStorePtproject();
                    me.getStoreDepartment();
                },
            },
            'deptaccessgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
                select: this.gridSelectsource,
            },
            'deptaccessgriduseraccess': {
                select: this.gridSelectdestination,
            },
            'deptaccessgrid toolbar button[action=create]': {
                click: function() {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'deptaccessgrid toolbar button[action=update]': {
                click: function() {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'deptaccessgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'deptaccessgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'deptaccessgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'deptaccesspanel [name=user_id]': {
                change: function() {
                    me.setdatainGriddestination();
                },
            },
            'deptaccesspanel [name=projectpt_id]': {
                change: function(el) {

                    if (el.value) {
                        var rec = el.getStore().findRecord("projectpt_id", el.value, 0, false, true, true);
                        me.project_id = rec.data['project_id'];
                        me.pt_id = rec.data['pt_id'];
                        me.getGriddestination().down('[name=pt_id]').setValue(me.pt_id);
                        me.getGriddestination().down('[name=project_id]').setValue(me.project_id);
                        me.setprojectpt(el.name, el.ownerCt);
                        me.getStoreUseraccessbypt(me.pt_id);
                    }

                    me.setdatainGriddestination();
                }
            },
            'deptaccesspanel button[action=btntodesctionation]': {
                click: function() {
                    me.Dragdepartmenttogriddestination();
                },
            },
            'deptaccesspanel button[action=btntosource]': {
                click: function() {
                    me.Dragdepartmenttogridsource();
                }
            },
            'deptaccesspanel button[action=btnsave]': {
                click: function() {
                    me.saveData();
                }
            },
            'deptaccessformsearch button[action=search]': {
                click: this.dataSearch
            },
            'deptaccessformsearch button[action=reset]': {
                click: this.dataReset
            },
            'deptaccessformdata': {
                afterrender: this.formDataAfterRender
            },
            'deptaccessformdata [name=department] ': {
                'keyup': function() {
                    var me, value;
                    me = this;
                },
            },
            'deptaccessformdata [name=objectname] ': {
                'keyup': function() {
                    var me, value;
                    me = this;
                },
            },
            'deptaccessformdata button[action=save]': {
                click: this.dataSave
            },
            'deptaccessformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'deptaccessgriduseraccess toolbar button[action=grantall]': {
                click: function() {
                    me.grantall();
                }
            },
        });
    },
    setdatainGriddestination: function() {
        var me, grid, store, panel, user_id, username;
        me = this;
        grid = me.getGriddestination();
        panel = me.getPanel();
        store = grid.getStore();
        user_id = panel.down('[name=user_id]').getValue();
        username = panel.down('[name=user_id]').getRawValue();

        me.pt_id = me.getGriddestination().down('[name=pt_id]').getValue();
        me.project_id = me.getGriddestination().down('[name=project_id]').getValue();

        store.load({
            params: {
                "hideparam": 'search',
                "user_id": user_id,
                "project_id": me.project_id,
                "pt_id": me.pt_id,
                "project_project_id": me.project_id,
                "pt_pt_id": me.pt_id
            },
            callback: function(records, operation, success) {
                if (store.getCount() < 1) {
                    //me.buildWarningAlert("No department access for user : "+username);
                }
            }
        });
        me.getStoreDepartment(user_id);
    },
    saveData: function() {
        var me, panel, grid, row, store, counter, user_id, arraydata;
        me = this;
        panel = me.getPanel();
        grid = me.getGriddestination();
        store = grid.getStore();
        counter = store.getCount();
        user_id = panel.down('[name=user_id]').getValue();
        me.pt_id = me.getGriddestination().down('[name=pt_id]').getValue();
        me.project_id = me.getGriddestination().down('[name=project_id]').getValue();
        if (user_id != null) {
            if (counter > 0) {
                grid.el.mask('Saving data please wait,..', 'x-mask-loading');
                me.arraydata = [];
                store.each(function(record) {
                    row = record['data'];
                    row['hideparam'] = 'create';
                    row['user_id'] = user_id;
                    row['project_project_id'] = me.project_id;
                    row['pt_pt_id'] = me.pt_id;
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
            me.buildWarningAlert("Please select user before create user access department");
        }
    },
    AjaxRequest: function(f) {
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
            success: function(response) {
                me.info = Ext.JSON.decode(response.responseText);
                me.setSuccessEvent();
                if (f) {
                    f.setLoading(false);
                }
            },
            failure: function(response) {
                me.buildWarningAlert("Failed to process, please try again");
                if (f) {
                    f.setLoading(false);
                }
            }
        });
    },
    setSuccessEvent: function() {
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
    gridSelectdestination: function() {
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
    gridSelectsource: function() {
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
    Dragdepartmenttogridsource: function() {
        var me, panel, user_id, row, department, countersource, counterdestination,
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
                        function() {
                            for (var i = 0; i < rows.length; i++) {
                                record = rows[i];
                                row = record.raw;
                                storesource.add({
                                    department_id: row.department_id,
                                    department: row.department,
                                });
                            }
                            panel.el.unmask();
                            me.Destroydepartmentingriddestination();
                        }, 500);

                }
            }

        } else {
            me.buildWarningAlert("Please select user before create user access department");
        }
    },
    Dragdepartmenttogriddestination: function() {
        var me, panel, user_id, row, department, countersource, counterdestination,
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
                        function() {
                            for (var i = 0; i < rows.length; i++) {
                                record = rows[i];
                                row = record.raw;
                                storedestination.add({
                                    department_id: row.department_id,
                                    department: row.department,
                                    code: row.code
                                });
                            }
                            panel.el.unmask();
                            me.Destroydepartmentingridsource();
                        }, 500);

                    //me.Destroydepartmentingridsource();
                    // myMask.hide();
                }
            }

        } else {
            me.buildWarningAlert("Please select user before create user access department");
        }
    },
    Destroydepartmentingridsource: function() {
        var me, gridsource, storesource, countersource, griddestination,
            storedestination, counterdestination, index;
        me = this;
        gridsource = me.getGrid();
        storesource = gridsource.getStore();
        countersource = storesource.getCount();

        griddestination = me.getGriddestination();
        storedestination = griddestination.getStore();
        counterdestination = storedestination.getCount();

        storedestination.each(function(record) {
            storesource.clearFilter(true);
            storesource.filter('department_id', record.get("department_id"));
            storesource.removeAt(0);
        });
        storesource.clearFilter();

    },
    Destroydepartmentingriddestination: function() {
        var me, gridsource, storesource, countersource, griddestination, storedestination, counterdestination;
        me = this;
        gridsource = me.getGrid();
        storesource = gridsource.getStore();
        countersource = storesource.getCount();

        griddestination = me.getGriddestination();
        storedestination = griddestination.getStore();
        counterdestination = storedestination.getCount();

        storesource.each(function(record) {
            storedestination.clearFilter(true);
            storedestination.filter('department_id', record.get("department_id"));
            storedestination.removeAt(0);
        });
        storedestination.clearFilter();

    },
    checkDatainSource: function(row) {
        var me, grid, store, flagdata;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        flagdata = 'notyet';
        store.each(function(record) {
            if (record.data['department_id'] == row.department_id) {
                flagdata = 'exist';
            }
        });
        return flagdata;
    },
    checkDatainDestination: function(row) {
        var me, grid, flagdata, store;
        me = this;
        grid = me.getGriddestination();
        store = grid.getStore();
        flagdata = 'notyet';
        store.each(function(record) {
            if (record.data['department_id'] == row.department_id) {
                flagdata = 'exist';
            }
        });
        return flagdata;

    },
    getStoreDepartment: function(user_id) {
        var me, store, form, project_id, pt_id;
        me = this;
        store = me.getStore('Department');

        me.pt_id = me.getGriddestination().down('[name=pt_id]').getValue();
        me.project_id = me.getGriddestination().down('[name=project_id]').getValue();
        console.log(me.project_id);
        console.log(me.pt_id);
        console.log(user_id);

        store.load({
            params: {
                "hideparam": 'getdepartmentbyuseridnothave',
                "project_id": me.project_id,
                "pt_id": me.pt_id,
                "project_project_id": me.project_id,
                "pt_pt_id": me.pt_id,
                "user_user_id": user_id,
                "user_id": user_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function(records, operation, success) {
                if (store.getCount() < 1) {
                    console.log(records);
                    //me.buildWarningAlert("Please select user.");
                }
            }
        });
    },
    getStoreUseraccess: function() {
        var me, store, form, project_id, pt_id;
        me = this;
        store = me.getStore('Usermodulecashier');
        store.load();
    },
    getStoreUseraccessbypt: function(pt_id) {
        var me = this;
        me.pt_id = me.getGriddestination().down('[name=pt_id]').getValue();
        me.project_id = me.getGriddestination().down('[name=project_id]').getValue();
        var pt_id = me.pt_id;
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
            callback: function(records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                    //f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                    //me.setValueCombobox(me, 'pt_id', row.pt_id,row.ptname);
                }

            }
        });
    },
    getStorePtproject: function() {
        var me, store, form, project_id, pt_id;
        me = this;
        store = me.getStore('Projectpt');
        store.load({
            params: {
                "hideparam": 'getptbyuseridv2',
                "start": 0,
                "limit": 1000000
            },
            callback: function(records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                    //f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                    //me.setValueCombobox(me, 'pt_id', row.pt_id,row.ptname);
                }

            }
        });
    },
    dataReset: function() {

    },
    gridSelectionChange: function() {

    },
    grantall: function() {
        var me, panel, grid, projectpt_id, project_id, pt_id, user_id;
        me = this;
        panel = me.getPanel();
        grid = me.getGriddestination();
        projectpt_id = grid.down("[name=projectpt_id]").getValue();
        project_id = grid.down("[name=projectpt_id]").valueModels[0].data.project_id;
        pt_id = grid.down("[name=projectpt_id]").valueModels[0].data.pt_id;
        user_id = grid.down("[name=user_id]").getValue();
        if (projectpt_id == null) {
            me.buildWarningAlert("Please Select Company First");
            return;
        }
        if (user_id == null) {
            me.buildWarningAlert("Please Select User First");
            return;
        }


        Ext.MessageBox.show({
            title: 'Confirmation',
            msg: 'Are You Sure Want to Grant Access for All Department ?',
            buttons: Ext.MessageBox.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    panel.setLoading('Saving data, please wait ...');
                    Ext.Ajax.request({
                        url: 'cashier/deptaccess/update',
                        method: 'POST',
                        timeout: 450000000,
                        params: {
                            data: Ext.encode({
                                hideparam: 'grantalldept',
                                project_id: project_id,
                                pt_id: pt_id,
                                user_id: user_id,
                                user_id_login: apps.uid
                            })
                        },
                        success: function(response) {
                            var data = Ext.JSON.decode(response.responseText);
                            if ( data.success ) {
                                 Ext.Msg.show({
                                    title: 'Success',
                                    msg: data.msg,
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK,
                                    fn: function () {
                                        me.setdatainGriddestination();
                                        panel.setLoading(false);

                                    }
                                });
                            }else{
                                me.buildWarningAlert("Failed to process, please try again");
                                panel.setLoading(false);
                            }
                        }
                    });                    
                }else{
                    return false;
                }
            }
        });     

    }
});