Ext.define('Cashier.controller.Cashbankpositionreport', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Prefixcombobox',
        'Cashier.library.template.combobox.Coacombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Banktypecombobox',
        'Cashier.library.template.combobox.Paymentmethodcombobox',
        'Cashier.library.template.combobox.Banktypecombobox',
        'Cashier.library.template.combobox.Consolidationcombobox'
    ],
    alias: 'controller.cashbankpositionreport',
    views: [
        'cashbankpositionreport.FormData',
        'cashbankpositionreport.Panel'
    ],
    stores: [
        'Project',
        'Pt',
        'Prefixcombo',
        'Coa',
        'Paymentmethod',
        'Department',
        'Masterbanktype',
        'Consolidation'
    ],
    models: [
        'Project',
        'Pt',
        'Prefix',
        'Coa',
        'Department',
        'Masterbanktype',
        'Paymentmethod',
        'Consolidation'
    ],
    refs: [
        { ref: 'formdata', selector: 'cashbankpositionreportformdata' },
        { ref: 'formemail', selector: 'cashbankpositionreportformemail' },
        { ref: 'panel', selector: 'cashbankpositionreportpanel' }
    ],
    controllerName: 'cashbankpositionreport',
    bindPrefixName: 'Cashbankpositionreport',
    win: null,
    winId: null,
    init: function(application) {
        var me = this;
        this.control({
            'cashbankpositionreportpanel': {
                beforerender: me.mainPanelBeforeRender
            },
            'cashbankpositionreportformdata': {
                afterrender: function() {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(970);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(630);

                    var fd = me.getFormdata();
                    Ext.getCmp("fieldconsolidationid").setVisible(false);

                    me.loadDataProject();
                    me.loadDataPaymentMethod();
                    me.loadDataBankType();
                    me.loadDataGroupKonsol();
                }
            },
            'cashbankpositionreportformdata [name=project_id]': {
                change: function() {
                    var fd = me.getFormdata();
                    var project_id = fd.down("[name=project_id]").getValue();

                    me.loadDataPt(project_id);
                }
            },
            'cashbankpositionreportformdata [name=bykonsol]': {
                change: function (el, newValue, oldValue, eOpts) {
                    var fd = me.getFormdata();
                    if (newValue === true) {
                        Ext.getCmp("fieldconsolidationid").setVisible(true);
                        Ext.getCmp("fieldprojectid").setVisible(false);
                        Ext.getCmp("fieldptid").setVisible(false);
                        // fd.down("[name=consolidation_id]").setVisible(true);
                        // fd.down("[name=project_id]").setVisible(false);
                        fd.down("[name=project_id]").setValue('');
                        // fd.down("[name=pt_id]").setVisible(false);
                        fd.down("[name=pt_id]").setValue('');

                        fd.down("[name=consolidation_id]").allowBlank = false;
                        fd.down("[name=project_id]").allowBlank = true;
                        fd.down("[name=pt_id]").allowBlank = true;
                        fd.down("[name=coa_from]").setValue("10.00.000");
                        fd.down("[name=coa_from]").setReadOnly(true);
                        fd.down("[name=coa_until]").setValue("99.99.999");
                        fd.down("[name=coa_until]").setReadOnly(true);
                    } else {
                        Ext.getCmp("fieldconsolidationid").setVisible(false);
                        Ext.getCmp("fieldprojectid").setVisible(true);
                        Ext.getCmp("fieldptid").setVisible(true);

                        // fd.down("[name=consolidation_id]").setVisible(false);
                        fd.down("[name=consolidation_id]").setValue('');
                        // fd.down("[name=project_id]").setVisible(true);
                        fd.down("[name=project_id]").setValue(parseInt(apps.project));
                        // fd.down("[name=pt_id]").setVisible(true);
                        fd.down("[name=pt_id]").setValue(parseInt(apps.pt));

                        fd.down("[name=consolidation_id]").allowBlank = true;
                        fd.down("[name=pt_id]").allowBlank = false;
                        fd.down("[name=project_id]").allowBlank = false;
                        fd.down("[name=coa_from]").setReadOnly(false);
                        fd.down("[name=coa_until]").setReadOnly(false);
                        me.loadDataCoa();
                    }
                }
            },
            'cashbankpositionreportformdata [name=pt_id]': {
                change: function() {
                    var fd = me.getFormdata();
                    var project_id = fd.down("[name=project_id]").getValue();
                    var pt_id = fd.down("[name=pt_id]").getValue();

                    me.loadDataPrefix();
                    me.loadDataCoa();
                    me.loadDataDepartment(project_id, pt_id);
                }
            },
            'cashbankpositionreportformdata [name=type_report_all]': {
                change: function(el, newValue, oldValue, eOpts) {
                    var fd = me.getFormdata();
                    if (newValue == true) {
                        fd.down("[name=type_report]").setValue("");
                    } else {
                        var store = fd.down("[name=type_report]").getStore();
                        var defaultparam = store.getAt(0).data.param;
                        fd.down("[name=type_report]").setValue(defaultparam);
                    }
                }
            },
            'cashbankpositionreportformdata [name=prefix_all]': {
                change: function(el, newValue, oldValue, eOpts) {
                    var fd = me.getFormdata();
                    if (newValue == true) {
                        fd.down("[name=prefix_id]").setValue("");
                    } else {
                        var store = fd.down("[name=prefix_id]").getStore();
                        var defaultparam = store.getAt(0).data.prefix_id;
                        fd.down("[name=prefix_id]").setValue(defaultparam);
                    }
                }
            },
            'cashbankpositionreportformdata [name=paymenttype_all]': {
                change: function(el, newValue, oldValue, eOpts) {
                    var fd = me.getFormdata();
                    if (newValue == true) {
                        fd.down("[name=paymentmethod_id]").setValue("");
                    } else {
                        var store = fd.down("[name=paymentmethod_id]").getStore();
                        var defaultparam = store.getAt(0).data.paymentmethod_id;
                        fd.down("[name=paymentmethod_id]").setValue(defaultparam);
                    }
                }
            },
            'cashbankpositionreportformdata [name=department_all]': {
                change: function(el, newValue, oldValue, eOpts) {
                    var fd = me.getFormdata();
                    if (newValue == true) {
                        fd.down("[name=department_id]").setValue("");
                    } else {
                        var store = fd.down("[name=department_id]").getStore();
                        var defaultparam = store.getAt(0).data.department_id;
                        fd.down("[name=department_id]").setValue(defaultparam);
                    }
                }
            },
            'cashbankpositionreportformdata [name=banktype_all]': {
                change: function(el, newValue, oldValue, eOpts) {
                    var fd = me.getFormdata();
                    if (newValue == true) {
                        fd.down("[name=banktype_id]").setValue("");
                    } else {
                        var store = fd.down("[name=banktype_id]").getStore();
                        var defaultparam = store.getAt(0).data.banktype_id;
                        fd.down("[name=banktype_id]").setValue(defaultparam);
                    }
                }
            },
            'cashbankpositionreportformdata [name=format]': {
                select: function(combo, record) {
                    var me = this;
                    var fd = me.getFormdata();
                    if (combo.value == "EMAIL TO DIRECTOR") {
                        fd.down("[name=notes]").setVisible(true);
                    } else {
                        fd.down("[name=notes]").setVisible(false);
                    }
                }
            },
            'cashbankpositionreportformdata [action=submit]': {
                click: function() {
                    var me = this;
                    var f  = me.getFormdata();
                    var format = f.down("[name=format]").getValue();

                    var formatExcel = ['EXCEL', 'EXCEL - SUMMARY ONLY', 'EXCEL - SUMMARY ONLY BY PROJECT'];
                    var formatEmail = ['EMAIL TO DIRECTOR', 'EMAIL TO DIRECTOR - BY PROJECT'];

                    if (formatExcel.indexOf(format) !== -1) {
                        me.generateReport();
                    } else {
                        me.emailtodir();
                    }
                }
            },
            'cashbankpositionreportformemail [action=send]': {
                click: me.sendEmail
            }
        })
    },
    loadDataGroupKonsol: function () {
        var me = this;
        var fd = me.getFormdata();
        
        fd.down("[name=consolidation_id]").getStore().load({
            params: {
                'hideparam': 'consolidationcombo'
            }
        });
    },
    loadDataProject: function() {
        var me = this;
        var fd = me.getFormdata();

        var store = fd.down("[name=project_id]").getStore();
        store.getProxy().setExtraParam('hideparam', 'getptbyuser');
        store.load({
            callback: function() {

                fd.down("[name=project_id]").setValue(parseInt(apps.project));

                me.loadDataPt(parseInt(apps.project));
            }
        });
    },
    loadDataPt: function(project_id) {
        var me = this;
        var fd = me.getFormdata();

        var store = fd.down("[name=pt_id]").getStore();
        store.getProxy().setExtraParam('hideparam', 'getptbyuser');
        store.getProxy().setExtraParam('project_id', project_id);
        store.getProxy().setExtraParam('user_id', parseInt(apps.uid));
        store.clearFilter();
        store.filter(function(rec) {
            if (rec.get('project_id') == project_id) {
                return true;
            } else {
                return false;
            }
        })
        store.load({
            callback: function(records, operation, success) {
                if (project_id == parseInt(apps.project)) {
                    fd.down("[name=pt_id]").setValue(parseInt(apps.pt));
                } else {
                    store.each(function(rec,idx){
                        if (idx == 0) {
                            fd.down("[name=pt_id]").setValue(rec.get('pt_id'));
                        }
                    });
                }
            }
        });
    },
    loadDataPrefix: function() {
        var me = this;
        var fd = me.getFormdata();
        var store = fd.down("[name=prefix_id]").getStore();
        store.getProxy().setExtraParam('project_id', fd.down("[name=project_id]").getValue());
        store.getProxy().setExtraParam('pt_id', fd.down("[name=pt_id]").getValue());
        store.load();
    },
    loadDataCoa: function() {
        var me = this;
        var fd = me.getFormdata();
        var store = me.getStore('Coa');
        store.getProxy().setExtraParam('project_id', fd.down("[name=project_id]").getValue());
        store.getProxy().setExtraParam('pt_id', fd.down("[name=pt_id]").getValue());
        store.load({
            callback: function(records) {
                store.each(function(rec,idx){
                    if (idx == 0) {
                        fd.down("[name=coa_from]").setValue(rec.get('coa_id'));
                    } else if (idx == (store.getCount() - 1)) {
                        fd.down("[name=coa_until]").setValue(rec.get('coa_id'));
                    }
                });
            }
        });
    },
    loadDataPaymentMethod: function() {
        var me = this;
        var fd = me.getFormdata();
        var store = fd.down("[name=paymentmethod_id]").getStore();

        store.load();
    },
    loadDataDepartment: function(project_id, pt_id) {
        var me = this;
        var fd = me.getFormdata();
        var store = fd.down("[name=department_id]").getStore();

        store.getProxy().setExtraParam('hideparam', 'getdepartmentbyuser');
        store.getProxy().setExtraParam('project_id', project_id);
        store.getProxy().setExtraParam('pt_id', pt_id);
        store.load();
    },
    loadDataBankType: function() {
        var me = this;
        var fd = me.getFormdata();
        var store = fd.down("[name=banktype_id]").getStore();

        store.load();
    },
    generateReport: function() {
        var me = this;
        me.getFormdata().down("[name=hideparam]").setValue('default'); // added on april 2016, ahmad riadi     

        var getform = me.getFormdata();
        var form = getform.getForm();

        //console.log(form.getValues());
        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }

        var vp = me.validationProcess();
        var vps = false; // validation prosess status
        if (typeof vp === 'object') {
            vps = vp.status;
            if (!vps) {

                Ext.MessageBox.alert('Alert', vp.msg, function () {
                    var x = me.getFormdata().down('[name=' + vp.field + ']');
                    if (x !== null) {
                        x.markInvalid(vp.msg);
                        x.focus();
                    }

                });
            }
        } else if (typeof vp === 'boolean') {
            vps = vp;
        }


        if (form.isValid() && vps) {
            var fida = me.getFinalData(form.getValues());
            fida.pt_name = getform.down("[name=pt_id]").getRawValue();
            fida.project_name = getform.down("[name=project_id]").getRawValue();
            fida.userprint = apps.username;
            fida.prefix = getform.down("[name=prefix_id]").getRawValue();
            fida.prefix_id = getform.down("[name=prefix_id]").getValue();
            fida.type_report = getform.down("[name=type_report]").getValue();
            fida.paymentmethod_id = getform.down("[name=paymentmethod_id]").getValue();
            fida.banktype_id = getform.down("[name=banktype_id]").getValue();
            fida.department_id = getform.down("[name=department_id]").getValue();
            fida.coa_from = getform.down("[name=coa_from]").getRawValue();
            fida.coa_until = getform.down("[name=coa_until]").getRawValue();
            fida.consolidation_name = getform.down("[name=consolidation_id]").getRawValue();

            getform.setLoading("Please Wait...");
            Ext.Ajax.request({
                url: 'cashier/cashbankpositionreport/create',
                timeout: 300000,
                params: {
                    data: Ext.encode(fida)
                },
                success: function(response) {
                    getform.setLoading(false);
                    var info = Ext.JSON.decode(response.responseText);
                    var file_path = info.data.url;  
                    var a = document.createElement('A');
                    a.href = file_path;
                    a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            })
        }
    },
    emailtodir: function() {
        var me = this;
        var fd = me.getFormdata();
        var form = fd.getForm();
        var fida = me.getFinalData(form.getValues());
        fida.hideparam = 'getemailandsubject';
        fida.pt_name = fd.down("[name=pt_id]").getRawValue();
        fida.project_name = fd.down("[name=project_id]").getRawValue();
        fida.userprint = apps.username;
        fida.prefix = fd.down("[name=prefix_id]").getRawValue();
        fida.prefix_id = fd.down("[name=prefix_id]").getValue();
        fida.type_report = fd.down("[name=type_report]").getValue();
        fida.paymentmethod_id = fd.down("[name=paymentmethod_id]").getValue();
        fida.banktype_id = fd.down("[name=banktype_id]").getValue();
        fida.department_id = fd.down("[name=department_id]").getValue();
        fida.coa_from = fd.down("[name=coa_from]").getRawValue();
        fida.coa_until = fd.down("[name=coa_until]").getRawValue();
        fida.user_id = apps.uid;
        fida.consolidation_name = fd.down("[name=consolidation_id]").getRawValue();
        var win = '';

        fd.setLoading('Preparing email content...');
        Ext.Ajax.request({
            url: 'cashier/cashbankpositionreport/read',
            params: {
                data: Ext.encode(fida)
            },
            timeout: 30000000,
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                data = data['data'];

                fd.setLoading(false);
                Ext.create('Ext.window.Window', {
                    title: 'Email to Director',
                    height: 500,
                    width: 900,
                    maximized: true,
                    taskbarButton: true,
                    modal: false,
                    layout: 'fit',
                    items: Ext.create('Cashier.view.cashbankpositionreport.FormEmail'),
                    listeners: {
                        boxready: function () {

                            var fe = me.getFormemail();

                            if (fida.bykonsol == 1) {
                                fe.down("[name=subject]").setValue('Cashbank Report : '+fida.consolidation_name);
                            } else {
                                fe.down("[name=subject]").setValue(data.subject);
                            }
                            fe.down("[name=from]").setValue('laporankasbank@ciputra.com');
                            fe.down("[name=to]").setValue(data.to);
                            fe.down("[name=cc]").setValue(data.cc);
                            fe.down("[name=content]").setValue(data.html);
                        }
                    }
                }).show();
            }
        })
    },
    sendEmail: function() {

        var me = this;
        var fe = me.getFormemail();
        var fd = me.getFormdata();

        fe.setLoading("Sending email...");
        Ext.Ajax.request({
            url: 'cashier/cashbankpositionreport/sendemail',
            params: {
                data: Ext.encode({
                    hideparam: 'sendemailtodir',
                    from: fe.down("[name=from]").getValue(),
                    to: fe.down("[name=to]").getValue(),
                    cc: fe.down("[name=cc]").getValue(),
                    subject: fe.down("[name=subject]").getValue(),
                    content: fe.down("[name=content]").getValue(),
                    project_id: fd.down("[name=project_id]").getValue(),
                    pt_id: fd.down("[name=pt_id]").getValue(),
                    user_id: apps.uid,
                    notes: fd.down("[name=notes]").getValue()
                })
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                fe.setLoading(false);
                if (data.success == true) {
                    Ext.Msg.alert("Info", "Email has been sent.");
                } else {
                    Ext.Msg.alert("Error", "Email not sent. An error has occurred.");
                }
                me.win.close();
                return false;
            }
        })
    }
})