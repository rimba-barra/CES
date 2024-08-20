Ext.define('Cashier.controller.Kartupiutangacc', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.kartupiutangacc',
    requires: [
        'Ext.EventObject',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Clustercombobox',
        'Cashier.view.kartupiutangacc.dataglGrid',
        'Cashier.view.kartupiutangacc.kartuPiutangGrid',
        'Cashier.library.template.checkbox.CheckColumnv2',
        'Cashier.library.template.combobox.Accounttipepajakcombobox',
        'Cashier.library.template.combobox.Coacombobox'
    ],
    views: [
        'kartupiutangacc.Panel',
        'kartupiutangacc.Grid',
        'kartupiutangacc.FormSearch',
        'kartupiutangacc.FormData',
        'kartupiutangacc.FormDataKartuPiutang',
        'kartupiutangacc.dataglGrid',
        'kartupiutangacc.kartuPiutangGrid',
        'kartupiutangacc.Gridppn',
        'kartupiutangacc.Gridpph',
    ],
    stores: [
        'Kartupiutangacc',
        'Kartupiutangaccgl',
        'Kartupiutangacckp',
        'Kartupiutangaccppn',
        'Kartupiutangaccpph',
        'Project',
        'Pt',
        'Cluster',
        'Accounttipepajakcombo',
        'Coa'
    ],
    models: [
        'Kartupiutangacc',
        'Kartupiutangaccgl',
        'Kartupiutangacckp',
        'Kartupiutangaccppn',
        'Kartupiutangaccpph',
        'Project',
        'Pt',
        'Cluster',
        'Accounttipepajakcombo',
        'Coa'
    ],
    refs: [
        {
            ref: 'grid',
            selector: 'kartupiutangaccgrid'
        },
        {
            ref: 'dataglgrid',
            selector: 'kartupiutangaccdataglgrid'
        },
        {
            ref: 'kartupiutanggrid',
            selector: 'kartupiutangacckartupiutanggrid'
        },
        {
            ref: 'gridppn',
            selector: 'kartupiutangaccgridppn'
        },
        {
            ref: 'gridpph',
            selector: 'kartupiutangaccgridpph'
        },
        {
            ref: 'formsearch',
            selector: 'kartupiutangaccformsearch'
        },
        {
            ref: 'formdata',
            selector: 'kartupiutangaccformdata'
        },
        {
            ref: 'formdatakartupiutang',
            selector: 'kartupiutangaccformdatakartupiutang'
        },
        {
            ref: 'panel',
            selector: 'kartupiutangaccpanel'
        },
        {
            ref: 'checkcolumnv2',
            selector: 'checkcolumnv2'
        },
        {
            ref: 'formdatahitungppn',
            selector: 'kartupiutangaccformdatahitungppn'
        },
        {
            ref: 'formdatahitungpph',
            selector: 'kartupiutangaccformdatahitungpph'
        },
        {
            ref: 'formdataexport',
            selector: 'kartupiutangaccformdataexport'
        }
    ],
    controllerName: 'kartupiutangacc',
    fieldName: 'subgl_id',
    bindPrefixName: 'Kartupiutangacc',
    formWidth: 1200,
    win: null,
    winId: null,
    init: function (application) {
        var me = this;
        this.control({
            'kartupiutangaccpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    this.formSearchAfterRenderCustom();

                    // $("#WINDOW-mnu"+me.bindPrefixName+"_header-targetEl .x-tool-maximize").click();
                    panel.up('window').maximize(true);
                }
            },
            'kartupiutangaccgrid': {
                afterrender: function() {
                    this.gridAfterRender;
                    me.getGrid().down("[action=destroy]").hide();
                },
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: me.gridSelectionChange
            },
            'kartupiutangaccgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'kartupiutangaccgrid toolbar [action=print]': {
                click: function() {
                    me.printReport();
                }
            },
            'kartupiutangaccgrid toolbar [action=printv2]': {
                click: function() {
                    me.printReportv2();
                }
            },
            'kartupiutangaccgrid toolbar [action=export]': {
                click: function () {
                    me.instantWindow('FormDataExport', 400, 'Export Data', 'create', 'FormDataExport', me.controllerName);
                }
            },
            'kartupiutangaccgrid toolbar [action=fetchdata]': {
                click: function () {
                    var me = this;
                    Ext.Msg.confirm("Confirmation", "Are you sure ?", function (btn) {
                        if (btn == "yes") {
                            me.doFetchData();
                        }
                    })
                }
            },
            'kartupiutangaccformsearch [name=project_id]': {
                change: function() {
                    this.loadPtbyProject();
                }
            },
            'kartupiutangaccformsearch [name=pt_id]': {
                change: function() {
                    this.loadClusterbyProjectPt();
                }
            },
            'kartupiutangaccformsearch [action=search]': {
                click: function() {
                    var me = this;
                    var f = me.getFormsearch();
                    var unit_number = f.down("[name=unit_number]").getValue();
                    if (unit_number == "" || unit_number == null) {
                        Ext.Msg.alert('Warning', 'Unit number must be filled.');
                        return false;
                    }
                    me.dataSearch();
                }
            },
            'kartupiutangaccformsearch [action=reset]': {
                click: me.dataReset
            },
            'kartupiutangaccformdata': {
                afterrender: function (panel) {
                    var me, form;
                    me = this;
                    form = me.getFormdata();
                    me.formDataAfterRender(form);

                    // reset gl store & kartu piutang store
                    me.getStore("Kartupiutangaccgl").removeAll();
                    me.getStore("Kartupiutangacckp").removeAll();

                    me.loadDataKartuPiutang();

                    // form.up('window').maximize(true);
                }
            },
            'kartupiutangaccformdata [action=searchGl]': {
                click: function() {
                    this.loadDataGL();
                }
            },
            'kartupiutangaccformdata [action=resetSearchGl]': {
                click: function() {
                    var me = this;
                    var f = me.getFormdata();
                    f.down("[name=fromdate]").setValue("");
                    f.down("[name=untildate]").setValue("");
                    f.down("[name=coa]").setValue("");
                    f.down("[name=voucher_no]").setValue("");
                    f.down("[name=description]").setValue("");
                    f.down("[name=code]").setValue("");

                    me.getStore("Kartupiutangaccgl").removeAll();
                }
            },
            'kartupiutangaccformdata [action=trasnfer2Kp]': {
                click: function() {
                    this.transferToKartuPiutang();
                }
            },
            'kartupiutangaccformdata [action=cancelTrasnfer]': {
                click: function() {
                    this.cancelTransferToKartuPiutang();
                }
            },
            'kartupiutangaccformdata [action=save]': {
                click: function() {
                    this.saveKartuPiutang();
                }
            },
            'checkcolumnv2': {
                checkchange: function (column, recordIndex, checked) {
                    var me, grid, store, record, row, counter;
                    me = this;
                    grid = me.getKartupiutanggrid();
                    store = grid.getStore();
                    counter = store.getCount();
                }
            },
            'kartupiutangacckartupiutanggrid': {
                selectionchange: function () {
                    var me = this;
                    var grid = me.getKartupiutanggrid(), row = grid.getSelectionModel().getSelection();

                    grid.down('#btnEdit').setDisabled(row.length != 1);
                    grid.down('#btnDelete').setDisabled(row.length < 1);

                    row.forEach(function (val, idx) {
                        if (val.data.voucher_no != "") {
                            grid.down('#btnEdit').setDisabled(true);
                            grid.down('#btnDelete').setDisabled(true);
                        } 
                    })
                },
                itemdblclick: function () {

                    var grid = me.getKartupiutanggrid(), row = grid.getSelectionModel().getSelection();

                    row.forEach(function (val, idx) {
                        if (val.data.voucher_no != "") {
                            me.instantWindow('FormDataKartuPiutang', 500, 'View Kartu Piutang', 'read', 'addNewKartuPiutang', me.controllerName);
                        } else {
                            me.instantWindow('FormDataKartuPiutang', 500, 'Edit Kartu Piutang', 'update', 'addNewKartuPiutang', me.controllerName);
                        }
                    })

                    
                }
            },
            'kartupiutangacckartupiutanggrid [action=create]': {
                click: function() {
                    me.instantWindow('FormDataKartuPiutang', 500, 'Add New Kartu Piutang', 'create', 'addNewKartuPiutang', me.controllerName);
                }
            },
            'kartupiutangacckartupiutanggrid [action=update]': {
                click: function() {
                    me.instantWindow('FormDataKartuPiutang', 500, 'Edit Kartu Piutang', 'update', 'addNewKartuPiutang', me.controllerName);
                }
            },
            'kartupiutangacckartupiutanggrid [action=destroy]': {
                click: function() {
                    me.deleteKartuPiutang();
                }
            },
            'kartupiutangacckartupiutanggrid [action=generateppn]': {
                click: function () {
                    var me = this;
                    me.instantWindow('FormDataHitungppn', 1220, 'Hitung PPN', 'create', 'hitungppn', me.controllerName);
                }
            },
            'kartupiutangacckartupiutanggrid [action=generatepph]': {
                click: function () {
                    var me = this;
                    me.instantWindow('FormDataHitungpph', 1220, 'Hitung PPh', 'create', 'hitungpph', me.controllerName);
                }
            },
            'kartupiutangaccformdatakartupiutang': {
                afterrender: function(v) {
                    // me.loadDataTipePajak();
                    me.getFormdatakartupiutang().down("[name=coa_id]").getStore().load({
                        params: {
                            'project_id': me.getFormsearch().down("[name=project_id]").getValue(),
                            'pt_id': me.getFormsearch().down("[name=pt_id]").getValue(),
                        }
                    });
                    
                    var state = v.up('window').state;
                    me.kartuPiutangFormDataAfterRender(me, state);
                },
                boxready: function () {
                    var fd = me.getFormdatakartupiutang();
                    var convertocurr = accounting.formatMoney(fd.down("[name=amount]").getValue());
                    fd.down("[name=amount]").setValue(convertocurr);
                }
            },
            'kartupiutangaccformdatakartupiutang [name=rate]': {
                change: function (el, e) {
                    var dpp = parseFloat(me.getFormdatakartupiutang().down("[name=dpp]").getValue());
                    var rate = parseFloat(el.value);

                    dpp = null ? 0 : dpp;
                    rate = null ? 0 : rate;
                    
                    if (!isNaN(dpp) && !isNaN(rate)) {
                        var ppn = dpp * (rate/100);
                        me.getFormdatakartupiutang().down("[name=amount]").setValue(ppn.toFixed(2));
                    }
                }
            },
            'kartupiutangaccformdatakartupiutang [action=save]': {
                click: function(v) {

                    var state = v.up('window').state;

                    me.saveNewKartuPiutang(state);
                }
            },
            'kartupiutangaccformdatahitungppn': {
                afterrender: function () {
                    var me = this;
                    var grid = me.getGridppn();
                    var store = grid.getStore();
                    
                    store.getProxy().setExtraParam("subgl_id", me.getFormdata().down("[name=subgl_id]").getValue());
                    store.load();   
                }
            },
            'kartupiutangaccformdatahitungppn [action=prosesppn]': {
                click: this.prosesppn
            },
            'kartupiutangaccformdatahitungpph': {
                afterrender: function () {
                    var me = this;
                    var grid = me.getGridpph();
                    var store = grid.getStore();

                    store.getProxy().setExtraParam("subgl_id", me.getFormdata().down("[name=subgl_id]").getValue());
                    store.load();   
                }
            },
            'kartupiutangaccformdatahitungpph [action=prosespph]': {
                click: this.prosespph
            },
            'kartupiutangaccformdataexport [action=process]': {
                click: this.processExport
            }
        });
    },
    formSearchAfterRenderCustom: function() {
        var me, storeproject;
        me = this;

        var f = me.getFormsearch();

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
    },
    loadPtbyProject: function(){

        var me = this;
        projectid = me.getFormsearch().down("[name=project_id]").getValue();
         
        if(projectid != null){
            projectid = me.getFormsearch().down("[name=project_id]").getValue();
        }else{
            projectid = apps.project;
        }
 
        var f = me.getFormsearch();
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
                    f.down("[name=pt_id]").setValue(parseInt(apps.pt));                      
                }        
            }
        });
    },
    loadClusterbyProjectPt: function(){

        var me = this;
        projectid = me.getFormsearch().down("[name=project_id]").getValue();
        ptid = me.getFormsearch().down("[name=pt_id]").getValue();
         
        if(projectid != null){
            projectid = me.getFormsearch().down("[name=project_id]").getValue();
            ptid = me.getFormsearch().down("[name=pt_id]").getValue();
        }else{
            projectid = apps.project;
            ptid = apps.pt;
        }
 
        var f = me.getFormsearch();
        storecoa = me.getStore('Cluster');
        storecoa.load({
            params: {
                "hideparam": 'getcluster',
                "start": 0,
                "limit": 1000000,
                "project_id": projectid,
                "pt_id": ptid,
                "user_id": apps.uid
            }
        });
    },
    loadDataGL: function() {

        var me = this;
        var f  = me.getFormdata();
        var fromdate = moment(f.down("[name=fromdate]").getValue()).format("YYYY-MM-DD");
        var untildate = moment(f.down("[name=untildate]").getValue()).format("YYYY-MM-DD");

        var voucherdate1 = f.down("[name=fromdate]").getValue();
        var voucherdate2 = f.down("[name=untildate]").getValue();
        var voucher_no = f.down("[name=voucher_no]").getValue();
        var coa = f.down("[name=coa]").getValue();

        if (voucherdate1 == "" && voucherdate2 == "") {
            Ext.Msg.alert("Alert", "Required search parameter must be filled.");
            return false;
        }

        storegl = me.getStore('Kartupiutangaccgl');

        var fields = f.getValues();
        for (var x in fields) {
            storegl.getProxy().setExtraParam(x, fields[x]);
        }
        
        storegl.getProxy().setExtraParam("hideparam", "datagl");
        storegl.getProxy().setExtraParam("fromdate", fromdate);
        storegl.getProxy().setExtraParam("untildate", untildate);
        storegl.load();
    },
    transferToKartuPiutang: function() {

        var me = this;
        var f  = me.getFormdata();
        var selected_data = me.getDataglgrid().getSelectionModel().getSelection();

        if (selected_data.length <= 0) {
            Ext.Msg.alert("Warning", "No GL Data Selected.");
            return false;
        }

        var storegl = me.getStore("Kartupiutangaccgl");
        var storekp = me.getStore("Kartupiutangacckp");
        
        
        Ext.Msg.confirm("Confirmation", "Transfer to Kartu Piutang Accounting ?", function(btn) {
            if (btn == "yes") {
                f.setLoading("Transfering data, please wait...")
        
                var i = 0;
                var task = new Ext.util.DelayedTask(function() {

                    if (i <= selected_data.length) {
                        selected_data.forEach(function(rec, idx) {

                            var sendData = rec.data;
                            sendData["unit_number"] = f.down("[name=code]").getValue();
                            sendData["subgl_id"] = f.down("[name=subgl_id]").getValue();
                            sendData["cluster"] = f.down("[name=cluster]").getValue();
                            sendData["cluster_id"] = f.down("[name=cluster_id]").getValue();
                            sendData["sign"] = rec.get("pengali");
                            sendData["index"] = rec.get("sort");
                            sendData["index_sub"] = rec.get("indexsubdata");

                            if (i == idx) {
                                Ext.Ajax.request({
                                    url: 'cashier/kartupiutangacc/create',
                                    method: 'POST',
                                    timeout: 10000000,
                                    async: false,
                                    params: {
                                        data: Ext.encode(sendData),
                                        hideparam: 'kartupiutang',
                                        project_id: f.down("[name=project_id]").getValue(),
                                        pt_id: f.down("[name=pt_id]").getValue()
                                    },
                                    success: function(response) {
                                        // console.log(response);
                                    }
                                })
                            }
                        })
                        
                        var perc = (i / selected_data.length) * 100;
                        f.setLoading("Transfering data... ("+perc.toFixed(2)+"%)");
                        task.delay(200);
                        i++;
                    } else {
                        f.setLoading(false);
                        Ext.Msg.alert("Info", "Data transferred successfully.");
                        storegl.load();
                        storekp.load();
                        return false;
                    }
                
                })
                task.delay(200);                
            }
        })
    },
    cancelTransferToKartuPiutang: function() {

        var me = this;
        var selected_data = me.getKartupiutanggrid().getSelectionModel().getSelection();

        if (selected_data.length <= 0) {
            Ext.Msg.alert('Warning', 'No Data Selected.');
            return false;
        }

        var storegl = me.getStore("Kartupiutangaccgl");
        var storekp = me.getStore("Kartupiutangacckp");

        var no_kartupiutang_id = 0;
        selected_data.forEach(function(rec) {
            if (rec.get("kartupiutang_id") == null || rec.get("kartupiutang_id") == "") {
                no_kartupiutang_id++;
            }
        }); 
        
        Ext.Msg.confirm("Confirmation", "Cancel transfer akan menghapus data yang telah anda pilih dari kartu piutang. Lanjutkan ?", function(btn) {
            if (btn == 'yes') {
                
                storekp.remove(selected_data);

                if (no_kartupiutang_id > 0 && no_kartupiutang_id == selected_data.length) {
                    me.loadDataGL();
                    me.filterGLByKartuPiutang();
                } else {
                    var msg = function () {
                        me.getFormdata().up('window').body.mask('Processing data, please wait ...');
                    };
    
                    storekp.on('beforesync', msg);
                    storekp.sync({
                        success: function (batch, options) {
                            me.getFormdata().up('window').body.unmask();
                            storekp.un('beforesync', msg);
                            storekp.reload();
                            me.loadDataGL();
                            Ext.Msg.show({
                                title: 'Success',
                                msg: 'Data has been removed from kartu piutang accounting',
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        }
                    })
                }
            }
        })
    },
    saveKartuPiutang: function() {

        var me = this;
        var f  = me.getFormdata();

        var storekp = me.getStore("Kartupiutangacckp");
        var jumlahData = storekp.getCount();

        Ext.Msg.confirm('Confirmation', 'Update data kartu piutang ?', function(btn) {
            if (btn == 'yes') {

                f.setLoading("Please wait, data is being processed...")

                var i = 0;
                var task = new Ext.util.DelayedTask(function() {

                    if (i <= jumlahData) {
                        storekp.each(function(rec, idx) {

                            var sendData = rec.data;

                            if (i == idx) {
                                Ext.Ajax.request({
                                    url: 'cashier/kartupiutangacc/update',
                                    method: 'POST',
                                    timeout: 10000000,
                                    async: false,
                                    params: {
                                        data: Ext.encode(sendData),
                                        hideparam: 'kartupiutang_checklist',
                                        project_id: f.down("[name=project_id]").getValue(),
                                        pt_id: f.down("[name=pt_id]").getValue()
                                    },
                                    success: function(response) {

                                    }
                                })
                            }
                        })
                        
                        var perc = (i / jumlahData) * 100;
                        f.setLoading("Updating data... ("+perc.toFixed(2)+"%)");
                        task.delay(200);
                        i++;
                    } else {
                        f.setLoading(false);
                        Ext.Msg.alert("Info", "Data updated successfully.");
                        me.loadDataKartuPiutang();
                        return false;
                    }
                
                })
                task.delay(200);
            }
        })
    },
    loadDataKartuPiutang: function() {

        var me = this;
        var f  = me.getFormdata();

        var storekp = me.getStore('Kartupiutangacckp');

        var fields = f.getValues();
        for (var x in fields) {
            storekp.getProxy().setExtraParam(x, fields[x]);
        }
        
        storekp.getProxy().setExtraParam("hideparam", "kartupiutang");
        storekp.load();
    },
    saveNewKartuPiutang: function(state) {

        var me = this;
        var f = me.getFormdatakartupiutang();
        var form = me.getFormdata();

        var fields = f.getValues();

        fields['project_id'] = form.down("[name=project_id]").getValue();
        fields['pt_id']       = form.down("[name=pt_id]").getValue();
        fields['subgl_id']    = form.down("[name=subgl_id]").getValue();
        fields['cluster_id']  = form.down("[name=cluster_id]").getValue();
        fields['cluster']     = form.down("[name=cluster]").getValue();
        fields['unit_number'] = form.down("[name=code]").getValue();

        // validation process
        if (fields["coa_id"] == "") {
            Ext.Msg.alert("Alert", "Field Account must be filled.");
            return false;
        }

        // if (fields["voucher_no"] == "") {
        //     Ext.Msg.alert("Alert", "Field Voucher No. must be filled.");
        //     return false;
        // }

        // if (fields["voucher_date"] == "") {
        //     Ext.Msg.alert("Alert", "Field Voucher Date must be filled.");
        //     return false;
        // }

        if (fields["amount"] == "") {
            Ext.Msg.alert("Alert", "Field Amount must be filled.");
            return false;
        }

        if (fields["description"] == "") {
            Ext.Msg.alert("Alert", "Field Description must be filled.");
            return false;
        }
        
        var url = '';
        if (state == 'create') {
            url = 'cashier/kartupiutangacc/create';
        } else {
            url = 'cashier/kartupiutangacc/update';
        }

        Ext.Msg.confirm("Confirmation", "Are you sure ?", function(btn) {
            if (btn == "yes") {
                f.setLoading("Updating data, please wait...");
                Ext.Ajax.request({
                    url: url,
                    type: 'POST',
                    params: {
                        data: Ext.encode(fields),
                        hideparam: 'kartupiutang',
                        project_id: form.down("[name=project_id]").getValue(),
                        pt_id: form.down("[name=pt_id]").getValue()
                    },
                    success: function(response) {

                        var res = Ext.decode(response.responseText);
                        Ext.Msg.alert("Information", res['msg']);
                        me.getKartupiutanggrid().getStore().reload();
                        f.setLoading(false);
                        f.up('window').close();
                    }
                })
            }
        })
    },
    loadDataTipePajak: function() {

        var me = this;
        var storecoa = me.getStore("Accounttipepajakcombo");
        var f = me.getFormdata();

        storecoa.getProxy().setExtraParam("project_id", f.down("[name=project_id]").getValue());
        storecoa.getProxy().setExtraParam("pt_id", f.down("[name=pt_id]").getValue());
        storecoa.getProxy().setExtraParam("hideparam", "accounttipepajak");

        storecoa.load();
    },
    deleteKartuPiutang: function() {
        
        var me = this;
        var rows = me.getKartupiutanggrid().getSelectionModel().getSelection();

        if (rows.length <= 0) {
            Ext.Msg.alert("Info", "No record selected !");
            return false;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getKartupiutanggrid().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get("unit_number") + ' - ' + store.getAt(store.indexOf(rows[0])).get("voucher_date") + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function () {
                        me.getKartupiutanggrid().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        store.remove(rows[i]);
                    }

                    store.on('beforesync', msg);
                    store.sync({
                        success: function (s) {
                            me.getKartupiutanggrid().up('window').unmask();
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
                        failure: function (batch, options) {
                            // added on april 2016, ahmad riadi
                            var parameter = (batch.proxy.getReader().jsonData.param ? batch.proxy.getReader().jsonData.param : 'no');
                            var pesan = (batch.proxy.getReader().jsonData.msg ? batch.proxy.getReader().jsonData.msg : 'Unable to save data.');
                            if (parameter == 'used') {
                                failmsg = pesan;
                            } else {
                                failmsg = failmsg + ' The data may have been used.';
                            }

                            me.getKartupiutanggrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
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
    kartuPiutangFormDataAfterRender: function (c, param) {
        
        var me = this;
        var fd = c.getFormdata();
        var f = c.getFormdatakartupiutang();
        
        if (param === 'update') {
            var grid = c.getKartupiutanggrid();
            var row = grid.getSelectionModel().getSelection();
            var rec = grid.getSelectedRecord();
            f.kosongGa = grid.getSelectedRow();
            f.loadRecord(rec);
        } else if (param === 'read') {
            var grid = me.getKartupiutanggrid();
            var store = grid.getStore();
            var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

            me.getFormdatakartupiutang().loadRecord(record);
            me.getFormdatakartupiutang().getForm().getFields().each(function (field) {
                field.setReadOnly(true);
            });
            me.formatCurrencyFormdata(me, me.getFormdatakartupiutang());
            me.getFormdatakartupiutang().down('#btnSave').setDisabled(true);
        }

    },
    printReport: function() {

        var me = this;
        var selected_data = me.getGrid().getSelectionModel().getSelection();
        me.winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'His');
        var title = 'Result ' + me.getPanel().up('window').title;
        var reportFile = 'KartuPiutangAccounting';

        if (selected_data.length <= 0) {
            Ext.Msg.alert("Alert", "No Data Selected");
            return false;
        }

        var sendData = [];
        sendData["subgl_id"] = selected_data[0].data.subgl_id;
        sendData["project_id"] = selected_data[0].data.project_id;
        sendData["pt_id"] = selected_data[0].data.pt_id;
        sendData["printdate"] = Ext.Date.format(new Date(), 'Y-m-d');

        Ext.getBody().mask("Please wait...");
        resetTimer();

        me.createWindows(title);
        
        var html = me.ReportviewerV4(sendData, reportFile, me.win.id, 1); //whole report
        me.win.down("#MyReportPanel_" + me.win.id).body.setHTML(html);
        $("#Reportform_" + me.win.id).submit();
        Ext.getBody().unmask();
    },
    createWindows: function (title) {
        var me = this;
        me.instantWindowWithMinimize('Panel', 800, title, 'state-report', me.winId, me.controllerName);
        me.win = desktop.getWindow(me.winId);
    },
    printReportv2: function() {

        var me = this;
        var selected_data = me.getGrid().getSelectionModel().getSelection();

        if (selected_data.length <= 0) {
            Ext.Msg.alert("Alert", "No Data Selected");
            return false;
        }

        var sendData = selected_data[0].data;
        
        Ext.getBody().mask("Please wait...");
        Ext.Ajax.request({
            url: 'cashier/kartupiutangacc/create',
            method: 'POST',
            params: {
                data: Ext.encode(sendData),
                hideparam: "printv2",
                project_id: selected_data[0].data.project_id,
                pt_id: selected_data[0].data.pt_id
            },
            success: function(response) {

                var info = Ext.JSON.decode(response.responseText);

                Ext.getBody().unmask();
                var file_path = info.data.url;  
                var a = document.createElement('A');
                a.href = file_path;
                a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                Ext.getBody().unmask();
            },
            failure: function (response) {
                Ext.getBody().unmask();
                Ext.Msg.alert("Info", "Failed when processing report.");
            }
        })
    },
    showHitunganPPN: function() {
        var me = this;
        var grid = me.getGridppn();
        var store = me.getGridppn().getStore();

        store.load({
            params: {
                'subgl_id': me.getFormdata().down("[name=subgl_id]").getValue()
            }
        });
    },
    prosesppn: function () {
        var me = this;
        var grid = me.getGridppn();
        var store = grid.getStore();
        var selectedRow = grid.getSelectionModel().getSelection();
        
        if (selectedRow.length == 0) {
            Ext.Msg.alert("Info", "No data selected");
            return false;
        } else {
            Ext.Msg.confirm("Confirmation", "Are you sure ?", function (btn) {
                if (btn == 'yes') {
                    for (var i = 0; i <= selectedRow.length; i++) {
                        if (selectedRow[i] !== undefined) {
                            var data = selectedRow[i].data;
                            data['hideparam'] = 'generateppn';

                            Ext.Ajax.request({
                                url: 'cashier/kartupiutangacc/create',
                                async: false,
                                params: {
                                    data: Ext.encode(data),
                                    hideparam: 'generateppn'
                                },
                                success: function (response) {
                                    Ext.Msg.alert("Info", "Data saved successfully.");
                                    me.getFormdatahitungppn().up('window').close();
                                    me.getKartupiutanggrid().getStore().load();
                                }
                            })
                            
                        }
                    }
                }
            })
        }
    },
    prosespph: function () {
        var me = this;
        var grid = me.getGridpph();
        var store = grid.getStore();
        var selectedRow = grid.getSelectionModel().getSelection();
        
        if (selectedRow.length == 0) {
            Ext.Msg.alert("Info", "No data selected");
            return false;
        } else {
            Ext.Msg.confirm("Confirmation", "Are you sure ?", function (btn) {
                if (btn == 'yes') {
                    for (var i = 0; i <= selectedRow.length; i++) {
                        if (selectedRow[i] !== undefined) {
                            var data = selectedRow[i].data;
                            data['hideparam'] = 'generatepph';

                            Ext.Ajax.request({
                                url: 'cashier/kartupiutangacc/create',
                                params: {
                                    data: Ext.encode(data),
                                    hideparam: 'generatepph'
                                },
                                success: function (response) {
                                    Ext.Msg.alert("Info", "Data saved successfully.");
                                    me.getFormdatahitungpph().up('window').close();
                                    me.getKartupiutanggrid().getStore().load();
                                }
                            })
                        }
                    }
                }
            })
        }
    },
    processExport: function () {
        var me = this;
        var f = me.getFormdataexport();
        var fs = me.getFormsearch();

        var data = {
            "project_id" : fs.down("[name=project_id]").getValue(),
            "pt_id" : fs.down("[name=pt_id]").getValue(),
            "type" : f.down("[name=type]").getValue(),
            "datefrom" : f.down("[name=period_from]").getValue(),
            "untildate" : f.down("[name=period_until]").getValue()
        }

        f.setLoading("Exporting data...");
        Ext.Ajax.request({
            url: 'cashier/kartupiutangacc/create',
            params: {
                "hideparam": "exportdata",
                "data": Ext.encode(data),
                "project_id": fs.down("[name=project_id]").getValue(),
                "pt_id": fs.down("[name=pt_id]").getValue()
            },
            success: function (response) {
                f.setLoading(false);

                var info = Ext.JSON.decode(response.responseText);
                var file_path = info.data.url;  
                var a = document.createElement('A');
                a.href = file_path;
                a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        })
    },
    doFetchData: function () {
        var me = this;
        var fs = me.getFormsearch();

        var project_id = fs.down("[name=project_id]").getValue();
        var pt_id = fs.down("[name=pt_id]").getValue();

        me.getPanel().setLoading("Please wait, the system is fetching data...");
        Ext.Ajax.request({
            url: 'cashier/kartupiutangacc/create',
            timeout: 45000000,
            params: {
                hideparam: 'fetchdata',
                project_id: project_id,
                pt_id: pt_id,
                data: Ext.encode({
                    "hideparam": "fetchdata",
                    "project_id": project_id,
                    "pt_id": pt_id
                })
            },
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.getPanel().setLoading(false);
                Ext.Msg.alert("Information", info.msg);
            }
        })
    }
})