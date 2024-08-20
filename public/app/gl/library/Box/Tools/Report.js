Ext.define('Gl.library.box.tools.Report', {
    cName:null, // controller handler
    constructor: function(options) {
        Ext.apply(this, options || {});
    },
    getc: function() {
        return _Apps.getController(this.cName);
    },
    generateFakeForm: function(paramList, reportFile) {

        var form = '<form id="fakeReportFormID" action=' + document.URL + 'resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=' + reportFile + '.mrt" target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
        for (var x in paramList) {
            if (paramList[x] === null) {
                paramList[x] = '';
            }
            form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
        }
        form += '<input type="submit" value="post"></form>';
        form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
        return form;
    },
    processReport: function(form) {
        var me = this;

        var winId = 'myReportWindow';
        me.getc().instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        var win = desktop.getWindow(winId);

        if (win) {
            var f = form;
            var params = f.getForm().getFieldValues();
            var reportData = me.processParams({params: params, file: 'blank'});
            var reportFile = reportData.file;
            var html = me.generateFakeForm(reportData.params, reportData.file);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
        }
    },
    processParams: function(reportData) {
        return reportData;
    },
});