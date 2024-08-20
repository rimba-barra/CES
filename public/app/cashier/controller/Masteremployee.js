Ext.define('Cashier.controller.Masteremployee', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Masteremployee',
    requires: [
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Ptcombobox',
        'Cashier.view.ptforcashbon.Gridbrowsept',
    ],
    views: [
        'masteremployee.Panel',
        'masteremployee.Grid',
        'masteremployee.FormSearch',
        'masteremployee.FormData',
    ],
    stores: [
        'Masteremployee',
        'Ptbyuser',
        'Employee',
        'Department',
        'Project',
        'Pt'
    ],
    models: [
        'Masteremployee',
        'Ptforcashbon',
        'Project',
        'Pt'
    ],
    refs: [
        {ref: 'grid', selector: 'masteremployeegrid'},
        {ref: 'formsearch', selector: 'masteremployeeformsearch'},
        {ref: 'formdata', selector: 'masteremployeeformdata'},
    ],
    controllerName: 'masteremployee',
    fieldName: 'employee_name',
    bindPrefixName: 'Masteremployee',
    rowproject: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'masteremployeepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'masteremployeegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masteremployeegrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'masteremployeegrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'masteremployeegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'masteremployeegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'masteremployeegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masteremployeeformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masteremployeeformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masteremployeeformdata': {
                afterrender: this.formDataAfterRender
            },
            'masteremployeeformdata button[action=save]': {
                click: this.dataSave
            },
            'masteremployeeformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'masteremployeeformdata [name=pt_id]': {
                change: function (el) {
                    var state = el.up('window').state;
                    if(state == 'create'){
                            me.setStoreDeptuserPt(el);
                            me.setprojectbypt(el);
                            me.setStoreReportto(el);
                    }
                }
            },
             'masteremployeeformsearch [name=pt_id]': {
                 select: function (field, newValue, oldValue, desc) {
                    var val = field.getValue();
                    me.getProjectidbyPtid(val);
                }
            }, 
        });
    },
     panelAfterRender: function (el) {
        var me, store,f;
        me = this;
        f = me.getFormsearch();
         store = me.getStore("Ptbyuser");
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
                                    f.down('[name=pt_id]').setValue(record.data['pt_id']);
                                    f.down('[name=project_id]').setValue(record.data['project_id']);
                                }
                            });
                        }
                    });


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