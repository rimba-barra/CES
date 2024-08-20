Ext.define('Hrd.controller.Edittunjangan', {
    extend: 'Hrd.library.box.controller.template.Parameters',
    alias: 'controller.Edittunjangan',
    views: [],
    controllerName: 'edittunjangan',
    formWidth: 400,
    refs: [
        {
            ref: 'panel',
            selector: 'edittunjanganpanel'
        },
        {
            ref: 'formgen',
            selector: 'edittunjanganformgenerate'
        },
        {
            ref: 'gridem',
            selector: 'edittunjanganemgrid'
        },
        {
            ref: 'gridvalue',
            selector: 'edittunjangankomgrid'
        }
    ],
    bindPrefixName: 'Edittunjangan',
    sizew: {w: 500, h: 500},
    paramList: null,
    tempDeletedId: {},
    isLoaded: {
        cBA: false, CBB: false,
        GA: false, GB: false
    },
    init: function() {
        this.callParent(arguments);
        var me = this;
        var newEvents = {};
        newEvents['#formEdittunjanganID [name=status]'] = {
            change: function(el, newVal) {
                me.statusOnChange(el);
            }
        };
        newEvents['edittunjanganpanel [action=generate]'] = {
            click: function() {
                me.generatePeriode();
            }
        };
        newEvents['edittunjanganformgenerate button[action=continue]'] = {
            //change: me.resetGrid
            click: me.continueOnClick
        };
        newEvents['#formEdittunjanganID [name=periode]'] = {
            select: function() {
                me.periodeOnSelect();
            }
        };
        newEvents['#formEdittunjanganID [name=department_id]'] = {
            select: function() {
                me.departmentOnSelect();
            }
        };
        newEvents['edittunjanganemgrid'] = {
            selectionchange: function() {
                me.gridEmployeeOnSC();
            }
        };

        this.control(newEvents);

        //selectionchange: me.gridSelectionChange


    },
    departmentOnSelect: function() {
        var me = this;
        var s = me.getGridem().getStore();
        var p = me.getPanel();
        var f = p.down("form");
        var departmentId = me.tools.intval(f.down("[name=department_id]").getValue());
        me.getGridvalue().getStore().loadData([],false);
        if (s.getCount() > 0 && departmentId > 0) {
          
            s.clearFilter(true);
            
            s.filterBy(function(rec, id) {
               
                if (rec.raw.department.department_id === departmentId) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }


    },
    gridEmployeeOnSC: function() {
        var me = this;
        var g = me.getGridem();
        var rec = g.getSelectedRecord();
        var p = me.getPanel();
        if (rec) {
            var my = me.getMonthYear();
            p.setLoading("Loading...");
            me.tools.ajax({
                params: {
                    month: my["month"],
                    year: my["year"],
                    employee_id: rec.get("employee_id")
                },
                success: function(data, model) {
                    me.tools.wesea({data: data, model: model}, me.getGridvalue()).grid();
                    
                    p.setLoading(false);
                }
            }).read('value');
        }
    },
    getMonthYear: function() {
        var me = this;
        var hasil = {month: 0, year: 0};
        var p = me.getPanel();
        var f = p.down("form");
        var val = f.down("[name=periode]").getValue();
        if (val) {
            var str = val.split("/");
            hasil["month"] = me.tools.intval(str[0]);
            hasil["year"] = me.tools.intval(str[1]);
        }
        return hasil;
    },
    periodeOnSelect: function() {
        var me = this;
        var p = me.getPanel();
        var f = p.down("form");
        var val = f.down("[name=periode]").getValue();
        if (val) {
            var my = me.getMonthYear();
            p.setLoading("Loading...");
            me.tools.ajax({
                params: {
                    month: my["month"],
                    year: my["year"]
                },
                success: function(data, model) {
                    me.tools.wesea({data: data, model: model}, me.getGridem()).grid();
                    me.departmentOnSelect();
                    me.getGridvalue().getStore().loadData([],false);
                    p.setLoading(false);
                }
            }).read('employee');

        }

    },
    continueOnClick: function(el) {
        var me = this;
        var f = me.getFormgen();
        var d = f.down("[name=date]").getValue();
        var valid = me.tools.inputMonthYear(d);
        if (valid.valid) {
            var validDate = valid.date;

            f.setLoading("Processing...");
            me.tools.ajax({
                params: {
                    month: validDate.getMonth() + 1,
                    year: validDate.getFullYear(),
                    monthyear: d
                },
                success: function(data, model) {
                    f.setLoading(false);
                }
            }).read('generate');

        } else {
            me.tools.alert.warning(valid.msg);
        }

    },
    generatePeriode: function() {
        var me = this;
        var w = me.instantWindow("FormGenerate", 400, "Generate New Period", "create", "generatesheetwindow");

    },
    saveCallback: function(data) {
        var me = this;
        var x = {
            success: function() {

                me.refreshData();
            }
        };
        return x;
    },
    finalData: function(values) {
        var me = this;
        var p = me.getPanel();
        var f = p.down("form");
        values["data"] = me.getGridvalue().getJson();


        return values;
    },
    pafCallback: function(recs, form) {
        var me = this;
        var vs = form.getValues();
        var p = me.getPanel();
        var f = p.down("form");
        me.getGridem().getSelectionModel().setSelectionMode('SINGLE');
        me.getGridvalue().getSelectionModel().setSelectionMode('SINGLE');
        p.down("[action=save]").setDisabled(false);
        p.setLoading("Loading...");
        me.tools.ajax({
            params: {
            },
            success: function(data, model) {
                console.log(data);
                var allPeriode = data["others"][0][0]["DATA"][1];
                if (allPeriode) {

                    var el = f.down("[name=periode]");
                    var allP = [];
                    var t = '';
                    for (var i in allPeriode) {
                        t = allPeriode[i]['month'] + '/' + allPeriode[i]['year'];
                        allP.push({
                            'number': t,
                            'text': t
                        });
                    }

                    var store1 = Ext.create('Ext.data.Store', {
                        fields: ['text', 'number'],
                        data: allP
                    });

                    el.bindStore(store1);
                }

                /// load department
                p.setLoading("Loading department...");
                me.tools.ajax({
                    params: {},
                    success: function(data, model) {
                        var del = f.down("[name=department_id]"); 
                        me.tools.wesea(data.department, del).comboBox();
                        if(del.getStore().getCount() > 0){
                            me.tools.comboHelper(del).setDefaultValue();
                        }
                        p.setLoading(false);
                    }
                }).read('parameter');


            }
        }).read('periode');


    },
    refreshData: function() {
        var me = this;
        var p = me.getPanel();

    },
    validateData: function() {
        var me = this;
        var data = {"status": false, "msg": "Sedang diproses..."};
        var gv = me.getGridvalue();
        if (gv.getStore().getCount() === 0) {
            data.msg = "Tidak ada nilai yang akan diproses";
        } else {
            data.status = true;
        }

        return data;
    },
});