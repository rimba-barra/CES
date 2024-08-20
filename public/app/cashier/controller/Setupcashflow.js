Ext.define('Cashier.controller.Setupcashflow', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Setupcashflow',
    views: [
        'setupcashflow.Panel',
        'setupcashflow.Grid',
        'setupcashflow.Griddetail',
        'setupcashflow.Gridcoasource',
        'setupcashflow.Gridcoadestination',
        'setupcashflow.FormSearch',
        'setupcashflow.FormData',
        'setupcashflow.FormDataCopy',
        'setupcashflow.Gridmappingdept',
    ],

    stores: [
        'Mhsetupcashflow',
        'Mdsetupcashflow',
        'Cashflowtype',
        'Ptbydefaultproject',
        'Department',
        'Coa',
        'Coasetupdestination',
        'Ptbyusermulti',
        'Project',
        'Pt'
    ],
    models: [
        'Mhsetupcashflow',
        'Mdsetupcashflow',
        'Cashflowtype',
        'Projectpt',
        'Department',
        'Coa',
        'Project',
        'Pt',
        'Department'
    ],
    refs: [
        {ref: 'grid', selector: 'setupcashflowgrid'},
        {ref: 'griddetail', selector: 'setupcashflowgriddetail'},
        {ref: 'gridsource', selector: 'setupcashflowgridsource'},
        {ref: 'griddestination', selector: 'setupcashflowgridcoadestination'},
        {ref: 'formsearch', selector: 'setupcashflowformsearch'},
        {ref: 'formdata', selector: 'setupcashflowformdata'},
        {ref: 'formdatacopy', selector: 'setupcashflowformdatacopy'},
        {ref: 'gridmappingdept', selector: 'setupcashflowgridmappingdept'},
    ],
    controllerName: 'setupcashflow',
    fieldName: 'setupcashflow',
    bindPrefixName: 'Setupcashflow',
    rowproject: null,
    storept: null,
    state: null,
    formWidth: 800,
    urlcommon: 'cashier/common/read',
    urlrequest: 'cashier/setupcashflow/create',
    urlread: 'cashier/setupcashflow/read',
    rowsource: null,
    rowdestination: null,
    arraydata: null,
    rowhdata: null,
    idheadervalue: 0,
    idheaderfield: 'setupcashflow_id',
    fielddetail: 'coa',
    senddata: null,
    init: function (application) {
        var me = this;
        this.control({
            'setupcashflowpanel': {
                  beforerender: me.mainPanelBeforeRender,
               afterrender: function (panel) {
                    this.panelAfterRender();
                    panel.up('window').maximize();
                },

            },
            'setupcashflowgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
                select: this.gridSelect,
                boxready: function () {
                    var grid, store, counter;
                    grid = me.getGrid();
                    store = grid.getStore();
                    store.reload({
                        callback: function (records, operation, success) {
                            // counter = store.getCount();
                            // if (counter > 0) {
                            //     me.getGrid().getSelectionModel().select(0, true);
                            // }
                        }
                    });

                },
            },
            'setupcashflowgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'setupcashflowgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'setupcashflowgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'setupcashflowgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'setupcashflowgrid toolbar button[action=export]': {
                click: this.dataExport
            },
            'setupcashflowgrid toolbar button[action=copy]': {
                click: this.formDataCopy
            },
            'setupcashflowgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'setupcashflowgriddetail actioncolumn': {
                deletedetail: function () {
                    me.deletedatadetail();
                }
            },
            'setupcashflowgriddetail toolbar button[action=destroy]': {
                click: function () {
                    me.deletedatadetail();
                }
            },
            'setupcashflowgridsource': {
                select: this.gridSelectsource,
            },
            'setupcashflowgridcoadestination': {
                select: this.gridSelectdestination,
            },
            'setupcashflowformdata button[action=btntodesctionation]': {
                click: function () {
                    me.Dragcoatogriddestination();
                },
            },
            'setupcashflowformdata button[action=btntosource]': {
                click: function () {
                    me.Dragcoatogridsource();
                }
            },
            'setupcashflowformsearch [name=project_id]': {
                change: function() {
                    var fs = me.getFormsearch();
                    me.loadDataPt(fs, fs.down("[name=project_id]").getValue());
                }
            },
            'setupcashflowformsearch button[action=search]': {
                click: this.dataSearch
            },
            'setupcashflowformsearch button[action=reset]': {
                click: this.dataReset
            },
            'setupcashflowformdata': {
                afterrender: me.formdataAfterrenderCustom,
                beforedestroy: this.formDataBeforeDestroy,
                boxready: function () {
                    me.formdataReady();
                }
            },
            'setupcashflowformdata [name=setupcashflow] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'setupcashflowformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'setupcashflowformdata [name=project_id]': {
                change: function() {
                    var fs = me.getFormdata();
                    me.loadDataPt(fs, fs.down("[name=project_id]").getValue());
                }
            },
             'setupcashflowformsearch [name=pt_id] ': {
                'select': function () {

                    var me, value;
                    me = this;
                    me.setDepartFormsearch();
                },
            },
            'setupcashflowformdata button[action=save]': {
                click: this.dataSavecustome
            },
            'setupcashflowformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'setupcashflowformdatacopy': {
                afterrender: function() {

                    var me = this;
                    me.loadDataFormDataCopy();
                }
            },
            'setupcashflowformdatacopy [name=from_project_id]': {
                change: function() {
                    var me = this;
                    var f  = me.getFormdatacopy();
                    var project_id = f.down("[name=from_project_id]").getValue();

                    var storept = f.down("[name=from_pt_id]").getStore();
                    storept.clearFilter();
                    storept.filterBy(function(rec) {
                        if (rec.get('project_id') == project_id) {
                            return true;
                        } else {
                            return false;
                        }
                    })

                    if (project_id == parseInt(apps.project)) {
                        f.down("[name=from_pt_id]").setValue(parseInt(apps.pt));
                    } else {
                        f.down("[name=from_pt_id]").setValue(storept.data.items[0].data.pt_id);
                    }
                }
            },
            'setupcashflowformdatacopy [name=from_pt_id]': {
                change: function() {
                    
                    var me = this;
                    me.loadDataDepartment();
                }
            },
            'setupcashflowformdatacopy [name=to_project_id]': {
                change: function() {
                    var me = this;
                    var f  = me.getFormdatacopy();
                    var project_id = f.down("[name=to_project_id]").getValue();

                    var storept = f.down("[name=to_pt_id]").getStore();
                    storept.clearFilter();
                    storept.filterBy(function(rec) {
                        if (rec.get('project_id') == project_id) {
                            return true;
                        } else {
                            return false;
                        }
                    })

                    f.down("[name=to_pt_id]").setValue(storept.data.items[0].data.pt_id);
                }
            },
            'setupcashflowformdatacopy [name=to_pt_id]': {
                change: function() {

                    var me = this;
                    me.loadDataDepartmentDestination();
                }
            },
            'setupcashflowformdatacopy [name=copy_method]': {
                change: function(e, newValue, oldValue, eOpts ) {

                    var me = this;
                    var f = me.getFormdatacopy();
                    var value = 0;
                    if (e.checked == true) {
                        value = e.inputValue;
                    }
                    
                    me.loadDataDepartment();

                    var to_project_id = f.down("[name=to_project_id]").getValue();
                    var to_pt_id = f.down("[name=to_pt_id]").getValue();

                    if (to_project_id != '' && to_project_id != null && to_pt_id != '' && to_pt_id != null) {
                        me.loadDataDepartmentDestination();
                    }
                }
            },
            'setupcashflowformdatacopy [action=process]': {
                click: function() {

                    var me = this;
                    me.doCopy();
                }
            },
            'setupcashflowgrid [action=exportListCashbon]': {
                click: function(el) {
                    var me = this;
                    record = me.getGrid().getSelectionModel().getSelection()[0];
                    params = record['data'];
                    countD = parseInt(params['count_cd']);
                    if (countD > 0) {
                        params['typeparams'] = 'exportListCashbon';
                        me.dataExportListData(params);    
                    }
                }
            },
            'setupcashflowgrid [action=exportListVoucherDept]': {
                click: function(el) {
                    var me = this;
                    record = me.getGrid().getSelectionModel().getSelection()[0];
                    params = record['data'];
                    countD = parseInt(params['count_vdr']);
                    if (countD > 0) {
                        params['typeparams'] = 'exportListVoucherDept';
                        me.dataExportListData(params);
                    }
                }
            },
            'setupcashflowgrid [action=exportListVoucher]': {
                click: function(el) {
                    var me = this;
                    record = me.getGrid().getSelectionModel().getSelection()[0];
                    params = record['data'];
                    countD = parseInt(params['count_v']);
                    if (countD > 0) {
                        params['typeparams'] = 'exportListVoucher';
                        me.dataExportListData(params);
                    }
                    
                }
            },
            'setupcashflowgrid [action=exportListJournal]': {
                click: function(el) {
                    var me = this;
                    record = me.getGrid().getSelectionModel().getSelection()[0];
                    params = record['data'];
                    countD = parseInt(params['count_j']);
                    if (countD > 0) {
                        params['typeparams'] = 'exportListJournal';
                        me.dataExportListData(params);
                    }
                }
            },
        });
    },
    formdataAfterrenderCustom: function(el) {
        var me = this;
        var fd = me.getFormdata();
        var fs = me.getFormsearch();

        var project_id = fs.down("[name=project_id]").getValue();
        var pt_id = fs.down("[name=pt_id]").getValue();

        fd.down("[name=project_id]").setValue(project_id);
        fd.down("[name=pt_id]").setValue(pt_id);

        me.setStoreCoa();
        // me.setStoreDepartment();

        me.formDataAfterRender(el);
    },
    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid(),
                row = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1);
        grid.down('#btnExport').setDisabled(row.length != 1);
        grid.down('#btnDelete').setDisabled(row.length < 1);
    },
    deletedatadetail: function () {
        var me, rows, grid, pd, confirmmsg, successmsg, failmsg,
                record, recordcounttext,rowdata, store, selectedRecord, msg, successcount
                , dataconfirm;

        me = this;
        dataconfirm = me.fielddetail;
        grid = me.getGriddetail();
        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = grid.getStore();

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
                        grid.up('window').mask('Deleting data, please wait ...');
                    };
                    var arraydata = [];
                    for (var i = 0; i < rows.length; i++) {
                        record = rows[i];
                        rowdata = record['data'];
                        arraydata.push(rowdata.setupcashflowdetail_id);                        
                    }                    
                    me.senddata = {
                        'hideparam': 'deletedetail',
                        'iddetail': arraydata,
                    };
                    me.AjaxRequest();
                }

            });
        }
    },
    formDataBeforeDestroy: function () {
        var me;
        me = this;
        me.idheadervalue = 0;
    },
    formdataReady: function () {
        var me, state, form, gridsource, griddestination, storesource, storedestination,record,row;
        me = this;
        form = me.getFormdata();
        state = form.up('window').state.toLowerCase();

        gridsource = me.getGridsource();
        griddestination = me.getGriddestination();
        storesource = gridsource.getStore();
        storedestination = griddestination.getStore();

        if (storesource.getCount() > 0) {
            storesource.removeAll();
        }
        if (storedestination.getCount() > 0) {
            storedestination.removeAll();
        }

        switch (state) {
            case 'create':

                break;

            case 'update':

                record = me.getGrid().getSelectionModel().getSelection()[0];
                row = record['data'];

                if (me.idheadervalue == null || me.idheadervalue == 0) {
                    me.idheadervalue = row.setupcashflow_id;
                }

                form.down("[name=pt_id]").setReadOnly(true);
                form.down("[name=department_id]").setReadOnly(true);
                form.down("[name=cashflowtype_id]").setReadOnly(true);
                me.setDataDestination();
                me.setDataSource();
                break;
        }

    },
    gridSelect: function () {
        var me, grid, counter, store, record, row;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        counter = store.getCount();
        me.rowhdata = null;
        if (counter > 0) {
            record = grid.getSelectionModel().getSelection()[0];
            row = record['data'];
            me.rowhdata = row;
            me.idheadervalue = row.setupcashflow_id;
            me.getDatadetail();
        }
    },
    setDataDestination: function () {
        var me, pd, counter = '';
        me = this;
        var grid = me.getGriddestination();
        var store = grid.getStore();

        store.clearFilter(true);
        store.load({
            url: me.urlread,
            params: {
                "hideparam": 'getdatadetail',
                "setupcashflow_id": me.idheadervalue,
            },
            callback: function (records, operation, success) {
                store.sort('coa', 'ASC');
                counter = store.getCount();
                if (counter > 0) {
                    grid.getSelectionModel().select(0, true);
                }
            }
        });
    },
    setDataSource: function () {
        var me, pd, counter, form, grid, gridsource,row, grid = '';
        me = this;
        form = me.getFormdata();
        grid = me.getGrid();
        record = grid.getSelectionModel().getSelection();
        row = record[0].data;
        project_id = row.project_id;
        pt_id = row.pt_id;

        
        var gridsource = me.getGridsource();
        var store = gridsource.getStore();

        store.clearFilter(true);
        store.load({
            url: me.urlcommon,
            params: {
                "hideparam": 'getcoabyprojectptnotin',
                "project_id": project_id,
                "pt_id": pt_id,
                "start": 0,
                "limit": 1000,
                "setupcashflow_id": me.idheadervalue,
            },
            callback: function (records, operation, success) {
              
               
            }
        });
    },
    getDatadetail: function () {
        var me, pd, counter = '';
        me = this;
        var grid = me.getGriddetail();
        var store = me.getGriddetail().getStore();
        store.clearFilter(true);

        store.proxy.extraParams = {
            "hideparam": 'getdatadetail',
            "setupcashflow_id": me.idheadervalue,
        }

        store.load({
            params: {
                "hideparam": 'getdatadetail',
                "setupcashflow_id": me.idheadervalue,
            },
            callback: function (records, operation, success) {
                // store.sort('coa', 'ASC');
                counter = store.getCount();
                if (counter > 0) {
                    grid.getSelectionModel().select(0, true);
                }
            }
        });
    },
    dataSavecustome: function () {
        var me, form, grid, store, row, formvalue, project_id, pt_id, department_id, state;
        me = this;
        me.arraydata = [];
        me.senddata = {};
        var datadet = {};

        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        state = form.up('window').state.toLowerCase();
        //console.log(state);
        if (form.getForm().isValid()) {
            // if (form.down("[name=pt_id]").valueModels[0] !== undefined) {
            //     project_id = form.down("[name=pt_id]").valueModels[0].raw.project_id;
            // } else {
            //     project_id = apps.project;
            // }
            grid = me.getGriddestination();
            store = grid.getStore();
            if (store.getCount() > 0) {
                store.each(function (record) {
                    row = record['data'];
                    me.arraydata.push({
                        'coa_id': row.coa_id,
                        'coa': row.coa,
                    });
                });

                datadet = {
                    'hideparam': state,
                    'project_id': formvalue.project_id,
                    'setupcashflow_id': me.idheadervalue,
                    'pt_id': formvalue.pt_id,
                    'department_id': formvalue.department_id,
                    'cashflowtype_id': formvalue.cashflowtype_id,
                    'datadetail': me.arraydata,
                    'is_link_coa':form.down("[name=is_link_coa]").getValue()
                };

                form.el.mask('Processing please wait,..', 'x-mask-loading');
                Ext.Ajax.request({
                    url: me.urlrequest,
                    method: 'POST',
                    timeout: 45000000,
                    params: {
                        data: Ext.encode(datadet)
                    },
                    success: function (response) {
                        me.info = Ext.JSON.decode(response.responseText);
                        me.setSuccessEvent();
                        form.el.unmask();
                    },
                    failure: function (jqXHR, exception) {
                        alert(exception);
                        me.buildWarningAlert("Something process failure..");
                    }
                });
            } else {
                Ext.Msg.confirm('Delete Data', 'Apakah Anda yakin ingin mengokosongkan COA?', function(btn) {
                    if (btn == 'yes') {
                        // Proses yang sama seperti COA > 0
                        store.each(function (record) {
                            row = record['data'];
                            me.arraydata.push({
                                'coa_id': row.coa_id,
                                'coa': row.coa,
                            });
                        });
        
                        datadet = {
                            'hideparam': state,
                            'project_id': formvalue.project_id,
                            'setupcashflow_id': me.idheadervalue,
                            'pt_id': formvalue.pt_id,
                            'department_id': formvalue.department_id,
                            'cashflowtype_id': formvalue.cashflowtype_id,
                            'datadetail': me.arraydata,
                            'is_link_coa':form.down("[name=is_link_coa]").getValue()
                        };
        
                        form.el.mask('Processing please wait,..', 'x-mask-loading');
                        Ext.Ajax.request({
                            url: me.urlrequest,
                            method: 'POST',
                            timeout: 45000000,
                            params: {
                                data: Ext.encode(datadet)
                            },
                            success: function (response) {
                                me.info = Ext.JSON.decode(response.responseText);
                                me.setSuccessEvent();
                                form.el.unmask();
                            },
                            failure: function (jqXHR, exception) {
                                alert(exception);
                                me.buildWarningAlert("Something process failure..");
                            }
                        });
                    }
                });
            }

        }

    },
    Dragcoatogridsource: function () {
        var me, panel, user_id, row, coa, countersource, counterdestination,
                griddestination, storedestination, gridsource, storesource, checkexist,
                rows, record, selectedRecord, confirmmsg, form;
        me = this;
        gridsource = me.getGridsource();
        griddestination = me.getGriddestination();
        storesource = gridsource.getStore();
        storedestination = griddestination.getStore();
        countersource = storesource.getCount();
        form = me.getFormdata();
        form.up('window').body.mask('Moving data, please wait ...');
        rows = griddestination.getSelectionModel().getSelection();
        var arr_coaid = [];
        var datacheck = {};
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected in grid destination!');
            form.up('window').body.unmask();
            return;
        } else {
            if (rows.length > 0) {    
                 rows.forEach(function (rec) {
                         arr_coaid += rec.raw.coa_id + ',';
                    });
                  datacheck = {
                            'hideparam': 'checkusedornot',
                            'coa_id_varchar': arr_coaid,
                            'setupcashflow_id': me.idheadervalue
                    };


                 Ext.Ajax.request({  
                        url: 'cashier/setupcashflow/read',
                        method: 'POST',
                        timeout: 45000000,
                        params: {
                            data: Ext.encode(datacheck)
                        },
                        success: function (response) {
                            me.info = Ext.JSON.decode(response.responseText);
                            //ovveride sementara by david 9/03
                            //supaya bisa setup
                            //if(me.info.msg == 'OK'){
                            if(true){
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
                                    form.up('window').body.unmask();
                                     me.Destroycoaingriddestination();
                                       }, 500);
                                  

                            }else{
                                 Ext.Msg.show({
                                        title: 'Failure',
                                        msg: 'The data may have been used.',
                                        icon: Ext.Msg.ERROR,
                                        buttons: Ext.Msg.OK
                                    });
                                  form.up('window').body.unmask();

                            }
                          
                           
                        },
                       
                    });


             
              
            }
        }

    },
    Dragcoatogriddestination: function () {
        var me, panel, user_id, row, coa, countersource, counterdestination,
                griddestination, storedestination, gridsource, storesource, checkexist,
                rows, record, selectedRecord, confirmmsg, form;
        me = this;
        gridsource = me.getGridsource();
        griddestination = me.getGriddestination();
        storesource = gridsource.getStore();
        storedestination = griddestination.getStore();
        countersource = storesource.getCount();
        form = me.getFormdata();
        form.up('window').body.mask('Moving data, please wait ...');

        rows = gridsource.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected in grid source!');
            form.up('window').body.unmask();
            return;
        } else {
            if (rows.length > 0) {
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
                form.up('window').body.unmask();
                 me.Destroycoaingridsource();
                   }, 500);
            }
        }
    },
    /*
    DestroycoaingridsourceOld: function () {
        var me, gridsource, storesource, countersource, griddestination,
                storedestination, counterdestination, rowdata;
        me = this;
        rowdata = me.rowsource;
        gridsource = me.getGridsource();
        storesource = gridsource.getStore();
        storesource.removeAt(storesource.find('coa', rowdata.coa));
        storesource.sort({property: 'coa', direction: 'ASC'});
    },
    */
    Destroycoaingridsource: function () {
        var me, gridsource, storesource, countersource, griddestination,
                storedestination, counterdestination, index;
        me = this;
        gridsource = me.getGridsource();
        storesource = gridsource.getStore();
        //countersource = storesource.getCount();

        griddestination = me.getGriddestination();
        storedestination = griddestination.getStore();
        //counterdestination = storedestination.getCount();

        storedestination.each(function (record) {
            storesource.clearFilter(true);
            storesource.filter('coa', record.get("coa"));
            storesource.removeAt(0);
        });
        storesource.clearFilter();

    },
    /*
    Destroycoaingriddestination: function () {
        var me, gridsource, storesource, countersource, griddestination,
                storedestination, counterdestination, rawsource, rowdata;
        me = this;
        rowdata = me.rowdestination;
        griddestination = me.getGriddestination();
        storedestination = griddestination.getStore();
        storedestination.removeAt(storedestination.find('coa', rowdata.coa));
        storedestination.sort({property: 'coa', direction: 'ASC'});
    },
    */
    Destroycoaingriddestination: function () {
        var me, gridsource, storesource, countersource, griddestination, storedestination, counterdestination;
        me = this;
        gridsource = me.getGridsource();
        storesource = gridsource.getStore();
        //countersource = storesource.getCount();

        griddestination = me.getGriddestination();
        storedestination = griddestination.getStore();
        //counterdestination = storedestination.getCount();

        storesource.each(function (record) {
            storedestination.clearFilter(true);
            storedestination.filter('coa', record.get("coa"));
            storedestination.removeAt(0);
        });
        storedestination.clearFilter();

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
        grid = me.getGridsource();
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            record = grid.getSelectionModel().getSelection()[0];
            row = record['data'];
            me.rowsource = row;
        }
    },
    setStoreDepartment: function () {
        var me, store, form, pt_id, storecoa, prefix, combodata, state;
        me = this;
        form = me.getFormdata();
        combodata = form.down("[name=department_id]");
        prefix = combodata.getValue();
        pt_id = form.down("[name=pt_id]").getValue();
        form.down("[name=department_id]").setValue('');
        store = form.down('[name=department_id]').getStore();
        state = form.up('window').state.toLowerCase();
        store.load({
            url: me.urlcommon,
            params: {
                "hideparam": 'getdepartmentbyparam',
                "pt_id": pt_id,
            },
            callback: function (records, operation, success) {
                if (store.getCount() < 1) {
                    storecoa = me.getStore("Coa");
                    if (storecoa.getCount() > 0) {
                        storecoa.removeAll();
                    }
                    me.buildWarningAlert("Department list in this company is empty.");
                } else {
                    if (prefix !== null) {
                        combodata.setValue(prefix);
                    }
                    if(state == 'create'){
                        me.setStoreCoa();
                    }
                    //me.setStoreCoa();
                }
            }
        });
    },
    setDepartFormsearch: function () {
        var me, store, form, pt_id, storecoa, prefix, combodata;
        me = this;
        form = me.getFormsearch();
        combodata = form.down("[name=department_id]");
        prefix = combodata.getValue();
        pt_id = form.down("[name=pt_id]").getValue();
        form.down("[name=department_id]").setValue('');
        store = me.getStore("Department");
        store.reload({
            url: me.urlcommon,
            params: {
                "hideparam": 'getdepartmentbyparam',
                "pt_id": pt_id,
            },
            callback: function (records, operation, success) {
            }
        });
    },
    setStoreCoa: function () {
        var me, store, form, project_id, pt_id;
        me = this;
        form = me.getFormdata();
        pt_id = form.down("[name=pt_id]").getValue();
        project_id = form.down("[name=project_id]").getValue();
        store = me.getStore("Coa");
        store.load({
            url: me.urlcommon,
            params: {
                "hideparam": 'getcoabyprojectpt',
                "project_id": project_id,
                "pt_id": pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                if (store.getCount() < 1) {
                    me.buildWarningAlert("COA list in this company is empty");
                }
            }
        });

    },
    AjaxRequest: function () {
        var me, form;
        me = this;
        form = me.getFormdata();
        form.el.mask('Processing please wait,..', 'x-mask-loading');
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 45000000,
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                me.info = Ext.JSON.decode(response.responseText);
                me.setSuccessEvent();
                form.el.unmask();
            },
            failure: function (jqXHR, exception) {
                alert(exception);
                me.buildWarningAlert("Something process failure..");
            }
        });
    },
    formdataClose: function () {
        var me, form, grid, store;
        me = this;
        form = me.getFormdata();
        form.up('window').close();
        grid = me.getGrid();
        store = grid.getStore();
        store.reload();
    },
    setSuccessEvent: function () {
        var me, data,
                me = this;
        data = me.info.data;
        switch (me.info.parameter) {
            case 'default':
                break;
            case 'create':
                me.buildSuccessAlert(me.info.msg);
                me.formdataClose();
                break;
            case 'update':
                me.buildSuccessAlert(me.info.msg);
                me.formdataClose();
                break;
            case 'importdata':
                me.getFormdata().up('window').close();
                break;
            case 'deletedetail':
                 me.getGriddetail().up('window').unmask();
                break;
            case 'error':
                me.buildWarningAlert(me.info.msg);
                me.formdataClose();
                break;
        }
    },
    panelAfterRender: function () {
        var me = this;
        var f = me.getFormsearch();
        var projectpt_id = 0;
        me.getFormsearch().down("[name=pt_id]").getStore().load({
            callback: function() {
                f.down("[name=pt_id]").setValue(parseInt(apps.pt));
            }
        });
        me.getFormsearch().down("[name=department_id]").getStore().load();
        me.getFormsearch().down("[name=cashflowtype_id]").getStore().load();

        //store = me.getStore('Department').load();
        me.loadDataProject(f);
    },
    dataSearch: function () {
        resetTimer();
        var me = this;
        var form = me.getFormsearch().getForm();
        var store = me.getGrid().getStore();

        me.getFormsearch().down("[name=hideparam]").setValue('search');  // added on april 2016, ahmad riadi    
        var fields = me.getFormsearch().getValues();
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
    },
    dataDestroy: function () {
        var me = this;
        var rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGrid().getStore();
            var storedetail = me.getGriddetail().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
                confirmmsg = 'Delete this Record ?';
                failmsg = 'Error: Unable to delete this Record.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function () {
                        me.getGrid().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        store.remove(rows[i]);
                    }

                    store.on('beforesync', msg);
                    store.sync({
                        success: function (s) {
                            me.getGrid().up('window').unmask();
                            var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                            var successmsg = (rows.length == 1 ? 'Record' : 'Records') + ' deleted successfully.';
                            store.un('beforesync', msg);
                            store.reload();
                            storedetail.reload();
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
                        failure: function (batch, options) {
                            // added on april 2016, ahmad riadi
                            var parameter = (batch.proxy.getReader().jsonData.param ? batch.proxy.getReader().jsonData.param : 'no');
                            var pesan = (batch.proxy.getReader().jsonData.msg ? batch.proxy.getReader().jsonData.msg : 'Unable to save data.');
                            if (parameter == 'used') {
                                failmsg = pesan;
                            } else {
                                failmsg = failmsg + ' The data may have been used.';
                            }

                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            storedetail.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg,
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
    dataExport: function() {

        var me,report, fs;
        me = this;  
        fs = me.getFormsearch();
        var pt_id = fs.down("[name=pt_id]").getValue() == '' ? apps.pt : fs.down("[name=pt_id]").getValue();

        me.senddata = {
            hideparam: 'exportdata',
            pt_id: pt_id,
            project_id: apps.project
        }; 
        Ext.getBody().mask("Please wait...");
        me.AjaxRequest();
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout:100000000,  
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                me.info = Ext.JSON.decode(response.responseText);

                if (me.senddata['hideparam'] == 'exportdata' || me.senddata['hideparam'] == 'exportExcelCountList') {
                    me.setSuccessEventExport();
                } else {
                    me.setSuccessEvent();
                }
            },
            failure: function (response) {
                me.getFormdata().up('window').close();
            }
        });
    },
    setSuccessEventExport: function () {

        var me = this;
        Ext.getBody().unmask();
        var file_path = me.info.data.url;  
        var a = document.createElement('A');
        a.href = file_path;
        a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        Ext.getBody().unmask();
    },
    formDataCopy: function() {
        
        var me = this;
        me.instantWindow('FormDataCopy', 500, 'Copy Setup Cashflow', 'create', 'myInstantWindow', me.controllerName);
    },
    loadDataFormDataCopy: function() {

        var me = this;
        var f = me.getFormdatacopy();
        var storeproject = me.getStore('Project');
        f.setLoading('Loading data...');
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
                        f.down("[name=from_project_id]").setValue(parseInt(apps.project));
                    }
                }
                f.setLoading(false);
            }
        });

        me.loadPtbyProject();
    },
    loadPtbyProject: function(){

        var me = this;
        var ptid = '';
 
        var f = me.getFormdatacopy();

        f.setLoading('Loading data...');

        Ext.Ajax.request({
            url: 'cashier/common/read',
            params: {
                "hideparam": 'getptbyuser',
                "start": 0,
                "limit": 1000000,
                "user_id": apps.uid
            },
            success: function(response) {
                var result = Ext.JSON.decode(response.responseText);
                result = result.data;

                var storefrompt = f.down("[name=from_pt_id]").getStore();
                var storetopt = f.down("[name=to_pt_id]").getStore();

                for (var i = 0; i < result.length; i++) {
                    if (storefrompt.findExact('projectpt_id', result[i].projectpt_id) === -1) {
                        storefrompt.add({
                            pt_id: result[i].pt_id,
                            project_id: result[i].project_id,
                            ptname: result[i].ptname,
                            projectname: result[i].projectname,
                            projectpt_id: result[i].projectpt_id
                        })
                        
                        storetopt.add({
                            pt_id: result[i].pt_id,
                            project_id: result[i].project_id,
                            ptname: result[i].ptname,
                            projectname: result[i].projectname,
                            projectpt_id: result[i].projectpt_id
                        })
                    }
                }
                storefrompt.filterBy(function(rec) {
                    if (rec.get('project_id') == parseInt(apps.project)) {
                        return true;
                    }
                })
                f.down("[name=from_pt_id]").setValue(parseInt(apps.pt));
                f.setLoading(false);   
            }
        })
    },
    loadDataDepartment: function() {

        var me = this;
        var f = me.getFormdatacopy();
        var store = me.getGridmappingdept().getStore();
        var project_id = f.down("[name=from_project_id]").getValue() == '' ? apps.project : f.down("[name=from_project_id]").getValue();
        var pt_id = f.down("[name=from_pt_id]").getValue() == '' ? apps.pt : f.down("[name=from_pt_id]").getValue();
        var copy_method = f.down("[name=copy_method]").getGroupValue(); 
        var cashflow = me.getGrid().getSelectionModel().getSelection();
        var selecteddeptcashflow = [];

        for (var j = 0; j < cashflow.length; j++) {
            selecteddeptcashflow.push(cashflow[j].data.department_code);
        }

        f.setLoading("Loading data...");
        Ext.Ajax.request({
            url: 'cashier/common/read',
            params: {
                "hideparam": "getdepartment",
                "project_id": project_id,
                "pt_id": pt_id,
                "limit": 100000
            },
            success: function(response) {
                var result = Ext.JSON.decode(response.responseText);
                result = result.data;

                store.removeAll();
                for (var i = 0; i < result.length; i++) {

                    if (copy_method == 1) {
                        if (selecteddeptcashflow.indexOf(result[i].code) !== -1) {
                            store.add({
                                'source_department_code': result[i].code
                            })
                        }
                    } else {
                        store.add({
                            'source_department_code': result[i].code
                        })
                    }
                }
                f.setLoading(false);
            }
        })
    },
    loadDataDepartmentDestination: function() {

        var me = this;
        var f = me.getFormdatacopy();
        var grid = me.getGridmappingdept();
        var store = me.getStore('Department'); 

        var project_id = f.down("[name=to_project_id]").getValue();
        var pt_id = f.down("[name=to_pt_id]").getValue();
        
        f.setLoading("Loading data...");
        store.removeAll();
        store.getProxy().setExtraParam("project_id", project_id);
        store.getProxy().setExtraParam("pt_id", pt_id);
        store.getProxy().setExtraParam("limit", 100000);
        store.load({
            callback: function() {
                var keys = grid.getStore().data.keys;
                var new_code = '';
                for (var i = 0; i < keys.length; i++) {
                    var code = grid.getStore().data.items[i].data.source_department_code;
                    grid.getStore().getAt(i).set({'destination_department_code' : ''});
                    var checkexists = store.findExact("code", code);
                    if (checkexists != -1) {
                        new_code = store.data.items[checkexists].data.code;
                        grid.getStore().getAt(i).set({'destination_department_code' : new_code});
                    }
                }
                grid.getStore().sync();
                f.setLoading(false);
            }
        })
    },
    doCopy: function() {

        var me = this;
        var f = me.getFormdatacopy();
        var from_project_id = f.down("[name=from_project_id]").getValue();
        var from_pt_id = f.down("[name=from_pt_id]").getValue();
        var to_project_id = f.down("[name=to_project_id]").getValue();
        var to_pt_id = f.down("[name=to_pt_id]").getValue();
        var copy_method = f.down("[name=copy_method]").getGroupValue();
        var griddept = me.getGridmappingdept();
        var storegriddept = griddept.getStore();
        var arrdept = [];
        var arrcashflow_id = [];

        for (var i = 0; i < storegriddept.getCount(); i++) {
            var source_dept = storegriddept.data.items[i].data.source_department_code;
            var destination_dept = storegriddept.data.items[i].data.destination_department_code;
            var pair = source_dept + ":" + destination_dept;

            arrdept.push(pair);
        }
        
        var deptmapping = arrdept.join(',');
        var cashflow = me.getGrid().getSelectionModel().getSelection();
        var setupcashflow_id = '';
        if (cashflow.length <= 0) {
            Ext.Msg.alert("Info", "Please Select Record First");
            return false;
        } else {
            for (var i = 0; i < cashflow.length; i++) {
                setupcashflow_id = cashflow[i].data.setupcashflow_id;
                arrcashflow_id.push(setupcashflow_id);
            }
        }

        setupcashflow_id = arrcashflow_id.join(',');

        f.setLoading("Processing data...");
        Ext.Ajax.request({
            url: 'cashier/setupcashflow/copy',
            params: {
                "from_project_id": from_project_id,
                "from_pt_id": from_pt_id,
                "to_project_id": to_project_id,
                "to_pt_id": to_pt_id,
                "copy_method": copy_method,
                "mappingdept": deptmapping,
                "setupcashflow_id": setupcashflow_id,
                "user_id": apps.uid
            },
            success: function(response) {
                var result = Ext.JSON.decode(response.responseText);
                Ext.Msg.alert("Info", "<b>Copy Result :</b> <br>" + result.msg);
                f.up('window').close();
            }
        })
    },
    loadDataProject: function(form) {
        var me = this;
        var projectStore = form.down("[name=project_id]").getStore();
        projectStore.getProxy().setExtraParam('hideparam', 'getptbyuser');
        projectStore.load({
            callback: function() {
                form.down("[name=project_id]").setValue(parseInt(apps.project));

                me.loadDataPt(form, parseInt(apps.project));
            }
        });
    },
    loadDataPt: function(form, project_id) {
        var me = this;
        var fd = form;

        var store = fd.down("[name=pt_id]").getStore();
        store.getProxy().setExtraParam('hideparam', 'getptbyuserproject');
        store.getProxy().setExtraParam('project_id', project_id);
        store.getProxy().setExtraParam('user_id', parseInt(apps.uid));
        store.clearFilter();
        // store.filter(function(rec) {
        //     if (parseInt(rec.get('project_id')) == project_id) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // })
        store.load({
            callback: function(records, operation, success) {
                if (form.xtype == 'setupcashflowformsearch') {
                    if (project_id == parseInt(apps.project)) {
                        fd.down("[name=pt_id]").setValue(parseInt(apps.pt));
                    } else {
                        store.each(function(rec,idx){
                            if (idx == 0) {
                                fd.down("[name=pt_id]").setValue(rec.get('pt_id'));
                            }
                        });
                    }
                } else {
                    var fs = me.getFormsearch();
                    fd.down("[name=pt_id]").setValue(fs.down("[name=pt_id]").getValue());
                }    

                var deptStore = form.down("[name=department_id]").getStore();
                deptStore.getProxy().setExtraParam('hideparam', 'getdepartment');
                deptStore.getProxy().setExtraParam('project_id', project_id);
                deptStore.getProxy().setExtraParam('pt_id', fd.down("[name=pt_id]").getValue());
                deptStore.load();
                
            }
        });
    },
    dataExportListData: function(params) {
        var me,report, fs;
        me = this;
        params['hideparam'] = 'exportExcelCountList';
        
        Ext.Msg.show({
            title: 'Export Excel',
            msg: 'Anda akan mendownload list Setup Cashflow '+params['typeparams'].replace('exportList', '') +'  ?',
            width: 300,
            closable: false,
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText:
                    {
                        yes: 'Yes',
                        no: 'No'
                    },
            multiline: false,
            fn: function (buttonValue, inputText, showConfig) {
                if (buttonValue == 'yes') {
                    me.senddata = params;
                    Ext.getBody().mask("Please wait...");
                    me.AjaxRequest();
                } 
            }});
    },
});