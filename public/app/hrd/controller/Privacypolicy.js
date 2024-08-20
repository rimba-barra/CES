Ext.define('Hrd.controller.Privacypolicy', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Privacypolicy',
    controllerName: 'privacypolicy',
    fieldName: 'privacypolicy_id',
    fieldNameForDeleted: 'privacypolicy', 
    bindPrefixName: 'Privacypolicy',
    
    init: function() {
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
        var newEvs = {};

        newEvs['privacypolicygrid [action=view]'] = {
            click: function() {
               me.Processdata();
            }
        };     
        
        this.control(newEvs);
    },
    fdar: function() {

        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        me.setActiveForm(f);

        var x = {
            init: function() {
                me.fdarInit();
            },
        };
        return x;
    },
    processParams: function(reportData) {
        return reportData;
    },
    Processdata: function() {
        var me = this;

        var winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        var win = desktop.getWindow(winId);

        if (win) {
            console.log(me.getGrid().getSelectionModel().getSelection());
            // var f = me.getPanel().down("form");
            var params = me.getGrid().getSelectionModel().getSelection()[0]["data"];
            var reportData = me.processParams({params: params, file: 'PrivacyPolicy'});
            var reportFile = reportData.file;
            //var html = me.generateFakeForm(reportData.params, reportData.file);
            var html = me.generateFakeForm_v3(reportData.params, reportData.file); // edit by Wulan 20201126
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

});