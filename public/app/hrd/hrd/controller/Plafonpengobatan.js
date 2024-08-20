Ext.define('Hrd.controller.Plafonpengobatan', {
    extend: 'Hrd.library.box.controller.Controllerfdv',
    alias: 'controller.Plafonpengobatan',
    requires: ['Hrd.library.box.tools.DefaultConfigfdv', 'Hrd.library.box.tools.StoreProcessor', 'Hrd.library.box.tools.EventSelector',
        'Hrd.library.box.tools.SimpleGridControl', 'Hrd.library.box.tools.Tools'],
    views: ['plafonpengobatan.Panel', 'plafonpengobatan.Grid', 'plafonpengobatan.FormSearch', 'plafonpengobatan.FormData'],
    comboBoxIdEl: [],
    controllerName: 'plafonpengobatan',
    fieldName: 'plafonpengobatan_id',
    fillForm: null,
    formWidth: 600,
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Plafonpengobatan',
    browseHandler: null,
    localStore: {
        newdetail: null
    },
    isMaximize: true,
    saveStore: null,
    listYears: null,
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfigfdv({
            moduleName: me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
    },
    init: function() {
        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));

        // added 26 Agustus 2014
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});


    },
    panelAfterRender: function(configs) {
        this.callParent(arguments);
        var me = this;
        var p = me.getPanel();
        p.setLoading("Loading components...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.fillFormDataComponents(data, me.getFormdata());
                me.listYears = data.others[0][0]['LISTYEARS'][1];
                var ly = me.listYears;
                if (ly) {
                    var ys = me.getFormdata().down("[name=year]").getStore();
                    ys.removeAll();
                    for (var i in ly) {
                        ys.add({
                            name: ly[i]["year"],
                            number: ly[i]["year"]
                        });
                    }
                }
                p.setLoading(false);
            }
        }).read('detail');
    },
    fillFormDataComponents: function(data, f) {
        var me = this;
        me.tools.wesea(data.jenispengobatan, f.down("[name=jenispengobatan_jenispengobatan_id]")).comboBox();
        me.tools.wesea(data.group, f.down("[name=group_group_id]")).comboBox();
    },
    mainDataSave: function() {
        var me = this;


        var f = me.getFormdata();



        me.insSave({
            form: f,
            grid: me.getGrid(),
            // store: me.localStore["detail"].store,
            store: me.getGrid().getStore(),
            finalData: function(data) {

                return data;
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {

                }
            }
        });
    },
    fdar: function() {



        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();


        var x = {
            init: function() {


            },
            create: function() {

            },
            update: function() {
                f.editedRow = g.getSelectedRow();
                var eId = me.getGrid().getSelectedRecord().get("plafonpengobatan_id");


            },
            other: function(state) {

                me.getFormdata().up('window').getEl().unmask();
            }
        };
        return x;
    },
    afterDetailRequested: function(data, motherFunc) {
        // data from mode_read : 'detail'
        // motherFunc : fungsi yang dilewatkan dari method gridSelectionChange di Controllerfdv
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        f.editedRow = g.getSelectedRow();

        if (!g.getSelectedRecord()) {
            motherFunc();
            return;
        }
        f.loadRecord(g.getSelectedRecord());
        f.down("button[action=save]").setDisabled(false);
        motherFunc();
        return false;
    },
    afterCallNew: function() {
        var me = this;


        // attach years


        Ext.Msg.show({
            title: 'Message Box',
            msg: 'Add new year?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(clicked) {
                if (clicked === "yes") {

                    // check if data exist
                    var g = me.getGrid();
                    if (g.getStore().getCount() == 0) {
                        return;
                    }

                    Ext.Msg.show({
                        title: 'Message Box',
                        msg: 'Copy from year before?',
                        buttons: Ext.Msg.YESNO,
                        icon: Ext.Msg.QUESTION,
                        fn: function(clicked) {
                            if (clicked === "yes") {
                                me.copyFromYearBefore();
                            } else if (clicked === "no") {
                                me.addNewPlafon();
                            }
                        }
                    });

                } else if (clicked === "no") {
                    me.setDefaultValue();
                }
            }
        });
    },
    setDefaultValue: function(selectedYear) {
        var d = new Date();
        var me = this;
        var f = me.getFormdata();
        var s = f.down("[name=year]").getStore();
        var y = 0;
        if (typeof selectedYear === 'undefined') {
            if (s.getCount() > 0) {
                y = s.getAt(s.getCount() - 1).get("number");
            }
        } else {
            y = selectedYear;
        }
        if (y > 0) {
            f.down("[name=year]").setValue(y);
        }

        f.down("[name=start_date]").setValue(d);
        f.down("[name=end_date]").setValue(d);
    },
    copyFromYearBefore: function() {
        var me = this;
        var p = me.getPanel();
        p.setLoading("Copying from year before...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.getGrid().getStore().loadPage(1);
                p.setLoading(false);
            }
        }).read('copyfromold');
    },
    addNewPlafon: function() {
        var me = this;
        var f = me.getFormdata();
        var d = new Date();

        /// add 1 to year combobox
        var ys = f.down("[name=year]").getStore();
        var y = 0;
        if (ys.getCount() === 0) {
            y = d.getFullYear();

        } else {
            var lastIndex = ys.getCount() - 1;
            var cy = ys.getAt(lastIndex).get("number");
            y = cy + 1;

        }

        ys.add({
            name: y,
            number: y
        });


        me.setDefaultValue(y);
    }
});