Ext.define('Hrd.controller.Codeofconduct', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Codeofconduct',
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    controllerName: 'codeofconduct',
    fieldName: 'project',
    bindPrefixName: 'Codeofconduct',
    formWidth: 600,
    dynamicrequest: null,
    localStore: {},
    refs: [
        {
            ref: 'griddetail',
            selector: 'codeofconductgriddetail'
        },
        {
            ref: 'formemployee',
            selector: 'codeofconductformemployee'
        },
        {
            ref: 'formproject',
            selector: 'codeofconductformproject'
        },
        {
            ref: 'gridemployee',
            selector: 'codeofconductgridemployee'
        },
        {
            ref: 'gridproject',
            selector: 'codeofconductgridproject'
        }
    ],
    constructor: function (configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
    },
    init: function () {
        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();      
        this.control(events.getEvents(me, me.controllerName)); 

        var newEvs = {};
        
        newEvs['codeofconductformdata #file_name_upload'] = {
            change: function (fld, a) {
                me.formUpload(fld, a, 'mode');
            }
        };
                
        newEvs['codeofconductgrid toolbar button[action=check]'] = {
            click: function () {
                var me = this;
                var grid = me.getGrid();
                var store = grid.getStore();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                if(record === undefined){            
                    Ext.Msg.alert('Info', 'Please select record');
                    return false;
                }
                
                me.instantWindow("Formemployee", 920, "Employee Acceptance", "options", "codeofconductformemployee");
            }
        };
        
        newEvs['codeofconductgrid toolbar button[action=copy]'] = {
            click: function () {
                var me = this;
                var grid = me.getGrid();
                var store = grid.getStore();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                if(record === undefined){            
                    Ext.Msg.alert('Info', 'Please select record');
                    return false;
                }
                
                me.instantWindow("Formproject", 920, "Copy to other Project", "options", "codeofconductformproject");
            }
        };
        
        newEvs['codeofconductformemployee'] = {
            afterrender: function () {
                var me;
                me = this;
                me.formEmployeeAfterrender();
            }
        };
        
        newEvs['codeofconductformproject'] = {
            afterrender: function () {
                var me;
                me = this;
                me.formProjectAfterrender();
            }
        };
        
        newEvs['codeofconductformemployee button[action=process_sendemailcip]'] = {
            click: function (el) {
                this.process_send('emailcip');
            }
        };
        
        newEvs['codeofconductformemployee button[action=process_sendemail]'] = {
            click: function (el) {
                this.process_send('email');
            }
        };
        
        newEvs['codeofconductformproject button[action=copy]'] = {
            click: function (el) {
                this.process_copy();
            }
        };
        
        newEvs['codeofconductgrid toolbar button[action=export]'] = {
            click: function(el, val) {
                this.exportData();       
            }
        };
        
        this.control(newEvs);
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        me.dynamicrequest = new Hrd.library.box.tools.Dynamicrequest();
    },	
    fdar: function () {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();

        me.setActiveForm(f);
        f.setLoading(false);
        
        var x = {
            init: function () {

            },
            create: function () {
                me.unMask(1);
                me.getFormdata().down("[name=active]").hide();
            },
            update: function () {
                me.unMask(1);
		
                var g = me.getGrid();
                var rec = g.getSelectedRecord();
                if (rec) {
                        f.editedRow = g.getSelectedRow();
                        f.loadRecord(rec);
                        me.getFormdata().down("[name=file_name]").show();
                        me.getFormdata().down("[name=active]").show();
                }				
            }
        };

        return x;
    },
    mainDataSave: function () {
        var me = this;
        var f = me.getFormdata();
        var formdata = f.getForm();
        var g = me.getGrid();
        var s = g.getStore();
        var row = f.editedRow;
        if (formdata.isValid()) {
            me.insSave({
                form: f,
                grid: g,
                finalData: function (data) {
                    return data;
                },
                sync: true,
                callback: {
                    create: function (store, form, grid) {

                    }
                }
            });
        }

    },
    formUpload: function (fld, a, mode) {        
        var me = this;
        var form = fld.up("form");
                
        var description = me.getFormdata().down("[name=description]").getValue();
        if(description == '' || description === undefined){
            me.tools.alert.warning('Description is required');
            return false;
        }
        
        var p = me.getFormdata();
        me.uploadFile({
            form: form,
            showalert: false,
            params: {'type': 'pdf'},
            callback: {
                success: function (fn) {  
                    me.getFormdata().down("[name=file_name]").show();
                    me.getFormdata().down("[name=file_name]").setValue(fn);
                },
                failure: function () {
                    p.setLoading(false);
                }
            }
        });
    },
    formEmployeeAfterrender: function () {
        var me, form, record, store, grid, codeofconduct_id;
        me = this;
        
        grid = me.getGrid();
        store = grid.getStore();
        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));        
        if(record === undefined){            
            Ext.Msg.alert('Info', 'Please select record');
            return false;
        }
        
        var codeofconduct_id = record.get('codeofconduct_id');
        
        var f = me.getFormemployee();
        f.down("[name=codeofconduct_id]").setValue(record.get('codeofconduct_id'));
        f.down("[name=file_name]").setValue(record.get('file_name'));
        f.down("[name=description]").setValue(record.get('description'));
        f.down("[name=project]").setValue(record.get('project'));
                
        var grid = me.getGridemployee();
        grid.doInit();
        
        var store = grid.getStore();
        store.getProxy().extraParams = {
            mode_read: 'getemployee',
            codeofconduct_id: codeofconduct_id
        };
        store.load({            
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'tgl_menyetujui', direction: 'DESC'});
            }
        });
                
        //supaya paging langsung aktif tanpa user refresh secara manual dan set pageSize jadi 50
        var delay_task = new Ext.util.DelayedTask(function(){
            store.reload({start:0, limit:50});
            Ext.apply(store, {pageSize: 50});
        });
        delay_task.delay(50); 
    },
    formProjectAfterrender: function () {
        var me, form, record, store, grid, codeofconduct_id;
        me = this;
        
        grid = me.getGrid();
        store = grid.getStore();
        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
        if(record === undefined){            
            Ext.Msg.alert('Info', 'Please select record');
            return false;
        }
        
        var codeofconduct_id = record.get('codeofconduct_id');
        
        var f = me.getFormproject();
        f.down("[name=codeofconduct_id]").setValue(record.get('codeofconduct_id'));
        f.down("[name=file_name]").setValue(record.get('file_name'));
        f.down("[name=description]").setValue(record.get('description'));
        f.down("[name=project]").setValue(record.get('project'));
        
        var grid = me.getGridproject();
        grid.doInit();
        
        var store = grid.getStore();
        store.getProxy().extraParams = {
            mode_read: 'getproject',
            codeofconduct_id: codeofconduct_id
        };
        store.load({            
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'name', direction: 'ASC'});
            }
        });
        
        //supaya paging langsung aktif tanpa user refresh secara manual dan set pageSize jadi 50
        var delay_task = new Ext.util.DelayedTask(function(){
            store.reload({start:0, limit:50});
            Ext.apply(store, {pageSize: 50});
        });
        delay_task.delay(50); 
    },
    
    process_send: function(tipe){
        var me, grid, rows;
        me = this;
        grid = me.getGridemployee();
        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
            me.arraydata = [];			
            Ext.Msg.show({
                    title: 'Submit',
                    msg: 'Send email to ' + rows.length + ' record(s) ?',
                    width: 300,
                    closable: false,
                    buttons: Ext.Msg.YESNO,
                    buttonText:
                    {
                            yes: 'YES',
                            no: 'CANCEL'
                    },
                    multiline: false,
                    fn: function (buttonValue, inputText, showConfig) {
                        if (buttonValue == 'yes') {
                            
                                var all_id = '';		
                                for (var i = 0; i < rows.length; i++) {
                                        if(all_id != ''){
                                                all_id = all_id + ',';
                                        }														
                                        all_id += rows[i]['data'].employee_id;
                                }

                                me.tools.ajax({
                                    params: {
                                        all_id : all_id,
                                        tipe: tipe
                                    },
                                    success: function (data, model) {
                                        me.dynamicrequest.buildSuccessAlert('Email sent ');
                                    }
                                }).read('sendemail');
                                
                        }
                    },
                    icon: Ext.Msg.QUESTION
            });

        }
        
    },
    
    process_copy: function(){
        var me, grid, rows;
        me = this;
        
        grid = me.getGrid();
        store = grid.getStore();
        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
        var codeofconduct_id = record.get('codeofconduct_id');
        
        grid = me.getGridproject();
        rows = grid.getSelectionModel().getSelection();                
        
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
            me.arraydata = [];			
            Ext.Msg.show({
                    title: 'Submit',
                    msg: 'Copy code of conduct to ' + rows.length + ' record(s) ?',
                    width: 300,
                    closable: false,
                    buttons: Ext.Msg.YESNO,
                    buttonText:
                    {
                            yes: 'YES',
                            no: 'CANCEL'
                    },
                    multiline: false,
                    fn: function (buttonValue, inputText, showConfig) {
                        if (buttonValue == 'yes') {
                            
                                var all_id = '';		
                                for (var i = 0; i < rows.length; i++) {
                                        if(all_id != ''){
                                                all_id = all_id + ',';
                                        }														
                                        all_id += rows[i]['data'].project_id;
                                }

                                me.tools.ajax({
                                    params: {
                                        all_id : all_id,
                                        codeofconduct_id : codeofconduct_id
                                    },
                                    success: function (data, model) {
                                        me.getGridproject().getStore().reload();  
                                        me.getGrid().getStore().reload();
                                        me.dynamicrequest.buildSuccessAlert('Data copied ');
                                    }
                                }).read('copy');
                                
                        }
                    },
                    icon: Ext.Msg.QUESTION
            });

        }
        
    },
    exportData:function(){
        var me, url, form;
        me = this;
               
        var p = me.getGrid();
        p.setLoading("Please wait");
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                p.setLoading(false);
                url = data['others'][1]['directdata'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                        }
                    });
                }
            }
        }).read('exportdata');        
     }    
});