Ext.define('Erems.library.template.controller.Controllerstimulsoft', {
    extend: 'Erems.library.template.controller.Controller2',
	
	instantWindow: function(panel, width, title, state, id, controller) {
        var me = this;
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
                resizable: true,
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
                items: Ext.create('Erems.view.' + controllerFolder + '.' + panel),
                state: state
            });
        }
        win.show();
    },
	
	generateFakeForm:function(paramList,reportFile){		
        var form = '<form id="fakeReportFormID" action=resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key='+reportFile+'.mrt" target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
        for(var x in paramList){
            if(paramList[x]===null){
                paramList[x]='';
            }
            form +='<input type="hidden" name="'+x+'" value="'+paramList[x]+'">';
        }
        form +='<input type="submit" value="post"></form>';
        form +='<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
        return form;
    },
	
	generateReportParams: function(params) {
        var str = "";
        var me = this;
        for (var x in params) {
            if (me.getFormdata().down("[name=" + x + "]").reportParams) {
                params[x] = params[x] === null ? "" : params[x];
                str += x + "=" + params[x] + "&";
            }

        }
        return str;
    },
	
	generateFakeForm2:function(paramList,reportFile){		
		//var form = '<form id="fakeReportFormID" action=resources/stimulsoftjs/viewer.php?reportfilelocation='+reportFile+'.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
		var form = '<form id="fakeReportFormID" action=resources/stimulsoftjsv2/viewer.php?reportfilelocation='+reportFile+'.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
		for(var x in paramList){
            if(paramList[x]===null){
                paramList[x]='';
            }
            form +='<input type="hidden" name="'+x+'" value="'+paramList[x]+'">';
        }
        form +='<input type="submit" value="post"></form>';
        form +='<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
        return form;
    }
})