Ext.define('Hrd.controller.Uangdinas', {
    extend: 'Hrd.library.box.controller.ControllerByData',
    alias: 'controller.Uangdinas',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.lookup.Employee', 'Hrd.library.box.tools.ComboLoader', 'Hrd.library.box.tools.InstaView',
        'Hrd.library.box.tools.Hour'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'uangdinas',
    formWidth: 600,
    refs: [
        {
            ref: 'formdetail',
            selector: 'uangdinasformdatadetail'
        },
        {
            ref: 'griddetail',
            selector: 'uangdinasgriddetail'
        }
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Uangdinas',
    browseHandler: null,
    localStore: {
        selectedUnit: null,
        indexLembur: null
    },
    textCombos: [],
    comboLoader: null,
    fieldName: 'uangdinas_id',
    overtimeParameters: null,
    myParams: {
        mastersks: [],
        golongans: [],
        negaratujuans: [],
        currencies: []
    },
    moneyFields: ['uanghotel', 'uangmakan_pp_1m',
        'uangmakan_pp_xm', 'uangmakan_pu_1m',
        'uangmakan_pu_xm', 'uangsaku_pp_1m', 'uangsaku_pp_xm',
        'uangsaku_pu_1m', 'uangsaku_pu_xm'],
    shiftInfo: null,
    validShift: false,
    currentStatusLembur: 0,
    validLembur: false,
    overtimeValue: 0,
    tempMatchIndeksLembur: null,
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);

        this.callParent(arguments);
    },
    init: function() {
        var me = this;
        this.callParent(arguments);
        var newEvs = {};
        var events = new Hrd.library.box.tools.EventSelector();



        //lookupemployee
        newEvs['uangdinasformdata button[action=lookupemployee]'] = {
            click: function() {
                me.lookupEmployee();
            }

        };

        newEvs['uangdinasgriddetail button[action=adddetail]'] = {
            click: function() {
                me.detailAddClick();
            }
        };
        newEvs['uangdinasgriddetail button[action=editdetail]'] = {
            click: function() {
                me.detailEditClick();
            }
        };
        newEvs['uangdinasgriddetail button[action=deletedetail]'] = {
            click: function() {
                me.detailDeleteClick();
            }
        };
        newEvs['uangdinasformdatadetail button[action=save]'] = {
            click: function() {
                me.saveDetail();
            }
        };
        newEvs['uangdinasformdata [name=mastersk_mastersk_id]'] = {
            select: function() {
                me.masterSkOnSelect();
            }
        };



        //

        this.control(newEvs);

    },
    masterSkOnSelect: function() {
        var me = this;
        var f = me.getFormdata();
        var cb = f.down("[name=mastersk_mastersk_id]");
        var val = cb.getValue();
        if (val > 0) {
            f.down("[name=mastersk_tanggal]").setValue(me.tools.comboHelper(cb).getField("mastersk_id", "tanggal"));
        }
    },
    saveDetail: function() {
        var me = this;
        var f = me.getFormdetail();

        var gds = me.getGriddetail().getStore();
        var editedRow = f.editedRow;
        var vs = f.getValues();
        var isGenerate = false;

        isGenerate = vs.generate_all;
        vs.group_code = me.tools.comboHelper(f.down("[name=group_group_id]")).getField("group_id", "code");
        vs.negaratujuan_negaratujuan = me.tools.comboHelper(f.down("[name=negaratujuan_negaratujuan_id]")).getField("negaratujuan_id", "negaratujuan");
        vs.currency_currency_name = me.tools.comboHelper(f.down("[name=currency_currency_id]")).getField("currency_id", "currency_name");

        for (var x in me.moneyFields) {
            vs[me.moneyFields[x]] = accounting.unformat(f.down("[name=" + me.moneyFields[x] + "]").getValue());


        }


        if (isGenerate) {
            var sNegara = f.down("[name=negaratujuan_negaratujuan_id]").getStore();
            if (sNegara.getCount() === 0) {
                me.tools.alert("Tidak ada list negara tujuan");
                return;
            }

            var allRec = [];
        
            for (var i = 0; i < sNegara.getCount(); i++) {
            
                var newRec = me.tools.copyObject(vs);
                newRec.generate_all = null;
                newRec.negaratujuan_negaratujuan_id = sNegara.getAt(i).get("negaratujuan_id");
                newRec.negaratujuan_negaratujuan = me.tools.comboHelper(f.down("[name=negaratujuan_negaratujuan_id]")).getFieldFree("negaratujuan_id", "negaratujuan", newRec.negaratujuan_negaratujuan_id);
               
                allRec.push(newRec);
            }
          

            /// match maker
            var found = -1;

            for (var j in allRec) {
                found = -1;

                for (var k = 0; k < gds.getCount(); k++) {
                    //  console.log(gds.getStore().getAt(k));
                       console.log("MATCH");
                       console.log(allRec[j]);
                       console.log(gds.getAt(k));
                    if (me.tools.intval(gds.getAt(k).get("negaratujuan_negaratujuan_id")) === me.tools.intval(allRec[j].negaratujuan_negaratujuan_id)
                            && me.tools.intval(gds.getAt(k).get("group_group_id")) === me.tools.intval(allRec[j].group_group_id)) {

                        found = k;
                    }
                }

                allRec[j].found = found;


            }

            /// insert
            for (var j in allRec) {
                console.log(allRec[j].found);

                if (allRec[j].found >=0) {
                    var rec = gds.getAt(allRec[j].found);
                    var tempId = rec.get("uangdinas_detail_id");
                    if (rec) {
                        allRec[j].uangdinas_detail_id = tempId;
                        rec.beginEdit();
                        rec.set(allRec[j]);
                        rec.endEdit();
                    }

                } else {
                    gds.add(allRec[j]);
                }



            }




        } else {
            if (editedRow > -1) {
                var rec = gds.getAt(editedRow);
                rec.beginEdit();
                rec.set(vs);
                rec.endEdit();

            } else {
                gds.add(vs);

            }
        }


        f.up("window").close();

    },
    showFormDetail: function() {
        var me = this;
        var w = me.instantWindow("FormDataDetail", 500, "Add/ Edit Negara Tujuan", "create", "addnegaratujuanwindow");
        var f = me.getFormdetail();
        me.tools.wesea(me.myParams.golongans, f.down("[name=group_group_id]")).comboBox();
        me.tools.wesea(me.myParams.negaratujuans, f.down("[name=negaratujuan_negaratujuan_id]")).comboBox();
        me.tools.wesea(me.myParams.currencies, f.down("[name=currency_currency_id]")).comboBox();
    },
    detailAddClick: function() {
        var me = this;
        me.showFormDetail();

        var f = me.getFormdetail();
        f.editedRow = -1;
    },
    detailEditClick: function() {
        var me = this;
        var rec = me.getGriddetail().getSelectedRecord();
        if (!rec) {
            return;
        }

        me.showFormDetail();

        var f = me.getFormdetail();
        f.editedRow = me.getGriddetail().getSelectedRow();
        f.loadRecord(rec);

        for (var x in me.moneyFields) {
            f.down("[name=" + me.moneyFields[x] + "]").setValue(accounting.formatMoney(f.down("[name=" + me.moneyFields[x] + "]").getValue()));

        }

    },
    detailDeleteClick: function() {
        var me = this;
        var row = me.getGriddetail().getSelectedRow();

        // get header
        var s = me.getGrid().getStore();
        var rec = s.getAt(me.getFormdata().editedRow);
        if (rec) {

            var deletedRows = rec.get("deletedRows");
            deletedRows = deletedRows + "~" + me.getGriddetail().getStore().getAt(row).get("uangdinas_detail_id");
            rec.beginEdit();
            rec.set({
                deletedRows: deletedRows
            });
            rec.endEdit();
        }



        if (row >= 0) {
            me.getGriddetail().getStore().removeAt(row);
        }



    },
    panelAfterRender: function(el) {
        var me = this;

        if (me.isMaximize) {
            el.up("window").maximize();
        }
        me.getGrid().getSelectionModel().setSelectionMode('SINGLE');
        var f = me.getFormdata();


        me.getPanel().setLoading("Loading...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.myParams.golongans = data.group;
                me.myParams.negaratujuans = data.negaratujuan;
                me.myParams.mastersks = data.mastersk;
                me.myParams.currencies = data.currency;

                me.tools.wesea(me.myParams.mastersks, f.down("[name=mastersk_mastersk_id]")).comboBox();

                var gd = me.getGriddetail();
                gd.doInit();
                gd.doLoad({}, function(rec, operation, success) {
                    me.getPanel().setLoading(false);
                });
            }

        }).read('parameter');




    },
    validateData: function() {
        var data = {"status": false, "msg": "Sedang diproses..."};
        data.status = true;
        data.msg = "Sep";
        return data;
    },
    afterClick: function() {
        var me = this;
        var f = me.getFormdata();
        var x = {
            cancel: function() {
                f.getForm().reset();
                me.getGriddetail().getStore().loadData([], false);
            },
            save: function() {

            },
            edit: function() {
                f.getForm().reset();
                me.fillForm();

            },
            delete: function() {

            },
            new : function() {
                f.getForm().reset();
                me.getGriddetail().getStore().loadData([], false);
            }
        }
        return x;
    },
    finalData: function(data) {
        var me = this;
        var details = me.getGriddetail().getJson();


        for (var i = 0; i < details.length; i++) {
            for (var x in me.moneyFields) {
                details[i][me.moneyFields[x]] = accounting.unformat(details[i][me.moneyFields[x]]);
            }

        }
        data.is_default = me.tools.intval(data.is_default);
        data["details"] = me.getGriddetail().getJson();
        return data;
    },
    afterSC: function(rec) {
        var me = this;
        //  me.fillForm();
        me.getGriddetail().getStore().loadData([], false);
        me.getFormdata().getForm().reset();
        me.fillForm();

    },
    fillForm: function() {
        var me = this;
        var gd = me.getGriddetail();
        var rec = me.getGrid().getSelectedRecord();
        if (!rec) {
            return;

        }

        me.getFormdata().loadRecord(rec);

        gd.getStore().getProxy().extraParams.uangdinas_id = rec.get("uangdinas_id");
        gd.getStore().loadPage(1);
    }



});