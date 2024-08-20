/*  JS CONTROLLER FOR 'Matrix Competency' */

Ext.define('Hrd.controller.Reportmatrixcompetency', {
    extend          : 'Hrd.library.box.controller.Controller',
    alias           : 'controller.Reportmatrixcompetency',
    requires        : [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse'
    ],
    controllerName  : 'reportmatrixcompetency',
    fieldName       : 'matrixcompetency_id',
    bindPrefixName  : 'Reportmatrixcompetency',
    formWidth       : 700,
    localStore      : {},
    refs            : [{
        ref         : 'panel',
        selector    : 'reportmatrixcompetencypanel'
    }],
    constructor 	: function(configs) {
    	var me      = this;
        var config  = new Hrd.library.box.tools.DefaultConfig ({
            moduleName: me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
    },

    init            : function() {
        var me      = this;
        var events  = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools    = new Hrd.library.box.tools.Tools({config: me.myConfig});
        var newEvs  = {};

        newEvs['reportmatrixcompetencypanel combobox[name=jobfamily_id]'] = {
        	select: function() {
                var l = me.getPanel().down("[name=checkall]");
        		// var f = me.getPanel().down().getForm().getFieldValues();
                // var c = f.checkall;
                l.setValue(false);
                var d = me.getPanel().down().getForm('[name=jobfamily_id]');
        	}
        };

        newEvs['reportmatrixcompetencypanel checkbox[name=checkall]'] = {
            change: function() {
                var l = me.getPanel().down("[name=jobfamily_id]");
                var c = me.getPanel().down("[name=checkall]");
                
                if (c.getValue() == '1') {
                    l.setValue("");
                }
            }
        }

        newEvs['reportmatrixcompetencypanel'] = {
            afterrender: function() {
                var me = this;

            // var store =   Ext.create('Ext.data.Store', {
            //     fields: [{name: 'jobfamily_id'}, {name: 'jobfamily'}],
            //     //autoLoad: true,
            //     proxy: {
            //         type: 'ajax',
            //         url: 'hrd/reportmatrixcompetency/read',
            //         method: 'POST',
            //         extraParams: {
            //             table: 'jobfamily'
            //         },
            //         reader: {
            //             type: 'json',
            //             root: 'data'
            //         }
            //     }
            // });

            // me.getPanel().down().getForm('[name=jobfamily_id]').items[].setStore(store);
            // console.log(me.getPanel().down().getForm('[name=jobfamily_id]').items);
                Ext.Ajax.request ({
                    url     : 'hrd/reportmatrixcompetency/read',
                    success : function(response) {},

                });
            }
        };

        newEvs['reportmatrixcompetencypanel button[action=print]'] = {
            click: function() {
                //me.mainPrint();
                me.processReport();
            }
        };

        this.control(newEvs);
    },    

    /*@implement this method for xyReport Class*/
    xyReportProcessParams: function(reportData) {
        var me      = this;
        var groupBy = reportData.params["Groupby"];
        var fn      = "CompetencyMatrix";
        var f       = me.getPanel().down().getForm().getFieldValues();
        var jfid    = f.jobfamily_id;
        
        var jobfamily = me.getPanel().down().getForm().findField("jobfamily_id").getRawValue();
        if (jfid > 0) {
            reportData.params["jobfamily_id"] = jfid;
            reportData.params["jobfamily"] = jobfamily;
        } else {
            reportData.params["jobfamily_id"] = 0;
            reportData.params["jobfamily"] = 'ALL';
        }

        reportData['file'] = fn;
        console.log(reportData);
        return reportData;
    },

    mainPrint: function() {
        var me = this;
        if (!me.xyReport) {
            me.xyReport = new Hrd.library.XyReport();
            me.xyReport.init(me);
        }

        me.xyReport.processReport();
    },
    
    // edit by Wulan 20201207
    processReport: function() {
        var me = this;

        var winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        var win = desktop.getWindow(winId);

        if (win) {
            var f = me.getPanel().down("form");
            var params = f.getForm().getFieldValues();
            var reportData = me.xyReportProcessParams({params: params, file: 'blank'});
            var reportFile = reportData.file;
            var html = me.generateFakeForm_v3(reportData.params, reportData.file); 
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
        }
    },
    generateFakeForm_v3: function (params, reportFile) {
        var form, x;
        form = '<form id="fakeReportFormID" action="resources/stimulsoftjsv3/viewer_hcms.php?reportfilelocation=' + reportFile + '.mrt&ver=1" target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
        for (x in params) {
            if (params[x] === null) {
                params[x] = '';
            }
            form += '<input type="hidden" name="' + x + '" value="' + params[x] + '">';
        }        
        form += '<input type="submit" value="post"></form>';
        form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
        return form;
    },
    instantWindow: function(panel, width, title, state, id, folder, panelConfig) {
        var me = this;
        var formtitle, formicon;

        var pc = typeof panelConfig === 'undefined' ? {} : panelConfig;

        title = typeof title == 'undefined' ? 'My Window' : title;
        id = typeof id == 'undefined' ? 'myInstantWindow' : id;
        state = typeof state == 'undefined' ? 'create' : state;
        panel = typeof panel == 'undefined' ? 'Panel' : panel;
        width = typeof width == 'undefined' ? 600 : width;
        formtitle = title;
        formicon = 'icon-form-add';
        var winId = id;
        var fd = typeof folder === "undefined" ? me.controllerName : folder;

        console.log('Hrd.view.' + fd + '.' + panel);


        var win = desktop.getWindow(winId);


        if (!win) {



            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: false,
                minimizable: false,
                maximizable: true,
                width: width,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                items: Ext.create('Hrd.view.' + fd + '.' + panel, pc),
                state: state
            });
        }
        win.show();

        return win;
    },
});