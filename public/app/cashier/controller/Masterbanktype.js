Ext.define('Cashier.controller.Masterbanktype', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.masterbanktype',
    requires: [
        'Ext.EventObject',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox'
    ],
    views: [
        'masterbanktype.Panel',
        'masterbanktype.Grid',
        'masterbanktype.FormSearch',
        'masterbanktype.FormData',
    ],
    stores: [
        'Masterbanktype',
        'Project',
        'Pt'
    ],
    models: [
        'Masterbanktype',
        'Project',
        'Pt'
    ],
    refs: [
        {
            ref: 'panel',
            selector: 'masterbanktypepanel'
        },
        {
            ref: 'grid',
            selector: 'masterbanktypegrid'
        },
        {
            ref: 'formsearch',
            selector: 'masterbanktypeformsearch'
        },
        {
            ref: 'formdata',
            selector: 'masterbanktypeformdata'
        }
    ],
    controllerName: 'masterbanktype',
    fieldName: 'banktype_id',
    bindPrefixName: 'Masterbanktype',
    formWidth: 500,
    win: null,
    winId: null,
    init: function (application) {
        var me = this;
        this.control({
            'masterbanktypepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: me.panelAfterRender
            },
            'masterbanktypegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: me.gridSelectionChange
            },
            'masterbanktypeformsearch': {
                afterrender: function() {

                    var me = this;

                    me.loadProject(me.getFormsearch());
                }
            },
            'masterbanktypeformsearch [name=project_id]': {
                change: function() {

                    var me = this;

                    me.loadPtbyProject(me.getFormsearch());
                }
            },
            'masterbanktypeformsearch [action=search]': {
                click: me.dataSearch
            },
            'masterbanktypeformsearch [action=reset]': {
                click: me.dataReset
            },
            'masterbanktypeformdata': {
                afterrender: function() {
                    
                    var me = this;
                    me.formDataAfterRender(me.getFormdata());
                    me.loadProject(me.getFormdata());
                    me.loadPtbyProject(me.getFormdata());
                }
            },
            'masterbanktypeformdata [action=save]': {
                click: me.dataSave
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
    loadPtbyProject: function(f){

        var me = this;
        projectid = f.down("[name=project_id]").getValue();
         
        if(projectid != null){
            projectid = f.down("[name=project_id]").getValue();
        }else{
            projectid = apps.project;
        }
 
        var f = f;
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

        if (fields["voucher_no"] == "") {
            Ext.Msg.alert("Alert", "Field Voucher No. must be filled.");
            return false;
        }

        if (fields["voucher_date"] == "") {
            Ext.Msg.alert("Alert", "Field Voucher Date must be filled.");
            return false;
        }

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
        }

    },
    printReport: function() {

        var me = this;
        var selected_data = me.getGrid().getSelectionModel().getSelection();
        me.winId = 'myReportWindow';
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

        me.createWindows();
        var html = me.ReportviewerV3(sendData, reportFile);
        me.win.down("#MyReportPanel").body.setHTML(html);
        $('#Reportform').submit();
        Ext.getBody().unmask();
    },
    createWindows: function (winId) {
        var me = this;
        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.win = desktop.getWindow(me.winId);
    },
    loadProject: function(f) {

        var me = this;

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
    }
})