Ext.define('Hrd.controller.Firstdayform', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Firstdayform',
    controllerName: 'firstdayform',
    fieldName: 'question',
    bindPrefixName: 'Firstdayform',
    uploadFotoKlik:0,
    refs:[
        {
            ref: 'gridgenerate',
            selector: 'firstdayformgenerateppgrid'
        },
        {
            ref: 'gridgenerateemployee',
            selector: 'firstdayformgenerateemployeeppgrid'
        },
        {
            ref: 'formgenerate',
            selector: 'firstdayformformgenerate'
        },
    ],
    init: function() {
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
        var newEvs = {};
        newEvs['firstdayformgrid button[action=generate]'] = {
            click: function() {
               me.generateTrans();
            }
        };

        newEvs['firstdayformformgenerate'] = {
            afterrender: function () {
                me.formGenerateAfterRender();
            }
        };

        newEvs['firstdayformformgenerate button[action=processgenerate]'] = {
            click: function () {
                me.processGenerate();
            },
        };
        
        this.control(newEvs);
     
        
    },
    //GENERATE
    generateTrans: function () {
        var me, grid, store;
        me = this;
        me.instantWindow("FormGenerate", 400, "Generate", "Generate", "firstdayformformgenerate");
    },
    formGenerateAfterRender: function () {
        var me, grid, store;
        me = this;
        var g = me.getGridgenerate();
        var sg = g.getStore();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea({data: data, model: model}, g).grid();
                sg.reload();
            }
        }).read('getquestion');

        var gpp = me.getGridgenerateemployee();
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

        gtn = me.getGridgenerate();
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

        gpp = me.getGridgenerateemployee();
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
                me.getFormgenerate().up('window').close();
                me.tools.alert.info("Generate tambahan untuk user lama berhasil");
            }
        }).read('generatetransaction');

    },
});