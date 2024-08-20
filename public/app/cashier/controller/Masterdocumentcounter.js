Ext.define('Cashier.controller.Masterdocumentcounter', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox'
    ],
    alias: 'controller.masterdocumentcounter',
    views: [
        'masterdocumentcounter.FormSearch',
        'masterdocumentcounter.Grid',
        'masterdocumentcounter.FormData',
        'masterdocumentcounter.Panel'
    ],
    stores: [
        'Masterdocumentcounter',
        'Project',
        'Pt'
    ],
    models: [
        'Masterdocumentcounter',
        'Project',
        'Pt'
    ],
    refs: [
        { ref: 'grid', selector: 'masterdocumentcountergrid' },
        { ref: 'formsearch', selector: 'masterdocumentcounterformsearch' },
        { ref: 'formdata', selector: 'masterdocumentcounterformdata' },
        { ref: 'panel', selector: 'masterdocumentcounterpanel' }
    ],
    controllerName: 'masterdocumentcounter',
    fieldName: 'counter_no_id',
    bindPrefixName: 'Masterdocumentcounter',
    formWidth: 500,
    win: null,
    winId: null,
    init: function(application) {
        var me = this;
        this.control({
            'masterdocumentcounterpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.formSearchAfterRenderCustom
            },
            'masterdocumentcountergrid': {
                afterrender: me.gridAfterRender,
                itemdblclick: me.gridItemDblClick,
                itemcontextmenu: me.gridItemContextMenu,
                selectionchange: me.gridSelectionChange
            },
            'masterdocumentcountergrid [action=create]': {
                click: function() {
                    var me = this;
                    me.instantWindow('FormData', 500, 'Add New Document Counter', 'create', 'addNewmasterdocumentcounter', me.controllerName);
                }
            },
            'masterdocumentcounterformsearch [action=search]': {
                click: me.dataSearch
            },
            'masterdocumentcounterformsearch [action=reset]': {
                click: me.dataReset
            },
            'masterdocumentcounterformsearch [name=project_id]': {
                change: function(dis, newValue, oldValue, eOpts) {
                    var me = this;
                    var f = me.getFormsearch();
                    var project_id = dis.value; 
                    this.loadPtbyProject(project_id, f);
                }
            },
            'masterdocumentcounterformdata': {
                afterrender: function(v) {

                    var me = this;
                    var f = me.getFormdata();

                    var state = v.up('window').state;
                    me.formDataAfterRender(f);

                    if (state == 'update') {
                        f.down("[name=project_id]").setReadOnly(true);
                        f.down("[name=pt_id]").setReadOnly(true);
                        f.down("[name=year]").setReadOnly(true);
                        f.down("[name=month]").setReadOnly(true);
                        f.down("[name=counter_type]").setReadOnly(true);
                    } else {
                        this.loadProject(f);
                        this.loadPtbyProject(apps.project, f);
                    }
                }
            },
            'masterdocumentcounterformdata [action=save]': {
                click: function() {
                    this.processSaveData();
                }
            }
        })
    },
    formSearchAfterRenderCustom: function() {
        var me;
        me = this;

        var f = me.getFormsearch();
        this.loadProject(f);        
    },
    loadProject: function(f) {

        var me = this;
        var storeproject;

        storeproject = me.getStore('Project');
        storeproject.load({
            params: {
                "hideparam": 'projectpt',
                "project_id": apps.project,
                "start": 0,
                "limit": 1000000,
            }, callback: function (recordscode, operationcode, successcode) {
                if (successcode) {
                    if (recordscode[0]) {
                        var firstdatacode = recordscode[0]['data'];
                        f.down("[name=project_id]").setValue(parseInt(apps.project));                       
                    }
                }
            }

        });   
    },
    loadPtbyProject: function(projectid, f){

        var me = this;

        var storecoa = me.getStore('Pt');
        storecoa.load({
            params: {
                "hideparam": 'getptbyuserproject',
                "start": 0,
                "limit": 1000000,
                "project_id": projectid,
                "user_id": apps.uid
            },
            callback: function (records, operation, success) {
                if (!records[0]) {
                    f.down("[name=pt_id]").setValue(parseInt(apps.pt));                      
                } else {
                    f.down("[name=pt_id]").setValue(records[0]);
                }       
            }
        });
    },
    processSaveData: function() {

        var me = this;
        var f = me.getFormdata();

        var counter_type = f.down("[name=counter_type]").getValue();
        var project_id = f.down("[name=project_id]").getValue();
        var pt_id = f.down("[name=pt_id]").getValue();
        var year = f.down("[name=year]").getValue();
        var month = f.down("[name=month]").getValue();
        var counter_no_id = f.down("[name=counter_no_id]").getValue();

        Ext.Ajax.request({
            url: 'cashier/masterdocumentcounter/read',
            method: 'POST',
            params: {
                hideparam: 'checkdataexists',
                counter_type: counter_type,
                project_id: project_id,
                pt_id: pt_id,
                year: year,
                month: month == null ? 0 : month,
                counter_no_id: counter_no_id
            },
            success: function(response) {
                var o = Ext.JSON.decode(response.responseText);

                if (o.success == 'false') {
                    Ext.Msg.alert("Alert", o.msg);
                    return false;
                } else {
                    me.dataSave();
                }
            }
        })
    }
})