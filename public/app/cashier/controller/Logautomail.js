Ext.define('Cashier.controller.Logautomail', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Logautomail',
    requires: [
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Ptcombobox',
        'Cashier.library.template.combobox.Automailmodulecombobox',
         'Cashier.library.template.combobox.Automailtypecombobox',
        'Cashier.view.ptforcashbon.Gridbrowsept',
    ],
    views: [
        'logautomail.Panel',
        'logautomail.Grid',
        'logautomail.FormSearch',
        'logautomail.FormData',
    ],
    stores: [
        'Logautomail',
        'Ptbyuser',
        'Employee',
        'Department',
        'Project',
        'Pt',
        'Automailmodule',
         'Automailtype'
    ],
    models: [
        'Logautomail',
        'Ptforcashbon',
        'Project',
        'Pt',
        'Automailmodule',
         'Automailtype'
    ],
    refs: [
        {ref: 'grid', selector: 'logautomailgrid'},
        {ref: 'formsearch', selector: 'logautomailformsearch'},
        {ref: 'formdata', selector: 'logautomailformdata'},
    ],
    controllerName: 'logautomail',
    fieldName: 'employee_name',
    bindPrefixName: 'Logautomail',
    rowproject: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'logautomailpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'logautomailgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'logautomailgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'logautomailgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'logautomailgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'logautomailgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'logautomailgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'logautomailformsearch button[action=search]': {
                click: this.dataSearch
            },
            'logautomailformsearch button[action=reset]': {
                click: this.dataReset
            },
            'logautomailformdata': {
                afterrender: this.formDataAfterRender
            },
            'logautomailformdata button[action=save]': {
                click: this.dataSave
            },
            'logautomailformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'logautomailformdata [name=pt_id]': {
                change: function (el) {
                    var state = el.up('window').state;
                    if(state == 'create'){
                            me.setStoreDeptuserPt(el);
                            me.setprojectbypt(el);
                            me.setStoreReportto(el);
                    }
                }
            },
             'logautomailformsearch [name=pt_id]': {
                 select: function (field, newValue, oldValue, desc) {
                    var val = field.getValue();
                    me.getProjectidbyPtid(val);
                }
            }, 
        });
    },
     panelAfterRender: function (el) {
        var me, store,f,store_second;
        me = this;
        f = me.getFormsearch();
        store = me.getStore("Automailmodule");
        store.load();
         store_second = me.getStore("Automailtype");
        store_second.load();


    },
     formDataAfterRender: function (el) {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        var state = el.up('window').state;
        me.fdar().init();
        if (state == 'create') {

                var store = me.getStore("Ptbyuser");
                    store.load({
                        params: {
                            "hideparam": 'getptbyuser',
                            "project_id": apps.project,
                            "start": 0,
                            "limit": 1000,
                        },
                        callback: function (records, operation, success) {
                            store.each(function (record)
                            {
                                if (record.data['project_id'] == apps.project && record.data['pt_id'] == apps.pt) {
                                    me.setValue(me, 'pt_id', record.data['pt_id']);
                                }
                            });
                        }
                    });

      



        } else if (state == 'update' || state == 'read') {
            if(state == 'update'){
            me.fdar().update();
              me.setReadonly(f, 'pt_id', true);
                me.setReadonly(f, 'employee_name', false);
                  me.setReadonly(f, 'nik_group', false);
              }else if(state == 'read'){
                me.fdar().read();
              }
                   var g = me.getGrid();
                    var rec = g.getSelectedRecord();
                    var projectid = f.down("[name=project_id]").getValue();
                    var ptid = f.down("[name=pt_id]").getValue();

                     var store = me.getStore("Ptbyuser"); // load store project /pt to get selected value on combobox
                    store.load({
                        params: {
                            "hideparam": 'getptbyuser',
                            "project_id": projectid,
                            "start": 0,
                            "limit": 1000,
                        },
                        callback: function (records, operation, success) {
                            store.each(function (record)
                            {
                                if (record.data['project_id'] == projectid && record.data['pt_id'] == ptid) {
                                    me.setValue(me, 'pt_id', record.data['pt_id']);
                                }
                            });
                        }
                    });

                     storedept = me.getStore("Department"); // load store dept to get selected value on combobox
                        storedept.load({
                            params: {
                                "hideparam": 'getdepartmentbyprojectpt',
                                "pt_id" : ptid,
                                "project_id" : projectid
                            },
                            callback: function (records, operation, success) {
                               storedept.each(function (record)
                            {
                                if (record.data['department_id'] == rec.get('department_id')) {
                                    me.setValue(me, 'department_id', record.data['department_id']);
                                }
                            });
                               
                              
                            }
                        });

                         storeemployee = me.getStore('Employee'); // load store employee to get selected value on combobox
                        storeemployee.load({
                            params: {
                                "hideparam": 'getemployeebypt',
                                "start": 0,
                                "limit": 1000000,
                                "pt_id": ptid,
                                "project_id": projectid,
                            },callback: function (records, operation, success) {
                                   storeemployee.each(function (record)
                                        {

                                            if (record.data['employee_id'] == rec.get('reportto')) {
                                                me.setValue(me, 'reportto', record.data['employee_id']);
                                            }
                                        });
                                  
                                }




                        });






            
        }

    },
    
    setStoreDeptuserPt: function (el) {
        var me, store, form, valueModels,state,projectid,ptid, valueModels;
        me = this;
        form = me.getFormdata();
        state = el.up('window').state;
        if(state == 'create'){
                valueModels = form.down("[name=pt_id]").valueModels[0];
                projectid = valueModels.data.project_id;
                ptid = form.down("[name=pt_id]").getValue();
        }

        store = me.getStore("Department");
        store.load({
            params: {
                "hideparam": 'getdepartmentbyprojectpt',
                "pt_id" : ptid,
                "project_id" : projectid
            },
            callback: function (records, operation, success) {
                  if (records[0]) {
                    var row = records[0]['data'];
                    me.setValue(me, 'department_id', row.department_id);
                    
                }
                //  store.clearFilter(true);
                 //   me.setValue(me, 'department_id', '');
              
            }
        });
    },
    setprojectbypt: function (el) {
        console.log(el);
        var me, store, form, valueModels;
        me = this;
        form = me.getFormdata();
        valueModels = form.down("[name=pt_id]").valueModels[0];
        projectid = valueModels.data.project_id;
        me.setValue(me, 'project_id', projectid);
              
        
        
    },
     getProjectidbyPtid: function (newValue) {

        var me = this;
        var f = me.getFormsearch();
        var e = f.down("[name=pt_id]");

        var x = e.getStore().findRecord("pt_id", newValue);
        f.down("[name=project_id]").setValue(x.data['project_id']);
      
       
    },
      gridItemDblClick: function () {
        var me, p;
        me = this;
       return false;
    },
    setStoreReportto: function (el) {
        var me, store, form, valueModels, project_id, pt_id, state, reportto;
        me = this;
        form = me.getFormdata();
        state = el.up('window').state;
        if(state == 'create'){
            valueModels = form.down("[name=pt_id]").valueModels[0];
            var pt_id = form.down("[name=pt_id]").getValue();
            var project_id = valueModels.data.project_id;
        }
        store = me.getStore('Employee');
        store.load({
            params: {
                "hideparam": 'getemployeebypt',
                "start": 0,
                "limit": 1000000,
                "pt_id": pt_id,
                "project_id": project_id,
            },callback: function (records, operation, success) {
                    if (records[0]) {
                    var row = records[0]['data'];
                    me.setValue(me, 'reportto', row.employee_id);
                    
                }
                   // store.clearFilter(true);
                   // me.setValue(me, 'report_to', '');
                  
                }




        });
    },
    
});