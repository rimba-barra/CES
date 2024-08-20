Ext.define('Cashier.controller.MasterReportMrt', {
    extend: 'Cashier.template.ControllerForMaster',
    alias: 'controller.MasterReportMrt',
    requires: [
        'Cashier.view.masterreportmrt.DetailGrid',
    ],
    refs: [
        {
            ref: 'panel',
            selector: 'masterreportmrtpanel'
        },
        {
            ref: 'grid',
            selector: 'masterreportmrtgrid'
        },
        {
            ref: 'detailgrid',
            selector: 'masterreportmrtdetailgrid'
        },
        {
            ref: 'formdata',
            selector: 'masterreportmrtformdata'
        },
        {
            ref: 'formsearch',
            selector: 'masterreportmrtformsearch'
        },
    ],
    controllerName: 'masterreportmrt',
    fieldName: 'coa',
    bindPrefixName: 'MasterReportMrt',
    formxWinId: 'win-masterreportmrtwinId',
    project_id: 0,
    pt_arr: [],
    init: function () {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
        this.control({
             'masterreportmrtpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(400);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
           
        });
    },
    panelAfterRender: function () {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormsearch();
//        p.setLoading("Please wait");
//        me.tools.ajax({
//            params: {module: me.controllerName},
//            form: p,
//            success: function (data, model) {
//
//                try {
//                    me.tools.weseav2(data.pt, f.down("[name=pt_id]")).comboBox();
//
//                } catch (err) {
//                    console.log(err.message);
//                    me.tools.alert.warning("Failed to generate init.");
//                }
//
//                p.setLoading(false);
//            }
//        }).read('init');
    },
    fdar: function (el) {
        var me = this;
        var f = me.getFormdata();

        me.setActiveForm(f);
        var x = {
            init: function () {
                me.fdarInit();
                me.project_id = 0;
            },
            create: function () {
                me.project_id = 0;
                me.unMask(1);


            },
            update: function () {

               

            }
        };
        return x;
    },
   
});
