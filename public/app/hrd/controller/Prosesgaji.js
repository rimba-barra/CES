Ext.define('Hrd.controller.Prosesgaji', {
    extend: 'Hrd.library.box.controller.ControllerByData',
    alias: 'controller.Prosesgaji',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.lookup.Employee', 'Hrd.library.box.tools.ComboLoader', 'Hrd.library.box.tools.InstaView',
        'Hrd.library.box.tools.Hour'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'prosesgaji',
    formWidth: 600,
    refs: [
        {
            ref: 'gridlookupe',
            selector: 'lookupemployeegrid'
        },
        {
            ref: 'formgen',
            selector: 'prosesgajiformgenerate'
        },
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Prosesgaji',
    browseHandler: null,
    localStore: {
        selectedUnit: null,
        indexLembur: null,
        newdetail: null,
    },
    textCombos: [],
    comboLoader: null,
    fieldName: 'transfer_id',
    overtimeParameters: null,
    myParams: null,
    shiftInfo: null,
    validShift: false,
    currentStatusLembur: 0,
    validLembur: false,
    saveStoreB: 'newdetail',
    overtimeValue: 0,
    tempMatchIndeksLembur: null,
    listKomponenGaji: null,
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);

        // event untuk single klik di grid
        if (typeof gbTransferDataImport === 'undefined') {
            gbTransferDataImport = {
                komponenClick: function(index) {

                    me.gridKomponenOnClick(index);
                }
            };
        }



        this.callParent(arguments);
    },
    init: function() {
        var me = this;
        this.callParent(arguments);
        var newEvs = {};
        var events = new Hrd.library.box.tools.EventSelector();




        newEvs['prosesgajiformdata button[action=lookup_employee]'] = {
            click: function() {
                me.lookupEmployee();
            }

        };




        newEvs['#ProsesGajiwindow lookupemployeegrid button[action=select]'] = {
            click: function() {
                me.selectEmployee();
            }

        };



        newEvs['prosesgajipanel button[action=generate]'] = {
            click: function() {
                me.generateNext();
            }

        };

        newEvs['prosesgajiformgenerate button[action=continue]'] = {
            //change: me.resetGrid
            click: me.continueOnClick
        };

        newEvs['prosesgajiformdata [name=monthyear_filter]'] = {
            select: function() {
                me.monthyearOnSelect();
            }

        };


        newEvs['prosesgajiformdata [name=group_filter]'] = {
            select: function() {
                me.groupOnSelect();
            }

        };

        newEvs['prosesgajiformdata [name=komponengaji_komponengaji_id]'] = {
            select: function() {
                me.komponenOnSelect();
            }

        };





        this.control(newEvs);

    },
    monthyearOnSelect: function() {
        var me = this;
        var f = me.getFormdata();
        var el = f.down("[name=group_filter]");
        var s = el.getStore();
        s.getProxy().setExtraParam('monthyear', f.down("[name=monthyear_filter]").getValue());
        s.load({
            callback: function() {
                el.setDefaultValue(true);
                me.groupOnSelect();
            }
        });
    },
    groupOnSelect: function() {
        var me = this;
        var f = me.getFormdata();
        var el = f.down("[name=komponengaji_komponengaji_id]");
        var s = el.getStore();
        s.getProxy().setExtraParam('monthyear', f.down("[name=monthyear_filter]").getValue());
        s.getProxy().setExtraParam('group', f.down("[name=group_filter]").getValue());
        s.getProxy().setExtraParam('limit', 9999);
        s.load({
            callback: function() {
                el.setDefaultValue(true);
                me.komponenOnSelect();
            }
        });

    },
    komponenOnSelect: function() {
        var me = this;
        var f = me.getFormdata();
        var s = me.getGrid().getStore();


        s.getProxy().setExtraParam('monthyear', f.down("[name=monthyear_filter]").getValue());
        s.getProxy().setExtraParam('group', f.down("[name=group_filter]").getValue());
        s.getProxy().setExtraParam('komponengaji_komponengaji_id', f.down("[name=komponengaji_komponengaji_id]").getValue());
        s.getProxy().setExtraParam('limit', 9999);
        //s.load();
        s.load({
            callback: function() {
                me.hitungTotal();

            }
        });

    },
    hitungTotal: function() {
        var me = this;
        var total = 0;
        var totalValue = 0;
        var f = me.getFormdata();
        me.getGrid().getStore().each(function(rec) {

            if (rec != null) {
                total++;
                var v = accounting.unformat(rec.get("value"));
                totalValue +=v;
            }

        });
      
        f.down("[name=total]").setValue(total);
        f.down("[name=total_value]").setValuem(totalValue);
    },
    continueOnClick: function(el) {
        var me = this;
        var f = me.getFormgen();
        var d = f.down("[name=date]").getValue();
        var valid = me.tools.inputMonthYear(d);
        if (valid.valid) {
            var validDate = valid.date;


            f.setLoading("Please wait...");
            me.tools.ajax({
                params: {
                    month: validDate.getMonth() + 1,
                    year: validDate.getFullYear()
                },
                fail: function(msg, data) {

                    f.setLoading(false);
                },
                success: function(data) {
                    f.setLoading(false);
                    f.up("window").close();
                    me.tools.alert.info("Success!");
                }
            }).process('generatenext');
        } else {
            me.tools.alert.warning(valid.msg);
        }

    },
    generateNext: function() {
        var me = this;
        var f = me.getFormdata();

        var w = me.instantWindow("FormGenerate", 400, "Generate New Period", "create", "generatewindow");
        var fg = me.getFormgen();
        // set default date
        var myEls = f.down("[name=monthyear_filter]").getStore();
        var d = new Date();
        if (myEls.getCount() > 0) {
            var lastRec = myEls.getAt(myEls.getCount() - 1);
            var mrec = lastRec.get('month');

            d.setMonth(mrec - 1);
            d.setYear(lastRec.get('year'));
        }



        d.setMonth(d.getMonth() + 1);
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        if (month > 12) {
            month = 1;
            year = year + 1;
        }
        var v = me.tools.akda(month) + '/' + year;
        fg.down("[name=date]").setValue(v);

    },
    gridSelectionChange: function() {
        var me = this;
        /* me.callParent(arguments);
         
         f.getForm().reset();
         me.cancelOnClick();
         */
        var g = me.getGrid();
        var f = me.getFormdata();
        var rec = g.getSelectedRecord();
        if (rec) {
            f.editedRow = g.getSelectedRow();
            f.down("[name=employee_employee_nik]").setValue(rec.get("employee_employee_nik"));
            f.down("[name=employee_employee_name]").setValue(rec.get("employee_employee_name"));
            f.down("[name=employee_employee_id]").setValue(rec.get("employee_employee_id"));
            f.down("[name=value]").setValue(rec.get("value"));
            //  f.loadRecord(rec);

            me.getPanel().down("toolbar button[action=delete]").setDisabled(false);
            me.tools.formHelper(f).fixMoneyFormat(rec);


        }
        me.afterSC(rec);

    },
    lookupEmployee: function() {
        var me = this;
        var f = me.getFormdata();
        var window = me.instantWindow("Panel", 600, "Employe List", "create", "ProsesGajiwindow", "lookup.employee", {
            itemId: me.controllerName + 'employee'
        });


        var g = window.down("grid");


        var p = window.down("panel");
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.tools.wesea({data: data, model: model}, g).grid();
                p.setLoading(false);
            }
        }).read('employee');



    },
    panelAfterRender: function(el) {
        var me = this;
        me.listKomponenGaji = null;
        if (me.isMaximize) {
            el.up("window").maximize();
        }
        me.getGrid().getSelectionModel().setSelectionMode('SINGLE');
        var f = me.getFormdata();
        var p = me.getPanel();
        var g = me.getGrid();

        var el = f.down("[name=monthyear_filter]");
        var gel = f.down("[name=group_filter]");
        var kel = f.down("[name=komponengaji_komponengaji_id]");

        el.bindPrefixName = 'prosesgaji';
        gel.bindPrefixName = 'prosesgaji';
        kel.bindPrefixName = 'prosesgaji';

        el.doInit(true, {}, function() {

            gel.doInit(true,
                    {
                        monthyear: el.getValue()
                    },
            function() {
                kel.doInit(true, {
                    monthyear: el.getValue(),
                    group: gel.getValue()
                }, function() {

                    me.komponenOnSelect();

                });
            });
        });


        return;

        me.tools.ajax({
            params: {},
            success: function(data, model) {

                console.log(data);


            }
        }).read('parameter');



        // maximize panel window

    },
    finalData: function(data) {
        var me = this;
        data = me.tools.formHelper(me.getFormdata()).fixMoneyUnformat();
        data["detail"] = me.getGrid().getJson();
        return data;
    },
    afterClick: function() {
        var me = this;
        var f = me.getFormdata();
        var x = {
            cancel: function() {
                me.addEvent(false);
                //  me.mainGridCheckRecord();
                var rec = me.getGrid().getSelectedRecord();
                if (rec) {
                    f.loadRecord(rec);
                }
                f.down("[name=komponengaji_komponengaji_id]").setReadOnly(false);
                f.down("[name=batch_filter]").setReadOnly(false);
                f.down("[name=monthyear_filter]").setReadOnly(false);
                // f.down("[action=lookup_employee]").setDisabled(true);
            },
            save: function() {

            },
            edit: function() {
                //  f.down("[action=lookup_employee]").setDisabled(false);
            },
            delete: function() {

            },
            new : function() {
                me.addEvent(true);

                var batch = me.tools.intval(f.down("[name=batch_filter]").getValue());
                batch = batch + 1;
                var my = f.down("[name=monthyear_filter]").getValue();
                if (!my) {
                    var date = new Date();

                    my = date.getMonth() + 1 + "/" + date.getFullYear();
                }
                f.down("[name=batch]").setValue(batch);
                f.down("[name=monthyear]").setValue(my);
                f.down("[name=total]").setValue(0);
                f.down("[name=total_value]").setValue(0);
                me.tools.comboHelper(f.down("[name=komponengaji_komponengaji_id]")).setFirstValue();

                me.getGrid().getStore().loadData([], false);
                /*  me.validShift = false;
                 f.getForm().reset();
                 f.down("[name=date]").setValue(new Date());
                 f.down("[action=lookup_employee]").setDisabled(false);
                 */
            }
        }
        return x;
    },
    successSaveUpdate: function(isCreate) {
        var me = this;
        //me.refreshForm();
    },
    refreshForm: function() {
        var me = this;
        // me.addEvent(false);
    }
});