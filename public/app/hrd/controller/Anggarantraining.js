Ext.define('Hrd.controller.Anggarantraining', {
    extend: 'Hrd.library.box.controller.ControllerByData',
    alias: 'controller.Anggarantraining',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.lookup.Employee', 'Hrd.library.box.tools.ComboLoader', 'Hrd.library.box.tools.InstaView',
        'Hrd.library.box.tools.Hour'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'anggarantraining',
    formWidth: 600,
    refs: [
        {
            ref: 'formgen',
            selector: 'anggarantrainingformgenerate'
        }
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Anggarantraining',
    browseHandler: null,
    localStore: {
        selectedUnit: null,
    },
    textCombos: [],
    comboLoader: null,
    fieldName: 'anggarantraining_id',
    myParams: null,
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


        //lookup_employee
        newEvs['anggarantrainingpanel button[action=generate]'] = {
            click: function() {
                me.showYearWindow();
            }

        };
        newEvs['anggarantrainingformgenerate button[action=continue]'] = {
            //change: me.resetGrid
            click: me.continueOnClick
        };

        newEvs['anggarantrainingformsearch combobox[name=year]'] = {
            //change: me.resetGrid
            select: function() {
                me.refreshMainGrid();
            }
        };

        newEvs['anggarantrainingformsearch combobox[name=department_id]'] = {
            //change: me.resetGrid
            select: function() {
                me.refreshMainGrid();
            }
        };




        this.control(newEvs);

    },
    validateData: function() {
        var me = this;
        var data = {"status": true, "msg": "Sedang diproses..."};

        return data;
    },
    afterSC: function(rec) {
        var me = this;
        if(!rec){
            return;
        }
        var f = me.getFormdata();
        f.loadRecord(rec);
    },
    refreshMainGrid: function() {
        var me = this;
        var fs = me.getFormsearch();
        var y = fs.down("[name=year]").getValue();
        var d = fs.down("[name=department_id]").getValue();
        var g = me.getGrid();
       // g.getStore().loadData([], false);
        g.getStore().loadPage(1, {
            params: {
                year: y,
                department_id: d
            },
            callback: function(recs, op) {
                g.attachModel(op);
            }
        });
    },
    continueOnClick: function(el) {
        var me = this;
        var f = me.getFormgen();

        Ext.Msg.show({
            title: 'Message Box',
            msg: 'Salin dari anggaran tahun sebelumnya?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(clicked) {
                if (clicked === "yes") {
                    me.generateAnggaran(1);
                } else if (clicked === "no") {
                    me.generateAnggaran(0);
                }
            }
        });



    },
    generateAnggaran: function(mode) {
        var me = this;
        var f = me.getFormgen();
        var y = me.tools.intval(f.down("[name=year]").getValue());

        if (y >= 2000 && y <= 3000) {

            f.setLoading("Please wait...");
            me.tools.ajax({
                params: {
                    year: y,
                    is_copy:mode
                },
                success: function(data, model) {
                    console.log(data);
                    f.setLoading(false);

                }
            }).read('generate');
        } else {
            me.tools.alert.warning("Tahun tidak valid");
        }
    },
    showYearWindow: function() {
        var me = this;
        var win = me.instantWindow("FormGenerate", 400, "Generate Anggaran Baru", "create", "generateanggaranbaruwindow");
        var f = me.getFormgen();

        var date = new Date();
        var y = date.getFullYear();

        f.down("[name=year]").setValue(y);

    },
    panelAfterRender: function(el) {
        var me = this;

        if (me.isMaximize) {
            el.up("window").maximize();
        }
        me.getGrid().getSelectionModel().setSelectionMode('SINGLE');


        me.tools.ajax({
            params: {},
            success: function(data, model) {
                console.log(data);
                var fs = me.getFormsearch();
                var years = data['others'][0][0]['YEARS'];
                var tempData = [];
                if (years) {
                    for (var i in years) {
                        tempData.push({
                            name: years[i],
                            number: years[i]
                        });
                    }
                }
                var store1 = Ext.create('Ext.data.Store', {
                    fields: ['name', 'number'],
                    data: tempData
                });

                fs.down("[name=year]").bindStore(store1);
                me.tools.wesea(data.department, fs.down("[name=department_id]")).comboBox();


                /// set default value
                me.tools.comboHelper(fs.down("[name=year]")).setDefaultValue(true);
                me.tools.comboHelper(fs.down("[name=department_id]")).setDefaultValue(true);
                me.refreshMainGrid();
            }
        }).read('parameter');

        me.getPanel().setLoading(false);

        // maximize panel window

    },
    afterClick: function() {
        var me = this;
        var f = me.getFormdata();
        var x = {
            cancel: function() {

            },
            save: function() {
                
            },
            edit: function() {

            },
            delete: function() {
                me.refreshMainGrid();
            },
            new : function() {

                f.getForm().reset();
                //f.down("[name=date]").setValue(new Date());
            }
        }
        return x;
    }


});