Ext.define('Hrd.controller.Firstdayemployee', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Firstdayemployee',
    controllerName: 'firstdayemployee',
    fieldName: 'name',
    bindPrefixName: 'Firstdayemployee',
    uploadFotoKlik:0,
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    refs:[
        {
            ref: 'gridtrans',
            selector: 'firstdayemployeetransgrid'
        },
        {
            ref: 'gridshortcut',
            selector: 'firstdayemployeeshortcutppgrid'
        },
        {
            ref: 'gridshortcutemployee',
            selector: 'firstdayemployeeshortcutemployeeppgrid'
        },
        {
            ref: 'formshortcut',
            selector: 'firstdayemployeeformshortcut'
        },
    ],
    init: function() {
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
        var newEvs = {};

        newEvs['firstdayemployeeformdata button[action=save]'] = {
            click: function() {
               me.updateDetail();
            }
        };

        newEvs['firstdayemployeegrid button[action=shortcut]'] = {
            click: function() {
               me.generateTrans();
            }
        };

        newEvs['firstdayemployeeformshortcut'] = {
            afterrender: function () {
                me.formGenerateAfterRender();
            }
        };

        newEvs['firstdayemployeeformshortcut button[action=processshortcut]'] = {
            click: function () {
                me.processGenerate();
            },
        };

        newEvs['firstdayemployeeformshortcut button[action=processshortcut_not]'] = {
            click: function () {
                me.processGenerateNot();
            },
        };
        

        
        this.control(newEvs);
    },
    fdar: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var gt = me.getGridtrans();
        me.setActiveForm(f);
        var rec_empid = g.getSelectedRecord();
        var employee_id = rec_empid.data['employee_id'];
        // console.log(rec.data['employee_id']);
        var x = {
            init: function() {
                me.fdarInit();
            },
            create: function() {
                me.unMask(1);
                me.tools.ajax({
                    params: {
                        employee_id: employee_id
                    },
                    success: function(data, model) {
                        me.tools.wesea({data: data, model: model}, gt).grid();
                    }
                }).read('getTransaction');
            },
            update: function() {

                me.tools.ajax({
                    params: {
                        employee_id: employee_id
                    },
                    success: function(data, model) {
                        me.tools.wesea({data: data, model: model}, gt).grid();
                        // me.tools.wesea({data: data, model: model}, g).grid();
                        var rec = g.getSelectedRecord();
                        f.editedRow = g.getSelectedRow();
                        f.getForm().loadRecord(rec);
                        // me.empExist();
                        console.log(rec.get('private'));
                    }
                }).read('getTransaction');


                me.unMask(1);

            }
        };
        return x;
    },
    updateDetail: function () {
        var me = this;
        var g = me.getGrid();
        var gt = me.getGridtrans();
        var sg = gt.getStore();
        var data_cell = sg.data.items;
        var rec_empid = g.getSelectedRecord();
        var employee_id = rec_empid.data['employee_id'];
        var array = [];
        $.each(data_cell, function (key, value) {
            var data_cell_current = value.data;
            var jsonString_cell = JSON.stringify(data_cell_current);
            array[key] = jsonString_cell;
        });
        var jsonString = JSON.stringify(array);
            

        me.tools.ajax({
            params: {   
                        employee_id         : employee_id,
                        jsonString     : jsonString
                    },
            success: function (data, model) {
                        
            }
        }).read('updatedetil');

        
    },

    //GENERATE
    generateTrans: function () {
        var me, grid, store;
        me = this;
        me.instantWindow("FormShortcut", 400, "Shortcut", "Shortcut", "firstdayemployeeformshortcut");
    },
    formGenerateAfterRender: function () {
        var me, grid, store;
        me = this;
        var g = me.getGridshortcut();
        var sg = g.getStore();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea({data: data, model: model}, g).grid();
                sg.reload();
            }
        }).read('getquestion');

        var gpp = me.getGridshortcutemployee();
        var sgpp = gpp.getStore();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea({data: data, model: model}, gpp).grid();
                sgpp.reload();
            }
        }).read('getemployee');
    },
    processGenerate: function(){
        var me = this;

        gtn = me.getGridshortcut();
        rec_tn = gtn.getSelectedRecord();
        id_tn = rec_tn.get("firstdayform_id");
        rows_tn = gtn.getSelectionModel().getSelection();
        var firstdayform_id = "";
        var question = "";
        if (rows_tn.length > 0) {
            for (var i in rows_tn) {
                firstdayform_id += rows_tn[i]['data']["firstdayform_id"] + "~";
                question += rows_tn[i]['data']["question"] + "~";
            }
        }

        gpp = me.getGridshortcutemployee();
        rec_pp = gpp.getSelectedRecord();
        id_pp = rec_pp.get("employee_id");
        rows_pp = gpp.getSelectionModel().getSelection();
        var employee_id = "";
        var employee_name = "";
        if (rows_pp.length > 0) {
            for (var i in rows_pp) {
                employee_id += rows_pp[i]['data']["employee_id"] + "~";
                employee_name += rows_pp[i]['data']["employee_name"] + "~";
            }
        }

        console.log(firstdayform_id);
        console.log(question);
        console.log(employee_id);
        console.log(employee_name);

        me.tools.ajax({
            params: {
                firstdayform_id:firstdayform_id,
                question:question,
                employee_id:employee_id,
                employee_name:employee_name
            },
            success: function (data, model) {
                me.getFormshortcut().up('window').close();
                me.tools.alert.info("Shortcut HC, Employee dan Question berhasil ditambahkan");
            }
        }).read('generatetransaction');

    },

    processGenerateNot: function(){
        var me = this;

        gtn = me.getGridshortcut();
        rec_tn = gtn.getSelectedRecord();
        id_tn = rec_tn.get("firstdayform_id");
        rows_tn = gtn.getSelectionModel().getSelection();
        var firstdayform_id = "";
        var question = "";
        if (rows_tn.length > 0) {
            for (var i in rows_tn) {
                firstdayform_id += rows_tn[i]['data']["firstdayform_id"] + "~";
                question += rows_tn[i]['data']["question"] + "~";
            }
        }

        gpp = me.getGridshortcutemployee();
        rec_pp = gpp.getSelectedRecord();
        id_pp = rec_pp.get("employee_id");
        rows_pp = gpp.getSelectionModel().getSelection();
        var employee_id = "";
        var employee_name = "";
        if (rows_pp.length > 0) {
            for (var i in rows_pp) {
                employee_id += rows_pp[i]['data']["employee_id"] + "~";
                employee_name += rows_pp[i]['data']["employee_name"] + "~";
            }
        }

        console.log(firstdayform_id);
        console.log(question);
        console.log(employee_id);
        console.log(employee_name);

        me.tools.ajax({
            params: {
                firstdayform_id:firstdayform_id,
                question:question,
                employee_id:employee_id,
                employee_name:employee_name
            },
            success: function (data, model) {
                me.getFormshortcut().up('window').close();
                me.tools.alert.info("Shortcut HC, Employee dan Question berhasil ditambahkan");
            }
        }).read('generatetransaction_not');

    },

});