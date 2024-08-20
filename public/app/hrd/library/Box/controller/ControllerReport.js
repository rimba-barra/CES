Ext.define('Hrd.library.box.controller.ControllerReport', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Controllerreport',
    views: [], /* must override */
    refs: [], /* must override */
    controllerName: 'controllerreport',
    formWidth: 750,
    bindPrefixName: 'Controllerreport',
    requires:['Hrd.template.ComboBoxFields'],
    comboBoxFields:null,
    _moduleName:'Hrd',
    constructor: function(configs) {
        var me = this;
        var refs = [
            {
                ref: 'panel',
                selector: me.controllerName + 'panel'
            }


        ];
        me.refs = refs;


        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);

        this.callParent(arguments);
    },
    localStore: {
        detail: null
    },
    init: function(application) {
        this.callParent(arguments);
        var me = this;
        var panel = me.controllerName + 'panel';
        var events = {};
        events[panel] = {
            beforerender: me.mainPanelBeforeRender,
            afterrender: me.panelAfterRender
        };
        //'tjjtreportformdata button[action=process]':
        events[panel+' form button[action=view]'] = {
            click: function() {
                me.processReport();
            }
        };
        
        events[panel+' form [name=department_id]'] = {
            select: function(el,val) {
        
            }
        };
       

        this.control(events); /* must override*/
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});

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
    fieldGetDisplayValue: function(name) {
        var me = this;
        var el = me.getPanel().down("form").down("[name=" + name + "]");
        if(el){
            return el.getValue() == null ? "ALL" : el.getDisplayValue();
        }
        return "ALL";
    },
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
                items: Ext.create(me._moduleName+'.view.' + controllerFolder + '.' + panel),
                state: state
            });
        }
        win.show();
    },
    panelAfterRender: function(el) {
        var me = this;

        //me.getPanel().up("window").body.mask("Loading...");
        me.getForm().setLoading("Loading...");
        

        me.tools.ajax({
            params: {},
            success: function(data) {
                
                me.zendInitLoadedDefault(data);
                me.zendInitLoaded(data);
                me.getForm().setLoading(false);
            }
        }).read('init');
        
        me.comboBoxFields = new Hrd.template.ComboBoxFields();

    },
    zendInitLoadedDefault: function(data) {
        var me = this;
        var f = me.getPanel().down("form");
        f.down("#btnSearch").setDisabled(false);
        
        
         
        f.down("[name=project_name]").setValue(data.project.data.name);
        f.down("[name=project_project_id]").setValue(data.project.data.project_id);
        f.down("[name=pt_name]").setValue(data.pt.data.name);
        f.down("[name=pt_pt_id]").setValue(data.pt.data.pt_id);
        
        
      //  me.zendAddParams(data);
    },
    /*@added 24 Maret 2014*/
    zendAddParams: function(data) {
        var me = this;
    },
    /* must override */
    processParams: function(reportData) {
        return reportData;
    },
    /*must override*/
    zendInitLoaded: function(data) {

    },
    getComboboxText: function(name) {
        var me = this;
        var f = me.getFormdata();
        var text = me.getFormdata().down("[name=" + name + "]").getSelectedText();
        if (text) {
            return text;
        }
        return "ALL"

    },
    getSelectedRadio: function(idElement) {
        var me = this;
        var f = me.getFormdata();
        var checked = f.down("#" + idElement).getChecked();
        var hasil = {
            getValue: function() {
                return checked[0].inputValue;
            },
            getText: function() {
                return checked[0].boxLabel;
            }
        };
        return hasil;
    },
    getForm: function() {
        return this.getPanel().down("form");
    },
    hideAllFilters:function(){
        var me = this;
        var container = me.getForm().down("#filterContainerID");
        var items = container.items.items;
        for (var i in items) {
            items[i].hide();
        }
    },    
    
    processReport: function() {
        var me = this;

        var winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        var win = desktop.getWindow(winId);

        if (win) {
            var f = me.getPanel().down("form");
            var params = f.getForm().getFieldValues();
            var reportData = me.processParams({params: params, file: 'blank'});
            var reportFile = reportData.file;
            //var html = me.generateFakeForm(reportData.params, reportData.file);
            var html = me.generateFakeForm_v3(reportData.params, reportData.file); // edit by Wulan 20201126
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
        }
    },
    // edit by Wulan 20201126
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
    // end edit by Wulan 20201126

});