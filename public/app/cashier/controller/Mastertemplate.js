Ext.define('Cashier.controller.Mastertemplate', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Mastertemplate',
    requires: ['Cashier.library.XyReportB'],
    refs: [
        {
            ref: 'panel',
            selector: 'mastertemplatepanel'
        },
        {
            ref: 'grid',
            selector: 'mastertemplategrid'
        },
        {
            ref: 'formdata',
            selector: 'mastertemplateformdata'
        },
        {
            ref: 'formsearch',
            selector: 'mastertemplateformsearch'
        },
    ],
    controllerName: 'mastertemplate',
    fieldName: 'coa',
    year: null,
    ptId: 0,
    folderName: null,
    xyReport: null,
    reportFileName: null,
    bindPrefixName: 'MasterTemplate',
    formxWinId: 'win-mastertemplatewinId',
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });
    },
    init: function () {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
        this.control({
            'mastertemplatepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    var f = me.getFormdata();
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(245);
                    me.panelAfterRender(panel);
                    panel.up("panel").setWidth(300);
                    // panel.up("window").setHeight(228);
                    // panel.up("panel").setHeight(200);
                },
            },
            'mastertemplateformdata [action=select]': {
                click: function () {
                    me.mainPrint();
                }
            },
            'mastertemplateformdata [name=template_id]': {
                change: function (v) {
                    if (v.value) {
                        var f = me.getFormdata();
                        me.checkTemplate(v.value);
                    }

                }
            },
            'mastertemplateformdata [name=project_id]': {
                change: function (v) {
                    var f = me.getFormdata();
                    if (v.value) {
                        me.project_id = v.value;
                        var pt = f.down("[name=pt_id]").getStore();
                        pt.clearFilter();
                        pt.filter('project_project_id', v.value, true, false);
                        if(v.value==apps.project){
                            f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                        }else{
                            f.down("[name=pt_id]").setValue('');
                        }
                    }
                }
            },
            'mastertemplateformdata [name=pt_id]': {
                change: function (el) {
                    var value = el.value;
                    me.pt_id = value;
//                    me.setprojectpt(el.name, el.ownerCt, 'project_id');
                }
            },
//            'mastertemplateformdata [name=project_id]': {
//                select: function (e) {
//                    var f = me.getFormdata();
//
//                    if (e.value) {
//
//                        // getCustomRequestComboboxModuleV2: function (module,paramname, val, field, model, submodel, form, param, callback,loading) {
//                        me.getCustomRequestComboboxModuleV2('global', 'getclusterbyproject', e.value, 'cluster_id', 'clusterb', '', f, '', function () {
//                           
//                        }, true);
//                    }
//                }
//            },
        });
    },
    formDataAfterRender: function (el) { //fdar
        var state = el.up('window').state;
        var wid = el.up('window').id;
        var me = this;
        var f = me.getFormdata();
        me.fdar().init();
        me.detailFdar();

    },
    detailFdar: function () {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormdata();

        p.setLoading("Please wait");
        me.tools.ajax({
            params: {module: me.controllerName},
            form: f,
            success: function (data, model) {

                try {
                    
                    me.tools.weseav2(data.project, f.down("[name=project_id]")).comboBox('', function () {
                        f.down("[name=project_id]").setValue(parseInt(apps.project));
                    });
                    me.tools.weseav2(data.pt, f.down("[name=pt_id]")).comboBox('', function () {
                        var combostore = f.down('[name=pt_id]').getStore();
                        var record = combostore.findRecord('pt_id', parseInt(apps.pt),0,false,true,true);
                        if (record) {
                            f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                        }
                    });
                    //getCustomRequestComboboxModuleV2: function (module, paramname, val, field, model, submodel, form, param, callback, cache ) {
                    me.getCustomRequestComboboxModuleV2('global', 'gettemplate', '', 'template_id', 'template', '', f);

                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");

                }

                p.setLoading(false);
            }
        }).read('init');
    },
    mainPrint: function () {
        var me = this;
        var f = me.getFormdata();

        if (f.getForm().isValid()) {
            if (!me.xyReport) {
                me.xyReport = new Cashier.library.XyReportB();
                me.xyReport.init(me);
            }
            me.xyReport.processReportJsv2();
        }
    },
    xyReportProcessParams: function (reportData) {
        var me = this;
        var fn = me.reportFileName;
        var f = me.getFormdata();
        var pt_id = f.down("[name=pt_id]").getValue();
        var template_id = f.down("[name=template_id]").getValue();
        reportData['file'] = fn;
        reportData['folder'] = me.folderName;
        reportData.params["pt_id"] = pt_id;
        reportData.params['project_id'] = me.project_id;
        return reportData;
    },
    checkTemplate: function (template_id) {
        var me = this;
        var f = me.getFormdata();
        var pt_id = f.down("[name=pt_id]").getValue();
        f.setLoading("Please wait");
        me.tools.ajax({
            params: {
                module: me.controllerName,
                template_id: template_id,
                project_id: me.project_id,
                pt_id: pt_id,
            },
            form: f,
            success: function (data, model) {

                try {
                    if (data.templatedetail_id) {
                        me.reportFileName = data.templatedetail_id + '.mrt';
                        f.down('[action=select]').setDisabled(false);
                    }
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to process.");

                }

                f.setLoading(false);
            }
        }).read('checktemplate');
    }

});
