Ext.define('Cashier.library.XyReportB', {
    controller: null,
    params: {},
    init: function (controller) {
        this.controller = controller;
    },
    /* start added by ahmad riadi 06-02-2017 */
    Reportviewerjs: function (paramList, reportFile) {
        var form, x;
        var form = '<form id="fakeReportFormID" action=' + document.URL + 'resources/stimulsoftjsv2/viewer.php?reportfilelocation=' + reportFile + '.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
        for (x in paramList) {
            if (paramList[x] === null) {
                paramList[x] = '';
            }
            form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
        }
        form += '<input type="submit" value="post"></form>';
        form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
        return form;
    },
    ReportviewerjsWithDirectPrint: function (paramList, reportFile) {
        var form, x;
        var form = '<form id="fakeReportFormID" action=' + document.URL + 'resources/stimulsoftjsv2/viewer_report_with_direct_print.php?reportfilelocation=' + reportFile + '.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
        for (x in paramList) {
            if (paramList[x] === null) {
                paramList[x] = '';
            }
            form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
        }
        form += '<input type="submit" value="post"></form>';
        form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
        return form;
    },
    ReportviewerjsByuser: function (paramList, reportFile) {
        var form, x;
        var form = '<form id="fakeReportFormID" action=' + document.URL + 'resources/stimulsoftjsv2/viewer_user.php?reportfilelocation=' + reportFile + '.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
        for (x in paramList) {
            if (paramList[x] === null) {
                paramList[x] = '';
            }
            form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
        }
        form += '<input type="submit" value="post"></form>';
        form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
        return form;
    },
    ReportviewerjsByuserKwit: function (paramList, reportFile) {
        var form, x;
        var form = '<form id="fakeReportFormID" action=' + document.URL + 'resources/stimulsoftjsv2/viewer_user_kwitansivcr.php?reportfilelocation=' + reportFile + '.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
        for (x in paramList) {
            if (paramList[x] === null) {
                paramList[x] = '';
            }
            form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
        }
        form += '<input type="submit" value="post"></form>';
        form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
        return form;
    },
    /* end added by ahmad riadi 06-02-2017 */
    generateFakeForm: function (paramList, reportFile) {

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
    fieldGetDisplayValue: function (name) {
        var me = this.controller;
        return me.getFormdata().down("[name=" + name + "]").getValue() == null ? "ALL" : me.getFormdata().down("[name=" + name + "]").getDisplayValue();
    },
    processReport: function (afterShowFormFunc) {
        var me = this;
        // instantWindow: function(panel, width, title, state, id, controller, minimize = FALSE) {
        var winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        var win = desktop.getWindow(winId);
        if (win) {
            var params = me.params;
            var reportData = me.controller.xyReportProcessParams({params: params, file: 'blank'});
            var reportFile = reportData.file;
            var html = me.generateFakeForm(reportData.params, reportData.file);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
            if (typeof afterShowFormFunc === "function") {
                afterShowFormFunc();
            }
        }
    },
    processReportJs: function (afterShowFormFunc) {
        var me = this;
        var winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        var win = desktop.getWindow(winId);
        if (win) {
            var params = me.params;
            var reportData = me.controller.xyReportProcessParams({params: params, file: 'blank'});
            var reportFile = reportData.file;
            var html = me.Reportviewerjs(reportData.params, reportData.file);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
            if (typeof afterShowFormFunc === "function") {
                afterShowFormFunc();
            }
        }
    },
    processReportJsWithDirectPrint: function (afterShowFormFunc) {
        var me = this;
        var winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        var win = desktop.getWindow(winId);
        if (win) {
            var params = me.params;
            var reportData = me.controller.xyReportProcessParams({params: params, file: 'blank'});
            var reportFile = reportData.file;
            var html = me.ReportviewerjsWithDirectPrint(reportData.params, reportData.file);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
            if (typeof afterShowFormFunc === "function") {
                afterShowFormFunc();
            }
        }
    },
    processReportJsv3: function (winId, width, title, controller, printType, afterShowFormFunc) {

        /*
            Print Type : 
            0 => Single Page
            1 => Whole Page
            2 => Format KP
        */

        var me = this;
        me.instantWindowWithMinimize('Panel', width, title, 'state-report', winId, controller);
        var win = desktop.getWindow(winId);
        if (win) {
            var params = me.params;
            var reportData = me.controller.xyReportProcessParams({params: params, file: 'blank'});
            var reportFile = reportData.file;
            var html = me.Reportviewerjscustomv2(reportData.params, reportData.file, winId, printType);
            win.down("#MyReportPanel_" + winId).body.setHTML(html);
            $("#Reportform_" + winId).submit();
            if (typeof afterShowFormFunc === "function") {
                afterShowFormFunc();
            }
        }
    },
    processReportJsWholePage: function (afterShowFormFunc) {
        var me = this;
        var winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        var win = desktop.getWindow(winId);
        if (win) {
            var params = me.params;
            var reportData = me.controller.xyReportProcessParams({params: params, file: 'blank'});
            var reportFile = reportData.file;
            var html = me.Reportviewerjswholepage(reportData.params, reportData.file);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
            if (typeof afterShowFormFunc === "function") {
                afterShowFormFunc();
            }
        }
    },
    processReportJsVcr: function (afterShowFormFunc,reportFileName) {
        var me = this;
        var winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        var win = desktop.getWindow(winId);
        if (win) {
            var params = me.params;
            var reportData = me.controller.xyReportProcessParams({params: params, file: 'blank'});
            var reportFile = reportData.file;
            var html = me.Reportviewerjs(reportData.params,reportFileName);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
            if (typeof afterShowFormFunc === "function") {
                afterShowFormFunc();
            }
        }
    },
    processReportJsbyUser: function (afterShowFormFunc) {
        var me = this;
        var winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        var win = desktop.getWindow(winId);
        if (win) {
            var params = me.params;
            var reportData = me.controller.xyReportProcessParams({params: params, file: 'blank'});
            var reportFile = reportData.file;
            var html = me.ReportviewerjsByuser(reportData.params, reportData.file);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
            if (typeof afterShowFormFunc === "function") {
                afterShowFormFunc();
            }
        }
    },
    processReportJsbyUserKwit: function (afterShowFormFunc) {
        var me = this;
        var winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        var win = desktop.getWindow(winId);
        if (win) {
            var params = me.params;
            var reportData = me.controller.xyReportProcessParams({params: params, file: 'blank'});
            var reportFile = reportData.file;
            var html = me.ReportviewerjsByuserKwit(reportData.params, reportData.file);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
            if (typeof afterShowFormFunc === "function") {
                afterShowFormFunc();
            }
        }
    },
    instantWindow: function (panel, width, title, state, id, controller, minimize, fullscreen) {
        var me = this.controller;
        var formtitle, formicon;
        title = typeof title == 'undefined' ? 'My Window' : title;
        id = typeof id == 'undefined' ? 'myInstantWindow' : id;
        state = typeof state == 'undefined' ? 'create' : state;
        panel = typeof panel == 'undefined' ? 'Panel' : panel;
        width = typeof width == 'undefined' ? 600 : width;
        var controllerFolder = typeof controller === 'undefined' ? me.controllerName : controller;
        formtitle = title;
        formicon = 'icon-form-add';
        var winId = id;
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: false,
                minimizable: minimize,
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
                maximized: fullscreen,
                items: Ext.create('Cashier.view.' + controllerFolder + '.' + panel),
                state: state
            });
        }
        win.show();
    },
    instantWindowv2: function (panel, width, title, state, id, controller, minimize, fullscreen) {
        var me = this.controller;
        var formtitle, formicon;
        title = typeof title == 'undefined' ? 'My Window' : title;
        id = typeof id == 'undefined' ? 'myInstantWindow' : id;
        state = typeof state == 'undefined' ? 'create' : state;
        panel = typeof panel == 'undefined' ? 'Panel' : panel;
        width = typeof width == 'undefined' ? 600 : width;
        var controllerFolder = typeof controller === 'undefined' ? me.controllerName : controller;
        formtitle = title;
        formicon = 'icon-form-add';
        var winId = id;
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: false,
                minimizable: minimize,
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
                maximized: fullscreen,
                items: Ext.create('Cashier.view.' + controllerFolder + '.' + panel),
                state: state,
                listeners: {
                    beforeclose: function (win) {
                        Ext.Msg.show({
                            title: 'Info',
                            msg: 'Are you sure to close editor?',
                            icon: Ext.Msg.INFO,
                            buttons: Ext.Msg.YESNO,
                            fn: function (clicked) {

                                if (clicked === "yes") {
                                    win.doClose();
                                }
                                if (clicked === "no") {
                                    return false;
                                }
                            }
                        });
                        return false;
                    }
                },
            });
        }
        win.show();
    },
    instantWindowWithMinimize: function (panel, width, title, state, id, controller) {
        var me = this;
        var formtitle, formicon;
        title = typeof title == 'undefined' ? 'My Window' : title;
        id = typeof id == 'undefined' ? 'myInstantWindow' : id;
        state = typeof state == 'undefined' ? 'create' : state;
        panel = typeof panel == 'undefined' ? 'Panel' : panel;
        width = typeof width == 'undefined' ? 600 : width;
        // var controllerFolder = typeof controller === 'undefined' ? me.controllerName : controller;
        formtitle = title;
        formicon = 'icon-window-default';
        var winId = id;
        var win = desktop.getWindow(winId);
        var length = $('.'+controller).length + 1;
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: formtitle + (length > 1 ? ' ('+length+')' : ''),
                iconCls: formicon,
                resizable: true,
                minimizable: true,
                maximizable: true,
                width: width,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                taskbarButton: true,
                modal: false,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                items: Ext.create('Ext.panel.Panel', {
                    height:500,
                    layout:'fit',
                    id:'MyReportPanel_' + id,
                    bodyCls: controller,
                    html:'Report Panel'
                }), 
                state: state
            });
        }
        win.show();
    },
    processReportJsv2: function (afterShowFormFunc) {
        var me = this;
        var winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport', true, true);
        var win = desktop.getWindow(winId);
        if (win) {
            var params = me.params;
            var reportData = me.controller.xyReportProcessParams({params: params, file: 'blank'});
            var reportFile = reportData.file;
            var html = me.Reportviewerjscustom(reportData.params, reportData.file, reportData.folder);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
            if (typeof afterShowFormFunc === "function") {
                afterShowFormFunc();
            }
        }
    },
    Reportviewerjscustom: function (paramList, reportFile, reportFolder) {
        var form, x;
        var form = '<form id="fakeReportFormID" action=' + document.URL + 'resources/stimulsoftjsv2/designerCustom.php?reportfolder=' + reportFolder + '&reportfilelocation=' + reportFile + ' target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
        for (x in paramList) {
            if (paramList[x] === null) {
                paramList[x] = '';
            }
            form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
        }
        form += '<input type="submit" value="post"></form>';
        form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
        return form;
    },
    Reportviewerjscustomv2: function (paramList, reportFile, formId, printType = 0) {
        var form, x;
        var reportGeneratorFile = '';

        if (printType == 1) {
            reportGeneratorFile = 'stimulsoftjsv2/viewer_wholepage.php';
        } else if (printType == 2) {
            reportGeneratorFile = 'stimulsoftjsv3/viewerkp.php';
        } else {
            reportGeneratorFile = 'stimulsoftjsv2/viewer.php';
        } 

        form = '<form id="Reportform_'+formId+'" action="'+ document.URL +'resources/'+reportGeneratorFile+'?reportfilelocation=' + reportFile + '.mrt" target="my-iframe-'+formId+'" method="post" style="visibility:hidden;height:0;width:0">';
        for (x in paramList) {
            if (paramList[x] === null) {
                paramList[x] = '';
            }
            form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
        }
        form += '<input type="submit" value="post"></form>';
        form += '<iframe name="my-iframe-'+formId+'" style="height:100%;width:100%;"></iframe>';
        return form;
    },
    Reportviewerjswholepage: function (paramList, reportFile) {
        var form, x;
        var form = '<form id="fakeReportFormID" action=' + document.URL + 'resources/stimulsoftjsv2/viewer_wholepage.php?reportfilelocation='  + reportFile + '.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
        for (x in paramList) {
            if (paramList[x] === null) {
                paramList[x] = '';
            }
            form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
        }
        form += '<input type="submit" value="post"></form>';
        form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
        return form;
    },
    ReportviewerjsByuserV3: function (paramList, reportFile) {
        var form, x;
        var form = '<form id="fakeReportFormID" action=' + document.URL + 'resources/stimulsoftjsv3/viewer_user.php?reportfilelocation=' + reportFile + '.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
        for (x in paramList) {
            if (paramList[x] === null) {
                paramList[x] = '';
            }
            form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
        }
        form += '<input type="submit" value="post"></form>';
        form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
        return form;
    },
    processReportJsbyUser3: function (afterShowFormFunc) {
        var me = this;
        var winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        var win = desktop.getWindow(winId);
        if (win) {
            var params = me.params;
            var reportData = me.controller.xyReportProcessParams({params: params, file: 'blank'});
            var reportFile = reportData.file;
            var html = me.ReportviewerjsByuserV3(reportData.params, reportData.file);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
            if (typeof afterShowFormFunc === "function") {
                afterShowFormFunc();
            }
        }
    },
    processReportKP: function (afterShowFormFunc) {
        var me = this;
        var winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        var win = desktop.getWindow(winId);
        if (win) {
            var params = me.params;
            var reportData = me.controller.xyReportProcessParams({params: params, file: 'blank'});
            var reportFile = reportData.file;
            var html = me.Reportviewerjskperems(reportData.params, reportData.file);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
            if (typeof afterShowFormFunc === "function") {
                afterShowFormFunc();
            }
        }
    },
    Reportviewerjskperems: function (paramList, reportFile) {
        var form, x;
        var form = '<form id="fakeReportFormID" action=' + document.URL + 'resources/stimulsoftjsv3/viewerkp.php?reportfilelocation=' + reportFile + '.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
        for (x in paramList) {
            if (paramList[x] === null) {
                paramList[x] = '';
            }
            form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
        }
        form += '<input type="submit" value="post"></form>';
        form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
        return form;
    },
});