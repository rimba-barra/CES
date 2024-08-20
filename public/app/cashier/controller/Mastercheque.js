Ext.define('Cashier.controller.Mastercheque', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Mastercheque',
    views: ['mastercheque.DetailChequeGrid', 'mastercheque.ChequeHistory'],
    requires: [
        'Cashier.view.mastercheque.DetailChequeGrid',
        'Cashier.view.mastercheque.MasterchequeoutGrid',
        'Cashier.view.mastercheque.ChequeHistory',
        'Cashier.library.XyReportB',
         'Cashier.library.template.combobox.Vendorcombobox',
    ],
    stores: [
        'Vendorcombo'
        ],
    refs: [
        {
            ref: 'panel',
            selector: 'masterchequepanel'
        },
        {
            ref: 'grid',
            selector: 'masterchequegrid'
        },
        {
            ref: 'formdata',
            selector: 'masterchequeformdata'
        },
        {
            ref: 'formsearch',
            selector: 'masterchequeformsearch'
        },
        {
            ref: 'formdetail',
            selector: 'chequeformdetail'
        },
        {
            ref: 'detailgrid',
            selector: 'detailchequegrid'
        },
        {
            ref: 'outgrid',
            selector: 'masterchequeoutgrid'
        },
        {
            ref: 'formdataout',
            selector: 'masterchequeformdataout'
        },
        {
            ref: 'formdatabook',
            selector: 'masterchequeformdatabook'
        },
        {
            ref: 'chequehistorygrid',
            selector: 'chequehistorygrid'
        },
        {
            ref: 'formtanggal',
            selector: 'masterchequeformtanggaldata'
        },
        {
            ref: 'formissued',
            selector: 'masterchequeformissueddata'
        },
    ],
    controllerName: 'mastercheque',
    fieldName: 'cheque_no',
    bindPrefixName: 'Mastercheque',
    formxWinId: 'win-masterchequewinId',
    cheque_id: 0,
    ptId: 0,
    grid: null,
    is_chequeout: 0,
    formdatatype: 'in',
    vendorname: '',
    vendor_id: 0,
    iwField: {
        title: 'Cheque Payment List'
    },
    xyReport: null,
    reportFileName: null,
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });
    },
    init: function () {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
        this.control({
            
            'masterchequeformsearch [name=project_id]': {
                select: function (v) {
                    var f = me.getFormsearch();
                    if (v.value) {
                        me.project_id = v.value;
                        var pt = f.down("[name=pt_id]").getStore();
                        pt.clearFilter();
                        // pt.filter('project_project_id', v.value, true, false);
                        pt.filterBy(function (rec, id) {
                            return rec.data.project_project_id == v.value;
                        });

                        if(v.value==apps.project){
                            f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                        }else{
                            f.down("[name=pt_id]").setValue('');
                        }
                    }
                }
            },
            'masterchequeformsearch [name=pt_id]': {
                change: function (el) {
                    var value = el.value;
                    var g = me.getGrid();
//                    me.setprojectpt(el.name, el.ownerCt, 'project_id');
                    me.pt_id = value;
                    if (me.pt_id && me.project_id) {
                        g.down('[action=create]').setDisabled(false);
                    }
                    if (me.is_chequeout) {
                        var f = me.getFormsearch();
                        var pt = f.down('[name=pt_id]').getValue();
                        me.getCustomRequestComboboxv2('bank_cheque_out', value,f.down("[name=project_id]").getValue(), '', 'voucherprefix_voucherprefix_id', 'voucherprefix', 'coa', f, '', function () {
                            f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
                        });
                    }


                }
            },
            'masterchequeformsearch [name=voucherprefix_voucherprefix_id]': {
                change: function (el) {
                    var f = me.getFormsearch();
                    if (me.is_chequeout) {
                        var g = me.getOutgrid();
                        var store = g.getStore();
                        if (el.value === null) {
                            f.down('[name=voucherprefix_voucherprefix_id]').setValue('0');
                            store.getProxy().setExtraParam('voucherprefix_voucherprefix_id', '0');
                        }
//                        store.getProxy().setExtraParam('voucherprefix_voucherprefix_id', '');
                    }


                }
            },
            'masterchequepanel [name=panel]': {
                tabchange: function (tabPanel, tab) {
                    var f = me.getFormsearch();
                    me.grid = me.getGrid();
                    if (tab.name === "masterchequeoutgrid") {
                        me.is_chequeout = 1;
                        me.grid = me.getOutgrid();
                        var pt = f.down('[name=pt_id]').getValue();
                        me.loadModelChequeOut(function () {
                            me.grid.setLoading('Please wait');
                            var storear = me.grid.getStore();
                            var fields = f.getForm().getFieldValues();
                            for (var x in fields) {
                                storear.getProxy().setExtraParam(x, fields[x]);
                            }
                            storear.load({
                                callback: function () {
                                    me.grid.setLoading(false);
                                }
                            });
                        });
                        f.down('[name=voucherprefix_voucherprefix_id]').setVisible(true);
                        f.down('[name=bank_name]').setVisible(false);
                        //getCustomRequestComboboxv2: function (paramname, val, val2, val3, field, model, submodel, form, param, callback, loading) {
                        me.getCustomRequestComboboxv2('bank_cheque_out', pt, f.down("[name=project_id]").getValue(), '', 'voucherprefix_voucherprefix_id', 'voucherprefix', 'coa', f, '', function () {
                            f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
                        });

                        me.formdatatype = 'out';
                    } else {
                        me.grid = me.getGrid();
                        me.is_chequeout = 0;
                        var pt = f.down('[name=pt_id]').getValue();
                        me.loadModelChequeIn(function () {
                            me.grid.setLoading('Please wait');
                            var storear = me.grid.getStore();
                            var fields = f.getForm().getFieldValues();
                            for (var x in fields) {
                                storear.getProxy().setExtraParam(x, fields[x]);
                            }
                            storear.load({
                                callback: function () {
                                    me.grid.setLoading(false);
                                }
                            });
                        });
                        f.down('[name=voucherprefix_voucherprefix_id]').setVisible(false);
                        f.down('[name=bank_name]').setVisible(true);

                        me.getCustomRequestComboboxv2('bank_cheque_out', pt, f.down("[name=project_id]").getValue(), '', 'voucherprefix_voucherprefix_id', 'voucherprefix', 'coa', f, '', function () {
                            f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
                        });

                        me.formdatatype = 'in';
                    }
                },
            },
            'masterchequegrid toolbar button[action=generate]': {
                click: function (el, act) {
                    var state = 'generate';
                    me.generateCoa();
                }
            },
            'masterchequegrid,masterchequeoutgrid toolbar button[action=detailcheque]': {
                click: function (el, act) {
                    me.formdetail();
                }
            },
            'masterchequegrid  ': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.formdetail,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
            },
            ' masterchequeoutgrid ': {
                itemdblclick: this.formdetail,
                selectionchange: me.gridSelectionChangeOut,
                itemcontextmenu: me.gridItemContextMenuOut,
            },
            // test
        //     'masterchequegrid' :{
        //         afterrender: function(){
        //             this.formdatatype = 'in';
        //         }
        //     },
        //    'masterchequeoutgrid' :{
        //         afterrender: function(){
        //             this.formdatatype = 'out';
        //         }
        //     },
           
             'masterchequeformdataout': {
                afterrender: function (v) {
                    var state = v.up('window').state;
                    me.fdarout(state);
                }
            },
            'masterchequeoutgrid toolbar button[action=addbook]': {
                click: function (el) {
                    me.formdatabookshow();
                }
            },
            'masterchequeoutgrid toolbar button[action=void]': {
                click: function (el) {
                    me.voidCheque();
                }
            },
            'masterchequeoutgrid toolbar button[action=create]': {
                click: function (el) {
                    me.formdatashow('create');
                }
            },
            'masterchequeoutgrid toolbar button[action=update]': {
                click: function (el) {
                    me.formdatashow('update');
                }
            },
            'masterchequeoutgrid toolbar button[action=destroy]': {
                click: function (el) {
                    me.destroyout();
                }
            },
            'masterchequeformdataout [name=project_project_id]': {
                change: function (v) {
                    var f = me.getFormdataout();
                    if (v.value) {
                        me.project_id = v.value;
                        var pt = f.down("[name=pt_pt_id]").getStore();
                        pt.clearFilter();
                        pt.filter('project_project_id', v.value, true, false);
                    }
                }
            },
            'masterchequeformdataout [name=pt_pt_id]': {
                change: function (v) {
                    var f = me.getFormdataout();
                    if (v.value) {
                        me.pt_id = v.value;
//                        me.setprojectpt(v.name, v.ownerCt, 'project_project_id');
                        var f = me.getFormdataout();
//                        me.getCustomRequestCombobox('bank_cheque_out', v.value, 'voucherprefix_voucherprefix_id', 'voucherprefix', 'coa', f, '', function () {
//                            f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
//                        });
                        me.getCustomRequestComboboxv2('bank_cheque_out', v.value, f.down("[name=project_project_id]").getValue(), '', 'voucherprefix_voucherprefix_id', 'voucherprefix', 'coa', f, '', function () {
                            f.down('[name=voucherprefix_voucherprefix_id]').setValue('');

                        });

                    }
                }
            },
            'masterchequeformdataout button[action=save]': {
                click: function (v) {
                    me.dataSaveOut();
                }
            },
            'masterchequeformdatabook': {
                afterrender: function (v) {
                    var state = v.up('window').state;
                    me.fdarbook(me, 'create');
                }
            },
            'masterchequeformdatabook [name=pt_pt_id]': {
                change: function (v) {
                    if (v.value) {
                        me.pt_id = v.value;
//                        me.setprojectpt(v.name, v.ownerCt, 'project_project_id');
                        var f = me.getFormdatabook();
                        me.getCustomRequestComboboxv2('bank_cheque_out', v.value, f.down("[name=project_project_id]").getValue(), '', 'voucherprefix_voucherprefix_id', 'voucherprefix', 'coa', f, '', function () {
                            f.down('[name=voucherprefix_voucherprefix_id]').setValue('');

                        });
                    }
                }
            },
            'masterchequeformdatabook button[action=save]': {
                click: function (v) {
                    me.dataSaveBook();
                }
            },
//            'masterchequeformsearch [name=pt_pt_id]': {
//                change: function (el) {
//                    var value = el.value;
//                    me.ptChange(value);
//                }
//            },
            'detailchequegrid': {
                selectionchange: me.gridSelectionDetail,
            },
            'chequeformdetail': {
                afterrender: function (v) {
                    var state = v.up('window').state;
                    me.fdardatadetail(me, state);
                },
                 onClose: function(me) {
			     	alert('aaa');
        		}

            },
            'chequeformdetail button[action=checkvoucher]': {
                click: function (v) {
                    me.checkvoucher();
                }
            },
            'chequeformdetail button[action=changedate]': {
                click: function (v) {
                    me.formdatashowtanggal();
                }
            },
            'chequeformdetail button[action=destroy]': {
                click: function (v) {
                    me.destroydetail();
                }
            },
            'chequeformdetail button[action=print]': {
                click: this.mainPrint
            },
            'chequeformdetail [name=vid]': {
                blur: function (v) {
//                    if (v.value) {
//                        v.setValue(me.leadingZero(v.value, 7));
//                    }
                }
            },
             'chequeformdetail button[action=cancel]': {
                click: function (v) {
                    me.checkTotalAmount();
                }
            },
            'masterchequeformtanggaldata button[action=save]': {
                click: function (v) {
                    me.saveDetailCheque();
                }
            },
            'masterchequeformissueddata button[action=save]': {
                click: function (v) {
                    me.saveChangeIssuedDate();
                }
            },
            'masterchequeformissueddata': {
                afterrender: function (v) {
                    var state = v.up('window').state;
                    me.fdardataissued(me, state);
                }
            },
            'masterchequeoutgrid toolbar button[action=canceled]': {
                click: function (el) {
                    me.canceledCheque();
                }
            },
            'masterchequegrid toolbar button[action=canceled]': {
                click: function (el) {
                    me.canceledinCheque();
                }
            },
            'masterchequeformsearch ': {
                afterrender: function (el) {
                    var f = me.getFormsearch();
                    if (me.pt_id == 0) {
                        me.pt_id = parseInt(apps.pt);
                    }

                    if (me.project_id == 0) {
                        me.project_id = parseInt(apps.project);
                    }

                    console.log("INI");
                    console.log(me.pt_id);
                    console.log(me.project_id);
                    
                    if (me.is_chequeout) {
                        var f = me.getFormsearch();
                        me.getCustomRequestComboboxv2('bank_cheque_out', me.pt_id,me.project_id, '', 'voucherprefix_voucherprefix_id', 'voucherprefix', 'coa', f, '', function () {
                            f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
                        });
                    }else{
                        
                    }
                },
                boxready: function (panel) {
                    $("#masterchequeformsearchID").keyup(function (e) {
                        if (e.which == 13) {
                            e.preventDefault();
                            me.dataSearch();
                            return false;
                        }
                    });
                },
            },
            
        });
    },
    mainPanelBeforeRender: function (el) {
        var me = this;
        me.is_chequeout = 1;
        setupObject(el, me.execAction, me);
    },
//    fdar: function () {
//        var me = this;
//        var f = me.getFormdata();
//        var g = me.grid;
//        me.setActiveForm(f);
//        var x = {
//            init: function () {
//                me.fdarInit();
//            },
//            //getCustomRequestCombobox: function (paramname, val, field, model, submodel, form, param, callback) {
//
//            //getCustomRequestCombobox: function (paramname, val, field, model, submodel, form, param, callback) {
//            create: function () {
//                me.unMask(1);
//                me.getCustomRequestCombobox('bank', '', 'bank_bank_id', 'bank', '', f, '', function () {
//                    // me.getCustomRequestCombobox('detailpt', '', 'pt_pt_id', 'pt', '', f, '');
//                });
//            },
//            update: function () {
//                // me.getCustomRequestCombobox('detailpt', '', 'pt_pt_id', 'pt', '', f, '');
//                me.getCustomRequestCombobox('bank', '', 'bank_bank_id', 'bank', '', f, 'update', function () {
//
//                });
//            }
//        };
//        return x;
//    },
    formDataAfterRender: function (el) {
        var me = this;
        if(me.formdatatype == 'in'){
        var f = me.getFormdata();
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        var state = el.up('window').state;
        me.fdar().init();
        if (state == 'create') {
            me.fdar().create();
            me.setActiveForm(f);
            me.getCustomRequestCombobox('bank', '', 'bank_bank_id', 'bank', '', f, '', function () {
              f.down('[name=project_project_id]').setValue(me.project_id);
               f.down('[name=pt_pt_id]').setValue(me.pt_id);
           });
        } else if (state == 'update') {
            me.setActiveForm(f);
            f.editedRow = rec;
            f.getForm().loadRecord(rec);


            me.getCustomRequestCombobox('bank', '', 'bank_bank_id', 'bank', '', f, 'update', function () {

          });
        }

    }else if (me.formdatatype == 'out'){
        var stateout = el.up('window').state;
        me.fdarout(stateout);
        me.getFormdata().up('window').close();
      
    } 


    },
    
    panelAfterRender: function () {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormsearch();


        p.setLoading("Please wait");
        me.tools.ajax({
            params: {module: me.controllerName},
            form: p,
            success: function (data, model) {
                p.down("[name=panel]").setActiveTab(1);
                try {

                    me.tools.weseav2(data.project, f.down("[name=project_id]")).comboBox('', function () {
                        f.down("[name=project_id]").setValue(parseInt(apps.project));
                    });
                    me.tools.weseav2(data.pt, f.down("[name=pt_id]")).comboBox('', function () {
                        var combostore = f.down('[name=pt_id]').getStore();
                        var record = combostore.findRecord('pt_id', parseInt(apps.pt),0,false,true,true);
                        if (record) {
                            combostore.filter('project_project_id', apps.project, true, false);
                            f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                            var grid = me.getOutgrid();
                            var storear = grid.getStore();
                            var fields = f.getForm().getFieldValues();
                            for (var x in fields) {
                                storear.getProxy().setExtraParam(x, fields[x]);
                            }
                            storear.loadPage(1);
                        }
                    });
                    
                    me.tools.weseav2(data.bank, f.down("[name=bank_name]")).comboBox();

                    me.reportFileName = data.FILE_REPORT;
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");
                }

                p.setLoading(false);
            }
        }).read('detail');
    },
//    ptChange: function (val) {
//        var me = this;
//        var f = me.getFormsearch();
//        f.down("[name=pt_id]").setValue(val);
//        me.ptId = val;
//    },
//    mainDataSave: function (mode) {
//        var me = this;
//        var m = typeof mode !== "undefined" ? mode : "";
//        var fa = me.getFormdata();
//        me.tools.iNeedYou(me).save(false, function (data)
//        {
//            data.deletedRows = fa.deletedRows;
//            return data;
//        }
//        );
//    },
    mainDataSave: function (mode) {
        var me = this;
        var m = typeof mode !== "undefined" ? mode : "";
        var fa = me.getFormdata();
        var gd = me.getDetailgrid();
        if (fa.getForm().isValid()) {
            me.insSave({
                form: fa,
                grid: me.getGrid(),
                finalData: function (data) {
                    data['deletedRows'] = fa.deletedRows;
                    return data;
                },
                sync: true,
                callback: function (a, b, c) {
                },
                cb: function () { //ini baru jaalan callbacknya, di atas gajalan
                    if (typeof call === "function") {
                        call();
                    }
                }
            });
        }
    },
    afterDataDetailInit: function (param, f) { //after
        var me = this;
        var fid = f.ownerCt.id;
        var g = me.getGrid();
        if (fid == "win-masterchequewinId") {
            if (param == "update") {
                //me.getPt(f, 'pt_pt_id');
                var rec = g.getSelectedRecord();
                f.editedRow = g.getSelectedRow();
                f.getForm().loadRecord(rec);
                // f.down('[name=voucherprefix_voucherprefix_id]').setValue(rec.get('voucherprefix_voucherprefix_id'));
            }
        }
    },
    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid();
        var row = grid.getSelectionModel().getSelection();
        var edit = grid.down('#btnEdit');
        var deleted = grid.down('#btnDelete');
        var detail = grid.down('#btnDetailCheque');
        if (row.length != 1) {
            edit.setDisabled(true);
            detail.setDisabled(true);
            deleted.setDisabled(true);
        }else{
            if (edit !== null) {
                edit.setDisabled(row.length != 1);
            }
            if (detail !== null) {
                detail.setDisabled(row.length != 1);
            }
            if (deleted !== null) {
                deleted.setDisabled(row.length < 1);
            }
        }

    },
    gridSelectionChangeOut: function () {
        var me = this;
        var grid = me.getOutgrid();
        var row = grid.getSelectionModel().getSelection();
        var edit = grid.down('#btnEdit');
        var deleted = grid.down('#btnDelete');
        var detail = grid.down('#btnDetailCheque');
        if (row.length != 1) {
            edit.setDisabled(true);
            detail.setDisabled(true);
            deleted.setDisabled(true);
        }else{
            if (edit !== null) {
                edit.setDisabled(row.length != 1);
                edit.setDisabled(row[0].data.status != 'New');
            }
            if (detail !== null) {
                detail.setDisabled(row.length != 1);
            }
            if (deleted !== null) {
                deleted.setDisabled(row.length < 1);
            }
        }

    },
    gridSelectionDetail: function () {
        var me = this;
        var f = me.getFormdetail();
        var grid = me.getDetailgrid();
        var row = grid.getSelectionModel().getSelection();
        var deleted = f.down('#btnDelete');
        if (deleted !== null) {
            deleted.setDisabled(row.length < 1);
        }
    },
    formdetail: function () {
        var me = this;
        var w = me.instantWindow('FormDetail', 900, 'Detail Cheque', '', 'win-chequedetail');
    },
    formdatashowtanggal: function () {
        var me = this;
        var w = me.instantWindow('FormIssued', 400, 'Change Issued Date', '', 'win-chequedetaidasdsadsal');
    },
    newActionColumnClick: function () {
        var me = this;
    },

   

    fdardatadetail: function () {
        var me = this;
        var fd = me.getFormdetail();
        var store = me.getStore('Vendorcombo');

        var dom = Ext.dom.Query.select('.x-tool-close');
        var dlength = dom.length;
		var el = Ext.get(dom[dlength-1]); 
		el.setVisible(false);


        if(me.vendor_id>0){
            var vendorname = me.vendorname;
        }else{
            var vendorname = '';
        }
        store.load({
            params: {
                "query": vendorname,
                "hideparam": 'getvendor',
                "project_id": apps.project,
                "pt_id": apps.pt,
            },
            callback: function (records, operation, success) {
            }
        });

        fd.down("[name=recipient]").on('keyup' , function(e, t, eOpts){
          store.proxy.extraParams = {
                "hideparam": 'getvendor',
                "project_id": apps.project,
                "pt_id": apps.pt,
            }
        });
        me.setActiveForm(fd);
        var cmpformdata = Ext.getCmp('win-chequedetail');
        if (me.is_chequeout == "0") {
            var grid = me.getGrid();
            fd.down("[action=checkvoucher]").setVisible(false);
            fd.down("[action=destroy]").setVisible(false);
            fd.down("[name=vid]").setVisible(false);
            fd.down("[action=changedate]").setVisible(false);
        } else {
            var grid = me.getOutgrid();
        }
        var rec = grid.getSelectedRecord();
        Ext.Ajax.request({
            url: 'cashier/common/read',
            method: 'POST',
            timeout:100000000,  
            params: {
                hideparam :'getaccessaction',
                term: 'MasterchequeDestroydetail',
                start: 0,
                limit: 1000,
            },
            success: function (response) {
                response = Ext.JSON.decode(response.responseText);
                var isactive = response.data[0].active;
                if(isactive==0){
                    //f.down("button[action=saveprint]").setVisible(false);
                    fd.down("[action=destroy]").setVisible(false);
                    //f.down("button[action=save]").setVisible(false);
                }
            },
            failure: function (response) {
                
            }
        });
        fd.loadRecord(rec);
       fd.down("[name=amount]").setValue(accounting.formatMoney(rec.get("amount")));
       
        me.cheque_id = rec.get("cheque_id");
        var a = fd.down("[name=issued_date]").getValue();
        var a = moment(a).format("DD-MM-YYYY");
        if (a == "01-01-1900" || !a) {
            fd.down("[name=issued_date]").setValue('');
        }
        if(rec.get('status') === "Void" || rec.get('status') === "Canceled") { 
            fd.down("[action=checkvoucher]").setDisabled(true);
            fd.down("[action=changedate]").setDisabled(true);
        }

        setTimeout(function () {
            //me.loadModelDetail(cheque, function() {
            me.loadModelHistory(function () {
                var tet = Ext.getCmp('fsetTADA');
                tet.setExpanded(false);
                me.loadModelDetail(function () {



                });
            });
            // });
        }, 200);
    },
    fdardataissued: function () {
        var me = this;
        var fd = me.getFormdetail();
        var f = me.getFormissued();
        var a = fd.down("[name=issued_date]").getValue();
        var cheque_id = fd.down("[name=cheque_id]").getValue();
        f.down("[name=issued_date]").setValue(a);
        f.down("[name=cheque_id]").setValue(cheque_id);
    },
    checkvoucher: function () {
        var me = this;
        var fd = me.getFormdetail();
        var ft = me.getFormtanggal();
        var vid = fd.down("[name=vid]").getValue();
        var dataflow = fd.down("[name=cheque_type]").getValue();
        var description = fd.down("[name=description]").getValue();
        var recipient = fd.down("[name=recipient]").getValue();

        fd.setLoading("Validating cheque status...");
        me.tools.ajax({
            params: {
                module: me.controllerName, 
                cheque_id:  fd.down("[name=cheque_id]").getValue(),
                hideparam: 'deletevoucherchequeoutvalidationbychequestatus'
            },
            success: function (data, model) {

                fd.setLoading(false);
                if (data.success == 'failed') {
                    me.tools.alert.error(data.msg);
                    return false;
                } else {

                    if (vid) {
                        fd.setLoading("Please wait");
                        me.tools.ajax({
                            params: {
                                module: me.controllerName,
                                voucherID: vid,
                                cheque_id: me.cheque_id,
                                dataflow: dataflow == "OUT" ? 'O' : 'I'
                            },
                            success: function (data, model) {
                                try {
                                    var arr = [];
                                    if (data) {
                                        var datad = data.hasil[0][0].kasbank_id;
                                        var jml = data.hasil[0][0].jml;
                                        var vid = data.hasil[0][0].vid;
                                        var kdataflow = data.hasil[0][0].dataflow == 'O' ? "OUT" : "IN";
                                         if(dataflow != kdataflow){
                                                Ext.Msg.confirm('Confirmation', "Voucher Dataflow is Different from Cheque.<br/> Are You Sure Want to Process?", function (btn) {
                                                if (btn == 'yes') {
                                                   if (jml < 1) {
                                                            me.showTanggalDetail(datad, dataflow, vid);
                                                        } else {
            
                                                           
                                                            var dates = new Date();
                                                            var now = moment(dates).format("YYYY-MM-DD");
                                                            arr.push({
                                                                cheque_cheque_id: me.cheque_id,
                                                                kasbank_kasbank_id: datad,
                                                                kasbank_dataflow: dataflow == "OUT" ? 'O' : 'I',
                                                                cheque_cheque_type: dataflow,
                                                                cheque_issued_date: now,
                                                                cheque_description: description,
                                                                cheque_recipient: recipient
                                                            });
                                                            me.saveDetailChequeDirect(arr);
                                                        }
                                                }else{
            
                                                    fd.setLoading(false); 
                                                }
                                                });
                                            }else{
                                               if (jml < 1) {
                                                    me.showTanggalDetail(datad, dataflow, vid);
                                                } else {
                                                   
                                                    var dates = new Date();
                                                    var now = moment(dates).format("YYYY-MM-DD");
                                                    arr.push({
                                                        cheque_cheque_id: me.cheque_id,
                                                        kasbank_kasbank_id: datad,
                                                        kasbank_dataflow: dataflow == "OUT" ? 'O' : 'I',
                                                        cheque_cheque_type: dataflow,
                                                        cheque_issued_date: now,
                                                        cheque_description: description,
                                                        cheque_recipient: recipient
                                                    });
                                                    me.saveDetailChequeDirect(arr);
                                                }
                                            }
                                            
                                           
                                        
                                    }
                                } catch (err) {
                                    console.log(err.message);
                                    me.tools.alert.warning("Voucher ID already used or invalid.");
                                }
                                fd.setLoading(false);
                            }
                        }).read('checkvoucher');
                    } else {
                        me.tools.alert.warning("Please input voucher ID.");
                    }

                }
            }
        }).read('deletevouchervalidationbychequestatus');
        //me.tools.alert.warning("Failed.");
    },
    loadModelDetail: function (callbackFunc) {
        var me = this;
        var fd = me.getFormdetail();
        var gridetail = me.getDetailgrid();
        gridetail.getStore().clearFilter(true);
        gridetail.doInit();
        gridetail.getStore().load({
            params: {
                cheque_id: me.cheque_id
            },
            callback: function (rec, op) {
                if (op) {
                    gridetail.attachModel(op);
                } else {
                    console.log('error attach model detail cheque');
                }
                if (typeof callbackFunc === "function") {
                    callbackFunc();
                }
            }
        });
    },
    getDetailCheque: function (cb) {
        var me = this;
        var f = me.getFormdetail();
        var g = me.getDetailgrid();
        f.setLoading("Loading detail cheque");
        g.getStore().load({
            params: {
                cheque_id: me.cheque_id
            },
            callback: function (rec, op) {
                f.setLoading(false);
                g.attachModel(op);
                if (typeof cb === "function") {
                    cb();
                }
            }
        });
    },
    loadModelHistory: function (callbackFunc) {
        var me = this;
        var fd = me.getFormdetail();
        var gridhistory = me.getChequehistorygrid();
        gridhistory.getStore().clearFilter(true);
        gridhistory.doInit();
        gridhistory.getStore().load({
            params: {
                cheque_id: me.cheque_id
            },
            callback: function (rec, op) {
                if (op) {
                    gridhistory.attachModel(op);
                } else {
                    console.log('error attach model history cheque');
                }
                if (typeof callbackFunc === "function") {
                    callbackFunc();
                }
            }
        });
    },
    loadModelChequeOut: function (callback) {
        var me = this;
        var grid = me.grid;
        grid.getStore().clearFilter(true);
        grid.doInit();
        grid.getStore().load({
            params: {
            },
            callback: function (rec, op) {
                if (op) {
                    grid.attachModel(op);
                    if (typeof callback === "function") {
                        callback();
                    }
                } else {
                    console.log('error attach model grid cheque out');
                }
            }
        });
    },
    loadModelChequeIn: function (callback) {
        var me = this;
        var grid = me.grid;
        grid.getStore().clearFilter(true);
        grid.doInit();
        grid.getStore().load({
            params: {
            },
            callback: function (rec, op) {
                if (op) {
                    grid.attachModel(op);
                    if (typeof callback === "function") {
                        callback();
                    }
                } else {
                    console.log('error attach model grid cheque in');
                }
            }
        });
    },
    formdatashow: function (state) {
        var me = this;
        var w = me.instantWindow('FormDataOut', 500, state, state, 'win-formdataout');
    },
    formdatabookshow: function () {
        var me = this;
        var w = me.instantWindow('FormDataBook', 500, 'create', 'create', 'win-formdatabook');
    },
    fdarout: function (state, saveUse) {
        var me = this;
        var f = me.getFormdataout();
        me.setActiveForm(f);
        if (state == "update") {
            var grid = me.getOutgrid();
            var rec = grid.getSelectedRecord();
            // console.log(rec);
            // me.getCustomRequestCombobox('bank_cheque_out', '', 'voucherprefix_voucherprefix_id', 'voucherprefix', 'coa', f, '', function () {
            me.getCustomRequestCombobox('detailproject', '', 'project_project_id', 'pt', 'project', f, '', function () {
                f.down('[name=project_project_id]').setValue(rec.get("project_project_id"));
            });
            me.getCustomRequestCombobox('detailpt', '', 'pt_pt_id', 'pt', 'project', f, '', function () {
                f.loadRecord(rec);

                me.getCustomRequestComboboxv2('bank_cheque_out', rec.get("pt_pt_id"), rec.get("project_project_id"), rec.get('voucherprefix_voucherprefix_id'), 'voucherprefix_voucherprefix_id', 'voucherprefix', 'coa', f, '', function () {
                    f.loadRecord(rec);
                });

//                me.getCustomRequestCombobox('bank_cheque_out', rec.get("pt_pt_id"), 'voucherprefix_voucherprefix_id', 'voucherprefix', 'coa', f, '', function () {
//                    f.loadRecord(rec);
//                });
            });
            // });
        } else { // create
            //me.getCustomRequestCombobox('bank_cheque_out', '', 'voucherprefix_voucherprefix_id', 'voucherprefix', 'coa', f, '', function () {
            me.getCustomRequestCombobox('detailproject', '', 'project_project_id', 'pt', 'project', f, '', function () {
                f.down('[name=project_project_id]').setValue(me.project_id);
            });
            me.getCustomRequestCombobox('detailpt', '', 'pt_pt_id', 'pt', 'project', f, '', function () {
                f.down('[name=pt_pt_id]').setValue(me.pt_id);
//                f.down('[name=project_project_id]').setValue(me.project_id);
            });
//                f.loadRecord(rec);

            // });
            if (saveUse) {
                f.down("[action=saveuse]").setDisabled(false);
                f.down("[action=save]").setDisabled(true);
            }
        }
    },
    fdarbook: function (state) {
        var me = this;
        var f = me.getFormdatabook();
        var grid = me.grid;
        me.setActiveForm(f);
//        me.getCustomRequestCombobox('bank_cheque_out', '', 'voucherprefix_voucherprefix_id', 'voucherprefix', 'coa', f, '', function () {
//            me.getCustomRequestCombobox('detailpt', '', 'pt_pt_id', 'pt', '', f, '');
//        });
        me.getCustomRequestCombobox('detailproject', '', 'project_project_id', 'pt', 'project', f, '', function () {
                f.down('[name=project_project_id]').setValue(me.project_id);
            });
        me.getCustomRequestCombobox('detailpt', '', 'pt_pt_id', 'pt', 'project', f, '', function () {
            f.down('[name=pt_pt_id]').setValue(me.pt_id);
        });


//        me.getCustomRequestComboboxv2('bank_cheque_out', rec.get("pt_pt_id"), rec.get("project_project_id"), '', 'voucherprefix_voucherprefix_id', 'voucherprefix', 'coa', f, '', function () {
//            f.loadRecord(rec);
//        });
    },
    dataSaveBook: function (call) {
        var me = this;
        var f = me.getFormdatabook();
        if (f.getForm().isValid()) {
            me.insSave({
                form: f,
                grid: me.grid,
                finalData: function (data) {
                    data['jumlah'] = f.down('[name=jumlah]').getValue();
                    return data;
                },
                sync: true,
                callback: function (success) {

                },
                cb: function () { //ini baru jaalan callbacknya, di atas gajalan
                    if (typeof call === "function") {
                        call();
                    }
                }
            });
        }
    },
    dataSaveOut: function (call) {
        var me = this;
        var f = me.getFormdataout();
        var gridout = me.getOutgrid();
        if (f.getForm().isValid()) {
            me.insSaveOut({
                form: f,
                grid: gridout,
                finalData: function (data) {
                    return data;
                },
                sync: true,
                callback: function (success) {
                },
                cb: function () { //ini baru jaalan callbacknya, di atas gajalan
                    if (typeof call === "function") {
                        call();
                    }
                }
            });
        }
    },
     insSaveOut: function (data) {


        var me = this;
        var afterFunc = typeof data.callback !== 'object' ? null : data.callback;
        var sync = typeof data.sync === 'undefined' ? null : data.sync;
        var cb = typeof data.cb === 'function' ? data.cb : null;
        var mode = typeof data.mode ? data.mode : null;
        var mode_create = typeof data.mode_create ? data.mode_create : null;
        var otherStoreUsed = false;
        var form = data.form;
        var grid = data.grid;
        var indexrow = data.indexdata;
        var store = null;
        /* bisa menggunakan store alternatif selain dari storenya grid */
        if (typeof data.store === 'undefined') {
            store = grid.getStore();
        } else {
            me.pointedStore = grid.getStore();
            store = data.store;
            store.loadData([], false);
            otherStoreUsed = true;
        }
      
        var w = form.up('window');
        var dataForm = form.getForm().getValues();
        if (typeof data.finalData === 'function') {
            dataForm = data.finalData(dataForm);
        }


        var msg = function () {
            if (typeof form.up("window") !== "undefined") {
                form.up('window').body.mask('Saving data, please wait ...');
            }

        };

        if (w.state == 'create') {
            store.add(dataForm);
            if (otherStoreUsed) {
                grid.getStore().add(dataForm);
            }
            /* sync active */
            if (sync != null) {

                store.on('beforesync', msg);
                store.sync(me.syncParams(form, store, msg, "create", otherStoreUsed, cb));
            }
            if (afterFunc !== null) {
                afterFunc.create(store, form, grid);
            }
        } else {
            var gridStore = null;
            if (otherStoreUsed) {
                dataForm['deletedRows'] = grid.getStore().getAt(form.editedRow).get("deletedRows");
                store.add(dataForm);

                gridStore = grid.getStore();
            } else {
                gridStore = store;

            }
            if (me.pointedStore === null) {
                var g = grid.getSelectedRecord();
                var index = g.index;
                var rec = gridStore.getAt(index);



                g.beginEdit();
                g.set(dataForm);
                g.endEdit();
            }


            /* sync active */
            if (sync != null) {
                store.on('beforesync', msg);
                store.sync(me.syncParams(form, store, msg, 'update', '', cb));
            }


            if (afterFunc != null) {
                if (typeof afterFunc.update === 'function') {
                    afterFunc.update();
                }

            }
        }

        if (sync === null) {
            w.close();
        }
    },
    dataSearch: function () {
        resetTimer();
        var me = this;
        var grid;
        var form = me.getFormsearch().getForm();
        var fields = me.getFormsearch().getValues();
        if (!me.is_chequeout) {
            grid = me.getGrid();
        } else {
            grid = me.getOutgrid();
        }
        grid.doInit();
        var store = grid.getStore();
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
    },
    destroyout: function () {
        var me = this;
        var rows = me.getOutgrid().getSelectionModel().getSelection();
        var allow = true;
        var allowmsg = '<ul>';
        rows.forEach(function (rec) {
            if(rec.get("sumvoucher")>0){
                allow = false;
                allowmsg = allowmsg + '<li>Cheque '+rec.get("series")+''+rec.get("cheque_no")+' tidak bisa dihapus karna sudah digunakan oleh '+rec.get("sumvoucher")+' voucher</li>';
            }
        });
        allowmsg = allowmsg + '</ul>';
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getOutgrid().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
            if(allow==true){
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
                                var successmsg = (rows.length == 1 ? selectedRecord : 'Records') + ' deleted successfully.';
                              // var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                                store.un('beforesync', msg);
                                store.reload();
                                Ext.Msg.show({
                                    title: 'Success',
                                    msg: successmsg,
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            },
                            failure: function () {
                                me.getGrid().up('window').unmask();
                                store.un('beforesync', msg);
                                store.reload();
                                Ext.Msg.show({
                                    title: 'Failure',
                                    msg: failmsg + ' The data may have been used.',
                                    icon: Ext.Msg.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            },
                            error: function () {
                                me.getGrid().up('window').unmask();
                                store.un('beforesync', msg);
                                store.reload();
                                Ext.Msg.show({
                                    title: 'Error',
                                    msg: failmsg + ' Delete request error.',
                                    icon: Ext.Msg.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        });
                    }
                });
            }else{
                Ext.Msg.show({
                                    title: 'Failure',
                                    msg: allowmsg,
                                    icon: Ext.Msg.ERROR,
                                    buttons: Ext.Msg.OK
                                });
            }
        }
    },
    showTanggalDetail: function (kasbank, dataflow, vid) {
        var me = this;
        var w = me.instantWindow('FormTanggal', 500, 'Issued Date', 'create', 'win-formdatabook');
        var f = me.getFormtanggal();
        f.down("[name=kasbank_kasbank_id]").setValue(kasbank);
        f.down("[name=voucherId]").setValue(vid);
        f.down("[name=cheque_cheque_id]").setValue(me.cheque_id);
        if (dataflow == "OUT") {
            f.down("[name=cheque_cheque_type]").setValue('O');
        } else {
            f.down("[name=cheque_cheque_type]").setValue('I');
        }


    },
    saveDetailCheque: function () {
        var me = this;
        var f = me.getFormtanggal();
        var g = me.getDetailgrid();
        if (f.getForm().isValid()) {
            f.setLoading("Please wait");
            me.tools.ajax({
                mode_create: 'detailcheque',
                module: me.controllerName,
                form: f,
                finalData: function (data) {
                    return data;
                },
                success: function (data, model) {
                    try {
                        f.up("window").close();
                        me.getDetailCheque(function () {
                        me.getNewAmountDetailCheque();
                        });
                        me.getOutgrid().getStore().reload();
                        me.loadModelHistory();
                        me.getNewDateDetailCheque();
                    } catch (err) {
                        console.log(err.message);
                        me.tools.alert.warning("Failed to generate init.");
                    }
                    f.setLoading(false);
                }
            }).create();
        }
    },
    destroydetail: function () {
        var me = this;
        var rows = me.getDetailgrid().getSelectionModel().getSelection();

        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getDetailgrid().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('kasbank_voucherID') + ']';
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
                        me.getGrid().up('window').mask('Deleting data, please wait ...');
                    };

                    var kasbank_ids = [];
                    var kasbank_ids2 = [];
                    for (var i = 0; i < rows.length; i++) {
                        kasbank_ids.push(rows[i].data.kasbank_kasbank_id);
                        kasbank_ids2.push({"kasbank_kasbank_id": rows[i].data.kasbank_kasbank_id});
                    }

                    var fd = me.getFormdetail();

                    fd.setLoading("Validating voucher status...");
                    me.tools.ajax({
                        params: {
                            module: me.controllerName, 
                            kasbank_kasbank_id: kasbank_ids.join(','),
                            cheque_id:  fd.down("[name=cheque_id]").getValue(),
                            hideparam: 'deletevoucherchequeoutvalidation'
                        },
                        success: function (data, model) {

                            fd.setLoading(false);
                            if (data.success == 'failed') {
                                me.tools.alert.error(data.msg);
                                return false;
                            } else {

                                fd.setLoading("Validating cheque status...");
                                me.tools.ajax({
                                    params: {
                                        module: me.controllerName, 
                                        kasbank_kasbank_id: kasbank_ids.join(','),
                                        cheque_id:  fd.down("[name=cheque_id]").getValue(),
                                        hideparam: 'deletevoucherchequeoutvalidationbychequestatus'
                                    },
                                    success: function (data, model) {

                                        fd.setLoading(false);
                                        if (data.success == 'failed') {
                                            me.tools.alert.error(data.msg);
                                            return false;
                                        } else {

                                            fd.setLoading("Deleting data...");
                                            me.tools.ajax().callAjax({
                                                params: {
                                                    data: Ext.encode(kasbank_ids2),
                                                    mode_read: 'detailcheque',
                                                    module: me.controllerName
                                                },  
                                                module: me.controllerName,
                                                controller: me.controllerName,
                                                zendAction: 'delete',
                                                successCallback: function(response) {
                                                    me.tools.alert.info("Data has been deleted");
                                                    fd.setLoading(false);

                                                    me.getOutgrid().getStore().reload();
                                                    me.getDetailCheque(function () {
                                                        me.getNewAmountDetailCheque();
                                                        me.getNewDateDetailCheque();
                                                    }); 

                                                    return false;
                                                }
                                            })

                                        }
                                    }
                                }).read('deletevouchervalidationbychequestatus');

                            }
                        }
                    }).read('deletevouchervalidation');

                    // for (var i = 0; i < rows.length; i++) {

                    //     store.remove(rows[i]);
                    // }

                    // store.on('beforesync', msg);
                    // store.sync({
                    //     success: function (s) {
                    //         me.getGrid().up('window').unmask();
                    //         var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                    //         var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                    //         store.un('beforesync', msg);
                    //         store.reload();
                    //         me.loadModelHistory();
                    //         me.getNewDateDetailCheque();
                    //         me.getDetailCheque(function () {
                    //             me.getNewAmountDetailCheque();
                    //             me.getOutgrid().getStore().reload();
                    //         });
                    //         Ext.Msg.show({
                    //             title: 'Success',
                    //             msg: successmsg,
                    //             icon: Ext.Msg.INFO,
                    //             buttons: Ext.Msg.OK
                    //         });
                    //     },
                    //     failure: function (s) {

                    //         console.log(s);

                    //         me.getGrid().up('window').unmask();
                    //         store.un('beforesync', msg);
                    //         store.reload();
                    //         Ext.Msg.show({
                    //             title: 'Failure',
                    //             msg: failmsg + ' The data may have been used.',
                    //             icon: Ext.Msg.ERROR,
                    //             buttons: Ext.Msg.OK
                    //         });
                    //     },
                    //     error: function () {
                    //         me.getGrid().up('window').unmask();
                    //         store.un('beforesync', msg);
                    //         store.reload();
                    //         Ext.Msg.show({
                    //             title: 'Error',
                    //             msg: failmsg + ' Delete request error.',
                    //             icon: Ext.Msg.ERROR,
                    //             buttons: Ext.Msg.OK
                    //         });
                    //     }
                    // });
                }
            });
        }
    },
    leadingZero: function (num, size) {
        var s = "000000" + num;
        return s.substr(s.length - size);
    },
    saveDetailChequeDirect: function (arr) {
        var me = this;
        var g = me.getDetailgrid();
        g.setLoading("Please wait");
        me.tools.ajax({
            mode_create: 'detailchequedirect',
            module: me.controllerName,
            dataArray: arr[0],
            finalData: function (data) {
                return data;
            },
            callback: function (info) {
                try {
                    if (info.success) {
                        me.getDetailCheque(function () {
                           me.getNewAmountDetailCheque();
                            me.getNewDateDetailCheque();
                        });
                        me.getOutgrid().getStore().reload();
                        me.loadModelHistory();
                    }
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to process.");
                    g.setLoading(false);
                }
                g.setLoading(false);
            }
        }).createWithoutForm();
    },
    getNewAmountDetailCheque: function () {
        var me = this;
        var g = me.getDetailgrid();
        var f = me.getFormdetail();
        var store = g.getStore();
        var ttl = 0;
        var ttl2 = 0;
        store.each(function (rec) {
        	if(rec.get("kasbank_dataflow") != rec.get("cheque_cheque_type")){
        		ttl += parseInt(rec.get("cheque_amount")) * parseInt(-1);
        	}else{
        		 ttl += accounting.unformat(rec.get("cheque_amount"));
        	}
           
        });

        f.down("[name=amount]").setValue(accounting.formatMoney(ttl));
    },
    getNewDateDetailCheque: function () {
        var me = this;
        var g = me.getDetailgrid();
        var f = me.getFormdetail();
        var cid = f.down('[name=cheque_id]').getValue();
        f.setLoading("Loading detail cheque");
        me.tools.ajax({
            params: {module: me.controllerName, cheque_id: cid},
            success: function (data, model) {
                try {
                    var a = data.issued_date;
                    if (a == "1900-01-01 00:00:00.000" || !a) {
                        f.down("[name=issued_date]").setValue('');
                    } else {
                        f.down('[name=issued_date]').setValue(moment(a).format("YYYY-MM-DD"));
                    }
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");
                }
                f.setLoading(false);
            }
        }).read('getissueddate');
    },
    saveChangeIssuedDate: function () {
        var me = this;
        var fd = me.getFormdetail();
        var f = me.getFormissued();
        var g = me.getDetailgrid();
        var dt = f.down('[name=issued_date]').getValue();
        if (f.getForm().isValid()) {
            f.setLoading("Please wait");
            me.tools.ajax({
                mode_update: 'changeissueddate',
                module: me.controllerName,
                form: f,
                finalData: function (data) {
                    return data;
                },
                success: function (data, model) {
                    try {
                        fd.down('[name=issued_date]').setValue(dt);
                        me.getOutgrid().getStore().reload();
                        f.up("window").close();
                    } catch (err) {
                        console.log(err.message);
                        me.tools.alert.warning("Failed to process.");
                    }
                    f.setLoading(false);
                }
            }).update();
        }
    },
    mainPrint: function () {
        var me = this;
        if (me.reportFileName) {
            if (!me.xyReport) {
                me.xyReport = new Cashier.library.XyReportB();
                me.xyReport.init(me);
            }
            me.xyReport.processReportJs();
        } else {
            me.tools.alert.warning("Template not found.");
        }
    },
    xyReportProcessParams: function (reportData) {
        var me = this;
        var fn = me.reportFileName;
        var f = me.getFormdetail();
        var cheque_id = f.down("[name=cheque_id]").getValue();
        var cheque_no = f.down("[name=cheque_no]").getValue();
        var issued_date = f.down("[name=issued_date]").getValue();

       	var g = me.getDetailgrid();
        var f = me.getFormdetail();
        var store = g.getStore();
        var ttl = 0;
        store.each(function (rec) {
        	if(rec.get("kasbank_dataflow") != rec.get("cheque_cheque_type")){
        		ttl += parseInt(rec.get("cheque_amount")) * parseInt(-1);
        	}else{
        		 ttl += accounting.unformat(rec.get("cheque_amount"));
        	}
           
        });
        reportData['file'] = fn;
        reportData.params["issued_date"] = issued_date;
        reportData.params["cheque_id"] = cheque_id;
        reportData.params["cheque_no"] = cheque_no;
        reportData.params["total_amount"] = ttl;
        return reportData;
    },
    voidCheque: function () {
        var me = this;
        var g = me.getOutgrid();
        var storeout = g.getStore();
        var g = me.getPanel();
        var arr = [];
        var obj = [];
        var rows = me.getOutgrid().getSelectionModel().getSelection();
        var allow = true;
        var allowmsg = '<ul>';
        rows.forEach(function (rec) {
            if(rec.get("sumvoucher")>0){
                allow = false;
                allowmsg = allowmsg + '<li>Cheque '+rec.get("series")+''+rec.get("cheque_no")+' tidak bisa void karna sudah digunakan oleh '+rec.get("sumvoucher")+' voucher</li>';
            }else{
                arr += rec.get("cheque_id") + "~";
            }
        });
        allowmsg = allowmsg + '</ul>';
//        obj.push({
//            cheque_id : arr
//        });
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            if(allow==true){
                

                Ext.Msg.prompt('Reason', 'Please insert your reason:', function(boolean, text) {
                 if(boolean == 'cancel'){
                    return;
                 }else{
                    obj.push({
                        reason : text,
                        cheque_id : arr
                    });
                    g.setLoading("Please wait");
                    me.tools.ajax({
                        mode_update: 'voidcheque',
                        module: me.controllerName,
                        dataArray: obj[0],
                        finalData: function (data) {
                            return data;
                        },
                        callback: function (info) {
                            try {
                                if (info.success) {
                                    me.getOutgrid().getStore().reload();
                                    arr = [];
                                    me.tools.alert.info('Success Void Cheque');
                                }
                            } catch (err) {
                                console.log(err.message);
                                me.tools.alert.warning("Failed to process.");
                                g.setLoading(false);
                            }
                            g.setLoading(false);
                        }
                    }).updateWithoutForm();

                 }

                });
            }
            else{
                me.tools.alert.warning(allowmsg);
            }
        }
    },
    checkTotalAmount: function () {
        var me = this;
        var f = me.getFormdetail();
        var g = me.getDetailgrid().getStore();
        var totamount = f.down("[name=amount]").getValue();
        if (accounting.unformat(totamount) <= 0 && g.getCount() > 0){
        	 me.tools.alert.info('Total Amount Should be Greater Than 0');
        }else{
        	f.up('window').close();
        }
        
    },
    canceledCheque: function () {
        var me = this;
        var g = me.getOutgrid();
        var storeout = g.getStore();
        var g = me.getPanel();
        var arr = [];
        var obj = [];
        var rows = me.getOutgrid().getSelectionModel().getSelection();
        var allow = true;
        rows.forEach(function (rec) {
                arr += rec.get("cheque_id") + "~";
        });
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            if(allow==true){
                

                Ext.Msg.prompt('Reason', 'Please insert your reason:', function(boolean, text) {
                 if(boolean == 'cancel'){
                    return;
                 }else{
                    obj.push({
                        reason : text,
                        cheque_id : arr
                    });
                    g.setLoading("Please wait");
                    me.tools.ajax({
                        mode_update: 'canceledcheque',
                        module: me.controllerName,
                        dataArray: obj[0],
                        finalData: function (data) {
                            return data;
                        },
                        callback: function (info) {
                            try {
                                if (info.success) {
                                    me.getOutgrid().getStore().reload();
                                    arr = [];
                                    me.tools.alert.info('Success Canceled Cheque');
                                }
                            } catch (err) {
                                console.log(err.message);
                                me.tools.alert.warning("Failed to process.");
                                g.setLoading(false);
                            }
                            g.setLoading(false);
                        }
                    }).updateWithoutForm();

                 }

                });
            }
            else{
                me.tools.alert.warning(allowmsg);
            }
        }
    },
    canceledinCheque: function () {
        var me = this;
        var g = me.getGrid();
        var storeout = g.getStore();
        var g = me.getPanel();
        var arr = [];
        var obj = [];
        var rows = me.getGrid().getSelectionModel().getSelection();
        var allow = true;
        rows.forEach(function (rec) {
                arr += rec.get("cheque_id") + "~";
        });
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            if(allow==true){
                

                Ext.Msg.prompt('Reason', 'Please insert your reason:', function(boolean, text) {
                 if(boolean == 'cancel'){
                    return;
                 }else{
                    obj.push({
                        reason : text,
                        cheque_id : arr
                    });
                    g.setLoading("Please wait");
                    me.tools.ajax({
                        mode_update: 'canceledcheque',
                        module: me.controllerName,
                        dataArray: obj[0],
                        finalData: function (data) {
                            return data;
                        },
                        callback: function (info) {
                            try {
                                if (info.success) {
                                    me.getGrid().getStore().reload();
                                    arr = [];
                                    me.tools.alert.info('Success Canceled Cheque');
                                }
                            } catch (err) {
                                console.log(err.message);
                                me.tools.alert.warning("Failed to process.");
                                g.setLoading(false);
                            }
                            g.setLoading(false);
                        }
                    }).updateWithoutForm();

                 }

                });
            }
            else{
                me.tools.alert.warning(allowmsg);
            }
        }
    },
});
