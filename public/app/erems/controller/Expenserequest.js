Ext.define('Erems.controller.Expenserequest', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Expenserequest',
    requires: ['Erems.library.DetailtoolExReq', 'Erems.library.miniapp.App', 'Erems.library.StoreCreator',
        'Erems.library.box.Config', 'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields', 'Erems.library.box.tools.EventSelector', 'Erems.library.Browse','Erems.library.XyReport'],
    views: ['expenserequest.Panel', 'expenserequest.Grid', 'expenserequest.FormSearch', 'expenserequest.FormData', 'expenserequest.FormDataDetail'],
    controllerName: 'expenserequest',
    fieldName: 'expense_no',
    bindPrefixName: 'Expenserequest',
    storeProcess: '',
    detailTool: null,
    miniApp: null,
    formWidth: 800,
    nomMaster: 'expense',
    refs: [
        {
            ref: 'grid',
            selector: 'expenserequestgrid'
        },
        {
            ref: 'formgrid',
            selector: 'expenserequestgriddetail'
        },
        {
            ref: 'formapprovegrid',
            selector: 'expenserequestgriddetailunit'
        },
        {
            ref: 'formapprove',
            selector: 'expenserequestformdataapprove'
        },
        {
            ref: 'formsearch',
            selector: 'expenserequestformsearch'
        },
        {
            ref: 'formdata',
            selector: 'expenserequestformdata'
        },
        {
            ref: 'formdetail',
            selector: 'expenserequestformdatadetail'
        },
        {
            ref: 'panel',
            selector: 'expenserequestpanel'
        }
    ],
    browseHandler: null,
    browseHandlerMulti: {},
    localStore: {
        selectedUnit: null,
        customer: null,
        price: null,
        detail: null
    },
    tools: null,
    myConfig: null,
    cbf: null,
    mt: null,
    expenseTypeList: null,
    paymentTypeList: null,
     /* start added by sam 16-06-2017 */
    xyReport:null,
    printOutData: null,
     /* end added by sam 16-06-2017 */
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },
    init: function() {
        var me = this;

        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});

        var events = new Erems.library.box.tools.EventSelector();

        var listControl = {
            'expenserequestpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'expenserequestgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'expenserequestformsearch': {
                afterrender: this.formSearchAfterRender
            },
            'expenserequestgriddetail': {
                // afterrender: this.gridAfterRender,
                //itemdblclick: this.gridItemDblClick,
                // itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.approve_gridSelectionChange
            },
            'expenserequestgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'expenserequestgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'expenserequestgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'expenserequestgrid toolbar button[action=btnPrint]': {
                click: function(){
                    var me;
                    me = this;
                    me.printData();
                }
            },
            'expenserequestgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'expenserequestgrid actioncolumn [xele=lala]': {
                afterrender: this.gAcbAr
            },
            'expenserequestformsearch button[action=search]': {
                click: this.dataSearch
            },
            'expenserequestformsearch button[action=reset]': {
                click: this.dataReset
            },
            'expenserequestformdata': {
                afterrender: this.formDataAfterRender
            },
            'expenserequestformdata button[action=save]': {
                click: function() {
                    me.mainDataSave();
                }
            },
            'expenserequestformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'expenserequestformdataapprove button[action=save]': {
                click: function() {
                    me.approveRequest();
                }
            },
            'expenserequestformdata button[action=addNewDetail]': {
                click: function() {
                    me.showFormDetail('create');
                    //  me.detailTool.form().show('create', 500, 'Add Expense Detail');
                }
            },
            'expenserequestgriddetail actioncolumn': {
                click: this.insActionColumnClick
            },
            'expenserequestformdatadetail button[action=browse_unit]': {
                click: me.browseUnits
            },
            'expenserequestunitgrid button[action=select]': {
                click: this.unitSelect
            },
             'popupgeneralinformationgrid button[action=btnPrint]': {
                click: this.unitSelect
            },
            /// sefi
            'expenserequestformdatadetail [name=paymenttype_paymenttype_id]': {
                select: function(el, val) {
                    // me.seFi.cb('paymenttype_code', el, 'code', val);
                    //  me.isRequested(val, el);
                    me.tools.fillComboCode(el.up("form"), me.cbf.paymenttype, "paymenttype");
                }
            },
            'expenserequestformdatadetail [name=paymenttype_code]': {
                keyup: function(el) {
                    me.seFi.tf('paymenttype_id', el, {
                        name: 'code',
                        tipe: 'id'
                    }, 'paymenttype_id');
                }
            },
            'expenserequestformdata [name=department_id]': {
                select: function(el, val) {
                    me.seFi.cb('department_code', el, 'code', val);
                }
            },
            'expenserequestformdata [name=department_code]': {
                keyup: function(el) {
                    me.seFi.tf('department_id', el, {
                        name: 'code',
                        tipe: 'id'
                    }, 'department_id');
                }
            },
            /// end sefi

        };
        listControl['expenserequestformdatadetail'] = {
            afterrender: function() {
                //  me.detailTool.form().afterRender();
            }
        };

        listControl['expenserequestformdatadetail button[action=save]'] = {
            click: function() {
                ///expenserequestformdatadetail button[action=save]
                //  me.detailTool.form().save();
                me.insertToFormdata();
            }
        };
        this.control(listControl);
    },
    gridActionColumnAfterRender: function(el) {
        var me = this;
        var actitem = el.items;
        Ext.each(actitem, function(item, index) {
            if (item.iconCls === 'icon-approve' || item.iconCls === 'icon-delete' || item.iconCls === 'icon-edit') {
                item.getClass = function(v, meta, rec) {
                    if (rec.get("approved")) {
                        if (item.iconCls === 'icon-approve') {
                            return 'ux-actioncolumn icon-unapprove';
                        } else {
                            return 'ux-actioncolumn ' + item.iconCls + ' icon-disabled';
                        }
                    } else {
                        return 'ux-actioncolumn ' + item.iconCls;
                    }
                }
            } else {
                item.getClass = function(v, meta, rec) {
                    return 'ux-actioncolumn ' + item.iconCls;
                }
            }
            /* if (rec.get('approved') === true) {
             item.tooltip = 'del';
             return 'icon-delete';
             } else {
             item.tooltip = 'edit';
             return 'icon-approve';
             }*/
        });
    },
    gAcbAr: function(el) {
        console.log("lol");
    },
    panelAfterRender: function(configs) {
        this.callParent(arguments);
        var me = this;
        var p = me.getPanel();
        p.setLoading("Please wait");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.fillFormSearchComponents(data, me.getFormsearch());
                p.setLoading(false);
            }
        }).read('detail');

    },
    fillFormSearchComponents: function(data, f) {
        var me = this;
        me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox(true);
        me.tools.wesea(data.paymentmethod, f.down("[name=paymentmethod_id]")).comboBox(true);
    },
    execAction: function(el, action, me) {
        if (!action) {
            action = '';
        }
        if (!me) {
            me = this;
        }

        switch (action) {
            case me.bindPrefixName + 'Create':
                me.formDataShow(el, acts[action], action);
            case me.bindPrefixName + 'Update':
                var rec = me.getGrid().getSelectedRecord();
               // if (!rec.get("approved")) {
                    me.formDataShow(el, acts[action], action);
               // }

                break;
            case me.bindPrefixName + 'View':
                me.showFormView();
                break;
            case 'show':
                me.formDataShow(el, action);
                break;
            case me.bindPrefixName + 'Delete':
                me.dataDestroy(el);
                break;
            case me.bindPrefixName + 'Approve':
                me.showFormApprove();
                break;
            case me.bindPrefixName + 'Print':
                loadReport(el, 'tms/building/print');
                break;
        }
    },
    showFormView: function(state) {
        var s = typeof state === "undefined" ? "create" : state;
        var me = this;
        me.instantWindow('FormData', 800, 'View', s, 'myViewWindow');
        var f = me.getFormdata();
        var g = me.getGrid();
        var gd = me.getFormgrid();
        var rec = g.getSelectedRecord();
        
        f.editedRow = g.getSelectedRow();
        f.setLoading("Please wait...");
        me.tools.ajax({
            params: {
                // purchaseletter_id: plId
            },
            success: function(data, model) {
                me.fillFormComponents(data, f);
                me.expenseTypeList = data.expensetype;
                me.paymentTypeList = data.paymenttype;

                if (rec) {
                    f.loadRecord(rec);
                    var id = rec.get("expense_id");
                    f.setLoading("Loading detail information...");
                    me.tools.ajax({
                        params: {
                            expense_id: id
                        },
                        success: function(datad, modeld) {
                            me.tools.wesea({
                                data: datad,
                                model: modeld
                            }, gd).grid();

                           // console.log(rec); 
                            /// disable components
                            f.down("[name=department_department_id]").setReadOnly(true);
                            f.down("[name=expense_date]").setReadOnly(true);
                            f.down("[name=department_code]").setReadOnly(true);
                            f.down("[name=note]").setReadOnly(true);
                            f.down("button[action=save]").hide();
                           
                            f.setLoading(false);
                        }
                    }).read('expensedetail');
                }
            }
        }).read('detail');
    },
    approveRequest: function() {
        var me = this;
        var f = me.getFormapprove();
        var vs = f.getValues();
        vs["detail"] = [];
        f.setLoading("Approving..");
        var params = {
            mode_create: "approve",
            data: vs
        };

        Ext.Ajax.request({
            url: 'erems/expenserequest/create',
            success: function(response) {
                f.setLoading(false);
                var info = Ext.JSON.decode(response.responseText);
                Ext.Msg.alert('Status', info.msg);
                if (info.msg === "SUCCESS") {
                    f.up("window").close();
                }
            },
            params: {data: Ext.encode(params)}
        });
    },
    mainDataSave: function() {
        var me = this;
        me.insSave({
            form: me.getFormdata(),
            grid: me.getGrid(),
            // store: me.localStore.detail,
            finalData: function(data) {
                data["detail"] = me.tools.gridHelper(me.getFormgrid()).getJson();
                return data;
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {
                }
            }
        });
    },
    insACC: function(view, action, row) {
        var me = this;
        var grid = view.up("grid");

        switch (grid.itemId) {
            case "ExpenseRequestgriddetail":
                if (action == "destroy") {
                    me.deleteUnitFromGrid(row);
                } else if (action == "update") {
                    // me.editUnitFromGrid(row);
                    me.showFormDetail("update");
                    var f = me.getFormdetail();
                    f.editedRow = row;
                    f.loadRecord(grid.getStore().getAt(row));
                }
                break;
        }
    },
    deleteUnitFromGrid: function(row) {
        var me = this;
        var id = 0;
        var s = me.getFormgrid().getStore();
        id = me.tools.intval(s.getAt(row).get("expensedetail_id"));
        if (id > 0) {
            me.tools.gridHelper(me.getGrid()).maindetailUpdateDeletedRows(me.getFormdata(), s.getAt(row).get("expensedetail_id"));
        }
        s.removeAt(row);
        me.hitungPayment();
    },
    insertToFormdata: function() {
        var me = this;
        var f = me.getFormdata();
        var fd = me.getFormdetail();
        var g = me.getFormgrid();
        var vs = fd.getValues();
        var row = fd.editedRow;
        var message = '';
        if (me.tools.intval(vs["unit_unit_id"]) == 0){
            message = 'Unit harus diisi!';
        }else if(me.tools.intval(vs["paymenttype_paymenttype_id"]) == 0){
            message = 'Payment harus diisi!';
        }else if(me.tools.intval(vs["expensetype_expensetype_id"]) == 0){
            message = 'Expense Type harus diisi!';
        }else if(me.tools.intval(vs["amount"]) == 0){
            message = 'Amount harus diisi!';
        }

        if(message != ''){
            Ext.Msg.show({
                title: 'Warning',
                msg: message,
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK
            });
            return false;
        }

        var unitId = me.tools.intval(vs["unit_unit_id"]);
        var payTypeId = me.tools.intval(vs["paymenttype_paymenttype_id"]);
        /// check is requested?
        fd.setLoading("Validationg your request...");
        me.tools.ajax({
            params: {
                unit_id: unitId,
                paymenttype_id: payTypeId,
                purchaseletter_id:me.tools.intval(vs["purchaseletter_purchaseletter_id"])
            },
            success: function(datad, modeld) {
                if (datad['others'][0][0]['STATUS']) {
                    me.tools.alert.warning("This payment type for this unit already requested.");
                } else {

                    /// check di expense detail grid 
                    var exist = false;
                    if (g.getStore().getCount() > 0) {
                        g.getStore().each(function(reci) {
                            if (reci.get("unit_unit_id") == unitId && reci.get("paymenttype_paymenttype_id") === payTypeId) {
                                exist = true;
                            }
                        });
                    }

                    if (exist) {
                        me.tools.alert.warning("This payment type for this unit already in grid.");
                    } else {
                        vs['paymenttype_paymenttype'] = me.tools.comboHelper(fd.down("[name=paymenttype_paymenttype_id]")).getText(me.cbf.paymenttype);
                        vs['expensetype_expensetype'] = me.tools.comboHelper(fd.down("[name=expensetype_expensetype_id]")).getText(me.cbf.expensetype);
                        vs['amount'] = accounting.unformat(vs['amount']);
                        if (row > -1) {
                            var rec = g.getStore().getAt(row);
                            rec.beginEdit();
                            rec.set(vs);
                            rec.endEdit();
                        } else {
                            g.getStore().add(vs);
                        }
                        me.hitungPayment();
                        fd.up("window").close();
                    }
                }
                fd.setLoading(false);
            }
        }).read('isrequested');
    },
    hitungPayment: function() {
        var me = this;
        var s = me.getFormgrid().getStore();
        var jumlah = s.getCount();
        var f = me.getFormdata();

        var total = 0;
        for (var i = 0; i < jumlah; i++) {
            total += toFloat(s.getAt(i).get("amount"));
        }

        f.down("[name=total_amount]").setValue(total);
    },
    unitSelect: function() {
        var me = this;
        if (me.browseHandler) {
            me.browseHandler.selectItem(function(rec) {
                var f = me.getFormdata();
             //   console.log(rec);
                me.getFormdetail().down("[name=unit_unit_id]").setValue(rec.get("unit_id"));
                me.getFormdetail().down("[name=purchaseletter_purchaseletter_id]").setValue(rec.get("purchaseletter_purchaseletter_id"));
            });
        }
    },
    browseUnits: function(el) {
        var me = this;
        var browse = new Erems.library.Browse();
        browse.init({
            controller: me,
            view: 'UnitGrid',
            el: el,
            localStore: "selectedUnit",
            mode_read: "selectedunit",
            specialPrefix: 'unit'
        });
        browse.showWindow();
    },
    fdar: function() {
        var me = this;
        var f = me.getFormdata();
        var gd = me.getFormgrid();
        var g = me.getGrid();
        var x = {
            init: function() {
                me.setActiveForm(f);
                gd.doInit();
            },
            create: function() {
                f.setLoading("Please wait...");
                me.tools.ajax({
                    params: {
                        // purchaseletter_id: plId
                    },
                    success: function(data, model) {
                        me.fillFormComponents(data, f);
                        me.expenseTypeList = data.expensetype;
                        me.paymentTypeList = data.paymenttype;

                        me.tools.ajax({
                            params: {
                                // purchaseletter_id: plId
                            },
                            success: function(datad, modeld) {
                                me.tools.wesea({
                                    data: datad,
                                    model: modeld
                                }, gd).grid();
                                f.setLoading(false);
                            }
                        }).read('expensedetail');
                    }
                }).read('detail');
            },
            update: function() {
                var rec = g.getSelectedRecord();
                // console.log(rec);
                f.editedRow = g.getSelectedRow();
                f.setLoading("Please wait...");
                me.tools.ajax({
                    params: {
                        // purchaseletter_id: plId
                    },
                    success: function(data, model) {
                        me.fillFormComponents(data, f);
                        me.expenseTypeList = data.expensetype;
                        me.paymentTypeList = data.paymenttype;
                        me.tools.wesea(data.paymentmethod, f.down("[name=paymentmethod_paymentmethod_id]")).comboBox();
                        
                        if (rec) {
                            f.loadRecord(rec);
                            f.down("[name=paymentmethod_paymentmethod_id]").setValue(rec.data.paymentmethod_id);
                            f.down("[name=voucher_no]").setValue(rec.data.voucher_no);
                            f.down("[name=reference_no]").setValue(rec.data.reference_no);
                            
                            var id = rec.get("expense_id");
                            f.setLoading("Loading detail information...");
                            me.tools.ajax({
                                params: {
                                    expense_id: id
                                },
                                success: function(datad, modeld) {

                                    me.tools.wesea({
                                        data: datad,
                                        model: modeld
                                    }, gd).grid();
                                    f.setLoading(false);
                                }
                            }).read('expensedetail');
                        }
                    }
                }).read('detail');
            }
        };
        return x;
    },
    fillFormComponents: function(data, form) {
        var me = this;
        me.tools.wesea(data.department, form.down("[name=department_department_id]")).comboBox();
        me.tools.wesea(data.paymentmethod, form.down("[name=paymentmethod_paymentmethod_id]")).comboBox();
    },
    unApproveRecord: function(rec) {
        var me = this;
        var p = me.getPanel();
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: {
                expense_id: rec.get("expense_id")
            },
            success: function(datad, modeld) {

                var hasil = datad['others'][0][0]['STATUS'];
                p.setLoading(false);
                if(hasil){
                    me.tools.alert.info("Unapproved");
                    me.getGrid().getStore().loadPage(1);
                }else{
                    me.tools.alert.warning("Error");
                }
            }
        }).read('unapprove');
    },
    showFormApprove: function(state) {
        var s = typeof state === "undefined" ? "create" : state;
        var me = this;
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        if (rec.get("approved")) {
            me.unApproveRecord(rec);
            return;
        }
        me.instantWindow('FormDataApprove', 800, 'Approve', s, 'myApproveWindow');
        var f = me.getFormapprove();
        var gb = me.getFormgrid();
        
        f.loadRecord(rec);
        
        /// load component
        //
        f.setLoading("Loading components...");
        me.tools.ajax({
            params: {},
            success: function(dataad, modelad) {

                me.tools.wesea(dataad.paymentmethod, f.down("[name=paymentmethod_paymentmethod_id]")).comboBox();
                f.down("[name=paymentmethod_paymentmethod_id]").setValue(rec.get("paymentmethod_id"));
                if (!rec.get("approve_date")) {
                    f.down("[name=approve_date]").setValue(new Date());
                }
                if (!rec.get("voucher_date")) {
                    f.down("[name=voucher_date]").setValue(new Date());
                }
                f.editedRow = g.getSelectedRow();

                /// fdar
                //expensedetail
                f.setLoading("Please wait..");
                me.tools.ajax({
                    params: {
                        expense_id: rec.get("expense_id")
                    },
                    success: function(datad, modeld) {
                        me.tools.wesea({
                            data: datad,
                            model: modeld
                        }, gb).grid();
                        f.setLoading(false);
                    }
                }).read('expensedetail');
            }
        }).read('detailapprove');
    },
    approve_gridSelectionChange: function() {
        var me = this;
        var f = me.getFormapprove();

        var g = me.getFormapprovegrid();
        var gb = me.getFormgrid();
        var rec = gb.getSelectedRecord();
        if (rec) {
            f.setLoading("Please wait..");
            me.tools.ajax({
                params: {
                    unit_id: rec.get("unit_unit_id")
                },
                success: function(datad, modeld) {

                    me.tools.wesea({
                        data: datad,
                        model: modeld
                    }, g).grid();
                    f.setLoading(false);
                }
            }).read('detailbyunit');
        }
    },
    showFormDetail: function(state) {
        var s = typeof state === "undefined" ? "create" : state;
        var me = this;
        me.instantWindow('FormDataDetail', 500, 'Add Detail', s, 'myWindow');
        var f = me.getFormdetail();
        f.editedRow = -1;
        me.tools.wesea(me.paymentTypeList, f.down("[name=paymenttype_paymenttype_id]")).comboBox();
        me.tools.wesea(me.expenseTypeList, f.down("[name=expensetype_expensetype_id]")).comboBox();
    },
    dataDestroy: function() {
        var me = this;
        var rows = me.getGrid().getSelectionModel().getSelection();

        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var rec = me.getGrid().getSelectedRecord();
            if (!rec) {
                return;
            }
            // check approve
            if (rec.get("approved")) {
                return;
            }

            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGrid().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
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

                    store.on('beforesync', msg);
                    store.sync({
                        success: function(s) {
                            me.getGrid().up('window').unmask();
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
                        failure: function() {
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg + ' The data may have been used.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
    /* start added by sam 16-06-2017 */
     gridSelectionChange: function() {
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1);
        grid.down('#btnDelete').setDisabled(row.length < 1);
        grid.down('#btnPrint').setDisabled(row.length < 1);
        if(row.length > 1){
            grid.down('#btnPrint').setDisabled(true);
        }
    },
     xyReportProcessParams: function(reportData) {
        var me = this;          
        reportData['file'] = 'ExpenseRequest';
        reportData.params = me.printOutData;        
        return reportData;
    },
    //    add by semy 6/16/17
    printData:function(){
        var me,panel,store,grid,record;
        me = this;
        var me = this;
        if (!me.xyReport) {
            me.xyReport = new Erems.library.XyReport();
            me.xyReport.init(me);
        }
        
        function toRp(angka){
            var rev     = parseInt(angka, 10).toString().split('').reverse().join('');
            var rev2    = '';
            for(var i = 0; i < rev.length; i++){
                rev2  += rev[i];
                if((i + 1) % 3 === 0 && i !== (rev.length - 1)){
                    rev2 += '.';
                }
            }
            return  rev2.split('').reverse().join('');
        }

        panel = me.getPanel();        
        panel.setLoading("Please wait...");
        
        grid = me.getGrid();
        store = grid.getStore();
        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0])); 
        me.printOutData = record.data;
        //console.log(me.printOutData);
        me.printOutData['department_id'] =  me.printOutData.department_department_id;
        me.printOutData['department'] =  me.printOutData.department_department;
        me.printOutData['userprint'] =  me.printOutData.user_user_fullname;        
        me.printOutData['iddata'] =  me.printOutData.expense_id;   
        me.printOutData['total_amount'] =  toRp(me.printOutData.total_amount);   
        
        me.xyReport.processReportjs();
        panel.setLoading(false);            
         
    }
    /* end added by sam 16-06-2017 */
});